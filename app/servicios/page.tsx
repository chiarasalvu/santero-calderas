import type { Metadata } from "next";
import Hero from "@/components/servicios/Hero";
import ServicePillars from "@/components/servicios/ServicePillars";
import CtaBanner from "@/components/CtaBanner";

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
      <CtaBanner
        titulo="Optimice su rendimiento térmico"
        descripcion="Nuestros especialistas están listos para realizar un diagnóstico técnico de sus necesidades y proponer la solución más eficiente."
        primaryLabel="Solicitar asesoramiento técnico"
        primaryHref="/contacto"
        secondaryLabel="Ver catálogo completo"
        secondaryHref="/sistema-santero"
        tone="dark"
      />
    </>
  );
}
