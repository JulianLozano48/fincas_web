/* =========================================================
   DATOS DEL SITIO Y DE LAS FINCAS
   👉 Este es el único archivo que necesitas editar para
      cambiar textos, precios, fotos y fondos.
   ========================================================= */

const SITIO = {
  nombre: 'Dos Refugios',
  whatsapp: '573001234567', // código país + número, sin "+"
  telefono: '+57 300 123 4567',
  correo: 'hola@dosrefugios.co',
};

const FINCAS = [
  {
    id: 'primavera',
    nombre: 'La primavera',
    etiqueta: 'Rozo. Valle del cauca',
    lema: 'Lugar para descanso y disfrute en familia.',
    fondo: 'img/f1.jpg',
    posicion: '62% center',
    oscurecer: 0.2,
    color: '#8c967e',
    ubicacion: 'Vereda La Cumbre · a 1 h de la ciudad',
    descripcion:
      'Una antigua casa campesina restaurada con maderas recuperadas y grandes ventanales hacia las montañas. ' +
      'Perfecta para descansar en familia o en pareja: mañanas de café, caminatas por el bosque y noches frente a la chimenea.',
    datos: [
      { valor: '14', etiqueta: 'Huéspedes' },
      { valor: '5', etiqueta: 'Habitaciones' },
      { valor: '4', etiqueta: 'Baños' },
      { valor: '16°', etiqueta: 'Clima' },
    ],
    comodidades: ['Chimenea de leña', 'Jacuzzi exterior', 'Cocina equipada', 'Zona BBQ', 'Senderos privados', 'Wi-Fi', 'Parqueadero', 'Se admiten mascotas'],
    galeria: [
      'img/f1.jpg',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80',
    ],
    precios: [
      { temporada: 'Entre semana', valor: '$850.000', nota: 'por noche' },
      { temporada: 'Fin de semana', valor: '$1.100.000', nota: 'por noche · mín. 2 noches' },
      { temporada: 'Festivos y temporada', valor: '$1.300.000', nota: 'por noche · mín. 3 noches' },
    ],
    pagina: 'fincas/el-mirador.html', // página completa (opcional, '' para ocultar el botón)
    plantilla: 'primavera', // usa la vista especial definida en PRIMAVERA (más abajo)
  },
  {
    id: 'guaduales',
    nombre: 'Los Guaduales',
    etiqueta: 'Tierra caliente · 29°C',
    lema: 'Casa campestre con piscina, kiosko y río entre guaduales.',

    fondo: 'img/f2.jpg',
    posicion: '45% center',
    oscurecer: 0.2,
    color: '#b85c38',

    ubicacion: 'Km 12 vía al río · a 2 h de la ciudad',
    descripcion:
      'Corredores amplios, hamacas en cada rincón y tres hectáreas de jardines y árboles frutales junto al río. ' +
      'Ideal para paseos familiares, cumpleaños y grupos grandes que quieren sol, piscina y asados.',
    datos: [
      { valor: '20', etiqueta: 'Huéspedes' },
      { valor: '7', etiqueta: 'Habitaciones' },
      { valor: '6', etiqueta: 'Baños' },
      { valor: '29°', etiqueta: 'Clima' },
    ],
    comodidades: ['Piscina con zona niños', 'Jacuzzi', 'Kiosko con BBQ', 'Cancha múltiple', 'Aire acondicionado', 'Acceso al río', 'Wi-Fi', 'Parqueadero'],
    galeria: [
      'img/f2.jpg',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80',
    ],
    precios: [
      { temporada: 'Entre semana', valor: '$1.200.000', nota: 'por noche' },
      { temporada: 'Fin de semana', valor: '$1.500.000', nota: 'por noche · mín. 2 noches' },
      { temporada: 'Festivos y temporada', valor: '$1.800.000', nota: 'por noche · mín. 3 noches' },
    ],
    pagina: 'fincas/los-guaduales.html',
  },
];

/* =========================================================
   LA PRIMAVERA · Contenido de su vista especial
   (se abre al hacer clic en la primera card)
   👉 Las rutas de fotos son relativas a "base". Si copias las
      fotos a este proyecto, cambia "base" por '' y usa 'img/...'.
   ========================================================= */
const PRIMAVERA = {
  base: 'https://laprimavera-finca.github.io/WebSite-LaPrimavera/',
  whatsapp: '573206596970',
  mensajeWhatsapp: 'Hola, buen día. Vengo desde su página web y me gustaría recibir más información. ¡Gracias!',

  hero: {
    eyebrow: 'Finca campestre · Rozo, Valle del Cauca',
    lema: 'Naturaleza, piscina y tranquilidad para descansar y compartir en familia.',
    fotos: [
      'img/carrus/carrus-ppal1.jpg',
      'img/carrus/carrus-ppal2.jpg',
      'img/carrus/carrus-ppal3.jpg',
      'img/carrus/carrus-ppal4.jpg',
    ],
  },

  intro: {
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
    fila1: ['img/spaces/space1.jpg', 'img/spaces/space2.jpeg', 'img/spaces/space3.jpg', 'img/spaces/space4.jpg', 'img/spaces/space5.jpg'],
    fila2: ['img/spaces/space6.jpg', 'img/spaces/space7.jpeg', 'img/spaces/space8.jpg', 'img/spaces/space9.jpg', 'img/spaces/space10.jpg'],
  },

  experiencias: {
    fotos: ['img/carrus-prim2.jpg', 'img/carrus-prim3.jpg', 'img/carrus-prim5.jpg'],
    texto: [
      'En Finca Campestre La Primavera cada detalle ha sido pensado para ofrecer mucho más que un lugar para alquilar: ' +
        'un espacio donde la tranquilidad, la naturaleza y el bienestar se unen para brindarte una experiencia inolvidable.',
      'Es ese refugio natural donde los días se disfrutan sin prisas y las noches se viven bajo un cielo sereno. Ya sea ' +
        'para descansar, celebrar, compartir en familia o simplemente cambiar de ambiente, la finca se adapta a cada ocasión.',
    ],
  },

  servicios: [
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

  contacto: {
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
