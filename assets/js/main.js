/* ============================================================
   main.js — JavaScript principal del Grupo Scout Nyeri
   Funcionalidades: menú móvil, scroll, animaciones
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. MENÚ HAMBURGUESA (móvil)
  // ============================================================
  const hamburgerBtn   = document.getElementById('hamburger-btn');
  const navbarMenu     = document.getElementById('navbar-menu');
  const dropdownLi     = document.querySelector('.navbar__dropdown');
  const dropdownToggle = document.querySelector('.navbar__dropdown-toggle');
  const submenu        = document.querySelector('.navbar__submenu');

  // Estado para saber si el dropdown está fijado por click
  let isDropdownLocked = false;
  let closeTimer = null;

  function openDropdown() {
    clearTimeout(closeTimer);
    if (dropdownLi) dropdownLi.classList.add('is-open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    if (isDropdownLocked) return; // No cerrar si está fijado
    closeTimer = setTimeout(function () {
      if (dropdownLi) dropdownLi.classList.remove('is-open');
      if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
    }, 400); // 400 ms de gracia
  }

  if (dropdownLi && submenu) {
    // Eventos de hover para escritorio
    dropdownLi.addEventListener('mouseenter', function () {
      if (window.innerWidth > 768) {
        openDropdown();
      }
    });

    dropdownLi.addEventListener('mouseleave', function () {
      if (window.innerWidth > 768) {
        closeDropdown();
      }
    });

    submenu.addEventListener('mouseenter', function () {
      if (window.innerWidth > 768) {
        clearTimeout(closeTimer);
      }
    });

    submenu.addEventListener('mouseleave', function () {
      if (window.innerWidth > 768) {
        closeDropdown();
      }
    });
  }

  // --- Toggle por Click (Sirve para móvil y para fijar en escritorio) ---
  if (dropdownToggle && submenu && dropdownLi) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      const isExpanded = dropdownLi.classList.contains('is-open');

      if (isExpanded && isDropdownLocked) {
        // Cierra el menú si estaba fijado y se vuelve a hacer clic
        isDropdownLocked = false;
        dropdownLi.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        submenu.classList.remove('is-open');
      } else {
        // Lo abre y lo fija
        isDropdownLocked = true;
        dropdownLi.classList.add('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'true');
        submenu.classList.add('is-open');
      }
    });
  }

  // --- Hamburguesa (móvil) ---
  if (hamburgerBtn && navbarMenu) {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = navbarMenu.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Cerrar menú al pulsar fuera de cualquier elemento del dropdown o nav
  document.addEventListener('click', function (e) {
    // Cerrar hamburguesa si se hace click fuera
    if (navbarMenu && !navbarMenu.contains(e.target) && hamburgerBtn && !hamburgerBtn.contains(e.target)) {
      navbarMenu.classList.remove('is-open');
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    
    // Cerrar dropdown escritorio y quitar bloqueo si se hace click fuera
    if (dropdownLi && !dropdownLi.contains(e.target)) {
      isDropdownLocked = false;
      dropdownLi.classList.remove('is-open');
      if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
      if (submenu) submenu.classList.remove('is-open');
    }
  });

  // Cerrar menú al pulsar un enlace genérico (móvil o dropdown)
  if (navbarMenu) {
    navbarMenu.querySelectorAll('.navbar__link:not(.navbar__dropdown-toggle), .navbar__sublink').forEach(function (link) {
      link.addEventListener('click', function () {
        // Reseteo general
        navbarMenu.classList.remove('is-open');
        if (hamburgerBtn) {
          hamburgerBtn.classList.remove('is-active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
        isDropdownLocked = false;
        if (dropdownLi) dropdownLi.classList.remove('is-open');
        if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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
