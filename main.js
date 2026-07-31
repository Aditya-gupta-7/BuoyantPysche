/**
 * Buoyant Psyche — main.js
 * Mobile navigation, FAQ accordion, sticky header, smooth anchor scroll.
 */

(function () {
  'use strict';

  var BOOKING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc-placeholder/viewform';
  var HEADER_SCROLL_THRESHOLD = 20;
  var ANCHOR_OFFSET = 64;

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
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function handleAnchorClick(event) {
    var href = this.getAttribute('href');
    if (!href || href.charAt(0) !== '#') {
      return;
    }
    var targetId = href.slice(1);
    if (!targetId) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panelId = trigger.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      var isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      accordionTriggers.forEach(function (otherTrigger) {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          var otherPanelId = otherTrigger.getAttribute('aria-controls');
          var otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) {
            otherPanel.hidden = true;
          }
        }
      });

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (panel) {
          panel.hidden = true;
        }
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (panel) {
          panel.hidden = false;
        }
      }
    });
  });

  /* --- Expose booking URL for easy updates (optional console reference) --- */
  window.BUOYANT_PSYCHE = {
    bookingFormUrl: BOOKING_FORM_URL
  };
})();
