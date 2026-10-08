import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

export default function Diferencial() {
  return (
    <section
      id="diferencial"
      className="scroll-mt-32 bg-ink px-6 pb-20 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            El diferencial Santero
          </h2>
          <Link
            href="/servicios"
            className="group/link flex items-center gap-1 font-mono text-xs font-light text-brand-red-light transition-colors hover:text-white"
          >
            Ver metodología
            <span
              className="transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {serviciosPilares.map((pilar, index) => (
            <Reveal
              key={pilar.id}
              delay={Math.min(index * 0.1, 0.3)}
              className="group overflow-hidden rounded-2xl border border-steel/20 bg-ink-light transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pilar.foto.src}
                  alt={pilar.titulo}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: pilar.foto.posicion }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-white">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-sm text-white/60">{pilar.bajada}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
