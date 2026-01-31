/**
 * Azva Solutions — Hugo site (Clarity UI)
 * Header scroll state, scroll reveal, contact form, back-to-top, newsletter.
 */
(function () {
  'use strict';

  var header = document.getElementById('azva-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Hover dropdown for services on desktop
  var dropdownHovers = document.querySelectorAll('.dropdown-hover');
  if (dropdownHovers.length) {
    dropdownHovers.forEach(function (dropdown) {
      var toggle = dropdown.querySelector('.dropdown-toggle');
      var menu = dropdown.querySelector('.dropdown-menu');
      
      if (toggle && menu) {
        // Show dropdown on hover (desktop only)
        dropdown.addEventListener('mouseenter', function () {
          if (window.innerWidth >= 992) {
            menu.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
        
        // Hide dropdown on mouse leave (desktop only)
        dropdown.addEventListener('mouseleave', function () {
          if (window.innerWidth >= 992) {
            menu.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Prevent Bootstrap dropdown toggle on desktop, allow link navigation
        toggle.addEventListener('click', function (e) {
          if (window.innerWidth >= 992) {
            // Don't toggle dropdown, allow link to work
            e.stopPropagation();
            // Let the browser handle the link
            return true;
          }
        });
      }
    });
  }

  var revealEls = document.querySelectorAll('[data-reveal]');
  var aboutRevealEls = document.querySelectorAll('.about-reveal');
  var fadeInUpEls = document.querySelectorAll('.fade-in-up');
  var allReveal = [].slice.call(revealEls).concat([].slice.call(aboutRevealEls));
  if (allReveal.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          var list = entry.target.querySelector('.about-list-stagger');
          if (list) list.classList.add('revealed');
          // Also reveal fade-in-up elements within this revealed element
          var fadeInUps = entry.target.querySelectorAll('.fade-in-up');
          fadeInUps.forEach(function (el) {
            el.classList.add('revealed');
          });
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    allReveal.forEach(function (el) { observer.observe(el); });
  }
  
  // Also observe fade-in-up elements directly
  if (fadeInUpEls.length && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    fadeInUpEls.forEach(function (el) { fadeObserver.observe(el); });
  }

  // Stats count-up animation function
  function initStatsCounter(containerId, selector) {
    var statsContainer = document.getElementById(containerId);
    if (statsContainer && 'IntersectionObserver' in window) {
      var statValues = statsContainer.querySelectorAll(selector);
      var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          statsObserver.disconnect();
          statValues.forEach(function (el) {
            var raw = el.getAttribute('data-stat') || el.textContent;
            var match = raw.match(/^(\d+)(.*)$/);
            if (!match) return;
            var end = parseInt(match[1], 10);
            var suffix = match[2] || '';
            var duration = 1500;
            var start = 0;
            var startTime = null;
            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var easeOut = 1 - Math.pow(1 - progress, 2);
              var current = Math.round(start + (end - start) * easeOut);
              el.textContent = current + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
        });
      }, { threshold: 0.3 });
      statsObserver.observe(statsContainer);
    }
  }

  // About page: stats count-up when in view
  initStatsCounter('about-stats', '.about-stat-v2-value[data-stat]');
  
  // Home page: stats count-up when in view
  initStatsCounter('home-stats', '.stat-value[data-stat]');

  // About page: video play button — scroll to Get in Touch CTA
  var aboutVideoPlay = document.getElementById('about-video-play');
  if (aboutVideoPlay) {
    aboutVideoPlay.addEventListener('click', function () {
      var cta = document.querySelector('.about-footer-v2-cta');
      if (cta) cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  var form = document.getElementById('contactForm');
  var formMessage = document.getElementById('formMessage') || document.getElementById('homeFormMessage');
  if (form && formMessage) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formMessage.textContent = "Thank you. We'll be in touch within one business day.";
      formMessage.classList.remove('d-none');
      form.reset();
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterMessage = document.getElementById('newsletterMessage');
  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      newsletterMessage.textContent = "Thanks for subscribing. We'll send updates to your email.";
      newsletterMessage.classList.remove('d-none');
      newsletterForm.reset();
    });
  }
})();
