import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import HistoryTimeline from "@/components/HistoryTimeline";
import MissionVisionValues from "@/components/nosotros/MissionVisionValues";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Nosotros | Calderas Santero",
  description:
    "Más de 90 años de trayectoria, misión, visión y valores de Calderas Santero.",
};

export default function Nosotros() {
  return (
    <>
      <AboutHero />
      <HistoryTimeline />
      <MissionVisionValues />
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
