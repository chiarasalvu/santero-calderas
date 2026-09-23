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
  { label: "Hotelería, Balnearios & Campamentos", href: "/servicios" },
  { label: "Clubes, Natatorios & SPA", href: "/servicios" },
  { label: "Real Estate & Consorcios", href: "/servicios" },
  { label: "Industrias y Hospitales", href: "/servicios" },
];

// Por servicio: separado tal cual las 4 cards de "Qué hacemos" en el
// Home (Agua caliente / Climatización de piscina / Calefacción / Vapor)
// — a pedido del cliente, no van agrupados.
export const porServicio: QueHacemosLink[] = [
  { label: "Agua Caliente Sanitaria", href: "/servicios" },
  { label: "Calefacción", href: "/servicios" },
  { label: "Climatización de Piscinas", href: "/servicios" },
  { label: "Vapor", href: "/servicios" },
];

export const porProducto: QueHacemosLink[] = [
  { label: "Calderas (Agua y Vapor)", href: "/sistema-santero" },
  { label: "Generadores de Agua Caliente", href: "/sistema-santero" },
  { label: "Climatizadores de Piscina", href: "/sistema-santero" },
  { label: "Intercambiadores & Tanques de Acumulación", href: "/sistema-santero" },
  { label: "Sistemas Eléctricos", href: "/sistema-santero" },
];
