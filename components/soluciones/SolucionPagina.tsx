import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { ServicioPagina } from "@/data/que-hacemos";

// Estructura base de la página de un servicio (Agua caliente, Calefacción,
// Climatización de piscinas, Vapor). El contenido —breve texto con los
// beneficios/soluciones— todavía no lo tenemos: por ahora la sección de
// contenido es un bloque marcado como pendiente.
export default function SolucionPagina({ servicio }: { servicio: ServicioPagina }) {
  return (
    <>
      <section className="relative mt-[65px] flex min-h-[60dvh] items-end overflow-hidden bg-ink px-6 py-20 sm:py-28">
        <Image
          src={servicio.imagen}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30"
          aria-hidden
        />
        <Reveal className="relative mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs font-light text-brand-red-light">
            Por servicio
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            {servicio.titulo}
          </h1>
        </Reveal>
      </section>

      <section className="bg-ink px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-3xl">
          {/* PENDIENTE: texto del cliente con los beneficios/soluciones de
              este servicio. */}
          <div className="rounded-2xl border border-dashed border-steel/40 p-8 text-center">
            <p className="text-white/60">
              Estamos preparando el detalle de esta solución.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contacto"
              className="inline-block rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
            >
              Solicitar asesoramiento
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
