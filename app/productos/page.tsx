import type { Metadata } from "next";
import ProductosHero from "@/components/productos/ProductosHero";
import ProductosDetalle from "@/components/productos/ProductosDetalle";

export const metadata: Metadata = {
  title: "Productos | Calderas Santero",
  description:
    "Líneas de producto de Calderas Santero: ATSOL, ADN, ATS, VTS, intercambiador de calor y tanques de acumulación, y línea ELECTRO.",
};

export default function ProductosPage() {
  return (
    <>
      <ProductosHero />
      <ProductosDetalle />
    </>
  );
}
