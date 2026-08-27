import type { Metadata } from "next";
import Hero from "@/components/faqs/Hero";
import FaqAccordion from "@/components/faqs/FaqAccordion";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Calderas Santero",
  description:
    "Respuestas a las consultas técnicas más habituales sobre los equipos e instalaciones de Calderas Santero.",
};

export default function Faqs() {
  return (
    <>
      <Hero />
      <FaqAccordion />
      {/* CTA final oculto a pedido del cliente (27/08) — ver CtaBanner.tsx */}
    </>
  );
}
