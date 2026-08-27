import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import {
  porRubro,
  porServicio,
  porProducto,
  type QueHacemosLink,
} from "@/data/que-hacemos";

const categorias: { titulo: string; items: QueHacemosLink[] }[] = [
  { titulo: "Por rubro", items: porRubro },
  { titulo: "Por servicio", items: porServicio },
  { titulo: "Por producto", items: porProducto },
];

export default function Categorias() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        {categorias.map((categoria, index) => (
          <Reveal
            key={categoria.titulo}
            delay={Math.min(index * 0.1, 0.3)}
            className="rounded-2xl border border-steel/20 bg-ink-light p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
          >
            <h2 className="font-mono text-xs font-light text-brand-red-light">
              {categoria.titulo}
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {categoria.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group/link flex items-center justify-between gap-2 text-sm text-white/70 transition-colors hover:text-brand-red-light"
                  >
                    {item.label}
                    <span
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
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
