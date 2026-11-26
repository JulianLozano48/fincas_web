/* =========================================================
   DOS REFUGIOS · Lógica compartida (inicio + páginas de finca)
   ========================================================= */

// ⚙️ Configuración: reemplaza por tu número real (código país + número, sin "+")
const CONFIG = {
  whatsapp: '573001234567',
  // Precio base por noche para el estimado (en COP)
  precios: {
    'El Mirador': 850000,
    'Los Guaduales': 1200000,
  },
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const formatCOP = (n) => '$' + Math.round(n).toLocaleString('es-CO');

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initHeader();
  initMenu();
  initCursor();
  initReveal();
  initCounters();
  initSlider();
  initBookingForm();
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
});

/* ---------- Loader ---------- */
function initLoader() {
  const loader = $('#loader');
  if (!loader) {
    document.body.classList.add('is-loaded');
    return;
  }
  document.body.classList.add('is-locked');
  const finish = () => {
    document.body.classList.add('is-loaded');
    document.body.classList.remove('is-locked');
    setTimeout(() => loader.remove(), 1500);
  };
  // Mínimo 1.6s para que se vea la animación; máximo 4s si las imágenes tardan
  const minTime = new Promise((r) => setTimeout(r, 1600));
  const loaded = new Promise((r) => {
    if (document.readyState === 'complete') r();
    else window.addEventListener('load', r, { once: true });
  });
  const maxTime = new Promise((r) => setTimeout(r, 4000));
  Promise.race([Promise.all([minTime, loaded]), maxTime]).then(finish);
}

/* ---------- Header: fondo al hacer scroll y se oculta al bajar ---------- */
function initHeader() {
  const header = $('#header');
  if (!header) return;
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 60);
    const goingDown = y > lastY && y > 400;
    header.classList.toggle('is-hidden', goingDown && !header.classList.contains('menu-open'));
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Menú móvil ---------- */
function initMenu() {
  const burger = $('#burger');
  const nav = $('#nav');
  const header = $('#header');
  if (!burger || !nav) return;

  const toggle = (open) => {
    burger.setAttribute('aria-expanded', open);
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
  };

  burger.addEventListener('click', () => toggle(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && toggle(false));
}

/* ---------- Cursor personalizado ---------- */
function initCursor() {
  const cursor = $('#cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;
  const label = $('.cursor__label', cursor);

  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let cx = x, cy = y;

  window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });

  // Movimiento suavizado
  const loop = () => {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();

  $$('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      label.textContent = el.dataset.cursor;
      cursor.classList.add('is-active');
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
}

/* ---------- Aparición de elementos al hacer scroll ---------- */
function initReveal() {
  const items = $$('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
}

/* ---------- Contadores animados ---------- */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = prefix + (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));
}

/* ---------- Slider de testimonios ---------- */
function initSlider() {
  const slider = $('#slider');
  const dotsWrap = $('#sliderDots');
  if (!slider || !dotsWrap) return;

  const slides = $$('.slide', slider);
  let current = 0;
  let timer;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dotsWrap.appendChild(b);
    return b;
  });

  const go = (i) => {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  };
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => go(current + 1), 6000);
  };

  go(0);
  restart();
}

/* ---------- Formulario de reserva → WhatsApp ---------- */
function initBookingForm() {
  const form = $('#bookingForm');
  if (!form) return;

  const inLlegada = form.elements.llegada;
  const inSalida = form.elements.salida;
  const summary = $('#formSummary');
  const error = $('#formError');

  const toISO = (d) => d.toISOString().split('T')[0];
  const now = new Date();
  // Fecha local de hoy (evita el desfase de zona horaria de toISOString)
  inLlegada.min = toISO(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));

  const getFinca = () => form.dataset.finca || form.elements.finca?.value;

  const nights = () => {
    if (!inLlegada.value || !inSalida.value) return 0;
    const diff = (new Date(inSalida.value) - new Date(inLlegada.value)) / 86400000;
    return diff > 0 ? diff : 0;
  };

  const updateSummary = () => {
    // La salida debe ser mínimo un día después de la llegada
    if (inLlegada.value) {
      const min = new Date(inLlegada.value);
      min.setDate(min.getDate() + 1);
      inSalida.min = toISO(min);
    }
    const n = nights();
    const price = CONFIG.precios[getFinca()];
    summary.innerHTML = n && price
      ? `${n} noche${n > 1 ? 's' : ''} · estimado desde <strong>${formatCOP(n * price)}</strong>`
      : '';
  };

  form.addEventListener('input', updateSummary);
  form.addEventListener('change', updateSummary);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    error.textContent = '';

    const data = Object.fromEntries(new FormData(form));
    if (!data.nombre?.trim()) return (error.textContent = 'Por favor escribe tu nombre.');
    if (!nights()) return (error.textContent = 'Revisa las fechas: la salida debe ser posterior a la llegada.');

    const finca = getFinca();
    const msg =
      `¡Hola! Soy ${data.nombre.trim()} 👋\n` +
      `Quisiera consultar disponibilidad en *${finca}*.\n` +
      `📅 Llegada: ${inLlegada.value}\n` +
      `📅 Salida: ${inSalida.value} (${nights()} noches)\n` +
      `👥 Huéspedes: ${data.huespedes}`;

    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
}
