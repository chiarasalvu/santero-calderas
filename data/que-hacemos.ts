// Contenido de "Qué hacemos": 5 páginas por rubro (cada una con un video
// que habla de ese rubro y su descripción) y 4 páginas por servicio (las
// mismas 4 cards del Home, con su texto). Es la única fuente de datos — el
// menú del header, las cards del Home y las rutas (/rubros/[slug],
// /soluciones/[slug]) salen de acá.
//
// "Por producto" sale de data/productos.ts y linkea a /productos.

import { lineasProducto, productoHref } from "@/data/productos";

export type QueHacemosLink = {
  label: string;
  href?: string;
};

/** Bloque de texto: un párrafo (string) o una lista con viñetas (string[]). */
export type BloqueTexto = string | string[];

export type RubroPagina = {
  slug: string;
  /** Texto del menú. */
  label: string;
  /** H1 de la página. */
  titulo: string;
  /** Frase destacada bajo el título. */
  subtitulo: string;
  /** Descripción del rubro, debajo del video. */
  contenido: BloqueTexto[];
  /** Video del rubro y su portada (la misma para todos: solo el logo). */
  video: { src: string; poster: string } | null;
};

export type ServicioPagina = {
  slug: string;
  label: string;
  titulo: string;
  /** Frase destacada bajo el título (el servicio de Vapor no tiene). */
  subtitulo?: string;
  parrafos: string[];
  aplicaciones: string[];
  productos: string[];
  /** Imagen de portada — la misma de la card del Home. */
  imagen: string;
  /** object-position de la foto (para encuadrar lo importante). */
  imagenPosicion?: string;
};

// Portada común a los rubros: solo el logo de Santero.
const PORTADA_LOGO = "/img/rubros/portada-logo.jpg";

const CIERRE_PROYECTO =
  "Acompañamos cada proyecto desde el diseño y la ingeniería, hasta su implementación, puesta en marcha y post venta.";

