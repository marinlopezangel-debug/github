/* ============================================================
   BUSINESS LAB — Landing Page Interactivity
   ============================================================ */

(function () {
  'use strict';

  /* ===== 1. ROTATING WORD IN HERO ===== */
  const words = ['el crecimiento', 'las ventas', 'la experimentación', 'el control'];
  const rotatingWord = document.getElementById('rotating-word');
  let wordIndex = 0;

  if (rotatingWord) {
    setInterval(function () {
      rotatingWord.classList.add('fade-out');

      setTimeout(function () {
        wordIndex = (wordIndex + 1) % words.length;
        rotatingWord.textContent = words[wordIndex];
        rotatingWord.classList.remove('fade-out');
      }, 400);
    }, 2500);
  }

  /* ===== 2. SCROLL REVEAL (Intersection Observer) ===== */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ===== 3. HEADER SCROLL EFFECT ===== */
  var header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
  }, { passive: true });

  /* ===== 4. SCROLL INDICATOR FADE ===== */
  var scrollIndicator = document.getElementById('scrollIndicator');

  if (scrollIndicator) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  }

  /* ===== 5. MOBILE MENU TOGGLE ===== */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');

      var expanded = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ===== 6. SMOOTH SCROLL FOR NAV LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===== 7. SÍNTOMAS CAROUSEL ===== */
  var sintomasTrack = document.getElementById('sintomasTrack');
  var carouselDots = document.getElementById('carouselDots');
  var currentSlide = 0;
  var isDragging = false;
  var startX = 0;
  var scrollLeft = 0;

  function updateCarousel(index) {
    if (!sintomasTrack) return;

    var cards = sintomasTrack.querySelectorAll('.sintoma-card');
    if (cards.length === 0) return;

    var cardWidth = cards[0].offsetWidth + 24;
    sintomasTrack.style.transform = 'translateX(-' + (index * cardWidth) + 'px)';

    if (carouselDots) {
      carouselDots.querySelectorAll('.dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }

    currentSlide = index;
  }

  if (carouselDots) {
    carouselDots.querySelectorAll('.dot').forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = parseInt(this.getAttribute('data-index'), 10);
        updateCarousel(index);
      });
    });
  }

  // Touch / Drag support
  if (sintomasTrack) {
    sintomasTrack.addEventListener('mousedown', function (e) {
      isDragging = true;
      sintomasTrack.classList.add('dragging');
      startX = e.pageX;
    });

    sintomasTrack.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
    });

    sintomasTrack.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      isDragging = false;
      sintomasTrack.classList.remove('dragging');

      var diff = e.pageX - startX;
      var cards = sintomasTrack.querySelectorAll('.sintoma-card');
      var maxSlide = Math.max(0, cards.length - 2);

      if (diff < -50 && currentSlide < maxSlide) {
        updateCarousel(currentSlide + 1);
      } else if (diff > 50 && currentSlide > 0) {
        updateCarousel(currentSlide - 1);
      }
    });

    sintomasTrack.addEventListener('mouseleave', function () {
      isDragging = false;
      sintomasTrack.classList.remove('dragging');
    });

    // Touch events
    sintomasTrack.addEventListener('touchstart', function (e) {
      startX = e.touches[0].pageX;
    }, { passive: true });

    sintomasTrack.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].pageX - startX;
      var cards = sintomasTrack.querySelectorAll('.sintoma-card');
      var maxSlide = Math.max(0, cards.length - 2);

      if (diff < -50 && currentSlide < maxSlide) {
        updateCarousel(currentSlide + 1);
      } else if (diff > 50 && currentSlide > 0) {
        updateCarousel(currentSlide - 1);
      }
    }, { passive: true });
  }

  /* ===== 8. FAQ ACCORDION ===== */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('open');
          var btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Open clicked (if it was closed)
        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ===== 9. COMPARATIVA ROW HOVER (accessibility) ===== */
  var comparativaRows = document.querySelectorAll('.comparativa-row');

  comparativaRows.forEach(function (row) {
    row.addEventListener('mouseenter', function () {
      this.querySelectorAll('.comparativa-cell, .comparativa-arrow').forEach(function (cell) {
        cell.style.transition = 'color 0.3s ease';
      });
    });
  });

})();
