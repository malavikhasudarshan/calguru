/**
 * CalGuru entrance — animation logic
 * Phases: CAL drop → GURU drop → rearrange to "CAL GURU" → show nav hint
 * Uses requestAnimationFrame for physics; CSS transition for rearrangement.
 */

(function () {
  'use strict';

  const GRAVITY = 3.8;
  const BOUNCE = 0.45;
  const SETTLED_THRESHOLD = 1.5;
  const STAGGER_START_MS = 35; // start next letter this long after previous — they overlap in the air
  const REARRANGE_DURATION_MS = 850;

  const container = document.getElementById('letters-container');
  const wrappers = Array.from(container.querySelectorAll('.letter-wrapper'));
  const navHint = document.getElementById('nav-hint');

  if (!container || !wrappers.length || !navHint) return;

  // Set letter content from data-letter (single source of truth); hide wrapper until drop
  wrappers.forEach((wrap) => {
    const letter = wrap.querySelector('.letter');
    if (letter) letter.textContent = letter.getAttribute('data-letter') || '';
    wrap.style.visibility = 'hidden';
  });

  // Letter state: position, velocity, rotation (they can land at any angle)
  const state = wrappers.map((el, i) => ({
    el,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    angularVelocity: 0,
    targetY: 0,
    targetX: 0,
    landed: false,
    index: i,
  }));

  /**
   * Scattered landing positions so letters overlap and fill the screen (viewport 0–1).
   */
  function getScatteredTargets() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const positions = [
      { x: 0.2, y: 0.5 },
      { x: 0.45, y: 0.6 },
      { x: 0.35, y: 0.75 },
      { x: 0.55, y: 0.45 },
      { x: 0.75, y: 0.55 },
      { x: 0.65, y: 0.7 },
      { x: 0.5, y: 0.65 },
    ];
    return positions.map(({ x, y }) => ({
      targetX: x * vw,
      targetY: y * vh,
    }));
  }

  const scatteredTargets = getScatteredTargets();

  /**
   * Start dropping a single letter; it tumbles in the air and can land at any angle.
   */
  function dropLetter(s, resolve) {
    const rect = s.el.getBoundingClientRect();
    const letterHeight = rect.height;
    const { targetX, targetY } = scatteredTargets[s.index];

    s.targetX = targetX;
    s.targetY = targetY;
    s.x = targetX + (Math.random() - 0.5) * 150;
    s.y = -letterHeight - Math.random() * 100;
    s.vy = 0;
    s.vx = (Math.random() - 0.5) * 2;
    s.angle = Math.random() * 360;
    s.angularVelocity = (Math.random() - 0.5) * 12;
    s.landed = false;

    s.el.style.transition = 'none';
    s.el.style.visibility = 'visible';
    applyTransform(s);

    function step() {
      s.vy += GRAVITY;
      s.y += s.vy;
      s.x += s.vx;
      s.angle += s.angularVelocity;
      s.angularVelocity *= 0.998; // slight drag

      if (s.y >= s.targetY) {
        s.y = s.targetY;
        s.vy = -s.vy * BOUNCE;
        s.vx *= 0.7;
        s.angularVelocity += (Math.random() - 0.5) * 8; // extra spin on impact
        if (Math.abs(s.vy) < SETTLED_THRESHOLD) {
          s.vy = 0;
          s.landed = true;
        }
      }

      applyTransform(s);

      if (!s.landed) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  }

  function applyTransform(s) {
    s.el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.angle}deg)`;
  }

  /**
   * Start all letters dropping with a short stagger; don't wait for each to land.
   * Returns a Promise that resolves when every letter has landed.
   */
  function runAllDrops() {
    const promises = wrappers.map((_, i) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          dropLetter(state[i], resolve);
        }, i * STAGGER_START_MS);
      });
    });
    return Promise.all(promises);
  }

  /**
   * Build a hidden row with same letter size as .letter to get final positions
   * for "CAL GURU" centered. Returns positions and row width for fit-scale.
   */
  function getFinalPositions() {
    const firstLetter = wrappers[0]?.querySelector('.letter');
    const computed = firstLetter ? getComputedStyle(firstLetter) : null;
    const fontSize = computed?.fontSize || 'clamp(18rem, 72vw, 100vmin)';
    const lineHeight = computed?.lineHeight || '0.82';
    const fontFamily = computed?.fontFamily || 'Bebas Neue, sans-serif';

    const wrap = document.createElement('div');
    wrap.style.cssText = [
      'position:fixed',
      'top:0', 'left:0', 'right:0', 'bottom:0',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'pointer-events:none',
      'visibility:hidden',
    ].join(';');

    const row = document.createElement('div');
    row.style.cssText = [
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'flex-wrap:wrap',
      'gap:0.02em',
      'font-family:' + fontFamily,
      'font-size:' + fontSize,
      'line-height:' + lineHeight,
    ].join(';');

    const chars = ['C', 'A', 'L', 'G', 'U', 'R', 'U'];
    const spans = chars.map((ch) => {
      const s = document.createElement('span');
      s.textContent = ch;
      row.appendChild(s);
      return s;
    });

    spans[2].style.marginRight = '0.12em'; // gap between CAL and GURU
    wrap.appendChild(row);
    document.body.appendChild(wrap);

    const containerRect = container.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const positions = spans.map((span) => {
      const r = span.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + (r.width / 2),
        y: r.top - containerRect.top + (r.height / 2),
      };
    });

    document.body.removeChild(wrap);
    return { positions, rowWidth: rowRect.width };
  }

  /**
   * Animate to centered "CAL GURU" at same size; scale to fit viewport if needed.
   */
  function rearrange() {
    const { positions, rowWidth } = getFinalPositions();
    const containerRect = container.getBoundingClientRect();
    const vw = window.innerWidth;
    const fitScale = rowWidth > vw ? Math.min(1, (vw * 0.92) / rowWidth) : 1;
    container.style.setProperty('--fit-scale', String(fitScale));

    wrappers.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const centerX = r.left - containerRect.left + r.width / 2;
      const centerY = r.top - containerRect.top + r.height / 2;
      const target = positions[i];
      const dx = target.x - centerX;
      const dy = target.y - centerY;
      const finalX = state[i].x + dx;
      const finalY = state[i].y + dy;

      el.style.transition = `transform ${REARRANGE_DURATION_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
      el.style.transform = `translate(${finalX}px, ${finalY}px) rotate(0deg)`;
      state[i].x = finalX;
      state[i].y = finalY;
      state[i].angle = 0;
    });

    setTimeout(() => {
      container.classList.add('is-centered');
      wrappers.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
      });
      navHint.classList.add('is-visible');
    }, REARRANGE_DURATION_MS);
  }

  /**
   * Run full sequence: all letters drop (overlapping), then rearrange → nav hint.
   */
  async function run() {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await runAllDrops();
    rearrange();
  }

  run();
})();
