using System.IO;
using System.Text.Json;
using System.Text.RegularExpressions;
using Java.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Port configuration: bind to all network interfaces (0.0.0.0) so other PCs on the network can connect
var port = Environment.GetEnvironmentVariable("PORT") ?? "5050";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 1024L * 1024L * 1024L; // 1 GB body limit
    options.Limits.MinRequestBodyDataRate = null; // Prevent slow connection drops
});

builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 1024L * 1024L * 1024L; // 1 GB multipart limit
});

builder.Services.AddSingleton<SecurityService>();
builder.Services.AddSingleton<DatabaseService>();

// Background scheduling engine
builder.Services.AddHostedService<ScheduledAccessWorker>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

app.UseCors();

// Security Headers Middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Append("Permissions-Policy", "geolocation=(), camera=(), microphone=()");
    context.Response.Headers.Append("Content-Security-Policy", "default-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; media-src 'self' https: blob:; connect-src 'self' https:;");
    await next();
});

// Discover all possible wwwroot locations (bin directory, content root, or source directory)
string[] wwwrootCandidates = [
    Path.Combine(app.Environment.ContentRootPath, "wwwroot"),
    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot"),
    Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "wwwroot"))
];

var validWwwroots = wwwrootCandidates.Where(Directory.Exists).Distinct().ToList();

app.UseDefaultFiles();
app.UseStaticFiles();

foreach (var dir in validWwwroots)
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(dir),
        RequestPath = ""
    });
}

string? FindHtmlFile(params string[] subPaths)
{
    foreach (var dir in validWwwroots)
    {
        var target = Path.Combine(dir, Path.Combine(subPaths));
        if (File.Exists(target)) return target;
    }
    return null;
}

var security = app.Services.GetRequiredService<SecurityService>();
var db = app.Services.GetRequiredService<DatabaseService>();

// Auto-extract updates package if present
try
{
    var updatesDir = Path.Combine(app.Environment.ContentRootPath, "data", "updates");
    Directory.CreateDirectory(updatesDir);
    var zipPath = Path.Combine(updatesDir, "Splash.zip");
    var exePath = Path.Combine(updatesDir, "Splash.exe");
    if (File.Exists(zipPath))
    {
        bool needsExtract = !File.Exists(exePath) || new FileInfo(exePath).Length == 0 || File.GetLastWriteTimeUtc(zipPath) > File.GetLastWriteTimeUtc(exePath);
        if (needsExtract)
        {
            System.IO.Compression.ZipFile.ExtractToDirectory(zipPath, updatesDir, true);
            var wwwrootExe = Path.Combine(app.Environment.ContentRootPath, "wwwroot", "Splash.exe");
            try { File.Copy(exePath, wwwrootExe, true); } catch { }
            var wwwrootSetup = Path.Combine(app.Environment.ContentRootPath, "wwwroot", "SplashSetup.exe");
            try { if (!File.Exists(wwwrootSetup) || new FileInfo(wwwrootSetup).Length == 0) File.Copy(exePath, wwwrootSetup, true); } catch { }
            var updatesSetup = Path.Combine(updatesDir, "SplashSetup.exe");
            try { if (!File.Exists(updatesSetup) || new FileInfo(updatesSetup).Length == 0) File.Copy(exePath, updatesSetup, true); } catch { }
        }
    }
}
catch { }

