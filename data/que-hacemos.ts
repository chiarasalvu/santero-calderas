// Contenido de "Qué hacemos": 4 páginas por rubro (cada una con un video
// que habla de ese rubro) y 4 páginas por servicio (las mismas 4 cards del
// Home). Es la única fuente de datos — el menú del header, las cards del
// Home y las rutas (/rubros/[slug], /soluciones/[slug]) salen de acá.
//
// "Por producto" todavía no tiene páginas: se muestra en el menú como
// texto plano, sin link.

export type QueHacemosLink = {
  label: string;
  href?: string;
};

export type RubroPagina = {
  slug: string;
  /** Texto del menú. */
  label: string;
  /** H1 de la página. */
  titulo: string;
  /** Video del rubro. Todos comparten la misma portada (solo el logo). */
  video: { src: string } | null;
};

export type ServicioPagina = {
  slug: string;
  label: string;
  titulo: string;
  /** Imagen de portada — la misma de la card del Home. */
  imagen: string;
};

export const rubrosPaginas: RubroPagina[] = [
  {
    slug: "hoteleria-balnearios-campamentos",
    label: "Hotelería, Balnearios & Campamentos",
    titulo: "Hotelería, Balnearios y Campamentos",
    video: {
      src: "/video/rubros/hoteleria-balnearios-campamentos.mp4",
    },
  },
  {
    slug: "clubes-natatorios-spa",
    label: "Clubes, Natatorios & SPA",
    titulo: "Clubes, Natatorios y SPA",
    video: {
      src: "/video/rubros/clubes-natatorios-spa.mp4",
    },
  },
  {
    slug: "real-estate-consorcios",
    label: "Real Estate & Consorcios",
    titulo: "Real Estate y Consorcios",
    video: {
      src: "/video/rubros/real-estate-consorcios.mp4",
    },
  },
  {
    slug: "industrias-hospitales",
    label: "Industrias y Hospitales",
    titulo: "Industrias y Hospitales",
    video: { src: "/video/rubros/industrias-hospitales.mp4" },
  },
];

export const serviciosPaginas: ServicioPagina[] = [
  {
    slug: "agua-caliente-sanitaria",
    label: "Agua Caliente Sanitaria",
    titulo: "Agua caliente sanitaria",
    imagen: "/img/rubros-home/agua-caliente.jpg",
  },
  {
    slug: "calefaccion",
    label: "Calefacción",
    titulo: "Calefacción",
    imagen: "/img/rubros-home/calefaccion.jpg",
  },
  {
    slug: "climatizacion-de-piscinas",
    label: "Climatización de Piscinas",
    titulo: "Climatización de piscinas",
    imagen: "/img/rubros-home/climatizacion-v4.jpg",
  },
  {
    slug: "vapor",
    label: "Vapor",
    titulo: "Vapor",
    imagen: "/img/rubros-home/vapor-cliente.jpg",
  },
];

export const rubroHref = (slug: string) => `/rubros/${slug}`;
export const servicioHref = (slug: string) => `/soluciones/${slug}`;

export const porRubro: QueHacemosLink[] = rubrosPaginas.map((r) => ({
  label: r.label,
  href: rubroHref(r.slug),
}));

export const porServicio: QueHacemosLink[] = serviciosPaginas.map((s) => ({
  label: s.label,
  href: servicioHref(s.slug),
}));

export const porProducto: QueHacemosLink[] = [
  { label: "Calderas (Agua y Vapor)" },
  { label: "Generadores de Agua Caliente" },
  { label: "Climatizadores de Piscina" },
  { label: "Intercambiadores & Tanques de Acumulación" },
  { label: "Sistemas Eléctricos" },
];
