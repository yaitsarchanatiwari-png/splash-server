/* SPLASH WEB ADMIN CONTROL PANEL - ENGINE */

// Configuration & State
const API_BASE = '';
let authToken = localStorage.getItem('splash_admin_token') || null;
let adminUsername = localStorage.getItem('splash_admin_username') || 'AzPlayzZ';

let usersData = [];
let updatesData = [];
let auditData = [];

let pollInterval = null;
let auditInterval = null;
let modalTargetUser = null;

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const currentAdminName = document.getElementById('currentAdminName');

// Tabs
const navTabs = document.querySelectorAll('.nav-tab');
const tabPanes = {
  users: document.getElementById('tab-users'),
  updates: document.getElementById('tab-updates'),
  audit: document.getElementById('tab-audit')
};

// Modals & UI
const grantModal = document.getElementById('grantModal');
const closeGrantModal = document.getElementById('closeGrantModal');
const cancelGrantModal = document.getElementById('cancelGrantModal');
const confirmGrantModal = document.getElementById('confirmGrantModal');
const grantTargetName = document.getElementById('grantTargetName');
const modalDurationSelect = document.getElementById('modalDurationSelect');

// Init
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  if (authToken) {
    verifySession();
  } else {
    showLogin();
  }
});

function setupEventListeners() {
  // Login Form
  loginForm.addEventListener('submit', handleLogin);
  logoutBtn.addEventListener('click', handleLogout);

  // Tabs
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchTab(target);
    });
  });

  // User Search & Filters
  document.getElementById('userSearchInput').addEventListener('input', renderUsersTable);
  document.getElementById('statusFilterSelect').addEventListener('change', renderUsersTable);
  document.getElementById('refreshUsersBtn').addEventListener('click', fetchUsers);
  const syncCloudBtn = document.getElementById('syncCloudBtn');
  if (syncCloudBtn) {
    syncCloudBtn.addEventListener('click', async () => {
      syncCloudBtn.style.opacity = '0.5';
      try {
        const res = await fetch(`${API_BASE}/api/admin/backup/sync`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const d = await res.json();
        alert(d.message || 'Cloud backup synced!');
        fetchUsers();
      } catch (err) {
        alert('Failed to connect for cloud sync.');
      } finally {
        syncCloudBtn.style.opacity = '1';
      }
    });
  }

  // Quick Grant Form
  document.getElementById('quickGrantForm').addEventListener('submit', handleQuickGrant);
  const quickDuration = document.getElementById('quickDuration');
  const quickCustomAmount = document.getElementById('quickCustomAmount');
  const quickCustomUnit = document.getElementById('quickCustomUnit');
  const quickExactDate = document.getElementById('quickExactDate');

  if (quickDuration) quickDuration.addEventListener('change', updateQuickDurationUI);
  if (quickCustomAmount) quickCustomAmount.addEventListener('input', updateQuickDurationUI);
  if (quickCustomUnit) quickCustomUnit.addEventListener('change', updateQuickDurationUI);
  if (quickExactDate) quickExactDate.addEventListener('input', updateQuickDurationUI);

  // Grant Modal
  closeGrantModal.addEventListener('click', () => grantModal.classList.add('hidden'));
  cancelGrantModal.addEventListener('click', () => grantModal.classList.add('hidden'));
  confirmGrantModal.addEventListener('click', handleConfirmModalGrant);

  const modalDurationSelectEl = document.getElementById('modalDurationSelect');
  const modalCustomAmountEl = document.getElementById('modalCustomAmount');
  const modalCustomUnitEl = document.getElementById('modalCustomUnit');
  const modalExactDateEl = document.getElementById('modalExactDate');

  if (modalDurationSelectEl) modalDurationSelectEl.addEventListener('change', updateModalDurationUI);
  if (modalCustomAmountEl) modalCustomAmountEl.addEventListener('input', updateModalDurationUI);
  if (modalCustomUnitEl) modalCustomUnitEl.addEventListener('change', updateModalDurationUI);
  if (modalExactDateEl) modalExactDateEl.addEventListener('input', updateModalDurationUI);

  initDefaultDatePickers();
  updateQuickDurationUI();

  // Updates Form
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('updateFileInput');
  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleFileSelected);

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileInput.files = e.dataTransfer.files;
      handleFileSelected();
    }
  });

  document.getElementById('updateTargetType').addEventListener('change', (e) => {
    const group = document.getElementById('targetUserGroup');
    if (e.target.value === 'user') {
      group.classList.remove('hidden');
    } else {
      group.classList.add('hidden');
    }
  });

  document.getElementById('updatePublishForm').addEventListener('submit', handlePublishUpdate);

  // Audit
  document.getElementById('refreshAuditBtn').addEventListener('click', fetchAuditLogs);
  document.getElementById('autoRefreshAudit').addEventListener('change', (e) => {
    if (e.target.checked) {
      startAuditPolling();
    } else {
      clearInterval(auditInterval);
    }
  });
}

