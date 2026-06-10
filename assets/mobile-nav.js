document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header-inner');
  const sidebar = document.querySelector('.sidebar');
  if (!header || !sidebar) return;

  // Swap logo to symbol on mobile
  const logoImg = document.querySelector('.header-logo img');
  if (logoImg) {
    const fullSrc = logoImg.getAttribute('src');
    const symbolSrc = fullSrc.replace(/NAG-logo_primär-svart\.svg/, 'NAG-logo_symbol-svart.svg');
    function updateLogo() {
      if (window.innerWidth <= 768) {
        logoImg.src = symbolSrc;
        logoImg.style.height = '28px';
      } else {
        logoImg.src = fullSrc;
        logoImg.style.height = '';
      }
    }
    updateLogo();
    window.addEventListener('resize', updateLogo);
  }

  // Inject hamburger button
  const btn = document.createElement('button');
  btn.className = 'hamburger';
  btn.setAttribute('aria-label', 'Meny');
  btn.innerHTML = '<span></span><span></span><span></span>';
  header.appendChild(btn);

  // Build mobile nav from sidebar content
  const drawer = document.createElement('nav');
  drawer.className = 'mobile-nav';
  drawer.innerHTML = sidebar.innerHTML;
  document.body.appendChild(drawer);

  // Toggle
  btn.addEventListener('click', function () {
    const open = drawer.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
});
