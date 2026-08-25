import Image from "next/image";

type LineaProducto = {
  id: string;
  nombre: string;
  imagen: string;
  badge: string;
  badgeClassName: string;
  subtitulo: string;
  bullets: string[];
};

const lineas: LineaProducto[] = [
  {
    id: "atsol",
    nombre: "Línea ATSOL",
    imagen: "/img/generales/caldera-9.png",
    badge: "Alto consumo",
    badgeClassName: "bg-brand-red text-white",
    subtitulo: "La solución para grandes demandas de agua caliente sanitaria.",
    bullets: [
      "Capacidades para proyectos de alta exigencia.",
      "Generación instantánea mediante calentamiento indirecto.",
      "Ideal para hoteles, clubes, edificios e industrias.",
    ],
  },
  {
    id: "adn",
    nombre: "Línea ADN",
    imagen: "/img/generales/caldera-11.png",
    badge: "Diseño compacto",
    badgeClassName: "bg-navy text-white",
    subtitulo: "La eficiencia del Sistema Santero en formato compacto.",
    bullets: [
      "Diseñada para demandas medianas y espacios reducidos.",
      "Generación instantánea y bajo mantenimiento.",
      "Ideal para consorcios, gimnasios y climatización de piscinas.",
    ],
  },
];

export default function ProductLines() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold text-zinc-900 sm:text-4xl">
          Líneas de Producto
        </h2>
        <p className="mt-2 text-zinc-600">
          Soluciones adaptadas a cada escala industrial y de servicios.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {lineas.map((linea) => (
            <div
              key={linea.id}
              className="overflow-hidden rounded-2xl border border-zinc-200"
            >
              <div className="relative aspect-video">
                <Image
                  src={linea.imagen}
                  alt={linea.nombre}
                  fill
                  className="object-cover"
                />
                <span
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${linea.badgeClassName}`}
                >
                  {linea.badge}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-zinc-900">
                  {linea.nombre}
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-800">
                  {linea.subtitulo}
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {linea.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-zinc-600"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-[10px] text-brand-red">
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  <span aria-hidden>⬇</span>
                  Descargar ficha técnica
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
