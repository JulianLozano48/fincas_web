/* =========================================================
   VISTA ESPECIAL DE FINCA (plantilla reutilizable)
   Dibuja la vista expandida de una card a partir de un objeto
   de datos (PRIMAVERA, GUADUALES… en js/fincas-data.js).

   Cada finca con `plantilla: '<id>'` usa VISTAS['<id>'].
   inicio.js llama a mount() / start() / unmount() / hide() / onEscape().
   ========================================================= */

/* ---------- Iconos y decoración (compartidos) ---------- */
const PV_ICONOS = {
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  fb: '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8Z"/></svg>',
  route: '<svg viewBox="0 0 24 24"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8"/></svg>',
  arrowL: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  leaf: '<svg viewBox="0 0 24 24"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/></svg>',
  wa: '<svg viewBox="0 0 32 32" class="is-fill"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7a10.7 10.7 0 0 1-5.5-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1s-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.8.8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4Z"/></svg>',
};

/* Rama decorativa para los laterales: tallo curvo con hojas alternadas */
const PV_RAMA = (() => {
  const leaf = (x, y, ang, sc = 1) =>
    `<path transform="translate(${x} ${y}) rotate(${ang}) scale(${sc})" d="M0 0C9-11 27-13 42 0C27 13 9 11 0 0Z" fill="currentColor"/>` +
    `<path transform="translate(${x} ${y}) rotate(${ang}) scale(${sc})" d="M2 0H36" style="fill:none;stroke:rgba(255,255,255,.35);stroke-width:.8"/>`;
  let leaves = '';
  for (let i = 0; i < 9; i++) {
    const y = 50 + i * 62;
    const x = 62 + Math.sin(i * 0.9) * 10;
    leaves += leaf(x, y, i % 2 ? 210 + i * 3 : -30 - i * 3, 1 - i * 0.03);
  }
  return `<svg class="pv-branch" viewBox="0 0 140 640" aria-hidden="true">
    <path d="M70 0C52 120 82 220 64 330S80 520 60 640" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round"/>
    ${leaves}</svg>`;
})();
const PV_HOJA = (n) => `<svg class="pv-float pv-float--${n}" viewBox="0 0 44 22" aria-hidden="true"><path d="M1 11C10 0 28-2 43 11C28 24 10 22 1 11Z" fill="currentColor"/></svg>`;

/* Secciones del menú (el texto de cada una viene en D.nav) */
const PV_SECCIONES = ['about', 'estab', 'exp', 'services', 'contact'];

/* =========================================================
   Fábrica: crea una vista a partir de sus datos
   ========================================================= */
