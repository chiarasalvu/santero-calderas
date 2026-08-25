export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/sistema-santero", label: "Sistema Santero" },
  { href: "/servicios", label: "Servicios" },
  { href: "/casos-de-exito", label: "Casos de Éxito" },
  { href: "/#faqs", label: "FAQ's" },
];

export const legalLinks: NavLink[] = [
  { href: "/contacto", label: "Contacto" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos-y-condiciones", label: "Términos y Condiciones" },
];
