import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import Reveal from "@/components/motion/Reveal";
import type { ServicioPagina } from "@/data/que-hacemos";

// Página de un servicio (Agua caliente, Calefacción, Climatización de
// piscinas, Vapor): portada con la foto de la card del Home, y debajo el
// texto, las aplicaciones y los productos que lo resuelven.
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
        <div className="absolute inset-x-0 top-6 z-10 px-6">
          <div className="mx-auto max-w-6xl">
            <BackButton />
          </div>
        </div>
        <Reveal className="relative mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs font-light text-brand-red-light">
            Por servicio
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            {servicio.titulo}
          </h1>
          {servicio.subtitulo && (
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {servicio.subtitulo}
            </p>
          )}
        </Reveal>
      </section>

      <section className="bg-ink px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-5">
            {servicio.parrafos.map((parrafo) => (
              <p key={parrafo} className="text-white/70">
                {parrafo}
              </p>
            ))}
          </div>

          <dl className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8">
            <div>
              <dt className="font-mono text-xs font-light text-brand-red-light">
                Aplicaciones
              </dt>
              <dd className="mt-2 text-white/80">{servicio.aplicaciones}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs font-light text-brand-red-light">
                Productos
              </dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {servicio.productos.map((producto) => (
                  <span
                    key={producto}
                    className="rounded-full border border-steel/40 px-4 py-1.5 font-heading text-sm font-semibold text-white"
                  >
                    {producto}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-10">
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
