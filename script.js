const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const canvas = document.getElementById("signalCanvas");
const ctx = canvas?.getContext("2d");

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawSignal(time = 0) {
  if (!canvas || !ctx) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const center = height * 0.5;
  const t = time * 0.001;

  ctx.clearRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.58, center, 20, width * 0.58, center, width * 0.62);
  glow.addColorStop(0, "rgba(0,198,215,0.16)");
  glow.addColorStop(1, "rgba(0,198,215,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0,198,215,0.95)";
  ctx.shadowColor = "rgba(0,198,215,0.8)";
  ctx.shadowBlur = 16;
  ctx.beginPath();

  for (let x = 0; x <= width; x += 3) {
    const n = x / width;
    const carrier = Math.sin(n * 18 + t * 2.2) * 18;
    const fine = Math.sin(n * 64 - t * 3.3) * 7;
    const spike =
      Math.exp(-Math.pow((n - 0.32 - (Math.sin(t * 0.6) * 0.04)) * 34, 2)) * -118 +
      Math.exp(-Math.pow((n - 0.39) * 48, 2)) * 78 +
      Math.exp(-Math.pow((n - 0.68 - (Math.cos(t * 0.4) * 0.03)) * 42, 2)) * -76 +
      Math.exp(-Math.pow((n - 0.74) * 58, 2)) * 54;
    const y = center + carrier + fine + spike;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, center);
  ctx.lineTo(width, center);
  ctx.stroke();

  const scanX = ((t * 90) % (width + 120)) - 60;
  const scan = ctx.createLinearGradient(scanX - 40, 0, scanX + 40, 0);
  scan.addColorStop(0, "rgba(0,198,215,0)");
  scan.addColorStop(0.5, "rgba(0,198,215,0.4)");
  scan.addColorStop(1, "rgba(0,198,215,0)");
  ctx.fillStyle = scan;
  ctx.fillRect(scanX - 40, 0, 80, height);

  requestAnimationFrame(drawSignal);
}

if (canvas && ctx) {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  requestAnimationFrame(drawSignal);
}
