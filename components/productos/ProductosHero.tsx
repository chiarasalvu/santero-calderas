import Reveal from "@/components/motion/Reveal";
import { lineasProducto, productoHref } from "@/data/productos";

export default function ProductosHero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Productos
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Todas las líneas de Santero, con el detalle de cada una.
          </p>
          <nav
            aria-label="Líneas de producto"
            className="mt-8 flex flex-wrap gap-2"
          >
            {lineasProducto.map((linea) => (
              <a
                key={linea.id}
                href={productoHref(linea.id)}
                className="rounded-full border border-steel/40 px-4 py-1.5 text-sm font-semibold text-white/80 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
              >
                {linea.label}
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
