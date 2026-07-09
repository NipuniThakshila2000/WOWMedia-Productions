const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const brandWord = document.querySelector("[data-brand-word]");
const brandLogo = document.querySelector(".brand-mark img");
const brandLogoDark = "WOW MEDIA-01.png";
const brandLogoLight = "media/logos-light/1_0010_Wow-Media-Logo-1.png";
const impactLogo = document.querySelector(".impact-logo-media img");
const impactLogoDark = "media/logos/our-impact-future.png";
const impactLogoLight = "media/logos-light/1_0002_our-impact-future.png";
const partnerLogoMap = {
  "media/logos/_0000_CIQ-(1)-(2).png": "media/logos-light/1_0000s_0017__0000_CIQ-(1)-(2).png",
  "media/logos/_0001_lpl-logo-copy.jpg.png": "media/logos-light/1_0000s_0000__0001_lpl-logo-copy.jpg.png",
  "media/logos/_0002_wowone.png": "media/logos-light/1_0008_wow-one.png",
  "media/logos/_0003_GOODFELLOWS.png": "media/logos-light/1_0000s_0016__0003_GOODFELLOWS.png",
  "media/logos/_0004_SWIFI.png": "media/logos-light/1_0000s_0015__0004_SWIFI.png",
  "media/logos/_0005_SWFI_GWC_LogoApproved-02.png": "media/logos-light/1_0000s_0014__0005_SWFI_GWC_LogoApproved-02.png",
  "media/logos/_0006_NDB.png": "media/logos-light/1_0007__0006_NDB.png",
  "media/logos/_0007_MALIBU-copy.png": "media/logos-light/1_0000s_0013__0007_MALIBU-copy.png",
  "media/logos/_0008_orel.png": "media/logos-light/1_0000s_0012__0008_orel.png",
  "media/logos/_0009_softlogic.png": "media/logos-light/1_0000s_0011__0009_softlogic.png",
  "media/logos/_0010_sozo.png": "media/logos-light/1_0000s_0010__0010_sozo.png",
  "media/logos/_0011_sarva.png": "media/logos-light/1_0000s_0009__0011_sarva.png",
  "media/logos/_0012_trelleborg.png": "media/logos-light/1_0000s_0008__0012_trelleborg.png",
  "media/logos/_0013_cutting-station.png": "media/logos-light/1_0005_Cutting-stations.png",
  "media/logos/_0014_monkeybean.png": "media/logos-light/1_0004_Layer-1.png",
  "media/logos/_0015_australian-aid.png": "media/logos-light/1_0000s_0007__0015_australian-aid.png",
  "media/logos/_0016_CFW.png": "media/logos-light/1_0003_CFW.png",
  "media/logos/_0017_wowlife.png": "media/logos-light/1_0000s_0006__0017_wowlife.png",
  "media/logos/_0018_dance.png": "media/logos-light/1_0000s_0005__0018_dance.png",
  "media/logos/_0019_rapha.png": "media/logos-light/1_0000s_0004__0019_rapha.png",
  "media/logos/_0020_Logo-14.png": "media/logos-light/1_0000s_0003__0020_Logo-14.png",
  "media/logos/_0021_warehouse.png": "media/logos-light/1_0006__0021_warehouse.png",
  "media/logos/_0022_ranelle.png": "media/logos-light/1_0000s_0002__0022_ranelle.png",
  "media/logos/Shelter zoom.png": "media/logos-light/1_0000_Shelter-zoom.png",
  "media/logos/mithra.png": "media/logos-light/1_0001_mithra.png",
  "media/logos/soft bank.png": "media/logos-light/1_0000s_0018_soft-bank.png",
  "media/logos/kenton.png": "media/logos-light/1_0000s_0001_kenton.png"
};

const getSavedTheme = () => {
  try {
    return localStorage.getItem("wow-theme");
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem("wow-theme", theme);
  } catch {
    return;
  }
};

const setTheme = (theme) => {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  themeToggle?.setAttribute("aria-pressed", String(nextTheme === "light"));
  themeToggle?.setAttribute("aria-label", nextTheme === "light" ? "Switch to dark mode" : "Switch to light mode");
  updateBrandLogo(nextTheme);
  updateImpactLogo(nextTheme);
  updatePartnerLogos(nextTheme);
};

function updateBrandLogo(theme) {
  brandLogo?.setAttribute("src", theme === "light" ? brandLogoLight : brandLogoDark);
}

function updateImpactLogo(theme) {
  impactLogo?.setAttribute("src", theme === "light" ? impactLogoLight : impactLogoDark);
}

function updatePartnerLogos(theme) {
  document.querySelectorAll(".partner-strip img").forEach((image) => {
    image.dataset.darkSrc ||= image.getAttribute("src") ?? "";
    const darkSrc = image.dataset.darkSrc;
    image.setAttribute("src", theme === "light" ? partnerLogoMap[darkSrc] ?? darkSrc : darkSrc);
  });
}

setTheme(getSavedTheme() ?? "dark");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
  saveTheme(nextTheme);
});

if (brandWord) {
  window.setTimeout(() => {
    brandWord.classList.add("is-changing");
    window.setTimeout(() => {
      brandWord.textContent = "Tech";
      brandWord.classList.remove("is-changing");
      brandWord.classList.add("is-tech");
    }, 180);
  }, 8000);
}

const revealTargets = document.querySelectorAll(
  ".hero-copy h1, .hero-actions, .credibility-line, .section-heading, .page-hero > *, .product-copy, .product-video-panel, .service-grid article, .detail-grid article, .project-list article, .catalog-grid article, .policy-grid article, .people-grid article, .team-showcase article, .contact-card, .footer-cta"
);

const typographyTargets = document.querySelectorAll("h1, h2, h3, .eyebrow, .footer-pill");

typographyTargets.forEach((target) => {
  const text = target.textContent?.trim();
  if (!text || target.dataset.typographyReady === "true") return;

  target.dataset.typographyReady = "true";
  target.setAttribute("aria-label", text);
  target.innerHTML = text
    .split(/\s+/)
    .map((word, index) => `<span class="type-word" style="--word-index:${index}">${word}</span>`)
    .join(" ");
});

if (revealTargets.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealTargets.forEach((target) => {
    target.classList.add("reveal-on-scroll");
    if (prefersReducedMotion) target.classList.add("is-visible");
  });

  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
}

const autoplayVideos = document.querySelectorAll("video");

const playVideos = () => {
  autoplayVideos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.playsInline = true;
    const playAttempt = video.play();
    if (playAttempt instanceof Promise) playAttempt.catch(() => {});
  });
};

if (autoplayVideos.length) {
  playVideos();
  window.addEventListener("load", playVideos, { once: true });
  window.addEventListener("pageshow", playVideos);
  window.addEventListener("pointerdown", playVideos, { once: true });
}

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
