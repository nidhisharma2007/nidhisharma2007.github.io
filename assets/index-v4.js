(function () {
  "use strict";

  /* ---------------- Data ---------------- */

  var EMAIL = "studypower2022@gmail.com";
  var GITHUB = "https://github.com/nidhisharma2007";
  var LINKEDIN =
    "https://www.linkedin.com/in/nidhi-sharma-738646371?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  var RESUME_URL = "./assets/Nidhi-Sharma-Resume.pdf";
  var RESUME_FILENAME = "Nidhi-Sharma-Resume.pdf";

  var NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  var SKILLS = [
    { name: "Python", label: "Programming language", icon: "code" },
    { name: "SQL", label: "Data querying", icon: "database" },
    { name: "MongoDB", label: "Document database", icon: "layers" },
    { name: "Power BI", label: "Data visualization", icon: "bar-chart" },
    { name: "Cloud Computing", label: "Cloud technologies", icon: "cloud" },
    { name: "Machine Learning", label: "Intelligent systems", icon: "cpu" },
    { name: "Deep Learning", label: "Neural networks", icon: "network" },
  ];

  var EXPERIENCE = [
    {
      role: "Machine Learning Intern",
      org: "AcmeGrade",
      period: "Mar 2026 – May 2026",
      desc: "Completed a 2-month Machine Learning internship, earning a certification for dedication and consistent performance.",
    },
    {
      role: "National Internship Program",
      org: "Pega X Smart Bridge",
      period: "Aug 2026 – Sep 2026 · East Delhi, Delhi",
      desc: "Selected for a national-level internship program focused on applied problem-solving and industry exposure.",
    },
  ];

  var PROJECTS = [
    {
      name: "House Price Prediction",
      file: "HOUSE PRICE PREDICTION.ipynb",
      description: "A prediction project presented as a Jupyter notebook.",
      tags: ["Prediction", "Notebook"],
      url: "https://github.com/nidhisharma2007/projects/blob/main/HOUSE%20PRICE%20PREDICTION.ipynb",
    },
    {
      name: "Job Change Prediction",
      file: "Job_Change_Prediction.ipynb",
      description: "A prediction project presented as a Jupyter notebook.",
      tags: ["Prediction", "Notebook"],
      url: "https://github.com/nidhisharma2007/projects/blob/main/Job_Change_Prediction.ipynb",
    },
    {
      name: "Loan Delinquency Risk Analysis",
      file: "Loan_Delinquency_Risk_Analysis.ipynb",
      description: "A risk analysis project presented as a Jupyter notebook.",
      tags: ["Risk analysis", "Notebook"],
      url: "https://github.com/nidhisharma2007/projects/blob/main/Loan_Delinquency_Risk_Analysis.ipynb",
    },
    {
      name: "Parkinson's Disease Detection",
      file: "PARKINSONS_DISEASE.ipynb",
      description: "A disease detection project presented as a Jupyter notebook.",
      tags: ["Detection", "Notebook"],
      url: "https://github.com/nidhisharma2007/projects/blob/main/PARKINSONS_DISEASE.ipynb",
    },
    {
      name: "Bug Hunter",
      file: "bug_hunter.py",
      description: "A Python file focused on bug hunting.",
      tags: ["Python", "Script"],
      url: "https://github.com/nidhisharma2007/projects/blob/main/bug_hunter.py",
    },
    {
      name: "Chatbot",
      file: "chatbot.py",
      description: "A Python file focused on a chatbot.",
      tags: ["Python", "Script"],
      url: "https://github.com/nidhisharma2007/projects/blob/main/chatbot.py",
    },
  ];

  var CERTIFICATIONS = [
    {
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Oracle Cloud Infrastructure",
      date: "Issued Oct 2025",
    },
    {
      title: "Learning Data Analytics: 1 Foundations",
      issuer: "LinkedIn Learning Community",
      date: "Issued Nov 2025",
    },
    {
      title: "SQL and Relational Databases 101",
      issuer: "United Latino Students",
      date: "Issued Dec 2025",
    },
    {
      title: "National Internship Program Completion",
      issuer: "Pegasystems Worldwide India Private Limited in collaboration with Smart Bridge",
      date: "Issued Sept 2026",
    },
  ];

  /* ---------------- Small DOM helpers ---------------- */

  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    for (var key in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
      var value = attrs[key];
      if (value === null || value === undefined || value === false) continue;
      if (key === "html") {
        node.innerHTML = value;
      } else if (key.indexOf("on") === 0 && typeof value === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "class") {
        node.className = value;
      } else {
        node.setAttribute(key, value);
      }
    }
    children = children || [];
    if (!Array.isArray(children)) children = [children];
    children.forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      if (typeof child === "string" || typeof child === "number") {
        node.appendChild(document.createTextNode(child));
      } else {
        node.appendChild(child);
      }
    });
    return node;
  }

  function icon(name, size) {
    size = size || 18;
    var paths = {
      code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
      database:
        '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>',
      layers:
        '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
      "bar-chart": '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>',
      cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9z"></path>',
      cpu: '<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"></path>',
      network:
        '<circle cx="12" cy="5" r="2.2"></circle><circle cx="5" cy="19" r="2.2"></circle><circle cx="19" cy="19" r="2.2"></circle><path d="M12 7.2V13M12 13 6.4 17.3M12 13l5.6 4.3"></path>',
      download: '<path d="M12 3v12"></path><polyline points="7 11 12 16 17 11"></polyline><path d="M4 19h16"></path>',
      eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle>',
      "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
      mail: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="2 7 12 13 22 7"></polyline>',
      github:
        '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.1-.5 2V21"></path>',
      linkedin:
        '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
      calendar:
        '<rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
      award:
        '<circle cx="12" cy="9" r="6"></circle><path d="M8.5 14 7 22l5-3 5 3-1.5-8"></path>',
      "graduation-cap":
        '<path d="M22 10 12 4 2 10l10 6 10-6z"></path><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"></path>',
      menu: '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
      close: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
      terminal: '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>',
    };
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.7");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.innerHTML = paths[name] || "";
    return svg;
  }

  function downloadIcon(name, size) {
    var wrap = icon(name, size);
    return wrap;
  }

  function scrollToId(id, after) {
    var target = document.getElementById(id);
    if (target) {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    if (typeof after === "function") after();
  }

  /* ---------------- Sections ---------------- */

  function buildNav() {
    var mobileOpen = false;

    var brand = h("button", { class: "brand-mark", type: "button", "aria-label": "Go to home section" }, [
      h("span", { class: "brand-monogram" }, "NS"),
      h("span", { class: "brand-name" }, "Nidhi Sharma"),
    ]);
    brand.addEventListener("click", function () {
      scrollToId("home");
      closeMobile();
    });

    var desktopLinks = NAV_ITEMS.map(function (item) {
      var btn = h("button", { class: "nav-link", type: "button", "data-nav-id": item.id }, item.label);
      btn.addEventListener("click", function () {
        scrollToId(item.id);
      });
      return btn;
    });

    var desktopNav = h("nav", { class: "desktop-nav", "aria-label": "Primary navigation" }, desktopLinks);

    var mobileLinks = NAV_ITEMS.map(function (item) {
      var btn = h("button", { class: "nav-link", type: "button", "data-nav-id-mobile": item.id }, item.label);
      btn.addEventListener("click", function () {
        scrollToId(item.id);
        closeMobile();
      });
      return btn;
    });
    var mobileNav = h("nav", { id: "mobile-navigation", class: "mobile-nav", "aria-label": "Mobile navigation" }, mobileLinks);

    var toggleBtn = h("button", {
      class: "nav-menu-toggle",
      type: "button",
      "aria-expanded": "false",
      "aria-controls": "mobile-navigation",
      "aria-label": "Open navigation menu",
    }, icon("menu", 18));

    function closeMobile() {
      mobileOpen = false;
      mobileNav.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.innerHTML = "";
      toggleBtn.appendChild(icon("menu", 18));
    }

    toggleBtn.addEventListener("click", function () {
      mobileOpen = !mobileOpen;
      mobileNav.classList.toggle("open", mobileOpen);
      toggleBtn.setAttribute("aria-expanded", String(mobileOpen));
      toggleBtn.innerHTML = "";
      toggleBtn.appendChild(icon(mobileOpen ? "close" : "menu", 18));
    });

    var inner = h("div", { class: "nav-inner" }, [brand, desktopNav, toggleBtn]);
    var header = h("header", { class: "site-nav" }, [inner, mobileNav]);

    header._updateActive = function (activeId) {
      desktopLinks.forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-nav-id") === activeId);
      });
      mobileLinks.forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-nav-id-mobile") === activeId);
      });
    };

    return header;
  }

  function networkDiagram() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "network-lines");
    svg.setAttribute("viewBox", "0 0 390 220");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Abstract circuit diagram of connected nodes");
    svg.innerHTML =
      '<path d="M35 48 L130 30 L204 78 L305 45 L354 100 L268 140 L145 125 L70 178 L199 200 L354 185"></path>' +
      '<path d="M130 30 L145 125 L268 140 L305 45"></path>' +
      '<path d="M70 178 L145 125 L35 48"></path>' +
      '<path d="M204 78 L199 200 L354 100 L354 185"></path>' +
      '<circle cx="35" cy="48" r="5"></circle><circle cx="130" cy="30" r="5"></circle>' +
      '<circle cx="204" cy="78" r="5"></circle><circle cx="305" cy="45" r="5"></circle>' +
      '<circle cx="354" cy="100" r="5"></circle><circle cx="268" cy="140" r="5"></circle>' +
      '<circle cx="145" cy="125" r="5"></circle><circle cx="70" cy="178" r="5"></circle>' +
      '<circle cx="199" cy="200" r="5"></circle><circle cx="354" cy="185" r="5"></circle>';
    return svg;
  }

  function buildHero() {
    var eyebrow = h("p", { class: "eyebrow hero-enter" }, "Nidhi Sharma · Aspiring AI Student");
    var title = h("h1", { class: "hero-title hero-enter" }, [
      "Ideas into ",
      h("em", {}, "intelligent"),
      " work.",
    ]);
    var tagline = h(
      "p",
      { class: "hero-tagline hero-enter" },
      "Exploring Artificial Intelligence, Machine Learning, and Data-Driven Solutions."
    );
    var lede = h(
      "p",
      { class: "hero-lede hero-enter-delay" },
      "Passionate about Artificial Intelligence, Machine Learning, Data Analytics, and emerging technologies, with a focus on building practical and meaningful technology projects."
    );

    var viewProjectsBtn = h("button", { class: "button-primary", type: "button" }, ["View My Projects", icon("arrow-right", 15)]);
    viewProjectsBtn.addEventListener("click", function () {
      scrollToId("projects");
    });

    var contactBtn = h("button", { class: "button-ghost", type: "button" }, ["Contact Me", icon("mail", 14)]);
    contactBtn.addEventListener("click", function () {
      scrollToId("contact");
    });

    var resumeBtn = h(
      "a",
      { class: "button-secondary", href: RESUME_URL, download: RESUME_FILENAME, "aria-label": "Download résumé (PDF)" },
      [icon("download", 15), "Download Résumé"]
    );

    var actions = h("div", { class: "hero-actions hero-enter-delay" }, [viewProjectsBtn, resumeBtn, contactBtn]);

    var left = h("div", {}, [eyebrow, title, tagline, lede, actions]);

    var signalCard = h("div", { class: "signal-card" }, [
      h("div", { class: "signal-card-head" }, [h("span", {}, "Pattern / 01"), h("span", { class: "signal-index" }, "signal_map")]),
      networkDiagram(),
      h("div", { class: "signal-caption" }, h("span", {}, "curious by design")),
    ]);

    var terminal = h("div", { class: "terminal-card" }, [
      h("div", { class: "terminal-bar" }, [
        h("span", { class: "terminal-dot" }),
        h("span", { class: "terminal-dot" }),
        h("span", { class: "terminal-dot" }),
        h("span", { class: "terminal-title" }, "training_notebook.py"),
      ]),
      h("div", { class: "terminal-body" }, [
        h("div", { class: "t-line" }, [h("span", { class: "t-prompt" }, ">>> "), "from sklearn import svm"]),
        h("div", { class: "t-line" }, [h("span", { class: "t-prompt" }, ">>> "), "model.fit(X_train, y_train)"]),
        h("div", { class: "t-line t-out" }, "# learning, one project at a time"),
        h("div", { class: "t-line" }, [h("span", { class: "t-prompt" }, ">>> "), h("span", { class: "terminal-cursor" })]),
      ]),
    ]);

    var chips = h("div", { class: "hero-chips" }, [
      h("div", { class: "hero-chip" }, "Machine Learning"),
      h("div", { class: "hero-chip" }, "Data Analytics"),
      h("div", { class: "hero-chip" }, "Generative AI"),
    ]);

    var aside = h("div", { class: "hero-aside hero-enter-delay", "aria-hidden": "true" }, [signalCard, terminal, chips]);

    var grid = h("div", { class: "hero-grid" }, [left, aside]);
    var cue = h("div", { class: "scroll-cue", "aria-hidden": "true" }, "Scroll to explore");

    return h("section", { id: "home", class: "hero-section" }, [grid, cue]);
  }

  function buildAbout() {
    var heading = h("div", { class: "section-heading reveal" }, [
      h("div", {}, [h("p", { class: "section-kicker" }, "01 / About me"), h("h2", {}, "A student mind, pointed at useful questions.")]),
      h("p", {}, "Learning by making, with a growing interest in the systems and stories behind intelligent technology."),
    ]);

    var copy = h("div", { class: "about-copy" }, [
      h(
        "p",
        { class: "about-lead" },
        "I'm an Artificial Intelligence undergraduate who learns best by building — turning a question into something that actually runs, rather than stopping at theory."
      ),
      h(
        "p",
        { class: "about-text" },
        "Most of my learning happens in notebooks and scripts, where I have worked on predicting house prices, job changes and loan risk, and on detecting Parkinson's disease. That habit of learning-by-building carried over into two internships — a Machine Learning internship at AcmeGrade, and a national-level internship program with Pega X Smart Bridge — where I got to trade solo notebooks for applied, industry-facing problem-solving."
      ),
      h(
        "p",
        { class: "about-text" },
        "Alongside coursework, I've been building a foundation in cloud and data tooling — from Oracle Cloud's Generative AI track to SQL and Power BI — so that the models I train can also be shipped, queried, and explained. Next, I want to go deeper into machine learning and cloud technologies, and to work alongside people who build real systems, so that what I learn keeps meeting real-world problems."
      ),
    ]);

    var facts = h("div", { class: "about-facts" }, [
      factChip("AI", "Core focus area"),
      factChip("2", "Internships completed"),
      factChip("6+", "Notebook & Python projects"),
      factChip("5", "Certifications earned"),
    ]);

    var left = h("div", {}, [copy, facts]);

    var focusCard = h("div", { class: "focus-card" }, [
      h("h3", {}, "Currently"),
      h("ul", { class: "focus-list" }, [
        h("li", {}, "In my 2nd year of a B.Sc. in Artificial Intelligence"),
        h("li", {}, "Deepening machine learning & cloud computing fundamentals"),
        h("li", {}, "Applying for AI / ML / data internships in Delhi NCR"),
        h("li", {}, "Building small, question-driven projects on GitHub"),
      ]),
    ]);

    var aside = h("div", { class: "about-aside" }, [focusCard]);

    var layout = h("div", { class: "about-layout reveal" }, [left, aside]);

    return h("section", { id: "about", class: "section section-cream" }, h("div", { class: "section-wrap" }, [heading, layout]));
  }

  function factChip(value, label) {
    return h("div", { class: "fact-chip" }, [h("span", { class: "fact-value" }, value), h("span", { class: "fact-label" }, label)]);
  }

  function buildSkills() {
    var heading = h("div", { class: "section-heading reveal" }, [
      h("div", {}, [h("p", { class: "section-kicker" }, "02 / Skills"), h("h2", {}, "Tools for turning curiosity into practice.")]),
      h("p", {}, "A focused set of languages, platforms, and AI foundations I am actively learning through coursework and projects."),
    ]);

    var intro = h("div", { class: "skills-intro" }, [icon("cpu", 20), h("p", {}, "No progress bars. Just the building blocks I reach for when a question needs a technical shape.")]);

    var grid = h(
      "div",
      { class: "skills-grid" },
      SKILLS.map(function (s) {
        return h("div", { class: "skill-card" }, [icon(s.icon, 21), h("span", {}, s.name), h("small", {}, s.label)]);
      })
    );

    var layout = h("div", { class: "skills-layout reveal" }, [intro, grid]);

    return h("section", { id: "skills", class: "section section-dark" }, h("div", { class: "section-wrap" }, [heading, layout]));
  }

  function buildExperience() {
    var heading = h("div", { class: "section-heading reveal" }, [
      h("div", {}, [h("p", { class: "section-kicker" }, "03 / Experience"), h("h2", {}, "Notebooks handed off to real teams.")]),
      h("p", {}, "Two internships in 2026 where coursework met applied, industry-facing problem-solving."),
    ]);

    var timeline = h(
      "div",
      { class: "timeline reveal" },
      EXPERIENCE.map(function (e) {
        return h("div", { class: "timeline-item" }, [
          h("h3", { class: "timeline-role" }, e.role),
          h("div", { class: "timeline-meta" }, [h("span", { class: "org" }, e.org), h("span", {}, "·"), h("span", {}, e.period)]),
          h("p", {}, e.desc),
        ]);
      })
    );

    return h("section", { id: "experience", class: "section" }, h("div", { class: "section-wrap" }, [heading, timeline]));
  }

  function buildEducation() {
    var heading = h("div", { class: "section-heading reveal" }, [
      h("div", {}, [h("p", { class: "section-kicker" }, "04 / Education"), h("h2", {}, "The foundation is still being built.")]),
      h("p", {}, "A current academic path in artificial intelligence, grounded in learning, experimentation, and practical work."),
    ]);

    var card = h("div", { class: "education-card reveal" }, [
      h("div", {}, [h("div", { class: "education-label" }, "Current education"), h("div", { class: "education-mark", "aria-hidden": "true" }, icon("graduation-cap", 30))]),
      h("div", {}, [
        h("h3", {}, "Bachelor's in Artificial Intelligence"),
        h("p", {}, "AAFT Noida"),
        h("div", { class: "education-meta" }, [
          h("span", { class: "meta-pill" }, [icon("award", 13), " Currently Pursuing"]),
          h("span", { class: "meta-pill" }, [icon("calendar", 13), " Since 2025"]),
        ]),
      ]),
    ]);

    return h("section", { id: "education", class: "section section-dark" }, h("div", { class: "section-wrap" }, [heading, card]));
  }

  function buildProjects() {
    var heading = h("div", { class: "section-heading reveal" }, [
      h("div", {}, [h("p", { class: "section-kicker" }, "05 / Projects"), h("h2", {}, "Small experiments. Real questions.")]),
      h("p", {}, "A selection of work from my GitHub repository, spanning prediction, risk analysis, detection, and Python-based projects."),
    ]);

    var grid = h(
      "div",
      { class: "projects-grid" },
      PROJECTS.map(function (p, i) {
        return h("article", { class: "project-card reveal" }, [
          h("div", { class: "project-number" }, [h("span", {}, String(i + 1).padStart(2, "0")), icon("code", 14)]),
          h("div", { class: "project-icon", "aria-hidden": "true" }, icon(p.file.slice(-3) === ".py" ? "terminal" : "code", 20)),
          h("h3", {}, p.name),
          h("p", { class: "project-file" }, p.file),
          h("p", { class: "project-file" }, p.description),
          h(
            "div",
            { class: "project-tags" },
            p.tags.map(function (t) {
              return h("span", { class: "project-tag" }, t);
            })
          ),
          h("a", { class: "project-link", href: p.url, target: "_blank", rel: "noreferrer" }, ["View Project", icon("arrow-right", 15)]),
        ]);
      })
    );

    return h("section", { id: "projects", class: "section projects-section" }, h("div", { class: "section-wrap" }, [heading, grid]));
  }

  function buildCertifications() {
    var heading = h("div", { class: "section-heading reveal" }, [
      h("div", {}, [h("p", { class: "section-kicker" }, "06 / Certifications"), h("h2", {}, "Proof of showing up and learning.")]),
      h("p", {}, "Selected certifications and learning milestones, in the order I earned them."),
    ]);

    var grid = h(
      "div",
      { class: "cert-grid reveal" },
      CERTIFICATIONS.map(function (c) {
        return h("article", { class: "cert-card" }, [
          h("div", { class: "cert-top" }, [h("span", { class: "cert-badge" }, icon("award", 20)), h("time", { class: "cert-date" }, c.date)]),
          h("h3", {}, c.title),
          h("p", { class: "cert-issuer" }, [h("span", {}, "Issued by"), h("span", {}, c.issuer)]),
        ]);
      })
    );

    return h("section", { id: "certifications", class: "section" }, h("div", { class: "section-wrap" }, [heading, grid]));
  }

  function buildContact() {
    var lead = h("div", { class: "contact-lead" }, [
      h("p", { class: "section-kicker" }, "07 / Contact"),
      h("h2", {}, "Let's connect."),
      h("p", {}, "For questions, opportunities, or a conversation about AI and technology, the best way to reach me is by email."),
      h("a", { class: "contact-email", href: "mailto:" + EMAIL }, [icon("mail", 15), " " + EMAIL]),
      h("div", { class: "contact-socials", "aria-label": "Social profiles" }, [
        h("a", { class: "social-link", href: GITHUB, target: "_blank", rel: "noreferrer", "aria-label": "Open GitHub profile" }, icon("github", 19)),
        h("a", { class: "social-link", href: LINKEDIN, target: "_blank", rel: "noreferrer", "aria-label": "Open LinkedIn profile" }, icon("linkedin", 19)),
      ]),
    ]);

    var nameField = fieldInput("contact-name", "name", "Name", "text");
    var emailField = fieldInput("contact-email", "email", "Email", "email");
    var msgField = fieldTextarea("contact-message", "message", "Message");

    var submitBtn = h("button", { class: "button-primary", type: "submit" }, "Send Message");
    var note = h("p", { class: "form-note" }, "Opens your email app with the message pre-filled.");

    var form = h(
      "form",
      { class: "contact-form", novalidate: "true" },
      [h("div", { class: "form-grid" }, [nameField.wrap, emailField.wrap, msgField.wrap]), submitBtn, note]
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = nameField.input.value.trim();
      var email = emailField.input.value.trim();
      var message = msgField.input.value.trim();
      var valid = true;

      if (!name) {
        nameField.setError("Please enter your name.");
        valid = false;
      } else {
        nameField.setError("");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailField.setError("Please enter a valid email.");
        valid = false;
      } else {
        emailField.setError("");
      }
      if (message.length < 10) {
        msgField.setError("Please write at least 10 characters.");
        valid = false;
      } else {
        msgField.setError("");
      }

      if (!valid) return;

      var subject = "Portfolio enquiry from " + name;
      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });

    var layout = h("div", { class: "contact-layout reveal" }, [lead, form]);

    return h("section", { id: "contact", class: "section contact-section" }, h("div", { class: "section-wrap" }, layout));
  }

  function fieldInput(id, name, label, type) {
    var errorEl = h("span", { class: "field-error", id: id + "-error" });
    var input = h("input", { id: id, name: name, type: type });
    var wrap = h("div", { class: "field" }, [h("label", { for: id }, label), input, errorEl]);
    return {
      wrap: wrap,
      input: input,
      setError: function (msg) {
        errorEl.textContent = msg || "";
        input.setAttribute("aria-invalid", msg ? "true" : "false");
      },
    };
  }

  function fieldTextarea(id, name, label) {
    var errorEl = h("span", { class: "field-error", id: id + "-error" });
    var input = h("textarea", { id: id, name: name, rows: "5" });
    var wrap = h("div", { class: "field field-full" }, [h("label", { for: id }, label), input, errorEl]);
    return {
      wrap: wrap,
      input: input,
      setError: function (msg) {
        errorEl.textContent = msg || "";
        input.setAttribute("aria-invalid", msg ? "true" : "false");
      },
    };
  }

  function buildFooter() {
    var brand = h("div", { class: "footer-brand" }, [
      h("span", { class: "brand-monogram" }, "NS"),
      h("div", { class: "footer-brand-text" }, [h("strong", {}, "Nidhi Sharma"), h("span", {}, "Aspiring Artificial Intelligence Student")]),
    ]);

    var links = h("div", { class: "footer-links" }, [
      h("a", { href: "mailto:" + EMAIL }, EMAIL),
      h("a", { href: GITHUB, target: "_blank", rel: "noreferrer" }, "GitHub"),
      h("a", { href: LINKEDIN, target: "_blank", rel: "noreferrer" }, "LinkedIn"),
    ]);

    var copy = h("span", { class: "footer-copy" }, "© 2026 Nidhi Sharma. All rights reserved.");

    var inner = h("div", { class: "footer-inner" }, [brand, links, copy]);
    return h("footer", { class: "site-footer" }, inner);
  }

  /* ---------------- App bootstrap ---------------- */

  function mount() {
    var root = document.getElementById("root");
    if (!root) return;

    var nav = buildNav();
    var main = h("main", {}, [
      buildHero(),
      buildAbout(),
      buildSkills(),
      buildExperience(),
      buildEducation(),
      buildProjects(),
      buildCertifications(),
      buildContact(),
    ]);
    var footer = buildFooter();

    root.appendChild(nav);
    root.appendChild(main);
    root.appendChild(footer);

    // Scroll-spy for active nav state
    var sectionIds = NAV_ITEMS.map(function (i) {
      return i.id;
    });
    var sections = sectionIds.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    var activeId = "home";
    function updateActive() {
      var scrollPos = window.scrollY + window.innerHeight * 0.3;
      var current = sections[0];
      sections.forEach(function (sec) {
        if (sec.offsetTop <= scrollPos) current = sec;
      });
      if (current && current.id !== activeId) {
        activeId = current.id;
        nav._updateActive(activeId);
      }
    }
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();

    // Reveal-on-scroll
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
