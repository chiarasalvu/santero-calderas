import type { Metadata } from "next";
import Hero from "@/components/servicios/Hero";
import ServicePillars from "@/components/servicios/ServicePillars";
import Compromiso from "@/components/servicios/Compromiso";

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
      <Compromiso />
    </>
  );
}