// Root / Splash Website & Health Check
app.MapGet("/", () =>
{
    var path = FindHtmlFile("index.html");
    if (path != null) return Results.File(path, "text/html");
    return Results.Ok(new { Name = "Splash Protection Engine", Status = "Online" });
});
app.MapGet("/api/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }));
app.MapGet("/api/server/public-key", () => Results.Ok(new { PublicKeyPem = security.PublicKeyPem, PublicKeyXml = security.PublicKeyXml }));

// Web Admin Control Panel Endpoints (Configurable Secret URL, default: /az-vault-9f82k7)
var adminPathSlug = (Environment.GetEnvironmentVariable("ADMIN_URL_PATH") ?? "az-vault-9f82k7").Trim().Trim('/');

// HARDENED ADMIN ROUTING:
// Helper to serve admin static files strictly under the secret path
IResult ServeAdminStaticFile(string? path, HttpContext ctx, string baseSlug)
{
    if (string.IsNullOrWhiteSpace(path))
    {
        var p = FindHtmlFile("admin", "index.html");
        if (p != null) return Results.File(p, "text/html");
        return Results.NotFound();
    }

    var adminDirs = validWwwroots.Select(w => Path.Combine(w, "admin")).Where(Directory.Exists);
    foreach (var b in adminDirs)
    {
        var full = Path.Combine(b, path.Replace('/', Path.DirectorySeparatorChar));
        if (File.Exists(full))
        {
            var ext = Path.GetExtension(full).ToLowerInvariant();
            var contentType = ext switch
            {
                ".html" => "text/html",
                ".css" => "text/css",
                ".js" => "application/javascript",
                ".png" => "image/png",
                ".ico" => "image/x-icon",
                ".svg" => "image/svg+xml",
                ".jpg" or ".jpeg" => "image/jpeg",
                _ => "application/octet-stream"
            };
            return Results.File(full, contentType);
        }
    }
    var fallback = FindHtmlFile("admin", "index.html");
    if (fallback != null) return Results.File(fallback, "text/html");
    return Results.NotFound();
}

// Public /admin and old routes are completely cloaked (returns 404).
app.MapGet("/admin", () => Results.NotFound());
app.MapGet("/admin/{*path}", () => Results.NotFound());
app.MapGet("/az-control-6767", () => Results.NotFound());
app.MapGet("/az-control-6767/{*path}", () => Results.NotFound());

// Admin Panel is served ONLY on the hardened secret URL
app.MapGet($"/{adminPathSlug}", (HttpContext ctx) => ServeAdminStaticFile(null, ctx, adminPathSlug));
app.MapGet($"/{adminPathSlug}/", (HttpContext ctx) => ServeAdminStaticFile(null, ctx, adminPathSlug));
app.MapGet($"/{adminPathSlug}/{{*path}}", (string? path, HttpContext ctx) => ServeAdminStaticFile(path, ctx, adminPathSlug));

// Auth Page (Sign In & Register)
app.MapGet("/auth", () =>
{
    var path = FindHtmlFile("auth", "index.html");
    if (path != null) return Results.File(path, "text/html");
    return Results.NotFound("Auth page index.html not found.");
});

app.MapGet("/login", () => Results.Redirect("/auth"));
app.MapGet("/register", () => Results.Redirect("/auth#register"));
app.MapGet("/portal", () =>
{
    var path = FindHtmlFile("portal", "index.html");
    if (path != null) return Results.File(path, "text/html");
    return Results.NotFound("Portal page index.html not found.");
});

string GetClientIp(HttpContext ctx)
{
    if (ctx.Request.Headers.TryGetValue("CF-Connecting-IP", out var cfIp) && !string.IsNullOrWhiteSpace(cfIp))
    {
        return cfIp.ToString().Trim();
    }
    if (ctx.Request.Headers.TryGetValue("X-Forwarded-For", out var xff) && !string.IsNullOrWhiteSpace(xff))
    {
        var raw = xff.ToString();
        var idx = raw.IndexOf(',');
        var ip = (idx > 0 ? raw.Substring(0, idx) : raw).Trim();
        if (!string.IsNullOrWhiteSpace(ip)) return ip;
    }
    if (ctx.Request.Headers.TryGetValue("X-Real-IP", out var xReal) && !string.IsNullOrWhiteSpace(xReal))
    {
        return xReal.ToString().Trim();
    }
    var remote = ctx.Connection.RemoteIpAddress?.ToString();
    if (!string.IsNullOrWhiteSpace(remote))
    {
        if (remote == "::1") return "127.0.0.1";
        return remote;
    }
    return "127.0.0.1";
}

#region Public Client Authentication & Session Endpoints

// Register
app.MapPost("/api/auth/register", (RegisterRequest req, HttpContext ctx) =>
{
    var ip = GetClientIp(ctx);
    if (security.IsRateLimited(ip, req.Username, out int retryAfter))
    {
        return Results.Json(new AuthResponse(false, $"Too many registration attempts. Please wait {retryAfter} seconds before trying again.", null, null, null, null, null), statusCode: 429);
    }

    if (string.IsNullOrWhiteSpace(req.Username) || !Regex.IsMatch(req.Username.Trim(), @"^[a-zA-Z0-9_\-\.]{3,32}$"))
    {
        return Results.BadRequest(new AuthResponse(false, "Username must be between 3 and 32 characters and contain only letters, numbers, underscores, dashes, or dots (no spaces).", null, null, null, null, null));
    }

    if (!SecurityService.ValidatePasswordComplexity(req.Password, out var passError))
    {
        return Results.BadRequest(new AuthResponse(false, passError ?? "Password does not meet complexity requirements.", null, null, null, null, null));
    }

    if (req.Password != req.ConfirmPassword)
    {
        return Results.BadRequest(new AuthResponse(false, "Passwords do not match.", null, null, null, null, null));
    }

    var existing = db.GetUserByUsername(req.Username);
    if (existing != null)
    {
        security.RecordFailedAttempt(ip, req.Username);
        return Results.BadRequest(new AuthResponse(false, $"Username '{req.Username}' is already taken. Please choose another username.", null, null, null, null, null));
    }

    var (hash, salt) = security.HashPassword(req.Password);
    var user = new UserRecord
    {
        Username = req.Username.Trim(),
        PasswordHash = hash,
        PasswordSalt = salt,
        Status = AccessStatus.PendingApproval, // Must be approved by administrator
        CurrentAppVersion = "1.0.0",
        LastIp = ip,
        LastSeenUtc = DateTime.UtcNow,
        SecurityStamp = Guid.NewGuid().ToString("N")
    };

    db.CreateUser(user);

    // Bind Device if provided (strictly for desktop app registrations, never web browsers)
    var deviceId = req.DeviceId?.Trim() ?? "";
    if (!string.IsNullOrWhiteSpace(deviceId) &&
        !deviceId.StartsWith("WEB_", StringComparison.OrdinalIgnoreCase) &&
        !deviceId.StartsWith("ADMIN", StringComparison.OrdinalIgnoreCase))
    {
        db.ValidateOrBindDevice(user.Id, deviceId, req.DeviceName ?? "Windows PC", out _);
    }

    db.AddAudit(user.Username, "REGISTER", "New user registered. Pending administrator approval.", ip, deviceId);

    // Issue 90-day persistent cryptographic session access token
    var accessToken = security.GenerateUserToken(user, deviceId, TimeSpan.FromDays(90));
    db.CreateSession(new SessionRecord
    {
        Token = accessToken,
        UserId = user.Id,
        Username = user.Username,
        DeviceId = deviceId,
        SecurityStamp = user.SecurityStamp,
        IsAdmin = false,
        ExpiresAtUtc = DateTime.UtcNow.AddDays(90)
    });

    // Issue 90-day high-entropy refresh token
    var rawRefreshToken = security.GenerateSecureToken(48);
    var refreshHash = SecurityService.ComputeSha256(rawRefreshToken);
    db.CreateRefreshToken(new RefreshTokenRecord
    {
        TokenHash = refreshHash,
        UserId = user.Id,
        DeviceId = deviceId,
        CreatedAtUtc = DateTime.UtcNow,
        ExpiresAtUtc = DateTime.UtcNow.AddDays(90)
    });

    var userDto = new UserDto(user.Id, user.Username, user.Status.ToString(), user.AccessStartUtc, user.AccessEndUtc, user.ScheduledAction, user.ScheduledTimeUtc, user.CurrentAppVersion, user.LastSeenUtc, user.DeviceLockId);
    return Results.Ok(new AuthResponse(true, "Registration successful. Awaiting administrator access approval.", accessToken, rawRefreshToken, user.Status.ToString(), null, userDto));
});

// Login
app.MapPost("/api/auth/login", (LoginRequest req, HttpContext ctx) =>
{
    var ip = GetClientIp(ctx);
    if (security.IsRateLimited(ip, req.Username, out int retryAfter))
    {
        return Results.Json(new AuthResponse(false, $"Too many failed login attempts. Account temporarily locked for {retryAfter} seconds.", null, null, null, null, null), statusCode: 429);
    }

    if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
    {
        return Results.BadRequest(new AuthResponse(false, "Username and password are required.", null, null, null, null, null));
    }

    var user = db.GetUserByUsername(req.Username);

    bool valid = user != null && security.VerifyPassword(req.Password, user.PasswordHash, user.PasswordSalt);
    if (!valid || user == null)
    {
        security.RecordFailedAttempt(ip, req.Username);
        db.AddAudit(req.Username, "LOGIN_FAILED", "Invalid credentials provided", ip, req.DeviceId);
        if (user != null && string.IsNullOrEmpty(user.DeviceLockId) && user.Status == AccessStatus.Approved)
        {
            return Results.BadRequest(new AuthResponse(false, "Account is pre-approved! Please switch to 'Register New Account' tab to choose your personal password and activate.", null, null, null, null, null));
        }
        return Results.BadRequest(new AuthResponse(false, "Invalid username or password.", null, null, null, null, null));
    }

    // Check account lockout
    if (user.LockoutUntilUtc.HasValue && DateTime.UtcNow < user.LockoutUntilUtc.Value)
    {
        int rem = (int)Math.Ceiling((user.LockoutUntilUtc.Value - DateTime.UtcNow).TotalSeconds);
        return Results.Json(new AuthResponse(false, $"Account locked due to consecutive failed attempts. Try again in {rem} seconds.", null, null, null, null, null), statusCode: 423);
    }

    // Hardware / Device ID Lock Check (strictly for desktop app logins)
    var deviceId = req.DeviceId?.Trim() ?? "";
    if (!string.IsNullOrWhiteSpace(deviceId) &&
        !deviceId.StartsWith("WEB_", StringComparison.OrdinalIgnoreCase) &&
        !deviceId.StartsWith("ADMIN", StringComparison.OrdinalIgnoreCase))
    {
        if (!db.ValidateOrBindDevice(user.Id, deviceId, req.DeviceName ?? "Windows PC", out var devErr))
        {
            db.AddAudit(user.Username, "LOGIN_DEVICE_REJECTED", $"Rejected unauthorized device: {devErr}", ip, deviceId);
            return Results.Json(new AuthResponse(false, devErr ?? "Device authorization failed.", null, null, null, null, null), statusCode: 403);
        }
        // Refresh user record from database so in-memory object has the newly bound DeviceLockId
        user = db.GetUserById(user.Id) ?? user;
    }

    security.ResetAttempts(ip, req.Username);

    // Update version & activity
    if (!string.IsNullOrWhiteSpace(req.ClientVersion))
    {
        user.CurrentAppVersion = req.ClientVersion;
    }
    user.LastIp = ip;
    user.LastSeenUtc = DateTime.UtcNow;
    user.FailedLoginCount = 0;
    user.LockoutUntilUtc = null;
    db.UpdateUser(user);

    // Issue 90-day persistent cryptographic session access token
    var accessToken = security.GenerateUserToken(user, deviceId, TimeSpan.FromDays(90));
    db.CreateSession(new SessionRecord
    {
        Token = accessToken,
        UserId = user.Id,
        Username = user.Username,
        DeviceId = deviceId,
        SecurityStamp = user.SecurityStamp,
        IsAdmin = user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase),
        ExpiresAtUtc = DateTime.UtcNow.AddDays(90)
    });

    // Issue 90-day high-entropy refresh token
    var rawRefreshToken = security.GenerateSecureToken(48);
    var refreshHash = SecurityService.ComputeSha256(rawRefreshToken);
    db.CreateRefreshToken(new RefreshTokenRecord
    {
        TokenHash = refreshHash,
        UserId = user.Id,
        DeviceId = deviceId,
        CreatedAtUtc = DateTime.UtcNow,
        ExpiresAtUtc = DateTime.UtcNow.AddDays(90)
    });

    db.AddAudit(user.Username, "LOGIN_SUCCESS", $"Login authenticated. Status: {user.Status}", ip, deviceId);

    // Generate cryptographic session lease if authorized
    LeaseEnvelope? lease = null;
    if (user.Status == AccessStatus.Approved && !string.IsNullOrWhiteSpace(deviceId))
    {
        lease = security.CreateSignedLease(user, deviceId);
    }

    var userDto = new UserDto(user.Id, user.Username, user.Status.ToString(), user.AccessStartUtc, user.AccessEndUtc, user.ScheduledAction, user.ScheduledTimeUtc, user.CurrentAppVersion, user.LastSeenUtc, user.DeviceLockId);
    return Results.Ok(new AuthResponse(true, "Login successful.", accessToken, rawRefreshToken, user.Status.ToString(), lease, userDto));
});

