import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import HistoryTimeline from "@/components/HistoryTimeline";
import MissionVisionValues from "@/components/nosotros/MissionVisionValues";

export const metadata: Metadata = {
  title: "Nosotros | Calderas Santero",
  description:
    "Más de 90 años de trayectoria, misión, visión y valores de Calderas Santero.",
};

export default function Nosotros() {
  return (
    <>
      <AboutHero />
      <HistoryTimeline tone="dark" />
      <MissionVisionValues />
      {/* CTA final oculto a pedido del cliente (27/08) — ver CtaBanner.tsx */}
    </>
  );
}
