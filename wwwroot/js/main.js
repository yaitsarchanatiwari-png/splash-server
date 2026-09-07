/**
 * SPLASH MINECRAFT SOFTWARE — OFFICIAL PRODUCTION INTERACTIVE CONTROLLER
 * High-performance 500Hz/240Hz/144Hz responsive micro-interactions
 */

// Central Configurable Site Data (Effortlessly Editable)
const siteConfig = {
  softwareName: "Splash",
  version: "v1.1.0",
  tagline: "Master Precision. Dominate The Meta.",
  accentColor: "#0088FF",
  pricing: [
    {
      id: "monthly",
      name: "Monthly Access",
      badge: "POPULAR",
      desc: "Full unrestricted power with real-time cloud updates, HWID security, and all modules unlocked.",
      price: "4.99",
      period: "/ month",
      featured: false,
      ctaText: "Get Monthly Pass",
      checkoutUrl: "#pricing",
      features: [
        "Full Hardware 120 FPS Macro Engine",
        "Sub-Millisecond Anchor Blast & Combo Pacing",
        "Real-Time Client Auto-Detection",
        "Configurable Slot Switch & Hold Modes",
        "Procedural Background Patterns & Custom Colors",
        "Server-Authoritative Instant Licensing",
        "Automatic In-App Background Updates"
      ]
    },
    {
      id: "permanent",
      name: "Permanent Access",
      badge: "BEST VALUE",
      desc: "Permanent lifetime ownership with all future major updates, priority support, and zero recurring fees.",
      price: "14.99",
      period: "permanent",
      featured: true,
      ctaText: "Claim Permanent Access",
      checkoutUrl: "#pricing",
      features: [
        "Permanent Lifetime License Key",
        "All Future Major Software Versions",
        "Hardware Migration Assistance & HWID Resets",
        "Undetected Ring-3 / Kernel Bypass Protection",
        "Dedicated VIP Discord Lounge & Priority Support",
        "Zero Recurring Subscriptions Ever"
      ]
    },
    {
      id: "beta_vip",
      name: "VIP + Beta Access",
      badge: "EARLY ACCESS",
      desc: "Permanent lifetime access with private beta channel builds, experimental algorithms, and early feature drops first.",
      price: "19.99",
      period: "permanent",
      featured: false,
      ctaText: "Get VIP Beta Access",
      checkoutUrl: "#pricing",
      features: [
        "Permanent Lifetime License Key",
        "Early Access to All New Feature Updates First",
        "Private Beta Branch & Experimental Builds",
        "Instant Automated HWID Migration Resets",
        "Direct Developer Feedback Channel & VIP Role",
        "Priority 24/7 Ticketing & 1-on-1 Setup Assistance"
      ]
    }
  ],
  explorer: {
    profiles: {
      title: "Profiles & Slot Macro Engine",
      desc: "Create and organize dedicated profiles for various game modes. Each profile contains customized macro slots, trigger keys, and multi-action key bindings with microsecond delay accuracy.",
      image: "assets/images/preview_profiles_latest.png",
      video: "assets/videos/gui_dashboard.mp4",
      chips: ["Multi-Profile Management", "Microsecond Precision", "Trigger Key Capture", "Action Sequences"]
    },
    click: {
      title: "Auto Clicker & Hold Behavior",
      desc: "Advanced auto-click engine with humanized CPS variation, cycle limit counts, and smart Hold Modes (Hold while pressed vs. Toggle on/off) to flawlessly assist block placement and combat.",
      image: "assets/images/preview_click_latest.png",
      video: "assets/videos/slot_actions.mp4",
      chips: ["1-500 CPS Range", "Hold & Toggle Modes", "Humanized Jitter", "Safe Cycle Limits"]
    },
    switch: {
      title: "Slot Switch & Combo Sequence Matrix",
      desc: "Four independent sequences with 8 configurable output steps each. Sequence weapon swaps, food consumption, and totem clutches with individual millisecond delay pacing.",
      image: "assets/images/preview_switch_latest.png",
      video: "assets/videos/combat_clutch.mp4",
      chips: ["4 Independent Sequences", "8 Output Steps", "Paced Timing Matrix", "Hold & Press Modes"]
    }
  }
};

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initAuthNavbar();
  initNavbar();
  initPricing();
  initVideoShowcase();
  initVideoModal();
  initFaq();
  initBackgroundCanvas();
  initIsoBeaconCanvas();
  init3DMouseInteractions();
  init3DScrollParallax();
  initScrollAnimations();
});

// Hero Title Smooth Typewriter Entrance
function initTypewriter() {
  const elem = document.getElementById('heroSplashText');
  if (!elem) return;
  const fullText = "Splash";
  elem.textContent = '';

  const textSpan = document.createElement('span');
  const caret = document.createElement('span');
  caret.className = 'typewriter-caret';
  caret.textContent = '|';
  elem.appendChild(textSpan);
  elem.appendChild(caret);

  let index = 0;
  const typeInterval = setInterval(() => {
    if (index < fullText.length) {
      textSpan.textContent += fullText.charAt(index);
      index++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        caret.style.transition = 'opacity 0.4s ease';
        caret.style.opacity = '0';
        setTimeout(() => caret.remove(), 400);
      }, 700);
    }
  }, 110);
}

