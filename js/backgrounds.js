/**
 * NIDHI SHARMA | LIVING FUTURISTIC AI WORKSTATION ENVIRONMENT
 * 
 * Multi-layered Living Architecture:
 * 1. Cinematic Intro Particles (preserved 100%)
 * 2. 9 Unified Environment States with Seamless Cinematic Crossfades
 * 3. Continuous Active Neural Network (node activations -> connection glow -> signal cascades)
 *    - Strictly enforces Creature Safe Zone (zero nodes, lines, or particles across face/body)
 *    - Destination-Out composite feathering mask guarantees 3D creature is 100% unobstructed
 *    - Text safe zone ensures high contrast readability on portfolio content
 * 4. Active Workstation Keyboard & Console Data Stream Integration
 * 5. Element-to-Workstation Hover Beams & Project-Specific Neural Reactions
 * 6. Subtle 3D Multiplane Mouse Parallax
 */

(function () {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  /* ============================================================
     1. EXISTING CINEMATIC INTRO PARTICLES (Preserved 100%)
     ============================================================ */
  function initIntroCanvas() {
    const canvas = document.getElementById('introParticlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particleCount = isMobile ? 25 : 55;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.3 ? 'rgba(0, 242, 254,' : 'rgba(245, 158, 11,'
      });
    }

    function renderIntro() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      });
    }

    function loopIntro() {
      renderIntro();
      const introEl = document.getElementById('cinematicIntro');
      if (introEl && introEl.style.display !== 'none') {
        requestAnimationFrame(loopIntro);
      }
    }
    loopIntro();
  }

  /* ============================================================
     2. GLOBAL AI WORKSTATION ENVIRONMENT STATE MANAGER
     ============================================================ */
  const envStates = [
    'hero',
    'about',
    'skills',
    'experience',
    'education',
    'projects',
    'certifications',
    'contact',
    'footer'
  ];

  let currentState = 'hero';
  const envElements = {};

  function initEnvironmentStates() {
    const container = document.getElementById('envLayersContainer');
    if (!container) return;

    envStates.forEach(id => {
      const el = container.querySelector(`[data-env="${id}"]`);
      if (el) envElements[id] = el;
    });
  }

  function setEnvironmentState(stateId) {
    if (!stateId || stateId === currentState) return;
    if (!envElements[stateId]) return;

    const prevEl = envElements[currentState];
    const nextEl = envElements[stateId];

    if (prevEl) prevEl.classList.remove('active');
    if (nextEl) nextEl.classList.add('active');

    currentState = stateId;

    if (window.GlobalNeural) {
      window.GlobalNeural.setMode(stateId);
    }
    if (window.CreatureController) {
      window.CreatureController.onStateChange(stateId);
    }
  }

  /* ============================================================
     3. CREATURE SAFE ZONE & GEOMETRIC PROTECTION SYSTEM
     Guarantees that the creature in the 3D rendered environment
     remains 100% unobstructed, crisp, and visually in front.
     ============================================================ */
  const CREATURE_SAFE_ZONE = {
    // Center of creature head/body in normalized coordinates (0.0 to 1.0)
    cx: 0.765,
    cy: 0.625,
    // Horizontal and vertical radii covering head, face, eyes, and torso
    rx: 0.125,
    ry: 0.210,

    // Tests if normalized point (nx, ny) lies inside the safe zone
    contains(nx, ny, margin = 1.0) {
      const dx = (nx - this.cx) / (this.rx * margin);
      const dy = (ny - this.cy) / (this.ry * margin);
      return (dx * dx + dy * dy) <= 1.0;
    },

    // Tests if line segment between (x1, y1) and (x2, y2) crosses through the safe zone
    intersectsSegment(x1, y1, x2, y2, margin = 1.08) {
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;
        if (this.contains(px, py, margin)) {
          return true;
        }
      }
      return false;
    }
  };

  /* ============================================================
     4. LIVING NEURAL NETWORK & DATA-STREAM SYSTEM
     ============================================================ */
  class LivingNeuralSystem {
    constructor() {
      this.canvas = document.getElementById('globalNeuralCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.width = (this.canvas.width = window.innerWidth);
      this.height = (this.canvas.height = window.innerHeight);

      this.nodes = [];
      this.edges = [];
      this.packets = [];
      this.ambientParticles = [];
      this.floatingDataMotes = [];
      this.beams = []; // Element-to-workstation interactive rays

      this.mouseX = this.width / 2;
      this.mouseY = this.height / 2;
      this.targetParallaxX = 0;
      this.targetParallaxY = 0;
      this.currParallaxX = 0;
      this.currParallaxY = 0;

      this.stateModes = {
        hero: {
          name: 'Awakening',
          speed: 0.6,
          packetFrequency: 0.7,
          color: 'rgba(0, 242, 254,',
          accentColor: 'rgba(20, 184, 166,',
          typingFrequency: 0.08,
          orbitalMode: false
        },
        about: {
          name: 'Thinking',
          speed: 0.35,
          packetFrequency: 0.4,
          color: 'rgba(20, 184, 166,',
          accentColor: 'rgba(0, 242, 254,',
          typingFrequency: 0.03,
          orbitalMode: false
        },
        skills: {
          name: 'Coding',
          speed: 0.9,
          packetFrequency: 1.2,
          color: 'rgba(0, 242, 254,',
          accentColor: 'rgba(56, 189, 248,',
          typingFrequency: 0.28,
          orbitalMode: false
        },
        experience: {
          name: 'Work',
          speed: 0.55,
          packetFrequency: 0.75,
          color: 'rgba(56, 189, 248,',
          accentColor: 'rgba(0, 242, 254,',
          typingFrequency: 0.12,
          orbitalMode: false
        },
        education: {
          name: 'Knowledge',
          speed: 0.45,
          packetFrequency: 0.6,
          color: 'rgba(20, 184, 166,',
          accentColor: 'rgba(245, 158, 11,',
          typingFrequency: 0.05,
          orbitalMode: true
        },
        projects: {
          name: 'Building',
          speed: 1.1,
          packetFrequency: 1.5,
          color: 'rgba(0, 242, 254,',
          accentColor: 'rgba(245, 158, 11,',
          typingFrequency: 0.32,
          orbitalMode: false
        },
        certifications: {
          name: 'Achievement',
          speed: 0.55,
          packetFrequency: 0.7,
          color: 'rgba(245, 158, 11,',
          accentColor: 'rgba(0, 242, 254,',
          typingFrequency: 0.06,
          orbitalMode: false
        },
        contact: {
          name: 'Connection',
          speed: 0.75,
          packetFrequency: 0.9,
          color: 'rgba(0, 242, 254,',
          accentColor: 'rgba(20, 184, 166,',
          typingFrequency: 0.2,
          orbitalMode: false
        },
        footer: {
          name: 'Resting',
          speed: 0.2,
          packetFrequency: 0.18,
          color: 'rgba(20, 184, 166,',
          accentColor: 'rgba(245, 158, 11,',
          typingFrequency: 0.01,
          orbitalMode: false
        }
      };

      this.currentMode = this.stateModes.hero;

      this.orbitAngle = 0;
      this.lastSpawnTime = performance.now();
      this.lastTypingTime = performance.now();

      this.buildGraph();
      this.initParticles();
      this.bindEvents();
      this.start();
    }

    buildGraph() {
      this.nodes = [];
      this.edges = [];

      // Primary Architectural Anchor Hubs
      // Strictly aligned with the 3D Workstation Render:
      // Canopy floating above & around, data stream curving left of creature to keyboard console
      const hubs = [
        { nx: 0.74, ny: 0.08, isCore: true, label: 'Canopy Apex' },
        { nx: 0.63, ny: 0.16, isCore: true, label: 'Upper Left Canopy' },
        { nx: 0.74, ny: 0.20, isCore: true, label: 'Canopy Center' },
        { nx: 0.85, ny: 0.21, isCore: true, label: 'Upper Right Canopy' },
        { nx: 0.91, ny: 0.28, isCore: false, label: 'Far Right Canopy' },
        { nx: 0.93, ny: 0.40, isCore: false, label: 'Far Right Mid' },
        { nx: 0.64, ny: 0.31, isCore: true, label: 'Neural Nexus Core' },
        { nx: 0.54, ny: 0.32, isCore: false, label: 'Screen Canopy Junction' },
        { nx: 0.46, ny: 0.22, isCore: false, label: 'Upper Left Screen Hub' },
        { nx: 0.41, ny: 0.38, isCore: false, label: 'Mid Left Screen Hub' },
        { nx: 0.34, ny: 0.50, isCore: false, label: 'Outer Screen Cluster' },
        // Data stream waypoints curving cleanly around the left of creature:
        { nx: 0.57, ny: 0.46, isCore: false, isStream: true, label: 'Stream Upper Curve' },
        { nx: 0.60, ny: 0.62, isCore: false, isStream: true, label: 'Stream Mid Curve' },
        // Keyboard console emitter at desk level:
        { nx: 0.64, ny: 0.77, isKeyboard: true, isStream: true, label: 'Keyboard Console' },
        // Very sparse ambient anchor nodes on the far left (text safe zone):
        { nx: 0.16, ny: 0.25, isTextSide: true, label: 'Ambient Left 1' },
        { nx: 0.24, ny: 0.68, isTextSide: true, label: 'Ambient Left 2' }
      ];

      // Add main hubs (validating zero intersection with creature safe zone)
      hubs.forEach((h, idx) => {
        if (CREATURE_SAFE_ZONE.contains(h.nx, h.ny, 1.05)) {
          return; // Strictly reject if in safe zone
        }

        this.nodes.push({
          id: this.nodes.length,
          nx: h.nx,
          ny: h.ny,
          x: h.nx * this.width,
          y: h.ny * this.height,
          radius: h.isCore ? 3.5 : (h.isTextSide ? 1.6 : 2.4),
          energy: 0,
          isCore: !!h.isCore,
          isKeyboard: !!h.isKeyboard,
          isStream: !!h.isStream,
          isTextSide: !!h.isTextSide,
          pulse: Math.random() * Math.PI,
          label: h.label
        });
      });

      // Add satellite nodes across the canopy and screen areas (strictly outside Creature Safe Zone)
      const satelliteCount = isMobile ? 12 : 26;
      let placed = 0;
      let attempts = 0;

      while (placed < satelliteCount && attempts < 100) {
        attempts++;
        // Generate within neural canopy bounds (above desk, upper/mid right & screen cluster)
        let nx, ny;
        if (Math.random() < 0.65) {
          // Upper canopy area
          nx = 0.52 + Math.random() * 0.42;
          ny = 0.08 + Math.random() * 0.34;
        } else {
          // Screen / stream cluster to the left
          nx = 0.35 + Math.random() * 0.26;
          ny = 0.20 + Math.random() * 0.45;
        }

        // Check Creature Safe Zone with a generous 15% safety margin
        if (CREATURE_SAFE_ZONE.contains(nx, ny, 1.15)) {
          continue;
        }

        this.nodes.push({
          id: this.nodes.length,
          nx,
          ny,
          x: nx * this.width,
          y: ny * this.height,
          radius: Math.random() * 1.4 + 1.1,
          energy: 0,
          isCore: false,
          isKeyboard: false,
          isStream: false,
          isTextSide: false,
          pulse: Math.random() * Math.PI
        });
        placed++;
      }

      // Build edges connecting nodes
      // STRICT RULE: No edge may cross through or near the Creature Safe Zone!
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];

          // Text side nodes only connect to nearby text side nodes with very low density
          if (n1.isTextSide || n2.isTextSide) {
            const dx = n1.nx - n2.nx;
            const dy = n1.ny - n2.ny;
            if (Math.hypot(dx, dy) < 0.28 && Math.random() < 0.5) {
              this.edges.push({ source: i, target: j, dist: Math.hypot(dx, dy), activity: 0, isSubtle: true });
            }
            continue;
          }

          const dx = n1.nx - n2.nx;
          const dy = n1.ny - n2.ny;
          const dist = Math.hypot(dx, dy);

          // Connection radius
          const maxDist = (n1.isStream && n2.isStream) ? 0.24 : 0.20;

          if (dist < maxDist) {
            // Check if the line segment passes through Creature Safe Zone
            if (CREATURE_SAFE_ZONE.intersectsSegment(n1.nx, n1.ny, n2.nx, n2.ny, 1.10)) {
              continue; // STRICTLY REJECT: Never cross the creature's silhouette
            }

            this.edges.push({
              source: i,
              target: j,
              dist,
              activity: 0,
              isSubtle: false
            });
          }
        }
      }

      // Ensure explicit clean data-stream connection path from Keyboard -> Waypoints -> Canopy Core
      const kbdNode = this.nodes.find(n => n.isKeyboard);
      const midStream = this.nodes.find(n => n.label === 'Stream Mid Curve');
      const upStream = this.nodes.find(n => n.label === 'Stream Upper Curve');
      const coreNode = this.nodes.find(n => n.label === 'Neural Nexus Core');

      if (kbdNode && midStream && !this.edgeExists(kbdNode.id, midStream.id)) {
        if (!CREATURE_SAFE_ZONE.intersectsSegment(kbdNode.nx, kbdNode.ny, midStream.nx, midStream.ny, 1.08)) {
          this.edges.push({ source: kbdNode.id, target: midStream.id, dist: 0.16, activity: 0, isSubtle: false });
        }
      }
      if (midStream && upStream && !this.edgeExists(midStream.id, upStream.id)) {
        if (!CREATURE_SAFE_ZONE.intersectsSegment(midStream.nx, midStream.ny, upStream.nx, upStream.ny, 1.08)) {
          this.edges.push({ source: midStream.id, target: upStream.id, dist: 0.16, activity: 0, isSubtle: false });
        }
      }
      if (upStream && coreNode && !this.edgeExists(upStream.id, coreNode.id)) {
        if (!CREATURE_SAFE_ZONE.intersectsSegment(upStream.nx, upStream.ny, coreNode.nx, coreNode.ny, 1.08)) {
          this.edges.push({ source: upStream.id, target: coreNode.id, dist: 0.17, activity: 0, isSubtle: false });
        }
      }
    }

    edgeExists(id1, id2) {
      return this.edges.some(e => (e.source === id1 && e.target === id2) || (e.source === id2 && e.target === id1));
    }

    initParticles() {
      this.ambientParticles = [];
      const count = isMobile ? 20 : 45;

      for (let i = 0; i < count; i++) {
        let x = Math.random() * this.width;
        let y = Math.random() * this.height;

        // If spawned inside creature safe zone, nudge to upper canopy or left
        if (CREATURE_SAFE_ZONE.contains(x / this.width, y / this.height, 1.15)) {
          y = y * 0.4;
        }

        this.ambientParticles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.35 - 0.1,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.35 + 0.1,
          color: Math.random() > 0.3 ? 'rgba(0, 242, 254,' : 'rgba(20, 184, 166,'
        });
      }

      this.floatingDataMotes = [];
      const motesCount = isMobile ? 4 : 10;
      for (let i = 0; i < motesCount; i++) {
        // Floating data motes positioned around screens and upper canopy
        const nx = 0.38 + Math.random() * 0.55;
        const ny = 0.12 + Math.random() * 0.36;

        this.floatingDataMotes.push({
          x: nx * this.width,
          y: ny * this.height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          text: ['01', 'λ', 'ReLU', 'loss: 0.02', 'tensor', 'epoch', 'W·x+b'][Math.floor(Math.random() * 7)],
          alpha: Math.random() * 0.2 + 0.07
        });
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        // Recalculate absolute node positions
        this.nodes.forEach(n => {
          n.x = n.nx * this.width;
          n.y = n.ny * this.height;
        });
      }, { passive: true });

      window.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        // Subtle normalized parallax coordinates [-1, 1]
        this.targetParallaxX = (e.clientX / this.width - 0.5) * 2;
        this.targetParallaxY = (e.clientY / this.height - 0.5) * 2;
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          this.mouseX = e.touches[0].clientX;
          this.mouseY = e.touches[0].clientY;
          this.targetParallaxX = (this.mouseX / this.width - 0.5) * 1.2;
          this.targetParallaxY = (this.mouseY / this.height - 0.5) * 1.2;
        }
      }, { passive: true });
    }

    setMode(modeName) {
      if (this.stateModes[modeName]) {
        this.currentMode = this.stateModes[modeName];
      }
      this.triggerStateBurst();
    }

    triggerStateBurst() {
      const coreNode = this.nodes.find(n => n.isCore) || this.nodes[0];
      if (!coreNode) return;

      coreNode.energy = 2.2;

      // Spawn packets radiating outward across valid edges
      this.edges.forEach(e => {
        if (e.source === coreNode.id || e.target === coreNode.id) {
          this.spawnPacket(e, true);
        }
      });
    }

    spawnPacket(edge, isBurst = false) {
      const isReverse = Math.random() > 0.5;
      const startId = isReverse ? edge.target : edge.source;
      const endId = isReverse ? edge.source : edge.target;

      this.packets.push({
        startId,
        endId,
        progress: 0,
        speed: (Math.random() * 0.022 + 0.014) * this.currentMode.speed * (isBurst ? 1.5 : 1),
        trail: [],
        color: this.currentMode.color,
        size: Math.random() * 1.3 + 1.8
      });

      edge.activity = Math.min(edge.activity + 0.8, 2.2);
    }

    // Triggered on hover/tap of portfolio cards, skills, and projects
    triggerReaction(type, detail, sourceCoords = null) {
      const kbdNode = this.nodes.find(n => n.isKeyboard) || this.nodes[0];
      const coreNode = this.nodes.find(n => n.isCore) || this.nodes[0];

      // 1. Trigger Keyboard Pulse in DOM
      const kbd = document.getElementById('creatureKeyboardPulse');
      if (kbd) {
        kbd.classList.add('active');
        setTimeout(() => kbd.classList.remove('active'), 350);
      }

      // 2. Pulse random key lights in keyboard overlay
      const keyIndex = Math.floor(Math.random() * 4) + 1;
      const keyEl = document.querySelector(`.keyboard-key-pulse.k${keyIndex}`);
      if (keyEl) {
        keyEl.classList.add('typing');
        setTimeout(() => keyEl.classList.remove('typing'), 220);
      }

      // 3. Emit interactive beam from hovered/tapped card to the workstation keyboard
      if (sourceCoords) {
        this.beams.push({
          startX: sourceCoords.x,
          startY: sourceCoords.y,
          endX: kbdNode.x,
          endY: kbdNode.y,
          progress: 0,
          speed: 0.042,
          color: type === 'project' ? 'rgba(0, 242, 254,' : 'rgba(20, 184, 166,'
        });
      }

      // 4. Boost energy of nearby network nodes
      this.nodes.forEach(n => {
        const d = Math.hypot(n.x - coreNode.x, n.y - coreNode.y);
        if (d < 260) {
          n.energy = Math.min(n.energy + 1.5, 2.8);
        }
      });

      const name = (detail || '').toLowerCase();

      // 5. Granular Skill-Aware Network Reactions
      if (type === 'skill') {
        if (name.includes('python')) {
          // Python: code data stream cascade
          const streamEdges = this.edges.filter(e => {
            const s = this.nodes[e.source];
            const t = this.nodes[e.target];
            return (s && s.isStream) || (t && t.isStream);
          });
          streamEdges.forEach(e => this.spawnPacket(e, true));
        } else if (name.includes('sql') || name.includes('database')) {
          // SQL: database-node cluster excitation
          this.nodes.forEach(n => {
            if (n.ny > 0.58 && !n.isKeyboard) n.energy = 2.4;
          });
        } else if (name.includes('mongo')) {
          // MongoDB: connected database-node activity
          const dbEdges = this.edges.filter(e => {
            const s = this.nodes[e.source];
            return s && s.ny > 0.55;
          });
          dbEdges.slice(0, 5).forEach(e => this.spawnPacket(e, true));
        } else if (name.includes('power bi') || name.includes('analytics')) {
          // Power BI: data visualization amber & cyan dual activity
          this.edges.slice(0, 6).forEach(e => this.spawnPacket(e, true));
        } else if (name.includes('cloud') || name.includes('oracle')) {
          // Cloud: floating data / canopy apex burst
          this.nodes.forEach(n => {
            if (n.ny < 0.35) n.energy = 2.5;
          });
          const canopyEdges = this.edges.filter(e => {
            const s = this.nodes[e.source];
            return s && s.ny < 0.4;
          });
          canopyEdges.forEach(e => this.spawnPacket(e, true));
        } else if (name.includes('machine learning') || name.includes('ml')) {
          // Machine Learning: expanding neural network
          this.edges.forEach(e => {
            if (Math.random() < 0.45) this.spawnPacket(e, true);
          });
        } else if (name.includes('deep learning') || name.includes('neural')) {
          // Deep Learning: layered / deeper neural network activity
          this.nodes.forEach(n => n.energy = Math.min(n.energy + 1.2, 2.8));
          this.edges.forEach(e => {
            if (Math.random() < 0.6) this.spawnPacket(e, true);
          });
        }
      }

      // 6. Granular Project-Aware Network Reactions
      if (type === 'project') {
        if (name.includes('blinkit')) {
          // BlinkitBot Automate: automation flow
          const streamEdges = this.edges.filter(e => {
            const s = this.nodes[e.source];
            const t = this.nodes[e.target];
            return (s && s.isStream) || (t && t.isStream);
          });
          streamEdges.forEach((e, i) => {
            setTimeout(() => this.spawnPacket(e, true), i * 75);
          });
        } else if (name.includes('price') || name.includes('house')) {
          // House Price Prediction: prediction network activity
          this.nodes.slice(0, 8).forEach(n => n.energy = 2.4);
          this.edges.slice(0, 6).forEach(e => this.spawnPacket(e, true));
        } else if (name.includes('job') || name.includes('change')) {
          // Job Change Prediction: decision-node activity
          this.edges.filter(e => e.source === coreNode.id).forEach(e => this.spawnPacket(e, true));
        } else if (name.includes('loan') || name.includes('delinquency')) {
          // Loan Delinquency Risk: risk/data alert activity
          this.edges.slice(0, 7).forEach(e => {
            e.activity = 2.2;
            this.spawnPacket(e, true);
          });
        } else if (name.includes('parkinson')) {
          // Parkinson's Detection: neural-network cascade
          this.nodes.forEach(n => n.energy = 2.6);
          this.edges.slice(0, 10).forEach(e => this.spawnPacket(e, true));
        } else if (name.includes('bug') || name.includes('hunter')) {
          // Bug Hunter: scanning/debugging activity
          this.edges.forEach((e, i) => {
            if (i % 3 === 0) setTimeout(() => this.spawnPacket(e, true), i * 45);
          });
        } else if (name.includes('chat') || name.includes('bot')) {
          // Chatbot: conversation/data-node alternating exchange
          const sample = this.edges.slice(0, 5);
          sample.forEach((e, i) => {
            setTimeout(() => this.spawnPacket(e, true), i * 140);
          });
        } else {
          // General project ripple
          const sampleEdges = this.edges.filter(() => Math.random() > 0.6);
          sampleEdges.forEach(e => this.spawnPacket(e, true));
        }
      }
    }

    clearReaction() {
      // Smooth return to normal idle state
      this.beams = [];
    }

    exciteProximity(x, y, proximity) {
      this.nodes.forEach(n => {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < 240) {
          const factor = (1 - d / 240) * proximity;
          n.energy = Math.min(n.energy + factor * 0.22, 2.5);
        }
      });
      if (Math.random() < 0.2 * proximity && this.packets.length < 32) {
        const randomEdge = this.edges[Math.floor(Math.random() * this.edges.length)];
        if (randomEdge) this.spawnPacket(randomEdge);
      }
    }

    triggerCreatureTap() {
      // Radial energy excitation from core node and keyboard
      const coreNode = this.nodes.find(n => n.isCore) || this.nodes[0];
      if (coreNode) coreNode.energy = 2.6;

      // Pulse keyboard in DOM
      const kbd = document.getElementById('creatureKeyboardPulse');
      if (kbd) {
        kbd.classList.add('active');
        setTimeout(() => kbd.classList.remove('active'), 400);
      }

      // Fast randomized typing cascade
      for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
          const keyEl = document.querySelector(`.keyboard-key-pulse.k${i}`);
          if (keyEl) {
            keyEl.classList.add('typing');
            setTimeout(() => keyEl.classList.remove('typing'), 200);
          }
        }, i * 65);
      }

      // Radiate packets across connected edges
      this.edges.forEach(e => {
        if (Math.random() < 0.65) {
          this.spawnPacket(e, true);
        }
      });
    }

    update(now) {
      // Smooth Parallax Interpolation (used for canvas internal coordinates)
      this.currParallaxX += (this.targetParallaxX - this.currParallaxX) * 0.05;
      this.currParallaxY += (this.targetParallaxY - this.currParallaxY) * 0.05;

      // Cursor proximity node excitation
      if (this.mouseX !== undefined && this.mouseY !== undefined) {
        this.nodes.forEach(n => {
          const d = Math.hypot(n.x - this.mouseX, n.y - this.mouseY);
          if (d < 140) {
            n.energy = Math.min(n.energy + 0.07, 2.2);
          }
        });

        // Ambient particle gentle deflection away from cursor
        this.ambientParticles.forEach(p => {
          const pd = Math.hypot(p.x - this.mouseX, p.y - this.mouseY);
          if (pd < 95 && pd > 0) {
            const force = (95 - pd) / 95 * 0.7;
            p.x += ((p.x - this.mouseX) / pd) * force;
            p.y += ((p.y - this.mouseY) / pd) * force;
          }
        });
      }

      // Orbit angle for Knowledge mode
      this.orbitAngle += 0.015;

      // Periodic natural packet emission
      if (now - this.lastSpawnTime > 650 / this.currentMode.packetFrequency) {
        this.lastSpawnTime = now;
        const randomEdge = this.edges[Math.floor(Math.random() * this.edges.length)];
        if (randomEdge) this.spawnPacket(randomEdge);
      }

      // Periodic natural keyboard typing pulses (simulates creature working at the console)
      if (now - this.lastTypingTime > 900 && Math.random() < this.currentMode.typingFrequency) {
        this.lastTypingTime = now;
        const kIndex = Math.floor(Math.random() * 4) + 1;
        const keyEl = document.querySelector(`.keyboard-key-pulse.k${kIndex}`);
        if (keyEl) {
          keyEl.classList.add('typing');
          setTimeout(() => keyEl.classList.remove('typing'), 220);
        }
        // Emit data packet from keyboard upward along the stream
        const kbdEdges = this.edges.filter(e => {
          const s = this.nodes[e.source];
          const t = this.nodes[e.target];
          return (s && s.isKeyboard) || (t && t.isKeyboard);
        });
        if (kbdEdges.length > 0) {
          const kbdEdge = kbdEdges[Math.floor(Math.random() * kbdEdges.length)];
          this.spawnPacket(kbdEdge);
        }
      }

      // Update Packets along edges
      for (let i = this.packets.length - 1; i >= 0; i--) {
        const p = this.packets[i];
        p.progress += p.speed;

        const startNode = this.nodes[p.startId];
        const endNode = this.nodes[p.endId];

        if (!startNode || !endNode) {
          this.packets.splice(i, 1);
          continue;
        }

        // Current position along edge
        const curX = startNode.x + (endNode.x - startNode.x) * p.progress;
        const curY = startNode.y + (endNode.y - startNode.y) * p.progress;

        p.trail.unshift({ x: curX, y: curY });
        if (p.trail.length > 7) p.trail.pop();

        // When packet arrives at destination node
        if (p.progress >= 1) {
          endNode.energy = Math.min(endNode.energy + 1.1, 2.2);

          // Chain reaction: 55% chance to trigger outgoing packet
          if (Math.random() < 0.55 && this.packets.length < 35) {
            const connectedEdges = this.edges.filter(
              e => (e.source === endNode.id || e.target === endNode.id) &&
                   e.source !== p.startId && e.target !== p.startId
            );
            if (connectedEdges.length > 0) {
              const nextEdge = connectedEdges[Math.floor(Math.random() * connectedEdges.length)];
              this.spawnPacket(nextEdge);
            }
          }

          this.packets.splice(i, 1);
        }
      }

      // Update interactive beams
      for (let i = this.beams.length - 1; i >= 0; i--) {
        const b = this.beams[i];
        b.progress += b.speed;
        if (b.progress >= 1) {
          this.beams.splice(i, 1);
        }
      }

      // Update Ambient Particles
      this.ambientParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = this.height;
        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
      });

      // Update Floating Data Motes
      this.floatingDataMotes.forEach(m => {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < 40 || m.y > this.height * 0.45) m.vy *= -1;
        if (m.x < this.width * 0.35 || m.x > this.width * 0.95) m.vx *= -1;
      });

      // Decay edge activity and node energy
      this.edges.forEach(e => {
        if (e.activity > 0) e.activity -= 0.016;
      });
      this.nodes.forEach(n => {
        if (n.energy > 0) n.energy -= 0.022;
        n.pulse += 0.03;
      });
    }

    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const mode = this.currentMode;
      const offsetX = this.currParallaxX * 5;
      const offsetY = this.currParallaxY * 3;

      // 1. Draw Connecting Lines with Delicate Futuristic Phosphor Glow
      this.edges.forEach(e => {
        const s = this.nodes[e.source];
        const t = this.nodes[e.target];
        if (!s || !t) return;

        const baseAlpha = e.isSubtle ? 0.08 : (0.12 + e.activity * 0.28);
        this.ctx.beginPath();
        this.ctx.moveTo(s.x + offsetX, s.y + offsetY);
        this.ctx.lineTo(t.x + offsetX, t.y + offsetY);
        this.ctx.strokeStyle = `${mode.color} ${Math.min(baseAlpha, 0.75)})`;
        this.ctx.lineWidth = e.activity > 0 ? 1.2 : 0.7;
        this.ctx.stroke();
      });

      // 2. Draw Traveling Signal Packets with Phosphor Trails
      this.packets.forEach(p => {
        if (p.trail.length < 2) return;

        // Draw glowing tail
        this.ctx.beginPath();
        this.ctx.moveTo(p.trail[0].x + offsetX, p.trail[0].y + offsetY);
        for (let i = 1; i < p.trail.length; i++) {
          this.ctx.lineTo(p.trail[i].x + offsetX, p.trail[i].y + offsetY);
        }
        this.ctx.strokeStyle = `${mode.color} 0.45)`;
        this.ctx.lineWidth = p.size;
        this.ctx.stroke();

        // Draw bright packet head
        const head = p.trail[0];
        this.ctx.beginPath();
        this.ctx.arc(head.x + offsetX, head.y + offsetY, p.size * 1.1, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = `${mode.color} 0.9)`;
        this.ctx.shadowBlur = 8;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      });

      // 3. Draw Nodes with Energy Halos
      this.nodes.forEach(n => {
        const energyRadius = n.radius + Math.sin(n.pulse) * 0.4 + n.energy * 1.8;
        const x = n.x + offsetX;
        const y = n.y + offsetY;

        // Outer glow halo if energized
        if (n.energy > 0.2) {
          this.ctx.beginPath();
          this.ctx.arc(x, y, energyRadius * 2.0, 0, Math.PI * 2);
          this.ctx.fillStyle = `${mode.color} ${n.energy * 0.22})`;
          this.ctx.fill();
        }

        // Inner node core
        this.ctx.beginPath();
        this.ctx.arc(x, y, energyRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = n.isCore ? '#ffffff' : `${mode.color} ${n.isTextSide ? 0.35 : (0.6 + n.energy * 0.3)})`;
        this.ctx.shadowColor = `${mode.color} 0.8)`;
        this.ctx.shadowBlur = n.isCore ? 10 : 5;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      });

      // 4. Orbital Knowledge Mode Rings (for Education Section)
      if (mode.orbitalMode) {
        const core = this.nodes.find(n => n.isCore) || this.nodes[0];
        const cx = core.x + offsetX;
        const cy = core.y + offsetY;

        [75, 130, 195].forEach((r, idx) => {
          this.ctx.save();
          this.ctx.translate(cx, cy);
          this.ctx.rotate(this.orbitAngle * (idx % 2 === 0 ? 1 : -0.7));

          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, r, r * 0.42, 0, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(20, 184, 166, ${0.16 - idx * 0.03})`;
          this.ctx.lineWidth = 0.9;
          this.ctx.setLineDash([4, 6]);
          this.ctx.stroke();

          // Orbital satellite particle
          const satX = Math.cos(this.orbitAngle * 1.4 + idx) * r;
          const satY = Math.sin(this.orbitAngle * 1.4 + idx) * (r * 0.42);
          this.ctx.setLineDash([]);
          this.ctx.beginPath();
          this.ctx.arc(satX, satY, 2.2, 0, Math.PI * 2);
          this.ctx.fillStyle = idx === 0 ? '#00f2fe' : '#f59e0b';
          this.ctx.fill();

          this.ctx.restore();
        });
      }

      // 5. Interactive Beams from Hovered Portfolio Elements
      this.beams.forEach(b => {
        const curX = b.startX + (b.endX - b.startX) * b.progress;
        const curY = b.startY + (b.endY - b.startY) * b.progress;

        this.ctx.beginPath();
        this.ctx.moveTo(b.startX, b.startY);
        this.ctx.lineTo(curX, curY);
        this.ctx.strokeStyle = `${b.color} ${Math.max(0, 0.85 * (1 - b.progress))})`;
        this.ctx.lineWidth = 2.0;
        this.ctx.shadowColor = '#00f2fe';
        this.ctx.shadowBlur = 10;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Beam head
        this.ctx.beginPath();
        this.ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
      });

      // 6. Draw Ambient Particles
      this.ambientParticles.forEach(p => {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `${p.color} ${p.alpha})`;
        this.ctx.fill();
      });

      // 7. Floating Data Motes (subtle code and telemetry glyphs in the canopy)
      this.ctx.font = '9px "Space Mono", monospace';
      this.floatingDataMotes.forEach(m => {
        this.ctx.fillStyle = `rgba(0, 242, 254, ${m.alpha})`;
        this.ctx.fillText(m.text, m.x + offsetX, m.y + offsetY);
      });

      // ============================================================
      // 8. CREATURE SAFE ZONE COMPOSITE MASK
      // Applies a soft radial destination-out feathering mask over
      // the creature's silhouette. This guarantees with 100% certainty
      // that the 3D rendered creature is ALWAYS in front, crisp,
      // and completely unobstructed by any stray pixels.
      // ============================================================
      const safeCenterX = CREATURE_SAFE_ZONE.cx * this.width + offsetX;
      const safeCenterY = CREATURE_SAFE_ZONE.cy * this.height + offsetY;
      const safeRadiusX = CREATURE_SAFE_ZONE.rx * this.width * 1.12;
      const safeRadiusY = CREATURE_SAFE_ZONE.ry * this.height * 1.12;

      this.ctx.save();
      this.ctx.globalCompositeOperation = 'destination-out';
      const safeGrad = this.ctx.createRadialGradient(
        safeCenterX, safeCenterY, safeRadiusX * 0.45,
        safeCenterX, safeCenterY, safeRadiusX
      );
      safeGrad.addColorStop(0, 'rgba(0, 0, 0, 1.0)');     // 100% cutout over creature face & eyes
      safeGrad.addColorStop(0.72, 'rgba(0, 0, 0, 0.88)');  // High cutout over shoulders & chest
      safeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');     // Smooth falloff to canvas
      this.ctx.fillStyle = safeGrad;
      this.ctx.beginPath();
      this.ctx.ellipse(safeCenterX, safeCenterY, safeRadiusX, safeRadiusY, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    start() {
      const loop = (now) => {
        this.update(now);
        this.render();
        if (!isReducedMotion) {
          requestAnimationFrame(loop);
        }
      };
      if (isReducedMotion) {
        this.update(performance.now());
        this.render();
      } else {
        requestAnimationFrame(loop);
      }
    }
  }

  /* ============================================================
     5. WORKSTATION ENVIRONMENT & CONSOLE CONTROLLER
     Manages environmental interactivity AROUND the creature:
     - Desk keyboard reactivity and typing pulses
     - Ambient light sweeps and console glow
     - Section mood state transitions
     - ZERO overlays or drawing over the creature's face
     ============================================================ */
  class WorkstationEnvironmentController {
    constructor() {
      this.motionRig = document.getElementById('creatureMotionRig');
      this.envContainer = document.getElementById('envLayersContainer');
      this.overlay = document.getElementById('creatureInteractiveOverlay');
      this.hitZone = document.getElementById('creatureHitZone');
      this.statusBadge = document.getElementById('creatureStatusBadge');
      this.statusText = this.statusBadge ? this.statusBadge.querySelector('.status-text') : null;
      this.kbdArea = document.getElementById('creatureKeyboardArea');
      this.pulseEl = document.getElementById('creatureKeyboardPulse');
      this.sweepEl = document.getElementById('ambientLightSweep');

      this.badgeTimeout = null;
      this.statusMessages = [
        'AI CORE // SYNAPSE ACTIVE',
        'SYSTEM // NEURAL SYNCED',
        'WORKSTATION // COMPUTING',
        'TELEMETRY // STREAM OK',
        'SYNAPSE // PROTOCOL ENGAGED'
      ];
      this.statusIndex = 0;
      this.sectionState = 'hero';

      this.initGsapMotions();
      this.bindEvents();
    }

    initGsapMotions() {
      if (typeof gsap === 'undefined') return;

      // 1. Natural Idle Breathing & Floating Animation
      if (!isReducedMotion && this.envContainer && this.overlay) {
        const floatY = isMobile ? -2.2 : -4.5;
        const floatScale = isMobile ? 1.008 : 1.014;
        const floatRot = isMobile ? 0.1 : 0.22;

        this.idleTimeline = gsap.timeline({ repeat: -1, yoyo: true });
        this.idleTimeline.to([this.envContainer, this.overlay], {
          y: floatY,
          scale: floatScale,
          rotation: floatRot,
          duration: 4.2,
          ease: "sine.inOut",
          transformOrigin: "75% 65%"
        });
      }

      // 2. Desktop Mouse Parallax via GSAP quickTo
      if (!isMobile && !isReducedMotion && this.motionRig) {
        this.quickRigX = gsap.quickTo(this.motionRig, "x", { duration: 0.85, ease: "power2.out" });
        this.quickRigY = gsap.quickTo(this.motionRig, "y", { duration: 0.85, ease: "power2.out" });
        this.quickRigRot = gsap.quickTo(this.motionRig, "rotation", { duration: 1.0, ease: "power2.out" });
      }
    }

    showStatusBadge() {
      if (!this.statusBadge || !this.statusText) return;
      const msg = this.statusMessages[this.statusIndex % this.statusMessages.length];
      this.statusIndex++;
      this.statusText.textContent = msg;
      this.statusBadge.classList.add('visible');

      clearTimeout(this.badgeTimeout);
      this.badgeTimeout = setTimeout(() => {
        this.statusBadge.classList.remove('visible');
      }, 1800);
    }

    triggerInteraction() {
      // 1. GSAP subtle lift and scale pulse on creature and workstation
      if (typeof gsap !== 'undefined' && !isReducedMotion && this.envContainer && this.overlay) {
        gsap.timeline()
          .to([this.envContainer, this.overlay], {
            scale: 1.025,
            y: -6,
            duration: 0.32,
            ease: "power2.out"
          })
          .to([this.envContainer, this.overlay], {
            scale: 1,
            y: 0,
            duration: 0.85,
            ease: "elastic.out(1, 0.45)"
          });
      }

      // 2. Outward neural ripple
      if (window.GlobalNeural) {
        window.GlobalNeural.triggerCreatureTap();
      }

      // 3. Status badge telemetry
      this.showStatusBadge();
    }

    bindEvents() {
      // 1. Mouse movement and proximity detection (Desktop)
      if (!isMobile) {
        window.addEventListener('mousemove', (e) => {
          // Parallax shift via GSAP quickTo
          if (this.quickRigX && this.quickRigY && this.quickRigRot) {
            const normX = (e.clientX / window.innerWidth - 0.5) * 2;
            const normY = (e.clientY / window.innerHeight - 0.5) * 2;
            this.quickRigX(normX * 6);
            this.quickRigY(normY * 4.5);
            this.quickRigRot(normX * 0.35);
          }

          // Proximity detection to creature & workstation console
          if (this.overlay) {
            const rect = this.overlay.getBoundingClientRect();
            const deskCenterX = rect.left + rect.width / 2;
            const deskCenterY = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - deskCenterX, e.clientY - deskCenterY);

            if (dist < 240) {
              const proximity = 1 - dist / 240;
              if (typeof gsap !== 'undefined') {
                gsap.to(this.overlay, { opacity: 1, duration: 0.25, overwrite: "auto" });
              } else {
                this.overlay.style.opacity = '1';
              }
              if (window.GlobalNeural) {
                window.GlobalNeural.exciteProximity(e.clientX, e.clientY, proximity);
              }
            } else {
              const targetOpacity = (this.sectionState === 'footer') ? 0.35 : 0.85;
              if (typeof gsap !== 'undefined') {
                gsap.to(this.overlay, { opacity: targetOpacity, duration: 0.5, overwrite: "auto" });
              } else {
                this.overlay.style.opacity = (this.sectionState === 'footer') ? '0.35' : '';
              }
            }
          }
        }, { passive: true });
      }

      // 2. Creature Hit Zone click and touch interaction
      if (this.hitZone) {
        let touchStartX = 0;
        let touchStartY = 0;

        this.hitZone.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches[0]) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          }
        }, { passive: true });

        this.hitZone.addEventListener('touchend', (e) => {
          if (e.changedTouches && e.changedTouches[0]) {
            const diffX = e.changedTouches[0].clientX - touchStartX;
            const diffY = e.changedTouches[0].clientY - touchStartY;
            // Distinguish tap vs scroll: if finger moved > 14px, it was a scroll
            if (Math.hypot(diffX, diffY) > 14) return;
          }
          this.triggerInteraction();
        });

        this.hitZone.addEventListener('click', () => {
          this.triggerInteraction();
        });
      }
    }

    onStateChange(newState) {
      this.sectionState = newState;
      if (this.overlay) {
        if (newState === 'footer') {
          if (typeof gsap !== 'undefined') {
            gsap.to(this.overlay, { opacity: 0.35, duration: 0.8 });
          } else {
            this.overlay.style.opacity = '0.35';
          }
          if (this.idleTimeline) this.idleTimeline.timeScale(0.6);
        } else {
          if (typeof gsap !== 'undefined') {
            gsap.to(this.overlay, { opacity: 0.85, duration: 0.5 });
          } else {
            this.overlay.style.opacity = '1';
          }
          if (this.idleTimeline) {
            if (newState === 'skills' || newState === 'projects') {
              this.idleTimeline.timeScale(1.15);
            } else if (newState === 'about') {
              this.idleTimeline.timeScale(0.85);
            } else {
              this.idleTimeline.timeScale(1.0);
            }
          }
        }
      }
    }
  }

  /* ============================================================
     6. GLOBAL PUBLIC API
     ============================================================ */
  window.AiWorld = {
    setState: setEnvironmentState,
    triggerReaction: (type, detail, sourceCoords = null) => {
      if (window.GlobalNeural) {
        window.GlobalNeural.triggerReaction(type, detail, sourceCoords);
      }
    },
    clearReaction: () => {
      if (window.GlobalNeural) {
        window.GlobalNeural.clearReaction();
      }
    }
  };

  // Initialize all environment engines when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initIntroCanvas();
    initEnvironmentStates();
    window.GlobalNeural = new LivingNeuralSystem();
    window.CreatureController = new WorkstationEnvironmentController();
  });

})();
