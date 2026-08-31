import Hero from "@/components/home/Hero";
import GoogleReviewsBadge from "@/components/home/GoogleReviewsBadge";
import ServiciosPrincipales from "@/components/home/ServiciosPrincipales";
import Diferencial from "@/components/home/Diferencial";
import SistemaSanteroTeaser from "@/components/home/SistemaSanteroTeaser";
import ProductLines from "@/components/home/ProductLines";
// import FeaturedProduct from "@/components/home/FeaturedProduct";
import CasesPreview from "@/components/home/CasesPreview";
import AboutTeaser from "@/components/home/AboutTeaser";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export default function Home() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <GoogleReviewsBadge />
      <ServiciosPrincipales />
      <Diferencial />
      <SistemaSanteroTeaser />
      <ProductLines />
      {/* <FeaturedProduct /> */}
      <CasesPreview logosPorSegmento={logosPorSegmento} />
      <AboutTeaser />
      {/* CTA final oculto a pedido del cliente (27/08) — ver CtaBanner.tsx,
          el componente sigue en el repo por si se vuelve a activar. */}
    </>
  );
}