// Refresh Access Token
app.MapPost("/api/auth/refresh", (RefreshTokenRequest req, HttpContext ctx) =>
{
    var ip = GetClientIp(ctx);
    if (string.IsNullOrWhiteSpace(req.RefreshToken) || string.IsNullOrWhiteSpace(req.DeviceId))
    {
        return Results.Unauthorized();
    }

    var tokenHash = SecurityService.ComputeSha256(req.RefreshToken);
    var existingRefresh = db.GetRefreshToken(tokenHash);

    if (existingRefresh == null)
    {
        return Results.Unauthorized();
    }

    if (existingRefresh.IsRevoked)
    {
        // 60-second rotation grace period for network retries and concurrent client ticks
        if (existingRefresh.RotatedAtUtc.HasValue &&
            DateTime.UtcNow - existingRefresh.RotatedAtUtc.Value < TimeSpan.FromSeconds(60) &&
            string.Equals(existingRefresh.DeviceId, req.DeviceId, StringComparison.OrdinalIgnoreCase))
        {
            var userObj = db.GetUserById(existingRefresh.UserId);
            if (userObj != null && userObj.Status == AccessStatus.Approved)
            {
                var graceAccessToken = security.GenerateUserToken(userObj, req.DeviceId, TimeSpan.FromDays(90));
                db.CreateSession(new SessionRecord
                {
                    Token = graceAccessToken,
                    UserId = userObj.Id,
                    Username = userObj.Username,
                    DeviceId = req.DeviceId,
                    SecurityStamp = userObj.SecurityStamp,
                    IsAdmin = userObj.Username.Equals("admin", StringComparison.OrdinalIgnoreCase) || userObj.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase),
                    ExpiresAtUtc = DateTime.UtcNow.AddDays(90)
                });
                var leaseEnv = security.CreateSignedLease(userObj, req.DeviceId);
                var dto = new UserDto(userObj.Id, userObj.Username, userObj.Status.ToString(), userObj.AccessStartUtc, userObj.AccessEndUtc, userObj.ScheduledAction, userObj.ScheduledTimeUtc, userObj.CurrentAppVersion, userObj.LastSeenUtc, userObj.DeviceLockId);
                return Results.Ok(new AuthResponse(true, "Token refreshed within rotation grace period.", graceAccessToken, null, userObj.Status.ToString(), leaseEnv, dto));
            }
        }

        // Outside grace period: return 401 without wiping user account or active sessions
        db.AddAudit(existingRefresh.UserId, "REFRESH_REVOKED_RETRY", "Rotated or expired refresh token presented", ip, req.DeviceId);
        return Results.Unauthorized();
    }

    if (DateTime.UtcNow > existingRefresh.ExpiresAtUtc)
    {
        return Results.Unauthorized();
    }

    if (!string.Equals(existingRefresh.DeviceId, req.DeviceId, StringComparison.OrdinalIgnoreCase))
    {
        db.AddAudit(existingRefresh.UserId, "REFRESH_DEVICE_MISMATCH", "Refresh token device mismatch", ip, req.DeviceId);
        return Results.Unauthorized();
    }

    var user = db.GetUserById(existingRefresh.UserId);
    if (user == null)
    {
        return Results.Unauthorized();
    }

    // Rotate refresh token
    var newRawRefresh = security.GenerateSecureToken(48);
    var newRefreshHash = SecurityService.ComputeSha256(newRawRefresh);
    var newRefreshTokenRecord = new RefreshTokenRecord
    {
        TokenHash = newRefreshHash,
        UserId = user.Id,
        DeviceId = req.DeviceId,
        CreatedAtUtc = DateTime.UtcNow,
        ExpiresAtUtc = DateTime.UtcNow.AddDays(90)
    };
    db.RotateRefreshToken(tokenHash, newRefreshTokenRecord);

    // Issue fresh persistent access token
    var newAccessToken = security.GenerateUserToken(user, req.DeviceId, TimeSpan.FromDays(90));
    db.CreateSession(new SessionRecord
    {
        Token = newAccessToken,
        UserId = user.Id,
        Username = user.Username,
        DeviceId = req.DeviceId,
        SecurityStamp = user.SecurityStamp,
        IsAdmin = user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase),
        ExpiresAtUtc = DateTime.UtcNow.AddDays(90)
    });

    LeaseEnvelope? lease = null;
    if (user.Status == AccessStatus.Approved)
    {
        lease = security.CreateSignedLease(user, req.DeviceId);
    }

    var userDto = new UserDto(user.Id, user.Username, user.Status.ToString(), user.AccessStartUtc, user.AccessEndUtc, user.ScheduledAction, user.ScheduledTimeUtc, user.CurrentAppVersion, user.LastSeenUtc, user.DeviceLockId);
    return Results.Ok(new AuthResponse(true, "Token refreshed successfully.", newAccessToken, newRawRefresh, user.Status.ToString(), lease, userDto));
});

// Access Status & Cryptographic Rolling Lease Heartbeat
app.MapGet("/api/auth/status", (HttpContext ctx) =>
{
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
    {
        return Results.Unauthorized();
    }

    var token = authHeader.Substring("Bearer ".Length).Trim();
    var session = db.GetSession(token);
    UserRecord? user = null;

    if (session != null)
    {
        user = db.GetUserById(session.UserId) ?? db.GetUserByUsername(session.Username);
    }

    if (session == null || user == null)
    {
        var adminSession = db.GetAdminSession(token);
        if (adminSession != null && adminSession.ExpiresAtUtc > DateTime.UtcNow)
        {
            user = db.GetUserById(adminSession.UserId) ?? db.GetUserByUsername(adminSession.Username);
            if (user != null)
            {
                session = new SessionRecord
                {
                    Token = token,
                    UserId = user.Id,
                    Username = user.Username,
                    DeviceId = "ADMIN_CONSOLE",
                    SecurityStamp = user.SecurityStamp,
                    IsAdmin = true,
                    CreatedAtUtc = adminSession.CreatedAtUtc,
                    ExpiresAtUtc = adminSession.ExpiresAtUtc
                };
            }
        }
    }

    if (session == null || user == null)
    {
        return Results.Unauthorized();
    }

    // Synchronize security stamp if user was not revoked
    if (!string.IsNullOrEmpty(user.SecurityStamp) && user.SecurityStamp != session.SecurityStamp)
    {
        session.SecurityStamp = user.SecurityStamp;
    }

    var ip = GetClientIp(ctx);
    user.LastSeenUtc = DateTime.UtcNow;
    user.LastIp = ip;
    db.UpdateUser(user);
    db.ExtendSession(token, DateTime.UtcNow.AddMinutes(30));

    var nowUtc = DateTime.UtcNow;

    // Immediate Expiration Enforcement: Never trust client clock
    if (user.Status == AccessStatus.Approved && user.AccessEndUtc.HasValue && nowUtc >= user.AccessEndUtc.Value)
    {
        user.Status = AccessStatus.Expired;
        db.UpdateUser(user);
        db.AddAudit(user.Username, "EXPIRE", $"Access expired at {user.AccessEndUtc:u}", ip, session.DeviceId);
        return Results.Ok(new StatusResponse(false, "Expired", "Access period has expired.", user.AccessEndUtc, false, null, nowUtc));
    }

    bool hasAccess = user.Status == AccessStatus.Approved;
    string message = user.Status switch
    {
        AccessStatus.PendingApproval => "Account pending administrator approval.",
        AccessStatus.Approved => "Access active and verified.",
        AccessStatus.Suspended => "Access has been temporarily suspended by administrator.",
        AccessStatus.Revoked => "Access has been permanently revoked.",
        AccessStatus.Expired => "Access period has expired.",
        _ => "Access denied."
    };

    // If approved, create fresh signed lease valid for 90 seconds
    LeaseEnvelope? lease = null;
    if (hasAccess && !string.IsNullOrWhiteSpace(session.DeviceId))
    {
        lease = security.CreateSignedLease(user, session.DeviceId);
    }

    return Results.Ok(new StatusResponse(true, user.Status.ToString(), message, user.AccessEndUtc, hasAccess, lease, nowUtc));
});

