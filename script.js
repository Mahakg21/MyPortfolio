// Tells the CSS that JavaScript is running (so scroll animations are safe to use)
document.documentElement.classList.add('js');

// ---------- Theme (light / dark) ----------
(function () {
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var theme = saved || 'light';
    root.setAttribute('data-theme', theme);

    var nav = document.querySelector('.nav');
    var brand = document.querySelector('.brand');
    if (!nav || !brand) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-btn';

    function paint() {
        var dark = root.getAttribute('data-theme') === 'dark';
        button.textContent = dark ? 'Light' : 'Dark';
        button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    button.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        paint();
    });

    paint();
    brand.insertAdjacentElement('afterend', button);
})();

// ---------- Mobile menu ----------
(function () {
    var btn = document.querySelector('.menu-btn');
    var links = document.querySelector('.nav-links');
    // If the button already has an inline onclick, leave it alone to avoid toggling twice
    if (!btn || !links || btn.hasAttribute('onclick')) return;
    btn.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
        btn.textContent = open ? 'Close' : 'Menu';
    });
})();

// ---------- Gentle scroll reveal ----------
(function () {
    var targets = document.querySelectorAll('.section .block, .closing .wrap');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(function (el) {
        el.classList.add('reveal');
        io.observe(el);
    });
})();
