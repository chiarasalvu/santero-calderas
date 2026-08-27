import type { Metadata } from "next";
import Hero from "@/components/sistema-santero/Hero";
import Overview from "@/components/sistema-santero/Overview";
import ProductLines from "@/components/sistema-santero/ProductLines";
import ComparisonTable from "@/components/sistema-santero/ComparisonTable";

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
      {/* CTA final oculto a pedido del cliente (27/08) — ver CtaBanner.tsx */}
    </>
  );
}
