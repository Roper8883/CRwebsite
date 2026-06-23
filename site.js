document.addEventListener('DOMContentLoaded', function () {
  var polishHyphenatedText = function (node) {
    if (!node) return;
    if (node.nodeType === 3) {
      node.nodeValue = node.nodeValue.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, '$1\u2011$2');
      return;
    }
    if (node.nodeType !== 1) return;

    var skipped = {
      CODE: true,
      INPUT: true,
      NOSCRIPT: true,
      OPTION: true,
      PRE: true,
      SCRIPT: true,
      SELECT: true,
      STYLE: true,
      TEXTAREA: true
    };
    if (skipped[node.tagName]) return;

    Array.prototype.forEach.call(node.childNodes, polishHyphenatedText);
  };

  polishHyphenatedText(document.body);

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
