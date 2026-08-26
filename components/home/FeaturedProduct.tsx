import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const bullets = [
  "Capacidades para proyectos de alta exigencia.",
  "Generación instantánea mediante calentamiento indirecto.",
  "Ideal para hoteles, clubes, edificios e industrias.",
];

export default function FeaturedProduct() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Tecnología en Acero Inoxidable
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Nuestra línea de calderas de alto rendimiento está diseñada para
            soportar las exigencias más severas del entorno industrial,
            optimizando el consumo energético y reduciendo emisiones.
          </p>

          <ul className="mt-6 flex flex-col gap-3 border-t border-steel/20 pt-6">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-sm text-white/70"
              >
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-[10px] text-brand-red-light"
                  aria-hidden
                >
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <Link
            href="/sistema-santero"
            className="mt-8 inline-flex items-center gap-2 rounded border border-steel/40 px-6 py-3 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:border-white"
          >
            Catálogo Técnico
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-steel/20 bg-ink-light">
            <Image
              src="/img/generales/caldera-9.png"
              alt="Línea ATSOL — caldera de acero inoxidable"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-6"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-xl bg-cream px-6 py-4 shadow-lg sm:-bottom-6 sm:-left-6">
            <p className="font-mono text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
              Modelo Destacado
            </p>
            <p className="font-heading text-lg font-bold text-navy">
              Línea ATSOL
            </p>
            <p className="mt-2 border-t border-zinc-200 pt-2 text-xs text-zinc-600">
              <span className="font-heading text-xl font-bold text-brand-red">
                98%
              </span>{" "}
              eficiencia estacionaria
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
