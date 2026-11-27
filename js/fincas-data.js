/* =========================================================
   DATOS DE LAS FINCAS
   👉 Este es el único archivo que necesitas editar para
      cambiar textos, fotos y datos de contacto.

   FINCAS     → las cards del inicio.
   PRIMAVERA  → contenido de la vista de La Primavera.
   GUADUALES  → contenido de la vista de Los Guaduales.
   ========================================================= */

const FINCAS = [
  {
    id: 'primavera',
    nombre: 'La primavera',
    etiqueta: 'Rozo. Valle del cauca',
    lema: 'Lugar para descanso y disfrute en familia.',
    fondo: 'img/f1.jpg',
    posicion: '62% center', // encuadre de la foto
    oscurecer: 0.2,         // 0 = foto nítida · 0.6 = muy oscura
    color: '#8c967e',       // color mientras carga la foto
    plantilla: 'primavera', // usa la vista definida en PRIMAVERA (más abajo)
  },
  {
    id: 'guaduales',
    nombre: 'Los Guaduales',
    etiqueta: 'Salón de eventos campestre',
    lema: 'Celebraciones, reuniones y eventos de toda índole.',
    fondo: 'img/Pasoancho/P (20).jpeg',
    posicion: 'center 60%',
    oscurecer: 0.2,
    color: '#4f8ca3',
    plantilla: 'guaduales', // usa la vista definida en GUADUALES (más abajo)
  },
];

/* =========================================================
   LA PRIMAVERA · Contenido de su vista especial
   (se abre al hacer clic en la primera card)
   👉 Las rutas de fotos son relativas a "base". Si copias las
      fotos a este proyecto, cambia "base" por '' y usa 'img/...'.
   ========================================================= */
