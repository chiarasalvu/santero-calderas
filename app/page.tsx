import Hero from "@/components/home/Hero";
import GoogleReviewsBadge from "@/components/home/GoogleReviewsBadge";
import Diferencial from "@/components/home/Diferencial";
import SistemaSanteroTeaser from "@/components/home/SistemaSanteroTeaser";
import ProductLines from "@/components/home/ProductLines";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import CtaBanner from "@/components/CtaBanner";

// Casos de Éxito e Historia se ocultaron a pedido del cliente (26/08).
// Los componentes (CasesPreview, HistoryTimeline) siguen intactos por si
// se quieren reactivar más adelante — no se borraron.

export default function Home() {
  return (
    <>
      <Hero />
      <GoogleReviewsBadge />
      <Diferencial />
      <SistemaSanteroTeaser />
      <ProductLines />
      <FeaturedProduct />
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto?motivo=cotizar-proyecto"
        secondaryLabel="Agendar videollamada"
        secondaryHref="/contacto?motivo=visita-tecnica"
      />
    </>
  );
}
