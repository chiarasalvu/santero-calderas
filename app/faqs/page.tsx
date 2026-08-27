import type { Metadata } from "next";
import Hero from "@/components/faqs/Hero";
import FaqAccordion from "@/components/faqs/FaqAccordion";
import CtaBanner from "@/components/CtaBanner";

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
      <CtaBanner
        titulo="¿Dudas específicas de ingeniería?"
        descripcion="Nuestro equipo de ingenieros especializados está disponible para resolver consultas complejas de instalación o diseño térmico."
        primaryLabel="Contactar Soporte Técnico"
        primaryHref="/contacto"
        secondaryLabel="Ver Sistema Santero"
        secondaryHref="/sistema-santero"
        tone="dark"
      />
    </>
  );
}