// Current Authenticated User & Access Metadata (Web Portal & Main Site)
app.MapGet("/api/auth/me", (HttpContext ctx) =>
{
    ctx.Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0";
    ctx.Response.Headers["Pragma"] = "no-cache";
    ctx.Response.Headers["Expires"] = "0";

    string? token = null;
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (!string.IsNullOrWhiteSpace(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
    {
        token = authHeader.Substring("Bearer ".Length).Trim();
    }
    else if (ctx.Request.Query.TryGetValue("token", out var qToken) && !string.IsNullOrWhiteSpace(qToken))
    {
        token = qToken.ToString().Trim();
    }

    if (string.IsNullOrWhiteSpace(token))
    {
        return Results.Json(new { Success = false, Message = "Authentication token required." }, statusCode: 401);
    }

    // 1. Try regular session
    var session = db.GetSession(token);
    UserRecord? user = null;

    if (session != null)
    {
        user = db.GetUserById(session.UserId) ?? db.GetUserByUsername(session.Username);
        if (user != null)
        {
            db.ExtendSession(token, DateTime.UtcNow.AddDays(30));
        }
        else
        {
            db.DeleteSession(token);
            session = null;
        }
    }

    // 2. Check dedicated admin session table if not found in regular sessions
    if (session == null)
    {
        var adminSession = db.GetAdminSession(token);
        if (adminSession != null && adminSession.ExpiresAtUtc > DateTime.UtcNow)
        {
            user = db.GetUserById(adminSession.UserId) ?? db.GetUserByUsername(adminSession.Username);
            if (user != null)
            {
                session = new SessionRecord
                {
                    Token = token,
                    UserId = user.Id,
                    Username = user.Username,
                    DeviceId = "ADMIN_CONSOLE",
                    SecurityStamp = user.SecurityStamp,
                    IsAdmin = true,
                    CreatedAtUtc = adminSession.CreatedAtUtc,
                    ExpiresAtUtc = adminSession.ExpiresAtUtc
                };
            }
        }
    }

    if (session == null || user == null)
    {
        return Results.Json(new { Success = false, Message = "Session expired or invalid." }, statusCode: 401);
    }

    // Synchronize security stamp if user was not revoked
    if (!string.IsNullOrEmpty(user.SecurityStamp) && user.SecurityStamp != session.SecurityStamp)
    {
        session.SecurityStamp = user.SecurityStamp;
    }

    var nowUtc = DateTime.UtcNow;
    if (user.Status == AccessStatus.Approved && user.AccessEndUtc.HasValue && nowUtc >= user.AccessEndUtc.Value)
    {
        user.Status = AccessStatus.Expired;
        db.UpdateUser(user);
        db.AddAudit(user.Username, "EXPIRE", $"Access expired at {user.AccessEndUtc:u}", GetClientIp(ctx), session.DeviceId);
    }

    bool hasActiveAccess = user.Status == AccessStatus.Approved && (!user.AccessEndUtc.HasValue || nowUtc < user.AccessEndUtc.Value);
    bool isPermanent = user.Status == AccessStatus.Approved && !user.AccessEndUtc.HasValue;
    long remainingSeconds = 0;
    if (user.Status == AccessStatus.Approved && user.AccessEndUtc.HasValue && user.AccessEndUtc.Value > nowUtc)
    {
        remainingSeconds = (long)(user.AccessEndUtc.Value - nowUtc).TotalSeconds;
    }

    var latestUpdate = db.GetLatestUpdateForUser(user.Id, user.Username);

    return Results.Ok(new
    {
        Success = true,
        User = new
        {
            Id = user.Id,
            Username = user.Username,
            Status = user.Status.ToString(),
            HasActiveAccess = hasActiveAccess,
            IsPermanent = isPermanent,
            RemainingSeconds = remainingSeconds,
            AccessStartUtc = user.AccessStartUtc,
            AccessEndUtc = user.AccessEndUtc,
            CurrentAppVersion = user.CurrentAppVersion,
            CreatedAtUtc = user.CreatedAtUtc,
            DeviceLockId = user.DeviceLockId,
            IsAdmin = session.IsAdmin || user.IsAdmin || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase)
        },
        LatestUpdate = latestUpdate != null ? new
        {
            Id = latestUpdate.Id,
            Version = latestUpdate.Version,
            FileName = latestUpdate.FileName,
            FileSizeMb = latestUpdate.FileSizeMb,
            Sha256Hash = latestUpdate.Sha256Hash,
            CreatedAtUtc = latestUpdate.CreatedAtUtc
        } : null
    });
});

// Logout

app.MapPost("/api/auth/logout", (HttpContext ctx) =>
{
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (!string.IsNullOrWhiteSpace(authHeader) && authHeader.StartsWith("Bearer "))
    {
        var token = authHeader.Substring("Bearer ".Length).Trim();
        db.DeleteSession(token);
    }
    return Results.Ok(new { Success = true });
});

// User Profile: Change Username
app.MapPost("/api/user/change-username", (ChangeUsernameRequest req, HttpContext ctx) =>
{
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
    {
        return Results.Unauthorized();
    }
    var token = authHeader.Substring("Bearer ".Length).Trim();
    var session = db.GetSession(token);
    if (session == null) return Results.Unauthorized();
    var user = db.GetUserById(session.UserId);
    if (user == null || user.SecurityStamp != session.SecurityStamp) return Results.Unauthorized();

    if (string.IsNullOrWhiteSpace(req.NewUsername) || !Regex.IsMatch(req.NewUsername.Trim(), @"^[a-zA-Z0-9_\-\.]{3,32}$"))
    {
        return Results.BadRequest(new { Success = false, Message = "Username must be between 3 and 32 characters and contain only letters, numbers, underscores, dashes, or dots (no spaces)." });
    }

    var ip = GetClientIp(ctx);
    // Verify current password
    if (!security.VerifyPassword(req.CurrentPassword, user.PasswordHash, user.PasswordSalt))
    {
        db.AddAudit(user.Username, "CHANGE_USERNAME_FAILED", "Invalid current password provided", ip);
        return Results.BadRequest(new { Success = false, Message = "Current password is incorrect." });
    }

    var trimmedNewName = req.NewUsername.Trim();
    if (trimmedNewName.Equals(user.Username, StringComparison.OrdinalIgnoreCase))
    {
        return Results.BadRequest(new { Success = false, Message = "New username is identical to current username." });
    }

    var existing = db.GetUserByUsername(trimmedNewName);
    if (existing != null)
    {
        return Results.BadRequest(new { Success = false, Message = "Username is already taken by another account." });
    }

    var oldName = user.Username;

    // 1. Invalidate all previous sessions & leases FIRST
    db.RevokeAllUserSessions(user.Id, "USERNAME_CHANGED_ACCESS_REVOKED");

    // Refresh user object after revocation rotated the security stamp
    user = db.GetUserById(user.Id)!;

    // 2. Update username while strictly preserving existing license status and duration:
    user.Username = trimmedNewName;
    db.UpdateUserCredentials(user.Id, trimmedNewName, user.PasswordHash, user.PasswordSalt, user.SecurityStamp);
    db.UpdateUser(user);

    // 3. Issue new unapproved session token for the user to wait for access
    var newAccessToken = security.GenerateSecureToken(32);
    db.CreateSession(new SessionRecord
    {
        Token = newAccessToken,
        UserId = user.Id,
        Username = trimmedNewName,
        DeviceId = session.DeviceId,
        SecurityStamp = user.SecurityStamp,
        IsAdmin = false,
        ExpiresAtUtc = DateTime.UtcNow.AddMinutes(15)
    });

    var rawRefresh = security.GenerateSecureToken(48);
    var refreshHash = SecurityService.ComputeSha256(rawRefresh);
    db.CreateRefreshToken(new RefreshTokenRecord
    {
        TokenHash = refreshHash,
        UserId = user.Id,
        DeviceId = session.DeviceId,
        CreatedAtUtc = DateTime.UtcNow,
        ExpiresAtUtc = DateTime.UtcNow.AddDays(7)
    });

    db.AddAudit(trimmedNewName, "USERNAME_CHANGED_ACCESS_REVOKED", $"User '{oldName}' changed username to '{trimmedNewName}'. Previous access immediately revoked; status set to PendingApproval.", ip, session.DeviceId);

    return Results.Ok(new
    {
        Success = true,
        Message = "Username changed successfully. All previous access revoked; waiting for administrator approval.",
        NewUsername = trimmedNewName,
        Status = "PendingApproval",
        NewToken = newAccessToken,
        NewRefreshToken = rawRefresh
    });
});

// User Profile: Change Password
app.MapPost("/api/user/change-password", (ChangePasswordRequest req, HttpContext ctx) =>
{
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
    {
        return Results.Unauthorized();
    }
    var token = authHeader.Substring("Bearer ".Length).Trim();
    var session = db.GetSession(token);
    if (session == null) return Results.Unauthorized();
    var user = db.GetUserById(session.UserId);
    if (user == null || user.SecurityStamp != session.SecurityStamp) return Results.Unauthorized();

    var ip = GetClientIp(ctx);

    // 1. Verify current password
    if (!security.VerifyPassword(req.CurrentPassword, user.PasswordHash, user.PasswordSalt))
    {
        db.AddAudit(user.Username, "CHANGE_PASSWORD_FAILED", "Invalid current password provided", ip);
        return Results.BadRequest(new { Success = false, Message = "Current password is incorrect." });
    }

    // 2. Validate complexity of new password
    if (!SecurityService.ValidatePasswordComplexity(req.NewPassword, out var passErr))
    {
        return Results.BadRequest(new { Success = false, Message = passErr ?? "Password does not meet complexity requirements." });
    }

    // 3. Confirm match
    if (req.NewPassword != req.ConfirmNewPassword)
    {
        return Results.BadRequest(new { Success = false, Message = "New passwords do not match." });
    }

    // 4. Hash new password with PBKDF2-SHA512 + 32-byte salt
    var (newHash, newSalt) = security.HashPassword(req.NewPassword);

    // Invalidate previous sessions
    db.RevokeAllUserSessions(user.Id, "PASSWORD_CHANGED");

    // Refresh user after revocation
    user = db.GetUserById(user.Id)!;
    user.PasswordHash = newHash;
    user.PasswordSalt = newSalt;

    db.UpdateUserCredentials(user.Id, user.Username, newHash, newSalt, user.SecurityStamp);
    db.UpdateUser(user);

    // Issue fresh active session and rotating refresh token for current device
    var newAccessToken = security.GenerateSecureToken(32);
    db.CreateSession(new SessionRecord
    {
        Token = newAccessToken,
        UserId = user.Id,
        Username = user.Username,
        DeviceId = session.DeviceId,
        SecurityStamp = user.SecurityStamp,
        IsAdmin = user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase),
        ExpiresAtUtc = DateTime.UtcNow.AddMinutes(15)
    });

    var rawRefresh = security.GenerateSecureToken(48);
    var refreshHash = SecurityService.ComputeSha256(rawRefresh);
    db.CreateRefreshToken(new RefreshTokenRecord
    {
        TokenHash = refreshHash,
        UserId = user.Id,
        DeviceId = session.DeviceId,
        CreatedAtUtc = DateTime.UtcNow,
        ExpiresAtUtc = DateTime.UtcNow.AddDays(7)
    });

    db.AddAudit(user.Username, "PASSWORD_CHANGED", "Password changed successfully; rotated sessions and security stamp", ip, session.DeviceId);

    return Results.Ok(new
    {
        Success = true,
        Message = "Password changed successfully.",
        NewToken = newAccessToken,
        NewRefreshToken = rawRefresh
    });
});

#endregion

#region Client Cryptographic Updates Endpoints

// Check update (with RSA-4096 / RSA-2048 signature verification support)
app.MapGet("/api/updates/check", (string? currentVersion, HttpContext ctx) =>
{
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
    {
        return Results.Unauthorized();
    }

    var token = authHeader.Substring("Bearer ".Length).Trim();
    var session = db.GetSession(token);
    if (session == null)
    {
        return Results.Unauthorized();
    }

    var curVer = currentVersion ?? "1.0.0";
    var latest = db.GetLatestUpdateForUser(session.UserId, curVer);
    if (latest == null)
    {
        return Results.Ok(new UpdateCheckResponse(false, null, null, 0, null, null, null, null, false));
    }

    var downloadUrl = $"/api/updates/download/{latest.Id}";
    return Results.Ok(new UpdateCheckResponse(true, latest.Id, latest.Version, latest.FileSizeMb, latest.ReleaseNotes, latest.Sha256Hash, latest.RsaSignature, downloadUrl, latest.IsMandatory));
});

// Download update file
app.MapGet("/api/updates/download/{id}", (string id, HttpContext ctx) =>
{
    var update = db.GetUpdateById(id);
    if (update == null || !File.Exists(update.FilePath))
    {
        return Results.NotFound(new { Message = "Update file not found." });
    }

    var stream = File.OpenRead(update.FilePath);
    return Results.File(stream, "application/octet-stream", update.FileName, enableRangeProcessing: true);
});

