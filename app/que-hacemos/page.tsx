import type { Metadata } from "next";
import Hero from "@/components/que-hacemos/Hero";
import Categorias from "@/components/que-hacemos/Categorias";

export const metadata: Metadata = {
  title: "Qué Hacemos | Calderas Santero",
  description:
    "Soluciones térmicas organizadas por rubro, servicio y producto.",
};

export default function QueHacemosPage() {
  return (
    <>
      <Hero />
      <Categorias />
      {/* CTA final oculto a pedido del cliente (27/08) — ver CtaBanner.tsx */}
    </>
  );
}
