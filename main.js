/**
 * Buoyant Psyche — main.js
 * Navigation, FAQ accordion, scroll reveal, pointer effects.
 */

(function () {
  'use strict';

  var BOOKING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc224x70UjMWpSVSa9gmz8Qpi9Z4x5hly7Y9oC20_evK_-gqg/viewform';
  var HEADER_SCROLL_THRESHOLD = 20;
  var ANCHOR_OFFSET = 64;
  var STAGGER_STEP_MS = 90;
  var MAGNETIC_MAX_PX = 4;
  var TILT_MAX_DEG = 1.5;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var header = document.getElementById('header');
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileBackdrop = document.querySelector('.nav-mobile__backdrop');
  var mobileLinks = document.querySelectorAll('.nav-mobile__link, .nav-mobile__book');
  var desktopNavLinks = document.querySelectorAll('.nav-desktop__link[href^="#"]');
  var accordionTriggers = document.querySelectorAll('.accordion__trigger');

  /* --- Sticky header scroll state --- */
  function updateHeaderScroll() {
    if (!header) {
      return;
    }
    if (window.scrollY > HEADER_SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  /* --- Mobile menu --- */
  function openMobileMenu() {
    if (!navToggle || !mobileMenu) {
      return;
    }
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    navToggle.focus();
  }

  function closeMobileMenu() {
    if (!navToggle || !mobileMenu) {
      return;
    }
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  function toggleMobileMenu() {
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  /* --- Smooth anchor scroll with header offset --- */
  function scrollToSection(targetId) {
    var target = document.getElementById(targetId);
    if (!target) {
      return;
    }
    var top = target.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
    window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  function handleAnchorClick(event) {
    var href = this.getAttribute('href');
    if (!href || href.charAt(0) !== '#') {
      return;
    }
    var targetId = href.slice(1);
    if (!targetId) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      return;
    }
    var target = document.getElementById(targetId);
    if (target) {
      event.preventDefault();
      scrollToSection(targetId);
      history.pushState(null, '', '#' + targetId);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', handleAnchorClick);
  });

  /* --- Active nav link on scroll --- */
  var sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    var scrollPos = window.scrollY + ANCHOR_OFFSET + 40;
    var currentId = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* --- FAQ Accordion --- */
  function getFaqCard(trigger) {
    return trigger.closest('.faq-card');
  }

  function collapsePanel(trigger, panel) {
    if (!panel) {
      return;
    }
    var card = getFaqCard(trigger);
    trigger.setAttribute('aria-expanded', 'false');
    if (card) {
      card.classList.remove('is-open');
    }

    if (prefersReducedMotion) {
      panel.hidden = true;
      panel.style.maxHeight = '';
      return;
    }

    panel.style.maxHeight = panel.scrollHeight + 'px';
    requestAnimationFrame(function () {
      panel.style.maxHeight = '0px';
    });
    panel.addEventListener('transitionend', function onCollapseEnd(event) {
      if (event.propertyName !== 'max-height') {
        return;
      }
      panel.hidden = true;
      panel.style.maxHeight = '';
      panel.removeEventListener('transitionend', onCollapseEnd);
    });
  }

  function expandPanel(trigger, panel) {
    if (!panel) {
      return;
    }
    var card = getFaqCard(trigger);
    panel.hidden = false;
    if (card) {
      card.classList.add('is-open');
    }
    trigger.setAttribute('aria-expanded', 'true');

    if (prefersReducedMotion) {
      panel.style.maxHeight = '';
      return;
    }

    panel.style.maxHeight = '0px';
    requestAnimationFrame(function () {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
    panel.addEventListener('transitionend', function onExpandEnd(event) {
      if (event.propertyName !== 'max-height') {
        return;
      }
      panel.style.maxHeight = 'none';
      panel.removeEventListener('transitionend', onExpandEnd);
    });
  }

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panelId = trigger.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      var isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      accordionTriggers.forEach(function (otherTrigger) {
        if (otherTrigger !== trigger && otherTrigger.getAttribute('aria-expanded') === 'true') {
          var otherPanelId = otherTrigger.getAttribute('aria-controls');
          collapsePanel(otherTrigger, document.getElementById(otherPanelId));
        }
      });

      if (isExpanded) {
        collapsePanel(trigger, panel);
      } else {
        expandPanel(trigger, panel);
      }
    });
  });

  /* --- Scroll reveal --- */
  function markVisible(element) {
    element.classList.add('is-visible');
  }

  function applyStaggerDelays(group) {
    Array.prototype.forEach.call(group.children, function (child, index) {
      child.style.setProperty('--reveal-delay', (index * STAGGER_STEP_MS) + 'ms');
    });
  }

  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal-on-scroll');
    var staggerGroups = document.querySelectorAll('.reveal-stagger');

    if (prefersReducedMotion) {
      revealElements.forEach(markVisible);
      staggerGroups.forEach(markVisible);
      return;
    }

    staggerGroups.forEach(applyStaggerDelays);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          markVisible(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });

    staggerGroups.forEach(function (group) {
      observer.observe(group);
    });

    /* Hero loads in view — reveal immediately */
    var heroGrid = document.querySelector('.hero__grid.reveal-stagger');
    if (heroGrid) {
      markVisible(heroGrid);
    }
  }

  initScrollReveal();

  /* --- Journey step animation --- */
  function initJourneyAnimation() {
    var journey = document.querySelector('.journey--animated');
    if (!journey || prefersReducedMotion) {
      if (journey) {
        journey.classList.add('is-visible');
      }
      return;
    }

    var steps = journey.querySelectorAll('.journey__step');
    var journeyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        journey.classList.add('is-visible');
        steps.forEach(function (step, index) {
          window.setTimeout(function () {
            step.classList.add('is-revealed');
          }, index * 120);
        });
        journeyObserver.unobserve(journey);
      });
    }, { threshold: 0.25 });

    journeyObserver.observe(journey);
  }

  initJourneyAnimation();

  /* --- Section overline line animation --- */
  function initOverlineAnimation() {
    var overlines = document.querySelectorAll('.section__overline--animated');
    if (!overlines.length) {
      return;
    }

    if (prefersReducedMotion) {
      overlines.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var overlineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          overlineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5, rootMargin: '0px 0px -20px 0px' });

    overlines.forEach(function (el) {
      overlineObserver.observe(el);
    });
  }

  initOverlineAnimation();

  /* --- Pointer-follow glow --- */
  function initPointerGlow() {
    if (!finePointer || prefersReducedMotion) {
      return;
    }

    var zones = document.querySelectorAll('.pointer-glow-zone');
    if (!zones.length) {
      return;
    }

    zones.forEach(function (zone) {
      zone.addEventListener('mousemove', function (event) {
        var rect = zone.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;
        zone.style.setProperty('--mouse-x', x + '%');
        zone.style.setProperty('--mouse-y', y + '%');
      });

      zone.addEventListener('mouseleave', function () {
        zone.style.setProperty('--mouse-x', '50%');
        zone.style.setProperty('--mouse-y', '50%');
      });
    });
  }

  initPointerGlow();

  /* --- Hero image tilt --- */
  function initImageTilt() {
    var tiltZone = document.querySelector('[data-tilt]');
    var tiltImage = tiltZone ? tiltZone.querySelector('.hero__image--tilt') : null;

    if (!tiltZone || !tiltImage || !finePointer || prefersReducedMotion) {
      return;
    }

    var frameId = null;

    function resetTilt() {
      tiltImage.style.setProperty('--tilt-x', '0deg');
      tiltImage.style.setProperty('--tilt-y', '0deg');
      tiltImage.style.setProperty('--tilt-scale', '1');
    }

    tiltZone.addEventListener('mousemove', function (event) {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(function () {
        var rect = tiltZone.getBoundingClientRect();
        var offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        var offsetY = (event.clientY - rect.top) / rect.height - 0.5;
        var rotateY = offsetX * TILT_MAX_DEG * 2;
        var rotateX = offsetY * -TILT_MAX_DEG * 2;
        tiltImage.style.setProperty('--tilt-x', rotateX.toFixed(2) + 'deg');
        tiltImage.style.setProperty('--tilt-y', rotateY.toFixed(2) + 'deg');
        tiltImage.style.setProperty('--tilt-scale', '1.01');
      });
    });

    tiltZone.addEventListener('mouseleave', resetTilt);
    resetTilt();
  }

  initImageTilt();

  /* --- Magnetic primary buttons --- */
  function initMagneticButtons() {
    if (!finePointer || prefersReducedMotion) {
      return;
    }

    var buttons = document.querySelectorAll('.btn--magnetic');
    buttons.forEach(function (button) {
      button.addEventListener('mousemove', function (event) {
        var rect = button.getBoundingClientRect();
        var offsetX = event.clientX - rect.left - rect.width / 2;
        var offsetY = event.clientY - rect.top - rect.height / 2;
        var moveX = Math.max(-MAGNETIC_MAX_PX, Math.min(MAGNETIC_MAX_PX, offsetX * 0.12));
        var moveY = Math.max(-MAGNETIC_MAX_PX, Math.min(MAGNETIC_MAX_PX, offsetY * 0.12));
        button.style.setProperty('--magnetic-x', moveX.toFixed(1) + 'px');
        button.style.setProperty('--magnetic-y', moveY.toFixed(1) + 'px');
      });

      button.addEventListener('mouseleave', function () {
        button.style.setProperty('--magnetic-x', '0px');
        button.style.setProperty('--magnetic-y', '0px');
      });
    });
  }

  initMagneticButtons();

  /* --- Service card pointer highlight --- */
  function initServiceCardGlow() {
    if (!finePointer || prefersReducedMotion) {
      return;
    }

    var cards = document.querySelectorAll('.service-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (event) {
        var rect = card.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--card-glow-x', x + '%');
        card.style.setProperty('--card-glow-y', y + '%');
      });
    });
  }

  initServiceCardGlow();

  window.BUOYANT_PSYCHE = {
    bookingFormUrl: BOOKING_FORM_URL
  };
})();
