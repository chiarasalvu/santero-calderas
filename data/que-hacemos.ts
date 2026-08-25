import { rubros } from "@/data/rubros";

export type QueHacemosLink = {
  label: string;
  href: string;
};

export const porRubro: QueHacemosLink[] = rubros.map((rubro) => ({
  label: rubro.label,
  href: "/servicios",
}));

export const porServicio: QueHacemosLink[] = [
  { label: "Agua Caliente Sanitaria", href: "/servicios" },
  { label: "Calefacción Central", href: "/servicios" },
  { label: "Climatización de Piscinas", href: "/servicios" },
  { label: "Procesos con Vapor", href: "/servicios" },
  { label: "Servicio Técnico Oficial", href: "/servicios" },
  { label: "Solar", href: "/servicios" },
  { label: "Instalación Llave en Mano", href: "/servicios" },
  { label: "Desguaces y Traslados", href: "/servicios" },
];

export const porProducto: QueHacemosLink[] = [
  { label: "Caldera de Agua", href: "/sistema-santero" },
  { label: "Caldera de Vapor", href: "/sistema-santero" },
  { label: "Generador Agua Caliente", href: "/sistema-santero" },
  { label: "Climatizador de Piscina", href: "/sistema-santero" },
  { label: "Termotanque", href: "/sistema-santero" },
  { label: "Termotanque Eléctrico", href: "/sistema-santero" },
  { label: "Tanque de Acumulación", href: "/sistema-santero" },
  { label: "Intercambiador de Calor", href: "/sistema-santero" },
  { label: "Generador Multiservicio", href: "/sistema-santero" },
  { label: "Complemento Solar", href: "/sistema-santero" },
];
