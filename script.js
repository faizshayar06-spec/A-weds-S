document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // 1. FLOATING AMBIENT BUBBLES ("Ahmed weds Sahana" & "A ♡ S")
  // ==========================================================
  const bubbleCanvas = document.getElementById("ambientBubbleCanvas");
  const bCtx = bubbleCanvas.getContext("2d");

  let w = (bubbleCanvas.width = window.innerWidth);
  let h = (bubbleCanvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = bubbleCanvas.width = window.innerWidth;
    h = bubbleCanvas.height = window.innerHeight;
  });

  const bubbles = [];
  const totalBubbles = 18; // Clean, non-distracting balance

  class FloatingGlowOrb {
    constructor() {
      this.init(true);
    }

    init(firstRun = false) {
      this.x = Math.random() * w;
      this.y = firstRun ? Math.random() * h : h + 40;
      this.radius = 18 + Math.random() * 22;
      this.speed = 0.35 + Math.random() * 0.55;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.015 + Math.random() * 0.015;
      this.alpha = 0.18 + Math.random() * 0.35;

      // Only "Ahmed weds Sahana" and "A ♡ S"
      this.text = Math.random() > 0.5 ? "Ahmed weds Sahana" : "A ♡ S";
    }

    update() {
      this.y -= this.speed;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.6;

      if (this.y < -50) {
        this.init();
      }
    }

    draw() {
      bCtx.save();
      bCtx.globalAlpha = this.alpha;

      // Soft Golden Halo
      const gradient = bCtx.createRadialGradient(
        this.x, this.y, this.radius * 0.2,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, "rgba(255, 245, 210, 0.85)");
      gradient.addColorStop(0.5, "rgba(212, 175, 55, 0.35)");
      gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

      bCtx.fillStyle = gradient;
      bCtx.beginPath();
      bCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      bCtx.fill();

      // Delicate Shimmer Border
      bCtx.strokeStyle = "rgba(255, 235, 170, 0.55)";
      bCtx.lineWidth = 1;
      bCtx.beginPath();
      bCtx.arc(this.x, this.y, this.radius * 0.85, 0, Math.PI * 2);
      bCtx.stroke();

      // Shimmer Text inside bubble
      bCtx.fillStyle = "#6B4912";
      bCtx.font = "italic 600 8.5px 'Cormorant Garamond', serif";
      bCtx.textAlign = "center";
      bCtx.textBaseline = "middle";
      bCtx.shadowColor = "rgba(255, 235, 150, 0.8)";
      bCtx.shadowBlur = 3;
      bCtx.fillText(this.text, this.x, this.y);

      bCtx.restore();
    }
  }

  for (let i = 0; i < totalBubbles; i++) {
    bubbles.push(new FloatingGlowOrb());
  }

  function loopBubbles() {
    bCtx.clearRect(0, 0, w, h);
    for (let b of bubbles) {
      b.update();
      b.draw();
    }
    requestAnimationFrame(loopBubbles);
  }
  loopBubbles();

  // ==========================================================
  // 2. ENVELOPE OPENING & ILLUMINATING FLORAL EFFECT (VIDEO MATCH)
  // ==========================================================
  const waxSeal = document.getElementById("waxSeal");
  const topFlap = document.getElementById("topFlap");
  const innerLight = document.getElementById("innerLight");
  const envelopeOverlay = document.getElementById("envelope-overlay");
  const music = document.getElementById("weddingMusic");

  if (waxSeal) {
    waxSeal.addEventListener("click", () => {
      // Play Audio
      if (music) {
        music.play().catch(() => {});
      }

      // Step 1: Carved floral vines start glowing with golden light (like the video)
      const branches = document.querySelectorAll(".branch-glow");
      branches.forEach(branch => branch.classList.add("illuminated"));

      // Step 2: Seal lifts and golden beam radiates from inner crevice
      setTimeout(() => {
        waxSeal.style.transform = "translate(-50%, -150%) scale(0.6)";
        waxSeal.style.opacity = "0";
        if (innerLight) innerLight.classList.add("radiate");
      }, 350);

      // Step 3: Top flap folds open
      setTimeout(() => {
        if (topFlap) topFlap.classList.add("unfolded");
      }, 600);

      // Step 4: Cinematic dissolve to reveal holy page
      setTimeout(() => {
        if (envelopeOverlay) envelopeOverlay.classList.add("unveiled");
      }, 1300);
    });
  }

  // ==========================================================
  // 3. HTML5 SCRATCH CARDS FUNCTIONALITY (DAY, MONTH, YEAR)
  // ==========================================================
  function setupScratchPad(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    const pw = parent.offsetWidth;
    const ph = parent.offsetHeight;
    canvas.width = pw;
    canvas.height = ph;

    // Rich gold foil metallic coating
    const grad = ctx.createLinearGradient(0, 0, pw, ph);
    grad.addColorStop(0, "#D9BD7E");
    grad.addColorStop(0.35, "#FFF1CF");
    grad.addColorStop(0.65, "#C9A149");
    grad.addColorStop(1, "#8A6420");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, pw, ph);

    // Subtle hatch lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    for (let x = -pw; x < pw * 2; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + ph, ph);
      ctx.stroke();
    }

    let isScratching = false;

    function scratch(clientX, clientY) {
      const bRect = canvas.getBoundingClientRect();
      const x = clientX - bRect.left;
      const y = clientY - bRect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mouse Listeners
    canvas.addEventListener("mousedown", (e) => {
      isScratching = true;
      scratch(e.clientX, e.clientY);
    });
    window.addEventListener("mouseup", () => (isScratching = false));
    canvas.addEventListener("mousemove", (e) => {
      if (isScratching) scratch(e.clientX, e.clientY);
    });

    // Mobile Touch Listeners
    canvas.addEventListener("touchstart", (e) => {
      isScratching = true;
      const t = e.touches[0];
      scratch(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener("touchend", () => (isScratching = false));
    canvas.addEventListener("touchmove", (e) => {
      if (isScratching) {
        const t = e.touches[0];
        scratch(t.clientX, t.clientY);
      }
    }, { passive: true });
  }

  setupScratchPad("canvasDay");
  setupScratchPad("canvasMonth");
  setupScratchPad("canvasYear");

  // ==========================================================
  // 4. COUNTDOWN TIMER (Target: 10 January 2027)
  // ==========================================================
  const ceremonyTime = new Date("January 10, 2027 18:00:00").getTime();

  function updateCountdown() {
    const rightNow = new Date().getTime();
    const span = ceremonyTime - rightNow;

    if (span > 0) {
      const days = Math.floor(span / (1000 * 60 * 60 * 24));
      const hours = Math.floor((span % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((span % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((span % (1000 * 60)) / 1000);

      const d = document.getElementById("dBox");
      const h = document.getElementById("hBox");
      const m = document.getElementById("mBox");
      const s = document.getElementById("sBox");

      if (d) d.innerText = String(days).padStart(2, "0");
      if (h) h.innerText = String(hours).padStart(2, "0");
      if (m) m.innerText = String(mins).padStart(2, "0");
      if (s) s.innerText = String(secs).padStart(2, "0");
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});

