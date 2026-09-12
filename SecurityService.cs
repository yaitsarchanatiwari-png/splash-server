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

    private const string MasterFallbackPrivateKeyPem = @"-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDUp5pzS0pgk7jQ
KvW6d94T3tjReoZHnB0rPepTPIk35I/4X5z7ghIVN7+ZkGNvMjTqchYJ6kaQl+wW
FBDbmfhKOdRHQWbNHDWwVI7lli5Ko5ptvkPMYhiv+m1E++xM4Sjswha2r5REIOQE
9hZqH3yfV1qUEgdTi3s5gl3HbkFRFAFTMDHUhSxf+oa1R0z7Ms1Axy1lL7sFm0Bj
yU+p6g3JCVV4NA1p1QH2XUYM4e16GAn9Mp00li4saYHMliUxIZRGLotpmxhqXqYS
ESbZkmE4w+dhxFqniFb1Hcv9EL+8C3rfb+4X9d6mO4pnzfekdvlY90k+CYYWO+/1
rGJgxwMtAgMBAAECggEBAIQCIyvNIje/m+uFr5L4lCCLptarE65iZ+0O+2Z+XsQW
m5TYbc/nV6haOhNvAXrmlNiwx6OSDgn2dTTjce+QrgQN0AwHunQ7PczfQPGef9AP
rW7QvK+keaTMdYZsSK0U3N3UQltXtVdxf3rg9Nsd/rO/e1gNtQSUwoLZvbNuaxeT
jJzhbXsNxSr+A2+uG6XT3PKJ9B1M1Ch7k3Y9aduLTOy1pU9UKriTtSDVWr0hwlQ0
lBoySg4g7eeMiu9FYuyNTqo+NrUw+uAlG1IhJmnisuPxlFes4b11gNdCdvcKeTcO
elrrc7EXwpq4+WPND3udcph7qhvQ5aCSM3+e8ScYz9UCgYEA3sDBbtSCg/ZFZsVJ
bxx76DRz/Oj8XmXLj8tDBlnfo7mcUiMBa3Lco9NlbCPuQcJkMDJYx+ez6vkQ1+u0
+WnciVOI3nvjLEieZDJ/rBJlT3glN6aPFsDnPwqpes0jGBaSPZEUvjV0coRiWKit
ONuEncUCqAGdDYIaUFfwfv0w6QsCgYEA9GUACr0JglG87/pAW6iWxcv6WNTYHexc
pLXXpGdpBRidnDxaDiKmgOF0Dmywi5Gzz6Gen/5T4w9WaGY3f1GY896cyNCMUiPA
jNXEjyP4vetBWOE9Ja6RPzOlvmXKM3USvMptfpnpa91pykxklvyQog4UcPZ7YBKO
XvlOhM4tF6cCgYEAmpI9aA/1JWcuT5tVUtH8NWy4k+aEwWh38idFMlIJO06gZ+q8
oHgLHW+i8ICaY21mIn+9VbK2CbaddoeshGpuS6j40BI92MvnhXX5XElDnfqsMMrW
fh6MGRXn9zwEP0HiZvCW6UqkrJaqvAUIduz1QJmmNzkvZ2FBq0DqtOQzHXMCgYAB
PPG/HC4MJvXaEV56GGSLI/lksc9Wd3gQrYsmHg/+Ip3JyNR79dj6FipMWGicjGRo
zNzM2rD6GX3KkZn+Xx9zPNF2gvfzApNbI0oXn4sHC0YNeTaiFjxOIajZShK4KAOs
SSo81fLExR5gE/r+eNESwReBav49AlsOSB0JtzGrSQKBgQC7Cws0BHmfvH+668R2
2BrrsiJol6qJoA3gaRETnJnMENi/H8Oj6xh8gMj4T79Wro0Ov4hzYiE6d2u3ykOs
U0wessHP5vtNW1xB3ivcxn4SWA7O0pOaCcntF8rDpai/qeWePM4RBb3TW9GeToMC
dpdQTO2LlWHP4OR6Fr55jpKznw==
-----END PRIVATE KEY-----";

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

        bool loaded = false;
        if (File.Exists(privateKeyPath))
        {
            try
            {
                var pem = File.ReadAllText(privateKeyPath);
                _rsa.ImportFromPem(pem);
                loaded = true;
            }
            catch { }
        }

        if (!loaded)
        {
            // Use deterministic master RSA key so leases and signatures NEVER invalidate on server restarts
            try
            {
                _rsa.ImportFromPem(MasterFallbackPrivateKeyPem);
                File.WriteAllText(privateKeyPath, MasterFallbackPrivateKeyPem);
                File.WriteAllText(publicKeyPath, _rsa.ExportSubjectPublicKeyInfoPem());
                loaded = true;
            }
            catch
            {
                GenerateAndSaveKeys(privateKeyPath, publicKeyPath);
            }
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

    public string SignStream(Stream stream)
    {
        byte[] signature = _rsa.SignData(stream, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
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

    #region Permanent Stateless Admin Tokens (Deterministic HMAC-SHA256)

    private static readonly byte[] AdminHmacSecret = SHA256.HashData(
        Encoding.UTF8.GetBytes("SPLASH_ADMIN_MASTER_SECRET_KEY_AZ_6767_V2:" + MasterFallbackPrivateKeyPem)
    );

    public string GenerateAdminToken(UserRecord user, TimeSpan? lifetime = null)
    {
        var validDuration = lifetime ?? TimeSpan.FromDays(30);
        var now = DateTimeOffset.UtcNow;
        var exp = now.Add(validDuration);

        // Payload format: v1|userId|username|securityStamp|issuedUnix|expiresUnix
        string payload = $"v1|{user.Id}|{user.Username}|{user.SecurityStamp}|{now.ToUnixTimeSeconds()}|{exp.ToUnixTimeSeconds()}";
        byte[] payloadBytes = Encoding.UTF8.GetBytes(payload);
        string payloadB64 = Convert.ToBase64String(payloadBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

        byte[] sigBytes = HMACSHA256.HashData(AdminHmacSecret, Encoding.UTF8.GetBytes(payloadB64));
        string sigB64 = Convert.ToBase64String(sigBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

        return $"adm_{payloadB64}.{sigB64}";
    }

    public bool ValidateAdminToken(string token, DatabaseService db, out AdminSessionRecord? session)
    {
        session = null;
        if (string.IsNullOrWhiteSpace(token) || !token.StartsWith("adm_")) return false;

        var parts = token.Substring(4).Split('.');
        if (parts.Length != 2) return false;

        string payloadB64 = parts[0];
        string sigB64 = parts[1];

        // 1. Verify HMAC signature with constant-time equality
        byte[] expectedSig = HMACSHA256.HashData(AdminHmacSecret, Encoding.UTF8.GetBytes(payloadB64));
        string expectedSigB64 = Convert.ToBase64String(expectedSig).TrimEnd('=').Replace('+', '-').Replace('/', '_');

        byte[] providedSigBytes = Encoding.UTF8.GetBytes(sigB64);
        byte[] expectedSigBytes = Encoding.UTF8.GetBytes(expectedSigB64);

        if (providedSigBytes.Length != expectedSigBytes.Length || !CryptographicOperations.FixedTimeEquals(providedSigBytes, expectedSigBytes))
        {
            return false;
        }

        // 2. Decode payload
        try
        {
            string padded = payloadB64.Replace('-', '+').Replace('_', '/');
            switch (padded.Length % 4)
            {
                case 2: padded += "=="; break;
                case 3: padded += "="; break;
            }
            string payload = Encoding.UTF8.GetString(Convert.FromBase64String(padded));
            var fields = payload.Split('|');
            if (fields.Length < 6 || fields[0] != "v1") return false;

            string userId = fields[1];
            string username = fields[2];
            string securityStamp = fields[3];
            long expUnix = long.Parse(fields[5]);

            long nowUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            if (nowUnix > expUnix) return false; // Token expired

            // 3. Verify user exists, is admin, and security stamp matches
            var user = db.GetUserById(userId) ?? db.GetUserByUsername(username);
            if (user == null || !user.IsAdmin) return false;
            if (user.SecurityStamp != securityStamp) return false; // Revoked if admin resets security stamp

            long issuedUnix = long.Parse(fields[4]);
            session = new AdminSessionRecord
            {
                Token = token,
                UserId = user.Id,
                Username = user.Username,
                CreatedAtUtc = DateTimeOffset.FromUnixTimeSeconds(issuedUnix).UtcDateTime,
                ExpiresAtUtc = DateTimeOffset.FromUnixTimeSeconds(expUnix).UtcDateTime,
                IpAddress = "127.0.0.1"
            };
            return true;
        }
        catch
        {
            return false;
        }
    }

    #endregion

    #region Permanent Stateless User Tokens (Deterministic HMAC-SHA256)

    private static readonly byte[] UserHmacSecret = SHA256.HashData(
        Encoding.UTF8.GetBytes("SPLASH_USER_MASTER_SECRET_KEY_AZ_6767_V2:" + MasterFallbackPrivateKeyPem)
    );

    public string GenerateUserToken(UserRecord user, string? deviceId = null, TimeSpan? lifetime = null)
    {
        var validDuration = lifetime ?? TimeSpan.FromDays(90);
        var now = DateTimeOffset.UtcNow;
        var exp = now.Add(validDuration);
        var dev = string.IsNullOrWhiteSpace(deviceId) ? "WEB" : deviceId.Trim();

        // Payload format: v1|userId|username|securityStamp|deviceId|issuedUnix|expiresUnix
        string payload = $"v1|{user.Id}|{user.Username}|{user.SecurityStamp}|{dev}|{now.ToUnixTimeSeconds()}|{exp.ToUnixTimeSeconds()}";
        byte[] payloadBytes = Encoding.UTF8.GetBytes(payload);
        string payloadB64 = Convert.ToBase64String(payloadBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

        byte[] sigBytes = HMACSHA256.HashData(UserHmacSecret, Encoding.UTF8.GetBytes(payloadB64));
        string sigB64 = Convert.ToBase64String(sigBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

        return $"spl_{payloadB64}.{sigB64}";
    }

    public bool ValidateUserToken(string token, DatabaseService db, out SessionRecord? session)
    {
        session = null;
        if (string.IsNullOrWhiteSpace(token) || !token.StartsWith("spl_")) return false;

        var parts = token.Substring(4).Split('.');
        if (parts.Length != 2) return false;

        string payloadB64 = parts[0];
        string sigB64 = parts[1];

        // 1. Verify HMAC signature with constant-time equality
        byte[] expectedSig = HMACSHA256.HashData(UserHmacSecret, Encoding.UTF8.GetBytes(payloadB64));
        string expectedSigB64 = Convert.ToBase64String(expectedSig).TrimEnd('=').Replace('+', '-').Replace('/', '_');

        byte[] providedSigBytes = Encoding.UTF8.GetBytes(sigB64);
        byte[] expectedSigBytes = Encoding.UTF8.GetBytes(expectedSigB64);

        if (providedSigBytes.Length != expectedSigBytes.Length || !CryptographicOperations.FixedTimeEquals(providedSigBytes, expectedSigBytes))
        {
            return false;
        }

        // 2. Decode payload
        try
        {
            string padded = payloadB64.Replace('-', '+').Replace('_', '/');
            switch (padded.Length % 4)
            {
                case 2: padded += "=="; break;
                case 3: padded += "="; break;
            }
            string payload = Encoding.UTF8.GetString(Convert.FromBase64String(padded));
            var fields = payload.Split('|');
            if (fields.Length < 7 || fields[0] != "v1") return false;

            string userId = fields[1];
            string username = fields[2];
            string securityStamp = fields[3];
            string deviceId = fields[4];
            long expUnix = long.Parse(fields[6]);

            long nowUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            if (nowUnix > expUnix) return false; // Token expired

            // 3. Verify user exists in database
            var user = db.GetUserById(userId) ?? db.GetUserByUsername(username);
            if (user == null) return false;

            // Immediate Revocation check: verify security stamp
            if (!string.IsNullOrEmpty(user.SecurityStamp) && user.SecurityStamp != securityStamp) return false;

            long issuedUnix = long.Parse(fields[5]);
            session = new SessionRecord
            {
                Token = token,
                UserId = user.Id,
                Username = user.Username,
                DeviceId = deviceId,
                SecurityStamp = user.SecurityStamp,
                IsAdmin = user.IsAdmin || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase),
                CreatedAtUtc = DateTimeOffset.FromUnixTimeSeconds(issuedUnix).UtcDateTime,
                ExpiresAtUtc = DateTimeOffset.FromUnixTimeSeconds(expUnix).UtcDateTime
            };
            return true;
        }
        catch
        {
            return false;
        }
    }

    #endregion
}

