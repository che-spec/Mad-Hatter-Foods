(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    };
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); btn.focus(); }
    });
  }

  // Demo-only forms: validate and confirm locally; nothing is sent anywhere.
  document.querySelectorAll('form.demo-form').forEach(function (form) {
    var input = form.querySelector('input[type=email]');
    var note = form.querySelector('.form-note');
    var submit = form.querySelector('button[type=submit]');
    input.addEventListener('input', function () {
      input.removeAttribute('aria-invalid');
      note.textContent = '';
      note.className = 'form-note';
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!input.checkValidity()) {
        input.setAttribute('aria-invalid', 'true');
        note.textContent = input.value
          ? 'That email doesn’t look right. Try something like name@example.com.'
          : 'Enter your email address to continue.';
        note.className = 'form-note err';
        input.focus();
        return;
      }
      submit.disabled = true;
      note.textContent = 'Thanks, you’re on the list. (Demo form: nothing was sent.)';
      note.className = 'form-note ok';
      setTimeout(function () { form.reset(); submit.disabled = false; }, 2500);
    });
  });
})();
