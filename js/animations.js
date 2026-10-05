/**
 * NIDHI SHARMA | CINEMATIC INTRO & GSAP SCROLL ANIMATIONS
 * - 3 to 5 second cinematic opening sequence
 * - Cat + laptop coding background with Ken Burns movement
 * - Staggered typography: NIDHI SHARMA -> ARTIFICIAL INTELLIGENCE
 * - Smooth cinematic transition to Hero
 * - Staggered section reveals & 3D tilt micro-interactions
 * - Timeline scroll tracking
 * - Automatic transition to Hero
 */

(function () {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1. CINEMATIC INTRO SEQUENCE (3.5 - 4.5 seconds)
     ============================================================ */
  function runCinematicIntro(onComplete) {
    const introEl = document.getElementById('cinematicIntro');
    const introBg = introEl ? introEl.querySelector('.intro-bg-image') : null;
    const tagEl = introEl ? introEl.querySelector('.intro-terminal-tag') : null;
    const nameEl = introEl ? introEl.querySelector('.intro-name') : null;
    const roleEl = introEl ? introEl.querySelector('.intro-role') : null;
    const metricsEl = introEl ? introEl.querySelector('.intro-tech-metrics') : null;

    if (!introEl || isReducedMotion) {
      if (introEl) introEl.style.display = 'none';
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({
        onComplete: () => {
          introEl.style.display = 'none';
          if (typeof onComplete === 'function') onComplete();
        }
      });

      // Stage 1: Reveal cat + laptop image from black
      tl.to(introBg, {
        opacity: 0.85,
        scale: 1.03,
        duration: 1.2,
        ease: 'power2.out'
      })
      // Stage 2: Ken Burns movement + light sweep
      .to(introBg, {
        scale: 1.06,
        y: -10,
        duration: 2.5,
        ease: 'sine.inOut'
      }, '-=0.8')
      // Stage 3: Staggered typography reveal
      .to(tagEl, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=2.2')
      .to(nameEl, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.22em',
        duration: 0.9,
        ease: 'power3.out'
      }, '-=1.8')
      .to(roleEl, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.4em',
        duration: 0.8,
        ease: 'power3.out'
      }, '-=1.4')
      .to(metricsEl, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=1.1')
      // Hold moment
      .to({}, { duration: 0.5 })
      // Stage 4: Smooth cinematic dissolve transition into Hero
      .to([tagEl, nameEl, roleEl, metricsEl], {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: 'power2.in'
      })
      .to(introBg, {
        scale: 1.12,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.4')
      .to(introEl, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, '-=0.3');

    } else {
      // Robust CSS/JS fallback if GSAP CDN is unreachable
      introBg.style.transition = 'opacity 1.2s ease, transform 3.5s ease';
      introBg.style.opacity = '0.85';
      introBg.style.transform = 'scale(1.05)';

      setTimeout(() => {
        if (tagEl) {
          tagEl.style.transition = 'opacity 0.6s, transform 0.6s';
          tagEl.style.opacity = '1';
          tagEl.style.transform = 'translateY(0)';
        }
        if (nameEl) {
          nameEl.style.transition = 'opacity 0.8s, transform 0.8s';
          nameEl.style.opacity = '1';
          nameEl.style.transform = 'translateY(0)';
        }
      }, 600);

      setTimeout(() => {
        if (roleEl) {
          roleEl.style.transition = 'opacity 0.8s, transform 0.8s';
          roleEl.style.opacity = '1';
          roleEl.style.transform = 'translateY(0)';
        }
        if (metricsEl) {
          metricsEl.style.transition = 'opacity 0.6s, transform 0.6s';
          metricsEl.style.opacity = '1';
          metricsEl.style.transform = 'translateY(0)';
        }
      }, 1200);

      setTimeout(() => {
        introEl.style.transition = 'opacity 0.8s ease';
        introEl.style.opacity = '0';
        setTimeout(() => {
          introEl.style.display = 'none';
          if (typeof onComplete === 'function') onComplete();
        }, 800);
      }, 3800);
    }
  }

  /* ============================================================
     2. HERO ENTRANCE ANIMATION (Triggered right after intro)
     ============================================================ */
  function revealHero() {
    const heroItems = document.querySelectorAll('.animate-hero-item');

    if (typeof gsap !== 'undefined' && !isReducedMotion) {
      gsap.fromTo(heroItems, 
        { opacity: 0, y: 35 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.9, 
          stagger: 0.15, 
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );
    } else {
      heroItems.forEach((item, idx) => {
        setTimeout(() => {
          item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, idx * 120);
      });
    }
  }

  /* ============================================================
     3. SCROLL REVEALS & TIMELINE PROGRESS
     ============================================================ */
  function initScrollAnimations() {
    // If GSAP + ScrollTrigger are active
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !isReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);

      // Section titles and headers
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Grid staggers (Skills, Projects, Certifications)
      gsap.utils.toArray('[data-reveal-stagger]').forEach((grid) => {
        const children = grid.children;
        gsap.fromTo(children,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Experience timeline drawing progress
      const timelineSection = document.getElementById('experience');
      const timelineProgress = document.getElementById('timelineProgress');
      if (timelineSection && timelineProgress) {
        ScrollTrigger.create({
          trigger: timelineSection,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: true,
          onUpdate: (self) => {
            timelineProgress.style.height = `${self.progress * 100}%`;
          }
        });
      }

      // 9 Environment State Transitions on Scroll
      const allSections = ['hero', 'about', 'skills', 'experience', 'education', 'projects', 'certifications', 'contact', 'footer'];
      allSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => {
              if (window.AiWorld) window.AiWorld.setState(id);
            },
            onEnterBack: () => {
              if (window.AiWorld) window.AiWorld.setState(id);
            }
          });
        }
      });

    } else {
      // IntersectionObserver fallback
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(el => {
        observer.observe(el);
      });

      // Simple scroll listener for timeline track
      const expSection = document.getElementById('experience');
      const prog = document.getElementById('timelineProgress');
      if (expSection && prog) {
        window.addEventListener('scroll', () => {
          const rect = expSection.getBoundingClientRect();
          const winHeight = window.innerHeight;
          if (rect.top < winHeight && rect.bottom > 0) {
            const total = rect.height;
            const current = winHeight - rect.top;
            const pct = Math.min(100, Math.max(0, (current / total) * 100));
            prog.style.height = `${pct}%`;
          }
        }, { passive: true });
      }

      // Fallback Environment State Observer
      const allSections = ['hero', 'about', 'skills', 'experience', 'education', 'projects', 'certifications', 'contact', 'footer'];
      const envObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || entry.target.dataset.section;
            if (id && window.AiWorld) {
              window.AiWorld.setState(id);
            }
          }
        });
      }, { threshold: 0.3 });

      allSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) envObserver.observe(el);
      });
    }
  }

  /* ============================================================
     4. 3D CARD TILT MICRO-INTERACTION (Desktop only)
     ============================================================ */
  function init3DTilt() {
    if (window.innerWidth <= 768 || isReducedMotion) return;

    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // Export functions to window namespace
  window.PortfolioAnim = {
    start: () => {
      runCinematicIntro(() => {
        revealHero();
        initScrollAnimations();
        init3DTilt();
      });
    }
  };

  // Launch when page is ready
  window.addEventListener('load', () => {
    window.PortfolioAnim.start();
  });

})();
