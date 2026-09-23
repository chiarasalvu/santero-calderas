import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolucionPagina from "@/components/soluciones/SolucionPagina";
import { serviciosPaginas } from "@/data/que-hacemos";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviciosPaginas.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/soluciones/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const servicio = serviciosPaginas.find((s) => s.slug === slug);
  if (!servicio) return {};
  return {
    title: `${servicio.titulo} | Calderas Santero`,
    description: `${servicio.titulo}: soluciones de Calderas Santero.`,
  };
}

export default async function SolucionPage({
  params,
}: PageProps<"/soluciones/[slug]">) {
  const { slug } = await params;
  const servicio = serviciosPaginas.find((s) => s.slug === slug);
  if (!servicio) notFound();

  return <SolucionPagina servicio={servicio} />;
}
