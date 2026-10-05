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
     5. SECTION & ELEMENT HOVER / TAP INTERACTION ENGINE
     - Desktop: Hover triggers live data beams & network cascades
     - Mobile: Non-blocking Touch-Tap triggers reactions & auto-clears
     ============================================================ */
  function initSectionHoverInteractions() {
    let clearTimer = null;
    const clearGaze = () => {
      clearTimeout(clearTimer);
      if (window.AiWorld && window.AiWorld.clearReaction) {
        window.AiWorld.clearReaction();
      }
    };

    const triggerReactionSafe = (type, detail, targetEl) => {
      clearTimeout(clearTimer);
      const rect = targetEl.getBoundingClientRect();
      const coords = { x: rect.right, y: rect.top + rect.height / 2 };
      if (window.AiWorld) {
        window.AiWorld.triggerReaction(type, detail, coords);
      }
    };

    // Helper for mobile touch-tap detection (distinguishes tap vs scroll)
    const bindTouchTap = (el, type, getDetail) => {
      let touchStartX = 0;
      let touchStartY = 0;

      el.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      el.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          // Filter out vertical scrolling (tap threshold 14px)
          if (Math.hypot(dx, dy) > 14) return;
        }
        const detail = typeof getDetail === 'function' ? getDetail(el) : getDetail;
        triggerReactionSafe(type, detail, el);
        // Smoothly auto-clear back to section idle state after 2.5s on mobile
        clearTimer = setTimeout(clearGaze, 2500);
      }, { passive: true });
    };

    // 1. About Statistics Hovers & Taps
    document.querySelectorAll('.stat-card').forEach(card => {
      const getVal = () => card.querySelector('.stat-value')?.textContent.trim() || 'stats';
      card.addEventListener('mouseenter', () => triggerReactionSafe('about', getVal(), card));
      card.addEventListener('mouseleave', clearGaze);
      bindTouchTap(card, 'about', getVal);
    });

    // 2. Skills Hovers & Taps (Python, SQL, MongoDB, Power BI, Cloud, ML, DL)
    document.querySelectorAll('.skill-card').forEach(card => {
      const getSkill = () => card.querySelector('.skill-name')?.textContent.trim() || 'skill';
      card.addEventListener('mouseenter', () => triggerReactionSafe('skill', getSkill(), card));
      card.addEventListener('mouseleave', clearGaze);
      bindTouchTap(card, 'skill', getSkill);
    });

    // 3. Experience Items Hovers & Taps
    document.querySelectorAll('.timeline-item').forEach(item => {
      const getComp = () => item.querySelector('.company-badge')?.textContent.trim() || 'experience';
      item.addEventListener('mouseenter', () => triggerReactionSafe('experience', getComp(), item));
      item.addEventListener('mouseleave', clearGaze);
      bindTouchTap(item, 'experience', getComp);
    });

    // 4. Education Card Hover & Tap
    const eduCard = document.querySelector('.education-card');
    if (eduCard) {
      eduCard.addEventListener('mouseenter', () => triggerReactionSafe('education', 'AAFT', eduCard));
      eduCard.addEventListener('mouseleave', clearGaze);
      bindTouchTap(eduCard, 'education', 'AAFT');
    }

    // 5. Project Cards Hovers & Taps (All 7 projects)
    document.querySelectorAll('.project-card').forEach(card => {
      const getTitle = () => card.querySelector('.project-title')?.textContent.trim() || 'project';
      card.addEventListener('mouseenter', () => triggerReactionSafe('project', getTitle(), card));
      card.addEventListener('mouseleave', clearGaze);
      bindTouchTap(card, 'project', getTitle);
    });

    // 6. Certifications Hovers & Taps
    document.querySelectorAll('.cert-card').forEach(card => {
      const getCert = () => card.querySelector('.cert-name')?.textContent.trim() || 'cert';
      card.addEventListener('mouseenter', () => triggerReactionSafe('cert', getCert(), card));
      card.addEventListener('mouseleave', clearGaze);
      bindTouchTap(card, 'cert', getCert);
    });

    // 7. Contact Channels Hovers & Taps
    document.querySelectorAll('.channel-item').forEach(channel => {
      const getLabel = () => channel.querySelector('.channel-label')?.textContent.trim() || 'contact';
      channel.addEventListener('mouseenter', () => triggerReactionSafe('contact', getLabel(), channel));
      channel.addEventListener('mouseleave', clearGaze);
      bindTouchTap(channel, 'contact', getLabel);
    });

    // Keyboard Pulse & Workstation Attention on Typing in Contact Form
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

  /* ============================================================
     6. MAGNETIC BUTTONS (Desktop GSAP Micro-interaction)
     ============================================================ */
  function initMagneticButtons() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const btns = document.querySelectorAll('.magnetic-btn');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        if (typeof gsap !== 'undefined') {
          gsap.to(btn, { x: x * 0.28, y: y * 0.28, duration: 0.35, ease: 'power2.out' });
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        }
      });
    });
  }

  // Initialize all core interaction modules
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initContactForm();
    initSectionHoverInteractions();
    initMagneticButtons();
  });

})();
