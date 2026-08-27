import Link from "next/link";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import Reveal from "@/components/motion/Reveal";

const stats = [
  { value: 1935, prefix: "", label: "Fundación" },
  { value: 4, prefix: "", label: "Generaciones" },
  { value: 90, prefix: "+", label: "Años de trayectoria" },
];

export default function AboutTeaser() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-light text-brand-red-light">
              Desde 1935
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
              Cuatro generaciones de trayectoria
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              Cuatro generaciones sostuvieron la misma pasión: ingeniería
              térmica de excelencia para la industria argentina.
            </p>
          </div>
          <Link
            href="/nosotros"
            className="group/link flex items-center gap-1 font-mono text-xs font-light text-brand-red-light transition-colors hover:text-white"
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

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-10 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="flex items-baseline font-heading text-3xl font-semibold text-brand-red-light sm:text-4xl">
                {stat.prefix}
                <AnimatedCounter value={stat.value} />
              </span>
              <p className="mt-1 font-mono text-xs font-light text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
