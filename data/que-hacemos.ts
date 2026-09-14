export type QueHacemosLink = {
  label: string;
  href: string;
};

// Versión resumida para el mega-menú del header: se agrupan los ~30 ítems
// individuales (rubros, servicios, productos) en 4-5 por columna para que
// el desplegable sea liviano y dinámico. El detalle completo (cada rubro,
// servicio y producto por separado) sigue existiendo en sus propias
// páginas/datos — ver data/rubros.ts y /servicios — para que Google lo
// pueda indexar por metadatos aunque el menú visible esté resumido.

export const porRubro: QueHacemosLink[] = [
  { label: "Hotelería, Balnearios & Gastronomía", href: "/servicios" },
  { label: "Clubes, Natatorios & SPA / Wellness", href: "/servicios" },
  { label: "Real Estate & Consorcios", href: "/servicios" },
  { label: "Industrias, Hospitales & Camping", href: "/servicios" },
];

export const porServicio: QueHacemosLink[] = [
  { label: "Agua Caliente Sanitaria & Calefacción", href: "/servicios" },
  { label: "Climatización de Piscinas", href: "/servicios" },
  { label: "Procesos Industriales con Vapor", href: "/servicios" },
  { label: "Servicio Técnico & Instalación Llave en Mano", href: "/servicios" },
  { label: "Solar", href: "/servicios" },
];

export const porProducto: QueHacemosLink[] = [
  { label: "Calderas (Agua y Vapor)", href: "/sistema-santero" },
  { label: "Generadores & Termotanques", href: "/sistema-santero" },
  { label: "Climatizadores de Piscina", href: "/sistema-santero" },
  { label: "Intercambiadores & Tanques de Acumulación", href: "/sistema-santero" },
  { label: "Complemento Solar", href: "/sistema-santero" },
];
