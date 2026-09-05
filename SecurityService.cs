using System;
using System.Collections.Concurrent;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Java.Server;

public class SecurityService
{
    private const int SaltSize = 32;
    private const int HashSize = 64;
    private const int Iterations = 210_000; // OWASP 2024+ recommendation for PBKDF2-SHA512

    private readonly RSA _rsa;
    private readonly string _publicKeyPem;
    private readonly string _publicKeyXml;

    // Dual-Layer Rate Limiting (IP and Username)
    private readonly ConcurrentDictionary<string, RateLimitState> _rateLimits = new(StringComparer.OrdinalIgnoreCase);

    // Anti-Replay Nonce Cache
    private readonly ConcurrentDictionary<string, DateTime> _seenNonces = new();

    public SecurityService()
    {
        _rsa = RSA.Create(2048);

        var envPrivPem = Environment.GetEnvironmentVariable("SERVER_RSA_PRIVATE_KEY_PEM");
        if (!string.IsNullOrWhiteSpace(envPrivPem))
        {
            try
            {
                var cleanPem = envPrivPem.Trim().Replace("\\n", "\n");
                _rsa.ImportFromPem(cleanPem);
                _publicKeyPem = _rsa.ExportSubjectPublicKeyInfoPem();
                _publicKeyXml = _rsa.ToXmlString(false);
                return;
            }
            catch { }
        }

        var envKeysDir = Environment.GetEnvironmentVariable("KEYS_DIR");
        var envDataDir = Environment.GetEnvironmentVariable("DATABASE_DIR");
        string keysDir;
        if (!string.IsNullOrWhiteSpace(envKeysDir))
        {
            keysDir = Path.GetFullPath(envKeysDir.Trim());
        }
        else if (!string.IsNullOrWhiteSpace(envDataDir))
        {
            keysDir = Path.Combine(Path.GetFullPath(envDataDir.Trim()), "keys");
        }
        else
        {
            keysDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "data", "keys");
        }

        Directory.CreateDirectory(keysDir);
        var privateKeyPath = Path.Combine(keysDir, "server_private.pem");
        var publicKeyPath = Path.Combine(keysDir, "server_public.pem");

        if (File.Exists(privateKeyPath))
        {
            try
            {
                var pem = File.ReadAllText(privateKeyPath);
                _rsa.ImportFromPem(pem);
            }
            catch
            {
                GenerateAndSaveKeys(privateKeyPath, publicKeyPath);
            }
        }
        else
        {
            GenerateAndSaveKeys(privateKeyPath, publicKeyPath);
        }

