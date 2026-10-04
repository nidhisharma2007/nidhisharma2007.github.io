/**
 * NIDHI SHARMA | CORE SITE INTERACTION ENGINE
 * Features:
 * - Desktop custom cursor with smooth spring interpolation
 * - Sticky navigation with active section scroll-spy
 * - Mobile navigation menu toggle and auto-close
 * - Contact form handler opening pre-filled Gmail transmission
 * - Modular, accessible semantic architecture
 */

(function () {
  'use strict';

  /* ============================================================
     1. CUSTOM DESKTOP CURSOR
     ============================================================ */
  function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor || window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      if (cursor) cursor.style.display = 'none';
      return;
    }

    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
    }, { passive: true });

    // Smooth loop for trailing outer ring
    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    // Interactive element hover detection
    const interactives = document.querySelectorAll('a, button, input, textarea, .tilt-card, .cert-card, .stat-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ============================================================
     2. NAVIGATION & ACTIVE SCROLL-SPY
     ============================================================ */
  function initNavigation() {
    const header = document.getElementById('siteHeader');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[data-section]');

    // Header scroll background threshold
    window.addEventListener('scroll', () => {
      if (window.scrollY > 35) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // Active Section ScrollSpy via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('data-nav') === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scrolling click handler for hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth' });

          // Close mobile menu if open
          closeMobileMenu();
        }
      });
    });
  }

  /* ============================================================
     3. MOBILE NAVIGATION DRAWER
     ============================================================ */
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNav');

  function openMobileMenu() {
    if (!toggleBtn || !mobileDrawer) return;
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!toggleBtn || !mobileDrawer) return;
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initMobileMenu() {
    if (!toggleBtn || !mobileDrawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = toggleBtn.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ============================================================
     4. CONTACT FORM TO GMAIL TRANSMISSION
     Opens Gmail with pre-filled message directly to studypower2022@gmail.com
     No fake backend, no artificial server submission.
     ============================================================ */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    if (!form || !submitBtn) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please complete all fields (Name, Email, Message) before transmitting.');
        return;
      }

      // Visual feedback
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Launching Gmail...</span>';
      submitBtn.style.opacity = '0.8';

      const recipient = 'studypower2022@gmail.com';
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hello Nidhi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n[Sent from Nidhi Sharma Portfolio]`
      );

      // Web Gmail direct compose link
      const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
      // Native mailto fallback
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      // Open Gmail web compose in a new tab
      const win = window.open(gmailWebUrl, '_blank');

      // If popup was blocked or user preferred mailto, fallback smoothly
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.opacity = '1';
      }, 2000);
    });
  }

  /* ============================================================
     5. SECTION & ELEMENT HOVER INTERACTION ENGINE
     ============================================================ */
  function initSectionHoverInteractions() {
    const clearGaze = () => {
      if (window.AiWorld && window.AiWorld.clearReaction) {
        window.AiWorld.clearReaction();
      }
    };

    // 1. About Statistics Hovers
    document.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const val = card.querySelector('.stat-value')?.textContent.trim();
        const rect = card.getBoundingClientRect();
        const coords = { x: rect.right, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('about', val, coords);
      });
      card.addEventListener('mouseleave', clearGaze);
    });

    // 2. Skills Hovers (Python, SQL, MongoDB, Power BI, Cloud, ML, DL)
    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const skillName = card.querySelector('.skill-name')?.textContent.trim();
        const rect = card.getBoundingClientRect();
        const coords = { x: rect.right, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('skill', skillName, coords);
      });
      card.addEventListener('mouseleave', clearGaze);
    });

    // 3. Experience Items Hovers
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const company = item.querySelector('.company-badge')?.textContent.trim();
        const rect = item.getBoundingClientRect();
        const coords = { x: rect.right, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('experience', company, coords);
      });
      item.addEventListener('mouseleave', clearGaze);
    });

    // 4. Education Card Hover
    const eduCard = document.querySelector('.education-card');
    if (eduCard) {
      eduCard.addEventListener('mouseenter', () => {
        const rect = eduCard.getBoundingClientRect();
        const coords = { x: rect.right, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('education', 'AAFT', coords);
      });
      eduCard.addEventListener('mouseleave', clearGaze);
    }

    // 5. Project Cards Hovers (All 7 projects: emits data beam & creature looks at card)
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const title = card.querySelector('.project-title')?.textContent.trim();
        const rect = card.getBoundingClientRect();
        const coords = { x: rect.right, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('project', title, coords);
      });
      card.addEventListener('mouseleave', clearGaze);
    });

    // 6. Certifications Hovers
    document.querySelectorAll('.cert-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const certName = card.querySelector('.cert-name')?.textContent.trim();
        const rect = card.getBoundingClientRect();
        const coords = { x: rect.right, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('cert', certName, coords);
      });
      card.addEventListener('mouseleave', clearGaze);
    });

    // 7. Contact Channels & Form Hovers
    document.querySelectorAll('.channel-item').forEach(channel => {
      channel.addEventListener('mouseenter', () => {
        const label = channel.querySelector('.channel-label')?.textContent.trim();
        const rect = channel.getBoundingClientRect();
        const coords = { x: rect.right, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('contact', label, coords);
      });
      channel.addEventListener('mouseleave', clearGaze);
    });

    // Keyboard Pulse & Creature Look on Typing in Contact Form
    const inputs = document.querySelectorAll('#senderName, #senderEmail, #senderMessage');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const kbd = document.getElementById('creatureKeyboardPulse');
        if (kbd) {
          kbd.classList.add('active');
          clearTimeout(input._pulseTimeout);
          input._pulseTimeout = setTimeout(() => kbd.classList.remove('active'), 250);
        }
      });
      input.addEventListener('focus', () => {
        const rect = input.getBoundingClientRect();
        const coords = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        if (window.AiWorld) window.AiWorld.triggerReaction('contact', 'typing', coords);
      });
      input.addEventListener('blur', clearGaze);
    });
  }

  // Initialize all core interaction modules
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initContactForm();
    initSectionHoverInteractions();
  });

})();
