import Hero from "@/components/home/Hero";
import GoogleReviewsBadge from "@/components/home/GoogleReviewsBadge";
import ServiciosPrincipales from "@/components/home/ServiciosPrincipales";
import Diferencial from "@/components/home/Diferencial";
import SistemaSanteroTeaser from "@/components/home/SistemaSanteroTeaser";
import ProductLines from "@/components/home/ProductLines";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import CasesPreview from "@/components/home/CasesPreview";
import AboutTeaser from "@/components/home/AboutTeaser";
import CtaBanner from "@/components/CtaBanner";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export default function Home() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <GoogleReviewsBadge />
      <ServiciosPrincipales />
      <Diferencial />
      <SistemaSanteroTeaser />
      <ProductLines />
      <FeaturedProduct />
      <CasesPreview logosPorSegmento={logosPorSegmento} />
      <AboutTeaser />
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto?motivo=cotizar-proyecto"
        secondaryLabel="Agendar videollamada"
        secondaryHref="/contacto?motivo=visita-tecnica"
      />
    </>
  );
}