// Record to store randomized, time-limited download tickets is defined after app.Run()
var downloadTickets = new System.Collections.Concurrent.ConcurrentDictionary<string, DownloadTicketRecord>(StringComparer.OrdinalIgnoreCase);

// 1. Generate randomized, time-limited download tickets (Strict Access Check)
app.MapGet("/api/client/download-ticket", (HttpContext ctx) =>
{
    string? token = null;
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (!string.IsNullOrWhiteSpace(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
    {
        token = authHeader.Substring("Bearer ".Length).Trim();
    }
    else if (ctx.Request.Query.TryGetValue("token", out var qToken) && !string.IsNullOrWhiteSpace(qToken))
    {
        token = qToken.ToString().Trim();
    }
    else if (ctx.Request.Cookies.TryGetValue("splash_token", out var cToken) && !string.IsNullOrWhiteSpace(cToken))
    {
        token = cToken.Trim();
    }
    else if (ctx.Request.Cookies.TryGetValue("splash_admin_token", out var caToken) && !string.IsNullOrWhiteSpace(caToken))
    {
        token = caToken.Trim();
    }

    if (string.IsNullOrWhiteSpace(token))
    {
        return Results.Json(new { Success = false, Message = "Authentication token required." }, statusCode: 401);
    }

    var session = db.GetSession(token);
    UserRecord? user = null;
    if (session != null)
    {
        user = db.GetUserById(session.UserId) ?? db.GetUserByUsername(session.Username);
    }
    if (session == null || user == null)
    {
        var adminSession = db.GetAdminSession(token);
        if (adminSession != null && adminSession.ExpiresAtUtc > DateTime.UtcNow)
        {
            user = db.GetUserById(adminSession.UserId) ?? db.GetUserByUsername(adminSession.Username);
        }
    }

    if (user == null)
    {
        return Results.Json(new { Success = false, Message = "Session invalid or expired." }, statusCode: 401);
    }

    var nowUtc = DateTime.UtcNow;
    bool isAdmin = user.IsAdmin || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase);
    bool hasActiveAccess = isAdmin || (user.Status == AccessStatus.Approved && (!user.AccessEndUtc.HasValue || nowUtc < user.AccessEndUtc.Value));

    if (!hasActiveAccess)
    {
        return Results.Json(new { Success = false, Message = "Active approved access required to generate download ticket.", Status = user.Status.ToString() }, statusCode: 403);
    }

    // Cryptographically randomized ticket
    var ticket = "dl_" + Convert.ToHexString(System.Security.Cryptography.RandomNumberGenerator.GetBytes(16)).ToLowerInvariant();
    downloadTickets[ticket] = new DownloadTicketRecord(user.Id, user.Username, nowUtc.AddMinutes(30), "SplashSetup.exe");

    db.AddAudit(user.Username, "DOWNLOAD_TICKET_ISSUED", $"Issued randomized download ticket {ticket[..10]}...", GetClientIp(ctx));

    return Results.Ok(new
    {
        Success = true,
        Ticket = ticket,
        DownloadUrl = $"/dl/{ticket}/SplashSetup.exe",
        ExpiresInSeconds = 1800
    });
});

// 2. Randomized Dynamic Download Route (All downloads stream exclusively through here)
app.MapGet("/dl/{ticket}/{fileName?}", async (string ticket, string? fileName, HttpContext ctx) =>
{
    var nowUtc = DateTime.UtcNow;
    UserRecord? user = null;
    string targetFile = !string.IsNullOrWhiteSpace(fileName) ? fileName : "SplashSetup.exe";

    // Check registered randomized ticket
    if (downloadTickets.TryGetValue(ticket, out var dt))
    {
        if (dt.ExpiresAtUtc < nowUtc)
        {
            downloadTickets.TryRemove(ticket, out _);
            return Results.NotFound();
        }
        user = db.GetUserById(dt.UserId) ?? db.GetUserByUsername(dt.Username);
        if (!string.IsNullOrWhiteSpace(dt.TargetFile)) targetFile = dt.TargetFile;
    }

    // Direct active session token fallback support for curl / scripts
    if (user == null)
    {
        var session = db.GetSession(ticket);
        if (session != null)
        {
            user = db.GetUserById(session.UserId) ?? db.GetUserByUsername(session.Username);
        }
        if (session == null || user == null)
        {
            var adminSession = db.GetAdminSession(ticket);
            if (adminSession != null && adminSession.ExpiresAtUtc > nowUtc)
            {
                user = db.GetUserById(adminSession.UserId) ?? db.GetUserByUsername(adminSession.Username);
            }
        }
    }

    if (user == null)
    {
        return Results.NotFound();
    }

    bool isAdmin = user.IsAdmin || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase);
    bool hasActiveAccess = isAdmin || (user.Status == AccessStatus.Approved && (!user.AccessEndUtc.HasValue || nowUtc < user.AccessEndUtc.Value));

    if (!hasActiveAccess)
    {
        return Results.NotFound();
    }

    db.AddAudit(user.Username, "RANDOMIZED_DOWNLOAD", $"Downloaded {targetFile} via randomized ticket {ticket[..Math.Min(8, ticket.Length)]}...", GetClientIp(ctx));

    var targetAsset = string.Equals(targetFile, "Splash.exe", StringComparison.OrdinalIgnoreCase) ? "Splash.exe" : "SplashSetup.exe";

    var cloudUrl = AssetRedirectHelper.GetGitHubAssetRedirectUrl(targetAsset);
    if (!string.IsNullOrEmpty(cloudUrl))
    {
        return Results.Redirect(cloudUrl, permanent: false);
    }

    return Results.NotFound();
});

// Backward-compatible redirect for authenticated client calls: mints a fresh randomized ticket
app.MapGet("/api/client/download-latest", (HttpContext ctx) =>
{
    string? token = null;
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (!string.IsNullOrWhiteSpace(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
    {
        token = authHeader.Substring("Bearer ".Length).Trim();
    }
    else if (ctx.Request.Query.TryGetValue("token", out var qToken) && !string.IsNullOrWhiteSpace(qToken))
    {
        token = qToken.ToString().Trim();
    }

    if (string.IsNullOrWhiteSpace(token)) return Results.NotFound();

    var ticket = "dl_" + Convert.ToHexString(System.Security.Cryptography.RandomNumberGenerator.GetBytes(16)).ToLowerInvariant();
    var session = db.GetSession(token);
    UserRecord? user = null;
    if (session != null) user = db.GetUserById(session.UserId) ?? db.GetUserByUsername(session.Username);
    if (user == null)
    {
        var adminSession = db.GetAdminSession(token);
        if (adminSession != null && adminSession.ExpiresAtUtc > DateTime.UtcNow)
        {
            user = db.GetUserById(adminSession.UserId) ?? db.GetUserByUsername(adminSession.Username);
        }
    }

    if (user == null) return Results.NotFound();

    var nowUtc = DateTime.UtcNow;
    bool isAdmin = user.IsAdmin || user.Username.Equals("AzPlayzZ", StringComparison.OrdinalIgnoreCase) || user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase);
    bool hasActiveAccess = isAdmin || (user.Status == AccessStatus.Approved && (!user.AccessEndUtc.HasValue || nowUtc < user.AccessEndUtc.Value));
    if (!hasActiveAccess) return Results.NotFound();

    downloadTickets[ticket] = new DownloadTicketRecord(user.Id, user.Username, nowUtc.AddMinutes(30), "SplashSetup.exe");
    return Results.Redirect($"/dl/{ticket}/SplashSetup.exe", permanent: false);
});

// CLOAK ALL OLD PREDICTABLE DOWNLOAD ROUTES - Complete 404 Cloaking
app.MapGet("/download/{*path}", () => Results.NotFound());
app.MapGet("/SplashSetup.exe", () => Results.NotFound());
app.MapGet("/Splash.exe", () => Results.NotFound());
app.MapGet("/download-setup", () => Results.NotFound());
app.MapGet("/api/client/download-setup", () => Results.NotFound());
app.MapGet("/api/client/download-direct", () => Results.NotFound());
app.MapGet("/api/client/download", () => Results.NotFound());



// Report update status (Client Telemetry - does not unpublish global update)
app.MapPost("/api/updates/report-status", (ReportStatusRequest req, HttpContext ctx) =>
{
    if (Enum.TryParse<UpdateStatus>(req.Status, true, out var status))
    {
        // Client reports (Delivered, Downloaded, Installed) log telemetry but do NOT change the global update's Published state!
        db.AddAudit("CLIENT", "UPDATE_STATUS", $"Update {req.UpdateId} status: {status} {(req.ErrorMessage != null ? $"Error: {req.ErrorMessage}" : "")}", GetClientIp(ctx));
        return Results.Ok(new { Success = true });
    }
    return Results.BadRequest(new { Message = "Invalid status." });
});

#endregion

#region Admin Endpoints

// Helper to authenticate admin requests via dedicated admin_sessions or permanent signed admin tokens
bool IsAdminAuthenticated(HttpContext ctx, DatabaseService dbService, SecurityService securityService)
{
    var authHeader = ctx.Request.Headers["Authorization"].ToString();
    if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase)) return false;
    var token = authHeader.Substring("Bearer ".Length).Trim();

    // 1. Permanent cryptographic admin token (survives 100% of container wipes & restarts)
    if (securityService.ValidateAdminToken(token, dbService, out _))
    {
        return true;
    }

    // 2. Database-backed admin session (backward compatibility)
    var adminSession = dbService.GetAdminSession(token);
    if (adminSession != null && DateTime.UtcNow <= adminSession.ExpiresAtUtc) return true;

    // 3. Regular admin session
    var regularSession = dbService.GetSession(token);
    if (regularSession != null && regularSession.IsAdmin && DateTime.UtcNow <= regularSession.ExpiresAtUtc) return true;

    return false;
}

