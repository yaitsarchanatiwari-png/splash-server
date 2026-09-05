using System;
using System.Text.Json.Serialization;

namespace Java.Server;

public enum AccessStatus
{
    PendingApproval,
    Approved,
    Suspended,
    Revoked,
    Expired
}

public enum UpdateStatus
{
    Draft,
    Published,
    Delivered,
    Downloaded,
    Installed,
    Failed
}

public class UserRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string PasswordSalt { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public AccessStatus Status { get; set; } = AccessStatus.PendingApproval;
    public DateTime? AccessStartUtc { get; set; }
    public DateTime? AccessEndUtc { get; set; }
    public string? ScheduledAction { get; set; }
    public DateTime? ScheduledTimeUtc { get; set; }
    public string CurrentAppVersion { get; set; } = "1.0.0";
    public string LastIp { get; set; } = string.Empty;
    public DateTime LastSeenUtc { get; set; } = DateTime.UtcNow;
    public string SecurityStamp { get; set; } = Guid.NewGuid().ToString("N");
    public string? DeviceLockId { get; set; }
    public int FailedLoginCount { get; set; }
    public DateTime? LockoutUntilUtc { get; set; }
}

public class UserDeviceRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string UserId { get; set; } = string.Empty;
    public string DeviceId { get; set; } = string.Empty;
    public string DeviceName { get; set; } = string.Empty;
    public DateTime RegisteredAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime LastUsedUtc { get; set; } = DateTime.UtcNow;
    public bool IsBlocked { get; set; }
}

public class RefreshTokenRecord
{
    public string TokenHash { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string DeviceId { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAtUtc { get; set; } = DateTime.UtcNow.AddDays(7);
    public bool IsRevoked { get; set; }
    public string? ReplacedByTokenHash { get; set; }
}

public class SessionRecord
{
    public string Token { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string DeviceId { get; set; } = string.Empty;
    public string SecurityStamp { get; set; } = string.Empty;
    public bool IsAdmin { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAtUtc { get; set; } = DateTime.UtcNow.AddMinutes(15); // Short-lived 15m access token
}

public class UpdateRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Version { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }
    public double FileSizeMb => Math.Round((double)FileSizeBytes / (1024 * 1024), 2);
    public string Sha256Hash { get; set; } = string.Empty;
    public string RsaSignature { get; set; } = string.Empty; // Cryptographic RSA signature of binary
    public string ReleaseNotes { get; set; } = string.Empty;
    public string TargetType { get; set; } = "all"; // "all" or "user"
    public string? TargetUserId { get; set; }
    public string? TargetUsername { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public bool IsMandatory { get; set; }
    public UpdateStatus Status { get; set; } = UpdateStatus.Published;
}

public class AuditRecord
{
    public int Id { get; set; }
    public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    public string Username { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string? DeviceId { get; set; }
}

public class SessionLease
{
    public string UserId { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string DeviceId { get; set; } = string.Empty;
    public DateTime IssuedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAtUtc { get; set; } = DateTime.UtcNow.AddSeconds(90);
    public string SecurityStamp { get; set; } = string.Empty;
    public string SessionSaltHex { get; set; } = string.Empty;
}

public class LeaseEnvelope
{
    public string PayloadJson { get; set; } = string.Empty;
    public string SignatureBase64 { get; set; } = string.Empty;
    public string PublicKeyPem { get; set; } = string.Empty;
    public DateTime ExpiresAtUtc { get; set; }
}

// Request / Response DTOs
public record RegisterRequest(string Username, string Password, string ConfirmPassword, string? DeviceId, string? DeviceName);
public record LoginRequest(string Username, string Password, string? ClientVersion, string? DeviceId, string? DeviceName);
public record RefreshTokenRequest(string RefreshToken, string DeviceId);
public record AuthResponse(bool Success, string Message, string? Token, string? RefreshToken, string? Status, LeaseEnvelope? Lease, UserDto? User);
public record StatusResponse(bool Success, string Status, string Message, DateTime? AccessEndUtc, bool HasActiveAccess, LeaseEnvelope? Lease, DateTime ServerTimeUtc);
public record UserDto(string Id, string Username, string Status, DateTime? AccessStartUtc, DateTime? AccessEndUtc, string? ScheduledAction, DateTime? ScheduledTimeUtc, string CurrentAppVersion, DateTime LastSeenUtc, string? DeviceLockId);
public record UpdateCheckResponse(bool UpdateAvailable, string? Id, string? Version, double SizeMb, string? ReleaseNotes, string? Sha256Hash, string? RsaSignature, string? DownloadUrl, bool IsMandatory);
public record ReportStatusRequest(string UpdateId, string Status, string? ErrorMessage);
public record UserAccessRequest(string Status, DateTime? AccessStartUtc, DateTime? AccessEndUtc, string? ScheduledAction, DateTime? ScheduledTimeUtc);
public record ChangeUsernameRequest(string NewUsername, string CurrentPassword);
public record ChangePasswordRequest(string CurrentPassword, string NewPassword, string ConfirmNewPassword);
public record GrantByUsernameRequest(string Username, double? DurationHours);

