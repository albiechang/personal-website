/* ===== Navigation: hamburger + active state ===== */
(function () {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  // Mark active nav link based on current page
  const path = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .navbar__mobile-menu a, .sidebar__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop() || 'index.html';
    if (linkPage === path || (path === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
