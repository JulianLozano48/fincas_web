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
