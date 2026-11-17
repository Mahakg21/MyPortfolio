// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
        toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '☰';
    }));
}

// Reveal on scroll
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach((el, i) => {
        el.style.transitionDelay = (i % 3) * 90 + 'ms';
        io.observe(el);
    });
} else {
    items.forEach(el => el.classList.add('visible'));
}
// Mobile menu
const btn = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
if (btn && links) {
    btn.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
        btn.textContent = open ? 'Close' : 'Menu';
    });
}