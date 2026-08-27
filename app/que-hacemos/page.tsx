import type { Metadata } from "next";
import Hero from "@/components/que-hacemos/Hero";
import Categorias from "@/components/que-hacemos/Categorias";
import CtaBanner from "@/components/CtaBanner";

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
      <CtaBanner
        titulo="¿No encontrás lo que buscás?"
        descripcion="Contanos tu proyecto y te ayudamos a encontrar la solución térmica adecuada."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto?motivo=cotizar-proyecto"
        secondaryLabel="Ver Sistema Santero"
        secondaryHref="/sistema-santero"
      />
    </>
  );
}
