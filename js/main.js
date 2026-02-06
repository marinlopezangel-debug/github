/* ==============================================
   ZETA GROWTH - Main JavaScript
   ============================================== */

(function () {
  'use strict';

  // ---- Navbar scroll effect ----
  var navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---- Hamburger menu ----
  var hamburger = document.querySelector('.navbar__hamburger');
  var mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Form validation & submission ----
  var form = document.getElementById('contact-form');
  var thankYou = document.getElementById('thank-you');
  var thankYouClose = document.getElementById('thank-you-close');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      clearErrors();

      // Validate
      var isValid = true;

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var url = form.querySelector('#url');
      var revenue = form.querySelector('#revenue');
      var consent = form.querySelector('[name="consent"]');

      if (!name.value.trim()) {
        showError(name, 'El nombre es obligatorio');
        isValid = false;
      }

      if (!email.value.trim()) {
        showError(email, 'El email es obligatorio');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Introduce un email válido');
        isValid = false;
      }

      if (!url.value.trim()) {
        showError(url, 'La URL es obligatoria');
        isValid = false;
      }

      if (!revenue.value) {
        showError(revenue, 'Selecciona una opción');
        isValid = false;
      }

      if (!consent.checked) {
        showError(consent.closest('.form-checkbox'), 'Debes aceptar para continuar');
        isValid = false;
      }

      if (isValid) {
        // Show thank you modal
        if (thankYou) {
          thankYou.classList.add('active');
          thankYou.setAttribute('aria-hidden', 'false');
        }
        form.reset();
      }
    });
  }

  // Close thank you modal
  if (thankYouClose) {
    thankYouClose.addEventListener('click', function () {
      thankYou.classList.remove('active');
      thankYou.setAttribute('aria-hidden', 'true');
    });
  }

  // Close modal on background click
  if (thankYou) {
    thankYou.addEventListener('click', function (e) {
      if (e.target === thankYou) {
        thankYou.classList.remove('active');
        thankYou.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ---- Helper functions ----
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(el, message) {
    var errorSpan = document.createElement('span');
    errorSpan.className = 'form-error';
    errorSpan.textContent = message;
    errorSpan.style.cssText = 'display:block;color:#e53e3e;font-size:13px;margin-top:4px;';

    if (el.classList.contains('form-checkbox')) {
      el.parentNode.appendChild(errorSpan);
    } else {
      el.style.borderColor = '#e53e3e';
      el.parentNode.appendChild(errorSpan);
    }
  }

  function clearErrors() {
    var errors = document.querySelectorAll('.form-error');
    errors.forEach(function (err) { err.remove(); });

    var inputs = form.querySelectorAll('.form-input, .form-select');
    inputs.forEach(function (input) {
      input.style.borderColor = '';
    });
  }

  // ---- Close modal on Escape ----
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && thankYou && thankYou.classList.contains('active')) {
      thankYou.classList.remove('active');
      thankYou.setAttribute('aria-hidden', 'true');
    }
  });

})();
