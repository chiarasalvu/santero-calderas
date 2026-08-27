import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const stats = [
  { value: "1935", label: "Fundación" },
  { value: "4", label: "Generaciones" },
  { value: "+90", label: "Años de trayectoria" },
];

export default function AboutTeaser() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
            Desde 1935
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Cuatro generaciones de trayectoria
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Cuatro generaciones sostuvieron la misma pasión: ingeniería
            térmica de excelencia para la industria argentina.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-heading text-3xl font-bold text-brand-red-light sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 font-mono text-xs font-medium tracking-widest text-white/50 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/nosotros"
            className="group/link mt-10 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase transition-colors hover:text-white"
          >
            Conocer nuestra historia completa
            <span
              className="transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
