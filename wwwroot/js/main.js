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
  initNavbar();
  initPricing();
  initExplorer();
  initVideoShowcase();
  initVideoModal();
  initFaq();
  initBackgroundCanvas();
  init3DMouseInteractions();
  initScrollAnimations();
});

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

// Video Lightbox Modal
function initVideoModal() {
  const modal = document.querySelector('.video-modal-backdrop');
  const modalVideo = document.querySelector('#modalVideo');
  const modalTitle = document.querySelector('.modal-title');
  const closeBtn = document.querySelector('.modal-close-btn');
  const loader = document.getElementById('videoLoaderOverlay');

  if (!modal || !modalVideo) return;

  function setBuffering(isBuffering) {
    if (loader) {
      if (isBuffering) loader.classList.remove('hidden');
      else loader.classList.add('hidden');
    }
  }

  // Video playback lifecycle listeners
  modalVideo.addEventListener('loadstart', () => setBuffering(true));
  modalVideo.addEventListener('waiting', () => setBuffering(true));
  modalVideo.addEventListener('seeking', () => setBuffering(true));
  modalVideo.addEventListener('seeked', () => setBuffering(false));
  modalVideo.addEventListener('canplay', () => setBuffering(false));
  modalVideo.addEventListener('playing', () => setBuffering(false));
  modalVideo.addEventListener('error', (e) => {
    console.error("Video loading error:", e);
    setBuffering(false);
  });

  window.openVideoModal = function(src, title) {
    if (modalTitle) modalTitle.textContent = title || "Showcase Video";
    setBuffering(true);
    modal.classList.add('open');
    modalVideo.preload = "auto";
    modalVideo.src = src;
    modalVideo.load();

    // Start playback
    const playPromise = modalVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setBuffering(false);
      }).catch((err) => {
        console.warn("Autoplay policy prevented audio/video or paused:", err);
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
    modalVideo.load();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
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
