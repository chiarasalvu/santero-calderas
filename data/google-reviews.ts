export type GoogleReview = {
  id: string;
  autor: string;
  contexto: string;
  texto: string;
  fecha: string;
};

// 7 reseñas reales de Google (4.8/5, 70 opiniones) — Calderas Santero.
// https://www.google.com/maps/place/Calderas+Santero/@-34.6530001,-58.406007,17z
// Todas 5 estrellas. Texto tomado tal cual del listado público de Google
// (algunas recortadas en un punto natural donde Google las trunca en la
// vista previa, sin alterar el sentido).
export const googleReviews: GoogleReview[] = [
  {
    id: "vanesa-cordoba",
    autor: "Vanesa Cordoba",
    contexto: "Local Guide · 15 opiniones",
    fecha: "Hace 3 meses",
    texto:
      "Excelente experiencia con Santero Calderas. Realizaron la instalación de sus equipos en el Edificio Libertad, reemplazando un sistema obsoleto por calderas modernas de alta eficiencia.",
  },
  {
    id: "marcelo-alonso",
    autor: "Marcelo Alonso",
    contexto: "3 opiniones",
    fecha: "Hace 3 meses",
    texto:
      "Excelente funcionamiento y servicio post venta. Recomendable 100 x100. Se colocaron en un pabellón de una clínica, dando solución a un problema de sarro que acarreabamos hace tiempo.",
  },
  {
    id: "nadoazul",
    autor: "NadoAzul Argentina",
    contexto: "1 opinión",
    fecha: "Hace 2 meses",
    texto:
      "El mejor sistema de climatización de piscinas argentino, 26 años climatizando nuestro natatorio, posee un sistema innovador en todas sus gamas de generación de agua caliente, prácticamente sin juntar sarro.",
  },
  {
    id: "hernan-sobrero",
    autor: "Hernan Sobrero",
    contexto: "2 opiniones",
    fecha: "Hace un mes",
    texto:
      "Compramos un equipo para nuestro natatorio semi olímpico. Las prestaciones de la caldera son muy buenas y es superior el rendimiento al que teníamos con equipos de otros proveedores. La atención comercial y la instalación todo perfecto!",
  },
  {
    id: "camilo-aguado",
    autor: "Camilo Aguado",
    contexto: "Arquitecto · 8 opiniones",
    fecha: "Hace 4 meses",
    texto:
      "Soy arquitecto y me dedico a la construcción hace más de 9 años. Sinceramente, no podría estar más conforme con el producto y la empresa.",
  },
  {
    id: "yerman-cash",
    autor: "Yerman Cash",
    contexto: "3 opiniones",
    fecha: "Hace 3 semanas",
    texto:
      "Excelente atención! Realizamos cambio de caldera de nuestra piscina semi olímpica y fueron muy claros en todas las explicaciones, muy puntuales con los tiempos de entrega, y muy profesionales en el desguace de la vieja caldera e instalación de la nueva.",
  },
  {
    id: "leandro-gaston",
    autor: "Leandro Gaston",
    contexto: "9 opiniones",
    fecha: "Hace 3 meses",
    texto:
      "Somos de Mendoza, siempre compramos calderas Santero, y lo seguiremos haciendo. Están siempre a disposición a cualquier consulta técnica, aun cuando ya han pasado muchos años de que compramos. Excelente atención personalizada.",
  },
];
