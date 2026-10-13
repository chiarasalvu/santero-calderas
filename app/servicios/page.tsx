import type { Metadata } from "next";
import SilaHero from "@/components/servicios/SilaHero";
import SilaIntro from "@/components/servicios/SilaIntro";
import SilaPilares from "@/components/servicios/SilaPilares";
import SilaContacto from "@/components/servicios/SilaContacto";

export const metadata: Metadata = {
  title: "Servicios | Calderas Santero",
  description:
    "SILA Termomecánica: servicio técnico, instalaciones, desguaces, obras llave en mano, logística y repuestos para los equipos Santero.",
};

// Página de Servicios = landing de SILA Termomecánica (pedido del cliente,
// 14/10): fondo azul propio, portada solo con video (logo que se arma +
// tomas de obra), logo y contacto por WhatsApp de SILA. "Ingeniería & proyectos" ya no figura acá y el bloque
// "Compromiso Santero" (components/servicios/Compromiso.tsx) sigue oculto.
export default function Servicios() {
  return (
    <>
      <SilaHero />
      <SilaIntro />
      <SilaPilares />
      <SilaContacto />
    </>
  );
}
