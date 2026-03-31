/* ============================================================
   main.js — JavaScript principal del Grupo Scout Nyeri
   Funcionalidades: menú móvil, scroll, animaciones
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. MENÚ HAMBURGUESA (móvil)
  // ============================================================
  const hamburgerBtn  = document.getElementById('hamburger-btn');
  const navbarMenu    = document.getElementById('navbar-menu');
  const dropdownToggle = document.querySelector('.navbar__dropdown-toggle');
  const submenu        = document.querySelector('.navbar__submenu');

  if (hamburgerBtn && navbarMenu) {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = navbarMenu.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Toggle del dropdown de Unidades en móvil
  if (dropdownToggle && submenu) {
    dropdownToggle.addEventListener('click', function () {
      // Solo en móvil (menú hamburguesa activo)
      if (window.innerWidth <= 768) {
        const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        dropdownToggle.setAttribute('aria-expanded', !isExpanded);
        submenu.classList.toggle('is-open', !isExpanded);
      }
    });
  }

  // Cerrar menú al pulsar fuera
  document.addEventListener('click', function (e) {
    if (navbarMenu && !navbarMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navbarMenu.classList.remove('is-open');
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar menú al pulsar un enlace (móvil)
  navbarMenu && navbarMenu.querySelectorAll('.navbar__link, .navbar__sublink').forEach(function (link) {
    link.addEventListener('click', function () {
      navbarMenu.classList.remove('is-open');
      hamburgerBtn && hamburgerBtn.classList.remove('is-active');
      hamburgerBtn && hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // ============================================================
  // 2. EFECTO SCROLL EN HEADER (añade sombra)
  // ============================================================
  const siteHeader = document.getElementById('site-header');

  if (siteHeader) {
    window.addEventListener('scroll', function () {
      siteHeader.classList.toggle('site-header--scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ============================================================
  // 3. ANIMACIONES FADE-IN AL HACER SCROLL
  //    Los elementos con clase .fade-in se revelan al entrar en viewport
  // ============================================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Solo una vez
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: mostrar todos si IntersectionObserver no está disponible
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ============================================================
  // 4. SCROLL SUAVE para anclas internas (#seccion)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('site-header')
          ? document.getElementById('site-header').offsetHeight
          : 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ============================================================
  // 5. MENSAJE DE ÉXITO EN FORMULARIO DE CONTACTO (Formspree)
  //    Formspree redirige a la misma URL con ?submitted=true
  // ============================================================
  const urlParams = new URLSearchParams(window.location.search);
  const successMsg = document.getElementById('form-success');

  if (urlParams.get('submitted') === 'true' && successMsg) {
    successMsg.style.display = 'block';
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

});
