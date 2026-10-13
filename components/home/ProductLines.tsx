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
  subtitulo: string;
};

// Dos líneas, con imagen y título (sin listas de características): el
// detalle completo está en /productos.
const lineas: LineaProducto[] = [
  {
    id: "atsol",
    productoId: "atsol-etercal",
    nombre: "ATSOL",
    imagen: "/img/equipos/atsol.jpg",
    badge: "Premium",
    subtitulo: "Alta eficiencia con quemadores de modulación",
  },
  {
    id: "adn",
    productoId: "adn",
    nombre: "ADN",
    imagen: "/img/equipos/adn.jpg",
    badge: "Relación precio-calidad",
    subtitulo: "Ideal para reemplazar termotanques industriales",
  },
];

export default function ProductLines() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Productos principales
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Las dos líneas de generación de agua caliente que respaldan el
            Sistema Santero.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {lineas.map((linea, index) => (
            <Reveal key={linea.id} delay={index * 0.1} className="h-full">
              <Link
                href={productoHref(linea.productoId)}
                className="group block h-full overflow-hidden rounded-2xl border border-steel/20 bg-ink-light transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white">
                  <Image
                    src={linea.imagen}
                    alt={`Línea ${linea.nombre}`}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <span className="inline-block rounded-full bg-brand-red/20 px-3 py-1 font-mono text-[10px] font-light text-brand-red-light">
                    {linea.badge}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">
                    {linea.nombre}
                  </h3>
                  <p className="mt-1 text-sm font-light text-white/80">
                    {linea.subtitulo}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-brand-red-light">
                    Ver detalle del producto
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
