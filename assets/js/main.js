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
  dropdowns.forEach(function (d) {
    var btn = d.querySelector('[data-dropdown-toggle]');
    var menu = d.querySelector('[data-dropdown-menu]');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAll(d);
      var open = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(open));
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
