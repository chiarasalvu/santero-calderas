import Image from "next/image";
import Link from "next/link";
import { rubros } from "@/data/rubros";
import Reveal from "@/components/motion/Reveal";

export default function RubroFinder() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
            Buscá tu solución
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Encontrá tu solución por rubro
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            No hace falta saber qué equipo necesitás. Elegí lo que administrás
            y te mostramos la solución.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rubros.map((rubro, index) => (
            <Reveal key={rubro.id} delay={Math.min(index * 0.06, 0.4)}>
              <Link
                href="/que-hacemos"
                className="group relative flex h-40 items-end overflow-hidden rounded-2xl border border-steel/20"
              >
                <Image
                  src={rubro.imageSrc}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent transition-colors duration-300 group-hover:from-ink/90"
                  aria-hidden
                />
                <span className="relative z-10 p-4 font-mono text-xs font-medium tracking-widest text-white uppercase">
                  {rubro.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
