/* ============================================================
   RUNESPIRE — main.js
   Handles: particle canvas, IP copy, email form
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
      x:     randomBetween(0, W),
      y:     randomBetween(0, H),
      r:     randomBetween(0.4, 1.8),
      alpha: randomBetween(0.1, 0.55),
      dx:    randomBetween(-0.15, 0.15),
      dy:    randomBetween(-0.25, -0.05),
      color,
      // twinkle
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

    // Twinkle
    p.alpha += p.twinkleSpeed * p.twinkleDir;
    if (p.alpha >= 0.55 || p.alpha <= 0.05) p.twinkleDir *= -1;

    // Wrap
    if (p.y < -5) p.y = H + 5;
    if (p.x < -5) p.x = W + 5;
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


/* ── Copy Server IP ────────────────────────────────────────── */
(function initIPCopy() {
  const badge    = document.getElementById('ipBadge');
  const hint     = document.getElementById('copyHint');
  const SERVER_IP = '66.45.235.138';

  if (!badge) return;

  function doCopy() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
      hint.textContent = 'Copied!';
      badge.style.borderColor = 'rgba(201, 168, 76, 0.7)';
      badge.style.background  = 'rgba(201, 168, 76, 0.1)';
      setTimeout(() => {
        hint.textContent = 'Click to copy';
        badge.style.borderColor = '';
        badge.style.background  = '';
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      hint.textContent = SERVER_IP;
      setTimeout(() => { hint.textContent = 'Click to copy'; }, 2500);
    });
  }

  badge.addEventListener('click', doCopy);
  badge.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') doCopy();
  });
})();


/* ── Email Signup Form ─────────────────────────────────────── */
(function initSignupForm() {
  const form    = document.getElementById('signupForm');
  const success = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn   = form.querySelector('button[type="submit"]');
    const input = form.querySelector('input[type="email"]');

    // Check if Formspree ID is still placeholder
    const action = form.getAttribute('action');
    if (action.includes('YOUR_FORM_ID')) {
      // Dev mode: simulate success
      showSuccess(btn, input);
      return;
    }

    btn.textContent = '...';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res  = await fetch(action, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        showSuccess(btn, input);
      } else {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  });

  function showSuccess(btn, input) {
    form.querySelector('.form-row').style.display = 'none';
    form.querySelector('.form-note').style.display = 'none';
    success.classList.add('visible');
  }
})();