        _publicKeyPem = _rsa.ExportSubjectPublicKeyInfoPem();
        _publicKeyXml = _rsa.ToXmlString(false);
    }

    private void GenerateAndSaveKeys(string privatePath, string publicPath)
    {
        var privPem = _rsa.ExportPkcs8PrivateKeyPem();
        var pubPem = _rsa.ExportSubjectPublicKeyInfoPem();
        File.WriteAllText(privatePath, privPem);
        File.WriteAllText(publicPath, pubPem);
    }

    public string PublicKeyPem => _publicKeyPem;
    public string PublicKeyXml => _publicKeyXml;

    #region Password Hashing (PBKDF2-SHA512, 210k rounds, 32-byte salt)

    public (string Hash, string Salt) HashPassword(string password)
    {
        byte[] saltBytes = RandomNumberGenerator.GetBytes(SaltSize);
        string salt = Convert.ToBase64String(saltBytes);

        byte[] hashBytes = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(password),
            saltBytes,
            Iterations,
            HashAlgorithmName.SHA512,
            HashSize
        );
        string hash = Convert.ToBase64String(hashBytes);

        return (hash, salt);
    }

    public bool VerifyPassword(string password, string storedHash, string storedSalt)
    {
        try
        {
            byte[] saltBytes = Convert.FromBase64String(storedSalt);
            byte[] expectedHashBytes = Convert.FromBase64String(storedHash);

            byte[] actualHashBytes = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                saltBytes,
                Iterations,
                HashAlgorithmName.SHA512,
                HashSize
            );

            return CryptographicOperations.FixedTimeEquals(actualHashBytes, expectedHashBytes);
        }
        catch
        {
            return false;
        }
    }

    public static bool ValidatePasswordComplexity(string password, out string? validationError)
    {
        if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
        {
            validationError = "Password must be at least 8 characters long.";
            return false;
        }

        bool hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;
        foreach (char c in password)
        {
            if (char.IsUpper(c)) hasUpper = true;
            else if (char.IsLower(c)) hasLower = true;
            else if (char.IsDigit(c)) hasDigit = true;
            else hasSpecial = true;
        }

        if (!hasUpper || !hasLower || !hasDigit || !hasSpecial)
        {
            validationError = "Password must contain uppercase, lowercase, numeric, and special characters.";
            return false;
        }

        validationError = null;
        return true;
    }

    #endregion

    #region Cryptographic Signatures (RSA-SHA256)

    public string SignData(byte[] data)
    {
        byte[] signature = _rsa.SignData(data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
        return Convert.ToBase64String(signature);
    }

    public string SignString(string text)
    {
        byte[] data = Encoding.UTF8.GetBytes(text);
        return SignData(data);
    }

    public bool VerifySignature(byte[] data, string signatureBase64)
    {
        try
        {
            byte[] signature = Convert.FromBase64String(signatureBase64);
            return _rsa.VerifyData(data, signature, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
        }
        catch
        {
            return false;
        }
    }

    public bool VerifyStringSignature(string text, string signatureBase64)
    {
        byte[] data = Encoding.UTF8.GetBytes(text);
        return VerifySignature(data, signatureBase64);
    }

    public LeaseEnvelope CreateSignedLease(UserRecord user, string deviceId)
    {
        var lease = new SessionLease
        {
            UserId = user.Id,
            Username = user.Username,
            DeviceId = deviceId,
            IssuedAtUtc = DateTime.UtcNow,
            ExpiresAtUtc = DateTime.UtcNow.AddSeconds(90), // 90 seconds rolling lease window
            SecurityStamp = user.SecurityStamp,
            SessionSaltHex = Convert.ToHexString(RandomNumberGenerator.GetBytes(16)).ToLowerInvariant()
        };

        var json = JsonSerializer.Serialize(lease);
        var sig = SignString(json);

        return new LeaseEnvelope
        {
            PayloadJson = json,
            SignatureBase64 = sig,
            PublicKeyPem = _publicKeyPem,
            ExpiresAtUtc = lease.ExpiresAtUtc
        };
    }

    #endregion

    #region Anti-Replay Protection

    public bool ValidateAndStoreNonce(string nonce, long timestampSeconds, out string? error)
    {
        if (string.IsNullOrWhiteSpace(nonce) || nonce.Length < 16)
        {
            error = "Invalid or missing security nonce.";
            return false;
        }

        var nowSeconds = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        if (Math.Abs(nowSeconds - timestampSeconds) > 60)
        {
            error = "Request expired or clock synchronization error (exceeded 60s skew).";
            return false;
        }

        // Cleanup expired nonces (older than 2 minutes)
        var cutoff = DateTime.UtcNow.AddMinutes(-2);
        foreach (var kvp in _seenNonces)
        {
            if (kvp.Value < cutoff)
            {
                _seenNonces.TryRemove(kvp.Key, out _);
            }
        }

        if (!_seenNonces.TryAdd(nonce, DateTime.UtcNow))
        {
            error = "Replay attack detected: duplicate request nonce.";
            return false;
        }

        error = null;
        return true;
    }

    #endregion

    #region Dual-Layer Rate Limiting & Brute-Force Lockout

    public bool IsRateLimited(string ipAddress, string? username, out int retryAfterSeconds)
    {
        retryAfterSeconds = 0;
        var now = DateTime.UtcNow;

        if (CheckRateLimitKey(ipAddress, now, out retryAfterSeconds)) return true;
        if (!string.IsNullOrWhiteSpace(username) && CheckRateLimitKey($"user:{username.ToLowerInvariant()}", now, out retryAfterSeconds)) return true;

        return false;
    }

    private bool CheckRateLimitKey(string key, DateTime now, out int retryAfterSeconds)
    {
        retryAfterSeconds = 0;
        if (!_rateLimits.TryGetValue(key, out var state)) return false;

        lock (state)
        {
            if (state.LockoutUntil.HasValue)
            {
                if (now < state.LockoutUntil.Value)
                {
                    retryAfterSeconds = (int)Math.Ceiling((state.LockoutUntil.Value - now).TotalSeconds);
                    return true;
                }
                state.LockoutUntil = null;
            }

            state.Attempts.RemoveAll(t => now - t > TimeSpan.FromMinutes(5));
            if (state.Attempts.Count >= 10)
            {
                state.LockoutUntil = now.AddMinutes(15);
                retryAfterSeconds = 900;
                return true;
            }
            if (state.Attempts.Count >= 5)
            {
                state.LockoutUntil = now.AddMinutes(3);
                retryAfterSeconds = 180;
                return true;
            }
        }

        return false;
    }

    public void RecordFailedAttempt(string ipAddress, string? username)
    {
        var now = DateTime.UtcNow;
        RecordKeyAttempt(ipAddress, now);
        if (!string.IsNullOrWhiteSpace(username))
        {
            RecordKeyAttempt($"user:{username.ToLowerInvariant()}", now);
        }
    }

    private void RecordKeyAttempt(string key, DateTime now)
    {
        var state = _rateLimits.GetOrAdd(key, _ => new RateLimitState());
        lock (state)
        {
            state.Attempts.Add(now);
            if (state.Attempts.Count >= 10)
            {
                state.LockoutUntil = now.AddMinutes(15);
            }
            else if (state.Attempts.Count >= 5)
            {
                state.LockoutUntil = now.AddMinutes(3);
            }
        }
    }

    public void ResetAttempts(string ipAddress, string? username)
    {
        _rateLimits.TryRemove(ipAddress, out _);
        if (!string.IsNullOrWhiteSpace(username))
        {
            _rateLimits.TryRemove($"user:{username.ToLowerInvariant()}", out _);
        }
    }

    private class RateLimitState
    {
        public List<DateTime> Attempts { get; } = new();
        public DateTime? LockoutUntil { get; set; }
    }

    #endregion

    #region Token Generation & Hashes

    public string GenerateSecureToken(int byteLength = 32)
    {
        byte[] bytes = RandomNumberGenerator.GetBytes(byteLength);
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }

    public static string ComputeSha256(byte[] data)
    {
        byte[] hash = SHA256.HashData(data);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }

    public static string ComputeSha256(string text)
    {
        byte[] data = Encoding.UTF8.GetBytes(text);
        return ComputeSha256(data);
    }

    public static string ComputeSha256(Stream stream)
    {
        using var sha256 = SHA256.Create();
        byte[] hash = sha256.ComputeHash(stream);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }

    #endregion
}