function switchTab(tabId) {
  navTabs.forEach(t => {
    if (t.getAttribute('data-tab') === tabId) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  Object.keys(tabPanes).forEach(k => {
    if (k === tabId) {
      tabPanes[k].classList.remove('hidden');
      tabPanes[k].classList.add('active');
    } else {
      tabPanes[k].classList.add('hidden');
      tabPanes[k].classList.remove('active');
    }
  });

  if (tabId === 'updates') {
    fetchUpdates();
  } else if (tabId === 'audit') {
    fetchAuditLogs();
  }
}

// Authentication Handlers
async function handleLogin(e) {
  e.preventDefault();
  loginError.classList.add('hidden');
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span>Verifying credentials...</span>';

  const username = document.getElementById('adminUsername').value.trim();
  const password = document.getElementById('adminPassword').value;

  try {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok && data.success && data.token) {
      authToken = data.token;
      adminUsername = username;
      localStorage.setItem('splash_admin_token', authToken);
      localStorage.setItem('splash_admin_username', adminUsername);
      showDashboard();
    } else {
      loginError.textContent = data.message || 'Invalid administrator credentials.';
      loginError.classList.remove('hidden');
    }
  } catch (err) {
    loginError.textContent = 'Server connection failed. Ensure Splash.Server is running.';
    loginError.classList.remove('hidden');
  } finally {
    loginBtn.disabled = false;
    loginBtn.innerHTML = `<span>Authenticate Session</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  }
}

let consecutive401Count = 0;

function handleApi401() {
  consecutive401Count++;
  // Require at least 5 consecutive 401s before logging out to protect against transient edge/redeploy glitches
  if (consecutive401Count >= 5) {
    handleLogout();
  }
}

function handleApiSuccess() {
  consecutive401Count = 0;
}

function handleLogout() {
  authToken = null;
  localStorage.removeItem('splash_admin_token');
  localStorage.removeItem('splash_admin_username');
  clearInterval(pollInterval);
  clearInterval(auditInterval);
  showLogin();
}

function showLogin() {
  loginSection.classList.remove('hidden');
  dashboardSection.classList.add('hidden');
}

function showDashboard() {
  loginSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  currentAdminName.textContent = adminUsername;
  
  // Initial Loads
  fetchUsers();
  fetchUpdates();
  fetchAuditLogs();

  // Background Polling
  clearInterval(pollInterval);
  pollInterval = setInterval(fetchUsers, 4000);
  startAuditPolling();
}

let isVerifyingSession = false;

async function verifySession() {
  if (!authToken) {
    showLogin();
    return;
  }
  if (isVerifyingSession) return;
  isVerifyingSession = true;

  try {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      handleApiSuccess();
      isVerifyingSession = false;
      showDashboard();
    } else if (res.status === 401) {
      isVerifyingSession = false;
      handleApi401();
      if (authToken) {
        showWakingUpState();
        setTimeout(verifySession, 3000);
      }
    } else {
      // Server is sleeping/waking up (502/503/504 on Render cold start)
      // KEEP SESSION TOKEN and retry!
      isVerifyingSession = false;
      showWakingUpState();
      setTimeout(verifySession, 3000);
    }
  } catch (err) {
    // Network hiccup or Render cold start - NEVER wipe token!
    isVerifyingSession = false;
    showWakingUpState();
    setTimeout(verifySession, 3000);
  }
}

function showWakingUpState() {
  if (loginError && !loginSection.classList.contains('hidden')) {
    loginError.textContent = '⚡ Connecting to server... Maintaining active admin session.';
    loginError.className = 'alert-box info';
    loginError.classList.remove('hidden');
  }
}

function startAuditPolling() {
  clearInterval(auditInterval);
  auditInterval = setInterval(() => {
    const tabActive = tabPanes.audit.classList.contains('active');
    const autoChecked = document.getElementById('autoRefreshAudit').checked;
    if (tabActive && autoChecked) {
      fetchAuditLogs();
    }
  }, 5000);
}

// User Management API & Rendering
function getDurationSeconds(durationValue, customAmount, customUnit, exactDateVal) {
  if (durationValue === '0') return 0; // Permanent / Lifetime
  if (durationValue === 'exact') {
    if (!exactDateVal) return 0;
    const targetMs = new Date(exactDateVal).getTime();
    const nowMs = Date.now();
    const diffSec = Math.round((targetMs - nowMs) / 1000);
    return diffSec > 0 ? diffSec : 60;
  }
  if (durationValue === 'custom') {
    const amt = parseFloat(customAmount);
    if (isNaN(amt) || amt <= 0) return 0;
    if (customUnit === 'seconds') return Math.max(1, Math.round(amt));
    if (customUnit === 'minutes') return Math.max(1, Math.round(amt * 60));
    if (customUnit === 'hours') return Math.max(1, Math.round(amt * 3600));
    if (customUnit === 'days') return Math.max(1, Math.round(amt * 86400));
    if (customUnit === 'weeks') return Math.max(1, Math.round(amt * 604800));
    if (customUnit === 'months') return Math.max(1, Math.round(amt * 2592000));
    return Math.round(amt * 60);
  }
  if (durationValue.endsWith('s')) return parseInt(durationValue, 10);
  if (durationValue.endsWith('m')) return parseInt(durationValue, 10) * 60;
  if (durationValue.endsWith('h')) return parseInt(durationValue, 10) * 3600;
  if (durationValue.endsWith('d')) return parseInt(durationValue, 10) * 86400;
  const num = parseFloat(durationValue);
  if (!isNaN(num) && num > 0) return Math.round(num * 3600);
  return 0;
}

function formatDurationPreview(totalSeconds) {
  if (totalSeconds <= 0) {
    return {
      text: '👑 Permanent / Lifetime Access (Never Expires)',
      cls: 'preview-badge'
    };
  }
  const targetDate = new Date(Date.now() + totalSeconds * 1000);
  const dateStr = targetDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = targetDate.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: totalSeconds < 3600 ? '2-digit' : undefined
  });

  let rel = '';
  if (totalSeconds < 60) {
    rel = `in ${totalSeconds}s`;
  } else if (totalSeconds < 3600) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    rel = s > 0 ? `in ${m}m ${s}s` : `in ${m} minutes`;
  } else if (totalSeconds < 86400) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    rel = m > 0 ? `in ${h}h ${m}m` : `in ${h} hours`;
  } else {
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    rel = h > 0 ? `in ${d}d ${h}h` : `in ${d} days`;
  }

  return {
    text: `🟢 Will Expire: ${dateStr} at ${timeStr} (${rel})`,
    cls: 'preview-badge custom-mode'
  };
}

function initDefaultDatePickers() {
  const d = new Date(Date.now() + 24 * 3600 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  const defaultVal = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const qDate = document.getElementById('quickExactDate');
  const mDate = document.getElementById('modalExactDate');
  if (qDate && !qDate.value) qDate.value = defaultVal;
  if (mDate && !mDate.value) mDate.value = defaultVal;
}

function updateQuickDurationUI() {
  const select = document.getElementById('quickDuration');
  const customGroup = document.getElementById('quickCustomGroup');
  const exactGroup = document.getElementById('quickExactGroup');
  const previewText = document.getElementById('quickDurationPreviewText');
  const previewBadge = document.getElementById('quickDurationPreviewBadge');
  if (!select) return;

  const mode = select.value;
  if (customGroup) customGroup.classList.toggle('hidden', mode !== 'custom');
  if (exactGroup) exactGroup.classList.toggle('hidden', mode !== 'exact');

  const customAmt = document.getElementById('quickCustomAmount')?.value;
  const customUnit = document.getElementById('quickCustomUnit')?.value;
  const exactDate = document.getElementById('quickExactDate')?.value;
  const totalSeconds = getDurationSeconds(mode, customAmt, customUnit, exactDate);
  const prev = formatDurationPreview(totalSeconds);

  if (previewText) previewText.textContent = prev.text;
  if (previewBadge) previewBadge.className = prev.cls;
}

function updateModalDurationUI() {
  const select = document.getElementById('modalDurationSelect');
  const customGroup = document.getElementById('modalCustomGroup');
  const exactGroup = document.getElementById('modalExactGroup');
  const previewText = document.getElementById('modalDurationPreviewText');
  const previewBadge = document.getElementById('modalDurationPreviewBadge');
  if (!select) return;

  const mode = select.value;
  if (customGroup) customGroup.classList.toggle('hidden', mode !== 'custom');
  if (exactGroup) exactGroup.classList.toggle('hidden', mode !== 'exact');

  const customAmt = document.getElementById('modalCustomAmount')?.value;
  const customUnit = document.getElementById('modalCustomUnit')?.value;
  const exactDate = document.getElementById('modalExactDate')?.value;
  const totalSeconds = getDurationSeconds(mode, customAmt, customUnit, exactDate);
  const prev = formatDurationPreview(totalSeconds);

  if (previewText) previewText.textContent = prev.text;
  if (previewBadge) previewBadge.className = prev.cls;
}

function updateDatalists() {
  const userSuggestions = document.getElementById('userSuggestions');
  const updateUserSuggestions = document.getElementById('updateUserSuggestions');
  if (!usersData || !Array.isArray(usersData)) return;

  const names = Array.from(new Set(usersData.map(u => u.username))).filter(Boolean).sort();
  const optionsHtml = names.map(n => `<option value="${escapeHtml(n)}"></option>`).join('');
  if (userSuggestions) userSuggestions.innerHTML = optionsHtml;
  if (updateUserSuggestions) updateUserSuggestions.innerHTML = optionsHtml;
}

window.quickGrantSearchedUser = function(name) {
  const input = document.getElementById('quickUsername');
  if (input) {
    input.value = name;
    input.focus();
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.style.boxShadow = '0 0 0 2px var(--color-accent)';
    setTimeout(() => { try { input.style.boxShadow = ''; } catch(e){} }, 2500);
  }
};

async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      handleApiSuccess();
      usersData = await res.json();
      updateStats();
      updateDatalists();
      renderUsersTable();
    } else if (res.status === 401) {
      handleApi401();
    }
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

function updateStats() {
  const total = usersData.length;
  const approved = usersData.filter(u => u.status === 'Approved').length;
  const pending = usersData.filter(u => u.status === 'PendingApproval').length;

  document.getElementById('statTotalUsers').textContent = total;
  document.getElementById('statActiveLicenses').textContent = approved;
  document.getElementById('statPendingCount').textContent = pending;

  const pendingBadge = document.getElementById('pendingBadge');
  if (pending > 0) {
    pendingBadge.textContent = pending;
    pendingBadge.classList.remove('hidden');
  } else {
    pendingBadge.classList.add('hidden');
  }
}

function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  const search = document.getElementById('userSearchInput').value.toLowerCase().trim();
  const filter = document.getElementById('statusFilterSelect').value;

  const filtered = usersData.filter(u => {
    const matchSearch = !search || 
                        u.username.toLowerCase().includes(search) || 
                        (u.deviceLockId && u.deviceLockId.toLowerCase().includes(search));
    const matchFilter = !filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  document.getElementById('filteredCount').textContent = `${filtered.length} Users`;

  if (filtered.length === 0) {
    if (search) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state" style="padding: 28px 16px;">
            <div style="font-size: 14px; margin-bottom: 12px; color: var(--text-secondary);">
              No registered user found matching "<strong>${escapeHtml(search)}</strong>"
            </div>
            <button type="button" class="btn btn-primary btn-sm" onclick="quickGrantSearchedUser('${escapeHtml(search)}')" style="display:inline-flex; align-items:center; gap:6px;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Grant Access to "${escapeHtml(search)}" Now</span>
            </button>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-state">No users match your current search/filter.</td></tr>`;
    }
    return;
  }

  const now = new Date();

  tbody.innerHTML = filtered.map(u => {
    // Status Badge
    let statusClass = 'badge-pending';
    if (u.status === 'Approved') statusClass = 'badge-approved';
    else if (u.status === 'Revoked') statusClass = 'badge-revoked';
    else if (u.status === 'Expired') statusClass = 'badge-expired';

    // Access Duration display with exact real-time seconds ticking
    let durationDisplay = '<span class="text-muted">—</span>';
    if (u.status === 'Approved') {
      if (!u.accessEndUtc) {
        durationDisplay = '<strong class="text-accent">Permanent (Lifetime)</strong>';
      } else {
        const endDate = new Date(u.accessEndUtc);
        const diffMs = endDate - now;
        if (diffMs > 0) {
          const totalSecs = Math.floor(diffMs / 1000);
          const days = Math.floor(totalSecs / 86400);
          const hours = Math.floor((totalSecs % 86400) / 3600);
          const mins = Math.floor((totalSecs % 3600) / 60);
          const secs = totalSecs % 60;

          if (days > 0) {
            durationDisplay = `<span class="text-success">${days}d ${hours}h left</span>`;
          } else if (hours > 0) {
            durationDisplay = `<span class="text-success">${hours}h ${mins}m left</span>`;
          } else if (mins > 0) {
            durationDisplay = `<span class="text-success">${mins}m ${secs}s left</span>`;
          } else {
            durationDisplay = `<span class="text-success" style="font-weight:700;">${secs}s left</span>`;
          }
        } else {
          durationDisplay = '<span class="text-danger">Expired</span>';
        }
      }
    } else if (u.status === 'Revoked') {
      durationDisplay = '<span class="text-danger">Access Revoked</span>';
    }

    // Hardware Lock
    const hwidDisplay = u.deviceLockId 
      ? `<span class="device-badge" title="Hardware ID: ${escapeHtml(u.deviceLockId)}">${escapeHtml(u.deviceLockId.substring(0, 10))}...</span>`
      : '<span class="badge-unbound" title="Device not bound yet. Hardware lock will automatically bind to player\'s PC on their first login.">⏳ Unbound (Auto-binds on 1st login)</span>';

    // Last seen & Clean version (no double vv)
    const lastSeen = u.lastSeenUtc ? new Date(u.lastSeenUtc).toLocaleTimeString() : 'Never';
    const rawVer = u.currentAppVersion || '1.0.0';
    const cleanVer = rawVer.replace(/^[vV]+/, '');

    return `
      <tr>
        <td><strong>${escapeHtml(u.username)}</strong></td>
        <td><span class="badge ${statusClass}">${escapeHtml(u.status)}</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:6px;">
            ${hwidDisplay}
            ${u.deviceLockId ? `<button class="btn-action" onclick="handleResetDevice('${u.id}')" title="Reset HWID">Reset</button>` : ''}
          </div>
        </td>
        <td>${durationDisplay}</td>
        <td><span style="font-family:var(--font-mono);font-size:12px;">v${escapeHtml(cleanVer)}</span></td>
        <td><span style="color:var(--text-muted);font-size:12px;">${lastSeen}</span></td>
        <td class="text-right">
          <div class="actions-cell">
            <button class="btn-action action-grant" onclick="openGrantModal('${u.id}', '${escapeHtml(u.username)}')">Grant</button>
            <button class="btn-action action-revoke" onclick="handleRevoke('${u.id}', '${escapeHtml(u.username)}')">Revoke</button>
            <button class="btn-action" onclick="handleDeleteUser('${u.id}', '${escapeHtml(u.username)}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// User Actions
window.openGrantModal = function(id, username) {
  modalTargetUser = { id, username };
  grantTargetName.textContent = username;
  initDefaultDatePickers();
  updateModalDurationUI();
  grantModal.classList.remove('hidden');
};

async function handleConfirmModalGrant() {
  if (!modalTargetUser) return;
  const selectVal = modalDurationSelect.value;
  const customAmt = document.getElementById('modalCustomAmount')?.value;
  const customUnit = document.getElementById('modalCustomUnit')?.value;
  const exactDate = document.getElementById('modalExactDate')?.value;
  const totalSeconds = getDurationSeconds(selectVal, customAmt, customUnit, exactDate);
  const durationHours = totalSeconds > 0 ? (totalSeconds / 3600.0) : null;
  
  try {
    const res = await fetch(`${API_BASE}/api/admin/users/grant-by-username`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}` 
      },
      body: JSON.stringify({
        username: modalTargetUser.username,
        durationSeconds: totalSeconds > 0 ? totalSeconds : null,
        durationHours: durationHours
      })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      grantModal.classList.add('hidden');
      fetchUsers();
      fetchAuditLogs();
    } else {
      alert(data.message || 'Failed to grant access.');
    }
  } catch (err) {
    alert('Failed to connect to server.');
  }
}