const PRIMAVERA = {
  id: 'primavera', // debe coincidir con plantilla de la card y con <div id="primavera"> en index.html
  base: 'https://laprimavera-finca.github.io/WebSite-LaPrimavera/',
  marca: { pre: 'La', nombre: 'Primavera', logo: 'img/icon-primavera.png' },
  nav: { about: 'Conócenos', estab: 'Establecimiento', exp: 'Experiencias', services: 'Servicios', contact: 'Contacto', cta: 'Reservar' },
  whatsapp: '573206596970',
  mensajeWhatsapp: 'Hola, buen día. Vengo desde su página web y me gustaría recibir más información. ¡Gracias!',

  hero: {
    eyebrow: 'Finca campestre · Rozo, Valle del Cauca',
    boton: 'Ver servicios',
    lema: 'Naturaleza, piscina y tranquilidad para descansar y compartir en familia.',
    fotos: [
      'img/carrus/carrus-ppal1.jpg',
      'img/carrus/carrus-ppal2.jpg',
      'img/carrus/carrus-ppal3.jpg',
      'img/carrus/carrus-ppal4.jpg',
    ],
  },

  intro: {
    titulo: 'Tu <em>descanso</em> es la prioridad',
    texto:
      'Déjate envolver por la tranquilidad de la naturaleza y desconéctate del ritmo de la ciudad. ' +
      'Nuestra finca es el lugar perfecto para descansar, disfrutar en familia y vivir momentos inolvidables. ' +
      'Rodeada de paisajes únicos, con zonas verdes, piscina y espacios pensados para tu comodidad, aquí encontrarás ' +
      'el equilibrio entre relax, diversión y confort.',
    destacados: ['Piscina', 'Zonas verdes', 'Estadero con bar', 'Asador y fogón de leña', 'Dos pisos de casa'],
  },

  historias: [
    {
      titulo: 'Vive <em>experiencias</em>',
      foto: 'img/ca1.jpg',
      texto:
        'Este lugar campestre ha sido creado para quienes buscan desconectarse del ruido, reencontrarse con la naturaleza ' +
        'y disfrutar de una experiencia de descanso auténtica. Rodeado de paisajes verdes y aire puro, el entorno invita a ' +
        'bajar el ritmo. Los ambientes son amplios, frescos y bien iluminados, y en las tardes el silencio del campo y el ' +
        'canto de las aves crean una atmósfera cálida y relajante.',
    },
    {
      titulo: '¡Espacios <em>únicos</em>!',
      foto: 'img/carrus-prim4.jpg',
      texto:
        'Áreas ideales para compartir en familia o con amigos, y rincones tranquilos para descansar, leer o contemplar la ' +
        'naturaleza. Alrededor de una mesa, en una terraza abierta o caminando por los alrededores, cada paso transmite paz. ' +
        'Una estadía limpia, ordenada y acogedora: el amanecer entre montañas, la brisa al atardecer y noches bajo un cielo despejado.',
    },
  ],

  establecimiento: {
    eyebrow: 'Establecimiento',
    titulo: 'Espacios diseñados para tu <em>tranquilidad</em>',
    fila1: ['img/spaces/space1.jpg', 'img/spaces/space2.jpeg', 'img/spaces/space3.jpg', 'img/spaces/space4.jpg', 'img/spaces/space5.jpg'],
    fila2: ['img/spaces/space6.jpg', 'img/spaces/space7.jpeg', 'img/spaces/space8.jpg', 'img/spaces/space9.jpg', 'img/spaces/space10.jpg'],
  },

  experiencias: {
    eyebrow: 'Experiencias',
    titulo: 'Experiencias diseñadas <em>para ti</em>',
    boton: 'Planear mi visita',
    mensaje: 'Hola, quiero vivir una experiencia en La Primavera. ¿Me dan información?',
    fotos: ['img/carrus-prim2.jpg', 'img/carrus-prim3.jpg', 'img/carrus-prim5.jpg'],
    texto: [
      'En Finca Campestre La Primavera cada detalle ha sido pensado para ofrecer mucho más que un lugar para alquilar: ' +
        'un espacio donde la tranquilidad, la naturaleza y el bienestar se unen para brindarte una experiencia inolvidable.',
      'Es ese refugio natural donde los días se disfrutan sin prisas y las noches se viven bajo un cielo sereno. Ya sea ' +
        'para descansar, celebrar, compartir en familia o simplemente cambiar de ambiente, la finca se adapta a cada ocasión.',
    ],
  },

  servicios: {
    eyebrow: 'Nuestros servicios',
    titulo: 'Comodidad y confort <em>adecuados para ti</em>',
    modalEyebrow: 'Servicio',
    modalEtiqueta: 'Cuenta con',
    mensaje: 'Hola, quiero información sobre el servicio de {titulo} en La Primavera.',
    items: [
      {
        id: 'estadia',
        titulo: 'Estadía',
        resumen: 'Espacios acogedores para tu descanso.',
        portada: 'img/imgServices/estadia-main.jpg',
        descripcion: 'Un refugio campestre donde la calma y el descanso se viven naturalmente: espacios rodeados de tranquilidad, pensados para el descanso y el confort.',
        pisos: {
          'Primer piso': {
            espacios: ['Sala–comedor', 'Baño', 'Cocina amplia (equipada)', 'Habitación (4 camarotes)', 'Lavadero grande', 'Alcoba trasera'],
            fotos: ['img/estadia-pp/pp-sala-comedor.jpeg', 'img/estadia-pp/pp-sala.jpg', 'img/estadia-pp/pp-baño.png', 'img/estadia-pp/pp-cocina.jpg', 'img/estadia-pp/pp-cuarto.jpg', 'img/estadia-pp/pp-lavadero.jpg'],
          },
          'Segundo piso': {
            espacios: ['Sala', 'Baño', 'Balcón frontal', 'Balcón trasero', 'Habitación principal', '2 habitaciones auxiliares'],
            fotos: ['img/estadia-sp/sp-sala.jpg', 'img/estadia-sp/sp-cp.jpg', 'img/estadia-sp/sp-ca1.jpg', 'img/estadia-sp/sp-ca2.jpg', 'img/estadia-sp/sp-baño.jpg', 'img/estadia-sp/sp-sala2.jpg'],
          },
          Estadero: {
            espacios: ['Piscina', 'Baños', 'Zona de descanso', 'Mini bar', 'Cocina (no equipada)', 'Nevera', 'Asador', 'Fogón de leña', 'Mini lavadero'],
            fotos: ['img/estadia-est/est-2.jpg', 'img/estadia-est/est-barra.jpg', 'img/estadia-est/est-parrilla.jpg', 'img/estadia-est/est-cocina.jpg', 'img/estadia-est/est-out.jpg', 'img/estadia-est/est-1.jpg'],
          },
        },
      },
      {
        id: 'pasadias',
        titulo: 'Pasadías',
        resumen: 'Comparte a tu gusto jornadas únicas.',
        portada: 'img/imgServices/pasadia-main.jpeg',
        descripcion: 'Comparte en un espacio cálido y de recreación lleno de experiencias.',
        espacios: ['Piscina', 'Baños mixtos', 'Bar', 'Estadero', 'Juego de sapo'],
        fotos: ['img/pasadia/pas-1.jpg', 'img/pasadia/pas-2.jpg', 'img/pasadia/pas-3.jpg', 'img/pasadia/pas-4.jpg', 'img/pasadia/pas-5.jpg', 'img/pasadia/pas-6.jpg'],
      },
      {
        id: 'eventos',
        titulo: 'Eventos',
        resumen: 'Disfruta de reuniones y eventos sociales.',
        portada: 'img/imgServices/eventos-main.jpg',
        descripcion: 'Espacios diseñados para reuniones y celebraciones de cualquier índole.',
        espacios: ['Piscina', 'Baños mixtos', 'Bar', 'Estadero', 'Juego de sapo'],
        fotos: ['img/eventos/eventos-1.jpg', 'img/eventos/eventos-2.jpg', 'img/eventos/eventos-3.jpg', 'img/eventos/eventos-4.jpg', 'img/eventos/eventos-5.jpg', 'img/eventos/eventos-6.jpg'],
      },
    ],
  },

  contacto: {
    titulo: 'Te esperamos en <em>Rozo</em>',
    direccion: 'Cra 18 #10-217 · Callejón Vergara · Rozo, Valle del Cauca, Colombia',
    telefonos: [
      { numero: '3206596970', nombre: 'Sra. Isdaby Nieva' },
      { numero: '3147629185', nombre: 'Sra. Carolina Lozano' },
    ],
    correo: 'fincaprimaverarozo@gmail.com',
    facebook: 'https://www.facebook.com/laprimavera.fincarozo.9/',
    lat: 3.619138,
    lng: -76.409855,
  },

  creditos: 'Designed by Julian Andres Lozano',
};

