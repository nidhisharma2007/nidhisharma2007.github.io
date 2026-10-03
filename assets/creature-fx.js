/* creature-fx.js — intro animation, neural-network background, creature assistant.
 * Needs: assets/creature.png, CSS block "creature-fx" in index-v4.css.
 * Add ?intro to the URL to replay the intro any time. */
(function () {
  "use strict";

  var IMG = "./assets/creature.png";
  var TEAL = "95,215,196";
  var AMBER = "239,169,75";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  /* ---------- Edit these answers ---------- */
  var PROFILE = [
    { q: "Who is Nidhi?",
      a: "Nidhi Sharma is a Bachelor's student in Artificial Intelligence at AAFT Noida (since 2025), focused on machine learning, data analytics and generative AI.",
      go: "about" },
    { q: "What has she built?",
      a: "Notebooks for house price, job change, loan delinquency risk and Parkinson's disease detection, plus Python scripts like Bug Hunter and a Chatbot.",
      go: "projects" },
    { q: "What are her skills?",
      a: "Python, SQL, MongoDB, Power BI, Cloud Computing, Machine Learning and Deep Learning.",
      go: "skills" },
    { q: "Any experience?",
      a: "A 2-month Machine Learning internship at AcmeGrade (Mar-May 2026) and the National Internship Program with Pega x Smart Bridge (Aug-Sep 2026).",
      go: "experience" },
    { q: "Certifications?",
      a: "Oracle Cloud Infrastructure 2025 Generative AI Professional, plus data analytics and SQL certificates.",
      go: "certifications" },
    { q: "How do I contact her?",
      a: "Email studypower2022@gmail.com, or use the contact form.",
      go: "contact" }
  ];
  var GREETING = "Hi! I'm Nidhi's assistant. Poke me.";
  var HINTS = {
    about: "That's Nidhi's story.",
    skills: "Lots of Python in here.",
    projects: "These are real notebooks. Open one!",
    experience: "Two internships. Not bad.",
    certifications: "Oracle GenAI certified.",
    contact: "Say hi. She replies."
  };

  var seen = false;
  try { seen = !!sessionStorage.getItem("nc-intro"); } catch (e) {}
  var forceIntro = /[?&]intro\b/.test(location.search);
  var playIntro = !reduce && (!seen || forceIntro);

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html) n.innerHTML = html;
    return n;
  }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }


  /* =====================================================
     0. Sound — synthesized with Web Audio (no audio files)
     ===================================================== */
  var audio = (function () {
    var ctx = null, master = null, noiseBuf = null;

    function init() {
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
      return ctx;
    }
    function unlock() {
      init();
      if (ctx && ctx.state === "suspended") return ctx.resume().catch(function () {});
      return Promise.resolve();
    }
    function running() { return !!ctx && ctx.state === "running"; }
    function ok() { return running(); }

    // one pitched blip, optional pitch glide + vibrato
    function tone(type, f0, f1, dur, vol, delay, vib) {
      if (!ok()) return;
      var t = ctx.currentTime + (delay || 0);
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f0, t);
      if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      if (vib) {
        var l = ctx.createOscillator(), lg = ctx.createGain();
        l.frequency.value = vib.rate; lg.gain.value = vib.depth;
        l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur + 0.05);
      }
      o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
    }
    // filtered noise sweep (whoosh / crackle)
    function noise(dur, f0, f1, vol, delay) {
      if (!ok()) return;
      if (!noiseBuf) {
        noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        var d = noiseBuf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      var t = ctx.currentTime + (delay || 0);
      var src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = noiseBuf; src.loop = true;
      f.type = "bandpass"; f.Q.value = 1.2;
      f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.35);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(f); f.connect(g); g.connect(master); src.start(t); src.stop(t + dur + 0.05);
    }

    return {
      init: init, unlock: unlock, running: running,
      step: function () { var f = 640 + Math.random() * 260; tone("triangle", f, f * 1.35, 0.07, 0.22); },
      pip: function () { tone("sine", 1040, 1040, 0.06, 0.2); },
      blip: function () { tone("sine", 880, 880, 0.07, 0.16); tone("sine", 1318, 1318, 0.09, 0.16, 0.08); },
      boing: function () { tone("sine", 280, 760, 0.22, 0.32, 0, { rate: 28, depth: 30 }); },
      // cute two-syllable creature call
      voice: function () {
        tone("triangle", 820, 1250, 0.11, 0.28);
        tone("triangle", 1000, 1560, 0.15, 0.28, 0.14, { rate: 30, depth: 25 });
      },
      laugh: function () {
        for (var i = 0; i < 4; i++) tone("triangle", 760 + (i % 2) * 160, 980 + (i % 2) * 160, 0.09, 0.22, i * 0.13, { rate: 34, depth: 20 });
      },
      charge: function () {
        tone("triangle", 220, 1100, 0.9, 0.22, 0, { rate: 18, depth: 40 });
        tone("sine", 440, 2200, 0.9, 0.07);
      },
      zap: function () {
        [1046, 1318, 1568, 2093].forEach(function (f, i) { tone("triangle", f, f, 0.14, 0.22, i * 0.07); });
        noise(0.4, 6000, 1500, 0.22);
        tone("sine", 300, 900, 0.25, 0.3, 0, { rate: 26, depth: 30 });
      },
      ready: function () { tone("sine", 784, 784, 0.25, 0.28); tone("sine", 1047, 1047, 0.5, 0.28, 0.18); },
      whoosh: function () { noise(0.85, 400, 3500, 0.3); }
    };
  })();

  /* =====================================================
     1. Background neural network (lives behind the site)
     ===================================================== */
  function startBackground() {
    var cv = el("canvas", "fx-bg");
    cv.setAttribute("aria-hidden", "true");
    document.body.insertBefore(cv, document.body.firstChild);
    var ctx = cv.getContext("2d");
    var W, H, pts = [], mouse = { x: -9999, y: -9999 };

    function size() {
      W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
      var n = Math.max(24, Math.min(80, Math.floor(innerWidth / 18)));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3 * DPR, vy: (Math.random() - 0.5) * 0.3 * DPR
      });
    }
    addEventListener("resize", size);
    addEventListener("pointermove", function (e) { mouse.x = e.clientX * DPR; mouse.y = e.clientY * DPR; }, { passive: true });
    size();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var link = 140 * DPR, i, j, p, q, d;
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.fillStyle = "rgba(" + TEAL + ",.7)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5 * DPR, 0, 6.283); ctx.fill();
        for (j = i + 1; j < pts.length; j++) {
          q = pts[j]; d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < link) {
            ctx.strokeStyle = "rgba(" + TEAL + "," + ((1 - d / link) * 0.28) + ")";
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < link * 1.6) {
          ctx.strokeStyle = "rgba(" + AMBER + "," + ((1 - d / (link * 1.6)) * 0.55) + ")";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      if (!reduce) requestAnimationFrame(draw);
    }
    draw();
  }

  /* =====================================================
     2. Creature assistant (bottom-right)
     ===================================================== */
  function buildAssistant() {
    var wrap = el("div", "nc-wrap");
    wrap.innerHTML =
      '<div class="nc-bubble" hidden></div>' +
      '<div class="nc-panel" role="dialog" aria-label="Portfolio assistant" hidden>' +
      '<p class="nc-msg"></p><div class="nc-opts"></div></div>' +
      '<div class="nc-tilt"><button type="button" class="nc-btn" aria-label="Open portfolio assistant">' +
      '<img class="nc-img" src="' + IMG + '" alt="" draggable="false"></button></div>' +
      '<div class="nc-shadow"></div>';
    wrap.style.visibility = "hidden";
    document.body.appendChild(wrap);

    var $ = function (s) { return wrap.querySelector(s); };
    var btn = $(".nc-btn"), img = $(".nc-img"), panel = $(".nc-panel"), msg = $(".nc-msg"),
        opts = $(".nc-opts"), bubble = $(".nc-bubble"), tilt = $(".nc-tilt");
    var timer, bt, moving = false, stepT, onArrive = null, lastTalk = 0, lastAct = Date.now(),
        lastGiggle = 0, lastCard = null, shown = {}, curF = 0.9;
    var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };

    /* --- position: the creature walks along the bottom edge --- */
    var cw = function () { return wrap.offsetWidth; };
    var edge = function (f) { return Math.round(8 + f * (innerWidth - cw() - 16)); };
    var x = edge(curF), tx = x;
    function place() { wrap.style.transform = "translateX(" + x + "px)"; }
    place();
    addEventListener("resize", function () { if (!moving) { x = tx = edge(curF); place(); } });

    function lean(deg) { tilt.style.transform = "rotate(" + deg + "deg)"; }
    function act(name) { // wave | laugh | hop | nod
      img.className = "nc-img"; void img.offsetWidth; img.classList.add("nc-" + name);
    }
    img.addEventListener("animationend", function (e) {
      if (e.animationName.indexOf("nc-a-") === 0) img.className = "nc-img";
    });

    function fit(node) { // keep bubbles inside the screen wherever the creature stands
      node.style.left = "0px";
      var w = node.offsetWidth, c = x + cw() / 2;
      var left = Math.max(8, Math.min(innerWidth - 8 - w, c - w / 2));
      node.style.left = (left - x) + "px";
    }
    function talk(text, ms, snd) {
      if (!panel.hidden) return;
      bubble.textContent = text; bubble.hidden = false; fit(bubble);
      if (snd === "laugh") audio.laugh(); else if (snd === "voice") audio.voice(); else audio.blip();
      clearTimeout(bt); bt = setTimeout(function () { bubble.hidden = true; }, ms || 4200);
      lastTalk = Date.now();
    }

    function stopWalk() {
      moving = false; wrap.classList.remove("walking"); clearInterval(stepT); lean(0);
      var cb = onArrive; onArrive = null; if (cb) cb();
    }
    function walkTo(f, cb) {
      curF = f; tx = edge(f); onArrive = cb || null;
      if (moving) return;
      if (reduce || Math.abs(tx - x) < 2) { x = tx; place(); var c = onArrive; onArrive = null; if (c) c(); return; }
      moving = true; bubble.hidden = true;
      wrap.classList.add("walking"); stepT = setInterval(audio.step, 190);
      var last = performance.now();
      requestAnimationFrame(function tick(now) {
        var dt = Math.min(50, now - last) / 1000; last = now;
        var dist = tx - x, step = (Math.abs(dist) > 600 ? 600 : 360) * dt;
        if (Math.abs(dist) <= step) { x = tx; place(); stopWalk(); return; }
        x += (dist > 0 ? 1 : -1) * step; place(); lean(dist > 0 ? 7 : -7);
        requestAnimationFrame(tick);
      });
    }

    /* --- what the creature does in each section --- */
    var REACT = {
      home:           { say: "Hi! I'm Nidhi's creature. Welcome to her portfolio!", act: "wave", snd: "voice", f: 0.92 },
      about:          { say: "That's my human. She builds things that learn.", act: "nod", snd: "voice", f: 0.04 },
      skills:         { say: "Python, SQL, ML... I understand none of it. Hehe!", act: "laugh", snd: "laugh", f: 0.92 },
      experience:     { say: "Two internships already?! Okay, show-off.", act: "hop", snd: "voice", f: 0.04 },
      education:      { say: "Still studying AI. Just like me, sort of.", act: "nod", snd: "voice", f: 0.92 },
      projects:       { say: "Go on, open a project. I dare you!", act: "wave", snd: "voice", f: 0.04 },
      certifications: { say: "Oracle GenAI certified. Fancy!", act: "hop", snd: "voice", f: 0.92 },
      contact:        { say: "Say hi to her! I promise she replies.", act: "laugh", snd: "laugh", f: 0.92 }
    };
    var QUIPS = ["Hehe, back again?", "I like this part.", "Keep scrolling!", "Ooh, nice."];
    var IDLE = [
      { say: "*yawn* Is anyone there?", act: "nod", snd: "blip" },
      { say: "Psst. Scroll down, there's more!", act: "wave", snd: "voice" },
      { say: "Hehe. I was just thinking.", act: "laugh", snd: "laugh" },
      { say: "Want to ask me something? Click me!", act: "hop", snd: "voice" }
    ];

    function react(id) {
      var r = REACT[id];
      if (!r || !panel.hidden) return;
      var first = !shown[id]; shown[id] = true;
      walkTo(r.f, function () {
        act(r.act);
        if (first) talk(r.say, 4800, r.snd);
        else if (Date.now() - lastTalk > 7000 && Math.random() < 0.5) talk(pick(QUIPS), 3000, "blip");
      });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) react(en.target.id); });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
      Object.keys(REACT).forEach(function (id) {
        var s = document.getElementById(id); if (s) io.observe(s);
      });
    }

    /* --- interacting with the visitor --- */
    ["scroll", "pointermove", "keydown", "click"].forEach(function (ev) {
      addEventListener(ev, function () { lastAct = Date.now(); }, { passive: true });
    });
    setInterval(function () { // gets bored when nobody does anything
      if (!panel.hidden || moving || !wrap.style.visibility || wrap.style.visibility === "hidden") return;
      if (Date.now() - lastAct > 9000 && Date.now() - lastTalk > 9000) {
        var p = pick(IDLE); act(p.act); talk(p.say, 3600, p.snd); lastAct = Date.now();
      }
    }, 3000);

    btn.addEventListener("pointerenter", function () { // giggles when you hover it
      if (!panel.hidden || moving || Date.now() - lastGiggle < 8000) return;
      lastGiggle = Date.now(); act("laugh"); audio.laugh();
    });
    document.addEventListener("mouseover", function (e) { // comments on project cards
      var card = e.target.closest && e.target.closest(".project-card");
      if (!card || card === lastCard || !panel.hidden || moving || Date.now() - lastTalk < 2500) return;
      lastCard = card;
      var h3 = card.querySelector("h3");
      talk("Ooh, " + (h3 ? h3.textContent : "this one") + "! Good pick.", 2800, "blip");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(".project-card")) lastCard = null;
    });

    /* --- chat panel --- */
    function say(text) {
      clearInterval(timer); msg.textContent = "";
      if (reduce) { msg.textContent = text; return; }
      var i = 0;
      timer = setInterval(function () {
        msg.textContent = text.slice(0, ++i);
        if (i >= text.length) clearInterval(timer);
      }, 14);
    }
    PROFILE.forEach(function (item) {
      var b = el("button"); b.type = "button"; b.textContent = item.q;
      b.addEventListener("click", function () {
        act("nod"); audio.voice(); say(item.a);
        var old = opts.querySelector(".nc-go"); if (old) old.remove();
        if (item.go) {
          var g = el("button", "nc-go", "Take me there \u2192"); g.type = "button";
          g.addEventListener("click", function () {
            audio.pip();
            var t = document.getElementById(item.go);
            if (t) t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          });
          opts.appendChild(g);
        }
      });
      opts.appendChild(b);
    });
    btn.addEventListener("click", function () {
      audio.unlock().then(function () {
        panel.hidden = !panel.hidden; bubble.hidden = true;
        if (!panel.hidden) { fit(panel); act("laugh"); audio.laugh(); say("Hehe! What would you like to know?"); }
        else act("hop");
      });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") panel.hidden = true; });
    var unlockOnce = function () { audio.unlock(); };
    document.addEventListener("pointerdown", unlockOnce, { once: true });
    document.addEventListener("keydown", unlockOnce, { once: true });

    // creature leans toward the cursor while standing still
    if (!reduce) addEventListener("pointermove", function (e) {
      if (moving) return;
      var r = btn.getBoundingClientRect();
      lean(Math.max(-12, Math.min(12, ((e.clientX - (r.left + r.width / 2)) / innerWidth) * 14)));
    }, { passive: true });

    return { wrap: wrap, img: img, greet: function () { react("home"); } };
  }

  /* =====================================================
     3. Intro: creature walks in, charges up, runs a forward
        pass through a neural network, then opens the doors
     ===================================================== */
  function runIntro(assistant) {
    root.classList.add("fx-intro");
    var ov = el("div", "fx-intro-layer");
    ov.innerHTML =
      '<div class="fx-door fx-door-l"></div><div class="fx-door fx-door-r"></div>' +
      '<canvas class="fx-net"></canvas>' +
      '<div class="fx-ring"></div><div class="fx-ring fx-ring-2"></div>' +
      '<div class="fx-creature"><img src="' + IMG + '" alt="" draggable="false"></div>' +
      '<div class="fx-ground"></div>' +
      '<p class="fx-status" role="status"></p>' +
      '<button type="button" class="fx-skip">Skip intro</button>';
    document.body.appendChild(ov);

    var cv = ov.querySelector(".fx-net"), ctx = cv.getContext("2d");
    var cr = ov.querySelector(".fx-creature"), status = ov.querySelector(".fx-status");
    var rings = ov.querySelectorAll(".fx-ring");
    var W, H, layers = [], front = -0.3, done = false, raf;

    function build() {
      W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
      var cols = innerWidth < 600 ? 4 : 6, counts = [4, 6, 7, 6, 4, 3];
      layers = [];
      for (var c = 0; c < cols; c++) {
        var n = counts[c % counts.length], arr = [];
        for (var k = 0; k < n; k++) arr.push({
          x: (0.1 + 0.8 * c / (cols - 1)) * W,
          y: (0.14 + 0.5 * (n === 1 ? 0.5 : k / (n - 1))) * H
        });
        layers.push(arr);
      }
    }
    build(); addEventListener("resize", build);

    function glow(x) { // activation near the wave front, with a slow fade behind it
      var nx = x / W, d = front - nx;
      if (d < 0) return Math.max(0, 1 + d * 7) * 0.9;
      return Math.max(0.18, 1 - d * 0.9);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var a, b, c, i, j, g, p, q;
      for (c = 0; c < layers.length - 1; c++) {
        for (i = 0; i < layers[c].length; i++) for (j = 0; j < layers[c + 1].length; j++) {
          p = layers[c][i]; q = layers[c + 1][j];
          g = glow((p.x + q.x) / 2);
          ctx.strokeStyle = "rgba(" + TEAL + "," + (0.07 + g * 0.5) + ")";
          ctx.lineWidth = (0.8 + g * 1.2) * DPR;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      for (c = 0; c < layers.length; c++) for (i = 0; i < layers[c].length; i++) {
        p = layers[c][i]; g = glow(p.x);
        ctx.fillStyle = "rgba(" + (g > 0.7 ? AMBER : TEAL) + "," + (0.25 + g * 0.75) + ")";
        ctx.shadowColor = "rgba(" + TEAL + ",.9)"; ctx.shadowBlur = g * 18 * DPR;
        ctx.beginPath(); ctx.arc(p.x, p.y, (4 + g * 4) * DPR, 0, 6.283); ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (!done) raf = requestAnimationFrame(draw);
    }
    draw();

    function type(text) {
      status.textContent = "";
      var i = 0;
      var t = setInterval(function () {
        status.textContent = "> " + text.slice(0, ++i);
        if (i >= text.length) clearInterval(t);
      }, 22);
    }
    function ring() {
      rings.forEach(function (r, i) {
        r.classList.remove("go"); void r.offsetWidth;
        setTimeout(function () { r.classList.add("go"); }, i * 160);
      });
    }
    function sweep(ms) {
      var t0 = performance.now();
      (function step(now) {
        var k = Math.min(1, (now - t0) / ms);
        front = -0.3 + 1.5 * k;
        if (k < 1 && !done) requestAnimationFrame(step);
      })(t0);
    }

    var skipped = false;
    var skipBtn = ov.querySelector(".fx-skip");
    skipBtn.addEventListener("click", function () { audio.unlock(); skipped = true; finish(true); });
    skipBtn.focus({ preventScroll: true });

    // Browsers block sound until the visitor interacts once. If audio is locked,
    // show one option-free screen: any tap, click or key press starts everything.
    function gate() {
      audio.init();
      return Promise.race([audio.unlock(), sleep(200)]).then(function () {
        if (audio.running()) return;
        return new Promise(function (resolve) {
          var g = el("div", "fx-gate", '<p>Tap anywhere to wake the creature</p><span class="fx-gate-dot"></span>');
          ov.appendChild(g);
          function go() {
            g.removeEventListener("click", go); document.removeEventListener("keydown", go);
            audio.unlock().then(function () { g.remove(); resolve(); });
          }
          g.addEventListener("click", go);
          document.addEventListener("keydown", go);
        });
      });
    }

    var stepper;
    async function script() {
      await gate();
      if (skipped) return;
      await sleep(250);
      cr.classList.add("in", "walk");                 // 1. walks in from the left
      stepper = setInterval(audio.step, 180);
      await sleep(1500);
      clearInterval(stepper);
      if (skipped) return;
      cr.classList.remove("walk"); cr.classList.add("charge"); // 2. powers up
      audio.charge();
      type("waking up the neural network...");
      await sleep(900);
      if (skipped) return;
      cr.classList.remove("charge"); cr.classList.add("zap");  // 3. big jump + pulse
      audio.zap(); setTimeout(audio.voice, 480);
      ring(); sweep(1900);
      await sleep(2000);
      if (skipped) return;
      audio.ready();
      type("model ready. opening portfolio");
      await sleep(900);
      if (!skipped) finish(false);
    }

    function finish(fast) {
      if (done) return;
      done = true; cancelAnimationFrame(raf); clearInterval(stepper);
      var gt = ov.querySelector(".fx-gate"); if (gt) gt.remove();
      audio.whoosh();
      try { sessionStorage.setItem("nc-intro", "1"); } catch (e) {}
      ov.classList.add("opening");                    // 4. doors slide apart
      root.classList.remove("fx-intro");
      assistant.wrap.style.visibility = "visible";
      // creature hops over to its corner spot
      var from = cr.getBoundingClientRect(), to = assistant.img.getBoundingClientRect();
      cr.classList.remove("walk", "charge", "zap");
      cr.style.transition = "none";
      var dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      var dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      var s = to.width / from.width;
      assistant.img.style.opacity = "0";
      var ms = fast ? 600 : 900;
      if (fast) ov.classList.add("fast");
      var anim = cr.animate([
        { transform: "translate(0,0) scale(1)" },
        { transform: "translate(" + dx * 0.5 + "px," + (dy * 0.5 - 140) + "px) scale(" + (1 + s) / 2 + ")", offset: 0.5 },
        { transform: "translate(" + dx + "px," + dy + "px) scale(" + s + ")" }
      ], { duration: ms, easing: "cubic-bezier(.4,0,.3,1)", fill: "forwards" });
      anim.onfinish = function () {
        assistant.img.style.opacity = "";
        ov.remove();
        removeEventListener("resize", build);
        audio.boing();
        assistant.greet();
      };
    }
    script();
  }

  /* =====================================================
     Boot
     ===================================================== */
  function boot() {
    var ready = getComputedStyle(root).getPropertyValue("--fx-ready").trim() === "1";
    if (!ready) { root.classList.remove("fx-intro"); return; } // CSS missing: leave the site untouched
    try { run(); } catch (err) { root.classList.remove("fx-intro"); if (window.console) console.error(err); }
  }
  function run() {
    startBackground();
    var assistant = buildAssistant();
    if (playIntro) {
      runIntro(assistant);
    } else {
      root.classList.remove("fx-intro");
      assistant.wrap.style.visibility = "visible";
      setTimeout(assistant.greet, 1200);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