// Centralized Admin Endpoint Group with Mandatory Server-Side Authorization Filter
var adminApi = app.MapGroup("/api/admin")
    .AddEndpointFilter(async (invocationContext, next) =>
    {
        var httpCtx = invocationContext.HttpContext;
        // Allow unauthenticated login route
        if (httpCtx.Request.Path.Equals("/api/admin/login", StringComparison.OrdinalIgnoreCase))
        {
            return await next(invocationContext);
        }

        if (!IsAdminAuthenticated(httpCtx, db, security))
        {
            return Results.Unauthorized();
        }

        return await next(invocationContext);
    });

// Admin Login - Completely isolated from desktop client sessions
adminApi.MapPost("/login", (LoginRequest req, HttpContext ctx) =>
{
    var ip = GetClientIp(ctx);
    var user = db.GetUserByUsername(req.Username);
    bool isAdmin = user != null && user.IsAdmin;

    // Fast-path: Valid credentials immediately clear any lockout and log in
    if (user != null && isAdmin && security.VerifyPassword(req.Password, user.PasswordHash, user.PasswordSalt))
    {
        security.ResetAttempts(ip, req.Username);
        var token = security.GenerateAdminToken(user, TimeSpan.FromDays(90));

        // Dedicated admin session: NEVER modifies desktop client sessions, refresh tokens, device locks, or security stamp!
        db.CreateAdminSession(new AdminSessionRecord
        {
            Token = token,
            UserId = user.Id,
            Username = user.Username,
            CreatedAtUtc = DateTime.UtcNow,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(90),
            IpAddress = ip
        });

        db.AddAudit(user.Username, "ADMIN_LOGIN", "Authenticated to secret control panel", ip);
        return Results.Ok(new AuthResponse(true, "Authenticated.", token, null, null, null, null));
    }

    // Otherwise apply rate limit for failed attempts
    if (security.IsRateLimited(ip, req.Username, out int retryAfter))
    {
        return Results.Problem($"Rate limit exceeded. Try again in {retryAfter} seconds.", statusCode: 429);
    }

    security.RecordFailedAttempt(ip, req.Username);
    db.AddAudit(req.Username, "ADMIN_LOGIN_FAILED", "Failed admin control panel login", ip);
    return Results.BadRequest(new AuthResponse(false, "Invalid administrator credentials.", null, null, null, null, null));
});

// Get Users list
adminApi.MapGet("/users", (string? search, string? status, HttpContext ctx) =>
{
    var users = db.GetAllUsers(search, status);
    var dtos = users.Select(u => new UserDto(u.Id, u.Username, u.Status.ToString(), u.AccessStartUtc, u.AccessEndUtc, u.ScheduledAction, u.ScheduledTimeUtc, u.CurrentAppVersion, u.LastSeenUtc, u.DeviceLockId));
    return Results.Ok(dtos);
});

// Force sync local users to GitHub Cloud
adminApi.MapPost("/backup/sync", async (HttpContext ctx) =>
{
    var ok = await db.SyncBackupToGitHubAsync();
    var count = db.GetAllUsers().Count;
    return Results.Ok(new { Success = ok, Message = ok ? $"Successfully backed up {count} users to GitHub Cloud." : "Cloud sync failed. Check server logs.", Count = count });
});

// Force restore users from GitHub Cloud
adminApi.MapPost("/backup/restore", (HttpContext ctx) =>
{
    db.RestoreFromBackup();
    var count = db.GetAllUsers().Count;
    return Results.Ok(new { Success = true, Message = $"Reloaded user records from GitHub Cloud ({count} users active).", Count = count });
});

// Update User Access
adminApi.MapPost("/users/{id}/access", (string id, UserAccessRequest req, HttpContext ctx) =>
{
    var user = db.GetUserById(id);
    if (user == null)
    {
        return Results.NotFound(new { Message = "User not found." });
    }

    if (Enum.TryParse<AccessStatus>(req.Status, true, out var parsedStatus))
    {
        user.Status = parsedStatus;
        if (parsedStatus == AccessStatus.Approved)
        {
            if (user.AccessStartUtc == null)
            {
                user.AccessStartUtc = DateTime.UtcNow;
            }
            // Restore refresh tokens if previously revoked
            db.RestoreUserTokensOnApproval(user.Id);
            if (user.DeviceLockId != null && (user.DeviceLockId.StartsWith("WEB_", StringComparison.OrdinalIgnoreCase) || user.DeviceLockId.StartsWith("ADMIN", StringComparison.OrdinalIgnoreCase)))
            {
                user.DeviceLockId = null;
            }

            // Expiration timestamp management:
            if (req.AccessEndUtc.HasValue)
            {
                user.AccessEndUtc = req.AccessEndUtc.Value.ToUniversalTime();
            }
            else
            {
                // Permanent access: explicitly clear expiration!
                user.AccessEndUtc = null;
            }

            user.ScheduledAction = null;
            user.ScheduledTimeUtc = null;
        }
        else if (parsedStatus is AccessStatus.Revoked or AccessStatus.Suspended or AccessStatus.PendingApproval)
        {
            // Clear any active expiration or scheduled actions on revocation/suspension
            user.AccessEndUtc = null;
            user.ScheduledAction = null;
            user.ScheduledTimeUtc = null;
        }
    }

    if (req.AccessStartUtc.HasValue) user.AccessStartUtc = req.AccessStartUtc.Value.ToUniversalTime();
    if (req.AccessEndUtc.HasValue) user.AccessEndUtc = req.AccessEndUtc.Value.ToUniversalTime();
    if (req.ScheduledAction != null) user.ScheduledAction = req.ScheduledAction;
    if (req.ScheduledTimeUtc.HasValue) user.ScheduledTimeUtc = req.ScheduledTimeUtc.Value.ToUniversalTime();

    db.UpdateUser(user);
    db.AddAudit("ADMIN", "UPDATE_ACCESS", $"Updated user '{user.Username}' status to {user.Status}, AccessEnd: {user.AccessEndUtc:u}, Scheduled: {user.ScheduledAction} at {user.ScheduledTimeUtc:u}", GetClientIp(ctx));

    return Results.Ok(new { Success = true, Message = "Access settings updated." });
});

// Delete User permanently (Right-Click -> Delete in Control Panel)
adminApi.MapDelete("/users/{id}", (string id, HttpContext ctx) =>
{
    var user = db.GetUserById(id);
    if (user == null)
    {
        return Results.NotFound(new { Success = false, Message = "User not found." });
    }

    if (user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase))
    {
        return Results.BadRequest(new { Success = false, Message = "Cannot delete the master administrator account." });
    }

    bool deleted = db.DeleteUser(id, GetClientIp(ctx));
    if (deleted)
    {
        return Results.Ok(new { Success = true, Message = $"User '{user.Username}' permanently deleted." });
    }
    return Results.Problem("Failed to delete user from database.");
});

