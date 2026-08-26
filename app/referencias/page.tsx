import type { Metadata } from "next";
import Hero from "@/components/referencias/Hero";
import LogosGrid from "@/components/referencias/LogosGrid";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export const metadata: Metadata = {
  title: "Referencias | Calderas Santero",
  description:
    "Empresas y proyectos que confían en las soluciones térmicas de Calderas Santero.",
};

export default function Referencias() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <LogosGrid logosPorSegmento={logosPorSegmento} />
    </>
  );
}
