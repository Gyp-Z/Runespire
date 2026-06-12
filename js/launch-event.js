/* ============================================================
   RUNESPIRE — launch-event.js
   Hardcore SMP countdown + launch-day ambiance.

   Counts down to Saturday June 14, 2026 12:00 PM EST. At zero
   (or on any visit after launch) the site enters "launched"
   mode: live banner, warmer palette (body.launched), fire/ember
   overlay, upgraded ambient particles — plus a one-time rune
   flash if the countdown crosses zero while the page is open.
   ============================================================ */

(function hardcoreLaunchSystem() {
  var LAUNCH_TS     = new Date('2026-06-14T12:00:00-04:00').getTime();
  var PROGRESS_FROM = new Date('2026-06-01T00:00:00-04:00').getTime();
  var STORAGE_KEY   = 'runespire_launched';

  var cd = {
    wrap:     document.getElementById('countdown'),
    days:     document.getElementById('cdDays'),
    hours:    document.getElementById('cdHours'),
    minutes:  document.getElementById('cdMinutes'),
    seconds:  document.getElementById('cdSeconds'),
    live:     document.getElementById('countdownLive'),
    progress: document.getElementById('hardcoreProgress'),
  };

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var launched = false;
  var timerId  = null;

  function hasStoredLaunch() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }

  function storeLaunch() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* private mode etc. */ }
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  /* ── Countdown ─────────────────────────────────────────────── */

  function updateProgress(now) {
    if (!cd.progress) return;
    var pct = (now - PROGRESS_FROM) / (LAUNCH_TS - PROGRESS_FROM);
    pct = Math.min(Math.max(pct, 0), 1);
    cd.progress.style.width = (pct * 100).toFixed(2) + '%';
  }

  function tick() {
    var now  = Date.now();
    var diff = LAUNCH_TS - now;

    updateProgress(now);

    if (diff <= 0) {
      activate(true); // crossed zero while the page was open — full ceremony
      return;
    }

    if (cd.days)    cd.days.textContent    = pad(Math.floor(diff / 86400000));
    if (cd.hours)   cd.hours.textContent   = pad(Math.floor(diff / 3600000) % 24);
    if (cd.minutes) cd.minutes.textContent = pad(Math.floor(diff / 60000) % 60);
    if (cd.seconds) cd.seconds.textContent = pad(Math.floor(diff / 1000) % 60);
  }

  /* ── Activation ────────────────────────────────────────────── */

  function activate(withRuneFlash) {
    if (launched) return;
    launched = true;
    if (timerId) clearInterval(timerId);

    if (cd.wrap)     cd.wrap.hidden = true;
    if (cd.live)     cd.live.hidden = false;
    if (cd.progress) cd.progress.style.width = '100%';

    document.body.classList.add('launched');
    storeLaunch();

    // Mix fire tones into the ambient particle field (hook lives in main.js)
    if (typeof window.launchParticleUpgrade === 'function') {
      window.launchParticleUpgrade();
    }

    if (!reducedMotion) {
      startFireParticles();
      if (withRuneFlash) runeFlash();
    }
  }

  /* ── One-time rune flash ───────────────────────────────────── */

  function runeFlash() {
    var runes = ['✦', 'ᛟ', 'ᚱ', 'ᚹ', '✦'];
    runes.forEach(function (symbol, i) {
      var el = document.createElement('div');
      el.className = 'rune-flash';
      el.textContent = symbol;
      el.style.left = (8 + Math.random() * 80) + 'vw';
      el.style.top = (12 + Math.random() * 62) + 'vh';
      el.style.fontSize = (3 + Math.random() * 2) + 'rem';
      el.style.animationDelay = (i * 0.18) + 's';
      document.body.appendChild(el);
      setTimeout(function () { el.remove(); }, 2400 + i * 180);
    });
  }

  /* ── Fire + ember overlay ──────────────────────────────────── */

  function startFireParticles() {
    var canvas = document.getElementById('fire-particles');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var W, H, particles;
    var FIRE_COUNT   = 90;
    var EMBER_COUNT  = 30; // 120 total
    var FIRE_COLORS  = ['rgba(255,80,0,', 'rgba(255,160,0,', 'rgba(220,38,38,'];
    var EMBER_COLORS = ['rgba(255,200,120,', 'rgba(255,235,190,'];
    var startedAt    = Date.now();

    function rand(a, b) { return a + Math.random() * (b - a); }
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    // anywhere=true scatters the initial field; otherwise spawn below screen
    function spawn(isEmber, anywhere) {
      return {
        ember:     isEmber,
        x:         rand(0, W),
        y:         anywhere ? rand(0, H) : H + rand(5, 60),
        r:         isEmber ? rand(0.5, 1.5) : rand(1.5, 4),
        vx:        rand(-0.35, 0.35),
        vy:        isEmber ? -rand(1.4, 2.6) : -rand(0.5, 1.3),
        baseAlpha: isEmber ? rand(0.5, 0.9) : rand(0.25, 0.65),
        flicker:   rand(0.2, 0.8),
        color:     pick(isEmber ? EMBER_COLORS : FIRE_COLORS),
        life:      0,
        // embers wink out fast; fire lives ~3s of travel at 60fps
        maxLife:   isEmber ? rand(50, 110) : rand(150, 230),
      };
    }

    function build() {
      particles = [];
      var i;
      for (i = 0; i < FIRE_COUNT; i++)  particles.push(spawn(false, true));
      for (i = 0; i < EMBER_COUNT; i++) particles.push(spawn(true, true));
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);

      // intensity ramps 0 → 1 over the first 3 seconds
      var ramp = Math.min((Date.now() - startedAt) / 3000, 1);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = spawn(p.ember, false);
          continue;
        }

        var fade      = 1 - p.life / p.maxLife;
        var flickered = p.baseAlpha + Math.sin(p.life * p.flicker) * 0.15;
        var alpha     = Math.max(flickered, 0.05) * fade * ramp;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha.toFixed(3) + ')';
        ctx.fill();
      }

      requestAnimationFrame(loop);
    }

    resize();
    build();
    loop();
    window.addEventListener('resize', resize);
  }

  /* ── Boot ──────────────────────────────────────────────────── */

  if (Date.now() >= LAUNCH_TS || hasStoredLaunch()) {
    // Already launched: ambient effects only — the rune flash is
    // reserved for the moment the countdown crosses zero live.
    activate(false);
  } else {
    tick();
    timerId = setInterval(tick, 1000);
  }
})();