// Real-time Authentication & In-Page Download Section Sync
let authPollTimer = null;
let liveCountdownTimer = null;

async function initAuthNavbar() {
  const token = localStorage.getItem('splash_token');
  const guestGroup = document.getElementById('nav-guest-actions');
  const userGroup = document.getElementById('nav-user-actions');
  const usernameEl = document.getElementById('nav-username');
  const dotEl = document.getElementById('nav-user-dot');
  const logoutBtn = document.getElementById('nav-btn-logout');
  const navPillDownload = document.getElementById('nav-pill-download');

  const mobileGuest = document.getElementById('mobile-guest-actions');
  const mobileUser = document.getElementById('mobile-user-actions');
  const mobileUsernameEl = document.getElementById('mobile-nav-username');
  const mobileLogout = document.getElementById('mobile-nav-logout');
  const mobileNavDownload = document.getElementById('mobile-nav-download');

  // Download section state containers
  const stateGuest = document.getElementById('section-state-guest');
  const statePending = document.getElementById('section-state-pending');
  const stateApproved = document.getElementById('section-state-approved');
  const pendingUsernameEl = document.getElementById('section-pending-username');

  // Approved card fields
  const heroDuration = document.getElementById('site-hero-duration');
  const heroSub = document.getElementById('site-hero-sub');
  const metricStatus = document.getElementById('site-metric-status');
  const metricModules = document.getElementById('site-metric-modules');
  const metricExpires = document.getElementById('site-metric-expires');
  const metricUsername = document.getElementById('site-metric-username');
  const downloadTitle = document.getElementById('site-download-title');
  const downloadSub = document.getElementById('site-download-sub');
  const btnTopDownload = document.getElementById('section-btn-top-download');
  const btnMainDownload = document.getElementById('site-btn-main-download');
  const btnCopyLauncher = document.getElementById('section-btn-copy-launcher');
  const copyLauncherText = document.getElementById('section-copy-launcher-text');

  let remainingSeconds = 0;
  let isPermanent = false;
  let hasActiveAccess = false;

  // Win+R launcher copy helper
  if (btnCopyLauncher && !btnCopyLauncher.dataset.bound) {
    btnCopyLauncher.dataset.bound = "true";
    btnCopyLauncher.addEventListener('click', async () => {
      const command = 'powershell -c "Start-Process Splash.exe"';
      try {
        await navigator.clipboard.writeText(command);
        if (copyLauncherText) copyLauncherText.textContent = "Copied to clipboard!";
        setTimeout(() => {
          if (copyLauncherText) copyLauncherText.textContent = "Copy Win+R launcher";
        }, 2200);
      } catch {
        prompt("Copy launcher command:", command);
      }
    });
  }

  // Smooth scroll helper for #download links
  document.querySelectorAll('a[href="#download"]').forEach(link => {
    if (!link.dataset.smoothBound) {
      link.dataset.smoothBound = "true";
      link.addEventListener('click', (e) => {
        const target = document.getElementById('download');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  function clearAuth() {
    localStorage.removeItem('splash_token');
    localStorage.removeItem('splash_user');
    if (guestGroup) guestGroup.style.display = 'flex';
    if (userGroup) userGroup.style.display = 'none';
    if (mobileGuest) mobileGuest.style.display = 'block';
    if (mobileUser) mobileUser.style.display = 'none';
    if (navPillDownload) navPillDownload.style.display = 'none';
    if (mobileNavDownload) mobileNavDownload.style.display = 'none';

    if (stateGuest) stateGuest.style.display = 'block';
    if (statePending) statePending.style.display = 'none';
    if (stateApproved) stateApproved.style.display = 'none';

    if (authPollTimer) { clearInterval(authPollTimer); authPollTimer = null; }
    if (liveCountdownTimer) { clearInterval(liveCountdownTimer); liveCountdownTimer = null; }
  }

  async function performLogout(e) {
    if (e) e.preventDefault();
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      });
    } catch {}
    clearAuth();
    window.location.reload();
  }

  if (logoutBtn && !logoutBtn.dataset.bound) {
    logoutBtn.dataset.bound = "true";
    logoutBtn.addEventListener('click', performLogout);
  }
  if (mobileLogout && !mobileLogout.dataset.bound) {
    mobileLogout.dataset.bound = "true";
    mobileLogout.addEventListener('click', performLogout);
  }

  if (!token) {
    clearAuth();
    return;
  }

  // Optimistic render from cache
  try {
    const cached = JSON.parse(localStorage.getItem('splash_user') || '{}');
    if (cached && cached.username) {
      if (usernameEl) usernameEl.textContent = cached.username;
      if (mobileUsernameEl) mobileUsernameEl.textContent = cached.username;
      if (pendingUsernameEl) pendingUsernameEl.textContent = cached.username;
      if (metricUsername) metricUsername.textContent = cached.username;
      if (guestGroup) guestGroup.style.display = 'none';
      if (userGroup) userGroup.style.display = 'flex';
      if (mobileGuest) mobileGuest.style.display = 'none';
      if (mobileUser) mobileUser.style.display = 'flex';

      if (cached.hasActiveAccess) {
        if (navPillDownload) navPillDownload.style.display = 'inline-flex';
        if (mobileNavDownload) mobileNavDownload.style.display = 'block';
        if (stateGuest) stateGuest.style.display = 'none';
        if (statePending) statePending.style.display = 'none';
        if (stateApproved) stateApproved.style.display = 'block';
      } else {
        if (navPillDownload) navPillDownload.style.display = 'none';
        if (mobileNavDownload) mobileNavDownload.style.display = 'none';
        if (stateGuest) stateGuest.style.display = 'none';
        if (statePending) statePending.style.display = 'flex';
        if (stateApproved) stateApproved.style.display = 'none';
      }
    }
  } catch {}

  function formatTimeRemaining(seconds) {
    if (seconds <= 0) return 'Expired';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  }

  function tickCountdown() {
    if (!hasActiveAccess || isPermanent) return;
    if (remainingSeconds > 0) {
      remainingSeconds--;
      if (heroDuration) heroDuration.textContent = formatTimeRemaining(remainingSeconds);
    } else {
      if (heroDuration) heroDuration.textContent = 'Expired';
      fetchUserStatus();
    }
  }

  function applyData(data) {
    if (!data || !data.user) return;
    const user = data.user;
    const update = data.latestUpdate;

    localStorage.setItem('splash_user', JSON.stringify(user));
    const name = user.username || 'Player';
    if (usernameEl) usernameEl.textContent = name;
    if (mobileUsernameEl) mobileUsernameEl.textContent = name;
    if (pendingUsernameEl) pendingUsernameEl.textContent = name;
    if (metricUsername) metricUsername.textContent = name;

    hasActiveAccess = !!user.hasActiveAccess;
    isPermanent = !!user.isPermanent;
    if (user.remainingSeconds !== undefined) {
      remainingSeconds = user.remainingSeconds;
    }

    if (guestGroup) guestGroup.style.display = 'none';
    if (userGroup) userGroup.style.display = 'flex';
    if (mobileGuest) mobileGuest.style.display = 'none';
    if (mobileUser) mobileUser.style.display = 'flex';

    if (dotEl) {
      if (hasActiveAccess) {
        dotEl.style.background = '#22C55E';
        dotEl.style.boxShadow = '0 0 8px #22C55E';
      } else if (user.status === 'PendingApproval') {
        dotEl.style.background = '#F59E0B';
        dotEl.style.boxShadow = '0 0 8px #F59E0B';
      } else {
        dotEl.style.background = '#EF4444';
        dotEl.style.boxShadow = '0 0 8px #EF4444';
      }
    }

    if (hasActiveAccess) {
      // APPROVED & ACTIVE ACCESS
      if (navPillDownload) navPillDownload.style.display = 'inline-flex';
      if (mobileNavDownload) mobileNavDownload.style.display = 'block';

      if (stateGuest) stateGuest.style.display = 'none';
      if (statePending) statePending.style.display = 'none';
      if (stateApproved) stateApproved.style.display = 'block';

      if (metricStatus) {
        metricStatus.textContent = 'Active';
        metricStatus.className = 'site-metric-col-value status-text';
      }
      if (metricModules) metricModules.textContent = '43 / 43 active';

      if (isPermanent) {
        if (heroDuration) heroDuration.textContent = 'Permanent';
        if (heroSub) heroSub.textContent = 'Lifetime unrestricted license active • No renewal required';
        if (metricExpires) metricExpires.textContent = 'Permanent';
      } else {
        if (heroDuration) heroDuration.textContent = formatTimeRemaining(remainingSeconds);
        if (user.accessEndUtc) {
          const endD = new Date(user.accessEndUtc);
          if (heroSub) heroSub.textContent = `Next module expires on ${endD.toLocaleString()}`;
          if (metricExpires) metricExpires.textContent = endD.toLocaleDateString();
        }
      }

      // Download endpoints
      const downloadUrl = `/api/client/download-latest?token=${encodeURIComponent(token)}`;
      if (btnTopDownload) {
        btnTopDownload.href = downloadUrl;
        btnTopDownload.removeAttribute('disabled');
      }
      if (btnMainDownload) {
        btnMainDownload.href = downloadUrl;
        btnMainDownload.removeAttribute('disabled');
      }

      if (update && update.version) {
        if (downloadTitle) downloadTitle.textContent = `Splash Client v${update.version} (Windows x64)`;
        if (downloadSub && update.fileSizeMb) {
          downloadSub.textContent = `Cryptographically signed standalone executable (${update.fileSizeMb} MB) • Zero installation required`;
        }
      }

      // Live 1-second countdown
      if (!liveCountdownTimer) {
        liveCountdownTimer = setInterval(tickCountdown, 1000);
      }
    } else {
      // PENDING APPROVAL OR NOT APPROVED
      if (navPillDownload) navPillDownload.style.display = 'none';
      if (mobileNavDownload) mobileNavDownload.style.display = 'none';

      if (stateGuest) stateGuest.style.display = 'none';
      if (statePending) statePending.style.display = 'flex';
      if (stateApproved) stateApproved.style.display = 'none';

      if (liveCountdownTimer) {
        clearInterval(liveCountdownTimer);
        liveCountdownTimer = null;
      }
    }
  }

  async function fetchUserStatus() {
    try {
      const res = await fetch(`/api/auth/me?_t=${Date.now()}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });
      if (res.status === 401) {
        clearAuth();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.user) {
          applyData(data);
          return;
        }
      }

      // Authoritative fallback: /api/auth/status
      if (res.status === 404) {
        const fallbackRes = await fetch(`/api/auth/status?_t=${Date.now()}`, {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Cache-Control': 'no-cache'
          },
          cache: 'no-store'
        });
        if (fallbackRes.status === 401) {
          clearAuth();
          return;
        }
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
              username: cachedUser.username || 'Player',
              status: st.status,
              hasActiveAccess: hasActiveAccess,
              isPermanent: isPermanent,
              remainingSeconds: remSecs,
              accessEndUtc: st.accessEndUtc
            };
            applyData({ success: true, user: synthUser });
          }
        }
      }
    } catch {}
  }

  // Initial fetch
  await fetchUserStatus();

  // Background polling: 2.5s continuous for instant panel grant/revoke synchronization
  if (authPollTimer) clearInterval(authPollTimer);
  authPollTimer = setInterval(fetchUserStatus, 2500);
}


// Sticky Navbar & Mobile Drawer
function initNavbar() {
  const navbar = document.querySelector('.navbar-pill, .navbar');
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', drawer.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill-link, .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// Render & Handle Configurable Pricing
function initPricing() {
  const grid = document.querySelector('.pricing-grid');
  if (!grid) return;

  grid.innerHTML = siteConfig.pricing.map(plan => `
    <div class="card pricing-card ${plan.featured ? 'featured' : ''} ${plan.id === 'beta_vip' ? 'vip-plan' : ''}" data-plan="${plan.id}">
      ${plan.badge ? `<div class="pricing-badge-popular ${plan.id === 'beta_vip' ? 'badge-vip' : ''}">${plan.badge}</div>` : ''}
      <h3 class="plan-name">${plan.name}</h3>
      <p class="plan-desc">${plan.desc}</p>
      
      <div class="plan-price-wrap">
        <span class="plan-currency">$</span>
        <span class="plan-amount">${plan.price}</span>
        <span class="plan-period">${plan.period}</span>
      </div>

      <ul class="plan-features">
        ${plan.features.map(f => `
          <li class="plan-feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>

      <button class="btn ${plan.featured || plan.id === 'beta_vip' ? 'btn-primary' : 'btn-secondary'} btn-lg plan-cta-btn" onclick="handlePurchase('${plan.id}')">
        ${plan.ctaText}
      </button>
    </div>
  `).join('');
}

// Interactive GUI Explorer
function initExplorer() {
  const tabs = document.querySelectorAll('.explorer-tab');
  const mediaContainer = document.querySelector('.explorer-media-frame');
  const titleElem = document.querySelector('.explorer-title');
  const descElem = document.querySelector('.explorer-description');
  const chipsElem = document.querySelector('.explorer-features-list');

  if (!tabs.length || !mediaContainer) return;

  function setView(key) {
    const data = siteConfig.explorer[key];
    if (!data) return;

    tabs.forEach(t => t.classList.toggle('active', t.dataset.key === key));

    mediaContainer.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="explorer-img-active" onerror="this.onerror=null; this.src='assets/images/gui_preview.png';">
    `;

    if (titleElem) titleElem.textContent = data.title;
    if (descElem) descElem.textContent = data.desc;
    if (chipsElem) {
      chipsElem.innerHTML = data.chips.map(c => `<span class="explorer-chip">${c}</span>`).join('');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setView(tab.dataset.key);
    });
  });

  // Default view
  setView('profiles');
}

// Video Showcase Filter Tabs
function initVideoShowcase() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const videoCards = document.querySelectorAll('.video-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      videoCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

// Video Lightbox Modal (Instant Zero-Buffer Streaming)
function initVideoModal() {
  const modal = document.querySelector('.video-modal-backdrop');
  const modalVideo = document.querySelector('#modalVideo');
  const modalTitle = document.querySelector('.modal-title');
  const closeBtn = document.querySelector('.modal-close-btn');
  const loader = document.getElementById('videoLoaderOverlay');

  if (!modal || !modalVideo) return;

  let bufferTimer = null;
  function setBuffering(isBuffering) {
    if (!loader) return;
    if (isBuffering) {
      if (!bufferTimer) {
        bufferTimer = setTimeout(() => {
          loader.classList.remove('hidden');
        }, 300);
      }
    } else {
      if (bufferTimer) {
        clearTimeout(bufferTimer);
        bufferTimer = null;
      }
      loader.classList.add('hidden');
    }
  }

  // Video playback lifecycle listeners
  modalVideo.addEventListener('loadstart', () => setBuffering(false));
  modalVideo.addEventListener('waiting', () => setBuffering(true));
  modalVideo.addEventListener('seeking', () => setBuffering(false));
  modalVideo.addEventListener('seeked', () => setBuffering(false));
  modalVideo.addEventListener('canplay', () => setBuffering(false));
  modalVideo.addEventListener('loadeddata', () => setBuffering(false));
  modalVideo.addEventListener('playing', () => setBuffering(false));
  modalVideo.addEventListener('timeupdate', () => {
    if (modalVideo.currentTime > 0.05) setBuffering(false);
  });
  modalVideo.addEventListener('error', (e) => {
    console.warn("Video stream error:", e);
    setBuffering(false);
  });

  window.openVideoModal = function(src, title) {
    if (modalTitle) modalTitle.textContent = title || "Showcase Video";
    modal.classList.add('open');
    setBuffering(false);

    // Optimized playback initialization
    modalVideo.preload = "auto";
    modalVideo.src = src;
    modalVideo.load();

    const playPromise = modalVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setBuffering(false);
      }).catch((err) => {
        setBuffering(false);
      });
    }
  };

  function closeModal() {
    modal.classList.remove('open');
    setBuffering(false);
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute('src');
    modalVideo.load(); // Cleanly aborts active network transfer!
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
      if (e.code === 'Space' && e.target !== modalVideo) {
        e.preventDefault();
        if (modalVideo.paused) modalVideo.play();
        else modalVideo.pause();
      }
    }
  });
}


// FAQ Accordion
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other open FAQs
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });
}

// Dynamic Multi-Layered 3D Particle & Ambient Light Canvas
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isTabVisible = true;

  // Mouse cursor tracking with smooth interpolation
  let mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', () => {
    resize();
    initScene();
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    if (!mouse.active) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouse.active = false;
  });

  // Layer 1: Subtle Background Motes (Deep Layer, Slow & Soft)
  class BackgroundMote {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 15;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = -(0.1 + Math.random() * 0.25);
      this.radius = 0.6 + Math.random() * 0.9;
      this.alpha = 0.06 + Math.random() * 0.12;
      this.baseAlpha = this.alpha;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.phase += 0.012;
      this.x += this.vx + Math.sin(this.phase) * 0.15;
      this.y += this.vy;

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Layer 2: Floating Cyan/Blue Embers (Mid/Foreground, Vibrant & Interactive)
  class FloatingEmber {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -(0.25 + Math.random() * 0.45);
      this.radius = 1.2 + Math.random() * 1.8;
      this.alpha = 0.15 + Math.random() * 0.35;
      this.baseAlpha = this.alpha;
      this.pulseSpeed = 0.018 + Math.random() * 0.025;
      this.pulseAngle = Math.random() * Math.PI * 2;
      this.colorType = Math.random() > 0.4 ? 'blue' : 'cyan';
      this.pushVx = 0;
      this.pushVy = 0;
    }
    update() {
      this.pulseAngle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.12;

      // Cursor gentle repulsion field
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 135;
        if (dist < maxDist && dist > 0) {
          const force = (maxDist - dist) / maxDist;
          this.pushVx += (dx / dist) * force * 0.4;
          this.pushVy += (dy / dist) * force * 0.4;
        }
      }

      // Apply damping to velocity push
      this.pushVx *= 0.92;
      this.pushVy *= 0.92;

      this.x += this.vx + this.pushVx;
      this.y += this.vy + this.pushVy;

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      if (this.colorType === 'blue') {
        ctx.fillStyle = `rgba(0, 136, 255, ${Math.max(0.06, this.alpha)})`;
        ctx.shadowColor = 'rgba(0, 136, 255, 0.5)';
      } else {
        ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.06, this.alpha)})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.55)';
      }
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Layer 3: Soft Blue Ambient Glow Orbs (Slow drifting volumetric light)
  class AmbientGlowOrb {
    constructor(x, y, radius, alpha) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.alpha = alpha;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = 0.005 + Math.random() * 0.006;
    }
    update() {
      this.angle += this.speed;
      this.x = this.baseX + Math.cos(this.angle) * 60;
      this.y = this.baseY + Math.sin(this.angle) * 45;

      // Soft response to mouse position
      if (mouse.active) {
        const dx = (mouse.x - width / 2) * 0.04;
        const dy = (mouse.y - height / 2) * 0.04;
        this.x += dx;
        this.y += dy;
      }
    }
    draw() {
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      grad.addColorStop(0, `rgba(0, 136, 255, ${this.alpha})`);
      grad.addColorStop(0.5, `rgba(56, 189, 248, ${this.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(0, 136, 255, 0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  // Layer 4: Soft Light Streaks (gentle glowing diagonal lines)
  class LightStreak {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height * 0.8;
      this.length = 140 + Math.random() * 180;
      this.speed = 0.8 + Math.random() * 1.1;
      this.alpha = 0.035 + Math.random() * 0.055;
      this.angle = Math.PI / 4;
    }
    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      if (this.x > width + this.length || this.y > height + this.length) {
        this.x = Math.random() * width - 200;
        this.y = -60;
        this.alpha = 0.035 + Math.random() * 0.055;
      }
    }
    draw() {
      const endX = this.x + Math.cos(this.angle) * this.length;
      const endY = this.y + Math.sin(this.angle) * this.length;
      const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
      grad.addColorStop(0, 'rgba(0, 136, 255, 0)');
      grad.addColorStop(0.5, `rgba(56, 189, 248, ${this.alpha})`);
      grad.addColorStop(1, 'rgba(0, 136, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  let motes = [];
  let embers = [];
  let streaks = [];
  let glowOrbs = [];

  function initScene() {
    const moteCount = Math.min(42, Math.floor(width / 32));
    const emberCount = Math.min(32, Math.floor(width / 42));

    motes = [];
    for (let i = 0; i < moteCount; i++) {
      motes.push(new BackgroundMote());
    }

    embers = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push(new FloatingEmber());
    }

    streaks = [new LightStreak(), new LightStreak(), new LightStreak()];

    glowOrbs = [
      new AmbientGlowOrb(width * 0.25, height * 0.35, 220, 0.045),
      new AmbientGlowOrb(width * 0.75, height * 0.65, 260, 0.038)
    ];
  }

  initScene();

  let lastTime = performance.now();
  function render(time) {
    if (!isTabVisible) return;

    // Smooth frame timing cap (~60-70fps) to eliminate GPU strain
    const elapsed = time - lastTime;
    if (elapsed < 14) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }
    lastTime = time;

    // Smooth mouse position lerping
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Ambient Glow Orbs
    glowOrbs.forEach(orb => {
      orb.update();
      orb.draw();
    });

    // 2. Draw Diagonal Light Streaks
    streaks.forEach(streak => {
      streak.update();
      streak.draw();
    });

    // 3. Draw Background Motes
    motes.forEach(m => {
      m.update();
      m.draw();
    });

    // 4. Draw Connecting Filaments between nearby Embers
    for (let i = 0; i < embers.length; i++) {
      for (let j = i + 1; j < embers.length; j++) {
        const dx = embers[i].x - embers[j].x;
        const dy = embers[i].y - embers[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const alpha = (1 - dist / 90) * 0.14;
          ctx.beginPath();
          ctx.moveTo(embers[i].x, embers[i].y);
          ctx.lineTo(embers[j].x, embers[j].y);
          ctx.strokeStyle = `rgba(0, 136, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // 5. Draw Interactive Cursor Filaments
    if (mouse.active) {
      for (let i = 0; i < embers.length; i++) {
        const dx = embers[i].x - mouse.x;
        const dy = embers[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.22;
          ctx.beginPath();
          ctx.moveTo(embers[i].x, embers[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 6. Draw Foreground Glowing Embers
    embers.forEach(e => {
      e.update();
      e.draw();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);

  // Tab visibility management to save 100% CPU when tab is inactive
  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
    if (isTabVisible && !animationFrameId) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    } else if (!isTabVisible && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  });
}

// Tasteful 3D Card Tilt, Parallax & Magnetic Button Engine
function init3DMouseInteractions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // 1. Global Viewport Parallax Coordinates for Background & Floating Elements
  let rAFParallax = null;
  let mouseScreen = { x: 0, y: 0 };

  window.addEventListener('pointermove', (e) => {
    mouseScreen.x = ((e.clientX / window.innerWidth) - 0.5) * 2;
    mouseScreen.y = ((e.clientY / window.innerHeight) - 0.5) * 2;

    if (!rAFParallax) {
      rAFParallax = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-screen-x', mouseScreen.x.toFixed(3));
        document.documentElement.style.setProperty('--mouse-screen-y', mouseScreen.y.toFixed(3));
        rAFParallax = null;
      });
    }
  }, { passive: true });

  // 2. High-Performance 3D Card Tilt Engine
  const tiltableCards = document.querySelectorAll(
    '.card, .video-card, .client-card, .pricing-card, .metric-card, .why-card, .explorer-display-card'
  );

  tiltableCards.forEach(card => {
    let rect = null;
    let rAFTilt = null;

    card.addEventListener('pointerenter', () => {
      rect = card.getBoundingClientRect();
      card.style.willChange = 'transform, box-shadow';
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease';
    });

    card.addEventListener('pointermove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (rAFTilt) return;
      rAFTilt = requestAnimationFrame(() => {
        const normX = (x / rect.width - 0.5) * 2;
        const normY = (y / rect.height - 0.5) * 2;

        const maxTilt = card.classList.contains('client-card') ? 5 : 7;
        const rotX = (-normY * maxTilt).toFixed(2);
        const rotY = (normX * maxTilt).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px) translateY(-4px)`;
        rAFTilt = null;
      });
    });

    card.addEventListener('pointerleave', () => {
      if (rAFTilt) cancelAnimationFrame(rAFTilt);
      rAFTilt = null;
      rect = null;
      card.style.willChange = 'auto';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
    });
  });

  // 3. Subtle Magnetic Button Reaction
  const magneticButtons = document.querySelectorAll('.btn, .nav-pill-btn, .plan-cta-btn, .nav-pill-login');
  magneticButtons.forEach(btn => {
    let rect = null;

    btn.addEventListener('pointerenter', () => {
      rect = btn.getBoundingClientRect();
      btn.style.transition = 'transform 0.15s ease-out';
    });

    btn.addEventListener('pointermove', (e) => {
      if (!rect) rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.18;
      const deltaY = (e.clientY - centerY) * 0.18;

      btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
    });

    btn.addEventListener('pointerleave', () => {
      rect = null;
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

// Scroll-Triggered Staggered Reveal and Depth Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.card, .step-card, .video-card, .section-header, .img-reveal, .client-card, .metric-card, .why-card, .pricing-card'
  );

  // Immediately reveal elements that are already within initial viewport
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add('in-view', 'revealed');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view', 'revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// Toast Notice Helper
function showToast(msg) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0088FF" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${msg}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3400);
}

function handlePurchase(planId) {
  showToast(`Selected ${planId.toUpperCase()} Plan. Proceeding to instant checkout...`);
}

// ==========================================================================
// 3D ISOMETRIC BEACON ENGINE
// Direct recreation of Screen Recording (media_1788769334256.png)
// GPU-accelerated Canvas with 3D metallic tiles, dynamic real-time lighting,
// and smooth looping floating energy beacon orb in Splash Electric Blue.
// ==========================================================================
function initIsoBeaconCanvas() {
  const canvas = document.getElementById('isoBeaconCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rAF = null;
  let isVisible = true;

  // Grid configuration (6 rows x 6 cols)
  const rows = 6;
  const cols = 6;
  const tileW = 56;
  const tileH = 28;
  const tileThickness = 8;

  // Mouse tilt
  let mouseActive = false;
  let mouseX = 0;
  let mouseY = 0;
  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width || 800;
    height = rect.height || 240;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  canvas.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    targetTiltX = ((mouseX / width) - 0.5) * 14;
    targetTiltY = ((mouseY / height) - 0.5) * 14;
    mouseActive = true;
  }, { passive: true });

  canvas.addEventListener('pointerleave', () => {
    targetTiltX = 0;
    targetTiltY = 0;
    mouseActive = false;
  });

  const startTime = performance.now();

  function render(now) {
    if (!isVisible) {
      rAF = requestAnimationFrame(render);
      return;
    }

    const t = (now - startTime) * 0.0015;
    ctx.clearRect(0, 0, width, height);

    // Smooth tilt interpolation
    tiltX += (targetTiltX - tiltX) * 0.08;
    tiltY += (targetTiltY - tiltY) * 0.08;

    const centerX = width / 2 + tiltX * 1.5;
    const centerY = height / 2 - 10 + tiltY * 1.5;

    // Orb path (smooth figure-8 / Lissajous trajectory across the grid)
    let orbGx = (cols - 1) / 2 + Math.sin(t * 0.85) * 1.85 + Math.cos(t * 0.42) * 0.4;
    let orbGy = (rows - 1) / 2 + Math.cos(t * 0.65) * 1.85 + Math.sin(t * 0.38) * 0.4;

    if (mouseActive) {
      // Gentle attraction towards cursor
      const normMx = (mouseX - width / 2) / (tileW * 0.5);
      const normMy = (mouseY - height / 2) / (tileH * 0.5);
      const mouseGx = (normMy + normMx) * 0.5 + (cols - 1) / 2;
      const mouseGy = (normMy - normMx) * 0.5 + (rows - 1) / 2;
      if (mouseGx >= 0 && mouseGx < cols && mouseGy >= 0 && mouseGy < rows) {
        orbGx += (mouseGx - orbGx) * 0.08;
        orbGy += (mouseGy - orbGy) * 0.08;
      }
    }

    // Orb Screen Coordinates
    const orbIsoX = centerX + (orbGx - orbGy) * (tileW * 0.5);
    const orbHover = 18 + Math.sin(t * 2.8) * 3;
    const orbIsoY = centerY + (orbGx + orbGy) * (tileH * 0.5) - orbHover;

    // 1. Draw Tiles sorted from back to front (r + c order)
    for (let sum = 0; sum < rows + cols - 1; sum++) {
      for (let r = 0; r < rows; r++) {
        const c = sum - r;
        if (c < 0 || c >= cols) continue;

        // Tile base center
        const isoX = centerX + (c - r) * (tileW * 0.5);
        const isoY = centerY + (c + r) * (tileH * 0.5);

        // Distance from tile to glowing orb
        const dist = Math.hypot(c - orbGx, r - orbGy);
        const intensity = Math.max(0, 1 - dist / 2.7);
        const glow = Math.pow(intensity, 2.2);

        // Tile elevation ripple
        const wave = Math.sin(t * 1.8 + (c + r) * 0.45) * 2;
        const elev = wave + glow * 5.5;

        const curIsoY = isoY - elev;

        // Diamond vertices
        const topY = curIsoY - tileH * 0.5;
        const rightX = isoX + tileW * 0.5;
        const rightY = curIsoY;
        const botY = curIsoY + tileH * 0.5;
        const leftX = isoX - tileW * 0.5;
        const leftY = curIsoY;

        // Left 3D Extrusion
        ctx.beginPath();
        ctx.moveTo(leftX, leftY);
        ctx.lineTo(isoX, botY);
        ctx.lineTo(isoX, botY + tileThickness);
        ctx.lineTo(leftX, leftY + tileThickness);
        ctx.closePath();
        const leftR = Math.floor(6 + glow * 10);
        const leftG = Math.floor(10 + glow * 40);
        const leftB = Math.floor(18 + glow * 80);
        ctx.fillStyle = `rgb(${leftR}, ${leftG}, ${leftB})`;
        ctx.fill();

        // Right 3D Extrusion
        ctx.beginPath();
        ctx.moveTo(isoX, botY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(rightX, rightY + tileThickness);
        ctx.lineTo(isoX, botY + tileThickness);
        ctx.closePath();
        const rightR = Math.floor(8 + glow * 15);
        const rightG = Math.floor(14 + glow * 60);
        const rightB = Math.floor(24 + glow * 110);
        ctx.fillStyle = `rgb(${rightR}, ${rightG}, ${rightB})`;
        ctx.fill();

        // Top Diamond Face
        ctx.beginPath();
        ctx.moveTo(isoX, topY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(isoX, botY);
        ctx.lineTo(leftX, leftY);
        ctx.closePath();

        // Dynamic gradient fill for top face
        const topR = Math.floor(11 + glow * 10);
        const topG = Math.floor(18 + glow * 110);
        const topB = Math.floor(30 + glow * 215);
        ctx.fillStyle = `rgb(${topR}, ${topG}, ${topB})`;
        ctx.fill();

        // Neon border with electric glow
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 + glow * 0.85})`;
        ctx.lineWidth = 1 + glow * 0.8;
        ctx.stroke();
      }
    }

    // 2. Floor Radial Reflection Glow (Under the orb)
    const floorGrad = ctx.createRadialGradient(orbIsoX, orbIsoY + 14, 0, orbIsoX, orbIsoY + 14, 95);
    floorGrad.addColorStop(0, 'rgba(0, 136, 255, 0.45)');
    floorGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.18)');
    floorGrad.addColorStop(1, 'rgba(0, 136, 255, 0)');
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY + 14, 95, 0, Math.PI * 2);
    ctx.fill();

    // 3. Floating Beacon Glowing Orb (Lens Flare & Core)
    const bloomGrad = ctx.createRadialGradient(orbIsoX, orbIsoY, 0, orbIsoX, orbIsoY, 36);
    bloomGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    bloomGrad.addColorStop(0.2, 'rgba(56, 189, 248, 0.85)');
    bloomGrad.addColorStop(0.55, 'rgba(0, 136, 255, 0.4)');
    bloomGrad.addColorStop(1, 'rgba(0, 136, 255, 0)');
    ctx.fillStyle = bloomGrad;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY, 36, 0, Math.PI * 2);
    ctx.fill();

    // Sphere Solid Core with Specular Highlight
    const coreGrad = ctx.createRadialGradient(orbIsoX - 2, orbIsoY - 2.5, 0.8, orbIsoX, orbIsoY, 8);
    coreGrad.addColorStop(0, '#FFFFFF');
    coreGrad.addColorStop(0.35, '#38BDF8');
    coreGrad.addColorStop(0.85, '#0088FF');
    coreGrad.addColorStop(1, '#0055AA');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Subtle outer halo ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY, 8.5, 0, Math.PI * 2);
    ctx.stroke();

    rAF = requestAnimationFrame(render);
  }

  rAF = requestAnimationFrame(render);

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.08 });
  observer.observe(canvas);
}

// ==========================================================================
// SMOOTH 3D PARALLAX SCROLL DEPTH ENGINE
// GPU-friendly translate3d / scale / perspective across all cards & images
// Zero layout recalculations, smooth 60+ FPS on all devices
// ==========================================================================
function init3DScrollParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll(
    '.card, .video-card, .client-card, .why-card, .pricing-card, .metric-card, .hero-preview-frame'
  );

  const heroPreview = document.querySelector('.hero-preview-frame');
  const bgMesh = document.querySelector('.bg-mesh');
  const bgGrid = document.querySelector('.bg-grid');

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    // Multi-layer background depth
    if (bgMesh) {
      bgMesh.style.transform = `translate3d(calc(var(--mouse-screen-x, 0) * 16px), calc(${scrollY * 0.08}px + var(--mouse-screen-y, 0) * 16px), 0)`;
    }
    if (bgGrid) {
      bgGrid.style.transform = `translate3d(calc(var(--mouse-screen-x, 0) * -10px), calc(${scrollY * 0.04}px + var(--mouse-screen-y, 0) * -10px), 0)`;
    }

    // Hero preview mockup depth
    if (heroPreview) {
      const heroY = Math.min(50, scrollY * 0.07);
      const heroScale = Math.max(0.97, 1 - scrollY * 0.00007);
      heroPreview.style.transform = `translate3d(calc(var(--mouse-screen-x, 0) * -6px), calc(${heroY.toFixed(1)}px + var(--mouse-screen-y, 0) * -6px), 0) scale(${heroScale.toFixed(4)})`;
    }

    // Card subtle 3D parallax
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom >= -60 && rect.top <= windowH + 60) {
        const center = (rect.top + rect.height * 0.5) - windowH * 0.5;
        const progress = center / windowH; // -0.5 to 0.5
        const py = (-progress * 12).toFixed(1);
        const rx = (progress * 2.2).toFixed(2);
        const scale = (1 - Math.abs(progress) * 0.012).toFixed(3);

        card.style.setProperty('--parallax-y', py);
        card.style.setProperty('--parallax-rx', rx);
        card.style.setProperty('--parallax-scale', scale);
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

