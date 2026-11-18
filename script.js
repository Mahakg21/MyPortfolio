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
