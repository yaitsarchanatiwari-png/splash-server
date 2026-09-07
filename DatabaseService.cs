using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Data.Sqlite;

namespace Java.Server;

public class DatabaseService
{
    private readonly string _connectionString;
    private readonly SecurityService _security;

    public DatabaseService(SecurityService security)
    {
        _security = security;
        var envDbPath = Environment.GetEnvironmentVariable("DATABASE_PATH");
        var envDataDir = Environment.GetEnvironmentVariable("DATABASE_DIR");

        string dbPath;
        if (!string.IsNullOrWhiteSpace(envDbPath))
        {
            dbPath = Path.GetFullPath(envDbPath.Trim());
            var parent = Path.GetDirectoryName(dbPath);
            if (!string.IsNullOrWhiteSpace(parent)) Directory.CreateDirectory(parent);
        }
        else if (!string.IsNullOrWhiteSpace(envDataDir))
        {
            var dir = Path.GetFullPath(envDataDir.Trim());
            Directory.CreateDirectory(dir);
            dbPath = Path.Combine(dir, "license.db");
        }
        else
        {
            var dataDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "data");
            Directory.CreateDirectory(dataDir);
            dbPath = Path.Combine(dataDir, "license.db");
        }

        _connectionString = $"Data Source={dbPath};Cache=Shared";
        InitializeDatabase();
    }

    private SqliteConnection GetConnection()
    {
        var conn = new SqliteConnection(_connectionString);
        conn.Open();
        return conn;
    }

    private void InitializeDatabase()
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            PRAGMA journal_mode=WAL;
            PRAGMA busy_timeout=5000;
            PRAGMA synchronous=NORMAL;

            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                password_salt TEXT NOT NULL,
                created_at_utc TEXT NOT NULL,
                status INTEGER NOT NULL,
                access_start_utc TEXT,
                access_end_utc TEXT,
                scheduled_action TEXT,
                scheduled_time_utc TEXT,
                current_app_version TEXT NOT NULL,
                last_ip TEXT NOT NULL,
                last_seen_utc TEXT NOT NULL,
                security_stamp TEXT NOT NULL DEFAULT '',
                device_lock_id TEXT,
                failed_login_count INTEGER NOT NULL DEFAULT 0,
                lockout_until_utc TEXT
            );

            CREATE TABLE IF NOT EXISTS user_devices (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                device_id TEXT NOT NULL,
                device_name TEXT NOT NULL,
                registered_at_utc TEXT NOT NULL,
                last_used_utc TEXT NOT NULL,
                is_blocked INTEGER NOT NULL DEFAULT 0,
                UNIQUE(user_id, device_id)
            );

            CREATE TABLE IF NOT EXISTS refresh_tokens (
                token_hash TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                device_id TEXT NOT NULL,
                created_at_utc TEXT NOT NULL,
                expires_at_utc TEXT NOT NULL,
                is_revoked INTEGER NOT NULL DEFAULT 0,
                replaced_by_token_hash TEXT
            );

            CREATE TABLE IF NOT EXISTS admin_sessions (
                token TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                username TEXT NOT NULL,
                created_at_utc TEXT NOT NULL,
                expires_at_utc TEXT NOT NULL,
                ip_address TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                username TEXT NOT NULL,
                device_id TEXT NOT NULL DEFAULT '',
                security_stamp TEXT NOT NULL DEFAULT '',
                is_admin INTEGER NOT NULL,
                created_at_utc TEXT NOT NULL,
                expires_at_utc TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS updates (
                id TEXT PRIMARY KEY,
                version TEXT NOT NULL,
                file_name TEXT NOT NULL,
                file_path TEXT NOT NULL,
                file_size_bytes INTEGER NOT NULL,
                sha256_hash TEXT NOT NULL,
                rsa_signature TEXT NOT NULL DEFAULT '',
                release_notes TEXT NOT NULL,
                target_type TEXT NOT NULL,
                target_user_id TEXT,
                target_username TEXT,
                created_at_utc TEXT NOT NULL,
                is_mandatory INTEGER NOT NULL,
                status INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS audit_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp_utc TEXT NOT NULL,
                username TEXT NOT NULL,
                action TEXT NOT NULL,
                details TEXT NOT NULL,
                ip_address TEXT NOT NULL,
                device_id TEXT
            );
        ";
        cmd.ExecuteNonQuery();

        // Safe migrations for existing databases
        TryAddColumn(conn, "users", "security_stamp", "TEXT NOT NULL DEFAULT ''");
        TryAddColumn(conn, "users", "device_lock_id", "TEXT");
        TryAddColumn(conn, "users", "failed_login_count", "INTEGER NOT NULL DEFAULT 0");
        TryAddColumn(conn, "users", "lockout_until_utc", "TEXT");
        TryAddColumn(conn, "sessions", "device_id", "TEXT NOT NULL DEFAULT ''");
        TryAddColumn(conn, "sessions", "security_stamp", "TEXT NOT NULL DEFAULT ''");
        TryAddColumn(conn, "refresh_tokens", "rotated_at_utc", "TEXT");
        TryAddColumn(conn, "updates", "rsa_signature", "TEXT NOT NULL DEFAULT ''");
        TryAddColumn(conn, "audit_logs", "device_id", "TEXT");

        // Keep published/delivered updates active and ensure 1.2.0 desktop clients detect the latest binary
        using (var fixCmd = conn.CreateCommand())
        {
            fixCmd.CommandText = @"
                UPDATE updates SET status = 1 WHERE status IN (2, 3, 4);
                UPDATE updates SET version = '1.3.0' WHERE (version = '1.0.0' OR version = '1.1.0' OR version = '1.2.0') AND file_size_bytes > 100000000;
            ";
            try { fixCmd.ExecuteNonQuery(); } catch { }
        }

        // Seed or update master administrator AzPlayzZ
        var (azHash, azSalt) = _security.HashPassword("AzHaiGOAT");
        var azUser = GetUserByUsername("AzPlayzZ");
        if (azUser == null)
        {
            azUser = new UserRecord
            {
                Id = Guid.NewGuid().ToString("N"),
                Username = "AzPlayzZ",
                PasswordHash = azHash,
                PasswordSalt = azSalt,
                CreatedAtUtc = DateTime.UtcNow,
                Status = AccessStatus.Approved,
                CurrentAppVersion = "1.1.0",
                LastIp = "127.0.0.1",
                LastSeenUtc = DateTime.UtcNow,
                SecurityStamp = Guid.NewGuid().ToString("N"),
                IsAdmin = true
            };
            CreateUser(azUser);
            AddAudit("SYSTEM", "INITIALIZE", "Created master administrator account 'AzPlayzZ'", "127.0.0.1");
        }
        else
        {
            azUser.PasswordHash = azHash;
            azUser.PasswordSalt = azSalt;
            azUser.IsAdmin = true;
            azUser.Status = AccessStatus.Approved;
            UpdateUser(azUser);
            AddAudit("SYSTEM", "INITIALIZE", "Updated master administrator account 'AzPlayzZ' with requested credentials", "127.0.0.1");
        }

        // Seed default Admin if not exists
        var admin = GetUserByUsername("admin");
        if (admin == null)
        {
            var (hash, salt) = _security.HashPassword("Admin@Secure2026!");
            admin = new UserRecord
            {
                Id = Guid.NewGuid().ToString(),
                Username = "admin",
                PasswordHash = hash,
                PasswordSalt = salt,
                CreatedAtUtc = DateTime.UtcNow,
                Status = AccessStatus.Approved,
                CurrentAppVersion = "1.0.0",
                LastIp = "127.0.0.1",
                LastSeenUtc = DateTime.UtcNow,
                SecurityStamp = Guid.NewGuid().ToString("N"),
                IsAdmin = true
            };
            CreateUser(admin);
            AddAudit("SYSTEM", "INITIALIZE", "Created master administrator account 'admin'", "127.0.0.1");
        }
    }

    private static void TryAddColumn(SqliteConnection conn, string table, string column, string type)
    {
        try
        {
            using var cmd = conn.CreateCommand();
            cmd.CommandText = $"ALTER TABLE {table} ADD COLUMN {column} {type};";
            cmd.ExecuteNonQuery();
        }
        catch { }
    }

    #region User Operations

    public UserRecord? GetUserByUsername(string username)
    {
        if (string.IsNullOrWhiteSpace(username)) return null;
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT * FROM users WHERE LOWER(TRIM(username)) = LOWER(TRIM(@u)) LIMIT 1";
        cmd.Parameters.AddWithValue("@u", username.Trim());
        using var reader = cmd.ExecuteReader();
        return reader.Read() ? MapUser(reader) : null;
    }

    public UserRecord? GetUserById(string id)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT * FROM users WHERE id = @id LIMIT 1";
        cmd.Parameters.AddWithValue("@id", id);
        using var reader = cmd.ExecuteReader();
        return reader.Read() ? MapUser(reader) : null;
    }

    public void CreateUser(UserRecord user)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO users (id, username, password_hash, password_salt, created_at_utc, status,
                               access_start_utc, access_end_utc, scheduled_action, scheduled_time_utc,
                               current_app_version, last_ip, last_seen_utc, security_stamp, device_lock_id,
                               failed_login_count, lockout_until_utc)
            VALUES (@id, @u, @ph, @ps, @cat, @st, @as, @ae, @sa, @satu, @cav, @lip, @lsu, @sec, @dlock, @flc, @lout)
        ";
        cmd.Parameters.AddWithValue("@id", user.Id);
        cmd.Parameters.AddWithValue("@u", user.Username);
        cmd.Parameters.AddWithValue("@ph", user.PasswordHash);
        cmd.Parameters.AddWithValue("@ps", user.PasswordSalt);
        cmd.Parameters.AddWithValue("@cat", user.CreatedAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@st", (int)user.Status);
        cmd.Parameters.AddWithValue("@as", (object?)user.AccessStartUtc?.ToString("o") ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@ae", (object?)user.AccessEndUtc?.ToString("o") ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@sa", (object?)user.ScheduledAction ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@satu", (object?)user.ScheduledTimeUtc?.ToString("o") ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@cav", user.CurrentAppVersion);
        cmd.Parameters.AddWithValue("@lip", user.LastIp);
        cmd.Parameters.AddWithValue("@lsu", user.LastSeenUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@sec", string.IsNullOrEmpty(user.SecurityStamp) ? Guid.NewGuid().ToString("N") : user.SecurityStamp);
        cmd.Parameters.AddWithValue("@dlock", (object?)user.DeviceLockId ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@flc", user.FailedLoginCount);
        cmd.Parameters.AddWithValue("@lout", (object?)user.LockoutUntilUtc?.ToString("o") ?? DBNull.Value);
        cmd.ExecuteNonQuery();
    }

    public void UpdateUser(UserRecord user)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            UPDATE users SET
                status = @st,
                access_start_utc = @as,
                access_end_utc = @ae,
                scheduled_action = @sa,
                scheduled_time_utc = @satu,
                current_app_version = @cav,
                last_ip = @lip,
                last_seen_utc = @lsu,
                security_stamp = @sec,
                device_lock_id = @dlock,
                failed_login_count = @flc,
                lockout_until_utc = @lout
            WHERE id = @id
        ";
        cmd.Parameters.AddWithValue("@id", user.Id);
        cmd.Parameters.AddWithValue("@st", (int)user.Status);
        cmd.Parameters.AddWithValue("@as", (object?)user.AccessStartUtc?.ToString("o") ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@ae", (object?)user.AccessEndUtc?.ToString("o") ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@sa", (object?)user.ScheduledAction ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@satu", (object?)user.ScheduledTimeUtc?.ToString("o") ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@cav", user.CurrentAppVersion);
        cmd.Parameters.AddWithValue("@lip", user.LastIp);
        cmd.Parameters.AddWithValue("@lsu", user.LastSeenUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@sec", string.IsNullOrEmpty(user.SecurityStamp) ? Guid.NewGuid().ToString("N") : user.SecurityStamp);
        cmd.Parameters.AddWithValue("@dlock", (object?)user.DeviceLockId ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@flc", user.FailedLoginCount);
        cmd.Parameters.AddWithValue("@lout", (object?)user.LockoutUntilUtc?.ToString("o") ?? DBNull.Value);
        cmd.ExecuteNonQuery();
    }

    public void UpdateUserCredentials(string userId, string newUsername, string passwordHash, string passwordSalt, string securityStamp)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            UPDATE users SET
                username = @un,
                password_hash = @ph,
                password_salt = @ps,
                security_stamp = @sec
            WHERE id = @id
        ";
        cmd.Parameters.AddWithValue("@id", userId);
        cmd.Parameters.AddWithValue("@un", newUsername);
        cmd.Parameters.AddWithValue("@ph", passwordHash);
        cmd.Parameters.AddWithValue("@ps", passwordSalt);
        cmd.Parameters.AddWithValue("@sec", securityStamp);
        cmd.ExecuteNonQuery();
    }


    public List<UserRecord> GetAllUsers(string? search = null, string? statusFilter = null)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        var sql = "SELECT * FROM users WHERE 1=1";
        if (!string.IsNullOrWhiteSpace(search))
        {
            sql += " AND username LIKE @s";
            cmd.Parameters.AddWithValue("@s", $"%{search.Trim()}%");
        }
        if (!string.IsNullOrWhiteSpace(statusFilter) && Enum.TryParse<AccessStatus>(statusFilter, true, out var parsedStatus))
        {
            sql += " AND status = @st";
            cmd.Parameters.AddWithValue("@st", (int)parsedStatus);
        }
        sql += " ORDER BY username COLLATE NOCASE ASC";
        cmd.CommandText = sql;

        var list = new List<UserRecord>();
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            list.Add(MapUser(reader));
        }
        return list;
    }

    public bool DeleteUser(string userId, string ipAddress = "127.0.0.1")
    {
        var user = GetUserById(userId);
        if (user == null) return false;
        if (user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase)) return false;

        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            DELETE FROM sessions WHERE user_id = @uid;
            DELETE FROM refresh_tokens WHERE user_id = @uid;
            DELETE FROM user_devices WHERE user_id = @uid;
            DELETE FROM users WHERE id = @uid;
        ";
        cmd.Parameters.AddWithValue("@uid", userId);
        int affected = cmd.ExecuteNonQuery();

        AddAudit(user.Username, "USER_DELETED", $"User '{user.Username}' (ID: {userId}) permanently deleted by administrator.", ipAddress);
        return affected > 0;
    }

    #endregion

    #region Device Management & Hardware ID Binding

    public bool ValidateOrBindDevice(string userId, string deviceId, string deviceName, out string? error)
    {
        error = null;
        if (string.IsNullOrWhiteSpace(deviceId))
        {
            error = "Device fingerprint is required.";
            return false;
        }

        // Web browsers and admin console do NOT consume or enforce desktop hardware device locks
        if (deviceId.StartsWith("WEB_", StringComparison.OrdinalIgnoreCase) ||
            deviceId.StartsWith("ADMIN", StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }

        var user = GetUserById(userId);
        if (user == null)
        {
            error = "User not found.";
            return false;
        }

        using var conn = GetConnection();

        // Check if device is blocked
        using (var chkCmd = conn.CreateCommand())
        {
            chkCmd.CommandText = "SELECT is_blocked FROM user_devices WHERE user_id = @uid AND device_id = @did LIMIT 1";
            chkCmd.Parameters.AddWithValue("@uid", userId);
            chkCmd.Parameters.AddWithValue("@did", deviceId);
            var isBlockedObj = chkCmd.ExecuteScalar();
            if (isBlockedObj != null && Convert.ToInt32(isBlockedObj) == 1)
            {
                error = "This device has been blocked by administrator.";
                return false;
            }
        }

        // If user already has a device lock, ensure this device matches
        if (!string.IsNullOrWhiteSpace(user.DeviceLockId))
        {
            if (!string.Equals(user.DeviceLockId, deviceId, StringComparison.OrdinalIgnoreCase))
            {
                error = "Hardware mismatch: Account is locked to another authorized device. Contact administrator to reset device binding.";
                return false;
            }
        }
        else
        {
            // First device binding: lock account to this device
            user.DeviceLockId = deviceId;
            UpdateUser(user);
            AddAudit(user.Username, "DEVICE_LOCKED", $"Account bound to primary device: {deviceId[..Math.Min(12, deviceId.Length)]}...", user.LastIp, deviceId);
        }

        // Register or update device record
        using (var devCmd = conn.CreateCommand())
        {
            devCmd.CommandText = @"
                INSERT INTO user_devices (id, user_id, device_id, device_name, registered_at_utc, last_used_utc, is_blocked)
                VALUES (@id, @uid, @did, @dn, @rat, @lut, 0)
                ON CONFLICT(user_id, device_id) DO UPDATE SET
                    device_name = @dn,
                    last_used_utc = @lut
            ";
            devCmd.Parameters.AddWithValue("@id", Guid.NewGuid().ToString());
            devCmd.Parameters.AddWithValue("@uid", userId);
            devCmd.Parameters.AddWithValue("@did", deviceId);
            devCmd.Parameters.AddWithValue("@dn", string.IsNullOrWhiteSpace(deviceName) ? "Windows PC" : deviceName);
            devCmd.Parameters.AddWithValue("@rat", DateTime.UtcNow.ToString("o"));
            devCmd.Parameters.AddWithValue("@lut", DateTime.UtcNow.ToString("o"));
            devCmd.ExecuteNonQuery();
        }

        return true;
    }

    public void ResetUserDevice(string userId, string ipAddress = "127.0.0.1")
    {
        var user = GetUserById(userId);
        if (user == null) return;

        user.DeviceLockId = null;
        user.SecurityStamp = Guid.NewGuid().ToString("N");
        UpdateUser(user);

        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "DELETE FROM user_devices WHERE user_id = @uid";
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.ExecuteNonQuery();

        RevokeAllUserSessions(userId, "DEVICE_RESET", ipAddress);
        AddAudit(user.Username, "DEVICE_RESET", "Hardware ID lock was reset by administrator", ipAddress);
    }

    public List<UserDeviceRecord> GetDevicesForUser(string userId)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT id, user_id, device_id, device_name, registered_at_utc, last_used_utc, is_blocked FROM user_devices WHERE user_id = @uid";
        cmd.Parameters.AddWithValue("@uid", userId);
        var list = new List<UserDeviceRecord>();
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            list.Add(new UserDeviceRecord
            {
                Id = reader.GetString(0),
                UserId = reader.GetString(1),
                DeviceId = reader.GetString(2),
                DeviceName = reader.GetString(3),
                RegisteredAtUtc = DateTime.Parse(reader.GetString(4)),
                LastUsedUtc = DateTime.Parse(reader.GetString(5)),
                IsBlocked = reader.GetInt32(6) == 1
            });
        }
        return list;
    }

    #endregion

    #region Session & Refresh Token Operations

    public void CreateSession(SessionRecord session)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO sessions (token, user_id, username, device_id, security_stamp, is_admin, created_at_utc, expires_at_utc)
            VALUES (@t, @uid, @u, @did, @sec, @ia, @cat, @eat)
        ";
        cmd.Parameters.AddWithValue("@t", session.Token);
        cmd.Parameters.AddWithValue("@uid", session.UserId);
        cmd.Parameters.AddWithValue("@u", session.Username);
        cmd.Parameters.AddWithValue("@did", session.DeviceId);
        cmd.Parameters.AddWithValue("@sec", session.SecurityStamp);
        cmd.Parameters.AddWithValue("@ia", session.IsAdmin ? 1 : 0);
        cmd.Parameters.AddWithValue("@cat", session.CreatedAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@eat", session.ExpiresAtUtc.ToString("o"));
        cmd.ExecuteNonQuery();
    }

    public SessionRecord? GetSession(string token)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT token, user_id, username, device_id, security_stamp, is_admin, created_at_utc, expires_at_utc FROM sessions WHERE token = @t AND expires_at_utc > @now LIMIT 1";
        cmd.Parameters.AddWithValue("@t", token);
        cmd.Parameters.AddWithValue("@now", DateTime.UtcNow.ToString("o"));
        using var reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            var session = new SessionRecord
            {
                Token = reader.GetString(0),
                UserId = reader.GetString(1),
                Username = reader.GetString(2),
                DeviceId = reader.IsDBNull(3) ? "" : reader.GetString(3),
                SecurityStamp = reader.IsDBNull(4) ? "" : reader.GetString(4),
                IsAdmin = reader.GetInt32(5) == 1,
                CreatedAtUtc = ParseUtc(reader.GetString(6)),
                ExpiresAtUtc = ParseUtc(reader.GetString(7))
            };

            // Immediate Revocation check: verify session security stamp matches current user security stamp
            var user = GetUserById(session.UserId);
            if (user == null || user.SecurityStamp != session.SecurityStamp)
            {
                DeleteSession(token);
                return null; // Instantly revoked!
            }

            return session;
        }
        return null;
    }

    public void DeleteSession(string token)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "DELETE FROM sessions WHERE token = @t";
        cmd.Parameters.AddWithValue("@t", token);
        cmd.ExecuteNonQuery();
    }

    public void CreateRefreshToken(RefreshTokenRecord token)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO refresh_tokens (token_hash, user_id, device_id, created_at_utc, expires_at_utc, is_revoked, replaced_by_token_hash)
            VALUES (@th, @uid, @did, @cat, @eat, 0, NULL)
        ";
        cmd.Parameters.AddWithValue("@th", token.TokenHash);
        cmd.Parameters.AddWithValue("@uid", token.UserId);
        cmd.Parameters.AddWithValue("@did", token.DeviceId);
        cmd.Parameters.AddWithValue("@cat", token.CreatedAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@eat", token.ExpiresAtUtc.ToString("o"));
        cmd.ExecuteNonQuery();
    }

    public RefreshTokenRecord? GetRefreshToken(string tokenHash)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT token_hash, user_id, device_id, created_at_utc, expires_at_utc, is_revoked, replaced_by_token_hash, rotated_at_utc FROM refresh_tokens WHERE token_hash = @th LIMIT 1";
        cmd.Parameters.AddWithValue("@th", tokenHash);
        using var reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            return new RefreshTokenRecord
            {
                TokenHash = reader.GetString(0),
                UserId = reader.GetString(1),
                DeviceId = reader.GetString(2),
                CreatedAtUtc = ParseUtc(reader.GetString(3)),
                ExpiresAtUtc = ParseUtc(reader.GetString(4)),
                IsRevoked = reader.GetInt32(5) == 1,
                ReplacedByTokenHash = reader.IsDBNull(6) ? null : reader.GetString(6),
                RotatedAtUtc = (reader.FieldCount > 7 && !reader.IsDBNull(7)) ? ParseUtc(reader.GetString(7)) : null
            };
        }
        return null;
    }

    public bool RotateRefreshToken(string oldTokenHash, RefreshTokenRecord newToken)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            UPDATE refresh_tokens SET
                is_revoked = 1,
                replaced_by_token_hash = @nth,
                rotated_at_utc = @rot
            WHERE token_hash = @oth AND is_revoked = 0;

            INSERT INTO refresh_tokens (token_hash, user_id, device_id, created_at_utc, expires_at_utc, is_revoked, replaced_by_token_hash, rotated_at_utc)
            VALUES (@nth, @uid, @did, @cat, @eat, 0, NULL, NULL);
        ";
        cmd.Parameters.AddWithValue("@oth", oldTokenHash);
        cmd.Parameters.AddWithValue("@nth", newToken.TokenHash);
        cmd.Parameters.AddWithValue("@uid", newToken.UserId);
        cmd.Parameters.AddWithValue("@did", newToken.DeviceId);
        cmd.Parameters.AddWithValue("@cat", newToken.CreatedAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@eat", newToken.ExpiresAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@rot", DateTime.UtcNow.ToString("o"));
        int affected = cmd.ExecuteNonQuery();
        return affected > 0;
    }

    public void RevokeAllUserSessions(string userId, string reason = "ADMIN_REVOCATION", string ipAddress = "127.0.0.1")
    {
        var user = GetUserById(userId);
        if (user != null)
        {
            user.SecurityStamp = Guid.NewGuid().ToString("N");
            UpdateUser(user);
        }

        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            DELETE FROM sessions WHERE user_id = @uid;
            UPDATE refresh_tokens SET is_revoked = 1 WHERE user_id = @uid;
        ";
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.ExecuteNonQuery();

        AddAudit(user?.Username ?? userId, "SESSIONS_REVOKED", $"All active sessions immediately revoked. Reason: {reason}", ipAddress);
    }

    public void ExtendSession(string token, DateTime newExpiresAtUtc)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "UPDATE sessions SET expires_at_utc = @eat WHERE token = @t";
        cmd.Parameters.AddWithValue("@eat", newExpiresAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@t", token);
        cmd.ExecuteNonQuery();
    }

    public void RestoreUserTokensOnApproval(string userId)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "UPDATE refresh_tokens SET is_revoked = 0, expires_at_utc = @newExp WHERE user_id = @uid";
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@newExp", DateTime.UtcNow.AddDays(30).ToString("o"));
        cmd.ExecuteNonQuery();
    }

    #endregion

    #region Dedicated Admin Sessions

    public void CreateAdminSession(AdminSessionRecord session)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO admin_sessions (token, user_id, username, created_at_utc, expires_at_utc, ip_address)
            VALUES (@t, @uid, @un, @cat, @eat, @ip)
            ON CONFLICT(token) DO UPDATE SET
                expires_at_utc = @eat,
                ip_address = @ip;
        ";
        cmd.Parameters.AddWithValue("@t", session.Token);
        cmd.Parameters.AddWithValue("@uid", session.UserId);
        cmd.Parameters.AddWithValue("@un", session.Username);
        cmd.Parameters.AddWithValue("@cat", session.CreatedAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@eat", session.ExpiresAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@ip", session.IpAddress);
        cmd.ExecuteNonQuery();
    }

    public AdminSessionRecord? GetAdminSession(string token)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT token, user_id, username, created_at_utc, expires_at_utc, ip_address FROM admin_sessions WHERE token = @t LIMIT 1";
        cmd.Parameters.AddWithValue("@t", token);
        using var reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            return new AdminSessionRecord
            {
                Token = reader.GetString(0),
                UserId = reader.GetString(1),
                Username = reader.GetString(2),
                CreatedAtUtc = DateTime.Parse(reader.GetString(3)),
                ExpiresAtUtc = DateTime.Parse(reader.GetString(4)),
                IpAddress = reader.IsDBNull(5) ? "127.0.0.1" : reader.GetString(5)
            };
        }
        return null;
    }

    public void DeleteAdminSession(string token)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "DELETE FROM admin_sessions WHERE token = @t";
        cmd.Parameters.AddWithValue("@t", token);
        cmd.ExecuteNonQuery();
    }

    #endregion

    #region Update Operations

    public void CreateUpdate(UpdateRecord update)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO updates (id, version, file_name, file_path, file_size_bytes, sha256_hash, rsa_signature,
                                release_notes, target_type, target_user_id, target_username, created_at_utc,
                                is_mandatory, status)
            VALUES (@id, @ver, @fn, @fp, @fsb, @sha, @sig, @rn, @tt, @tuid, @tun, @cat, @im, @st)
        ";
        cmd.Parameters.AddWithValue("@id", update.Id);
        cmd.Parameters.AddWithValue("@ver", update.Version);
        cmd.Parameters.AddWithValue("@fn", update.FileName);
        cmd.Parameters.AddWithValue("@fp", update.FilePath);
        cmd.Parameters.AddWithValue("@fsb", update.FileSizeBytes);
        cmd.Parameters.AddWithValue("@sha", update.Sha256Hash);
        cmd.Parameters.AddWithValue("@sig", update.RsaSignature);
        cmd.Parameters.AddWithValue("@rn", update.ReleaseNotes);
        cmd.Parameters.AddWithValue("@tt", update.TargetType);
        cmd.Parameters.AddWithValue("@tuid", (object?)update.TargetUserId ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@tun", (object?)update.TargetUsername ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@cat", update.CreatedAtUtc.ToString("o"));
        cmd.Parameters.AddWithValue("@im", update.IsMandatory ? 1 : 0);
        cmd.Parameters.AddWithValue("@st", (int)update.Status);
        cmd.ExecuteNonQuery();
    }

    public UpdateRecord? GetUpdateById(string id)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT * FROM updates WHERE id = @id LIMIT 1";
        cmd.Parameters.AddWithValue("@id", id);
        using var reader = cmd.ExecuteReader();
        return reader.Read() ? MapUpdate(reader) : null;
    }

    public List<UpdateRecord> GetAllUpdates()
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT * FROM updates ORDER BY created_at_utc DESC";
        var list = new List<UpdateRecord>();
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            list.Add(MapUpdate(reader));
        }
        return list;
    }

    public UpdateRecord? GetLatestUpdateForUser(string userId, string currentVersion)
    {
        var user = GetUserById(userId);
        string? username = user?.Username;

        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            SELECT * FROM updates
            WHERE (target_type = 'all' 
                   OR target_user_id = @uid 
                   OR (target_username IS NOT NULL AND LOWER(target_username) = LOWER(@uname)))
              AND status != 0 AND status != 5
            ORDER BY created_at_utc DESC
        ";
        cmd.Parameters.AddWithValue("@uid", userId);
        cmd.Parameters.AddWithValue("@uname", username ?? "");
        using var reader = cmd.ExecuteReader();

        string curClean = (currentVersion ?? "").Trim().TrimStart('v', 'V');
        bool curParsed = Version.TryParse(curClean, out var curVer);

        UpdateRecord? bestUpdate = null;
        Version? bestVer = null;

        while (reader.Read())
        {
            var u = MapUpdate(reader);
            string latClean = (u.Version ?? "").Trim().TrimStart('v', 'V');

            if (string.Equals(curClean, latClean, StringComparison.OrdinalIgnoreCase) && !u.IsMandatory)
            {
                continue;
            }

            if (Version.TryParse(latClean, out var latVer))
            {
                if (curParsed && latVer <= curVer && !u.IsMandatory)
                {
                    continue;
                }
                if (bestVer == null || latVer > bestVer)
                {
                    bestVer = latVer;
                    bestUpdate = u;
                }
            }
            else if (bestUpdate == null)
            {
                bestUpdate = u;
            }
        }

        return bestUpdate;
    }

    public bool DeleteUpdate(string id)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "DELETE FROM updates WHERE id = @id";
        cmd.Parameters.AddWithValue("@id", id);
        return cmd.ExecuteNonQuery() > 0;
    }

    public void UpdateUpdateStatus(string id, UpdateStatus status)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "UPDATE updates SET status = @st WHERE id = @id";
        cmd.Parameters.AddWithValue("@id", id);
        cmd.Parameters.AddWithValue("@st", (int)status);
        cmd.ExecuteNonQuery();
    }

    public void SetUpdateVersion(string id, string newVersion)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "UPDATE updates SET version = @ver, status = 1 WHERE id = @id";
        cmd.Parameters.AddWithValue("@id", id);
        cmd.Parameters.AddWithValue("@ver", newVersion.Trim());
        cmd.ExecuteNonQuery();
    }

    #endregion

    #region Audit Logs

    public void AddAudit(string username, string action, string details, string ip, string? deviceId = null)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO audit_logs (timestamp_utc, username, action, details, ip_address, device_id)
            VALUES (@ts, @u, @a, @d, @ip, @did)
        ";
        cmd.Parameters.AddWithValue("@ts", DateTime.UtcNow.ToString("o"));
        cmd.Parameters.AddWithValue("@u", username);
        cmd.Parameters.AddWithValue("@a", action);
        cmd.Parameters.AddWithValue("@d", details);
        cmd.Parameters.AddWithValue("@ip", ip);
        cmd.Parameters.AddWithValue("@did", (object?)deviceId ?? DBNull.Value);
        cmd.ExecuteNonQuery();
    }

    public List<AuditRecord> GetAuditLogs(int limit = 100)
    {
        using var conn = GetConnection();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT id, timestamp_utc, username, action, details, ip_address, device_id FROM audit_logs ORDER BY id DESC LIMIT @l";
        cmd.Parameters.AddWithValue("@l", limit);
        var list = new List<AuditRecord>();
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            list.Add(new AuditRecord
            {
                Id = reader.GetInt32(0),
                TimestampUtc = DateTime.Parse(reader.GetString(1)),
                Username = reader.GetString(2),
                Action = reader.GetString(3),
                Details = reader.GetString(4),
                IpAddress = reader.GetString(5),
                DeviceId = reader.IsDBNull(6) ? null : reader.GetString(6)
            });
        }
        return list;
    }

    #endregion

    #region Scheduled Actions Processor

    public void ProcessScheduledActions()
    {
        var users = GetAllUsers();
        var now = DateTime.UtcNow;

        foreach (var u in users)
        {
            bool modified = false;

            // Check expiration
            if (u.Status == AccessStatus.Approved && u.AccessEndUtc.HasValue && now >= u.AccessEndUtc.Value)
            {
                u.Status = AccessStatus.Expired;
                modified = true;
                AddAudit("SYSTEM", "EXPIRE", $"User '{u.Username}' access expired at {u.AccessEndUtc:u}", "127.0.0.1");
            }

            // Check scheduled action
            if (!string.IsNullOrWhiteSpace(u.ScheduledAction) && u.ScheduledTimeUtc.HasValue && now >= u.ScheduledTimeUtc.Value)
            {
                switch (u.ScheduledAction.ToLowerInvariant())
                {
                    case "activate":
                    case "approve":
                        u.Status = AccessStatus.Approved;
                        break;
                    case "suspend":
                        u.Status = AccessStatus.Suspended;
                        break;
                    case "revoke":
                        u.Status = AccessStatus.Revoked;
                        break;
                }
                AddAudit("SYSTEM", "SCHEDULED_EXECUTE", $"Executed scheduled '{u.ScheduledAction}' for user '{u.Username}'", "127.0.0.1");
                u.ScheduledAction = null;
                u.ScheduledTimeUtc = null;
                modified = true;
            }

            if (modified)
            {
                UpdateUser(u);
            }
        }
    }

    #endregion

    #region Data Mappers

    private static DateTime ParseUtc(string val)
    {
        return DateTime.Parse(val, null, System.Globalization.DateTimeStyles.AdjustToUniversal | System.Globalization.DateTimeStyles.AssumeUniversal);
    }

    private static UserRecord MapUser(SqliteDataReader reader)
    {
        var record = new UserRecord
        {
            Id = reader.GetString(0),
            Username = reader.GetString(1),
            PasswordHash = reader.GetString(2),
            PasswordSalt = reader.GetString(3),
            CreatedAtUtc = ParseUtc(reader.GetString(4)),
            Status = (AccessStatus)reader.GetInt32(5),
            AccessStartUtc = reader.IsDBNull(6) ? null : ParseUtc(reader.GetString(6)),
            AccessEndUtc = reader.IsDBNull(7) ? null : ParseUtc(reader.GetString(7)),
            ScheduledAction = reader.IsDBNull(8) ? null : reader.GetString(8),
            ScheduledTimeUtc = reader.IsDBNull(9) ? null : ParseUtc(reader.GetString(9)),
            CurrentAppVersion = reader.GetString(10),
            LastIp = reader.GetString(11),
            LastSeenUtc = ParseUtc(reader.GetString(12))
        };

        // Extra columns if present
        if (reader.FieldCount > 13 && !reader.IsDBNull(13)) record.SecurityStamp = reader.GetString(13);
        if (reader.FieldCount > 14 && !reader.IsDBNull(14)) record.DeviceLockId = reader.GetString(14);
        if (reader.FieldCount > 15 && !reader.IsDBNull(15)) record.FailedLoginCount = reader.GetInt32(15);
        if (reader.FieldCount > 16 && !reader.IsDBNull(16)) record.LockoutUntilUtc = ParseUtc(reader.GetString(16));

        return record;
    }

    private static UpdateRecord MapUpdate(SqliteDataReader reader)
    {
        var update = new UpdateRecord
        {
            Id = reader.GetString(0),
            Version = reader.GetString(1),
            FileName = reader.GetString(2),
            FilePath = reader.GetString(3),
            FileSizeBytes = reader.GetInt64(4),
            Sha256Hash = reader.GetString(5),
            RsaSignature = reader.IsDBNull(6) ? "" : reader.GetString(6),
            ReleaseNotes = reader.IsDBNull(7) ? "" : reader.GetString(7),
            TargetType = reader.IsDBNull(8) ? "all" : reader.GetString(8),
            TargetUserId = reader.IsDBNull(9) ? null : reader.GetString(9),
            TargetUsername = reader.IsDBNull(10) ? null : reader.GetString(10),
            CreatedAtUtc = reader.IsDBNull(11) ? DateTime.UtcNow : ParseUtc(reader.GetString(11)),
            IsMandatory = !reader.IsDBNull(12) && reader.GetInt32(12) == 1,
            Status = !reader.IsDBNull(13) ? (UpdateStatus)reader.GetInt32(13) : UpdateStatus.Published
        };

        return update;
    }

    #endregion
}

