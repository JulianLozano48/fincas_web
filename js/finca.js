/* =========================================================
   DOS REFUGIOS · Lógica exclusiva de las páginas de finca
   Galería con lightbox (clic, teclado y swipe)
   ========================================================= */

document.addEventListener('DOMContentLoaded', initLightbox);

function initLightbox() {
  const items = [...document.querySelectorAll('.gallery__item')];
  const box = document.getElementById('lightbox');
  if (!items.length || !box) return;

  const img = box.querySelector('.lightbox__img');
  const caption = box.querySelector('.lightbox__caption');
  let index = 0;
  let lastFocus = null;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    img.style.setProperty('--img', `url('${item.dataset.full}')`);
    caption.textContent = item.dataset.caption || '';
  };

  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    box.querySelector('.lightbox__close').focus();
  };

  const close = () => {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    lastFocus?.focus();
  };

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lightbox__next').addEventListener('click', () => show(index + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe en móvil
  let startX = 0;
  box.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });
}
