import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

// "Ingeniería & proyectos" es un servicio de Santero y ya no va en esta
// página: acá solo los dos que brinda SILA.
const IDS = ["instalacion-puesta-en-marcha", "soporte-postventa"];

export default function SilaPilares() {
  const pilares = serviciosPilares.filter((p) => IDS.includes(p.id));

  return (
    <section className="bg-sila px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-blue-light">
            Respaldo técnico
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Instalación y soporte
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pilares.map((pilar, index) => (
            <Reveal
              key={pilar.id}
              delay={index * 0.1}
              className="rounded-2xl border border-sila-accent/40 bg-sila-light p-8"
            >
              <h3 className="font-heading text-2xl font-semibold text-white">
                {pilar.titulo}
              </h3>
              <p className="mt-3 text-white/75">{pilar.bajada}</p>

              <ul className="mt-6 flex flex-col gap-5">
                {pilar.items.map((item) => (
                  <li key={item.titulo} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light"
                      aria-hidden
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                        <path
                          d="M5 13l3.5 3.5L19 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-light text-white">
                        {item.titulo}
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        {item.descripcion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
