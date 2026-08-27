import type { Metadata } from "next";
import Hero from "@/components/sistema-santero/Hero";
import Overview from "@/components/sistema-santero/Overview";
import ProductLines from "@/components/sistema-santero/ProductLines";
import ComparisonTable from "@/components/sistema-santero/ComparisonTable";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Sistema Santero | Calderas Santero",
  description:
    "Conocé el Sistema Santero: calentamiento indirecto de alta eficiencia, sus líneas de producto y su ventaja frente a los sistemas tradicionales.",
};

export default function SistemaSantero() {
  return (
    <>
      <Hero />
      <Overview />
      <ProductLines />
      <ComparisonTable />
      <CtaBanner
        titulo="Optimice su inversión térmica hoy"
        descripcion="Nuestros especialistas están listos para realizar un diagnóstico técnico de sus necesidades y proponer la solución más eficiente."
        primaryLabel="Solicitar asesoramiento técnico"
        primaryHref="/contacto"
        secondaryLabel="Ver catálogo completo"
        secondaryHref="/servicios"
      />
    </>
  );
}
