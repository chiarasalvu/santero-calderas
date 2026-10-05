import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { ServicioPagina } from "@/data/que-hacemos";
import { fotoPorEquipo, lineaPorEquipo, productoHref } from "@/data/productos";

// Página de un servicio (Agua caliente, Calefacción, Climatización de
// piscinas, Vapor): la foto del servicio de portada con el título encima;
// debajo el texto (justificado) junto a las aplicaciones, y después los
// equipos que lo resuelven (con foto, linkeando a /productos).
export default function SolucionPagina({ servicio }: { servicio: ServicioPagina }) {
  return (
    <>
      <section className="relative mt-[65px] flex min-h-[calc(70dvh-65px)] items-end overflow-hidden bg-ink px-6 pt-24 pb-14 sm:pb-16">
        <Image
          src={servicio.imagen}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20"
          aria-hidden
        />

        <Reveal className="relative mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs font-light text-brand-red-light">
            Por servicio
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            {servicio.titulo}
          </h1>
          {servicio.subtitulo && (
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {servicio.subtitulo}
            </p>
          )}
        </Reveal>
      </section>

      <section className="bg-ink px-6 pt-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
          <Reveal>
            <div className="flex flex-col gap-5">
              {servicio.parrafos.map((parrafo) => (
                <p
                  key={parrafo}
                  className="hyphens-auto text-justify text-white/70"
                >
                  {parrafo}
                </p>
              ))}
            </div>

            <Link
              href="/contacto"
              className="mt-10 inline-block rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
            >
              Solicitar asesoramiento
            </Link>
          </Reveal>

          <Reveal
            delay={0.1}
            className="self-start rounded-2xl border border-steel/20 bg-ink-light p-6 lg:sticky lg:top-28"
          >
            <p className="font-mono text-xs font-light text-brand-red-light">
              Aplicaciones
            </p>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1">
              {servicio.aplicaciones.map((aplicacion) => (
                <li
                  key={aplicacion}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-light"
                    aria-hidden
                  />
                  {aplicacion}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
              Productos
            </h2>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {servicio.productos.map((producto, index) => (
              <Reveal key={producto} delay={Math.min(index * 0.08, 0.3)}>
                <Link
                  href={productoHref(lineaPorEquipo[producto])}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-ink-light transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
                >
                  <div className="relative aspect-[4/5] bg-white">
                    <Image
                      src={fotoPorEquipo[producto]}
                      alt={`Equipo ${producto}`}
                      fill
                      sizes="(min-width: 1024px) 18vw, 45vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="px-4 py-3 font-heading text-base font-semibold text-white">
                    {producto}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
