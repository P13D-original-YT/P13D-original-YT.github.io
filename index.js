// Aparición suave al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// Marca en el menú la sección visible
const links = document.querySelectorAll('nav a[href^="#"]');
const secciones = [...links].map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', () => {
  let actual = secciones[0];
  secciones.forEach((s) => { if (s.getBoundingClientRect().top < 140) actual = s; });
  links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + actual.id));
}, { passive: true });
