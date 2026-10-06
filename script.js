/* =====================================================================
   Navnit Kumar — Portfolio Interactive Systems Controller
   Theme: Deep-Tech Cyber-Dark Titanium & Frosted Glass / Clean Studio Mode
   Features: Command Palette (Ctrl+K), Web Audio Synthesizer,
   Mobile Drawer Navigation, 3D Bookshelf & Live Signal Simulators
   ===================================================================== */
(function () {
  "use strict";

  /* ===================================================================
     1. TOAST NOTIFICATION UTILITY
     =================================================================== */
  function showToast(msg) {
    var existingToast = document.querySelector(".app-toast");
    if (existingToast) existingToast.remove();

    var toast = document.createElement("div");
    toast.className = "app-toast";
    toast.innerHTML = '<span style="color: var(--accent-cyan); font-weight: bold;">⚡</span> <span>' + msg + '</span>';
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.classList.add("show");
    }, 10);

    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 2800);
  }

  /* ===================================================================
     2. AUDIO ENGINE & SYNTHESIZER (Web Audio API with localStorage)
     =================================================================== */
  var audioMuted = false; try { audioMuted = localStorage.getItem("navnit_portfolio_muted") === "true"; } catch(e) {}
  var audioCtx = null;

  function getAudioContext() {
    if (audioMuted) return null;
    try {
      if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function updateSoundUI() {
    var soundIcons = document.querySelectorAll("#sound-icon, .sound-icon");
    var soundTexts = document.querySelectorAll("#sound-text, .sound-text");
    var soundToggleBtns = document.querySelectorAll("#sound-toggle-btn, .sound-toggle-btn");

    soundIcons.forEach(function (icon) {
      icon.textContent = audioMuted ? "🔍‡" : "🔊";
    });
    soundTexts.forEach(function (text) {
      text.textContent = audioMuted ? "Muted" : "Sound";
    });
    soundToggleBtns.forEach(function (btn) {
      btn.classList.toggle("highlight-btn", !audioMuted);
    });
  }

  function playSlideSound() {
    if (audioMuted) return;
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(170, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {}
  }

  function playClickSound() {
    if (audioMuted) return;
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  function playSonarPing() {
    if (audioMuted) return;
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(860, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  function playHazardAlert() {
    if (audioMuted) return;
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var soundBtn = e.target.closest("#sound-toggle-btn, .sound-toggle-btn");
    if (soundBtn) {
      audioMuted = !audioMuted;
      try { localStorage.setItem("navnit_portfolio_muted", audioMuted.toString()); } catch(e) {}
      updateSoundUI();
      showToast(audioMuted ? "Audio feedback muted" : "Audio synthesizer enabled");
      if (!audioMuted) playSlideSound();
    }
  });

  updateSoundUI();

  /* ===================================================================
     3. THEME CONTROLLER (Dark, Light, Anime, Warm Modes)
     =================================================================== */
  var themes = ["light", "dark", "anime", "warm", "cartoon"];
  var themeMeta = {
    light: { name: "Clean Studio Light", icon: "☀️", label: "Light", toast: "Clean Studio Light theme active ☀️" },
    dark: { name: "Cyber-Dark Titanium", icon: "🌙", label: "Dark", toast: "Cyber-Dark Titanium theme active 🌙" },
    anime: { name: "Neo-Tokyo Anime", icon: "🌸", label: "Anime", toast: "Neo-Tokyo Cyber-Anime theme active 🌸⚡" },
    warm: { name: "Warm Sunset Amber", icon: "☕", label: "Warm", toast: "Warm Sunset & Terracotta theme active ☕🌅" },
    cartoon: { name: "Toon World", icon: "🎨", label: "Cartoon", toast: "Toon World Cartoon theme active 🎨✨" }
  };

  var currentTheme = "light"; try { currentTheme = localStorage.getItem("navnit_portfolio_theme"); } catch(e) {}
  if (!currentTheme || !themeMeta[currentTheme]) {
    currentTheme = "light"; // Default to lighter and advanced UI as requested
  }

  function applyTheme(theme) {
    if (!themeMeta[theme]) theme = "light";
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    if (document.body) {
      document.body.setAttribute("data-theme", theme);
    }
    try { localStorage.setItem("navnit_portfolio_theme", theme); } catch(e) {}

    var meta = themeMeta[theme];
    var themeBtns = document.querySelectorAll(".theme-toggle-btn");
    themeBtns.forEach(function (btn) {
      var icon = btn.querySelector(".theme-icon");
      var text = btn.querySelector(".theme-text");
      if (icon) icon.textContent = meta.icon;
      if (text) text.textContent = meta.label;
      btn.title = "Current: " + meta.name + " · Click to switch theme (Light / Dark / Anime / Warm / Cartoon)";
    });

    window.dispatchEvent(new CustomEvent("portfolioThemeChanged", { detail: { theme: theme } }));
  }

  function cycleTheme() {
    var curIdx = themes.indexOf(currentTheme);
    var nextIdx = (curIdx + 1) % themes.length;
    var nextTheme = themes[nextIdx];
    applyTheme(nextTheme);
    playClickSound();
    showToast(themeMeta[nextTheme].toast);
    return nextTheme;
  }

  applyTheme(currentTheme);

  document.addEventListener("click", function (e) {
    var themeBtn = e.target.closest(".theme-toggle-btn");
    if (themeBtn) {
      cycleTheme();
    }
  });

  /* ===================================================================
     4. CUSTOM DUAL-CHROMA HUD RETICLE CURSOR
     =================================================================== */
  if (window.innerWidth > 768) {
    var cursor = document.createElement("div");
    cursor.id = "hud-cursor";
    var dot = document.createElement("div");
    dot.id = "hud-cursor-dot";
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    var curX = -100, curY = -100;
    var targetX = -100, targetY = -100;

    window.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.left = targetX + "px";
      dot.style.top = targetY + "px";
    }, { passive: true });

    function renderCursor() {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      cursor.style.left = curX + "px";
      cursor.style.top = curY + "px";
      if (window.requestAnimationFrame) { window.requestAnimationFrame(renderCursor); } else { setTimeout(renderCursor, 16); }
    }
    renderCursor();

    var interactives = document.querySelectorAll("a, button, .book-spine, .tree-node, .sheet-card, input, textarea, .tag-cloud span, .filter-pill, .topic-chip, .specs-tab-btn");
    interactives.forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("active"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("active"); });
    });
  }

  /* ===================================================================
     5. TELEMETRY PARTICLES & NEURAL MESH CANVAS
     =================================================================== */
  var canvas = document.createElement("canvas");
  canvas.id = "ambient-canvas";
  document.body.prepend(canvas);

  var cCtx = canvas.getContext("2d");
  var width, height;
  var particles = [];
  var shockwaves = [];
  var mousePos = { x: -1000, y: -1000 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    var count = Math.min(Math.floor(width / 28), 65);
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 1.0,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: (Math.random() > 0.45) ? "56, 189, 248" : "245, 158, 11",
        alpha: Math.random() * 0.45 + 0.15
      });
    }
  }

  window.addEventListener("click", function (e) {
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: 140,
      opacity: 0.6
    });
  });

  window.addEventListener("mousemove", function (e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  }, { passive: true });

  function animateCanvas() {
    cCtx.clearRect(0, 0, width, height);

    if (mousePos.x > 0 && currentTheme !== "light") {
      var radGrad = cCtx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 300);
      radGrad.addColorStop(0, "rgba(56, 189, 248, 0.08)");
      radGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.03)");
      radGrad.addColorStop(1, "transparent");
      cCtx.fillStyle = radGrad;
      cCtx.fillRect(0, 0, width, height);
    }

    for (var s = shockwaves.length - 1; s >= 0; s--) {
      var sw = shockwaves[s];
      sw.radius += 4.2;
      sw.opacity -= 0.018;

      if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(s, 1);
        continue;
      }

      cCtx.beginPath();
      cCtx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      cCtx.strokeStyle = "rgba(56, 189, 248, " + sw.opacity + ")";
      cCtx.lineWidth = 1.6;
      cCtx.stroke();
    }

    var len = particles.length;
    for (var i = 0; i < len; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      cCtx.beginPath();
      cCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cCtx.fillStyle = "rgba(" + p.color + ", " + p.alpha + ")";
      cCtx.shadowColor = "rgba(" + p.color + ", 0.5)";
      cCtx.shadowBlur = 4;
      cCtx.fill();
      cCtx.shadowBlur = 0;

      for (var j = i + 1; j < len; j++) {
        var p2 = particles[j];
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 85) {
          cCtx.beginPath();
          cCtx.moveTo(p.x, p.y);
          cCtx.lineTo(p2.x, p2.y);
          cCtx.strokeStyle = "rgba(56, 189, 248, " + (0.15 * (1 - dist / 85)) + ")";
          cCtx.lineWidth = 0.8;
          cCtx.stroke();
        }
      }
    }

    if (window.requestAnimationFrame) { window.requestAnimationFrame(animateCanvas); } else { setTimeout(animateCanvas, 16); }
  }

  window.addEventListener("resize", function () {
    resizeCanvas();
    createParticles();
  });
  resizeCanvas();
  createParticles();
  animateCanvas();

  /* ===================================================================
     6. 3D BOOKSHELF PHYSICS TILT
     ===================================================================== */
  var shelfContainer = document.querySelector(".bookshelf-shelf-container");
  if (shelfContainer && window.innerWidth > 900) {
    window.addEventListener("mousemove", function (e) {
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;

      var rotY = dx * 4.5;
      var rotX = -dy * 3.2;

      shelfContainer.style.transform = "rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg)";
    });

    window.addEventListener("mouseleave", function () {
      shelfContainer.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  /* ===================================================================
     7. SIDEBAR COLLAPSIBLE FOLDERS
     ===================================================================== */
  var folderHeaders = document.querySelectorAll(".folder-header");
  folderHeaders.forEach(function (header) {
    header.addEventListener("click", function (e) {
      if (e.target.id === "btn-open-all-projects") return;

      var folder = this.parentElement;
      var chevron = this.querySelector(".chevron");
      folder.classList.toggle("open");
      if (chevron) {
        chevron.textContent = folder.classList.contains("open") ? "▾" : "▸";
      }
      playClickSound();
    });
  });

  /* ===================================================================
     8. MOBILE NAVIGATION DRAWER CONTROLLER
     ===================================================================== */
  var sidebar = document.getElementById("ide-sidebar");
  var mobileBackdrop = document.querySelector(".sidebar-mobile-backdrop");
  if (!mobileBackdrop) {
    mobileBackdrop = document.createElement("div");
    mobileBackdrop.className = "sidebar-mobile-backdrop";
    document.body.appendChild(mobileBackdrop);
  }

  function toggleMobileDrawer(open) {
    if (!sidebar) return;
    var shouldOpen = (typeof open === "boolean") ? open : !sidebar.classList.contains("mobile-open");
    sidebar.classList.toggle("mobile-open", shouldOpen);
    mobileBackdrop.classList.toggle("active", shouldOpen);
    playClickSound();
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest(".mobile-nav-toggle-btn")) {
      toggleMobileDrawer();
    } else if (e.target.closest(".sidebar-mobile-backdrop") || e.target.closest(".sidebar-close-btn-mobile")) {
      toggleMobileDrawer(false);
    } else if (sidebar && sidebar.classList.contains("mobile-open") && e.target.closest(".tree-node a")) {
      toggleMobileDrawer(false);
    }
  });

  /* ===================================================================
     9. ALL PROJECTS SHEET MODAL
     ===================================================================== */
  var allProjectsOverlay = document.getElementById("all-projects-overlay");
  var openAllBtn = document.getElementById("btn-open-all-projects");
  var closeSheetBtn = document.getElementById("btn-close-projects-sheet");
  var sheetCards = document.querySelectorAll(".sheet-card[data-select-book]");

  function openProjectsSheet() {
    if (allProjectsOverlay) {
      allProjectsOverlay.classList.add("open");
      playSlideSound();
    }
  }

  function closeProjectsSheet() {
    if (allProjectsOverlay) {
      allProjectsOverlay.classList.remove("open");
      playClickSound();
    }
  }

  if (openAllBtn) {
    openAllBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openProjectsSheet();
    });
  }

  if (closeSheetBtn) {
    closeSheetBtn.addEventListener("click", closeProjectsSheet);
  }

  if (allProjectsOverlay) {
    allProjectsOverlay.addEventListener("click", function (e) {
      if (e.target === allProjectsOverlay) closeProjectsSheet();
    });
  }

  /* ===================================================================
     10. PROJECT DATA DEFINITIONS (7 Builds + Home Profile)
     ===================================================================== */
  var projectsData = [
    {
      title: "MineSafe-X",
      subtitle: "Smart Safety & Fleet Monitoring for Mining Transport (Team Colliders)",
      summary: "Smart collision avoidance and fleet monitoring system engineered by Team Colliders for heavy haul trucks in busy open-pit mining environments. Combines GPS, 24GHz mmWave radar, ultrasonic sensors, and connectionless ESP-NOW wireless communication to continuously exchange vehicle location, speed, direction, acceleration, altitude, and relative distance. Calculates real-time Time to Collision (TTC) with zero internet dependency, broadcasting instant warnings to a mobile dashboard and central fleet tower.",
      tags: ["Team Colliders", "ESP-NOW Mesh", "V2V & V2I", "mmWave Radar", "TTC Engine", "Mobile Dashboard"],
      status: "Tested Prototype",
      artGradient: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.4), rgba(7, 10, 18, 0.96)), url('images/minesafe.jpg')",
      primaryLink: "projects.html",
      githubLink: "https://github.com/navnit919",
      driveLink: "https://drive.google.com/drive/folders/16sRMtZAeOKWz0Sx-ARwUDb_S_0rBsoel",
      driveText: "Drive Prototype ↗",
      gallery: ["images/minesafe.jpg", "images/minesafex.jpg", "images/minesafex (2).jpg", "images/minesafe (2).jpg", "images/minesafe dashboard.jpg", "images/minesafe mobile dashboard.jpg"],
      specs: {
        domain: "Embedded IoT & Mining Transport Safety",
        photo: "images/minesafe.jpg",
        arch: "V2V direct vehicle-to-vehicle mesh via ESP-NOW + V2I uplink to central quarry tower. Continuously shares location, speed, direction, acceleration, and altitude to compute Time to Collision (TTC) independently on each node without internet.",
        hardware: "ESP32-WROOM-32, 24GHz mmWave radar module, ultrasonic sensor array, NEO-6M GPS receiver, local buzzer, OLED display, and mobile driver dashboard.",
        software: "Embedded C / Arduino Framework, ESP-NOW peer-to-peer protocol stack, Time-to-Collision (TTC) predictive velocity vector algorithm, central fleet monitoring portal.",
        metrics: "<5ms local packet latency; 360° blind-spot coverage; 100% reliable operation in remote zero-internet mining pits."
      }
    },
    {
      title: "Traffic Violation Detection System",
      subtitle: "YOLOv8 Edge Vision, EasyOCR & AI Traffic Assistant",
      summary: "Automated, scalable AI-powered traffic monitoring system designed to detect, identify, and record traffic violations from live video streams without requiring continuous manual officer surveillance. YOLOv8 models detect vehicles, helmet violations, triple riding, red-light infractions, and wrong-side driving with persistent vehicle tracking IDs. A dedicated model crops license plates for EasyOCR character extraction, logging structured records to a web dashboard, complemented by an LLM-powered AI Traffic Assistant providing weekly/monthly reports and violation analytics.",
      tags: ["YOLOv8", "EasyOCR", "Plate Detection", "AI Traffic Chatbot", "Vehicle Tracking", "Raspberry Pi"],
      status: "Operational Pipeline",
      artGradient: "radial-gradient(ellipse at center, rgba(30, 58, 138, 0.45), rgba(8, 12, 22, 0.96)), url('images/Screenshot 2026-08-08 144630.png')",
      primaryLink: "projects.html",
      githubLink: "https://github.com/navnit919",
      gallery: [
        "images/Screenshot 2026-08-08 144630.png",
        "images/Screenshot 2026-08-08 144730.png",
        "images/Screenshot 2026-05-08 234123.png",
        "images/traffic.jpg"
      ],
      specs: {
        domain: "Edge Computer Vision & Intelligent Traffic Systems",
        photo: "images/Screenshot 2026-08-08 144630.png",
        arch: "Camera (Pi/Laptop) → Video Processing → YOLOv8 Vehicle & Violation Detection → Unique Vehicle Tracking ID → Dedicated Plate Model Crop → EasyOCR Text Extraction → Incident Database → Web Dashboard & AI LLM Assistant.",
        hardware: "Raspberry Pi / Arducam / Laptop camera, GPU/CPU workstation, local violation database storage.",
        software: "Python, YOLOv8 (Ultralytics), OpenCV, EasyOCR, Google/LLM API Chatbot, HTML/CSS/JS analytics dashboard.",
        metrics: "Real-time multi-lane detection (helmet, triple riding, red light, wrong-side); automated license plate extraction; conversational AI report queries."
      }
    },
    {
      title: "AI-Based Osteoarthritis Screening",
      subtitle: "Multimodal OA Risk Marker Screening for the North Eastern Region (NER)",
      summary: "Accessible, offline-capable multimodal early screening system engineered to identify Osteoarthritis (OA) risk markers in the North Eastern Region (NER) and remote, low-resource clinical settings. Integrates a 4-tier multimodal pipeline: patient symptom questionnaire, computer vision (MediaPipe Pose gait kinematics) + wearable IMU & FSR pressure sensors, DenseNet-121 radiographic knee X-ray classification, and an XGBoost clinical dashboard localized in Assamese, Bengali, Hindi & English.",
      tags: ["NER Accessible", "Multimodal AI", "Gait & FSR Sensors", "DenseNet-121", "Multilingual", "Offline Capable"],
      status: "SIH Candidate Prototype",
      artGradient: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.45), rgba(15, 23, 42, 0.96)), url('images/Screenshot 2026-09-17 110427.png')",
      primaryLink: "projects.html",
      githubLink: "https://github.com/navnit919",
      driveLink: "https://drive.google.com/drive/folders/13-yXUd3_mVVW_8rUecfljQ8K5v007EYM",
      driveText: "Drive Prototype ↗",
      gallery: [
        "images/Screenshot 2026-09-17 110427.png",
        "images/Screenshot 2026-09-16 120212.png",
        "images/Screenshot 2026-09-16 120345.png",
        "images/Screenshot 2026-09-19 102412.png",
        "images/Screenshot 2026-09-16 120436.png",
        "images/Screenshot 2026-09-16 120458.png",
        "images/Screenshot 2026-09-16 120513.png",
        "images/Screenshot 2026-09-16 162150.png"
      ],
      specs: {
        domain: "Biomedical Engineering & Accessible Multimodal AI",
        photo: "images/Screenshot 2026-09-17 110427.png",
        arch: "Input (Questionnaire + Gait Camera + IMU/FSR Sensors + Knee X-Ray) → AI Multimodal Feature Extraction & Ensembling (DenseNet-121 + MediaPipe + XGBoost) → Output (Screening Assessment + Risk Markers + Radar Findings + PDF Report). Supports screening; does not replace medical diagnosis.",
        hardware: "ESP32, 3Ã— MPU6050 6-DOF wearable IMUs (Thigh, Shank, Ankle), piezoresistive FSR plantar pressure matrix insole, camera, standard computer/tablet.",
        software: "DenseNet-121 (KL Grades 0-4), MediaPipe Pose 33-point gait tracking, XGBoost V5, Streamlit clinical dashboard with Assamese, Bengali, Hindi & English localization, ReportLab PDF generator.",
        metrics: "Comprehensive 4-tier multimodal fusion; 4 languages supported; 100% offline-capable for remote village camps and primary health centres."
      }
    },
    {
      title: "Embedded RC Vehicle",
      subtitle: "Dual H-Bridge High-Current Robotics Chassis",
      summary: "Rugged robotic vehicular platform engineered with dual high-current H-bridge drivers with dedicated aluminum fin heat dissipation, PWM multi-speed modulation, clean LiPo power filtering, and custom 2.4GHz wireless receiver decoding.",
      tags: ["Motor Drivers", "H-Bridge", "PWM Control", "Power Electronics", "2.4GHz RF"],
      status: "Built & Tested",
      artGradient: "radial-gradient(ellipse at center, rgba(194, 65, 12, 0.45), rgba(18, 10, 6, 0.96)), url('images/rc-car.jpg')",
      primaryLink: "projects.html",
      githubLink: "https://github.com/navnit919",
      gallery: ["images/rc-car.jpg", "images/rc car race (1).jpeg", "images/rc car.jpeg"],
      specs: {
        domain: "Robotics & Power Electronics",
        photo: "images/rc-car.jpg",
        arch: "2.4GHz receiver -> Microcontroller signal decode -> High-current dual H-bridge motor driver -> High-torque all-terrain 4WD chassis.",
        hardware: "Dual H-bridge drivers with aluminum fin heatsinks, Arduino Uno, 2.4GHz RF receiver, high-discharge LiPo.",
        software: "Embedded C, multi-channel PWM duty cycle stepping, LC filter inductive spike suppression.",
        metrics: "Stable bidirectional motor control under high torque with zero microcontroller logic brownouts."
      }
    },
    {
      title: "F450 Multirotor UAV",
      subtitle: "Autonomous Quadcopter & Telemetry Platform",
      summary: "Custom-configured 450mm quadcopter architecture built and flight-tested during NIELIT Drone Bootcamp 2.1. Integrates 4x 1000KV brushless DC motors, 30A SimonK electronic speed controllers, multi-axis gyro PID flight stabilization, and 2.4GHz FlySky computer transmitter avionics.",
      tags: ["Flight Controller", "30A ESC Array", "BLDC Motors", "FlySky 2.4GHz", "PID Tuning"],
      status: "Airborne Verified",
      artGradient: "radial-gradient(ellipse at center, rgba(159, 18, 57, 0.45), rgba(16, 8, 12, 0.96)), url('images/drone.jpeg')",
      primaryLink: "projects.html",
      githubLink: "https://github.com/navnit919",
      gallery: ["images/drone.jpeg", "images/drone-team.jpeg", "images/drone-field.jpeg"],
      specs: {
        domain: "Aerial Robotics & Avionics",
        photo: "images/drone.jpeg",
        arch: "FlySky 6-channel RF receiver -> KK2.1.5 multirotor flight controller (PID loop) -> 4x 30A SimonK ESCs -> 1000KV BLDC motors.",
        hardware: "F450 quadcopter frame, KK2.1.5/APM flight board, 4x 1000KV motors, 1045 propellers, 3S 2200mAh 25C LiPo.",
        software: "Multirotor flight stabilization firmware, PID attitude tuning, throttle calibration curves.",
        metrics: "Verified stable hovering, responsive pitch/roll/yaw control, and payload thrust-to-weight margin."
      }
    },
    {
      title: "Ultrasonic Radar Bench",
      subtitle: "Time-of-Flight Spatial Mapping System",
      summary: "Real-time acoustic spatial mapping instrument utilizing an HC-SR04 ultrasonic transducer mounted on a stepping servo sweep (15° to 165°). Programs microsecond-precise trigger pulses to measure wave reflections and streams telemetry over UART serial for collision hazard alerts.",
      tags: ["Arduino Uno", "Embedded C", "HC-SR04", "UART Telemetry", "Servo Sweeps"],
      status: "Bench Operational",
      artGradient: "radial-gradient(ellipse at center, rgba(2, 132, 199, 0.4), rgba(6, 12, 20, 0.96)), url('images/ultrasonic.png')",
      primaryLink: "projects.html",
      githubLink: "https://www.linkedin.com/posts/navnit-kumar-72b470330_ultrasonics-iot-sensors-activity-7324643160599506944-P1ND",
      gallery: ["images/ultrasonic.png", "images/ultrasonic-code.png", "images/ultrasonic-output.png"],
      specs: {
        domain: "Embedded Firmware & Acoustic Ranging",
        photo: "images/ultrasonic.png",
        arch: "Arduino Uno 10µs trigger pulse -> HC-SR04 ToF echo feedback -> Angle sweep synchronization -> COM4 9600 baud serial radar plot.",
        hardware: "Arduino Uno, HC-SR04 ultrasonic transducer, SG90 servo motor, COM4 serial interface.",
        software: "Embedded C firmware, acoustic distance formula: Distance = (duration * 0.0343) / 2 cm.",
        metrics: "Continuous 180Â° radial sweep with sub-centimeter obstacle ranging accuracy."
      }
    },
    {
      title: "Contact Management System",
      subtitle: "Python & JSON Structured CLI Application",
      summary: "Practical software tool engineered in Python for robust contact lifecycle management. Features contact creation, keyword search, and deletion with persistent storage in structured JSON files. Implements rigorous input validation, error handling, and clean dictionary/list data modeling via an intuitive terminal interface.",
      tags: ["Python", "JSON Storage", "CLI Tools", "Data Structures", "Input Validation"],
      status: "Production Ready",
      artGradient: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.4), rgba(6, 18, 14, 0.96)), url('images/python_cms.jpg')",
      primaryLink: "projects.html",
      githubLink: "https://github.com/navnit919",
      gallery: ["images/python_cms.jpg"],
      specs: {
        domain: "Python Software Development & CLI Engineering",
        photo: "images/python_cms.jpg",
        arch: "User CLI Input -> Input Validator & Exception Handler -> In-Memory Dictionary Operations -> JSON Serialization / Deserialization -> Structured File Storage.",
        hardware: "Standard PC / Workstation / Terminal.",
        software: "Python 3, JSON library, CLI parsing, dictionary and list data models, regex validation.",
        metrics: "Sub-millisecond query search; 100% schema integrity on disk; graceful handling of corrupt files and invalid inputs."
      }
    },
    {
      title: "Python Adventure Game",
      subtitle: "Interactive Choice-Driven Narrative Engine",
      summary: "First milestone game developed in Python featuring an interactive branching story world where player decisions and probabilistic randomness dictate survival and outcome. Navigates perilous scenarios from treacherous cliffs to crocodile rivers and hidden treasures, utilizing Python's random module, structured state machines, and modular game loops.",
      tags: ["Python", "Game Dev", "Random Module", "State Machines", "Logic Flow"],
      status: "Milestone Build",
      artGradient: "radial-gradient(ellipse at center, rgba(234, 88, 12, 0.4), rgba(20, 10, 6, 0.96)), url('images/python_rpg.jpg')",
      primaryLink: "projects.html",
      githubLink: "https://github.com/navnit919",
      gallery: ["images/python_rpg.jpg"],
      specs: {
        domain: "Game Development & Python Control Flow",
        photo: "images/python_rpg.jpg",
        arch: "Main Game Loop -> Stage State Machine -> Player Choice Evaluation -> Probabilistic Random Event Generator -> Health / Inventory State -> End Condition Evaluation.",
        hardware: "Cross-platform CLI terminal execution.",
        software: "Python 3, Random module, conditional branching trees, procedural narrative generation.",
        metrics: "Multi-branching decision paths; non-deterministic replayability; clean modular architecture."
      }
    }
  ];

  var homeBioData = {
    title: "Navnit Kumar",
    subtitle: "Electrical & Electronics Engineering · NIT Nagaland",
    summary: "Undergraduate engineer focused on developing systems where physical electrical hardware, industrial 33kV power infrastructure, and edge computer-vision intelligence intersect.",
    tags: ["Power Systems", "Edge AI & Vision", "Embedded IoT", "Robotics"],
    status: "Open to Roles",
    artGradient: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.35), rgba(7, 10, 18, 0.97)), url('images/profile_photo.jpeg')",
    primaryLink: "about.html",
    primaryText: "Read Biography & Academics →",
    githubLink: "https://github.com/navnit919",
    specs: {
      domain: "Undergraduate EEE · NIT Nagaland",
      photo: "images/profile_photo.jpeg",
      arch: "End-to-end engineering discipline integrating high-power grid distribution, embedded IoT firmware, and real-time computer vision.",
      hardware: "ESP32, Arduino, Jetson/CUDA Workstations, mmWave Radar, 33kV Switchgear, Multirotor UAVs.",
      software: "Python, C/C++, PyTorch, OpenCV, YOLOv8, XGBoost, Embedded C, ESP-NOW.",
      metrics: "CGPA 8.42 · NIT Nagaland · Secretary, Quants Club · Core Member, Robotics Club."
    }
  };

  /* ===================================================================
     11. 3D BOOKSHELF CARD RENDERING & INTERACTION
     ===================================================================== */
  var cardDisplay = document.getElementById("book-card-display");
  var currentIndex = -1;

  if (cardDisplay) {
    var cardArt = document.getElementById("card-art-canvas");
    var cardTitle = document.getElementById("card-title");
    var cardSubtitle = document.getElementById("card-subtitle");
    var cardSummary = document.getElementById("card-summary");
    var cardTags = document.getElementById("card-tags");
    var cardStatusText = document.getElementById("card-status-text");
    var cardPrimaryLink = document.getElementById("card-primary-link");
    var cardGithubLink = document.getElementById("card-github-link");
    var stagePreviewImg = document.getElementById("stage-preview-img");
    var stageImgCaption = document.getElementById("stage-img-caption");
    var stageProofThumbs = document.getElementById("stage-proof-thumbs");
    var dossierCode = document.getElementById("dossier-code");
    var qspecLatency = document.getElementById("qspec-latency");
    var qspecCoverage = document.getElementById("qspec-coverage");
    var qspecStatus = document.getElementById("qspec-status");

    var spines = document.querySelectorAll(".book-spine");
    var fileNodes = document.querySelectorAll(".tree-node[data-book]");
    var homeNode = document.getElementById("nav-home-jsx");

    function renderCard(data) {
      if (!data) return;

      playSlideSound();

      cardDisplay.style.transform = "scale(0.99)";
      cardDisplay.style.opacity = "0.85";

      if (cardArt) {
        cardArt.style.opacity = "0.15";
      }

      setTimeout(function () {
        if (cardArt) {
          cardArt.style.backgroundImage = data.artGradient;
          cardArt.style.opacity = "0.2";
        }

        if (cardTitle) cardTitle.textContent = data.title;
        if (cardSubtitle) cardSubtitle.textContent = data.subtitle;
        if (cardSummary) cardSummary.textContent = data.summary;
        if (cardStatusText) cardStatusText.textContent = data.status;

        if (cardTags) {
          cardTags.innerHTML = "";
          if (data.tags) {
            data.tags.forEach(function (tag) {
              var span = document.createElement("span");
              span.textContent = tag;
              cardTags.appendChild(span);
            });
          }
        }

        if (cardPrimaryLink) {
          cardPrimaryLink.href = data.primaryLink;
          var labelSpan = cardPrimaryLink.querySelector("span");
          if (labelSpan) {
            labelSpan.textContent = data.primaryText || "Explore Details →";
          }
        }

        if (cardGithubLink) cardGithubLink.href = data.githubLink;

        var existingDriveBtn = cardDisplay.querySelector(".card-btn-drive");
        if (existingDriveBtn) existingDriveBtn.remove();

        if (data.driveLink) {
          var actionsRow = cardDisplay.querySelector(".card-actions-row");
          if (actionsRow) {
            var driveBtn = document.createElement("a");
            driveBtn.className = "card-btn card-btn-drive";
            driveBtn.href = data.driveLink;
            driveBtn.target = "_blank";
            driveBtn.rel = "noopener";
            driveBtn.title = "Open Project on Google Drive";
            driveBtn.innerHTML = '<span>Drive ↗</span>';
            actionsRow.insertBefore(driveBtn, cardGithubLink);
          }
        }

        // Live Visual Monitor and Preview Frame
        var projectPhoto = (data.gallery && data.gallery[0]) || (data.specs && data.specs.photo) || "images/profile_photo.jpeg";
        if (stagePreviewImg) {
          stagePreviewImg.style.opacity = "0.4";
          stagePreviewImg.src = projectPhoto;
          stagePreviewImg.alt = data.title + " System Preview";
          setTimeout(function () {
            stagePreviewImg.style.opacity = "1";
          }, 80);
        }

        if (stageImgCaption) {
          stageImgCaption.textContent = (data.title ? data.title.toUpperCase() : "WORKSTATION") + " // TELEMETRY FEED";
        }

        if (dossierCode) {
          dossierCode.textContent = currentIndex >= 0
            ? "SPEC-ID: 0" + (currentIndex + 1) + " · NIT-EEE-2026"
            : "SPEC-ID: NIT-EEE-8.42 · BIO";
        }

        // Quick Specs Strip Updates
        if (qspecLatency) {
          var lat = "<5 ms";
          if (currentIndex === 0) lat = "<5ms (ESP-NOW)";
          else if (currentIndex === 1) lat = "Real-Time (YOLOv8)";
          else if (currentIndex === 2) lat = "Offline Screening";
          else if (currentIndex === 3) lat = "<2 ms (PWM H-Bridge)";
          else if (currentIndex === 4) lat = "500 Hz (PID Loop)";
          else if (currentIndex === 5) lat = "10 Âµs Pulse (ToF)";
          else if (currentIndex === 6) lat = "Sub-Cycle Relay";
          else lat = "8.42 CGPA";
          qspecLatency.textContent = lat;
        }

        if (qspecCoverage) {
          var cov = "360° Mesh";
          if (currentIndex === 0) cov = "V2V / V2I + Radar + GPS";
          else if (currentIndex === 1) cov = "Multi-Violation + EasyOCR";
          else if (currentIndex === 2) cov = "4-Tier Multimodal (NER)";
          else if (currentIndex === 3) cov = "4WD High-Torque";
          else if (currentIndex === 4) cov = "2.4GHz RF Avionics";
          else if (currentIndex === 5) cov = "180Â° Radial Sweep";
          else if (currentIndex === 6) cov = "33kV / 6.6kV Grid";
          else cov = "Power · Silicon · AI";
          qspecCoverage.textContent = cov;
        }

        if (qspecStatus) {
          var stat = "Verified";
          if (currentIndex === 0) stat = "Team Colliders (Tested)";
          else if (currentIndex === 1) stat = "AI Chatbot & Dashboard";
          else if (currentIndex === 2) stat = "4 Languages (Assam/Beng/Hindi/Eng)";
          else if (currentIndex === 3) stat = "Hardware Verified";
          else if (currentIndex === 4) stat = "Flight Tested (NIELIT)";
          else if (currentIndex === 5) stat = "Bench Operational";
          else if (currentIndex === 6) stat = "Indian Railways";
          else stat = "Open to Roles";
          qspecStatus.textContent = stat;
        }

        // Build Interactive Proof Thumbnails Bar
        if (stageProofThumbs) {
          stageProofThumbs.innerHTML = "";
          var galleryList = data.gallery || [projectPhoto];
          if (galleryList.length > 0) {
            galleryList.forEach(function (imgSrc, gIdx) {
              var tBtn = document.createElement("button");
              tBtn.type = "button";
              tBtn.className = "stage-gallery-thumb" + (gIdx === 0 ? " active" : "");
              tBtn.title = "View Visual Proof " + (gIdx + 1);
              tBtn.innerHTML = '<img src="' + imgSrc + '" alt="' + data.title + ' Thumbnail ' + (gIdx + 1) + '" />';
              tBtn.addEventListener("click", function () {
                if (stagePreviewImg) {
                  stagePreviewImg.style.opacity = "0.3";
                  setTimeout(function () {
                    stagePreviewImg.src = imgSrc;
                    stagePreviewImg.style.opacity = "1";
                  }, 90);
                }
                stageProofThumbs.querySelectorAll(".stage-gallery-thumb").forEach(function (b) {
                  b.classList.remove("active");
                });
                tBtn.classList.add("active");
                playClickSound();
              });
              stageProofThumbs.appendChild(tBtn);
            });
            stageProofThumbs.style.display = "flex";
          } else {
            stageProofThumbs.style.display = "none";
          }
        }

        cardDisplay.style.transform = "scale(1)";
        cardDisplay.style.opacity = "1";
      }, 100);
    }

    function selectHome() {
      currentIndex = -1;
      cardDisplay.setAttribute("data-current-index", "-1");
      renderCard(homeBioData);

      spines.forEach(function (spine) {
        spine.classList.remove("active-spine");
        spine.setAttribute("aria-selected", "false");
      });
      fileNodes.forEach(function (node) {
        node.classList.remove("active");
      });
      if (homeNode) homeNode.classList.add("active-file");
    }

    function selectBook(index) {
      var data = projectsData[index];
      if (!data) return;
      currentIndex = index;
      cardDisplay.setAttribute("data-current-index", index.toString());

      renderCard(data);

      spines.forEach(function (spine, i) {
        var isMatch = (i === index);
        spine.classList.toggle("active-spine", isMatch);
        spine.setAttribute("aria-selected", isMatch ? "true" : "false");
      });

      fileNodes.forEach(function (node) {
        var nodeIndex = parseInt(node.getAttribute("data-book"), 10);
        node.classList.toggle("active", nodeIndex === index);
      });

      if (homeNode) homeNode.classList.remove("active-file");
    }

    spines.forEach(function (spine) {
      spine.addEventListener("click", function () {
        var index = parseInt(this.getAttribute("data-index"), 10);
        selectBook(index);
      });
      spine.addEventListener("mouseenter", function () {
        getAudioContext();
      });
    });

    fileNodes.forEach(function (node) {
      node.addEventListener("click", function () {
        var index = parseInt(node.getAttribute("data-book"), 10);
        selectBook(index);
      });
    });

    if (homeNode) {
      homeNode.addEventListener("click", selectHome);
    }

    sheetCards.forEach(function (card) {
      card.addEventListener("click", function () {
        var index = parseInt(this.getAttribute("data-select-book"), 10);
        closeProjectsSheet();
        selectBook(index);
      });
    });

    // Keyboard Arrow navigation
    window.addEventListener("keydown", function (e) {
      if (allProjectsOverlay && allProjectsOverlay.classList.contains("open")) {
        if (e.key === "Escape") closeProjectsSheet();
        return;
      }

      var cmdPalette = document.getElementById("cmd-palette-overlay");
      if (cmdPalette && cmdPalette.classList.contains("open")) return;

      var specsModalEl = document.getElementById("specs-modal-overlay");
      if (specsModalEl && specsModalEl.classList.contains("open")) return;

      if (e.key === "ArrowRight") {
        var nextIdx = currentIndex === -1 ? 0 : (currentIndex + 1) % projectsData.length;
        selectBook(nextIdx);
      } else if (e.key === "ArrowLeft") {
        var prevIdx = currentIndex <= 0 ? projectsData.length - 1 : currentIndex - 1;
        selectBook(prevIdx);
      }
    });

    // Interactive Category Filter Bar
    var deckFilterBtns = document.querySelectorAll(".deck-filter-btn");
    if (deckFilterBtns.length > 0) {
      deckFilterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var filter = this.getAttribute("data-filter") || "all";

          deckFilterBtns.forEach(function (b) { b.classList.remove("active"); });
          this.classList.add("active");
          playClickSound();

          var firstVisibleIdx = -1;
          spines.forEach(function (item) {
            var cat = item.getAttribute("data-category") || "";
            var matches = (filter === "all" || cat === filter);
            if (matches) {
              item.style.display = "flex";
              item.style.opacity = "1";
              item.style.transform = "translateY(0) scale(1)";
              var idx = parseInt(item.getAttribute("data-index"), 10);
              if (firstVisibleIdx === -1 && !isNaN(idx)) {
                firstVisibleIdx = idx;
              }
            } else {
              item.style.display = "none";
              item.style.opacity = "0";
              item.style.transform = "scale(0.95)";
            }
          });

          // If the currently selected card is hidden by filter, select the first visible matching card
          var curSpine = document.querySelector('.tech-deck-item[data-index="' + currentIndex + '"]');
          if (firstVisibleIdx !== -1 && (!curSpine || curSpine.style.display === "none")) {
            selectBook(firstVisibleIdx);
          }
        });
      });
    }

    // 3D Perspective Tilt on Central Workstation Stage
    cardDisplay.addEventListener("mousemove", function (e) {
      var rect = cardDisplay.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotX = ((y - centerY) / centerY) * -3.5;
      var rotY = ((x - centerX) / centerX) * 3.5;

      cardDisplay.style.transform = "perspective(1000px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg)";
    });

    cardDisplay.addEventListener("mouseleave", function () {
      cardDisplay.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

    // Smooth Scroll Button from Hero to Projects Workbench
    var scrollProjectsBtn = document.getElementById("btn-scroll-projects");
    if (scrollProjectsBtn) {
      scrollProjectsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var workbenchSection = document.getElementById("workbench-section");
        if (workbenchSection) {
          workbenchSection.scrollIntoView({ behavior: "smooth" });
          playSlideSound();
        }
      });
    }

    // Default to Project 0 (MineSafe-X) for instant high-tech interactive showcase
    selectBook(0);
  }

  /* ===================================================================
     12. TECHNICAL SPECS INSPECTOR & LIVE SIGNAL SIMULATOR MODAL
     ===================================================================== */
  var specsModal = document.getElementById("specs-modal-overlay");
  var closeSpecsBtn = document.getElementById("btn-close-specs-modal");
  var btnInspectSpecs = document.getElementById("btn-inspect-specs");
  var activeSimInterval = null;

  function renderSimulator(projectIdx, data) {
    var mount = document.getElementById("sim-mount-point");
    if (!mount) return;

    if (activeSimInterval) {
      clearInterval(activeSimInterval);
      activeSimInterval = null;
    }

    // 0: MineSafe-X
    if (projectIdx === 0) {
      mount.innerHTML =
        '<div class="sim-container">' +
          '<div class="sim-header-row">' +
            '<span class="sim-title">⚡ ESP-NOW Mesh & mmWave Radar Proximity Simulator</span>' +
            '<span class="sim-live-badge">ESP-NOW ACTIVE (CH 1)</span>' +
          '</div>' +
          '<div class="sim-controls-grid">' +
            '<div class="sim-control-box">' +
              '<div class="sim-control-label"><span>Distance to Forward Hauler</span><strong id="sim-dist-val">24.0 m</strong></div>' +
              '<input type="range" min="5" max="80" step="0.5" value="24" class="sim-slider" id="sim-dist-slider" />' +
            '</div>' +
            '<div class="sim-control-box">' +
              '<div class="sim-control-label"><span>Relative Closing Speed</span><strong id="sim-spd-val">36 km/h (10.0 m/s)</strong></div>' +
              '<input type="range" min="10" max="80" step="1" value="36" class="sim-slider" id="sim-spd-slider" />' +
            '</div>' +
          '</div>' +
          '<div class="sim-status-banner caution" id="sim-ttc-banner">' +
            '<span id="sim-ttc-text">ðŸŸ¡ CAUTION — CLOSING HAZARD PROXIMITY</span>' +
            '<span id="sim-ttc-math">TTC: 2.40s · Vector Closing</span>' +
          '</div>' +
          '<div class="sim-metrics-row">' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">ESP-NOW Latency</span><span class="sim-metric-val">2.8 ms</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Radar Frequency</span><span class="sim-metric-val">24.125 GHz</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Packets Broadcast</span><span class="sim-metric-val" id="sim-packets">142</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Cab Audible Alarm</span><span class="sim-metric-val" id="sim-alarm-val">Armed</span></div>' +
          '</div>' +
        '</div>';

      var distSlider = document.getElementById("sim-dist-slider");
      var spdSlider = document.getElementById("sim-spd-slider");
      var distVal = document.getElementById("sim-dist-val");
      var spdVal = document.getElementById("sim-spd-val");
      var banner = document.getElementById("sim-ttc-banner");
      var ttcText = document.getElementById("sim-ttc-text");
      var ttcMath = document.getElementById("sim-ttc-math");
      var alarmVal = document.getElementById("sim-alarm-val");
      var packetsVal = document.getElementById("sim-packets");
      var packetCount = 142;

      function updateMineSafeSim() {
        var d = parseFloat(distSlider.value);
        var sKmh = parseFloat(spdSlider.value);
        var sMs = sKmh / 3.6;
        var ttc = d / sMs;

        distVal.textContent = d.toFixed(1) + " m";
        spdVal.textContent = sKmh.toFixed(0) + " km/h (" + sMs.toFixed(1) + " m/s)";
        ttcMath.textContent = "TTC: " + ttc.toFixed(2) + "s · Vector Closing";

        banner.className = "sim-status-banner";
        if (ttc > 5.0) {
          banner.classList.add("safe");
          ttcText.textContent = "ðŸŸ¢ SAFE — MESH BEACON BROADCASTING (NORMAL)";
          if (alarmVal) alarmVal.textContent = "Standby";
        } else if (ttc >= 2.5) {
          banner.classList.add("caution");
          ttcText.textContent = "ðŸŸ¡ CAUTION — CLOSING HAZARD PROXIMITY ALERT";
          if (alarmVal) alarmVal.textContent = "Strobe Flashing";
        } else {
          banner.classList.add("danger");
          ttcText.textContent = "🔍´ CRITICAL HAZARD — 105dB CAB AUDIBLE BRAKE WARNING!";
          if (alarmVal) alarmVal.textContent = "EMERGENCY 105dB";
          playHazardAlert();
        }
      }

      distSlider.addEventListener("input", updateMineSafeSim);
      spdSlider.addEventListener("input", updateMineSafeSim);

      activeSimInterval = setInterval(function () {
        packetCount += 2;
        if (packetsVal) packetsVal.textContent = packetCount;
      }, 500);

    // 1: Traffic AI
    } else if (projectIdx === 1) {
      mount.innerHTML =
        '<div class="sim-container">' +
          '<div class="sim-header-row">' +
            '<span class="sim-title">📹 YOLOv8 Edge Vision & RTSP Feed Pipeline</span>' +
            '<span class="sim-live-badge">CUDA INFERENCE ACTIVE</span>' +
          '</div>' +
          '<div class="sim-cv-screen">' +
            '<div class="sim-cv-grid"></div>' +
            '<div class="sim-cv-bbox helmet">// #14 Motorbike [Helmet: 98.4%]</div>' +
            '<div class="sim-cv-bbox wrong-way">// #22 WRONG-WAY LANE [Alert 99.1%]</div>' +
            '<span style="position: absolute; bottom: 8px; left: 12px; font-family: var(--font-mono); font-size: 0.7rem; color: #38bdf8;">CAM_04 · NH-29 Junction Telemetry Feed</span>' +
          '</div>' +
          '<div class="sim-metrics-row">' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Inference Latency</span><span class="sim-metric-val" id="sim-fps-lat">55.1 ms</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Throughput</span><span class="sim-metric-val" id="sim-fps-val">24.8 FPS</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Resolution</span><span class="sim-metric-val">1080p RTSP</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Infractions</span><span class="sim-metric-val" id="sim-infractions">21</span></div>' +
          '</div>' +
        '</div>';

      var fpsVal = document.getElementById("sim-fps-val");
      var latVal = document.getElementById("sim-fps-lat");
      activeSimInterval = setInterval(function () {
        var fps = (24.2 + Math.random() * 1.5).toFixed(1);
        var lat = (54.0 + Math.random() * 4.2).toFixed(1);
        if (fpsVal) fpsVal.textContent = fps + " FPS";
        if (latVal) latVal.textContent = lat + " ms";
      }, 700);

    // 2: Ostero AI
    } else if (projectIdx === 2) {
      mount.innerHTML =
        '<div class="sim-container">' +
          '<div class="sim-header-row">' +
            '<span class="sim-title">🩺 Biomechanical Gait Kinematics & XGBoost Classifier</span>' +
            '<span class="sim-live-badge">BLE STREAM LINKED</span>' +
          '</div>' +
          '<div class="sim-controls-grid">' +
            '<div class="sim-control-box">' +
              '<div class="sim-control-label"><span>Knee Flexion Angle</span><strong id="sim-angle-val">64.0Â° (Normal Swing)</strong></div>' +
              '<input type="range" min="20" max="110" step="1" value="64" class="sim-slider" id="sim-angle-slider" />' +
            '</div>' +
            '<div class="sim-control-box">' +
              '<div class="sim-control-label"><span>Plantar Asymmetry</span><strong id="sim-plantar-val">8% Delta (Low Asymmetry)</strong></div>' +
              '<input type="range" min="0" max="40" step="1" value="8" class="sim-slider" id="sim-plantar-slider" />' +
            '</div>' +
          '</div>' +
          '<div class="sim-status-banner safe" id="sim-oa-banner">' +
            '<span>CLASSIFICATION: NORMAL / LOW EARLY-RISK (STAGE 0)</span>' +
            '<strong id="sim-oa-risk">Risk Score: 12.4%</strong>' +
          '</div>' +
          '<div class="sim-metrics-row">' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Classifier</span><span class="sim-metric-val">XGBoost ML</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Deep Vision</span><span class="sim-metric-val">DenseNet121</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Keypoints</span><span class="sim-metric-val">33 MediaPipe</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Edge Node</span><span class="sim-metric-val">ESP32 + IMU</span></div>' +
          '</div>' +
        '</div>';

      var angleSlider = document.getElementById("sim-angle-slider");
      var plantarSlider = document.getElementById("sim-plantar-slider");
      var angleVal = document.getElementById("sim-angle-val");
      var plantarVal = document.getElementById("sim-plantar-val");
      var oaBanner = document.getElementById("sim-oa-banner");
      var oaRisk = document.getElementById("sim-oa-risk");

      function updateOaSim() {
        var ang = parseFloat(angleSlider.value);
        var asym = parseFloat(plantarSlider.value);

        angleVal.textContent = ang.toFixed(0) + "Â° (" + (ang < 45 ? "Restricted Flexion" : "Normal Swing") + ")";
        plantarVal.textContent = asym.toFixed(0) + "% Delta (" + (asym > 20 ? "High Antalgic Compensation" : "Low Asymmetry") + ")";

        var risk = Math.min(100, Math.max(5, (asym * 1.8) + (ang < 50 ? (50 - ang) * 1.2 : 0) + 8)).toFixed(1);
        oaRisk.textContent = "Risk Score: " + risk + "%";

        oaBanner.className = "sim-status-banner";
        if (risk < 30) {
          oaBanner.classList.add("safe");
          oaBanner.firstElementChild.textContent = "CLASSIFICATION: NORMAL / LOW RISK (STAGE 0/1)";
        } else if (risk < 60) {
          oaBanner.classList.add("caution");
          oaBanner.firstElementChild.textContent = "CLASSIFICATION: MODERATE BIOMECHANICAL RISK (STAGE 2)";
        } else {
          oaBanner.classList.add("danger");
          oaBanner.firstElementChild.textContent = "CLASSIFICATION: HIGH OSTEOARTHRITIS INDICATORS (STAGE 3+)";
        }
      }

      angleSlider.addEventListener("input", updateOaSim);
      plantarSlider.addEventListener("input", updateOaSim);

    // 5: Ultrasonic Radar
    } else if (projectIdx === 5) {
      mount.innerHTML =
        '<div class="sim-container">' +
          '<div class="sim-header-row">' +
            '<span class="sim-title">📡 Ultrasonic ToF Ranging & Servo Sweep Radar</span>' +
            '<span class="sim-live-badge">COM4 9600 BAUD</span>' +
          '</div>' +
          '<div class="radar-canvas-wrap">' +
            '<canvas id="radar-canvas" class="radar-canvas" width="440" height="220"></canvas>' +
            '<div class="radar-telemetry-strip">' +
              '<span>Angle: <strong class="radar-telemetry-val" id="radar-angle">90Â°</strong></span>' +
              '<span>Echo: <strong class="radar-telemetry-val" id="radar-echo">1,280 Âµs</strong></span>' +
              '<span>Distance: <strong class="radar-telemetry-val" id="radar-dist">21.9 cm</strong></span>' +
            '</div>' +
          '</div>' +
          '<div style="display: flex; justify-content: space-between; align-items: center;">' +
            '<button type="button" class="quick-utility-btn highlight-btn" id="radar-ping-btn"><span>🔊 Trigger Sonar Ping</span></button>' +
            '<span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-faint);">Formula: Distance = (T_echo * 0.0343) / 2 cm</span>' +
          '</div>' +
        '</div>';

      var rCanvas = document.getElementById("radar-canvas");
      var angleOut = document.getElementById("radar-angle");
      var echoOut = document.getElementById("radar-echo");
      var distOut = document.getElementById("radar-dist");
      var pingBtn = document.getElementById("radar-ping-btn");

      if (pingBtn) {
        pingBtn.addEventListener("click", function () {
          playSonarPing();
        });
      }

      if (rCanvas) {
        var rCtx = rCanvas.getContext("2d");
        var sweepAngle = 15;
        var sweepDir = 1;
        var targets = [
          { angle: 45, dist: 28 },
          { angle: 85, dist: 16 },
          { angle: 135, dist: 35 }
        ];

        function drawRadar() {
          var cw = rCanvas.width;
          var ch = rCanvas.height;
          var cx = cw / 2;
          var cy = ch - 15;
          var radius = Math.min(cw / 2 - 20, ch - 30);

          rCtx.fillStyle = "rgba(3, 8, 6, 0.25)";
          rCtx.fillRect(0, 0, cw, ch);

          // Rings
          rCtx.strokeStyle = "rgba(16, 185, 129, 0.25)";
          rCtx.lineWidth = 1;
          for (var r = 1; r <= 3; r++) {
            rCtx.beginPath();
            rCtx.arc(cx, cy, (radius / 3) * r, Math.PI, 0);
            rCtx.stroke();
          }

          // Angle lines (30, 60, 90, 120, 150)
          var angles = [30, 60, 90, 120, 150];
          angles.forEach(function (ang) {
            var rad = (ang * Math.PI) / 180;
            var lx = cx - radius * Math.cos(rad);
            var ly = cy - radius * Math.sin(rad);
            rCtx.beginPath();
            rCtx.moveTo(cx, cy);
            rCtx.lineTo(lx, ly);
            rCtx.stroke();
          });

          // Sweep Beam
          var radBeam = (sweepAngle * Math.PI) / 180;
          var bx = cx - radius * Math.cos(radBeam);
          var by = cy - radius * Math.sin(radBeam);

          rCtx.beginPath();
          rCtx.moveTo(cx, cy);
          rCtx.lineTo(bx, by);
          rCtx.strokeStyle = "rgba(52, 211, 153, 0.85)";
          rCtx.lineWidth = 2.2;
          rCtx.stroke();

          // Targets
          targets.forEach(function (tgt) {
            var tRad = (tgt.angle * Math.PI) / 180;
            var tr = (tgt.dist / 50) * radius;
            var tx = cx - tr * Math.cos(tRad);
            var ty = cy - tr * Math.sin(tRad);

            var diff = Math.abs(sweepAngle - tgt.angle);
            if (diff < 5) {
              rCtx.beginPath();
              rCtx.arc(tx, ty, 6, 0, Math.PI * 2);
              rCtx.fillStyle = "#ef4444";
              rCtx.shadowColor = "#ef4444";
              rCtx.shadowBlur = 10;
              rCtx.fill();
              rCtx.shadowBlur = 0;
            } else {
              rCtx.beginPath();
              rCtx.arc(tx, ty, 3.5, 0, Math.PI * 2);
              rCtx.fillStyle = "rgba(52, 211, 153, 0.45)";
              rCtx.fill();
            }
          });

          // Telemetry updates
          sweepAngle += sweepDir * 1.5;
          if (sweepAngle >= 165) sweepDir = -1;
          if (sweepAngle <= 15) sweepDir = 1;

          var curDist = 42;
          targets.forEach(function (tgt) {
            if (Math.abs(sweepAngle - tgt.angle) < 8) {
              curDist = tgt.dist;
            }
          });

          var echoTime = Math.round((curDist * 2) / 0.0343);
          if (angleOut) angleOut.textContent = Math.round(sweepAngle) + "Â°";
          if (echoOut) echoOut.textContent = echoTime + " Âµs";
          if (distOut) distOut.textContent = curDist.toFixed(1) + " cm";
        }

        activeSimInterval = setInterval(drawRadar, 40);
      }

    // Default / Other Projects (RC Vehicle, Drone, BLW, Home)
    } else {
      mount.innerHTML =
        '<div class="sim-container">' +
          '<div class="sim-header-row">' +
            '<span class="sim-title">âš™ï¸ ' + data.title + ' — Architecture & Fieldwork Telemetry</span>' +
            '<span class="sim-live-badge">VERIFIED BUILD</span>' +
          '</div>' +
          '<div class="sim-status-banner safe">' +
            '<span>STATUS: ' + data.status + '</span>' +
            '<span>Domain: ' + (data.specs ? data.specs.domain : "Electrical Engineering") + '</span>' +
          '</div>' +
          '<div class="sim-metrics-row">' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Key Protocol</span><span class="sim-metric-val">' + data.tags[0] + '</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Core Platform</span><span class="sim-metric-val">' + data.tags[1] + '</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Academic Base</span><span class="sim-metric-val">NIT Nagaland</span></div>' +
            '<div class="sim-metric-cell"><span class="sim-metric-label">Documentation</span><span class="sim-metric-val">Ready ↗</span></div>' +
          '</div>' +
        '</div>';
    }
  }

  function openSpecsModal(data, index) {
    if (!specsModal || !data) return;

    var projectIdx = (typeof index === "number") ? index : 0;

    var specs = data.specs || {
      domain: "Engineering Systems",
      photo: "images/profile_photo.jpeg",
      arch: data.summary,
      hardware: "Microcontrollers, Sensors & Actuators",
      software: data.tags ? data.tags.join(", ") : "C, Python",
      metrics: "Verified and operational"
    };

    var titleEl = document.getElementById("specs-title");
    var domainEl = document.getElementById("specs-domain");
    var photoEl = document.getElementById("specs-photo");
    var archEl = document.getElementById("specs-arch");
    var hwEl = document.getElementById("specs-hardware");
    var swEl = document.getElementById("specs-software");
    var metEl = document.getElementById("specs-metrics");

    if (titleEl) titleEl.textContent = data.title;
    if (domainEl) domainEl.textContent = specs.domain;
    if (photoEl) photoEl.src = specs.photo;
    if (archEl) archEl.textContent = specs.arch;
    if (hwEl) hwEl.textContent = specs.hardware;
    if (swEl) swEl.textContent = specs.software;
    if (metEl) metEl.textContent = specs.metrics;

    // Interactive Gallery Switcher inside specs modal
    var thumbsEl = document.getElementById("specs-gallery-thumbs");
    if (thumbsEl) {
      thumbsEl.innerHTML = "";
      if (data.gallery && data.gallery.length > 1) {
        data.gallery.forEach(function (imgSrc, gIdx) {
          var thumbBtn = document.createElement("button");
          thumbBtn.type = "button";
          thumbBtn.className = "specs-gallery-thumb" + (imgSrc === specs.photo ? " active" : "");
          thumbBtn.title = "View Screenshot " + (gIdx + 1);
          thumbBtn.innerHTML = '<img src="' + imgSrc + '" alt="Thumbnail ' + (gIdx + 1) + '" />';
          thumbBtn.addEventListener("click", function () {
            if (photoEl) photoEl.src = imgSrc;
            thumbsEl.querySelectorAll(".specs-gallery-thumb").forEach(function (tb) {
              tb.classList.remove("active");
            });
            thumbBtn.classList.add("active");
            playClickSound();
          });
          thumbsEl.appendChild(thumbBtn);
        });
        thumbsEl.style.display = "flex";
      } else {
        thumbsEl.style.display = "none";
      }
    }

    // Tabs reset
    var tabBtns = specsModal.querySelectorAll(".specs-tab-btn");
    var paneSpecs = document.getElementById("pane-specs");
    var paneSim = document.getElementById("pane-sim");

    tabBtns.forEach(function (b) {
      b.classList.remove("active");
      if (b.getAttribute("data-tab") === "specs") b.classList.add("active");
    });

    if (paneSpecs) paneSpecs.style.display = "block";
    if (paneSim) paneSim.style.display = "none";

    renderSimulator(projectIdx, data);

    // Optional Drive button in specs modal
    var existingDriveAction = specsModal.querySelector(".specs-modal-actions .card-btn-drive");
    if (existingDriveAction) existingDriveAction.remove();

    if (data.driveLink) {
      var modalActions = specsModal.querySelector(".specs-modal-actions");
      if (modalActions) {
        var driveActionBtn = document.createElement("a");
        driveActionBtn.className = "card-btn card-btn-drive";
        driveActionBtn.href = data.driveLink;
        driveActionBtn.target = "_blank";
        driveActionBtn.rel = "noopener";
        driveActionBtn.innerHTML = '<span>Open on Google Drive ↗</span>';
        modalActions.appendChild(driveActionBtn);
      }
    }

    specsModal.classList.add("open");
    playSlideSound();
  }

  function closeSpecsModal() {
    if (specsModal) {
      specsModal.classList.remove("open");
      if (activeSimInterval) {
        clearInterval(activeSimInterval);
        activeSimInterval = null;
      }
      playClickSound();
    }
  }

  // Tab switching in specs modal
  document.addEventListener("click", function (e) {
    var tabBtn = e.target.closest(".specs-tab-btn");
    if (tabBtn && specsModal && specsModal.classList.contains("open")) {
      var tabKey = tabBtn.getAttribute("data-tab");
      var allTabs = specsModal.querySelectorAll(".specs-tab-btn");
      var paneSpecs = document.getElementById("pane-specs");
      var paneSim = document.getElementById("pane-sim");

      allTabs.forEach(function (b) { b.classList.toggle("active", b === tabBtn); });

      if (tabKey === "specs") {
        if (paneSpecs) paneSpecs.style.display = "block";
        if (paneSim) paneSim.style.display = "none";
      } else {
        if (paneSpecs) paneSpecs.style.display = "none";
        if (paneSim) paneSim.style.display = "block";
      }
      playClickSound();
    }
  });

  if (btnInspectSpecs) {
    btnInspectSpecs.addEventListener("click", function () {
      var activeIndex = currentIndex;
      var activeData = (activeIndex >= 0 && activeIndex < projectsData.length)
        ? projectsData[activeIndex]
        : (activeIndex === -1 ? homeBioData : projectsData[0]);
      openSpecsModal(activeData, activeIndex);
    });
  }

  if (closeSpecsBtn) {
    closeSpecsBtn.addEventListener("click", closeSpecsModal);
  }

  if (specsModal) {
    specsModal.addEventListener("click", function (e) {
      if (e.target === specsModal) closeSpecsModal();
    });
  }

  /* ===================================================================
     13. COMMAND PALETTE CONTROLLER (Ctrl+K / ⌘K)
     ===================================================================== */
  var cmdCommands = [
    // Pages
    { cat: "Pages", title: "home.jsx", desc: "Interactive Developer Portfolio & Engineering Workbench", icon: "⚡", url: "index.html" },
    { cat: "Pages", title: "curriculum-vitae.md", desc: "Complete ATS-Verified Engineering CV", icon: "📄", url: "cv.html" },
    { cat: "Pages", title: "about.md", desc: "Biography, Academic Background & Coursework", icon: "📖", url: "about.html" },
    { cat: "Pages", title: "toolkit.jsx", desc: "Technical Skills, Microcontrollers & Frameworks", icon: "🛠️", url: "skills.html" },
    { cat: "Pages", title: "gallery.jsx", desc: "All Engineered Projects & Field Photos", icon: "📂", url: "projects.html" },
    { cat: "Pages", title: "experience.md", desc: "BLW Varanasi Industrial Training & Leadership", icon: "🏭", url: "experience.html" },
    { cat: "Pages", title: "contact.jsx", desc: "Direct Channels, Email & Inquiry Form", icon: "✉️", url: "contact.html" },

    // Projects
    { cat: "Engineered Projects", title: "MineSafe-X – Making Mining Transport Safer", desc: "Team Colliders · V2V/V2I Collision Avoidance & ESP-NOW", icon: "🚨", bookIndex: 0, url: "projects.html" },
    { cat: "Engineered Projects", title: "Traffic Violation Detection System", desc: "YOLOv8, EasyOCR & AI Traffic Assistant", icon: "📹", bookIndex: 1, url: "projects.html" },
    { cat: "Engineered Projects", title: "AI-Based Osteoarthritis Screening", desc: "Multimodal OA Screening (NER) · 4 Languages & Offline", icon: "🩺", bookIndex: 2, url: "projects.html" },
    { cat: "Engineered Projects", title: "High-Current Dual H-Bridge RC Vehicle", desc: "4WD Robotics Chassis & Power Isolation", icon: "🚗", bookIndex: 3, url: "projects.html" },
    { cat: "Engineered Projects", title: "F450 Multirotor UAV Platform", desc: "Aerial Quadcopter & KK2.1.5 PID Avionics", icon: "🚁", bookIndex: 4, url: "projects.html" },
    { cat: "Engineered Projects", title: "Ultrasonic Spatial Radar Bench", desc: "Acoustic ToF Ranging & UART Servo Sweep", icon: "📡", bookIndex: 5, url: "projects.html" },
    { cat: "Engineered Projects", title: "Contact Management System", desc: "Python & JSON Structured CLI Application", icon: "📋", bookIndex: 6, url: "projects.html" },
    { cat: "Engineered Projects", title: "Python Adventure Game", desc: "Interactive Choice-Driven Narrative Engine", icon: "🎮", bookIndex: 7, url: "projects.html" },

    // Actions
    { cat: "Quick Actions", title: "Cycle Theme (Dark / Light / Anime / Warm)", desc: "Switch between Cyber-Dark, Clean Studio, Cyber-Anime & Warm Sunset", icon: "🎨", action: "toggle_theme" },
    { cat: "Quick Actions", title: "Toggle Synthesizer Sound", desc: "Mute or enable interactive Web Audio effects", icon: "🔊", action: "toggle_sound" },
    { cat: "Quick Actions", title: "Download Résumé PDF", desc: "Open Navnit_Kumar_Resume.pdf (292 KB)", icon: "📥", url: "resume/Navnit_Kumar_Resume.pdf", external: true },
    { cat: "Quick Actions", title: "Copy Email Address", desc: "nkmaurya934124@gmail.com", icon: "📧", action: "copy_email" },
    { cat: "Quick Actions", title: "Copy Contact Phone", desc: "+91 93412 40119", icon: "📞", action: "copy_phone" },
    { cat: "Quick Actions", title: "Open GitHub Profile", desc: "github.com/navnit919", icon: "🐙", url: "https://github.com/navnit919", external: true },
    { cat: "Quick Actions", title: "Open LinkedIn Profile", desc: "linkedin.com/in/navnit-kumar-72b470330", icon: "💼", url: "https://linkedin.com/in/navnit-kumar-72b470330", external: true }
  ];

  var cmdPaletteOverlay = document.getElementById("cmd-palette-overlay");
  if (!cmdPaletteOverlay) {
    cmdPaletteOverlay = document.createElement("div");
    cmdPaletteOverlay.id = "cmd-palette-overlay";
    cmdPaletteOverlay.className = "cmd-palette-overlay";
    cmdPaletteOverlay.setAttribute("aria-hidden", "true");
    cmdPaletteOverlay.innerHTML =
      '<div class="cmd-palette-modal" id="cmd-palette-modal">' +
        '<div class="cmd-palette-search-wrap">' +
          '<span class="cmd-palette-icon">🔍</span>' +
          '<input type="text" class="cmd-palette-input" id="cmd-palette-input" placeholder="Jump to project, page, skill, or run action..." autocomplete="off" />' +
          '<span class="cmd-esc-chip">ESC</span>' +
        '</div>' +
        '<div class="cmd-palette-results" id="cmd-palette-results"></div>' +
        '<div class="cmd-palette-footer">' +
          '<span><kbd>↑‘</kbd> <kbd>↑“</kbd> navigate</span>' +
          '<span><kbd>↑µ</kbd> select</span>' +
          '<span><kbd>esc</kbd> close</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(cmdPaletteOverlay);
  }

  var cmdInput = document.getElementById("cmd-palette-input");
  var cmdResults = document.getElementById("cmd-palette-results");
  var cmdSelectedIndex = 0;
  var filteredCmds = [];

  function renderCmdResults(query) {
    var q = (query || "").toLowerCase().trim();
    filteredCmds = cmdCommands.filter(function (cmd) {
      if (!q) return true;
      return cmd.title.toLowerCase().indexOf(q) !== -1 ||
             cmd.desc.toLowerCase().indexOf(q) !== -1 ||
             cmd.cat.toLowerCase().indexOf(q) !== -1;
    });

    cmdSelectedIndex = 0;
    cmdResults.innerHTML = "";

    if (filteredCmds.length === 0) {
      cmdResults.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-faint); font-family: var(--font-mono); font-size: 0.82rem;">No matching commands found.</div>';
      return;
    }

    var lastCat = "";
    filteredCmds.forEach(function (cmd, idx) {
      if (cmd.cat !== lastCat) {
        var catHeader = document.createElement("div");
        catHeader.className = "cmd-category-title";
        catHeader.textContent = "// " + cmd.cat;
        cmdResults.appendChild(catHeader);
        lastCat = cmd.cat;
      }

      var item = document.createElement("div");
      item.className = "cmd-item" + (idx === 0 ? " selected" : "");
      item.setAttribute("data-cmd-idx", idx.toString());

      item.innerHTML =
        '<div class="cmd-item-left">' +
          '<span class="cmd-item-icon">' + cmd.icon + '</span>' +
          '<div class="cmd-item-text">' +
            '<span class="cmd-item-title">' + cmd.title + '</span>' +
            '<span class="cmd-item-desc">' + cmd.desc + '</span>' +
          '</div>' +
        '</div>' +
        '<span class="cmd-item-tag">' + (cmd.url ? "Link ↗" : "Action") + '</span>';

      item.addEventListener("click", function () {
        executeCmd(cmd);
      });

      cmdResults.appendChild(item);
    });
  }

  function updateCmdSelection(newIdx) {
    var items = cmdResults.querySelectorAll(".cmd-item");
    if (items.length === 0) return;

    if (newIdx < 0) newIdx = items.length - 1;
    if (newIdx >= items.length) newIdx = 0;
    cmdSelectedIndex = newIdx;

    items.forEach(function (el, i) {
      el.classList.toggle("selected", i === cmdSelectedIndex);
      if (i === cmdSelectedIndex) {
        el.scrollIntoView({ block: "nearest" });
      }
    });
  }

  function executeCmd(cmd) {
    closeCmdPalette();
    playClickSound();

    if (cmd.action === "toggle_theme") {
      cycleTheme();
    } else if (cmd.action === "toggle_sound") {
      audioMuted = !audioMuted;
      try { localStorage.setItem("navnit_portfolio_muted", audioMuted.toString()); } catch(e) {}
      updateSoundUI();
      showToast(audioMuted ? "Audio muted" : "Audio synthesizer enabled");
    } else if (cmd.action === "copy_email") {
      navigator.clipboard.writeText("nkmaurya934124@gmail.com").then(function () {
        showToast("Copied: nkmaurya934124@gmail.com");
      });
    } else if (cmd.action === "copy_phone") {
      navigator.clipboard.writeText("+919341240119").then(function () {
        showToast("Copied: +91 93412 40119");
      });
    } else if (typeof cmd.bookIndex === "number" && window.location.pathname.indexOf("index.html") !== -1 && cardDisplay) {
      var spines = document.querySelectorAll(".book-spine");
      if (spines[cmd.bookIndex]) {
        spines[cmd.bookIndex].click();
        showToast("Expanded: " + cmd.title);
      }
    } else if (cmd.url) {
      if (cmd.external) {
        window.open(cmd.url, "_blank");
      } else {
        window.location.href = cmd.url;
      }
    }
  }

  function openCmdPalette() {
    if (cmdPaletteOverlay) {
      cmdPaletteOverlay.classList.add("open");
      cmdInput.value = "";
      renderCmdResults("");
      playSlideSound();
      setTimeout(function () {
        cmdInput.focus();
      }, 50);
    }
  }

  function closeCmdPalette() {
    if (cmdPaletteOverlay) {
      cmdPaletteOverlay.classList.remove("open");
      playClickSound();
    }
  }

  if (cmdInput) {
    cmdInput.addEventListener("input", function () {
      renderCmdResults(this.value);
    });

    cmdInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        updateCmdSelection(cmdSelectedIndex + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        updateCmdSelection(cmdSelectedIndex - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCmds[cmdSelectedIndex]) {
          executeCmd(filteredCmds[cmdSelectedIndex]);
        }
      } else if (e.key === "Escape") {
        closeCmdPalette();
      }
    });
  }

  if (cmdPaletteOverlay) {
    cmdPaletteOverlay.addEventListener("click", function (e) {
      if (e.target === cmdPaletteOverlay) closeCmdPalette();
    });
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".cmd-palette-trigger");
    if (trigger) {
      openCmdPalette();
    }
  });

  // Global Keyboard Shortcuts (⌘K / Ctrl+K and ESC)
  window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdPaletteOverlay && cmdPaletteOverlay.classList.contains("open")) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    } else if (e.key === "Escape") {
      if (cmdPaletteOverlay && cmdPaletteOverlay.classList.contains("open")) {
        closeCmdPalette();
      } else if (specsModal && specsModal.classList.contains("open")) {
        closeSpecsModal();
      } else if (allProjectsOverlay && allProjectsOverlay.classList.contains("open")) {
        closeProjectsSheet();
      } else if (sidebar && sidebar.classList.contains("mobile-open")) {
        toggleMobileDrawer(false);
      }
    }
  });

  /* ===================================================================
     14. IMAGE LIGHTBOX (On projects.html)
     ===================================================================== */
  var lightbox = document.getElementById("lightbox-modal");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxBackdrop = document.getElementById("lightbox-backdrop");

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    playSlideSound();
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("open");
      playClickSound();
    }
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  var lightboxTriggers = document.querySelectorAll(".lightbox-trigger");
  lightboxTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var src = this.getAttribute("data-src") || this.src;
      var caption = this.getAttribute("data-caption") || this.alt || "";
      openLightbox(src, caption);
    });
  });

  /* ===================================================================
     15. CATEGORY FILTER (On projects.html)
     ===================================================================== */
  var filterPills = document.querySelectorAll(".filter-pill[data-filter]");
  var projectCards = document.querySelectorAll(".project-card[data-category]");

  if (filterPills.length > 0 && projectCards.length > 0) {
    filterPills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        filterPills.forEach(function (p) { p.classList.remove("active"); });
        this.classList.add("active");
        playClickSound();

        var filter = this.getAttribute("data-filter");
        projectCards.forEach(function (card) {
          var cardCat = card.getAttribute("data-category");
          if (filter === "all" || cardCat === filter) {
            card.style.display = "flex";
            card.style.opacity = "0";
            setTimeout(function () { card.style.opacity = "1"; }, 10);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* ===================================================================
     16. SKILLS SEARCH & FILTER (On skills.html)
     ===================================================================== */
  var skillSearchInput = document.getElementById("skill-search-input");
  var detailedSkillCards = document.querySelectorAll(".detailed-skill-card");

  if (skillSearchInput && detailedSkillCards.length > 0) {
    skillSearchInput.addEventListener("input", function () {
      var query = this.value.toLowerCase().trim();
      var matchCount = 0;

      detailedSkillCards.forEach(function (card) {
        var keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
        var cardText = card.textContent.toLowerCase();

        if (query === "" || keywords.indexOf(query) !== -1 || cardText.indexOf(query) !== -1) {
          card.style.display = "";
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
          matchCount++;
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
        }
      });
    });
  }

  /* ===================================================================
     17. COPY CONTACT BUTTONS & TOPIC QUICK CHIPS (On contact.html)
     ===================================================================== */
  var copyContactBtn = document.getElementById("btn-copy-contact");
  if (copyContactBtn) {
    copyContactBtn.addEventListener("click", function () {
      var text = "Navnit Kumar | nkmaurya934124@gmail.com | +91 93412 40119";
      navigator.clipboard.writeText(text).then(function () {
        var copyBtnText = document.getElementById("copy-btn-text");
        if (copyBtnText) copyBtnText.textContent = "Copied! ✓";
        showToast("Contact details copied to clipboard!");
        setTimeout(function () {
          if (copyBtnText) copyBtnText.textContent = "Copy Contact";
        }, 2500);
      });
    });
  }

  var miniCopyBtns = document.querySelectorAll(".btn-copy-mini");
  miniCopyBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var textToCopy = this.getAttribute("data-copy");
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          showToast("Copied: " + textToCopy);
        });
      }
    });
  });

  // Topic Quick Chips
  var topicChips = document.querySelectorAll(".topic-chip");
  var msgTextarea = document.getElementById("cf-msg");
  if (topicChips.length > 0 && msgTextarea) {
    topicChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        topicChips.forEach(function (c) { c.classList.remove("active"); });
        this.classList.add("active");
        playClickSound();

        var template = this.getAttribute("data-template") || "";
        msgTextarea.value = template;
        msgTextarea.focus();
        showToast("Message template loaded");
      });
    });
  }

  /* ===================================================================
     18. CONTACT FORM SUBMISSION
     ===================================================================== */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("cf-name").value || "").trim();
      var email = (document.getElementById("cf-email").value || "").trim();
      var msg = (document.getElementById("cf-msg").value || "").trim();

      var subject = encodeURIComponent("Engineering Collaboration Inquiry from " + (name || "Peer"));
      var body = encodeURIComponent(msg + "\n\n— " + name + (email ? " (" + email + ")" : ""));
      window.location.href = "mailto:nkmaurya934124@gmail.com?subject=" + subject + "&body=" + body;

      if (note) note.textContent = "Opening your default email client...";
      showToast("Redirecting to email client...");
    });
  }

  /* ===================================================================
     19. HERO CIRCUIT & NEURAL NETWORK PARTICLE CANVAS
     =================================================================== */
  (function initHeroCircuitCanvas() {
    var canvas = document.getElementById("hero-circuit-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var particles = [];
    var particleCount = 45;
    var maxDist = 115;
    var mouse = { x: -1000, y: -1000, radius: 140 };
    var heroSection = canvas.closest(".portfolio-hero-section") || canvas.parentElement;

    function resizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function createParticles() {
      particles = [];
      var rect = canvas.getBoundingClientRect();
      var w = rect.width || 900;
      var h = rect.height || 420;

      for (var i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.65,
          vy: (Math.random() - 0.5) * 0.65,
          radius: Math.random() * 2 + 1.2,
          isCyan: Math.random() > 0.35,
          alpha: Math.random() * 0.45 + 0.35
        });
      }
    }

    function draw() {
      var rect = canvas.getBoundingClientRect();
      var w = rect.width;
      var h = rect.height;

      ctx.clearRect(0, 0, w, h);

      var theme = document.documentElement.getAttribute("data-theme") || currentTheme || "light";
      var color1, color2, lineColorBase, mouseLineBase;

      if (theme === "anime") {
        color1 = "255, 42, 133";
        color2 = "0, 245, 255";
        lineColorBase = "255, 42, 133";
        mouseLineBase = "0, 245, 255";
      } else if (theme === "warm") {
        color1 = "234, 88, 12";
        color2 = "245, 158, 11";
        lineColorBase = "217, 119, 6";
        mouseLineBase = "234, 88, 12";
      } else if (theme === "dark") {
        color1 = "56, 189, 248";
        color2 = "129, 140, 248";
        lineColorBase = "56, 189, 248";
        mouseLineBase = "56, 189, 248";
      } else {
        color1 = "2, 132, 199";
        color2 = "56, 189, 248";
        lineColorBase = "2, 132, 199";
        mouseLineBase = "2, 132, 199";
      }

      for (var i = 0; i < particles.length; i++) {
        var p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (theme === "anime") {
          p1.x += Math.sin(p1.y * 0.02) * 0.35;
          p1.y += 0.22;
          if (p1.y > h) p1.y = 0;
        } else if (theme === "warm") {
          p1.x += Math.cos(p1.y * 0.02) * 0.25;
          p1.y -= 0.18;
          if (p1.y < 0) p1.y = h;
        }

        if (p1.x < 0 || p1.x > w) p1.vx *= -1;
        if (p1.y < 0 || p1.y > h) p1.vy *= -1;

        // Mouse interaction
        var dxMouse = mouse.x - p1.x;
        var dyMouse = mouse.y - p1.y;
        var distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 0) {
          var force = (mouse.radius - distMouse) / mouse.radius;
          p1.x -= (dxMouse / distMouse) * force * 1.6;
          p1.y -= (dyMouse / distMouse) * force * 1.6;

          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = "rgba(" + mouseLineBase + ", " + (0.4 * force) + ")";
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.isCyan
          ? "rgba(" + color1 + ", " + p1.alpha + ")"
          : "rgba(" + color2 + ", " + p1.alpha + ")";
        ctx.fill();

        // Connect nearby nodes
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p1.x - p2.x;
          var dy = p1.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            var lineAlpha = (1 - dist / maxDist) * 0.26;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(" + lineColorBase + ", " + lineAlpha + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resizeCanvas();
    createParticles();
    requestAnimationFrame(draw);

    window.addEventListener("resize", function () {
      resizeCanvas();
      createParticles();
    });

    if (heroSection) {
      heroSection.addEventListener("mousemove", function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      heroSection.addEventListener("mouseleave", function () {
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }
  })();

  /* ===================================================================
     20. DYNAMIC HERO ROLE TYPEWRITER
     =================================================================== */
  (function initHeroTypewriter() {
    var target = document.getElementById("typing-hero-role");
    if (!target) return;

    var roles = [
      "High-Voltage Electrical Infrastructure",
      "Real-Time Edge AI & Vision (55.1ms YOLOv8)",
      "Low-Latency Embedded Mesh (<5ms ESP-NOW)",
      "Autonomous Multirotor UAVs & Flight Avionics",
      "Locomotive Traction Power Systems (33kV MRS)",
      "Multimodal OA Risk Screening AI (NER)"
    ];

    var roleIdx = 0;
    var charIdx = 0;
    var isDeleting = false;
    var typeSpeed = 50;
    var deleteSpeed = 22;
    var holdDelay = 2200;

    function tick() {
      var currentRole = roles[roleIdx];

      if (!isDeleting) {
        charIdx++;
        target.textContent = currentRole.substring(0, charIdx);

        if (charIdx === currentRole.length) {
          isDeleting = true;
          setTimeout(tick, holdDelay);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        charIdx--;
        target.textContent = currentRole.substring(0, charIdx);

        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }

    setTimeout(tick, 600);
  })();

  /* ===================================================================
     21. 3D INTERACTIVE PROFILE CARD PERSPECTIVE TILT & CHIP PARALLAX
     =================================================================== */
  (function initProfileCardTilt() {
    var card = document.getElementById("hero-profile-card");
    if (!card) return;

    var parentCol = card.closest(".hero-identity-column") || card.parentElement;
    var chips = card.querySelectorAll(".floating-chip");

    parentCol.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotX = ((y - centerY) / centerY) * -12;
      var rotY = ((x - centerX) / centerX) * 12;

      card.style.transform = "perspective(900px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg)";

      chips.forEach(function (chip, idx) {
        var depth = (idx + 1) * 8;
        var moveX = ((x - centerX) / centerX) * depth;
        var moveY = ((y - centerY) / centerY) * depth;
        chip.style.transform = "translate3d(" + moveX.toFixed(1) + "px, " + moveY.toFixed(1) + "px, 20px)";
      });
    });

    parentCol.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      chips.forEach(function (chip) {
        chip.style.transform = "translate3d(0, 0, 0)";
      });
    });
  })();

  /* ===================================================================
     22. ANIMATED TELEMETRY COUNTER ENGINE
     =================================================================== */
  (function initTelemetryCounters() {
    var strip = document.getElementById("stats-counter-strip");
    if (!strip) return;

    var counterEls = strip.querySelectorAll(".telemetry-num[data-target]");
    if (counterEls.length === 0) return;

    var hasAnimated = false;

    function animateCounters() {
      if (hasAnimated) return;
      hasAnimated = true;

      counterEls.forEach(function (el) {
        var targetVal = parseFloat(el.getAttribute("data-target"));
        var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";

        if (isNaN(targetVal)) return;

        var duration = 1600;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease-out cubic
          var easeProgress = 1 - Math.pow(1 - progress, 3);
          var currentVal = easeProgress * targetVal;

          el.textContent = prefix + currentVal.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = prefix + targetVal.toFixed(decimals) + suffix;
          }
        }

        requestAnimationFrame(step);
      });
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });

      observer.observe(strip);
    } else {
      setTimeout(animateCounters, 300);
    }
  })();

  /* ===================================================================
     23. DYNAMIC SCROLL REVEAL OBSERVER
     =================================================================== */
  (function initScrollReveal() {
    var targets = document.querySelectorAll(
      ".bento-pillar-card, .award-card, .skill-card, .honors-grid article, .bento-workstation-stage, .tech-deck-section, .home-connect-banner, .specs-block"
    );
    if (targets.length === 0) return;

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

      targets.forEach(function (el, idx) {
        el.classList.add("reveal-on-scroll");
        if (idx % 4 === 1) el.classList.add("reveal-delay-1");
        else if (idx % 4 === 2) el.classList.add("reveal-delay-2");
        else if (idx % 4 === 3) el.classList.add("reveal-delay-3");
        revealObserver.observe(el);
      });
    } else {
      targets.forEach(function (el) {
        el.classList.add("revealed");
      });
    }
  })();

  /* ===================================================================
     24. ANIMATED SKILL METER BARS ON SCROLL (skills.html)
     =================================================================== */
  (function initSkillMeterBars() {
    var meterFills = document.querySelectorAll(".meter-bar-fill");
    if (meterFills.length === 0) return;

    meterFills.forEach(function (bar) {
      var targetWidth = bar.style.width || "75%";
      bar.setAttribute("data-target-width", targetWidth);
      bar.style.width = "0%";
      bar.style.transition = "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
    });

    if ("IntersectionObserver" in window) {
      var meterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var fills = entry.target.querySelectorAll(".meter-bar-fill");
            fills.forEach(function (bar) {
              var w = bar.getAttribute("data-target-width");
              if (w) bar.style.width = w;
            });
            meterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      var skillCards = document.querySelectorAll(".skill-card, .detailed-skill-card");
      skillCards.forEach(function (card) {
        meterObserver.observe(card);
      });
    } else {
      meterFills.forEach(function (bar) {
        var w = bar.getAttribute("data-target-width");
        if (w) bar.style.width = w;
      });
    }
  })();

  /* ===================================================================
     18. ADVANCED CONVERSATIONAL NAVNIT-AI CHATBOT (FULL KNOWLEDGE BASE)
     =================================================================== */
  function initNavnitChatbot() {
    if (document.getElementById("navnit-ai-assistant-toggle")) return;

    // Inject AI Assistant floating button
    const floatingBtn = document.createElement("button");
    floatingBtn.className = "chatbot-widget-btn";
    floatingBtn.id = "navnit-ai-assistant-toggle"; // Change ID to evade adblockers
    floatingBtn.setAttribute("style", "position: fixed; bottom: 2.5rem; right: 2.5rem; z-index: 999999; background: #38bdf8; color: #fff; padding: 1rem 1.6rem; border-radius: 40px; border: 2px solid #000; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem; box-shadow: 4px 4px 0 #000;");
    floatingBtn.setAttribute("title", "Chat with Navnit-AI Assistant");
    floatingBtn.setAttribute("type", "button");
    floatingBtn.innerHTML = '<span class="widget-icon" style="font-size: 1.5rem;">🤖</span><span class="widget-text">Navnit AI</span><span class="pulse-dot"></span>';
    document.body.appendChild(floatingBtn);

    // Inject Chatbot Sidebar HTML
    const chatbotWrapper = document.createElement("div");
    chatbotWrapper.id = "chatbot-container-wrapper";
    chatbotWrapper.innerHTML = `
      <div class="chatbot-overlay" id="chatbot-overlay"></div>
      <div class="chatbot-sidebar" id="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="bot-avatar-badge">⚡</div>
            <div>
              <h3>Navnit-AI Assistant</h3>
              <span class="bot-status-sub"><span class="status-dot-mini"></span> Online · Ask me anything!</span>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button type="button" class="chatbot-action-icon-btn" id="chatbot-clear-btn" title="Clear Chat History">🗑️</button>
            <button type="button" class="chatbot-close" id="chatbot-close" title="Close Chat">&times;</button>
          </div>
        </div>

        <!-- Quick Topic Suggestion Pills -->
        <div class="chatbot-quick-chips" id="chatbot-quick-chips">
          <button type="button" class="quick-chip-btn" data-query="Tell me about Navnit Kumar">👋 About Navnit</button>
          <button type="button" class="quick-chip-btn" data-query="What are Navnit's key skills?">⚡ Key Skills</button>
          <button type="button" class="quick-chip-btn" data-query="Tell me about your projects">🚀 Top Projects</button>
          <button type="button" class="quick-chip-btn" data-query="What was your BLW Varanasi experience?">🏭 BLW Fieldwork</button>
          <button type="button" class="quick-chip-btn" data-query="What is your education and CGPA?">🎓 Education (8.42 CGPA)</button>
          <button type="button" class="quick-chip-btn" data-query="What awards and hackathons have you won?">🏆 Honors & Awards</button>
          <button type="button" class="quick-chip-btn" data-query="Why should we hire Navnit?">💼 Why Hire Navnit?</button>
          <button type="button" class="quick-chip-btn" data-query="How can I contact Navnit?">📬 Contact Info</button>
          <button type="button" class="quick-chip-btn" data-query="Show me your resume and CV">📄 View CV / Resume</button>
          <button type="button" class="quick-chip-btn" data-query="Tell me a fun tech joke">😄 Tell me a joke</button>
        </div>

        <div class="chatbot-body" id="chatbot-body">
          <div class="chat-msg bot">
            <strong>👋 Welcome to Navnit's Portfolio!</strong><br><br>
            I am <strong>Navnit-AI</strong>, an intelligent assistant built to answer all your questions about Navnit's engineering background, hardware builds, machine learning pipelines, industrial fieldwork, and career goals.<br><br>
            Feel free to type anything or click any of the suggestion chips above to get started!
          </div>
        </div>

        <div class="chatbot-input-area">
          <span class="cmd-prompt">~/$</span>
          <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Ask about skills, projects, BLW, education..." autocomplete="off" />
          <button type="button" class="chatbot-send" id="chatbot-send" title="Send message">↵</button>
        </div>
      </div>
    `;
    while (chatbotWrapper.firstChild) {
      document.body.appendChild(chatbotWrapper.firstChild);
    }

    const toggleBtn = document.getElementById("navnit-ai-assistant-toggle");
    const closeBtn = document.getElementById("chatbot-close");
    const clearBtn = document.getElementById("chatbot-clear-btn");
    const chatWindow = document.getElementById("chatbot-window");
    const overlay = document.getElementById("chatbot-overlay");
    const chatBody = document.getElementById("chatbot-body");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("chatbot-send");
    const chipsContainer = document.getElementById("chatbot-quick-chips");

    function openChat() {
      if (!chatWindow) return;
      chatWindow.classList.add("active");
      if (overlay) overlay.classList.add("active");
      if (toggleBtn) toggleBtn.classList.add("active");
      setTimeout(() => { if (chatInput) chatInput.focus(); }, 300);
      if (typeof playClickSound === "function") playClickSound();
    }

    function closeChat() {
      if (!chatWindow) return;
      chatWindow.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      if (toggleBtn) toggleBtn.classList.remove("active");
      if (typeof playClickSound === "function") playClickSound();
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function(e) {
        e.preventDefault();
        if (chatWindow && chatWindow.classList.contains("active")) {
          closeChat();
        } else {
          openChat();
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeChat);
    if (overlay) overlay.addEventListener("click", closeChat);

    if (clearBtn) {
      clearBtn.addEventListener("click", function() {
        if (!chatBody) return;
        chatBody.innerHTML = '<div class="chat-msg bot">🧹 Chat history cleared. How else can I assist you today?</div>';
        if (typeof playClickSound === "function") playClickSound();
      });
    }

    // Quick chips click handling
    if (chipsContainer) {
      chipsContainer.addEventListener("click", function(e) {
        const chip = e.target.closest(".quick-chip-btn");
        if (chip) {
          const query = chip.getAttribute("data-query");
          if (query) {
            processUserMessage(query);
          }
        }
      });
    }

    // COMPREHENSIVE MULTI-INTENT KNOWLEDGE BASE
    const knowledgeBase = [
      // 1. GREETINGS & CASUAL CHAT
      {
        intents: ["hi", "hello", "hey", "namaste", "start", "greet", "good morning", "good afternoon", "good evening", "hola", "yo"],
        response: "Hello! 👋 Great to meet you! I am Navnit-AI, ready to share details on Navnit Kumar's engineering builds, high-voltage power systems, edge AI research, and academic journey at NIT Nagaland. What would you like to explore?"
      },
      {
        intents: ["how are you", "how r u", "how are u", "hows it going", "how is it going", "whats up", "what's up"],
        response: "I'm running at peak telemetry efficiency and ready for your questions! ⚡ How can I help you learn more about Navnit's work today?"
      },
      {
        intents: ["who are you", "what are you", "what can you do", "about you", "your name", "who made you", "who created you"],
        response: "I am the official <strong>Navnit-AI Virtual Terminal</strong>! I can provide full technical breakdowns of Navnit's 8+ projects, his 33kV substation fieldwork at Banaras Locomotive Works (BLW), his 8.42 CGPA academic coursework at NIT Nagaland, technical skills, awards, and direct contact channels."
      },
      {
        intents: ["joke", "funny", "humor", "tell me a joke"],
        response: "Why do electrical engineers love low impedance paths? ⚡ Because resistance is futile! 🤖😄 (Also, there are 10 types of people in the world: those who understand binary, and those who don't!)"
      },
      {
        intents: ["thank", "thanks", "thx", "appreciate", "great job", "awesome", "cool", "good bot"],
        response: "You're very welcome! 😊 If you'd like to collaborate with Navnit or schedule an interview, feel free to reach him at <a href=\"mailto:nkmaurya934124@gmail.com\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">nkmaurya934124@gmail.com</a>!"
      },
      {
        intents: ["bye", "goodbye", "see you", "exit", "quit", "cya"],
        response: "Goodbye! 👋 Thanks for visiting Navnit Kumar's portfolio. Have an amazing day ahead!"
      },

      // 2. BIOGRAPHY & PERSONAL OVERVIEW
      {
        intents: ["about navnit", "who is navnit", "biography", "bio", "intro", "tell me about yourself", "tell me about him", "overview", "background", "native", "where is he from", "home"],
        response: "<strong>Navnit Kumar</strong> is an Electrical & Electronics Engineering undergraduate at <strong>NIT Nagaland (Batch of 2024–2028, CGPA 8.42/10)</strong>.<br><br>He specializes at the intersection of <strong>heavy industrial electrical power</strong>, <strong>edge computer-vision AI</strong>, and <strong>low-latency embedded IoT systems</strong>.<br><br>Originally from Kaimur, Bihar, he currently serves as <strong>Secretary of the Quants Club</strong> and a core engineer in the <strong>Robotics Club</strong> at NIT Nagaland. Check out his full <a href=\"about.html\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">About Page</a>."
      },

      // 3. WHY HIRE NAVNIT
      {
        intents: ["why hire", "hire", "candidate", "strengths", "why should we hire", "available", "internship opportunity", "job opportunity", "open for roles", "relocate", "remote"],
        response: "<strong>Why Navnit is an Exceptional Engineering Hire:</strong><br><br>" +
          "1. ⚡ <strong>Hardware + Software + Power Convergence:</strong> Rare ability to bridge physical 33kV substations & microcontrollers (ESP32/Arduino) with modern AI (YOLOv8, DenseNet, PyTorch, Python).<br>" +
          "2. 🏆 <strong>Proven Track Record:</strong> 1st Place IEEE IAS Circuit Design, 1st Rank Institute Quantum Quiz, Hack4Brahma Winner, and accredited 4-week Indian Railways (BLW) trainee.<br>" +
          "3. 📈 <strong>Top Academic Rigor:</strong> 8.42 / 10 CGPA at National Institute of Technology (NIT) Nagaland.<br>" +
          "4. 🚀 <strong>Leadership:</strong> Secretary of Quants Club, mentoring junior engineers in microcontrollers and robotics.<br><br>" +
          "He is actively open for <strong>Engineering Internships & Research Collaborations</strong>. Contact: <a href=\"mailto:nkmaurya934124@gmail.com\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">nkmaurya934124@gmail.com</a>."
      },

      // 4. EDUCATION & ACADEMICS
      {
        intents: ["education", "college", "university", "nit", "nagaland", "cgpa", "grades", "score", "school", "12th", "10th", "academics", "degree", "branch", "coursework"],
        response: "<strong>Navnit's Academic Qualifications:</strong><br><br>" +
          "• 🎓 <strong>B.Tech in Electrical & Electronics Engineering (EEE):</strong><br>" +
          "  NIT Nagaland (2024 — 2028) · <span class=\"badge-pill-amber\">CGPA: 8.42 / 10</span><br>" +
          "• 🏫 <strong>Class XII (Science - PCM):</strong><br>" +
          "  Bajrang Bali High School (BSEB, Bihar) · <span class=\"badge-pill-emerald\">75.6% Distinction</span> (2024)<br>" +
          "• 🏫 <strong>Class X (Matriculation):</strong><br>" +
          "  Bajrang Bali High School (BSEB, Bihar) · <span class=\"badge-pill-emerald\">83.0% First Division</span> (2022)<br><br>" +
          "Key Coursework: <em>Power Systems, Electrical Machines, Microcontrollers (8051/ESP32), Circuit Theory, Control Engineering, Signals & Systems, DSA in C</em>."
      },

      // 5. INDUSTRIAL FIELDWORK & INTERNSHIPS (BLW VARANASI)
      {
        intents: ["blw", "banaras locomotive works", "dlw", "railways", "indian railways", "varanasi", "substation", "mrs", "tas", "las", "traction", "internship", "fieldwork", "industrial training"],
        response: "<strong>Banaras Locomotive Works (BLW / DLW Varanasi) Fieldwork:</strong><br><br>" +
          "Navnit completed 4 weeks of intensive industrial training at Indian Railways' flagship locomotive facility across 4 zones:<br><br>" +
          "1. ⚡ <strong>Main Receiving Substation (MRS):</strong> 33kV to 6.6kV/415V step-down power transformers, <strong>SF6 gas circuit breakers</strong>, numerical overcurrent/earth-fault relays, and power factor capacitor banks.<br>" +
          "2. 🚂 <strong>Traction Assembly Shop (TAS):</strong> 3-phase asynchronous traction motors, auxiliary alternators, and dynamic rheostatic braking grids.<br>" +
          "3. 🛠️ <strong>Loco Assembly Shop (LAS):</strong> Bogie drops, master electrical cabling harnesses, and locomotive ECU marriage.<br>" +
          "4. 🌐 <strong>Township Distribution:</strong> 11kV distribution substations & load balancing.<br><br>" +
          "Read full logs on the <a href=\"experience.html\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">Experience Page</a>."
      },

      // 6. ALL PROJECTS OVERVIEW
      {
        intents: ["projects", "all projects", "builds", "hardware builds", "what have you built", "portfolio projects"],
        response: "<strong>Navnit's 8 Flagship Engineered Builds:</strong><br><br>" +
          "1. 🚀 <strong>MineSafe-X:</strong> mmWave Radar & ESP-NOW V2V Mining Transport Safety System.<br>" +
          "2. 👁️ <strong>Edge AI Traffic Violation & ANPR:</strong> YOLOv8 + EasyOCR + LLM Assistant.<br>" +
          "3. 🏥 <strong>Ostero AI:</strong> Multimodal Osteoarthritis Risk Screening Pipeline.<br>" +
          "4. 📇 <strong>Contact Management System:</strong> Python 3 + JSON CRUD CLI with input validation.<br>" +
          "5. 🎮 <strong>Interactive Adventure Game:</strong> Python branching story state engine.<br>" +
          "6. 🚁 <strong>F450 Multirotor UAV:</strong> Autonomous quadcopter with KK2.1.5 PID gyro stabilization.<br>" +
          "7. 📡 <strong>Ultrasonic Spatial Radar:</strong> 180° servo sweep acoustic mapping bench.<br>" +
          "8. 🏎️ <strong>High-Current RC Vehicle:</strong> Dual H-bridge 4WD chassis with LC noise filter.<br><br>" +
          "Explore all images, code & videos in the <a href=\"projects.html\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">Projects Gallery</a>!"
      },

      // 7. SPECIFIC PROJECT 1: MINESAFE-X
      {
        intents: ["minesafe", "mining", "minesafex", "truck", "colliders", "v2v", "v2i", "esp-now", "mmwave"],
        response: "<strong>MineSafe-X – Smart Mining Transport Collision Avoidance</strong><br><br>" +
          "• <strong>Developed by:</strong> Team Colliders<br>" +
          "• <strong>Problem Solved:</strong> Prevents catastrophic blind-spot collisions between heavy multi-ton haul trucks in dusty, zero-internet open-cast mining pits.<br>" +
          "• <strong>Sensors & Telemetry:</strong> 24GHz mmWave radar, GPS coordinates, ultrasonic ToF ranging.<br>" +
          "• <strong>Wireless Protocol:</strong> Peer-to-peer <strong>ESP-NOW</strong> radio achieving <strong>&lt;5ms latency</strong> without cellular or cloud dependency.<br>" +
          "• <strong>Features:</strong> Predictive Time-to-Collision (TTC) calculations, audio-visual cabin alarms, and centralized fleet monitoring tower.<br>" +
          "• <a href=\"https://drive.google.com/drive/folders/16sRMtZAeOKWz0Sx-ARwUDb_S_0rBsoel\" target=\"_blank\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">View Prototype Drive Folder ↗</a>"
      },

      // 8. SPECIFIC PROJECT 2: TRAFFIC VIOLATION AI
      {
        intents: ["traffic", "yolo", "yolov8", "easyocr", "anpr", "license plate", "traffic assistant", "helmet", "red light"],
        response: "<strong>Edge AI Traffic Violation & Automated ANPR System</strong><br><br>" +
          "• <strong>Detection Engine:</strong> Custom-trained <strong>YOLOv8</strong> detecting helmet infractions, triple riding, red light running, and wrong-side driving.<br>" +
          "• <strong>Tracking:</strong> Continuous vehicle tracking with <strong>unique persistent IDs</strong> across video frames.<br>" +
          "• <strong>ANPR Pipeline:</strong> Two-stage plate localization and <strong>EasyOCR</strong> character extraction.<br>" +
          "• <strong>AI Assistant:</strong> Natural language query resolution and weekly automated compliance report generator.<br>" +
          "• <a href=\"https://github.com/navnit919\" target=\"_blank\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">View GitHub Repository ↗</a>"
      },

      // 9. SPECIFIC PROJECT 3: OSTERO AI
      {
        intents: ["ostero", "osteoarthritis", "knee", "health", "healthcare", "xray", "x-ray", "densenet", "xgboost", "gait"],
        response: "<strong>Ostero AI – Multimodal Osteoarthritis Risk Marker Screening</strong><br><br>" +
          "• <strong>Purpose:</strong> Low-cost clinical screening system tailored for rural health centers across India's North Eastern Region (NER).<br>" +
          "• <strong>4-Tier Assessment:</strong> Questionnaire + MediaPipe Pose gait analysis + wearable ESP32 IMU/FSR insoles + <strong>DenseNet-121</strong> knee X-ray feature extraction.<br>" +
          "• <strong>Decision Engine:</strong> <strong>XGBoost classifier</strong> with 4-axis radar diagnostics.<br>" +
          "• <strong>Localization:</strong> Multilingual UI in Assamese, Bengali, Hindi & English with 100% offline edge capability.<br>" +
          "• <a href=\"https://drive.google.com/drive/folders/13-yXUd3_mVVW_8rUecfljQ8K5v007EYM\" target=\"_blank\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">View SIH Prototype Drive ↗</a>"
      },

      // 10. SPECIFIC PROJECT 4 & 5: PYTHON SOFTWARE BUILDS
      {
        intents: ["contact management", "python software", "game", "adventure game", "json", "crud"],
        response: "<strong>Python Software & State Engine Builds:</strong><br><br>" +
          "• <strong>Contact Management System:</strong> Complete CLI tool in Python 3 with structured JSON serialization, full CRUD operations, duplicate email checks, phone regex verification, and exception handling.<br>" +
          "• <strong>Interactive Adventure Game:</strong> Branching story engine in Python modeling non-deterministic probabilistic loops (random module) and decision trees.<br>" +
          "• <a href=\"https://github.com/navnit919\" target=\"_blank\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">Explore on GitHub ↗</a>"
      },

      // 11. SPECIFIC PROJECT 6, 7, 8: DRONE, RADAR & RC ROBOT
      {
        intents: ["drone", "quadcopter", "uav", "f450", "radar", "ultrasonic", "rc car", "rc vehicle", "motor driver", "h-bridge"],
        response: "<strong>Hardware & Robotics Builds:</strong><br><br>" +
          "• 🚁 <strong>F450 Multirotor UAV:</strong> Quadcopter built at NIELIT Bootcamp with 1000KV BLDC motors, 30A SimonK ESCs, and <strong>KK2.1.5 gyro PID flight stabilization</strong>.<br>" +
          "• 📡 <strong>Ultrasonic Spatial Radar:</strong> HC-SR04 ultrasonic transducer on a 180° stepping servo with microsecond trigger timing and real-time polar UART radar plotting.<br>" +
          "• 🏎️ <strong>High-Current RC Robot:</strong> 4WD chassis with dual H-bridge motor drivers, PWM speed regulation, and LC power filter noise isolation."
      },

      // 12. TECHNICAL SKILLS & STACK
      {
        intents: ["skills", "tech stack", "languages", "programming", "hardware skills", "ai skills", "tools", "c++", "c", "embedded c", "sql", "esp32", "arduino", "raspberry pi", "pytorch", "opencv"],
        response: "<strong>Navnit's Technical Competency Matrix:</strong><br><br>" +
          "• 💻 <strong>Languages:</strong> Python, Embedded C, C, C++, SQL, HTML5, CSS3, JavaScript, JSON.<br>" +
          "• 🤖 <strong>AI & Vision:</strong> YOLOv8, EasyOCR, OpenCV, PyTorch, MediaPipe Pose, DenseNet-121, XGBoost, Streamlit.<br>" +
          "• 🔌 <strong>Embedded & IoT:</strong> ESP32, Arduino Uno, Raspberry Pi, ESP-NOW (&lt;5ms), 24GHz mmWave radar, MPU6050 IMUs, UART/SPI/I2C, KK2.1.5 flight controllers.<br>" +
          "• ⚡ <strong>Power Infrastructure:</strong> 33kV substations, SF6 circuit breakers, power transformers, traction motor drives, protection relay coordination.<br>" +
          "• 🛠️ <strong>CAD & Tools:</strong> FreeCAD, Cura 3D Slicing, VS Code, Git/GitHub, LaTeX.<br><br>" +
          "Check the interactive <a href=\"skills.html\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">Skills Visualizer</a>!"
      },

      // 13. HONORS, AWARDS & HACKATHONS
      {
        intents: ["awards", "honors", "achievements", "hackathons", "competitions", "rank", "winner", "prize", "ieee", "quantum quiz", "hack4brahma"],
        response: "<strong>Honors, Awards & Recognitions:</strong><br><br>" +
          "• 🥇 <strong>1st Place – IEEE Circuit Design Hackathon:</strong> IEEE IAS Student Branch Chapter, NIT Nagaland.<br>" +
          "• 🏆 <strong>1st Rank – Institute Quantum Quiz Championship:</strong> NIT Nagaland Technical Symposium (100+ competitors).<br>" +
          "• 🚀 <strong>Winner – Hack4Brahma Regional Innovation Hackathon:</strong> Judged top in real-world impact and edge AI execution.<br>" +
          "• 🥉 <strong>3rd Prize – National Entrepreneurship Day Ideathon:</strong> NIT Nagaland Innovation Cell.<br>" +
          "• 📜 <strong>BLW Industrial Certification:</strong> Accredited 4-week fieldwork credentials by Indian Railways."
      },

      // 14. LEADERSHIP & CAMPUS ROLES
      {
        intents: ["leadership", "quants club", "robotics club", "secretary", "iic", "esports", "pm shri", "volunteer", "roles"],
        response: "<strong>Positions of Responsibility & Campus Impact:</strong><br><br>" +
          "• 📊 <strong>Secretary – Quants Club (NIT Nagaland):</strong> Leading quantitative reasoning, logic puzzles, and analytics competitions for 200+ students.<br>" +
          "• 🤖 <strong>Core Member – Robotics Club:</strong> Developing hardware prototypes and mentoring juniors on microcontrollers.<br>" +
          "• 💡 <strong>Member – Institution's Innovation Council (IIC):</strong> Supporting campus ideathons and student incubation.<br>" +
          "• 🎓 <strong>Volunteer Facilitator – PM SHRI Schools:</strong> Trained <strong>250+ school educators</strong> across Nagaland and Tripura in STEM bootcamps.<br>" +
          "• 🎮 <strong>Co-Organizer – Flagship Esports:</strong> Organized NIT Nagaland's campus MLBB tournament."
      },

      // 15. CONTACT & SOCIALS
      {
        intents: ["contact", "email", "phone", "call", "mobile", "linkedin", "github", "reach", "message", "address", "location"],
        response: "<strong>Direct Contact Channels for Navnit Kumar:</strong><br><br>" +
          "• 📧 <strong>Email:</strong> <a href=\"mailto:nkmaurya934124@gmail.com\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">nkmaurya934124@gmail.com</a><br>" +
          "• 📱 <strong>Phone:</strong> <a href=\"tel:+919341240119\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">+91 93412 40119</a><br>" +
          "• 💼 <strong>LinkedIn:</strong> <a href=\"https://linkedin.com/in/navnit-kumar-72b470330\" target=\"_blank\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">linkedin.com/in/navnit-kumar-72b470330 ↗</a><br>" +
          "• 🐙 <strong>GitHub:</strong> <a href=\"https://github.com/navnit919\" target=\"_blank\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">github.com/navnit919 ↗</a><br>" +
          "• 📍 <strong>Location:</strong> NIT Nagaland, Chümoukedima, Nagaland, India.<br><br>" +
          "Or leave a direct message via the <a href=\"contact.html\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">Contact Portal</a>!"
      },

      // 16. CV & RESUME
      {
        intents: ["resume", "cv", "curriculum vitae", "pdf", "download cv", "download resume"],
        response: "<strong>Curriculum Vitae Access:</strong><br><br>" +
          "• 📄 <strong>Interactive CV:</strong> Open the full multi-theme ATS verified document on <a href=\"cv.html\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">cv.html</a>.<br>" +
          "• 📥 <strong>Download Original PDF:</strong> <a href=\"resume/Navnit_Kumar_Resume.pdf\" target=\"_blank\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">Download Navnit_Kumar_Resume.pdf ↗</a>."
      }
    ];

    function addMessage(text, sender) {
      if (!chatBody) return;
      const msgDiv = document.createElement("div");
      msgDiv.className = "chat-msg " + sender;
      msgDiv.innerHTML = text;
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processUserMessage(rawText) {
      if (!chatBody) return;
      const text = rawText.trim();
      if (!text) return;

      addMessage(text, "user");
      if (chatInput) chatInput.value = "";

      if (typeof playClickSound === "function") playClickSound();

      // Show typing indicator
      const typingDiv = document.createElement("div");
      typingDiv.className = "chat-msg bot typing-indicator";
      typingDiv.innerHTML = '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
      chatBody.appendChild(typingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        if (typingDiv.parentNode) typingDiv.parentNode.removeChild(typingDiv);

        const lower = text.toLowerCase();
        let matchedResponse = null;
        let bestScore = 0;

        for (const item of knowledgeBase) {
          let score = 0;
          for (const intent of item.intents) {
            if (lower === intent) {
              score += 10;
            } else if (lower.includes(intent)) {
              score += intent.length;
            }
          }
          if (score > bestScore) {
            bestScore = score;
            matchedResponse = item.response;
          }
        }

        if (matchedResponse && bestScore > 0) {
          addMessage(matchedResponse, "bot");
        } else {
          // Smart fallback
          addMessage(
            "I received your query! While I might not have an exact pre-programmed match, Navnit would love to answer this directly.<br><br>" +
            'You can email him at <a href=\"mailto:nkmaurya934124@gmail.com\" style=\"color:var(--accent-cyan); font-weight:bold; text-decoration:underline;\">nkmaurya934124@gmail.com</a> or phone <a href=\"tel:+919341240119\" style=\"color:var(--accent-cyan); font-weight:bold;\">+91 93412 40119</a>.<br><br>' +
            "<em>Tip: Try asking about his <strong>skills</strong>, <strong>MineSafe-X</strong>, <strong>BLW internship</strong>, <strong>education</strong>, or <strong>honors</strong>!</em>",
            "bot"
          );
        }
      }, 550);
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", function() {
        if (chatInput) processUserMessage(chatInput.value);
      });
    }

    if (chatInput) {
      chatInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
          processUserMessage(chatInput.value);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavnitChatbot);
  } else {
    initNavnitChatbot();
  }
})();


