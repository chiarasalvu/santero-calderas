import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import {
  porRubro,
  porServicio,
  porProducto,
  type QueHacemosLink,
} from "@/data/que-hacemos";

const categorias: { titulo: string; items: QueHacemosLink[] }[] = [
  { titulo: "Por Rubro", items: porRubro },
  { titulo: "Por Servicio", items: porServicio },
  { titulo: "Por Producto", items: porProducto },
];

export default function Categorias() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        {categorias.map((categoria, index) => (
          <Reveal
            key={categoria.titulo}
            delay={Math.min(index * 0.1, 0.3)}
            className="rounded-2xl border border-steel/20 bg-ink-light p-8"
          >
            <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
              {categoria.titulo}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {categoria.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-2 text-sm text-white/70 transition-colors hover:text-brand-red-light"
                  >
                    {item.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
