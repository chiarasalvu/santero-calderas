import type { Metadata } from "next";
import Hero from "@/components/servicios/Hero";
import ServicesList from "@/components/servicios/ServicesList";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Servicios | Calderas Santero",
  description:
    "Consultoría, ingeniería, fabricación, instalación y mantenimiento: los 8 servicios de Calderas Santero para cada etapa del proyecto.",
};

export default function Servicios() {
  return (
    <>
      <Hero />
      <ServicesList />
      <CtaBanner
        titulo="Optimice su rendimiento térmico"
        descripcion="Nuestros especialistas están listos para realizar un diagnóstico técnico de sus necesidades y proponer la solución más eficiente."
        primaryLabel="Solicitar asesoramiento técnico"
        primaryHref="/contacto"
        secondaryLabel="Ver catálogo completo"
        secondaryHref="/sistema-santero"
      />
    </>
  );
}
