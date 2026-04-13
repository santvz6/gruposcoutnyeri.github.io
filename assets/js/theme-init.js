/**
 * theme-init.js
 * Aplica el tema guardado o la preferencia del sistema lo antes posible
 * para evitar el parpadeo blanco (flash) al cargar la página.
 */
(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const themeToApply = savedTheme || systemTheme;
  
  document.documentElement.setAttribute('data-theme', themeToApply);
})();
