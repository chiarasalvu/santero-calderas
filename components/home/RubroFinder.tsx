import Link from "next/link";
import { rubros } from "@/data/rubros";
import Reveal from "@/components/motion/Reveal";

export default function RubroFinder() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
            Buscá tu solución
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Encontrá tu solución por rubro
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            No hace falta saber qué equipo necesitás. Elegí lo que administrás
            y te mostramos la solución.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rubros.map((rubro, index) => (
            <Reveal key={rubro.id} delay={Math.min(index * 0.05, 0.4)}>
              <Link
                href="/que-hacemos"
                className="group flex h-full flex-col rounded-2xl border border-steel/20 bg-ink-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red-light transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                >
                  <RubroIcon id={rubro.id} />
                </span>
                <h3 className="mt-4 font-mono text-xs font-medium tracking-widest text-white uppercase">
                  {rubro.label}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {rubro.descripcion}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RubroIcon({ id }: { id: string }) {
  const className = "h-6 w-6";

  if (id === "real-estate") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === "hoteleria") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M3 19v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 19v2M21 19v2M3 13V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M10 13V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "consorcios") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 21V9l5-4 5 4v12M14 21V13h6v8H4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M7 12h1M7 16h1M11 12h1M11 16h1M16 16h1M19 16h1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === "clubes-gym") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 9v6M2 10v4M7 8v8M17 8v8M20 10v4M22 9v6M7 12h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === "natatorios") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2 14c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M2 18c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === "industrias") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M3 21V11l5 3v-3l5 3v-3l5 3v7H3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M7 21v-4M12 21v-4M17 21v-4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (id === "balnearios") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 3c4 0 7 3.5 7 7H5c0-3.5 3-7 7-7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 10v10M9 20c1 .8 2 .8 3 0s2-.8 3 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === "camping") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M3 20 12 5l9 15M8 20l4-7 4 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "spa-wellness") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 3c2 3 4 6 4 9a4 4 0 1 1-8 0c0-3 2-6 4-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "gastronomia") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M7 3v7a2 2 0 0 0 2 2v9M7 3v5M9 3v5M11 3v7a2 2 0 0 1-2 2M16 3c-1.5 0-2 1.5-2 3v4c0 1.5.5 2 2 2v9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
