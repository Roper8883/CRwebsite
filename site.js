document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  if (!header || !toggle) return;

  toggle.addEventListener('click', function () {
    var next = header.getAttribute('data-menu-open') === 'true' ? 'false' : 'true';
    header.setAttribute('data-menu-open', next);
    toggle.setAttribute('aria-expanded', next);
  });

  var closeMenu = function () {
    header.setAttribute('data-menu-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
  };

  header.querySelectorAll('.nav-link, .button-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
});
