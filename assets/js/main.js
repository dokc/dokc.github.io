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

  // Form dialogs: links to "#<dialog id>" on the current page open the modal.
  function formDialog(hash) {
    if (!hash || hash.length < 2) return null;
    var el = document.getElementById(decodeURIComponent(hash.slice(1)));
    return el && el.matches('dialog[data-form-dialog]') ? el : null;
  }
  function openDialog(dialog) {
    if (!dialog.open) dialog.showModal();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]');
    if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
    var dialog = formDialog(a.hash);
    if (!dialog) return;
    e.preventDefault();
    openDialog(dialog);
  });
  var initial = formDialog(location.hash);
  if (initial) openDialog(initial);
  window.addEventListener('hashchange', function () {
    var dialog = formDialog(location.hash);
    if (dialog) openDialog(dialog);
  });

  document.querySelectorAll('dialog[data-form-dialog]').forEach(function (dialog) {
    var form = dialog.querySelector('form[data-form]');
    var success = dialog.querySelector('[data-form-success]');

    // Click on the backdrop (the dialog element itself, outside its content) closes it.
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    // Native Escape handling is missing in some embedded browsers.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dialog.open) {
        e.preventDefault();
        dialog.close();
      }
    });
    dialog.addEventListener('close', function () {
      if (location.hash === '#' + dialog.id) history.replaceState(null, '', location.pathname + location.search);
      // After a successful send, the next open starts with a fresh form.
      if (!success.hidden) {
        success.hidden = true;
        form.hidden = false;
      }
    });
  });

  // formcarry forms: submit in place and swap in the [data-form-success] element of the same [data-form-root].
  document.querySelectorAll('[data-form-root]').forEach(function (root) {
    var form = root.querySelector('form[data-form]');
    var success = root.querySelector('[data-form-success]');
    var status = root.querySelector('[data-form-status]');
    var submit = form.querySelector('button[type="submit"]');
    var submitLabel = submit.textContent;
    var genericError = root.getAttribute('data-error');

    function showStatus(text) {
      status.textContent = text || '';
      status.classList.toggle('hidden', !text);
    }
    function clearFieldErrors() {
      root.querySelectorAll('[data-field-error]').forEach(function (p) {
        p.textContent = '';
        p.classList.add('hidden');
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showStatus('');
      clearFieldErrors();
      submit.disabled = true;
      submit.textContent = submit.getAttribute('data-sending');

      fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (r) {
          if (r.ok && r.data.code === 200) {
            form.reset();
            form.hidden = true;
            success.hidden = false;
            return;
          }
          var errors = r.data.errors || {};
          Object.keys(errors).forEach(function (name) {
            var p = root.querySelector('[data-field-error="' + name + '"]');
            if (!p) return;
            p.textContent = errors[name].message || errors[name];
            p.classList.remove('hidden');
          });
          showStatus(r.data.message || genericError);
        })
        .catch(function () {
          showStatus(genericError);
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = submitLabel;
        });
    });
  });
})();
