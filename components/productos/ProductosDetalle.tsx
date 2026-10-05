import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { lineasProducto } from "@/data/productos";

// Una fila por línea de producto: foto de los equipos a un lado y el
// detalle al otro, alternando el lado.
export default function ProductosDetalle() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 sm:gap-24">
        {lineasProducto.map((linea, index) => (
          <article
            key={linea.id}
            id={linea.id}
            className="grid scroll-mt-28 items-start gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <Reveal
              className={`relative flex aspect-[4/3] gap-3 overflow-hidden rounded-2xl bg-white p-6 lg:sticky lg:top-28 ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              {linea.imagenes.map((imagen) => (
                <div key={imagen.src} className="relative h-full flex-1">
                  <Image
                    src={imagen.src}
                    alt={imagen.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 90vw"
                    className="object-contain"
                  />
                </div>
              ))}
              {linea.badge && (
                <span
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${linea.badgeClassName}`}
                >
                  {linea.badge}
                </span>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
                {linea.nombre}
              </h2>
              {linea.subtitulo && (
                <p className="mt-3 font-light text-white/90">
                  {linea.subtitulo}
                </p>
              )}

              <ul className="mt-8 flex flex-col gap-5">
                {linea.items.map((item) => (
                  <li key={item.titulo} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light"
                      aria-hidden
                    >
                      <CheckIcon />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-light text-white">
                        {item.titulo}
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {item.descripcion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {linea.rendimiento !== undefined && (
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-xs font-light text-white/50">
                    Rendimiento
                  </span>
                  <span className="flex items-baseline font-heading text-2xl font-semibold text-brand-red-light">
                    <AnimatedCounter value={linea.rendimiento} />%
                  </span>
                </div>
              )}

              <Link
                href="/contacto"
                className="mt-8 inline-block rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
              >
                Consultar por esta línea
              </Link>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M5 13l3.5 3.5L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
