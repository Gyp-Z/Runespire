/* ============================================================
   RUNESPIRE — main.js
   Handles: particles, nav scroll, IP copy (hero + about), form
   ============================================================ */

/* ── Particles ─────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;

  const PARTICLE_COUNT = 80;
  const COLORS = ['rgba(201,168,76,', 'rgba(107,33,168,', 'rgba(200,190,220,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x:           randomBetween(0, W),
      y:           randomBetween(0, H),
      r:           randomBetween(0.4, 1.8),
      alpha:       randomBetween(0.1, 0.55),
      dx:          randomBetween(-0.15, 0.15),
      dy:          randomBetween(-0.25, -0.05),
      color,
      twinkleSpeed: randomBetween(0.003, 0.012),
      twinkleDir:   Math.random() > 0.5 ? 1 : -1,
    };
  }

  function buildParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();
  }

  function updateParticle(p) {
    p.x += p.dx;
    p.y += p.dy;

    p.alpha += p.twinkleSpeed * p.twinkleDir;
    if (p.alpha >= 0.55 || p.alpha <= 0.05) p.twinkleDir *= -1;

    if (p.y < -5)    p.y = H + 5;
    if (p.x < -5)    p.x = W + 5;
    if (p.x > W + 5) p.x = -5;
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      updateParticle(p);
      drawParticle(p);
    }
    requestAnimationFrame(loop);
  }

  resize();
  buildParticles();
  loop();

  window.addEventListener('resize', () => {
    resize();
    buildParticles();
  });
})();


/* ── Nav: scroll glass + active link highlight ─────────────── */
(function initNav() {
  const nav    = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!nav) return;

  // Glass effect on scroll
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on nav link click (mobile)
    links.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section highlight via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => observer.observe(s));
})();


/* ── Copy Server IP (hero + about badges) ──────────────────── */
(function initIPCopy() {
  const SERVER_IP = 'play.runespire.net';

  function attachBadge(badgeId, hintId) {
    const badge = document.getElementById(badgeId);
    const hint  = document.getElementById(hintId);
    if (!badge || !hint) return;

    function doCopy() {
      navigator.clipboard.writeText(SERVER_IP).then(() => {
        hint.textContent    = 'Copied!';
        badge.style.borderColor = 'rgba(201, 168, 76, 0.7)';
        badge.style.background  = 'rgba(201, 168, 76, 0.1)';
        setTimeout(() => {
          hint.textContent        = 'Click to copy';
          badge.style.borderColor = '';
          badge.style.background  = '';
        }, 2000);
      }).catch(() => {
        hint.textContent = SERVER_IP;
        setTimeout(() => { hint.textContent = 'Click to copy'; }, 2500);
      });
    }

    badge.addEventListener('click', doCopy);
    badge.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doCopy(); }
    });
  }

  attachBadge('ipBadge',      'copyHint');
  attachBadge('ipBadgeAbout', 'copyHintAbout');
})();


/* ── Launch callout → scroll to Hardcore SMP card ──────────── */
(function initLaunchCallout() {
  const callout = document.getElementById('launchCallout');
  const card    = document.getElementById('hardcore-smp');
  if (!callout || !card) return;

  callout.addEventListener('click', (e) => {
    e.preventDefault();
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Restart the highlight animation if it's already running
    card.classList.remove('about-card--highlight');
    void card.offsetWidth;
    card.classList.add('about-card--highlight');
    card.addEventListener('animationend', () => {
      card.classList.remove('about-card--highlight');
    }, { once: true });
  });
})();


/* ── Showcase: cavern walls part as the banner scrolls in ──── */
(function initCavernReveal() {
  const showcase = document.getElementById('showcase');
  if (!showcase) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showcase.style.setProperty('--open', '1');
    return;
  }

  let ticking = false;

  function update() {
    ticking = false;
    const rect = showcase.getBoundingClientRect();
    const vh   = window.innerHeight;

    // Stays closed until the section top has risen to 85% of the
    // viewport, then opens gradually until the top reaches 10% —
    // so the whole reveal plays out while the banner is on screen.
    const raw    = (vh * 0.85 - rect.top) / (vh * 0.75);
    const linear = Math.min(Math.max(raw, 0), 1);
    const eased  = linear * linear * (3 - 2 * linear); // smoothstep: gentle in and out

    showcase.style.setProperty('--open', eased.toFixed(4));
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();


/* ── Email Signup Form ─────────────────────────────────────── */
(function initSignupForm() {
  const form    = document.getElementById('signupForm');
  const success = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn    = form.querySelector('button[type="submit"]');
    const action = form.getAttribute('action');

    // Dev fallback — Formspree ID not yet set
    if (action.includes('YOUR_FORM_ID')) {
      showSuccess(btn);
      return;
    }

    btn.textContent = '...';
    btn.disabled = true;

    try {
      const res = await fetch(action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        showSuccess(btn);
      } else {
        btn.textContent = 'Try Again';
        btn.disabled    = false;
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled    = false;
    }
  });

  function showSuccess(btn) {
    form.querySelectorAll('.form-row').forEach((r) => { r.style.display = 'none'; });
    const note = form.querySelector('.form-note');
    if (note) note.style.display = 'none';
    if (btn)  btn.style.display  = 'none';
    success.style.display = 'block';
  }
})();
