import type { Metadata } from "next";
import SilaHero from "@/components/servicios/SilaHero";
import SilaServicios from "@/components/servicios/SilaServicios";
import SilaPilares from "@/components/servicios/SilaPilares";
import SilaContacto from "@/components/servicios/SilaContacto";

export const metadata: Metadata = {
  title: "Servicios | Calderas Santero",
  description:
    "SILA Termomecánica: servicio técnico, instalaciones, desguaces, obras llave en mano, logística y repuestos para los equipos Santero.",
};

// Página de Servicios = landing de SILA Termomecánica (pedido del cliente,
// 14/10): fondo azul propio, video de fondo, logo y contacto por WhatsApp
// de SILA. "Ingeniería & proyectos" ya no figura acá y el bloque
// "Compromiso Santero" (components/servicios/Compromiso.tsx) sigue oculto.
export default function Servicios() {
  return (
    <>
      <SilaHero />
      <SilaServicios />
      <SilaPilares />
      <SilaContacto />
    </>
  );
}
