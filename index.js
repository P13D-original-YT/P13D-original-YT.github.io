const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════ LLUVIA DIGITAL (fondo) ═══════════════ */
(function () {
  const cv = document.getElementById('rain');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const chars = '01ABCDEF<>/|#$%&アイウエオカキクケコサシスセソ'.split('');
  const size = 16;
  let w, h, drops = [], last = 0;

  function resize() {
    w = cv.width = window.innerWidth;
    h = cv.height = window.innerHeight;
    const cols = Math.ceil(w / size);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -40));
  }

  function draw(t) {
    requestAnimationFrame(draw);
    if (t - last < 45) return;           // ~22 fps
    last = t;

    // desvanece el rastro sin perder la transparencia
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';

    ctx.font = size + 'px "Share Tech Mono", monospace';
    for (let i = 0; i < drops.length; i++) {
      const y = drops[i] * size;
      if (y > 0) {
        const r = Math.random();
        ctx.fillStyle = r < 0.04 ? '#ff003c' : r < 0.07 ? '#fcee0a' : '#00f0ff';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y);
      }
      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  if (!reducirMovimiento) requestAnimationFrame(draw);
})();

/* ═══════════════ PANTALLA DE INICIO ═══════════════ */
(function () {
  const html = document.documentElement;
  const boot = document.getElementById('boot');
  if (!boot || !html.classList.contains('boot')) return;

  const logEl = document.getElementById('boot-log');
  const prompt = document.getElementById('boot-prompt');
  const lineas = [
    '> INICIANDO CSTG_OS v4.77...',
    '> CARGANDO MÓDULO: PELÍCULAS ........ OK',
    '> CARGANDO MÓDULO: MÚSICA ........... OK',
    '> CARGANDO MÓDULO: TURISMO .......... OK',
    '> ENLACE SEGURO ESTABLECIDO',
    '> BIENVENIDO, USUARIO_'
  ];
  let i = 0, terminando = false, timer;

  function siguiente() {
    if (i >= lineas.length) { prompt.classList.add('show'); return; }
    const d = document.createElement('div');
    d.textContent = lineas[i++];
    logEl.appendChild(d);
    timer = setTimeout(siguiente, 180 + Math.random() * 220);
  }

  function terminar() {
    if (terminando) return;
    terminando = true;
    clearTimeout(timer);
    try { sessionStorage.setItem('cstg_boot', '1'); } catch (e) {}
    document.removeEventListener('keydown', onKey);
    boot.classList.add('out');
    setTimeout(() => {
      html.classList.remove('boot');
      boot.remove();
    }, 560);
  }

  function onKey(e) {
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;
    terminar();
  }

  document.addEventListener('keydown', onKey);
  boot.addEventListener('pointerdown', terminar);
  siguiente();
})();

/* ═══════════════ RELOJ Y REGISTRO ═══════════════ */
(function () {
  const clock = document.getElementById('clock');
  if (clock) {
    const tick = () => {
      clock.textContent = new Date().toLocaleTimeString('es-CO', { hour12: false });
    };
    tick();
    setInterval(tick, 1000);
  }

  const log = document.getElementById('log');
  if (log && !reducirMovimiento) {
    const pool = [
      ['ok',  '[OK] enlace CSTGPELIS'],
      ['ok',  '[OK] enlace CSTGMUSIC'],
      ['ok',  '[OK] handshake seguro'],
      ['wrn', '[..] escaneando red'],
      ['wrn', '[..] sincronizando caché'],
      ['ok',  '[OK] portadas cargadas'],
      ['err', '[!!] ping 404 ignorado'],
      ['wrn', '[..] buffer 64 TB'],
      ['ok',  '[OK] usuario: GUEST'],
      ['wrn', '[..] decodificando señal']
    ];
    const add = () => {
      const [cls, txt] = pool[Math.floor(Math.random() * pool.length)];
      const d = document.createElement('div');
      d.className = cls;
      d.textContent = txt;
      log.appendChild(d);
      while (log.children.length > 7) log.removeChild(log.firstChild);
    };
    for (let k = 0; k < 6; k++) add();
    setInterval(add, 1800);
  }
})();

/* ═══════════════ PARALAJE DE VENTANAS APILADAS ═══════════════ */
document.addEventListener('mousemove', (e) => {
  const s = document.documentElement.style;
  s.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
  s.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
});

/* ═══════════════ INCLINACIÓN 3D DE TARJETAS ═══════════════ */
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform =
      `perspective(900px) translateY(-8px) scale(1.02) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ═══════════════ BOTONES SUBIR / BAJAR ═══════════════ */
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');

function actualizarBotones() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  btnUp.classList.toggle('hidden', y < 80);
  btnDown.classList.toggle('hidden', max <= 80 || y >= max - 80);
}

btnUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
btnDown.addEventListener('click', () =>
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
);

window.addEventListener('scroll', actualizarBotones, { passive: true });
window.addEventListener('resize', actualizarBotones);
window.addEventListener('load', actualizarBotones);