export const rubrosPaginas: RubroPagina[] = [
  {
    slug: "hoteleria-balnearios-campamentos",
    label: "Hotelería, Balnearios & Campamentos",
    titulo: "Hotelería, Balnearios y Campamentos",
    subtitulo: "Sistema Santero. Todo el confort, una sola solución.",
    contenido: [
      "En establecimientos de alta demanda, donde el confort y la continuidad de los servicios son fundamentales y esenciales, Santero ofrece soluciones integrales en:",
      ["Agua caliente sanitaria", "Calefacción central", "Climatización de piscinas"],
      "El Sistema Santero ofrece generación instantánea y sin acumulación. Reduciendo el consumo energético, la formación de sarro y los costos de mantenimiento.",
      "Una solución pensada para proteger su inversión, reducir sus gastos operativos y contribuir al cuidado del medio ambiente.",
      CIERRE_PROYECTO,
    ],
    video: {
      src: "/video/rubros/hoteleria-balnearios-campamentos.mp4",
      poster: PORTADA_LOGO,
    },
  },
  {
    slug: "clubes-natatorios-spa",
    label: "Clubes, Natatorios & SPA",
    titulo: "Clubes, Natatorios y SPA",
    subtitulo: "Sistema Santero. Abundante agua caliente cuando se necesita.",
    contenido: [
      "En establecimientos deportivos son bien marcados los picos de consumo y las mesetas donde casi no hay demanda. Mantener grandes volúmenes de agua caliente acumulada durante todo el día, esperando el momento pico, implica un gran consumo innecesario.",
      "El Sistema Santero es generación instantánea e ininterrumpida sin acumulación. Producimos agua caliente en el momento en que se necesita. De esta manera, optimizamos el consumo, reducimos la formación de sarro y disminuimos los costos de mantenimiento.",
      "Somos la solución que conoce las variables del sector y diseñamos en consecuencia, reduciendo sus gastos operativos con la confiabilidad de un producto de alta calidad industrial para sus complejos, tanto clubes como natatorios.",
      CIERRE_PROYECTO,
    ],
    video: {
      src: "/video/rubros/clubes-natatorios-spa.mp4",
      poster: PORTADA_LOGO,
    },
  },
  {
    slug: "real-estate",
    label: "Real Estate",
    titulo: "Real Estate",
    subtitulo: "Sistema Santero. Soluciones compactas para sistemas centrales.",
    contenido: [
      "Entendemos que en sus desarrollos, destinar m² a salas de máquinas no es de su mayor agrado. Por eso, el Sistema Santero está diseñado para resolver integralmente todas las necesidades de agua caliente y climatización de forma compacta. Generación instantánea sin acumulación, evitando las grandes dimensiones de los reservorios de termotanques y tanques intermediarios, los grandes tendidos de cañerías y excesos de chimeneas, etc.",
      "Aseguramos el menor espacio en sus salas técnicas, sumado al gran diferencial de poder abastecer distintos servicios o columnas de presión desde un mismo equipo. No existe otro sistema en el mercado que les resuelva lo que soluciona el Sistema Santero, bajando costos de inversión, mantenimiento y consumo.",
      "Santero acompaña a desarrolladoras, constructoras y asesores termomecánicos desde el diseño personalizado y la ingeniería hasta la implementación, puesta en marcha y post venta.",
    ],
    // Mismo video que Consorcios por ahora; se edita aparte más adelante.
    video: {
      src: "/video/rubros/real-estate-consorcios.mp4",
      poster: PORTADA_LOGO,
    },
  },
  {
    slug: "consorcios",
    label: "Consorcios",
    titulo: "Consorcios",
    subtitulo: "Sistema Santero. Modernizamos su sistema, cuidamos su bolsillo.",
    contenido: [
      "Con el paso del tiempo, los equipos de un edificio pueden quedar obsoletos, generar altos costos de mantenimiento o dejar de brindar servicios esenciales al consorcio.",
      "El Sistema Santero permite renovar y modernizar las instalaciones térmicas, con impresionantes resultados y un pronto recupero de la inversión.",
      "Somos la alternativa más eficiente para sistemas centrales y los copropietarios son los principales beneficiarios de haber elegido el Sistema Santero.",
      "Generamos agua caliente instantánea sin acumulación, calefacción y climatización de piscinas, reduciendo el consumo y los altos costos de mantenimiento de los sistemas tradicionales.",
      "Analizamos cada instalación y desarrollamos una solución integral personalizada con formato llave en mano, acompañando y asesorando al consorcio desde el diagnóstico y la ingeniería, hasta la instalación y puesta en marcha, brindando una solución eficiente, confiable y duradera.",
    ],
    video: {
      src: "/video/rubros/real-estate-consorcios.mp4",
      poster: PORTADA_LOGO,
    },
  },
  {
    slug: "industrias-instituciones",
    label: "Industrias e Instituciones",
    titulo: "Industrias e Instituciones",
    subtitulo: "Sistema Santero. Confiabilidad en servicios que no pueden detenerse.",
    contenido: [
      "En entornos donde la continuidad de los servicios es fundamental, Santero desarrolla soluciones térmicas de alta eficiencia y calidad. Comprendemos las exigencias de cada sector y de cada proceso y la confiabilidad que buscan en nuestros productos.",
      "Nuestra amplia gama de equipamiento contempla calderas de agua caliente, calderas de vapor de baja y alta presión, equipos para agua caliente sanitaria para vestuarios, entre otros servicios.",
      "Diseñamos soluciones personalizadas, comprometidos con el ahorro de energía y la reducción de huella de carbono. Toda nuestra gama es acuotubular, el sistema más eficiente y seguro del mercado de las calderas.",
      "Acompañamos cada proyecto desde la ingeniería, asesoramiento y dimensionamiento hasta la instalación, puesta en marcha y post venta seguro y nacional.",
    ],
    video: {
      src: "/video/rubros/industrias-hospitales.mp4",
      poster: PORTADA_LOGO,
    },
  },
];

