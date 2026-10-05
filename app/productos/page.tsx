import type { Metadata } from "next";
import ProductosHero from "@/components/productos/ProductosHero";
import ProductosDetalle from "@/components/productos/ProductosDetalle";

export const metadata: Metadata = {
  title: "Productos | Calderas Santero",
  description:
    "Líneas de producto de Calderas Santero: ATSOL / ETERCAL, ADN, ATS, VTS, intercambiadores y tanques de acumulación, y línea Electro.",
};

export default function ProductosPage() {
  return (
    <>
      <ProductosHero />
      <ProductosDetalle />
    </>
  );
}
