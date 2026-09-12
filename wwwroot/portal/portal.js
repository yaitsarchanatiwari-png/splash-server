/**
 * SPLASH PORTAL DASHBOARD CONTROLLER
 * Real-time server-authoritative license polling, live countdown ticker, and protected binary download
 */

document.addEventListener('DOMContentLoaded', () => {
  let token = localStorage.getItem('splash_token') || localStorage.getItem('splash_admin_token');
  if (!token) {
    window.location.href = '/auth#login';
    return;
  }
  document.cookie = 'splash_token=' + encodeURIComponent(token) + '; path=/; max-age=2592000; SameSite=Lax';

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
  const accessCard = document.getElementById('access-card');
  const cardStatusPill = document.getElementById('card-status-pill');
  const cardStatusLabel = document.getElementById('card-status-label');
  const heroDuration = document.getElementById('hero-duration');
  const heroDurationSub = document.getElementById('hero-duration-sub');

  const metricStatus = document.getElementById('metric-status');
  const metricModules = document.getElementById('metric-modules');
  const metricExpires = document.getElementById('metric-expires');
  const metricVersion = document.getElementById('metric-version');

  const btnSetupDownload = document.getElementById('btn-setup-download');
  const setupDownloadText = document.getElementById('setup-download-text');
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

  // Poll server every 2.5 seconds for instant grant/revoke detection
  pollInterval = setInterval(fetchStatus, 2500);

  // 1-second Countdown Interval
  countdownTimer = setInterval(tickCountdown, 1000);

  let consecutivePortal401 = 0;

  async function fetchStatus() {
    try {
      const res = await fetch('/api/auth/me?_t=' + Date.now(), {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });

      if (res.status === 401) {
        consecutivePortal401++;
        if (consecutivePortal401 >= 5) {
          localStorage.removeItem('splash_token');
          localStorage.removeItem('splash_user');
          window.location.href = '/auth#login';
        }
        return;
      }
      consecutivePortal401 = 0;

      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.user) {
          currentUser = data.user;
          localStorage.setItem('splash_user', JSON.stringify(currentUser));
          applyUserData(data);
          return;
        }
      }

      // Authoritative fallback: /api/auth/status is always active on server
      if (res.status === 404) {
        const fallbackRes = await fetch('/api/auth/status?_t=' + Date.now(), {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Cache-Control': 'no-cache'
          },
          cache: 'no-store'
        });

        if (fallbackRes.status === 401) {
          consecutivePortal401++;
          if (consecutivePortal401 >= 5) {
            localStorage.removeItem('splash_token');
            localStorage.removeItem('splash_user');
            window.location.href = '/auth#login';
          }
          return;
        }
        consecutivePortal401 = 0;

        if (fallbackRes.ok) {
          const st = await fallbackRes.json();
          if (st && st.status) {
            const cachedUser = JSON.parse(localStorage.getItem('splash_user') || '{}');
            const hasActiveAccess = !!(st.hasActiveAccess || st.hasAccess || st.status === 'Approved');
            const isPermanent = st.status === 'Approved' && !st.accessEndUtc;
            let remSecs = 0;
            if (st.accessEndUtc) {
              const endMs = new Date(st.accessEndUtc).getTime();
              const nowMs = st.serverTimeUtc ? new Date(st.serverTimeUtc).getTime() : Date.now();
              remSecs = Math.max(0, Math.floor((endMs - nowMs) / 1000));
            }
            const synthUser = {
              username: cachedUser.username || 'Member',
              status: st.status,
              hasActiveAccess: hasActiveAccess,
              isPermanent: isPermanent,
              remainingSeconds: remSecs,
              accessEndUtc: st.accessEndUtc,
              isAdmin: cachedUser.isAdmin || false,
              createdAtUtc: cachedUser.createdAtUtc || null
            };
            currentUser = synthUser;
            localStorage.setItem('splash_user', JSON.stringify(currentUser));
            applyUserData({ success: true, user: synthUser });
          }
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
      // APPROVED & ACTIVE: Show Card & Download Button
      if (accessCard) accessCard.style.display = 'block';
      if (btnTopDownload) btnTopDownload.style.display = 'inline-flex';
      if (waitingCard) waitingCard.style.display = 'none';

      cardStatusPill.className = 'card-status-badge';
      cardStatusLabel.textContent = 'Active';
      metricStatus.className = 'metric-col-value status-text';
      metricStatus.textContent = 'Active';
      metricModules.textContent = '43 / 43 active';
      pageSubtitle.textContent = 'You have full module access — this is how long your client remains active';

      if (btnSetupDownload) btnSetupDownload.disabled = false;
      btnMainDownload.disabled = false;
      btnTopDownload.disabled = false;
      mainDownloadText.textContent = 'Download Splash (.exe)';
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
      // PENDING APPROVAL: Keep Page Clean/Empty — No Card and No Download Button until Admin Grants Access
      if (accessCard) accessCard.style.display = 'none';
      if (btnTopDownload) btnTopDownload.style.display = 'none';
      if (waitingCard) waitingCard.style.display = 'flex';

      pageSubtitle.textContent = 'Awaiting administrator approval — your client access and download will appear once granted';
    } else if (user.status === 'Expired') {
      // EXPIRED
      if (accessCard) accessCard.style.display = 'none';
      if (btnTopDownload) btnTopDownload.style.display = 'none';
      if (waitingCard) {
        waitingCard.style.display = 'flex';
        const title = waitingCard.querySelector('.waiting-title');
        if (title) title.textContent = 'Access License Expired';
        const desc = waitingCard.querySelector('.waiting-desc');
        if (desc) desc.textContent = 'Your subscription period has ended. Please renew to resume access.';
      }
      pageSubtitle.textContent = 'Your access period has expired. Please contact an administrator or renew.';
    } else {
      // REVOKED OR SUSPENDED
      if (accessCard) accessCard.style.display = 'none';
      if (btnTopDownload) btnTopDownload.style.display = 'none';
      if (waitingCard) {
        waitingCard.style.display = 'flex';
        const title = waitingCard.querySelector('.waiting-title');
        if (title) title.textContent = 'Access Locked';
        const desc = waitingCard.querySelector('.waiting-desc');
        if (desc) desc.textContent = `Account status is ${user.status || 'Revoked'}. Contact administrator.`;
      }
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

  // Direct Protected Download Initiation via Randomized Tickets
  async function triggerDownload() {
    if (!hasActiveAccess) {
      alert('Access is currently locked. Please wait for an administrator to approve your license.');
      return;
    }

    let downloadUrl = `/api/client/download-latest?token=${encodeURIComponent(token)}`;
    try {
      const res = await fetch('/api/client/download-ticket', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.Success && data.DownloadUrl) {
          downloadUrl = data.DownloadUrl;
        }
      }
    } catch (_) {}

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'SplashSetup.exe');
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 1000);
  }
  const triggerInstallerDownload = triggerDownload;

  btnMainDownload.addEventListener('click', triggerDownload);
  if (btnSetupDownload) btnSetupDownload.addEventListener('click', triggerInstallerDownload);
  if (btnTopDownload) btnTopDownload.addEventListener('click', triggerInstallerDownload);

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
    document.cookie = 'splash_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'splash_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('splash_token');
    localStorage.removeItem('splash_admin_token');
    localStorage.removeItem('splash_user');
    window.location.href = '/auth#login';
  });
});
