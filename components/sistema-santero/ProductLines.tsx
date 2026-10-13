import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { productoHref } from "@/data/productos";

type LineaProducto = {
  id: string;
  /** Línea correspondiente en /productos. */
  productoId: string;
  nombre: string;
  imagen: string;
  badge: string;
  badgeClassName: string;
  subtitulo: string;
};

// Solo los títulos de cada línea (sin descripción ni rendimientos), según el
// documento del cliente "Últimos detalles WEB" (13/10).
const lineas: LineaProducto[] = [
  {
    id: "atsol",
    productoId: "atsol-etercal",
    nombre: "Línea ATSOL",
    imagen: "/img/equipos/atsol.jpg",
    badge: "Línea premium",
    badgeClassName: "bg-brand-red text-white",
    subtitulo:
      "La solución más eficiente para grandes demandas y múltiples servicios.",
  },
  {
    id: "adn",
    productoId: "adn",
    nombre: "Línea ADN",
    imagen: "/img/equipos/adn.jpg",
    badge: "Línea estándar",
    badgeClassName: "bg-navy text-white",
    subtitulo:
      "La evolución del sistema adaptada al segmento que busca precio/calidad.",
  },
  {
    id: "vts",
    productoId: "vts",
    nombre: "Línea VTS",
    imagen: "/img/equipos/vts.jpg",
    badge: "Línea vapor",
    badgeClassName: "bg-sky text-white",
    subtitulo:
      "La importancia del vapor como motor de la industria desde los inicios.",
  },
];

export default function ProductLines() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Líneas de producto
          </h2>
          <p className="mt-2 text-white/70">
            Soluciones térmicas adaptadas para cada escala.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lineas.map((linea, index) => (
            <Reveal key={linea.id} delay={index * 0.1} className="h-full">
              <Link
                href={productoHref(linea.productoId)}
                className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-light transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
              >
                <div className="relative aspect-video overflow-hidden bg-white">
                  <Image
                    src={linea.imagen}
                    alt={linea.nombre}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-3"
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
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