function crearVistaFinca(D) {
  const I = PV_ICONOS;
  const P = D.id; // prefijo para que los id no se repitan entre fincas
  const src = (p) => new URL(p, D.base || document.baseURI).href;
  const bg = (p) => `url('${src(p)}')`;
  const wa = (texto = D.mensajeWhatsapp) => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(texto)}`;
  const pad = (n) => String(n).padStart(2, '0');
  const $id = (x) => root.querySelector(`#${P}-${x}`);

  let root, scroller, detail, waFloat;
  let built = false;
  const timers = {};
  let revealIO = null;
  let onScroll = null;
  let heroFotos = [];

  /* =======================================================
     1. HTML
     ======================================================= */
  function template(finca) {
    // 1.ª foto = la de la card, para que la transición de apertura sea continua
    heroFotos = [new URL(finca.fondo, document.baseURI).href, ...D.hero.fotos];
    const c = D.contacto;
    const S = D.servicios;
    const nombre = `${D.marca.pre} <em>${D.marca.nombre}</em>`;
    const nombrePlano = `${D.marca.pre} ${D.marca.nombre}`;
    const hayMapa = c.lat != null && c.lng != null;

    const marquee = (fotos, dir, fila) => `
      <div class="pv-marquee pv-marquee--${dir}">
        <div class="pv-marquee__track">
          ${[...fotos, ...fotos].map((f, i) => `
            <button type="button" class="pv-marquee__item" data-viewer="${fila}" data-index="${i % fotos.length}"
              ${i >= fotos.length ? 'tabindex="-1" aria-hidden="true"' : `aria-label="Ampliar foto ${i + 1}"`}>
              <img src="${src(f)}" alt="" loading="lazy" decoding="async">
            </button>`).join('')}
        </div>
      </div>`;

    // Tarjetas de contacto: solo se muestran las que tienen datos
    const contactos = [
      c.direccion && `<li><span class="pv-ico">${I.pin}</span><div><h3>Ubicación</h3><p>${c.direccion}</p></div></li>`,
      c.telefonos?.length && `<li><span class="pv-ico">${I.phone}</span><div><h3>Celular de contacto</h3>
        ${c.telefonos.map((t) => `<p><a href="tel:+57${t.numero}">${t.numero.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}</a>${t.nombre ? ` · ${t.nombre}` : ''}</p>`).join('')}</div></li>`,
      c.correo && `<li><span class="pv-ico">${I.mail}</span><div><h3>Email</h3><p><a href="mailto:${c.correo}">${c.correo}</a></p></div></li>`,
      c.facebook && `<li><span class="pv-ico">${I.fb}</span><div><h3>Facebook</h3><p>Síguenos para estar atento a las novedades. <a href="${c.facebook}" target="_blank" rel="noopener">Ver página →</a></p></div></li>`,
    ].filter(Boolean).join('');

    return `
      <!-- Decoración lateral con parallax (solo pantallas anchas) -->
      <div class="pv-sides" aria-hidden="true">
        <div class="pv-side pv-side--l">${PV_RAMA}${PV_HOJA(1)}${PV_HOJA(2)}<span class="pv-progress"></span></div>
        <div class="pv-side pv-side--r">${PV_RAMA}${PV_HOJA(3)}${PV_HOJA(1)}</div>
      </div>

      <nav class="pv-nav" aria-label="Secciones de ${nombrePlano}">
        <button type="button" class="pv-nav__logo" data-go="top">
          ${D.marca.logo
            ? `<img src="${src(D.marca.logo)}" alt="">`
            : `<span class="pv-nav__mark" aria-hidden="true">${I.leaf}</span>`}
          <span>${nombre}</span>
        </button>
        <div class="pv-nav__links">
          ${PV_SECCIONES.map((k) => `<button type="button" data-go="${k}">${D.nav[k]}</button>`).join('')}
        </div>
        <a class="pv-btn pv-btn--light pv-btn--sm pv-nav__cta" href="${wa()}" target="_blank" rel="noopener">${D.nav.cta}</a>
      </nav>

      <!-- ===== HERO ===== -->
      <header class="pv-hero" id="${P}-top">
        <div class="pv-hero__slides">
          ${heroFotos.map((f, i) => `<div class="pv-hero__slide${i === 0 ? ' is-active' : ''}"
              ${i === 0 ? `style="--img:${bg(f)};--pos:${finca.posicion || 'center'}"` : ''}></div>`).join('')}
        </div>
        <div class="pv-hero__shade"></div>

        <div class="pv-hero__content">
          <p class="pv-eyebrow pv-eyebrow--light">${D.hero.eyebrow}</p>
          <h1 class="pv-hero__title">${nombre}</h1>
          <p class="pv-hero__lead">${D.hero.lema}</p>
          <div class="pv-hero__actions">
            <button type="button" class="pv-btn pv-btn--glass" data-go="services">${D.hero.boton}</button>
          </div>
        </div>

        <div class="pv-hero__ui">
          <span class="pv-hero__count"><strong id="${P}-heroNum">01</strong> / ${pad(heroFotos.length)}</span>
          <div class="pv-hero__bars">
            ${heroFotos.map((_, i) => `<button type="button" class="pv-hero__bar${i === 0 ? ' is-active' : ''}" data-slide="${i}" aria-label="Foto ${i + 1}"><span></span></button>`).join('')}
          </div>
          <div class="pv-hero__arrows">
            <button type="button" class="pv-round" data-hero="-1" aria-label="Foto anterior">${I.arrowL}</button>
            <button type="button" class="pv-round" data-hero="1" aria-label="Foto siguiente">${I.arrowR}</button>
          </div>
        </div>
        <span class="pv-hero__scroll" aria-hidden="true">Desliza</span>
      </header>

      <!-- ===== INTRO ===== -->
      <section class="pv-intro pv-wrap">
        <span class="pv-leaf" aria-hidden="true">${I.leaf}</span>
        <h2 class="pv-intro__title" data-pv-reveal>${D.intro.titulo}</h2>
        <p class="pv-intro__text" data-pv-reveal>${D.intro.texto}</p>
        <ul class="pv-highlights" data-pv-reveal>
          ${D.intro.destacados.map((d) => `<li>${d}</li>`).join('')}
        </ul>
      </section>

      <!-- ===== CONÓCENOS / EL LUGAR ===== -->
      <section class="pv-stories pv-wrap" id="${P}-about">
        ${D.historias.map((h, i) => `
          <article class="pv-story${i % 2 ? ' pv-story--rev' : ''}">
            <figure class="pv-story__img" data-pv-reveal><img src="${src(h.foto)}" alt="" loading="lazy"></figure>
            <div class="pv-story__panel" data-pv-reveal>
              <span class="pv-story__num">${pad(i + 1)}</span>
              <h2>${h.titulo}</h2>
              <p>${h.texto}</p>
            </div>
          </article>`).join('')}
      </section>

      <!-- ===== INSTALACIONES (carruseles continuos) ===== -->
      <section class="pv-estab" id="${P}-estab">
        <div class="pv-head pv-wrap" data-pv-reveal>
          <p class="pv-eyebrow">${D.establecimiento.eyebrow}</p>
          <h2>${D.establecimiento.titulo}</h2>
        </div>
        <div class="pv-wrap">
          <div class="pv-estab__rows" data-pv-reveal>
            ${marquee(D.establecimiento.fila1, 'left', 'fila1')}
            ${marquee(D.establecimiento.fila2, 'right', 'fila2')}
          </div>
        </div>
      </section>

      <!-- ===== EXPERIENCIAS / A TU MEDIDA ===== -->
      <section class="pv-exp pv-wrap" id="${P}-exp">
        <div class="pv-exp__media" data-pv-reveal>
          ${D.experiencias.fotos.map((f, i) => `<img class="pv-exp__img${i === 0 ? ' is-active' : ''}" src="${src(f)}" alt="" loading="lazy">`).join('')}
          <div class="pv-exp__dots">
            ${D.experiencias.fotos.map((_, i) => `<button type="button" class="${i === 0 ? 'is-active' : ''}" data-exp="${i}" aria-label="Foto ${i + 1}"></button>`).join('')}
          </div>
        </div>
        <div class="pv-exp__text" data-pv-reveal>
          <p class="pv-eyebrow">${D.experiencias.eyebrow}</p>
          <h2>${D.experiencias.titulo}</h2>
          ${D.experiencias.texto.map((t) => `<p>${t}</p>`).join('')}
          <a class="pv-btn pv-btn--dark" href="${wa(D.experiencias.mensaje)}" target="_blank" rel="noopener">${D.experiencias.boton}</a>
        </div>
      </section>

      <!-- ===== SERVICIOS / TIPOS DE EVENTO ===== -->
      <section class="pv-services" id="${P}-services">
        <div class="pv-head pv-wrap" data-pv-reveal>
          <p class="pv-eyebrow">${S.eyebrow}</p>
          <h2>${S.titulo}</h2>
        </div>
        <div class="pv-services__grid pv-services__grid--n${S.items.length} pv-wrap">
          ${S.items.map((s, i) => `
            <button type="button" class="pv-service" data-service="${s.id}" data-pv-reveal style="--d:${i * 0.1}s">
              <span class="pv-service__media">
                <img src="${src(s.portada)}" alt="" loading="lazy">
                <span class="pv-service__num">${pad(i + 1)}</span>
              </span>
              <span class="pv-service__body">
                <span class="pv-service__title">${s.titulo}</span>
                <span class="pv-service__text">${s.resumen}</span>
                <span class="pv-service__more">Ver más <span class="pv-service__arrow">${I.arrowR}</span></span>
              </span>
            </button>`).join('')}
        </div>
      </section>

      <!-- ===== CONTACTO ===== -->
      <section class="pv-contact" id="${P}-contact">
        <div class="pv-contact__inner pv-wrap${hayMapa ? '' : ' pv-contact__inner--solo'}">
          <div class="pv-contact__info" data-pv-reveal>
            <p class="pv-eyebrow pv-eyebrow--light">Contacto</p>
            <h2>${c.titulo}</h2>
            <ul class="pv-contact__list">${contactos}</ul>
            <div class="pv-contact__actions">
              ${hayMapa
                ? `<a class="pv-btn pv-btn--light" href="${c.enlaceMapa || `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`}" target="_blank" rel="noopener">${I.route} ¿Cómo llegar?</a>`
                : `<a class="pv-btn pv-btn--light" href="${wa()}" target="_blank" rel="noopener">${I.wa} Escríbenos por WhatsApp</a>`}
            </div>
          </div>
          ${hayMapa ? `
          <div class="pv-map" data-pv-reveal>
            <iframe title="Mapa de ${nombrePlano}" data-src="https://www.google.com/maps?q=${c.lat},${c.lng}&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>` : ''}
        </div>
        <footer class="pv-footer pv-wrap">
          <p>© ${new Date().getFullYear()} ${nombrePlano} · ${D.creditos}</p>
          <button type="button" class="pv-footer__top" data-go="top">Volver arriba ↑</button>
        </footer>
      </section>

      <!-- ===== MODAL DE SERVICIO / EVENTO ===== -->
      <div class="pv-modal" id="${P}-modal" role="dialog" aria-modal="true" aria-labelledby="${P}-modalTitle" hidden>
        <div class="pv-modal__card">
          <header class="pv-modal__head">
            <div>
              <p class="pv-eyebrow">${S.modalEyebrow}</p>
              <h2 id="${P}-modalTitle"></h2>
            </div>
            <button type="button" class="pv-round pv-round--dark" data-close="modal" aria-label="Cerrar">${I.close}</button>
          </header>
          <div class="pv-modal__body">
            <div class="pv-modal__info">
              <p class="pv-modal__desc" id="${P}-modalDesc"></p>
              <div class="pv-tabs" id="${P}-modalTabs" role="tablist"></div>
              <p class="pv-modal__label">${S.modalEtiqueta}</p>
              <ul class="pv-chips" id="${P}-modalSpaces"></ul>
              <a class="pv-btn pv-btn--dark pv-btn--sm pv-modal__cta" id="${P}-modalCta" target="_blank" rel="noopener">Consultar por WhatsApp</a>
            </div>
            <div class="pv-grid" id="${P}-modalGrid"></div>
          </div>
        </div>
      </div>

      <!-- ===== VISOR DE FOTOS ===== -->
      <div class="pv-viewer" id="${P}-viewer" role="dialog" aria-modal="true" aria-label="Foto ampliada" hidden>
        <button type="button" class="pv-round pv-viewer__close" data-close="viewer" aria-label="Cerrar">${I.close}</button>
        <button type="button" class="pv-round pv-viewer__prev" data-view="-1" aria-label="Anterior">${I.arrowL}</button>
        <img id="${P}-viewerImg" alt="">
        <button type="button" class="pv-round pv-viewer__next" data-view="1" aria-label="Siguiente">${I.arrowR}</button>
        <span class="pv-viewer__count" id="${P}-viewerCount"></span>
      </div>`;
  }

  /* =======================================================
     2. Comportamientos
     ======================================================= */

  // Desplazamiento suave dentro de la vista (sin tocar el #hash de la URL)
  function goTo(key) {
    const el = $id(key);
    if (!el) return;
    const navH = key === 'top' ? 0 : root.querySelector('.pv-nav').offsetHeight - 1;
    const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - navH;
    scroller.scrollTo({ top, behavior: 'smooth' });
  }

  /* ---------- Hero: carrusel con fundido y zoom lento ---------- */
  let heroIndex = 0;
  function loadSlide(i) {
    const s = root.querySelectorAll('.pv-hero__slide')[i];
    if (s && !s.style.getPropertyValue('--img')) s.style.setProperty('--img', bg(heroFotos[i]));
  }
  function heroGo(i) {
    const slides = root.querySelectorAll('.pv-hero__slide');
    const bars = root.querySelectorAll('.pv-hero__bar');
    heroIndex = (i + slides.length) % slides.length;
    loadSlide(heroIndex);
    loadSlide((heroIndex + 1) % slides.length); // precarga la siguiente
    slides.forEach((s, k) => s.classList.toggle('is-active', k === heroIndex));
    bars.forEach((b, k) => {
      b.classList.remove('is-active');
      if (k === heroIndex) { void b.offsetWidth; b.classList.add('is-active'); } // reinicia la barra de progreso
    });
    $id('heroNum').textContent = pad(heroIndex + 1);
  }
  function heroAuto() {
    clearInterval(timers.hero);
    timers.hero = setInterval(() => heroGo(heroIndex + 1), 6500);
  }

  /* ---------- Mini carrusel de la sección "exp" ---------- */
  let expIndex = 0;
  function expGo(i) {
    const imgs = root.querySelectorAll('.pv-exp__img');
    const dots = root.querySelectorAll('[data-exp]');
    expIndex = (i + imgs.length) % imgs.length;
    imgs.forEach((im, k) => im.classList.toggle('is-active', k === expIndex));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === expIndex));
  }
  function expAuto() {
    clearInterval(timers.exp);
    timers.exp = setInterval(() => expGo(expIndex + 1), 4500);
  }

  /* ---------- Modal de servicios / eventos ---------- */
  const modal = () => $id('modal');
  let modalFotos = [];

  function renderFloor(data) {
    $id('modalSpaces').innerHTML = data.espacios.map((e) => `<li>${e}</li>`).join('');
    modalFotos = data.fotos;
    $id('modalGrid').innerHTML = data.fotos
      .map((f, i) => `<button type="button" class="pv-grid__item" data-viewer="modal" data-index="${i}" style="--d:${i * 0.06}s" aria-label="Ampliar foto ${i + 1}">
          <img src="${src(f)}" alt="" loading="lazy"></button>`)
      .join('');
  }

  function openModal(id) {
    const s = D.servicios.items.find((x) => x.id === id);
    if (!s) return;
    $id('modalTitle').textContent = s.titulo;
    $id('modalDesc').textContent = s.descripcion;
    $id('modalCta').href = wa(D.servicios.mensaje.replace('{titulo}', s.titulo));

    const tabs = $id('modalTabs');
    if (s.pisos) {
      const keys = Object.keys(s.pisos);
      tabs.hidden = false;
      tabs.innerHTML = keys.map((k, i) => `<button type="button" role="tab" class="${i === 0 ? 'is-active' : ''}" aria-selected="${i === 0}">${k}</button>`).join('');
      tabs.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => {
        tabs.querySelectorAll('button').forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
        renderFloor(s.pisos[keys[i]]);
      }));
      renderFloor(s.pisos[keys[0]]);
    } else {
      tabs.hidden = true;
      tabs.innerHTML = '';
      renderFloor({ espacios: s.espacios, fotos: s.fotos });
    }

    const m = modal();
    m.hidden = false;
    m.querySelectorAll('.pv-modal__card, .pv-modal__info, .pv-grid').forEach((el) => { el.scrollTop = 0; });
    requestAnimationFrame(() => m.classList.add('is-open'));
    scroller.classList.add('is-frozen');
    m.querySelector('[data-close="modal"]').focus();
  }

  function closeModal() {
    const m = modal();
    if (!m || m.hidden) return false;
    m.classList.remove('is-open');
    scroller.classList.remove('is-frozen');
    setTimeout(() => { m.hidden = true; }, 350);
    return true;
  }

  /* ---------- Visor de fotos ---------- */
  const viewer = () => $id('viewer');
  let viewList = [];
  let viewIndex = 0;

  function showView(i) {
    viewIndex = (i + viewList.length) % viewList.length;
    const img = $id('viewerImg');
    img.classList.remove('is-in');
    img.onload = () => img.classList.add('is-in');
    img.src = src(viewList[viewIndex]);
    $id('viewerCount').textContent = `${pad(viewIndex + 1)} / ${pad(viewList.length)}`;
  }

  function openViewer(list, i) {
    viewList = list;
    const v = viewer();
    v.hidden = false;
    showView(i);
    requestAnimationFrame(() => v.classList.add('is-open'));
    scroller.classList.add('is-frozen');
  }

  function closeViewer() {
    const v = viewer();
    if (!v || v.hidden) return false;
    v.classList.remove('is-open');
    if (modal().hidden) scroller.classList.remove('is-frozen');
    setTimeout(() => { v.hidden = true; }, 300);
    return true;
  }

  /* ---------- Delegación de clics ---------- */
  function onClick(e) {
    const t = e.target.closest('button, [data-go]');
    if (!t || !root.contains(t)) return;

    if (t.dataset.go) return goTo(t.dataset.go);
    if (t.dataset.slide) { heroGo(+t.dataset.slide); return heroAuto(); }
    if (t.dataset.hero) { heroGo(heroIndex + +t.dataset.hero); return heroAuto(); }
    if (t.dataset.exp) { expGo(+t.dataset.exp); return expAuto(); }
    if (t.dataset.service) return openModal(t.dataset.service);
    if (t.dataset.view) return showView(viewIndex + +t.dataset.view);
    if (t.dataset.close === 'modal') return closeModal();
    if (t.dataset.close === 'viewer') return closeViewer();
    if (t.dataset.viewer) {
      const listas = { fila1: D.establecimiento.fila1, fila2: D.establecimiento.fila2, modal: modalFotos };
      return openViewer(listas[t.dataset.viewer], +t.dataset.index);
    }
  }

  function bindOnce() {
    root.addEventListener('click', onClick);

    // Clic en el fondo oscuro cierra modal / visor
    modal().addEventListener('click', (e) => { if (e.target === modal()) closeModal(); });
    viewer().addEventListener('click', (e) => { if (e.target === viewer()) closeViewer(); });

    // Flechas del teclado en el visor
    document.addEventListener('keydown', (e) => {
      if (viewer().hidden) return;
      if (e.key === 'ArrowLeft') showView(viewIndex - 1);
      if (e.key === 'ArrowRight') showView(viewIndex + 1);
    });

    // Swipe en el visor (celular)
    let x0 = 0;
    viewer().addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    viewer().addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) showView(viewIndex + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- Aparición al hacer scroll + menú activo + laterales ---------- */
  function startObservers() {
    const items = root.querySelectorAll('[data-pv-reveal]');
    if ('IntersectionObserver' in window) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); }
        });
      }, { root: scroller, threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      items.forEach((el) => { if (!el.classList.contains('is-in')) revealIO.observe(el); });
    } else {
      items.forEach((el) => el.classList.add('is-in'));
    }

    const nav = root.querySelector('.pv-nav');
    const links = [...root.querySelectorAll('.pv-nav__links [data-go]')];
    const sections = PV_SECCIONES.map((k) => $id(k));
    const hero = $id('top');
    const contact = $id('contact');
    let ticking = false;
    const paintSides = () => {
      ticking = false;
      const y = scroller.scrollTop;
      const max = scroller.scrollHeight - scroller.clientHeight || 1;
      root.style.setProperty('--pv-y', y.toFixed(1));
      root.style.setProperty('--pv-p', (y / max).toFixed(4));
      root.classList.toggle('is-past-hero', y > hero.offsetHeight * 0.6);
      root.classList.toggle('is-dark-zone', contact.getBoundingClientRect().top < scroller.clientHeight * 0.5);
    };
    onScroll = () => {
      const y = scroller.scrollTop;
      if (!ticking) { ticking = true; requestAnimationFrame(paintSides); }
      nav.classList.toggle('is-solid', y > 40);
      const limit = scroller.getBoundingClientRect().top + nav.offsetHeight + 40;
      let current = -1;
      sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= limit) current = i; });
      links.forEach((l, i) => l.classList.toggle('is-active', i === current));
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =======================================================
     3. API pública
     ======================================================= */
  function mount(finca, { detailEl, scrollEl }) {
    detail = detailEl;
    scroller = scrollEl;
    root = detail.querySelector(`#${P}`);

    if (!built) {
      root.innerHTML = template(finca);
      bindOnce();
      waFloat = document.createElement('a');
      waFloat.className = 'pv-wa';
      waFloat.href = wa();
      waFloat.target = '_blank';
      waFloat.rel = 'noopener';
      waFloat.setAttribute('aria-label', 'Escríbenos por WhatsApp');
      waFloat.innerHTML = I.wa;
      detail.appendChild(waFloat);
      built = true;
    }

    root.hidden = false;
    waFloat.hidden = false;
    detail.classList.add('detail--pv');
    if (D.tema) {
      root.classList.add(`pv--${D.tema}`);       // paleta propia (ej. azul)
      detail.classList.add(`detail--${D.tema}`);
    }

    heroGo(0);
    expGo(0);
  }

  // Se llama cuando la vista terminó de abrirse
  function start() {
    if (!root || root.hidden) return;
    const map = root.querySelector('.pv-map iframe');
    if (map && !map.src) map.src = map.dataset.src;
    heroAuto();
    expAuto();
    startObservers();
  }

  function unmount() {
    if (!root) return;
    closeViewer();
    closeModal();
    clearInterval(timers.hero);
    clearInterval(timers.exp);
    revealIO?.disconnect();
    if (onScroll) scroller.removeEventListener('scroll', onScroll);
    scroller.classList.remove('is-frozen');
  }

  // Oculta la vista (cuando se abre otra finca)
  function hide() {
    unmount();
    if (root) root.hidden = true;
    if (waFloat) waFloat.hidden = true;
    detail?.classList.remove('detail--pv');
    if (D.tema) detail?.classList.remove(`detail--${D.tema}`);
  }

  // Escape cierra primero el visor y el modal antes que la finca
  function onEscape() {
    if (!root || root.hidden) return false;
    return closeViewer() || closeModal();
  }

  return { mount, start, unmount, hide, onEscape };
}

/* Una vista por cada finca que tenga datos propios */
const VISTAS = {
  primavera: crearVistaFinca(PRIMAVERA),
  guaduales: crearVistaFinca(GUADUALES),
};
