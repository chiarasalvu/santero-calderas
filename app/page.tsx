import Hero from "@/components/home/Hero";
import HistoryTimeline from "@/components/HistoryTimeline";
import SistemaSanteroTeaser from "@/components/home/SistemaSanteroTeaser";
import ServicesPreview from "@/components/home/ServicesPreview";
import CasesPreview from "@/components/home/CasesPreview";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/CtaBanner";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export default function Home() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <HistoryTimeline />
      <SistemaSanteroTeaser />
      <ServicesPreview />
      <CasesPreview logosPorSegmento={logosPorSegmento} />
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
