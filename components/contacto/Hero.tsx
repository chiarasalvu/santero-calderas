import { Suspense } from "react";
import MotivoSelector from "@/components/contacto/MotivoSelector";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-24 pb-10 sm:py-28">
      <div className="mx-auto mt-12 max-w-6xl">
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
          Contacto
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
          Escribinos y te respondemos a la brevedad. Nuestro equipo técnico
          está listo para asesorarte en tu próximo proyecto.
        </p>

        <Suspense fallback={null}>
          <MotivoSelector />
        </Suspense>
      </div>
    </section>
  );
}
