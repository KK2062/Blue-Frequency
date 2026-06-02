// Blue Frequency — Main App
// Handles canvas animation, region switching, and metric rendering.

const canvas = document.getElementById('ocean');
const ctx = canvas.getContext('2d');

let currentRegion = REGIONS.pacific;
let animationFrame;
let t = 0;

// ─── Canvas sizing ───────────────────────────────────────────
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}

// ─── Color helpers ───────────────────────────────────────────

// Blend the region's base color toward gray based on health degradation
function healthToRGB(region) {
  const h = region.health / 100;
  const [r, g, b] = region.baseColor;
  // Healthy = vivid base color, degraded = washed-out gray-blue
  const dr = Math.round(r + (185 - r) * (1 - h));
  const dg = Math.round(g + (200 - g) * (1 - h));
  const db = Math.round(b + (210 - b) * (1 - h));
  return [dr, dg, db];
}

// ─── Canvas drawing ──────────────────────────────────────────
function draw() {
  t += 0.018 * currentRegion.waveSpeed;

  const W = canvas.width / devicePixelRatio;
  const H = canvas.height / devicePixelRatio;

  ctx.clearRect(0, 0, W, H);

  const [br, bg, bb] = healthToRGB(currentRegion);
  const layers = 8;

  for (let i = 0; i < layers; i++) {
    const frac = i / (layers - 1);
    const alpha = 0.15 + frac * 0.6;
    const yBase = H * (0.1 + frac * 0.75);
    const amp = currentRegion.waveAmp * (1 - frac * 0.45);
    const freq = 0.011 + frac * 0.009;
    const phase = t + i * 0.95;

    // Darken each layer slightly as depth increases
    const depth = 0.55 + frac * 0.45;
    const lr = Math.round(br * depth);
    const lg = Math.round(bg * depth);
    const lb = Math.round(bb * depth);

    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 3) {
      const y = yBase
        + Math.sin(x * freq + phase) * amp
        + Math.sin(x * freq * 1.8 + phase * 0.75) * amp * 0.38;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fillStyle = `rgba(${lr},${lg},${lb},${alpha})`;
    ctx.fill();
  }

  // Floating particles (bubbles / bioluminescence)
  const particleCount = 22;
  for (let p = 0; p < particleCount; p++) {
    const px = ((p * 139 + t * 14) % W);
    const depthFrac = (p % 6) / 6;
    const py = H * (0.08 + depthFrac * 0.78) + Math.sin(t * 0.65 + p) * 9;
    const pr = 1.2 + (p % 3) * 0.9;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.1 + depthFrac * 0.09})`;
    ctx.fill();
  }

  animationFrame = requestAnimationFrame(draw);
}

// ─── Metrics panel ───────────────────────────────────────────
function renderMetrics(region) {
  const h = region.health;
  const healthColor = h > 70 ? '#042C53' : h > 50 ? '#185FA5' : h > 35 ? '#378ADD' : '#85B7EB';

  document.getElementById('metrics').innerHTML = `
    <div class="metric-card">
      <p class="metric-label">Temperature</p>
      <p class="metric-value">${region.temp.toFixed(1)}<span class="metric-unit">°C</span></p>
    </div>
    <div class="metric-card">
      <p class="metric-label">Ocean pH</p>
      <p class="metric-value">${region.ph.toFixed(2)}</p>
    </div>
    <div class="metric-card">
      <p class="metric-label">Pollution index</p>
      <p class="metric-value">${region.pollution}<span class="metric-unit">/100</span></p>
    </div>
    <div class="metric-card">
      <p class="metric-label">Health score</p>
      <p class="metric-value" style="color:${healthColor}">${region.health}<span class="metric-unit">%</span></p>
    </div>
  `;

  document.getElementById('region-label').textContent = region.name;
  document.getElementById('health-badge').textContent = `${region.health}% healthy`;
  document.getElementById('info-name').textContent = region.name;
  document.getElementById('info-desc').textContent = region.desc;
}

// ─── Region switching ─────────────────────────────────────────
function setRegion(key) {
  currentRegion = REGIONS[key];
  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.region === key);
  });
  renderMetrics(currentRegion);
}

// ─── Event listeners ──────────────────────────────────────────
document.querySelectorAll('.region-btn').forEach(btn => {
  btn.addEventListener('click', () => setRegion(btn.dataset.region));
});

window.addEventListener('resize', () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  draw();
});

// ─── Init ─────────────────────────────────────────────────────
resizeCanvas();
renderMetrics(currentRegion);
draw();
