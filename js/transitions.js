/* ===== Page transition: fade out on navigate ===== */
(function () {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    if (anchor.target === '_blank') return;

    e.preventDefault();
    document.body.classList.add('page-transition-out');
    setTimeout(() => { location.href = href; }, 180);
  });

  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.25s ease';
  window.addEventListener('load', () => {
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });
})();
