import type { Metadata } from "next";
import Hero from "@/components/casos-de-exito/Hero";
import FeaturedCase from "@/components/casos-de-exito/FeaturedCase";
import BeforeAfter from "@/components/casos-de-exito/BeforeAfter";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Casos de Éxito | Calderas Santero",
  description:
    "Proyectos de Calderas Santero en clubes, hoteles, desarrolladoras e industrias.",
};

export default function CasosDeExito() {
  return (
    <>
      <Hero />
      <FeaturedCase />
      <BeforeAfter />
      <CtaBanner
        titulo="Optimice su rendimiento térmico"
        descripcion="Nuestros especialistas están listos para realizar un diagnóstico técnico de sus necesidades y proponer la solución más eficiente."
        primaryLabel="Solicitar asesoramiento técnico"
        primaryHref="/contacto?motivo=visita-tecnica"
        secondaryLabel="Ver catálogo completo"
        secondaryHref="/sistema-santero"
      />
    </>
  );
}
