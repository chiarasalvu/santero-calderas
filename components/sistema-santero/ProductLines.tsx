import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

type LineaItem = {
  titulo: string;
  descripcion: string;
};

type LineaProducto = {
  id: string;
  nombre: string;
  imagen: string;
  badge: string;
  badgeClassName: string;
  subtitulo: string;
  items: LineaItem[];
  rendimiento: number;
};

const lineas: LineaProducto[] = [
  {
    id: "atsol",
    nombre: "Línea ATSOL",
    imagen: "/img/generales/caldera-9.png",
    badge: "Línea premium",
    badgeClassName: "bg-brand-red text-white",
    subtitulo: "La solución para grandes demandas de agua caliente sanitaria.",
    items: [
      {
        titulo: "Alta exigencia",
        descripcion:
          "Capacidades para proyectos de alta exigencia, ideal para hoteles, clubes, edificios e industrias.",
      },
      {
        titulo: "Generación instantánea",
        descripcion:
          "Generación instantánea mediante calentamiento indirecto.",
      },
    ],
    rendimiento: 98,
  },
  {
    id: "adn",
    nombre: "Línea ADN",
    imagen: "/img/generales/caldera-11.png",
    badge: "Relación precio-calidad",
    badgeClassName: "bg-navy text-white",
    subtitulo: "La eficiencia del Sistema Santero en formato compacto.",
    items: [
      {
        titulo: "Diseño compacto",
        descripcion:
          "Diseñada para demandas medianas y espacios reducidos, ideal para consorcios, gimnasios y climatización de piscinas.",
      },
      {
        titulo: "Bajo mantenimiento",
        descripcion: "Generación instantánea y bajo mantenimiento.",
      },
    ],
    rendimiento: 92,
  },
];

export default function ProductLines() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Líneas de producto
          </h2>
          <p className="mt-2 text-white/70">
            Soluciones adaptadas a cada escala industrial y de servicios.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {lineas.map((linea, index) => (
            <Reveal
              key={linea.id}
              delay={index * 0.1}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-light transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={linea.imagen}
                  alt={linea.nombre}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${linea.badgeClassName}`}
                >
                  {linea.badge}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-white">
                  {linea.nombre}
                </h3>
                <p className="mt-2 text-sm font-light text-white/90">
                  {linea.subtitulo}
                </p>

                <ul className="mt-6 flex flex-col gap-4">
                  {linea.items.map((item) => (
                    <li key={item.titulo} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light transition-transform duration-300 group-hover:scale-110"
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

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-xs font-light text-white/50">
                    Rendimiento
                  </span>
                  <span className="flex items-baseline font-heading text-2xl font-semibold text-brand-red-light">
                    <AnimatedCounter value={linea.rendimiento} />%
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
                >
                  Descargar ficha técnica
                </button>
              </div>
            </Reveal>
          ))}
        </div>
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