async function handleQuickGrant(e) {
  e.preventDefault();
  const username = document.getElementById('quickUsername').value.trim();
  const selectVal = document.getElementById('quickDuration').value;
  const customAmt = document.getElementById('quickCustomAmount')?.value;
  const customUnit = document.getElementById('quickCustomUnit')?.value;
  const exactDate = document.getElementById('quickExactDate')?.value;
  const totalSeconds = getDurationSeconds(selectVal, customAmt, customUnit, exactDate);
  const durationHours = totalSeconds > 0 ? (totalSeconds / 3600.0) : null;

  const passwordInput = document.getElementById('quickPassword');
  const initialPassword = passwordInput ? passwordInput.value.trim() : '';
  const msgEl = document.getElementById('quickGrantMsg');
  msgEl.classList.add('hidden');

  try {
    const res = await fetch(`${API_BASE}/api/admin/users/grant-by-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        username: username,
        durationSeconds: totalSeconds > 0 ? totalSeconds : null,
        durationHours: durationHours,
        initialPassword: initialPassword || null
      })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      msgEl.className = 'alert-box success';
      msgEl.textContent = data.message;
      msgEl.classList.remove('hidden');
      document.getElementById('quickUsername').value = '';
      if (passwordInput) passwordInput.value = '';
      fetchUsers();
      fetchAuditLogs();
      const hideDelay = data.isNewUser ? 15000 : 6000;
      setTimeout(() => msgEl.classList.add('hidden'), hideDelay);
    } else {
      msgEl.className = 'alert-box error';
      msgEl.textContent = data.message || 'Failed to grant access.';
      msgEl.classList.remove('hidden');
    }
  } catch (err) {
    msgEl.className = 'alert-box error';
    msgEl.textContent = 'Server connection error.';
    msgEl.classList.remove('hidden');
  }
}

window.handleRevoke = async function(id, username) {
  if (!confirm(`Revoke license access immediately for '${username}'? The client will be locked instantly.`)) {
    return;
  }

  try {
    // 1. Update access status to Revoked
    const res1 = await fetch(`${API_BASE}/api/admin/users/${id}/access`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}` 
      },
      body: JSON.stringify({
        status: 'Revoked',
        accessEndUtc: null,
        scheduledAction: null,
        scheduledTimeUtc: null
      })
    });

    // Update status to Revoked - keep web session active so user remains logged in with card hidden
    fetchUsers();
    fetchAuditLogs();
  } catch (err) {
    alert('Failed to revoke access: ' + err.message);
  }
};