// Grant Access directly by Username (Server Authoritative)
adminApi.MapPost("/users/grant-by-username", (GrantByUsernameRequest req, HttpContext ctx) =>
{
    if (string.IsNullOrWhiteSpace(req.Username))
    {
        return Results.BadRequest(new { Success = false, Message = "Username is required." });
    }

    var trimmedName = req.Username.Trim();
    var user = db.GetUserByUsername(trimmedName);
    var callerIp = GetClientIp(ctx);

    // Calculate duration in seconds
    double totalSeconds = 0;
    if (req.DurationSeconds.HasValue && req.DurationSeconds.Value > 0)
    {
        totalSeconds = req.DurationSeconds.Value;
    }
    else if (req.DurationHours.HasValue && req.DurationHours.Value > 0)
    {
        totalSeconds = req.DurationHours.Value * 3600.0;
    }

    DateTime? accessEndUtc = totalSeconds > 0 ? DateTime.UtcNow.AddSeconds(totalSeconds) : null;
    string durationText;
    if (totalSeconds <= 0)
    {
        durationText = "Permanent (Lifetime)";
    }
    else if (totalSeconds < 60)
    {
        durationText = $"{totalSeconds:F0} Seconds";
    }
    else if (totalSeconds < 3600)
    {
        durationText = $"{Math.Round(totalSeconds / 60.0)} Minutes";
    }
    else if (totalSeconds < 86400)
    {
        durationText = $"{Math.Round(totalSeconds / 3600.0, 1)} Hours";
    }
    else
    {
        durationText = $"{Math.Round(totalSeconds / 86400.0, 1)} Days";
    }

    if (user == null)
    {
        if (!Regex.IsMatch(trimmedName, @"^[a-zA-Z0-9_\-\.]{3,32}$"))
        {
            return Results.BadRequest(new { Success = false, Message = "Username must be between 3 and 32 characters (letters, numbers, _, -, .)." });
        }

        // Generate initial password: admin-supplied or trimmedName + "123!"
        var tempPassword = !string.IsNullOrWhiteSpace(req.InitialPassword) ? req.InitialPassword.Trim() : $"{trimmedName}123!";
        var (hash, salt) = security.HashPassword(tempPassword);

        user = new UserRecord
        {
            Id = Guid.NewGuid().ToString(),
            Username = trimmedName,
            PasswordHash = hash,
            PasswordSalt = salt,
            Status = AccessStatus.Approved,
            AccessStartUtc = DateTime.UtcNow,
            AccessEndUtc = accessEndUtc,
            CurrentAppVersion = "1.0.0",
            LastIp = callerIp,
            LastSeenUtc = DateTime.UtcNow,
            SecurityStamp = Guid.NewGuid().ToString("N"),
            CreatedAtUtc = DateTime.UtcNow
        };

        db.CreateUser(user);
        db.AddAudit("ADMIN", "CREATE_AND_GRANT_ACCESS", $"Admin created user '{user.Username}' and granted {durationText} access. Default pass: {tempPassword}", callerIp);

        return Results.Ok(new
        {
            Success = true,
            Message = $"Account '{user.Username}' created & granted {durationText} access! Login password: {tempPassword} (or they can set their own upon registration).",
            IsNewUser = true,
            DefaultPassword = tempPassword,
            User = new UserDto(user.Id, user.Username, user.Status.ToString(), user.AccessStartUtc, user.AccessEndUtc, user.ScheduledAction, user.ScheduledTimeUtc, user.CurrentAppVersion, user.LastSeenUtc, user.DeviceLockId)
        });
    }

    user.Status = AccessStatus.Approved;
    user.AccessStartUtc = DateTime.UtcNow;
    user.AccessEndUtc = accessEndUtc;
    user.ScheduledAction = null;
    user.ScheduledTimeUtc = null;
    if (user.DeviceLockId != null && (user.DeviceLockId.StartsWith("WEB_", StringComparison.OrdinalIgnoreCase) || user.DeviceLockId.StartsWith("ADMIN", StringComparison.OrdinalIgnoreCase)))
    {
        user.DeviceLockId = null;
    }

    db.UpdateUser(user);
    db.RestoreUserTokensOnApproval(user.Id);

    db.AddAudit("ADMIN", "GRANT_ACCESS_BY_USERNAME", $"Admin granted {durationText} access directly to user '{user.Username}'", callerIp);

    return Results.Ok(new
    {
        Success = true,
        Message = $"Access successfully granted to user '{user.Username}'. Duration: {durationText}.",
        IsNewUser = false,
        User = new UserDto(user.Id, user.Username, user.Status.ToString(), user.AccessStartUtc, user.AccessEndUtc, user.ScheduledAction, user.ScheduledTimeUtc, user.CurrentAppVersion, user.LastSeenUtc, user.DeviceLockId)
    });
});

// Reset Device Binding Lock
adminApi.MapPost("/users/{id}/reset-device", (string id, HttpContext ctx) =>
{
    db.ResetUserDevice(id, GetClientIp(ctx));
    return Results.Ok(new { Success = true, Message = "Device binding reset successfully." });
});

// Immediate Revocation of all user sessions
adminApi.MapPost("/users/{id}/revoke-sessions", (string id, HttpContext ctx) =>
{
    db.RevokeAllUserSessions(id, "ADMIN_FORCED_REVOCATION", GetClientIp(ctx));
    return Results.Ok(new { Success = true, Message = "All active sessions revoked immediately." });
});

// Get Updates list
adminApi.MapGet("/updates", () =>
{
    var updates = db.GetAllUpdates();
    return Results.Ok(updates);
});

// Helper functions for updates storage
string GetUpdatesStorageDir()
{
    var envDataDir = Environment.GetEnvironmentVariable("DATABASE_DIR");
    string baseDir = !string.IsNullOrWhiteSpace(envDataDir) ? envDataDir.Trim() : Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "data");
    var updatesDir = Path.Combine(baseDir, "updates");
    Directory.CreateDirectory(updatesDir);
    return updatesDir;
}

string GetUpdatesStagingDir()
{
    var stagingDir = Path.Combine(GetUpdatesStorageDir(), "staging");
    Directory.CreateDirectory(stagingDir);
    return stagingDir;
}

// Upload Chunk for Resumable Large File Publishing (bypasses Cloudflare & Kestrel limits)
adminApi.MapPost("/updates/upload-chunk", async (HttpRequest request, HttpContext ctx) =>
{
    var uploadId = request.Query["uploadId"].ToString();
    if (string.IsNullOrWhiteSpace(uploadId) || !Guid.TryParse(uploadId, out _))
    {
        return Results.BadRequest(new { Success = false, Message = "Invalid or missing uploadId GUID." });
    }

    if (!int.TryParse(request.Query["chunkIndex"], out int chunkIndex) || chunkIndex < 0)
    {
        return Results.BadRequest(new { Success = false, Message = "Invalid chunkIndex." });
    }

    if (!long.TryParse(request.Query["chunkOffset"], out long chunkOffset) || chunkOffset < 0)
    {
        return Results.BadRequest(new { Success = false, Message = "Invalid chunkOffset." });
    }

    var stagingDir = GetUpdatesStagingDir();
    var partFile = Path.Combine(stagingDir, $"{uploadId}.part");

    using (var fs = new FileStream(partFile, FileMode.OpenOrCreate, FileAccess.Write, FileShare.ReadWrite))
    {
        fs.Seek(chunkOffset, SeekOrigin.Begin);
        await request.Body.CopyToAsync(fs);
        await fs.FlushAsync();
    }

    return Results.Ok(new { Success = true, UploadId = uploadId, ChunkIndex = chunkIndex });
});

// Finalize and Cryptographically Sign Chunked Update
adminApi.MapPost("/updates/finalize", async (FinalizeUpdateRequest req, HttpContext ctx) =>
{
    if (string.IsNullOrWhiteSpace(req.UploadId) || !Guid.TryParse(req.UploadId, out _))
    {
        return Results.BadRequest(new { Success = false, Message = "Invalid uploadId." });
    }

    if (string.IsNullOrWhiteSpace(req.Version))
    {
        return Results.BadRequest(new { Success = false, Message = "Version number is required." });
    }

    var stagingDir = GetUpdatesStagingDir();
    var partFile = Path.Combine(stagingDir, $"{req.UploadId}.part");

    if (!File.Exists(partFile))
    {
        return Results.BadRequest(new { Success = false, Message = "Update staging file not found on server." });
    }

    var fileInfo = new FileInfo(partFile);
    if (fileInfo.Length != req.TotalSizeBytes)
    {
        return Results.BadRequest(new { Success = false, Message = $"File size mismatch. Expected {req.TotalSizeBytes} bytes, received {fileInfo.Length} bytes." });
    }

    // Verify SHA-256 hash streamingly
    string computedSha;
    using (var fs = File.OpenRead(partFile))
    {
        using var sha = System.Security.Cryptography.SHA256.Create();
        byte[] hash = await sha.ComputeHashAsync(fs);
        computedSha = Convert.ToHexString(hash).ToLowerInvariant();
    }

    if (!string.IsNullOrWhiteSpace(req.ExpectedSha256) &&
        !computedSha.Equals(req.ExpectedSha256.Trim(), StringComparison.OrdinalIgnoreCase))
    {
        return Results.BadRequest(new { Success = false, Message = $"Cryptographic verification failed: SHA-256 hash mismatch. Expected {req.ExpectedSha256}, got {computedSha}" });
    }

    // Generate RSA digital signature over file stream
    string rsaSignature;
    using (var fs = File.OpenRead(partFile))
    {
        rsaSignature = security.SignStream(fs);
    }

    // Move from staging to permanent updates storage
    var storageDir = GetUpdatesStorageDir();
    var ext = Path.GetExtension(req.FileName);
    if (string.IsNullOrWhiteSpace(ext)) ext = ".exe";
    var finalPath = Path.Combine(storageDir, $"{req.UploadId}{ext}");

    if (File.Exists(finalPath))
    {
        File.Delete(finalPath);
    }
    File.Move(partFile, finalPath);

    string? targetUid = req.TargetUserId;
    string? targetUname = req.TargetUsername?.Trim();
    if (string.IsNullOrWhiteSpace(targetUid) && !string.IsNullOrWhiteSpace(targetUname))
    {
        var targetUser = db.GetUserByUsername(targetUname);
        if (targetUser != null)
        {
            targetUid = targetUser.Id;
            targetUname = targetUser.Username;
        }
    }

    var updateRecord = new UpdateRecord
    {
        Id = req.UploadId,
        Version = req.Version.Trim(),
        FileName = string.IsNullOrWhiteSpace(req.FileName) ? $"Splash_{req.Version}.exe" : req.FileName,
        FilePath = finalPath,
        FileSizeBytes = req.TotalSizeBytes,
        Sha256Hash = computedSha,
        RsaSignature = rsaSignature,
        ReleaseNotes = req.ReleaseNotes ?? "",
        TargetType = req.TargetType.Equals("user", StringComparison.OrdinalIgnoreCase) ? "user" : "all",
        TargetUserId = targetUid,
        TargetUsername = targetUname,
        CreatedAtUtc = DateTime.UtcNow,
        IsMandatory = req.IsMandatory,
        Status = UpdateStatus.Published
    };

    db.CreateUpdate(updateRecord);
    try
    {
        var wwwrootExe = Path.Combine(app.Environment.ContentRootPath, "wwwroot", "Splash.exe");
        File.Copy(finalPath, wwwrootExe, true);
        var updatesExe = Path.Combine(app.Environment.ContentRootPath, "data", "updates", "Splash.exe");
        File.Copy(finalPath, updatesExe, true);
    }
    catch { }

    db.AddAudit("ADMIN", "PUBLISH_UPDATE", $"Published cryptographically signed update v{req.Version} ({updateRecord.FileSizeMb} MB, SHA: {computedSha[..8]}..., RSA-Verified)", GetClientIp(ctx));

    return Results.Ok(new { Success = true, Message = "Update successfully assembled, verified, and published.", Update = updateRecord });
});