/* =========================================================
   LOS GUADUALES · Salón campestre para eventos
   (se abre al hacer clic en la segunda card)
   Fotos locales en img/Pasoancho/ (respeta mayúsculas: GitHub Pages las distingue)
   ========================================================= */
const FOTO_PA = (n) => `img/Pasoancho/P (${n}).jpeg`; // atajo para las fotos numeradas

const GUADUALES = {
  id: 'guaduales',
  tema: 'azul', // paleta azul cálido (ver .pv--azul en css/vista-finca.css) // debe coincidir con plantilla de la card y con <div id="guaduales"> en index.html
  base: '', // fotos locales
  whatsapp: PRIMAVERA.whatsapp, // mismo WhatsApp de La Primavera
  mensajeWhatsapp: 'Hola, buen día. Vengo desde su página web y quisiera cotizar un evento en Los Guaduales.',
  marca: { pre: 'Los', nombre: 'Guaduales', logo: '' }, // logo: ruta de una imagen (opcional)
  nav: { about: 'El lugar', estab: 'Instalaciones', exp: 'A tu medida', services: 'Eventos', contact: 'Contacto', cta: 'Cotizar' },

  hero: {
    eyebrow: 'Salón campestre para eventos',
    lema: 'Celebra tus momentos más importantes en un espacio amplio, verde y listo para eventos de toda índole.',
    boton: 'Ver eventos',
    fotos: [FOTO_PA(18), FOTO_PA(1), FOTO_PA(16), FOTO_PA(10), FOTO_PA(19)],
  },

  intro: {
    titulo: 'Cada <em>celebración</em> merece su lugar',
    texto:
      'Los Guaduales es un espacio campestre pensado para que tu evento salga perfecto: un salón cubierto amplio, ' +
      'zonas verdes, piscina y todo lo necesario para recibir a tus invitados con comodidad. Desde una primera ' +
      'comunión hasta una reunión empresarial, aquí cada detalle está listo para que solo te preocupes por disfrutar.',
    destacados: ['Salón cubierto amplio', 'Piscina', 'Zona verde', 'Barra y cocina de apoyo', 'Asador', 'Baños damas y caballeros'],
  },

  historias: [
    {
      titulo: 'Un salón <em>para todo</em>',
      foto: FOTO_PA(19),
      texto:
        'Nuestro salón cubierto, con piso en cerámica y un gran espacio libre, se adapta a la distribución que imagines: ' +
        'mesas para un almuerzo familiar, auditorio para una capacitación o pista de baile para la fiesta. ' +
        'Fresco, iluminado y protegido del sol y de la lluvia.',
    },
    {
      titulo: 'Naturaleza y <em>piscina</em>',
      foto: FOTO_PA(1),
      texto:
        'Alrededor del salón, la zona verde y la piscina con su colorido mural crean el ambiente ideal para que niños y ' +
        'adultos disfruten. Un entorno campestre, tranquilo y seguro que convierte cualquier reunión en una experiencia diferente.',
    },
  ],

  establecimiento: {
    eyebrow: 'Instalaciones',
    titulo: 'Espacios listos para <em>tu evento</em>',
    fila1: [FOTO_PA(18), FOTO_PA(10), FOTO_PA(16), FOTO_PA(11), FOTO_PA(21), FOTO_PA(23)],
    fila2: [FOTO_PA(19), FOTO_PA(20), FOTO_PA(22), 'img/Pasoancho/1.jpeg', FOTO_PA(12), FOTO_PA(17)],
  },

  experiencias: {
    eyebrow: 'A tu medida',
    titulo: 'Eventos <em>de toda índole</em>',
    texto: [
      'Primeras comuniones, bautizos, cumpleaños, quinceañeros, grados, despedidas, reuniones familiares, integraciones ' +
        'y encuentros empresariales: en Los Guaduales adaptamos el espacio a lo que necesitas.',
      'Cuéntanos la fecha, el número de invitados y el tipo de celebración, y te ayudamos a organizar el lugar para ' +
        'que tu evento sea cómodo, seguro e inolvidable.',
    ],
    boton: 'Cotizar mi evento',
    mensaje: 'Hola, quiero cotizar un evento en Los Guaduales. ¿Me pueden dar información?',
    fotos: [FOTO_PA(18), FOTO_PA(20), FOTO_PA(16)],
  },

  servicios: {
    eyebrow: 'Tipos de eventos',
    titulo: 'Celebra lo que quieras, <em>como quieras</em>',
    modalEyebrow: 'Evento',
    modalEtiqueta: 'Espacios disponibles',
    mensaje: 'Hola, quiero información para realizar un evento de {titulo} en Los Guaduales.',
    items: [
      {
        id: 'sociales',
        titulo: 'Eventos sociales',
        resumen: 'Primeras comuniones, bautizos y reuniones empresariales.',
        portada: FOTO_PA(18),
        descripcion:
          'Primeras comuniones, bautizos, confirmaciones, reuniones familiares, capacitaciones, integraciones y ' +
          'celebraciones de fin de año: un salón cubierto amplio y zonas al aire libre que se adaptan a cada ocasión.',
        espacios: ['Salón cubierto amplio', 'Zona verde', 'Piscina', 'Barra y cocina de apoyo', 'Asador', 'Baños damas y caballeros'],
        fotos: [FOTO_PA(18), FOTO_PA(19), FOTO_PA(16), 'img/Pasoancho/1.jpeg', FOTO_PA(22), FOTO_PA(13)],
      },
      {
        id: 'fiestas',
        titulo: 'Cumpleaños y fiestas',
        resumen: 'Quinceañeros, grados, aniversarios y más.',
        portada: FOTO_PA(11),
        descripcion:
          'Cumpleaños, quinceañeros, grados, despedidas, aniversarios y reuniones familiares: música, piscina y un amplio ' +
          'salón para celebrar a lo grande.',
        espacios: ['Salón para baile', 'Piscina', 'Zona verde', 'Asador', 'Barra', 'Baños damas y caballeros'],
        fotos: [FOTO_PA(20), FOTO_PA(1), FOTO_PA(11), FOTO_PA(21), FOTO_PA(23), FOTO_PA(17)],
      },
    ],
  },

  // Mismos celulares de La Primavera, con la ubicación propia del salón.
  // Los campos vacíos ('') no se muestran.
  contacto: {
    titulo: 'Hablemos de <em>tu evento</em>',
    direccion: '', // ⚠️ escribe aquí la dirección cuando la tengas
    telefonos: PRIMAVERA.contacto.telefonos,
    correo: '',
    facebook: '',
    // Coordenadas exactas de https://maps.app.goo.gl/Vy8W2676kWRSbcoEA
    // "¿Cómo llegar?" abre la ruta en Google Maps hasta este punto
    lat: 3.610252,
    lng: -76.396245,
  },

  creditos: 'Designed by Julian Andres Lozano',
};
