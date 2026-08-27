const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const ctaButton = document.querySelector('#cta-button');
const status = document.querySelector('#status');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

ctaButton?.addEventListener('click', () => {
  status.textContent = 'Interakce funguje! 🚀';
});
