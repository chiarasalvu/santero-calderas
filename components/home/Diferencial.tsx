import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

export default function Diferencial() {
  return (
    <section id="diferencial" className="scroll-mt-32 bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            El diferencial Santero
          </h2>
          <Link
            href="/servicios"
            className="group/link flex items-center gap-1 font-mono text-xs font-light text-brand-red-light uppercase transition-colors hover:text-white"
          >
            Ver metodología
            <span
              className="transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {serviciosPilares.map((pilar, index) => (
            <Reveal
              key={pilar.id}
              delay={Math.min(index * 0.1, 0.3)}
              className="group relative overflow-hidden rounded-2xl border border-steel/20 bg-ink-light p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
            >
              <div className="relative">
                <span className="inline-flex transition-transform duration-300 group-hover:scale-110">
                  <PilarIcon id={pilar.id} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-sm text-white/60">{pilar.bajada}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PilarIcon({ id }: { id: string }) {
  const className = "h-6 w-6 text-brand-red-light";

  if (id === "ingenieria-proyectos") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 20 14 4l2 3-8 13H4Zm10-4 4-6.5 2 1.2L15.5 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "instalacion-puesta-en-marcha") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.4 4a7.9 7.9 0 0 0-.14-1.5l2-1.56-2-3.46-2.36.96a8.1 8.1 0 0 0-1.3-.75L16.2 3h-4l-.4 2.69a8.1 8.1 0 0 0-1.3.75l-2.36-.96-2 3.46 2 1.56a7.9 7.9 0 0 0 0 3l-2 1.56 2 3.46 2.36-.96c.4.3.84.55 1.3.75L11.8 21h4l.4-2.69c.46-.2.9-.45 1.3-.75l2.36.96 2-3.46-2-1.56c.1-.49.14-.99.14-1.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v-5H4Zm16 0h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
