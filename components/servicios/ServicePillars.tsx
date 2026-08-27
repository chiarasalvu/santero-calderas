import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

const contactoPorPilar: Record<string, { label: string; motivo: string }> = {
  "ingenieria-proyectos": {
    label: "Descargar Ficha Técnica",
    motivo: "ficha-tecnica",
  },
  "instalacion-puesta-en-marcha": {
    label: "Consultar Protocolo de Instalación",
    motivo: "visita-tecnica",
  },
  "soporte-postventa": {
    label: "Contactar Guardia Técnica",
    motivo: "guardia-24hs",
  },
};

export default function ServicePillars() {
  return (
    <section className="bg-ink px-6 pt-6 pb-20 sm:pt-8 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {serviciosPilares.map((pilar, index) => {
          const contacto = contactoPorPilar[pilar.id];

          return (
            <Reveal
              key={pilar.id}
              delay={Math.min(index * 0.1, 0.3)}
              className="group flex flex-col rounded-2xl border border-steel/20 bg-ink-light p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
            >
              <span className="inline-flex w-fit transition-transform duration-300 group-hover:scale-110">
                <PilarIcon id={pilar.id} />
              </span>
              <h2 className="mt-4 font-heading text-xl font-semibold text-white uppercase">
                {pilar.titulo}
              </h2>
              <p className="mt-2 text-sm text-white/60">{pilar.bajada}</p>

              <ul className="mt-6 flex flex-col gap-4">
                {pilar.items.map((item) => (
                  <li key={item.titulo} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light transition-transform duration-300 group-hover:scale-110"
                      aria-hidden
                    >
                      <CheckIcon />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-light text-white uppercase">
                        {item.titulo}
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {item.descripcion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {contacto && (
                <div className="mt-auto pt-8">
                  <Link
                    href={`/contacto?motivo=${contacto.motivo}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-white hover:text-brand-red active:scale-[0.98]"
                  >
                    {contacto.label}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              )}
            </Reveal>
          );
        })}
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M5 13l3.5 3.5L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
