import type { Metadata } from "next";
import Hero from "@/components/referencias/Hero";
import LogosGrid from "@/components/referencias/LogosGrid";
import Testimonials from "@/components/referencias/Testimonials";
import Cobertura from "@/components/referencias/Cobertura";
import { getLogosPorSegmento } from "@/lib/segment-logos";
import { getGoogleRating } from "@/lib/google-rating";

export const metadata: Metadata = {
  title: "Referencias | Calderas Santero",
  description:
    "Empresas y proyectos que confían en las soluciones térmicas de Calderas Santero.",
};

export default async function Referencias() {
  const logosPorSegmento = getLogosPorSegmento();
  const { rating, reviewCount } = await getGoogleRating();

  return (
    <>
      <Hero />
      <LogosGrid logosPorSegmento={logosPorSegmento} />
      <Testimonials rating={rating} reviewCount={reviewCount} />
      <Cobertura />
    </>
  );
}
