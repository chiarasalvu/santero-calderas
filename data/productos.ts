// Líneas de producto de Santero, con su detalle. Es la fuente de datos del
// menú "Por producto" (header) y de la página /productos. Textos y fotos
// salen del documento del cliente (MKT – Modificaciones 04-10-26) y de la
// carpeta "Equipos" del Drive.

export type LineaItem = {
  titulo: string;
  descripcion: string;
};

export type LineaProducto = {
  id: string;
  /** Texto del menú. */
  label: string;
  nombre: string;
  /** Una o dos fotos (si son dos, se muestran lado a lado). */
  imagenes: { src: string; alt: string }[];
  badge?: string;
  badgeClassName?: string;
  subtitulo?: string;
  items: LineaItem[];
};

// Fotos de /img/equipos: las del Drive del cliente ("Equipos"), una por
// equipo, con su nombre real.
export const lineasProducto: LineaProducto[] = [
  {
    id: "atsol-etercal",
    label: "ATSOL / ETERCAL",
    nombre: "Línea ATSOL / ETERCAL",
    imagenes: [
      { src: "/img/equipos/atsol.jpg", alt: "Equipo ATSOL" },
      { src: "/img/equipos/etercal.jpg", alt: "Equipo ETERCAL" },
    ],
    badge: "Línea premium",
    badgeClassName: "bg-brand-red text-white",
    subtitulo: "La solución para grandes demandas de agua caliente sanitaria.",
    items: [
      {
        titulo: "Generación instantánea sin acumulación",
        descripcion:
          "Diseño compacto que ocupa menos de la mitad de espacio que los sistemas tradicionales, consumiendo energía de forma proporcional a la demanda real.",
      },
      {
        titulo: "Doble circuito (baño María)",
        descripcion:
          "Calentamiento indirecto a fuego lento mediante un circuito cerrado de calefacción con serpentina de acero inoxidable, reduciendo la formación de sarro y soportando altas presiones.",
      },
      {
        titulo: "Mantenimiento casi nulo",
        descripcion:
          "Elimina la necesidad de pilotos permanentes, ánodos de sacrificio, purgas programadas y repintados internos característicos del fuego directo.",
      },
      {
        titulo: "Versatilidad multiservicio",
        descripcion:
          "Capacidad única para alimentar múltiples prestaciones independientes en simultáneo (agua caliente sanitaria, climatización de piscinas y calefacción).",
      },
    ],
  },
  {
    id: "adn",
    label: "ADN",
    nombre: "Línea ADN",
    imagenes: [{ src: "/img/equipos/adn.jpg", alt: "Equipo ADN" }],
    badge: "Relación precio-calidad",
    badgeClassName: "bg-navy text-white",
    items: [
      {
        titulo: "Evolución y accesibilidad",
        descripcion:
          "Desarrollada para responder a proyectos de gran demanda y mayor consumo. Ej: termotanques 300/500 litros y climatizadores de piscina, ofreciendo máxima competitividad en precio sin sacrificar calidad ni servicio.",
      },
      {
        titulo: "Mismo principio tecnológico",
        descripcion:
          "Generación instantánea sin acumulación y doble circuito de calentamiento indirecto, logrando ahorros de gas superiores al 30%.",
      },
      {
        titulo: "Cero mantenimiento y alto confort",
        descripcion:
          "Elimina por completo los costos de recambio de ánodos y de pilotos permanentes. Tampoco se da la gran problemática de vibraciones constantes por el sarro.",
      },
      {
        titulo: "Aceptación masiva",
        descripcion:
          "La alternativa elegida por constructoras, hoteles, clubes y consorcios para cambiar verdaderamente de sistema y no solo de marca, que llevan al mismo resultado.",
      },
    ],
  },
  {
    id: "ats",
    label: "ATS",
    nombre: "Línea ATS",
    imagenes: [{ src: "/img/equipos/ats.jpg", alt: "Equipo ATS" }],
    items: [
      {
        titulo: "Concepto principal",
        descripcion:
          "Calderas de agua caliente en circuito cerrado para diversas prestaciones.",
      },
      {
        titulo: "Aplicación versátil",
        descripcion:
          "Ideales para calefacción, procesos industriales, tanques intermediarios e intercambiadores de calor.",
      },
      {
        titulo: "Intercambiador acuotubular",
        descripcion:
          "Adaptación del sistema líder de gran escala, optimizado de forma única a pequeña escala para un máximo aprovechamiento térmico.",
      },
      {
        titulo: "Máxima eficiencia y seguridad",
        descripcion:
          "Bajo consumo, pronta puesta en régimen y seguridad integral en niveles, presión y temperatura para resultados certificados.",
      },
    ],
  },
  {
    id: "vts",
    label: "VTS",
    nombre: "Línea VTS",
    imagenes: [{ src: "/img/equipos/vts.jpg", alt: "Equipo VTS" }],
    items: [
      {
        titulo: "Vaporizadores de vanguardia",
        descripcion:
          "Calderas verticales acuotubulares de pequeña escala que trasladan la alta eficiencia de las grandes centrales térmicas a innumerables procesos industriales.",
      },
      {
        titulo: "Diseño estructural superior",
        descripcion:
          "Cámara de combustión sumergida con tubos de agua helicoidales e inclinados que garantizan una rápida circulación y máxima retención calórica.",
      },
      {
        titulo: "Puesta en régimen rápida",
        descripcion:
          "El concepto de la caldera Santero se basa en poco volumen y mucha superficie de transferencia, lo que implica llegar a régimen en la mitad de tiempo que los sistemas tradicionales.",
      },
      {
        titulo: "Seguridad inexplosiva",
        descripcion:
          "Intercambiador, tubos, cielo y chimenea permanentemente inundados de agua, eliminando por completo el riesgo de explosión o deformación de hogares de las clásicas horizontales humotubulares.",
      },
    ],
  },
  {
    id: "intercambiadores-tanques",
    label: "Intercambiadores y Tanques de Acumulación",
    nombre: "Intercambiadores y tanques de acumulación",
    imagenes: [
      {
        src: "/img/equipos/intercambiador.jpg",
        alt: "Intercambiador de calor IC-SANT",
      },
    ],
    items: [
      {
        titulo: "Tanques intermediarios",
        descripcion:
          "Solución tradicional robusta para sistemas centrales (calefacción y agua sanitaria) provistos con serpentinas de acero inoxidable y fabricación a medida (hierro negro o acero inoxidable).",
      },
      {
        titulo: "Intercambiadores de calor",
        descripcion:
          "A diferencia de los intercambiadores de placa convencionales o de casco y tubo (que sufren en zonas de aguas duras por su paso milimétrico y costo de juntas), Santero prioriza caños de acero inoxidable de gran volumen interior y circuito cerrado exterior, logrando menos mantenimiento, mayor durabilidad y rendimiento.",
      },
      {
        titulo: "Versatilidad y fabricación a medida",
        descripcion:
          "Equipos no seriados diseñados según las calorías y dimensiones exactas de cada proyecto, con capacidad de incorporar múltiples serpentinas interiores para combinar energía solar, calefacción, sanitaria y piscinas.",
      },
    ],
  },
  {
    id: "electro",
    label: "Electro",
    nombre: "Línea Electro",
    imagenes: [{ src: "/img/equipos/electro.jpg", alt: "Equipo Electro" }],
    items: [
      {
        titulo: "Versatilidad",
        descripcion:
          "Equipos monofásicos y trifásicos hechos a medida (termotanques, calderas de calefacción, climatizadores de piscina y de vapor).",
      },
      {
        titulo: "Calidad constructiva y rendimiento",
        descripcion:
          "Máximo aprovechamiento eléctrico con control digital electrónico que inicia la recuperación al mínimo consumo. Fondos y espesores reforzados para mayor durabilidad.",
      },
      {
        titulo: "Seguridad integral",
        descripcion:
          "Tableros de electricistas matriculados, termostatos de seguridad y controles de nivel por falta de agua para proteger las resistencias contra sobrecalentamientos.",
      },
      {
        titulo: "Aislamiento térmico",
        descripcion:
          "Uso de lana de vidrio mineral para altas temperaturas que previene pérdidas por acumulación, garantizando máxima durabilidad y eficiencia en el segmento.",
      },
    ],
  },
];

export const productoHref = (id: string) => `/productos#${id}`;

/** Cada nombre de equipo, a qué línea pertenece (para linkear desde las páginas de servicio). */
export const lineaPorEquipo: Record<string, string> = {
  ATSOL: "atsol-etercal",
  ETERCAL: "atsol-etercal",
  ADN: "adn",
  ATS: "ats",
  VTS: "vts",
  TS: "intercambiadores-tanques",
  TSE: "electro",
};

/**
 * Foto de cada equipo (carpeta "Equipos" del cliente). TS no tiene foto
 * todavía: la de "IC SANT" es el intercambiador de calor, no el tanque TS.
 */
export const fotoPorEquipo: Partial<Record<string, string>> = {
  ATSOL: "/img/equipos/atsol.jpg",
  ETERCAL: "/img/equipos/etercal.jpg",
  ADN: "/img/equipos/adn.jpg",
  ATS: "/img/equipos/ats.jpg",
  VTS: "/img/equipos/vts.jpg",
  TSE: "/img/equipos/electro.jpg",
};
