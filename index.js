// Paralaje suave de los orbes al mover el ratón
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  document.querySelectorAll('.bg-orb').forEach((orb, i) => {
    const factor = i === 0 ? 18 : 12;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});

// Efecto de inclinación 3D en las tarjetas
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform =
      `translateY(-10px) scale(1.02) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
