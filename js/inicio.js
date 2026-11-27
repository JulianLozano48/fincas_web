/* =========================================================
   DOS REFUGIOS · Inicio
   1. Genera las cards desde FINCAS (fincas-data.js)
   2. Al hacer clic, la card se expande a pantalla completa
      y muestra la vista de la finca (js/vista-finca.js).
   ========================================================= */

const cardsWrap = document.getElementById('cards');
const detail = document.getElementById('detail');
const scroller = document.getElementById('detailScroll');
const $ = (id) => document.getElementById(id);

let activeCard = null;
let vistaActiva = null; // vista de la finca abierta
let animating = false;

/* Convierte una ruta ('img/f1.jpg') en url() con dirección completa.
   Necesario porque, al pasar por una variable CSS, una ruta relativa se
   buscaría desde la carpeta css/ y no desde index.html. */
const cssUrl = (src) => `url('${new URL(src, document.baseURI).href}')`;

/* Aplica el fondo ajustable de una finca a un elemento */
function applyBackground(el, finca, img = finca.fondo) {
  el.style.setProperty('--img', cssUrl(img));
  el.style.setProperty('--pos', finca.posicion || 'center');
  el.style.setProperty('--dark', finca.oscurecer ?? 0.3);
  el.style.setProperty('--color', finca.color);
}

/* ---------- 1. Cards ---------- */
function renderCards() {
  FINCAS.forEach((finca) => {
    const card = document.createElement('button');
    card.className = 'card';
    card.type = 'button';
    card.dataset.id = finca.id;
    card.setAttribute('aria-label', `Ver información de ${finca.nombre}`);
    applyBackground(card, finca);

    card.innerHTML = `
      <span class="card__bg"></span>
      <span class="card__body">
        <span class="tag">${finca.etiqueta}</span>
        <span class="card__title">${finca.nombre}</span>
        <span class="card__lema">${finca.lema}</span>
        <span class="card__more"><span class="card__plus">+</span> Ver finca</span>
      </span>`;

    card.addEventListener('click', () => openFinca(finca, card));
    cardsWrap.appendChild(card);
  });
}

/* ---------- 2. Vista de la finca ---------- */
// Cada finca usa la vista de VISTAS[finca.plantilla] (js/vista-finca.js)
function fillDetail(finca) {
  applyBackground(detail, finca);
  detail.setAttribute('aria-label', finca.nombre);

  const vista = VISTAS[finca.plantilla];
  Object.values(VISTAS).forEach((v) => { if (v !== vista) v.hide(); });
  vista.mount(finca, { detailEl: detail, scrollEl: scroller });
  vistaActiva = vista;
}

/* ---------- 3. Animación de expandir / contraer ---------- */
// Bloquea el scroll de la página sin que el contenido "salte":
// si hay barra de desplazamiento, se compensa su ancho mientras está oculta.
function lockScroll(lock) {
  const barra = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = lock && barra > 0 ? `${barra}px` : '';
  document.body.classList.toggle('is-locked', lock);
}

// Devuelve un clip-path que recorta la vista exactamente sobre la card
function clipFromCard(card) {
  const r = card.getBoundingClientRect();
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  const radius = getComputedStyle(card).borderRadius;
  return `inset(${r.top}px ${w - r.right}px ${h - r.bottom}px ${r.left}px round ${radius})`;
}
const CLIP_FULL = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)';

function onTransitionEnd(el, cb) {
  let done = false;
  const finish = () => { if (!done) { done = true; cb(); } };
  el.addEventListener('transitionend', (e) => { if (e.propertyName === 'clip-path') finish(); }, { once: true });
  setTimeout(finish, 1000); // respaldo si el navegador no dispara el evento
}

function openFinca(finca, card) {
  if (animating) return;
  animating = true;
  activeCard = card;

  fillDetail(finca);
  scroller.scrollTop = 0;

  detail.hidden = false;
  detail.style.clipPath = clipFromCard(card);
  detail.getBoundingClientRect(); // fuerza el reflow para que la transición arranque

  requestAnimationFrame(() => {
    card.style.visibility = 'hidden';
    detail.style.clipPath = CLIP_FULL;
  });

  onTransitionEnd(detail, () => {
    detail.classList.add('is-ready');
    lockScroll(true);
    vistaActiva?.start();
    $('detailClose').focus();
    history.pushState({ finca: finca.id }, '', `#${finca.id}`);
    animating = false;
  });
}

function closeFinca({ fromHistory = false } = {}) {
  if (animating || detail.hidden) return;
  animating = true;

  detail.classList.remove('is-ready');
  vistaActiva?.unmount();
  scroller.scrollTo({ top: 0 });
  lockScroll(false);

  setTimeout(() => {
    detail.style.clipPath = clipFromCard(activeCard);
    onTransitionEnd(detail, () => {
      detail.hidden = true;
      activeCard.style.visibility = '';
      activeCard.focus({ preventScroll: true });
      animating = false;
    });
  }, 250);

  if (!fromHistory && location.hash) history.back();
}

/* ---------- 4. Eventos ---------- */
$('detailClose').addEventListener('click', () => closeFinca());
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  // Si hay un modal o visor abierto dentro de la vista, se cierra eso primero
  if (vistaActiva?.onEscape()) return;
  closeFinca();
});
// Botón "atrás" del navegador / celular cierra la finca
window.addEventListener('popstate', () => closeFinca({ fromHistory: true }));

/* ---------- Inicio ---------- */
renderCards();

// Si se entra con #primavera o #guaduales en la URL, abre esa finca
const inicial = FINCAS.find((f) => `#${f.id}` === location.hash);
if (inicial) {
  history.replaceState(null, '', location.pathname);
  setTimeout(() => openFinca(inicial, cardsWrap.querySelector(`[data-id="${inicial.id}"]`)), 300);
}