window.handleResetDevice = async function(id) {
  if (!confirm('Reset hardware device binding for this user? They will be able to bind a new PC on next login.')) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/admin/users/${id}/reset-device`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      fetchUsers();
      fetchAuditLogs();
    }
  } catch (err) {
    alert('Failed to reset hardware device: ' + err.message);
  }
};

window.handleDeleteUser = async function(id, username) {
  if (!confirm(`PERMANENTLY delete user '${username}'? This cannot be undone.`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (res.ok && data.success) {
      fetchUsers();
      fetchAuditLogs();
    } else {
      alert(data.message || 'Failed to delete user.');
    }
  } catch (err) {
    alert('Failed to delete user: ' + err.message);
  }
};

// Updates API & Chunked Publisher
function handleFileSelected() {
  const fileInput = document.getElementById('updateFileInput');
  const fileInfo = document.getElementById('selectedFileInfo');
  const nameEl = document.getElementById('selectedFileName');
  const sizeEl = document.getElementById('selectedFileSize');

  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    nameEl.textContent = file.name;
    sizeEl.textContent = `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
    fileInfo.classList.remove('hidden');
  } else {
    fileInfo.classList.add('hidden');
  }
}

async function fetchUpdates() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/updates`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      updatesData = await res.json();
      document.getElementById('statUpdateCount').textContent = updatesData.length;

      // Compute recommended next version above client 1.2.0 and existing updates
      let maxMajor = 1, maxMinor = 2, maxPatch = 0;
      updatesData.forEach(u => {
        const parts = (u.version || '').replace(/^[vV]/, '').split('.').map(Number);
        if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          if (parts[0] > maxMajor || 
             (parts[0] === maxMajor && parts[1] > maxMinor) || 
             (parts[0] === maxMajor && parts[1] === maxMinor && (parts[2] || 0) > maxPatch)) {
            maxMajor = parts[0];
            maxMinor = parts[1];
            maxPatch = parts[2] || 0;
          }
        }
      });
      const nextVer = `${maxMajor}.${maxMinor}.${maxPatch + 1}`;
      const suggestedEl = document.getElementById('suggestedVer');
      if (suggestedEl) suggestedEl.textContent = `v${nextVer}`;
      const verInput = document.getElementById('updateVersion');
      if (verInput && (!verInput.value || verInput.value === '1.1.0' || verInput.value === '1.0.0')) {
        verInput.value = nextVer;
      }

      renderUpdatesTable();
    } else if (res.status === 401) {
      handleApi401();
    }
  } catch (err) {
    console.error('Error fetching updates:', err);
  }
}

window.handleDeleteUpdate = async function(id, version) {
  if (!confirm(`Permanently delete update v${version}? This will remove the package file from the server.`)) {
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/api/admin/updates/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      fetchUpdates();
      fetchAuditLogs();
    } else {
      alert('Failed to delete update.');
    }
  } catch (e) {
    alert('Failed to connect to server: ' + e.message);
  }
};

function renderUpdatesTable() {
  const tbody = document.getElementById('updatesTableBody');
  if (updatesData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No updates published yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = updatesData.map(u => {
    const shaShort = u.sha256Hash ? `${u.sha256Hash.substring(0, 10)}...` : 'N/A';
    const target = u.targetType === 'user' ? `User: ${u.targetUsername || u.targetUserId}` : 'All Users (Global)';
    const created = u.createdAtUtc ? new Date(u.createdAtUtc).toLocaleString() : 'N/A';
    const cleanVer = (u.version || '1.0.0').replace(/^[vV]+/, '');

    return `
      <tr>
        <td><strong>v${escapeHtml(cleanVer)}</strong></td>
        <td>${u.fileSizeMb.toFixed(2)} MB</td>
        <td>
          <span style="font-family:var(--font-mono);font-size:11px;" title="${escapeHtml(u.sha256Hash)}">${shaShort}</span>
        </td>
        <td>${escapeHtml(target)}</td>
        <td><span style="color:var(--text-muted);font-size:12px;">${created}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            <a href="/api/updates/download/${u.id}" class="btn-action" download style="text-decoration:none;">Download</a>
            <button class="btn-action btn-danger-action" onclick="handleDeleteUpdate('${u.id}', '${escapeHtml(cleanVer)}')" title="Delete update">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function handlePublishUpdate(e) {
  e.preventDefault();
  const fileInput = document.getElementById('updateFileInput');
  const alertEl = document.getElementById('updateAlert');
  alertEl.classList.add('hidden');

  if (!fileInput.files || !fileInput.files[0]) {
    alertEl.className = 'alert-box error';
    alertEl.textContent = 'Please select a Splash executable or zip file to publish.';
    alertEl.classList.remove('hidden');
    return;
  }

  const file = fileInput.files[0];
  const version = document.getElementById('updateVersion').value.trim();
  const targetType = document.getElementById('updateTargetType').value;
  const targetUsername = document.getElementById('updateTargetUsername').value.trim();
  const releaseNotes = document.getElementById('updateNotes').value.trim();
  const isMandatory = document.getElementById('updateMandatory').checked;

  const submitBtn = document.getElementById('publishSubmitBtn');
  const progressPanel = document.getElementById('uploadProgressPanel');
  const progressBar = document.getElementById('uploadProgressBar');
  const progressText = document.getElementById('uploadStatusText');
  const progressPercent = document.getElementById('uploadPercentage');
  const uploadSpeed = document.getElementById('uploadSpeed');

  submitBtn.disabled = true;
  progressPanel.classList.remove('hidden');

  function getSafeUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      try { return crypto.randomUUID(); } catch (e) { }
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  try {
    // 1. Safe SHA-256 Hash (if supported in browser, else server computes streamingly)
    let computedSha256 = '';
    try {
      if (typeof crypto !== 'undefined' && crypto.subtle && file.size <= 40 * 1024 * 1024) {
        progressText.textContent = 'Computing SHA-256 integrity hash...';
        progressBar.style.width = '4%';
        progressPercent.textContent = '4%';
        const fileBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', fileBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        computedSha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (hashErr) {
      console.warn('Browser SHA-256 computation skipped, server will compute authoritative hash:', hashErr);
      computedSha256 = '';
    }

    // 2. Chunked Upload Pipeline
    const uploadId = getSafeUUID();
    const CHUNK_SIZE = 2 * 1024 * 1024; // 2 MB chunks
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    let startTime = Date.now();
    let uploadedBytes = 0;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunkBlob = file.slice(start, end);

      progressText.textContent = `Streaming chunk ${i + 1} of ${totalChunks} (${((start / file.size) * 100).toFixed(0)}%)...`;

      const chunkRes = await fetch(`${API_BASE}/api/admin/updates/upload-chunk?uploadId=${uploadId}&chunkIndex=${i}&chunkOffset=${start}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': `Bearer ${authToken || ''}`
        },
        body: chunkBlob
      });

      if (!chunkRes.ok) {
        const errText = await chunkRes.text().catch(() => '');
        throw new Error(`Chunk ${i + 1}/${totalChunks} failed (HTTP ${chunkRes.status}): ${errText || chunkRes.statusText}`);
      }

      uploadedBytes += (end - start);
      const pct = Math.round((uploadedBytes / file.size) * 85) + 5; // 5% to 90%
      progressBar.style.width = `${pct}%`;
      progressPercent.textContent = `${pct}%`;

      const elapsedSec = (Date.now() - startTime) / 1000;
      const speedMbps = elapsedSec > 0 ? (uploadedBytes / (1024 * 1024) / elapsedSec).toFixed(2) : '0';
      uploadSpeed.textContent = `${speedMbps} MB/s`;
    }

    // 3. Finalize & Sign on Server
    progressText.textContent = 'Verifying cryptographic SHA-256 and signing with RSA-4096...';
    progressBar.style.width = '95%';
    progressPercent.textContent = '95%';

    const finalizeRes = await fetch(`${API_BASE}/api/admin/updates/finalize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken || ''}`
      },
      body: JSON.stringify({
        uploadId: uploadId,
        version: version.replace(/^[vV]/, ''),
        fileName: file.name,
        totalSizeBytes: file.size,
        expectedSha256: computedSha256 || null,
        releaseNotes: releaseNotes,
        targetType: targetType,
        targetUsername: targetUsername || null,
        isMandatory: isMandatory
      })
    });

    const finalData = await finalizeRes.json().catch(() => null);
    if (finalizeRes.ok && finalData && finalData.success) {
      progressBar.style.width = '100%';
      progressPercent.textContent = '100%';
      progressText.textContent = 'Published & Signed Successfully!';

      alertEl.className = 'alert-box success';
      alertEl.textContent = `Update v${version} published successfully with RSA-4096 digital signature!`;
      alertEl.classList.remove('hidden');

      // Reset form
      document.getElementById('updatePublishForm').reset();
      document.getElementById('selectedFileInfo').classList.add('hidden');
      fetchUpdates();
      fetchAuditLogs();
    } else {
      throw new Error(finalData.message || 'Server finalization failed.');
    }
  } catch (err) {
    alertEl.className = 'alert-box error';
    alertEl.textContent = 'Update publishing error: ' + err.message;
    alertEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    setTimeout(() => {
      progressPanel.classList.add('hidden');
    }, 4000);
  }
}

// Audit Logs API & Rendering
async function fetchAuditLogs() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/audit`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      handleApiSuccess();
      auditData = await res.json();
      renderAuditStream();
    } else if (res.status === 401) {
      handleApi401();
    }
  } catch (err) {
    console.error('Error fetching audit logs:', err);
  }
}

function renderAuditStream() {
  const container = document.getElementById('auditStreamContainer');
  if (!auditData || auditData.length === 0) {
    container.innerHTML = `<div class="empty-state">No audit logs recorded yet.</div>`;
    return;
  }

  container.innerHTML = auditData.map(log => {
    const time = log.timestampUtc ? new Date(log.timestampUtc).toLocaleString() : 'N/A';
    return `
      <div class="audit-item">
        <div class="audit-left">
          <span class="audit-action-tag">${escapeHtml(log.action)}</span>
          <span class="audit-details"><strong>${escapeHtml(log.username || 'System')}</strong>: ${escapeHtml(log.details)}</span>
        </div>
        <div class="audit-right">
          <span>${escapeHtml(log.ipAddress || '127.0.0.1')}</span>
          <span>${time}</span>
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  return text.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
