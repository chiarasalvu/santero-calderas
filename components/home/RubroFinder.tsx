import Image from "next/image";
import Link from "next/link";
import { rubros } from "@/data/rubros";

export default function RubroFinder() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Encontrá tu solución por rubro
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          No hace falta saber qué equipo necesitás. Elegí lo que administrás
          y te mostramos la solución.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rubros.map((rubro) => (
            <Link
              key={rubro.id}
              href="/servicios"
              className="group relative flex h-40 items-end overflow-hidden rounded-2xl"
            >
              <Image
                src={rubro.imageSrc}
                alt={rubro.label}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
                aria-hidden
              />
              <span className="relative z-10 p-4 font-heading text-sm font-semibold text-white">
                {rubro.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
