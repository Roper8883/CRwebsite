document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  if (!header || !toggle) return;

  function closeMenu() {
    header.setAttribute("data-menu-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var next = header.getAttribute("data-menu-open") === "true" ? "false" : "true";
    header.setAttribute("data-menu-open", next);
    toggle.setAttribute("aria-expanded", next);
  });

  header.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });
});
