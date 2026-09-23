import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RubroHero from "@/components/rubros/RubroHero";
import { rubrosPaginas } from "@/data/que-hacemos";

export const dynamicParams = false;

export function generateStaticParams() {
  return rubrosPaginas.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/rubros/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const rubro = rubrosPaginas.find((r) => r.slug === slug);
  if (!rubro) return {};
  return {
    title: `${rubro.titulo} | Calderas Santero`,
    description: `Soluciones de agua caliente, calefacción y climatización de Calderas Santero para ${rubro.titulo}.`,
  };
}

export default async function RubroPage({ params }: PageProps<"/rubros/[slug]">) {
  const { slug } = await params;
  const rubro = rubrosPaginas.find((r) => r.slug === slug);
  if (!rubro) notFound();

  return <RubroHero titulo={rubro.titulo} video={rubro.video} />;
}
