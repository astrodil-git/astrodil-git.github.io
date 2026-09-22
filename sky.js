/* Background: a starfield at the top of the page that resolves into a price
   chart as you scroll. Purely decorative — it sits behind everything, ignores
   pointer events, and is skipped entirely for reduced-motion. */

(function () {
  const canvas = document.getElementById("sky");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const STAR_COUNT = 190;
  let w = 0, h = 0, dpr = 1;
  let stars = [], nebulae = [], series = [];
  let progress = 0, drawn = -1;

  /* a deterministic generator, so the sky and the chart are the same on
     every load and don't reshuffle when the window resizes */
  function rng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function build() {
    const r = rng(20260921);

    // the price series the stars eventually settle onto
    const POINTS = 120;
    series = [];
    let v = 0.5;
    for (let i = 0; i < POINTS; i++) {
      v += (r() - 0.48) * 0.06;
      v = Math.max(0.12, Math.min(0.88, v));
      series.push(v);
    }

    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const t = i / STAR_COUNT;
      const idx = Math.floor(t * (POINTS - 1));
      stars.push({
        sx: r(),                       // star position, 0..1
        sy: r(),
        cx: t,                         // its seat on the chart line
        cy: 1 - series[idx],
        r: 0.4 + r() * 1.5,
        tw: r() * Math.PI * 2,         // twinkle phase
        tws: 0.6 + r() * 1.4,
      });
    }

    nebulae = [
      { x: 0.18, y: 0.22, r: 0.42, c: [110, 70, 200] },
      { x: 0.82, y: 0.14, r: 0.36, c: [40, 120, 190] },
      { x: 0.62, y: 0.58, r: 0.30, c: [150, 60, 130] },
    ];
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawn = -1;
  }

  function scrollProgress() {
    const max = document.body.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    // fully resolved into the chart by ~60% of the page
    return Math.max(0, Math.min(1, (window.scrollY / max) / 0.6));
  }

  const easeInOut = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  function draw(time) {
    const p = easeInOut(progress);

    ctx.clearRect(0, 0, w, h);

    // galaxies fade out as the chart takes over
    if (p < 0.95) {
      const fade = 1 - p;
      nebulae.forEach(n => {
        const g = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, n.r * Math.max(w, h));
        g.addColorStop(0, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.16 * fade})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    }

    // chart furniture arrives with the chart
    if (p > 0.02) {
      ctx.strokeStyle = `rgba(127,209,255,${0.07 * p})`;
      ctx.lineWidth = 1;
      for (let i = 1; i < 5; i++) {
        const y = (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // the line the stars are settling onto
    if (p > 0.05) {
      ctx.beginPath();
      stars.forEach((s, i) => {
        const x = s.cx * w, y = s.cy * h;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = `rgba(127,209,255,${0.22 * p})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // stars → data points
    const t = time * 0.001;
    stars.forEach(s => {
      const x = (s.sx + (s.cx - s.sx) * p) * w;
      const y = (s.sy + (s.cy - s.sy) * p) * h;
      const twinkle = reduced ? 1 : 0.55 + 0.45 * Math.sin(t * s.tws + s.tw);
      const alpha = (0.18 + 0.55 * twinkle) * (1 - p * 0.45);
      ctx.beginPath();
      ctx.arc(x, y, s.r * (1 - p * 0.25), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p > 0.5 ? "170,215,255" : "255,255,255"},${alpha})`;
      ctx.fill();
    });
  }

  let raf = null;
  function loop(time) {
    draw(time);
    raf = requestAnimationFrame(loop);
  }

  function onScroll() {
    progress = scrollProgress();
    if (reduced && Math.abs(progress - drawn) > 0.002) {
      drawn = progress;
      draw(0);
    }
  }

  build();
  resize();
  onScroll();

  if (reduced) {
    draw(0);                                  // static sky, no animation loop
  } else {
    raf = requestAnimationFrame(loop);
    // stop burning frames when the tab isn't visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        raf = requestAnimationFrame(loop);
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => { resize(); onScroll(); if (reduced) draw(0); }, 150);
  });
})();
