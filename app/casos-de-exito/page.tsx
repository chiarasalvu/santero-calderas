import type { Metadata } from "next";
import Hero from "@/components/casos-de-exito/Hero";
import FeaturedCase from "@/components/casos-de-exito/FeaturedCase";
import BeforeAfter from "@/components/casos-de-exito/BeforeAfter";

export const metadata: Metadata = {
  title: "Casos de Éxito | Calderas Santero",
  description:
    "Proyectos de Calderas Santero en clubes, hoteles, desarrolladoras e industrias.",
};

export default function CasosDeExito() {
  return (
    <>
      <Hero />
      <FeaturedCase />
      <BeforeAfter />
      {/* CTA final oculto a pedido del cliente (27/08) — ver CtaBanner.tsx */}
    </>
  );
}
