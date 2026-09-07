/**
 * SPLASH PORTAL DASHBOARD CONTROLLER
 * Real-time server-authoritative license polling, live countdown ticker, and protected binary download
 */

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('splash_token');
  if (!token) {
    window.location.href = '/auth#login';
    return;
  }

  // DOM Elements
  const sidebarAvatar = document.getElementById('sidebar-avatar-letter');
  const sidebarUsername = document.getElementById('sidebar-username');
  const sidebarRole = document.getElementById('sidebar-user-role');
  const navAdminLink = document.getElementById('nav-admin-link');
  const btnSignout = document.getElementById('btn-signout');

  const topbarAvatar = document.getElementById('topbar-avatar');
  const topbarUsername = document.getElementById('topbar-username');
  const topbarMemberSince = document.getElementById('topbar-member-since');
  const btnCopyLauncher = document.getElementById('btn-copy-launcher');
  const copyLauncherText = document.getElementById('copy-launcher-text');
  const btnTopDownload = document.getElementById('btn-top-download');
  const topDownloadText = document.getElementById('top-download-text');

  const pageSubtitle = document.getElementById('page-subtitle');
  const cardStatusPill = document.getElementById('card-status-pill');
  const cardStatusLabel = document.getElementById('card-status-label');
  const heroDuration = document.getElementById('hero-duration');
  const heroDurationSub = document.getElementById('hero-duration-sub');

  const metricStatus = document.getElementById('metric-status');
  const metricModules = document.getElementById('metric-modules');
  const metricExpires = document.getElementById('metric-expires');
  const metricVersion = document.getElementById('metric-version');

  const btnMainDownload = document.getElementById('btn-main-download');
  const mainDownloadText = document.getElementById('main-download-text');
  const downloadInfoTitle = document.getElementById('download-info-title');
  const downloadInfoSub = document.getElementById('download-info-sub');

  const waitingCard = document.getElementById('waiting-access-card');
  const waitingUserStrong = document.getElementById('waiting-user-strong');
  const guideUsername = document.getElementById('guide-username');

  // State
  let currentUser = null;
  let remainingSeconds = 0;
  let isPermanent = false;
  let hasActiveAccess = false;
  let countdownTimer = null;
  let pollInterval = null;

  // Initialize cached data for instant render
  try {
    const cached = JSON.parse(localStorage.getItem('splash_user') || '{}');
    if (cached && cached.username) {
      applyUserData({ user: cached });
    }
  } catch {}

  // Fetch Authoritative Data from Server
  fetchStatus();

  // Poll server every 4 seconds for real-time grant/revoke detection
  pollInterval = setInterval(fetchStatus, 4000);

  // 1-second Countdown Interval
  countdownTimer = setInterval(tickCountdown, 1000);

  async function fetchStatus() {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (res.status === 401) {
        // Token invalid or revoked
        localStorage.removeItem('splash_token');
        localStorage.removeItem('splash_user');
        window.location.href = '/auth#login';
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.user) {
          currentUser = data.user;
          localStorage.setItem('splash_user', JSON.stringify(currentUser));
          applyUserData(data);
        }
      }
    } catch (err) {
      // Network hiccup: keep running countdown locally
    }
  }

  function applyUserData(data) {
    const user = data.user;
    const update = data.latestUpdate;

    const name = user.username || 'Player';
    const firstChar = name.charAt(0).toUpperCase();

    // User Identifiers
    sidebarAvatar.textContent = firstChar;
    sidebarUsername.textContent = name;
    topbarAvatar.textContent = firstChar;
    topbarUsername.textContent = name;
    if (waitingUserStrong) waitingUserStrong.textContent = name;
    if (guideUsername) guideUsername.textContent = name;

    // Admin link visibility
    if (user.isAdmin) {
      sidebarRole.textContent = 'Administrator';
      if (navAdminLink) navAdminLink.style.display = 'flex';
    } else {
      sidebarRole.textContent = 'Member';
      if (navAdminLink) navAdminLink.style.display = 'none';
    }

    // Member since
    if (user.createdAtUtc) {
      const d = new Date(user.createdAtUtc);
      topbarMemberSince.textContent = `Member since ${d.toLocaleDateString()}`;
    }

    // Version
    if (update && update.version) {
      metricVersion.textContent = `v${update.version} (x64)`;
      downloadInfoTitle.textContent = `Splash Client v${update.version} (Windows x64)`;
      if (update.fileSizeMb) {
        downloadInfoSub.textContent = `Cryptographically signed standalone executable (${update.fileSizeMb} MB)`;
      }
    }

    hasActiveAccess = !!user.hasActiveAccess;
    isPermanent = !!user.isPermanent;

    if (user.remainingSeconds !== undefined) {
      remainingSeconds = user.remainingSeconds;
    }

    // Update UI based on access state
    if (hasActiveAccess) {
      // APPROVED & ACTIVE
      cardStatusPill.className = 'card-status-badge';
      cardStatusLabel.textContent = 'Active';
      metricStatus.className = 'metric-col-value status-text';
      metricStatus.textContent = 'Active';
      metricModules.textContent = '43 / 43 active';
      pageSubtitle.textContent = 'You have full module access — this is how long your client remains active';

      if (waitingCard) waitingCard.style.display = 'none';

      // Buttons Enabled
      btnMainDownload.disabled = false;
      btnTopDownload.disabled = false;
      mainDownloadText.textContent = 'Download Splash';
      topDownloadText.textContent = 'Download installer';

      if (isPermanent) {
        heroDuration.textContent = 'Permanent';
        heroDurationSub.textContent = 'Lifetime unrestricted client access';
        metricExpires.textContent = 'Permanent';
      } else {
        if (user.accessEndUtc) {
          const expDate = new Date(user.accessEndUtc);
          heroDurationSub.textContent = `Next module expires on ${expDate.toLocaleDateString()}, ${expDate.toLocaleTimeString()}`;
          metricExpires.textContent = expDate.toLocaleDateString();
        }
        renderRemainingFormatted();
      }
    } else if (user.status === 'PendingApproval') {
      // PENDING APPROVAL
      cardStatusPill.className = 'card-status-badge status-pending';
      cardStatusLabel.textContent = 'Pending Approval';
      metricStatus.className = 'metric-col-value status-pending';
      metricStatus.textContent = 'Pending';
      metricModules.textContent = 'Locked (0 / 43)';
      metricExpires.textContent = 'Awaiting Grant';
      heroDuration.textContent = 'Waiting';
      heroDurationSub.textContent = 'Access is pending administrator authorization.';
      pageSubtitle.textContent = 'Awaiting administrator approval — your client access will unlock once granted';

      if (waitingCard) waitingCard.style.display = 'flex';

      // Buttons Disabled
      btnMainDownload.disabled = true;
      btnTopDownload.disabled = true;
      mainDownloadText.textContent = 'Download Locked';
      topDownloadText.textContent = 'Download locked';
    } else if (user.status === 'Expired') {
      // EXPIRED
      cardStatusPill.className = 'card-status-badge status-expired';
      cardStatusLabel.textContent = 'Expired';
      metricStatus.className = 'metric-col-value status-expired';
      metricStatus.textContent = 'Expired';
      metricModules.textContent = 'Expired (0 / 43)';
      metricExpires.textContent = 'Expired';
      heroDuration.textContent = 'Expired';
      heroDurationSub.textContent = 'Your license duration has ended. Please renew to resume access.';
      pageSubtitle.textContent = 'Your access period has expired. Please contact an administrator or renew.';

      if (waitingCard) waitingCard.style.display = 'none';

      btnMainDownload.disabled = true;
      btnTopDownload.disabled = true;
      mainDownloadText.textContent = 'License Expired';
      topDownloadText.textContent = 'License Expired';
    } else {
      // REVOKED OR SUSPENDED
      cardStatusPill.className = 'card-status-badge status-expired';
      cardStatusLabel.textContent = user.status || 'Revoked';
      metricStatus.className = 'metric-col-value status-expired';
      metricStatus.textContent = user.status || 'Revoked';
      metricModules.textContent = 'Locked';
      metricExpires.textContent = 'Revoked';
      heroDuration.textContent = 'Revoked';
      heroDurationSub.textContent = 'Your client access has been revoked by an administrator.';
      pageSubtitle.textContent = 'Your client access is currently revoked.';

      if (waitingCard) waitingCard.style.display = 'none';

      btnMainDownload.disabled = true;
      btnTopDownload.disabled = true;
      mainDownloadText.textContent = 'Access Revoked';
      topDownloadText.textContent = 'Access Revoked';
    }
  }

  function tickCountdown() {
    if (!hasActiveAccess || isPermanent) return;
    if (remainingSeconds > 0) {
      remainingSeconds--;
      renderRemainingFormatted();
    } else {
      // Time just ran out: poll server for updated status
      fetchStatus();
    }
  }

  function renderRemainingFormatted() {
    if (isPermanent) {
      heroDuration.textContent = 'Permanent';
      return;
    }

    const s = remainingSeconds;
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;

    if (days > 0) {
      heroDuration.textContent = `${days}d ${hours}h`;
    } else if (hours > 0) {
      heroDuration.textContent = `${hours}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
      heroDuration.textContent = `${mins}m ${secs}s`;
    } else {
      heroDuration.textContent = `${secs}s`;
    }
  }

  // Direct Protected Download Initiation
  function triggerDownload() {
    if (!hasActiveAccess) {
      alert('Access is currently locked. Please wait for an administrator to approve your license.');
      return;
    }

    // Direct download stream via protected endpoint with token query
    const downloadUrl = `/api/client/download-latest?token=${encodeURIComponent(token)}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Splash.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  btnMainDownload.addEventListener('click', triggerDownload);
  btnTopDownload.addEventListener('click', triggerDownload);

  // Copy Win+R Launcher Shortcut
  if (btnCopyLauncher) {
    btnCopyLauncher.addEventListener('click', async () => {
      const command = 'powershell -c "Start-Process Splash.exe"';
      try {
        await navigator.clipboard.writeText(command);
        copyLauncherText.textContent = 'Copied!';
        setTimeout(() => {
          copyLauncherText.textContent = 'Copy Win+R launcher';
        }, 2000);
      } catch {
        prompt('Copy launcher command:', command);
      }
    });
  }

  // Sign out
  btnSignout.addEventListener('click', async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      });
    } catch {}
    localStorage.removeItem('splash_token');
    localStorage.removeItem('splash_user');
    window.location.href = '/auth#login';
  });
});