// Delete update endpoint
adminApi.MapDelete("/updates/{id}", (string id, HttpContext ctx) =>
{
    var update = db.GetUpdateById(id);
    if (update != null)
    {
        try { if (File.Exists(update.FilePath)) File.Delete(update.FilePath); } catch { }
        db.DeleteUpdate(id);
        db.AddAudit("ADMIN", "DELETE_UPDATE", $"Deleted update {update.Version} ({update.FileName})", GetClientIp(ctx));
    }
    return Results.Ok(new { Success = true, Message = "Update deleted successfully." });
});

// Set update version or force re-publish endpoint
adminApi.MapPost("/updates/{id}/set-version", (string id, HttpRequest request, HttpContext ctx) =>
{
    var update = db.GetUpdateById(id);
    if (update == null) return Results.NotFound(new { Success = false, Message = "Update not found." });

    var newVersion = request.Query["version"].ToString();
    if (!string.IsNullOrWhiteSpace(newVersion))
    {
        db.SetUpdateVersion(id, newVersion.Trim());
        db.AddAudit("ADMIN", "UPDATE_VERSION_CHANGED", $"Changed update {id} version to {newVersion}", GetClientIp(ctx));
    }
    return Results.Ok(new { Success = true, Message = "Update version updated successfully." });
});

// Cancel Upload & Clean Staging
adminApi.MapPost("/updates/cancel-upload", (HttpRequest request) =>
{
    var uploadId = request.Query["uploadId"].ToString();
    if (!string.IsNullOrWhiteSpace(uploadId))
    {
        var partFile = Path.Combine(GetUpdatesStagingDir(), $"{uploadId}.part");
        if (File.Exists(partFile))
        {
            try { File.Delete(partFile); } catch { }
        }
    }
    return Results.Ok(new { Success = true });
});

// Publish Update (Legacy single-request multipart form upload with automatic RSA signing)
adminApi.MapPost("/updates/publish", async (HttpRequest request, HttpContext ctx) =>
{
    if (!request.HasFormContentType)
    {
        return Results.BadRequest(new { Message = "Expected multipart/form-data" });
    }

    var form = await request.ReadFormAsync();
    var file = form.Files.GetFile("file");
    if (file == null || file.Length == 0)
    {
        return Results.BadRequest(new { Message = "No update .exe file provided." });
    }

    var version = form["version"].ToString();
    if (string.IsNullOrWhiteSpace(version))
    {
        return Results.BadRequest(new { Message = "Version number is required." });
    }

    var releaseNotes = form["releaseNotes"].ToString();
    var targetType = form["targetType"].ToString(); // "all" or "user"
    var targetUserId = form["targetUserId"].ToString();
    var targetUsername = form["targetUsername"].ToString();
    var isMandatory = form["isMandatory"].ToString().Equals("true", StringComparison.OrdinalIgnoreCase);

    var updateId = Guid.NewGuid().ToString();
    var storageDir = GetUpdatesStorageDir();

    var ext = Path.GetExtension(file.FileName);
    if (string.IsNullOrWhiteSpace(ext)) ext = ".exe";
    var savedFilePath = Path.Combine(storageDir, $"{updateId}{ext}");

    using (var fs = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write, FileShare.None))
    {
        await file.CopyToAsync(fs);
    }

    string sha256;
    string rsaSignature;
    using (var fs = File.OpenRead(savedFilePath))
    {
        using var sha = System.Security.Cryptography.SHA256.Create();
        byte[] hash = await sha.ComputeHashAsync(fs);
        sha256 = Convert.ToHexString(hash).ToLowerInvariant();
        fs.Position = 0;
        rsaSignature = security.SignStream(fs);
    }

    var updateRecord = new UpdateRecord
    {
        Id = updateId,
        Version = version.Trim(),
        FileName = file.FileName,
        FilePath = savedFilePath,
        FileSizeBytes = file.Length,
        Sha256Hash = sha256,
        RsaSignature = rsaSignature,
        ReleaseNotes = releaseNotes,
        TargetType = targetType.Equals("user", StringComparison.OrdinalIgnoreCase) ? "user" : "all",
        TargetUserId = string.IsNullOrWhiteSpace(targetUserId) ? null : targetUserId,
        TargetUsername = string.IsNullOrWhiteSpace(targetUsername) ? null : targetUsername,
        CreatedAtUtc = DateTime.UtcNow,
        IsMandatory = isMandatory,
        Status = UpdateStatus.Published
    };

    db.CreateUpdate(updateRecord);
    db.AddAudit("ADMIN", "PUBLISH_UPDATE", $"Published cryptographically signed update v{version} ({updateRecord.FileSizeMb} MB, SHA: {sha256[..8]}..., RSA-Verified)", GetClientIp(ctx));

    return Results.Ok(new { Success = true, Message = "Update published with cryptographic signature.", Update = updateRecord });
});

// Audit logs
adminApi.MapGet("/audit", () =>
{
    var logs = db.GetAuditLogs(100);
    return Results.Ok(logs);
});

#endregion

app.Run();

// Record to store randomized, time-limited download tickets
public record DownloadTicketRecord(string UserId, string Username, DateTime ExpiresAtUtc, string TargetFile);

// Background Scheduled Access Engine
public class ScheduledAccessWorker : BackgroundService
{
    private readonly DatabaseService _db;

    public ScheduledAccessWorker(DatabaseService db)
    {
        _db = db;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                _db.ProcessScheduledActions();
            }
            catch { }

            await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);
        }
    }
}

public static class AssetRedirectHelper
{
    private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, (string Url, DateTime ExpiresAt)> s_cache = new(StringComparer.OrdinalIgnoreCase);
    private static (long ZipId, long SetupId, DateTime LastCheck) s_assetIds = (559155485, 559154826, DateTime.MinValue);

    public static string? GetGitHubAssetRedirectUrl(string targetAssetName)
    {
        if (s_cache.TryGetValue(targetAssetName, out var cached) && DateTime.UtcNow < cached.ExpiresAt)
        {
            return cached.Url;
        }

        try
        {
            var token = Environment.GetEnvironmentVariable("GITHUB_TOKEN");
            if (string.IsNullOrWhiteSpace(token)) return null;

            // Refresh asset IDs from GitHub releases API periodically
            if (DateTime.UtcNow - s_assetIds.LastCheck > TimeSpan.FromMinutes(10))
            {
                try
                {
                    using var apiHandler = new System.Net.Http.HttpClientHandler { AllowAutoRedirect = true };
                    using var apiClient = new System.Net.Http.HttpClient(apiHandler) { Timeout = TimeSpan.FromSeconds(5) };
                    apiClient.DefaultRequestHeaders.UserAgent.ParseAdd("Splash-Security-Vault");
                    apiClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("token", token);
                    var releaseJson = apiClient.GetStringAsync("https://api.github.com/repos/yaitsarchanatiwari-png/splash-downloads/releases").GetAwaiter().GetResult();
                    using var doc = System.Text.Json.JsonDocument.Parse(releaseJson);
                    if (doc.RootElement.ValueKind == System.Text.Json.JsonValueKind.Array && doc.RootElement.GetArrayLength() > 0)
                    {
                        var first = doc.RootElement[0];
                        if (first.TryGetProperty("assets", out var assets) && assets.ValueKind == System.Text.Json.JsonValueKind.Array)
                        {
                            long foundZip = s_assetIds.ZipId;
                            long foundSetup = s_assetIds.SetupId;
                            foreach (var a in assets.EnumerateArray())
                            {
                                var name = a.GetProperty("name").GetString() ?? "";
                                var id = a.GetProperty("id").GetInt64();
                                if (name.EndsWith(".zip", StringComparison.OrdinalIgnoreCase)) foundZip = id;
                                else if (name.EndsWith(".exe", StringComparison.OrdinalIgnoreCase)) foundSetup = id;
                            }
                            s_assetIds = (foundZip, foundSetup, DateTime.UtcNow);
                        }
                    }
                }
                catch { }
            }

            var lower = targetAssetName.ToLowerInvariant();
            long assetId = (lower.EndsWith(".zip") || lower.Contains("zip")) ? s_assetIds.ZipId : s_assetIds.SetupId;

            using var handler = new System.Net.Http.HttpClientHandler { AllowAutoRedirect = false };
            using var client = new System.Net.Http.HttpClient(handler) { Timeout = TimeSpan.FromSeconds(8) };
            client.DefaultRequestHeaders.UserAgent.ParseAdd("Splash-Security-Vault");
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("token", token);

            using var req = new System.Net.Http.HttpRequestMessage(System.Net.Http.HttpMethod.Get, $"https://api.github.com/repos/yaitsarchanatiwari-png/splash-downloads/releases/assets/{assetId}");
            req.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/octet-stream"));

            var resp = client.SendAsync(req).GetAwaiter().GetResult();
            if (resp.StatusCode == System.Net.HttpStatusCode.Found ||
                resp.StatusCode == System.Net.HttpStatusCode.MovedPermanently ||
                resp.StatusCode == System.Net.HttpStatusCode.SeeOther)
            {
                var loc = resp.Headers.Location?.ToString();
                if (!string.IsNullOrEmpty(loc))
                {
                    s_cache[targetAssetName] = (loc, DateTime.UtcNow.AddMinutes(4));
                    return loc;
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[SECURITY DL ERROR] {ex.Message}");
        }

        return null;
    }
}

