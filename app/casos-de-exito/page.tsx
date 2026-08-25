import type { Metadata } from "next";
import Hero from "@/components/casos-de-exito/Hero";
import CasesExplorer from "@/components/casos-de-exito/CasesExplorer";
import CtaBanner from "@/components/CtaBanner";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export const metadata: Metadata = {
  title: "Casos de Éxito | Calderas Santero",
  description:
    "Proyectos de Calderas Santero en clubes, hoteles, desarrolladoras e industrias.",
};

export default function CasosDeExito() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <CasesExplorer logosPorSegmento={logosPorSegmento} />
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