export const serviciosPaginas: ServicioPagina[] = [
  {
    slug: "agua-caliente-sanitaria",
    label: "Agua Caliente Sanitaria",
    titulo: "Agua caliente sanitaria",
    subtitulo: "Agua caliente ininterrumpida, sin necesidad de “alta recuperación”.",
    parrafos: [
      "El Sistema Santero genera agua caliente sanitaria de manera instantánea y vino a romper con el concepto de los sistemas tradicionales que acumulan grandes volúmenes de agua caliente durante todo el día, algo que solo genera altos costos de mantenimiento y consumo.",
      "Se trata de un sistema que reduce la formación de sarro y no requiere el cambio de ánodos ni repintados internos. De este modo, logra una gran producción de agua caliente ininterrumpida con el menor consumo del mercado y una durabilidad superior. No es fácil romper paradigmas y lo sabemos, pero estamos seguros de que es una opción que merece estar en todas las mesas de análisis antes de tomar una decisión sobre qué sistema instalar.",
      "Santero es sinónimo de mayor eficiencia, menor espacio ocupado, menores costos operativos y máxima durabilidad.",
    ],
    aplicaciones: [
      "Edificios y consorcios",
      "Hoteles",
      "Clubes",
      "Natatorios",
      "Hospitales",
      "Sanatorios",
      "Industrias e instituciones",
    ],
    productos: ["ATSOL", "ADN", "ETERCAL", "IC-SANT", "TSE"],
    // Foto de banco (Unsplash): ducha con agua caliente y vapor.
    imagen: "/img/rubros-home/agua-caliente-ducha.jpg",
    imagenPosicion: "center 8%",
  },
  {
    slug: "calefaccion",
    label: "Calefacción",
    titulo: "Calefacción central",
    subtitulo: "Calidez eficiente para cada espacio.",
    parrafos: [
      "Santero desarrolla soluciones de calefacción central para edificios, hoteles e instituciones, adaptadas a las características y necesidades térmicas de cada proyecto.",
      "Elegimos diferenciarnos desde la ingeniería, el diseño y la seguridad. Entendemos el sistema acuotubular como el más eficiente y seguro, y llevamos adelante el desafío de trasladarlo a pequeña escala con excelentes resultados.",
      "Mediante calderas de agua caliente o vapor, buscamos optimizar el aprovechamiento de la energía, lograr una respuesta térmica adecuada y simplificar el mantenimiento de la instalación.",
      "Confort, eficiencia y confiabilidad.",
    ],
    aplicaciones: [
      "Edificios residenciales",
      "Hoteles",
      "Hospitales",
      "Colegios",
      "Universidades",
      "Oficinas",
      "Edificios públicos",
      "Industrias",
    ],
    productos: ["ATS", "VTS", "ATSOL", "ETERCAL"],
    // Foto de banco (Unsplash): radiador en un ambiente, con ventana.
    imagen: "/img/rubros-home/calefaccion-detalle.jpg",
    imagenPosicion: "center 50%",
  },
  {
    slug: "climatizacion-de-piscinas",
    label: "Climatización de Piscinas",
    titulo: "Climatización de piscinas",
    subtitulo: "La temperatura ideal, con un sistema eficiente.",
    parrafos: [
      "El Sistema Santero permite climatizar piscinas con un gran rendimiento y un mantenimiento casi nulo. Su principio de calentamiento indirecto —mediante baño María y serpentina de acero inoxidable— lo posiciona como la solución definitiva para los complejos que buscan la excelencia en el servicio, sin la necesidad de cambiar constantemente intercambiadores, serpentinas o equipos enteros debido al sarro, como suele ocurrir con los equipos económicos de fuego directo.",
      "Su diseño permite integrar la climatización de piscinas con otros servicios térmicos, como el agua caliente para vestuarios y la calefacción: una solución beneficiosa por donde se mire en términos de inversión, espacio, consumo y confiabilidad.",
      "Una propuesta pensada para clubes, natatorios, hoteles, gimnasios y complejos deportivos que buscan optimizar el consumo energético y reducir las necesidades de mantenimiento.",
    ],
    aplicaciones: [
      "Piscinas cubiertas y descubiertas",
      "Clubes deportivos",
      "Natatorios",
      "Hoteles",
      "Gimnasios",
      "Spas y balnearios",
    ],
    productos: ["ATSOL", "ADN", "ETERCAL"],
    imagen: "/img/rubros-home/climatizacion-v4.jpg",
  },
  {
    slug: "vapor",
    label: "Vapor",
    titulo: "Vapor en industrias",
    parrafos: [
      "Con una trayectoria vinculada a la fabricación de calderas de vapor desde sus orígenes, Santero desarrolla soluciones para abastecer las necesidades térmicas de distintos procesos industriales e institucionales.",
      "Nuestras calderas de vapor se aplican en procesos productivos que requieren un suministro térmico acorde con las condiciones de presión, capacidad y operación de cada instalación.",
      "Santero diseñó el sistema acuotubular vertical en pequeña escala, ubicándose en las antípodas de los sistemas tradicionales horizontales humotubulares. Una decisión difícil desde lo comercial, pero completamente acertada desde lo técnico. Entendemos y estamos comprometidos con la reducción de la huella de carbono, la optimización del consumo, el bajo mantenimiento y la máxima seguridad. Desde la industria alimenticia y textil hasta aplicaciones químicas, hospitalarias y de esterilización, cada proyecto requiere una solución diseñada según sus exigencias específicas. Santero es la confiabilidad térmica responsable para acompañar la continuidad de sus procesos.",
    ],
    aplicaciones: [
      "Industrias alimenticias",
      "Industrias textiles",
      "Industrias químicas",
      "Laboratorios",
      "Industrias cosméticas",
      "Hospitales",
      "Sanatorios",
      "Lavanderías industriales",
      "Procesos de esterilización",
    ],
    productos: ["VTS"],
    imagen: "/img/rubros-home/vapor-cliente.jpg",
    // Sube el encuadre para que se vea la válvula por donde sale el vapor.
    imagenPosicion: "center 88%",
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

export const porProducto: QueHacemosLink[] = lineasProducto.map((l) => ({
  label: l.label,
  href: productoHref(l.id),
}));
