import Hero from "@/components/home/Hero";
import RubroFinder from "@/components/home/RubroFinder";
import SistemaSanteroTeaser from "@/components/home/SistemaSanteroTeaser";
import ProductLines from "@/components/home/ProductLines";
import ServicesPreview from "@/components/home/ServicesPreview";
import CasesPreview from "@/components/home/CasesPreview";
import HistoryTimeline from "@/components/HistoryTimeline";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/CtaBanner";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export default function Home() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <RubroFinder />
      <SistemaSanteroTeaser />
      <ProductLines />
      <ServicesPreview />
      <CasesPreview logosPorSegmento={logosPorSegmento} />
      <HistoryTimeline />
      <Faq />
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
        primaryLabel="Ver Soluciones Técnicas"
        primaryHref="/servicios"
        secondaryLabel="Agendar Consultoría"
        secondaryHref="/contacto"
      />
    </>
  );
}
