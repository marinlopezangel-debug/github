/* ==============================================
   ZETA GROWTH - Scroll Animations
   ============================================== */

(function () {
  'use strict';

  // Intersection Observer for fade-in-up animations
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  function handleIntersection(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }

  var observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Observe all fade-in-up elements
  function initAnimations() {
    var elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Staggered animations for grid children
  function initStaggered() {
    var grids = document.querySelectorAll('.problems__grid, .model__grid, .results__metrics-grid');

    grids.forEach(function (grid) {
      var children = grid.children;
      for (var i = 0; i < children.length; i++) {
        children[i].style.transitionDelay = (i * 0.1) + 's';
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAnimations();
      initStaggered();
    });
  } else {
    initAnimations();
    initStaggered();
  }
})();
