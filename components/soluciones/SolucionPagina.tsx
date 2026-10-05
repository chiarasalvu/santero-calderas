import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import Reveal from "@/components/motion/Reveal";
import type { ServicioPagina } from "@/data/que-hacemos";
import { fotoPorEquipo, lineaPorEquipo, productoHref } from "@/data/productos";

// Página de un servicio (Agua caliente, Calefacción, Climatización de
// piscinas, Vapor), en tres bloques: título + foto, el texto junto a las
// aplicaciones, y los equipos que lo resuelven (con foto, linkeando a
// /productos).
export default function SolucionPagina({ servicio }: { servicio: ServicioPagina }) {
  return (
    <>
      <section className="relative mt-[65px] bg-ink px-6 pt-24 pb-16">
        <div className="absolute inset-x-0 top-6 z-10 px-6">
          <div className="mx-auto max-w-6xl">
            <BackButton />
          </div>
        </div>

        <Reveal className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="font-mono text-xs font-light text-brand-red-light">
              Por servicio
            </p>
            <h1 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
              {servicio.titulo}
            </h1>
            {servicio.subtitulo && (
              <p className="mt-4 max-w-xl text-lg text-white/80">
                {servicio.subtitulo}
              </p>
            )}
            <Link
              href="/contacto"
              className="mt-8 inline-block rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
            >
              Solicitar asesoramiento
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-steel/20">
            <Image
              src={servicio.imagen}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-ink px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
          <Reveal className="flex flex-col gap-5">
            {servicio.parrafos.map((parrafo) => (
              <p key={parrafo} className="text-white/70">
                {parrafo}
              </p>
            ))}
          </Reveal>

          <Reveal
            delay={0.1}
            className="self-start rounded-2xl border border-steel/20 bg-ink-light p-6"
          >
            <p className="font-mono text-xs font-light text-brand-red-light">
              Aplicaciones
            </p>
            <ul className="mt-4 flex flex-col gap-3">
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
