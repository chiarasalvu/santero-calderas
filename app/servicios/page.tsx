import type { Metadata } from "next";
import Hero from "@/components/servicios/Hero";
import ServicePillars from "@/components/servicios/ServicePillars";
import SilaSeccion from "@/components/servicios/SilaSeccion";

export const metadata: Metadata = {
  title: "Servicios | Calderas Santero",
  description:
    "Ingeniería & Proyectos, Instalación & Puesta en Marcha, y Soporte & Postventa: los 3 pilares de servicio de Calderas Santero.",
};

export default function Servicios() {
  return (
    <>
      <Hero />
      <ServicePillars />
      <SilaSeccion />
      {/* "Compromiso Santero" (visita técnica) oculto a pedido del cliente
          (13/10) — ver components/servicios/Compromiso.tsx para volver a
          mostrarlo. */}
    </>
  );
}
