(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  var dropdowns = document.querySelectorAll('[data-dropdown]');
  function closeAll(except) {
    dropdowns.forEach(function (d) {
      if (d === except) return;
      d.querySelector('[data-dropdown-menu]').classList.add('hidden');
      d.querySelector('[data-dropdown-toggle]').setAttribute('aria-expanded', 'false');
    });
  }
  var hoverable = window.matchMedia('(hover: hover) and (min-width: 1024px)');
  dropdowns.forEach(function (d) {
    var btn = d.querySelector('[data-dropdown-toggle]');
    var menu = d.querySelector('[data-dropdown-menu]');
    var closeTimer;
    var hoverOpened = false;
    function setOpen(open) {
      menu.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAll(d);
      // A click right after a hover-open keeps the menu open instead of closing it.
      setOpen(hoverOpened || menu.classList.contains('hidden'));
      hoverOpened = false;
    });
    d.addEventListener('mouseenter', function () {
      if (!hoverable.matches) return;
      clearTimeout(closeTimer);
      if (menu.classList.contains('hidden')) {
        closeAll(d);
        setOpen(true);
        hoverOpened = true;
      }
    });
    d.addEventListener('mouseleave', function () {
      if (!hoverable.matches) return;
      // Delay bridges the gap between the button and the menu panel.
      closeTimer = setTimeout(function () {
        setOpen(false);
        hoverOpened = false;
      }, 200);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-dropdown]')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  // Library filter: buttons with data-filter toggle cards with a matching data-type.
  var filters = document.querySelectorAll('[data-filter]');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      var type = f.getAttribute('data-filter');
      filters.forEach(function (o) { o.setAttribute('aria-pressed', String(o === f)); });
      document.querySelectorAll('[data-type]').forEach(function (card) {
        card.hidden = type !== 'all' && card.getAttribute('data-type') !== type;
      });
    });
  });
})();
