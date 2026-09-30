// Hero motion: Orbit pods/Kubernetes icons circle the database, and stars drift away from the pointer.
(function () {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visible = true;

  // --- Orbit
  var svg = hero.querySelector('[data-orbit]');
  var orbiters = [];
  if (svg) {
    var cx = parseFloat(svg.dataset.cx), cy = parseFloat(svg.dataset.cy);
    svg.querySelectorAll('[data-orbiter]').forEach(function (el) {
      orbiters.push({
        el: el,
        rx: parseFloat(el.dataset.rx),
        ry: parseFloat(el.dataset.ry),
        angle: parseFloat(el.dataset.angle) * Math.PI / 180,
        speed: (2 * Math.PI) / parseFloat(el.dataset.period)
      });
    });
  }
  function placeOrbiters(t) {
    for (var i = 0; i < orbiters.length; i++) {
      var o = orbiters[i];
      var a = o.angle + o.speed * t;
      var x = cx + o.rx * Math.cos(a), y = cy + o.ry * Math.sin(a);
      var s = 0.82 + 0.22 * Math.sin(a);
      o.el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(12) scale(' + s.toFixed(3) + ')');
    }
  }

  // --- Stars
  var canvas = hero.querySelector('[data-stars]');
  var ctx = canvas && canvas.getContext('2d');
  var stars = [];
  var pointer = { x: -9999, y: -9999 };
  var colors = ['#F5F5F0', '#F5F5F0', '#F5F5F0', '#C3DCDD', '#12DDB6', '#8B6CFF', '#FFC857', '#FF6B4A'];
  var width = 0, height = 0, dpr = 1;

  function resize() {
    var rect = hero.getBoundingClientRect();
    var sameWidth = Math.abs(rect.width - width) < 1;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Mobile address bars change only the height while scrolling; keep the same stars then.
    if (sameWidth && stars.length) return;
    var count = Math.round(Math.min(220, (width * height) / 5200));
    stars = [];
    for (var i = 0; i < count; i++) {
      var x = Math.random() * width, y = Math.random() * height;
      stars.push({
        hx: x, hy: y, x: x, y: y, vx: 0, vy: 0,
        r: Math.random() < 0.1 ? 1.6 + Math.random() * 1.2 : 0.5 + Math.random() * 1.1,
        c: colors[(Math.random() * colors.length) | 0],
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  var RADIUS = 140, PUSH = 1.4, SPRING = 0.02, DAMPING = 0.9;
  function drawStars(t, animate) {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (animate) {
        var dx = s.x - pointer.x, dy = s.y - pointer.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < RADIUS * RADIUS && d2 > 0.01) {
          var d = Math.sqrt(d2), f = (1 - d / RADIUS) * PUSH;
          s.vx += (dx / d) * f;
          s.vy += (dy / d) * f;
        }
        s.vx = (s.vx + (s.hx - s.x) * SPRING) * DAMPING;
        s.vy = (s.vy + (s.hy - s.y) * SPRING) * DAMPING;
        s.x += s.vx;
        s.y += s.vy;
      }
      ctx.globalAlpha = animate ? 0.55 + 0.45 * Math.sin(t * 1.5 + s.tw) : 0.8;
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  if (ctx) {
    resize();
    window.addEventListener('resize', function () { resize(); if (reduced) drawStars(0, false); });
    hero.addEventListener('pointermove', function (e) {
      var rect = hero.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    });
    hero.addEventListener('pointerleave', function () { pointer.x = pointer.y = -9999; });
  }

  if (reduced) {
    if (ctx) drawStars(0, false);
    return;
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(hero);
  }
  var start = performance.now();
  function frame(now) {
    if (visible && !document.hidden) {
      var t = (now - start) / 1000;
      placeOrbiters(t);
      if (ctx) drawStars(t, true);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
