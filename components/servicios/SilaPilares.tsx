import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

// "Ingeniería & proyectos" es un servicio de Santero y no va en esta
// página: acá solo los dos que brinda SILA, dentro de un único panel con
// los dos lado a lado (un solo bloque de texto, no dos secciones sueltas).
const IDS = ["instalacion-puesta-en-marcha", "soporte-postventa"];

export default function SilaPilares() {
  const pilares = serviciosPilares.filter((p) => IDS.includes(p.id));

  return (
    <section className="bg-sila px-6 pb-20 sm:pb-24">
      <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-sila-accent/40 bg-sila-light">
        <div className="border-b border-sila-accent/30 px-8 py-8 sm:px-12">
          <p className="font-mono text-xs font-light text-brand-blue-light">
            Respaldo técnico
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Instalación y soporte
          </h2>
        </div>

        <div className="grid divide-y divide-sila-accent/30 md:grid-cols-2 md:divide-x md:divide-y-0">
          {pilares.map((pilar) => (
            <div key={pilar.id} className="p-8 sm:p-12">
              <h3 className="font-heading text-2xl font-semibold text-white">
                {pilar.titulo}
              </h3>
              <p className="mt-3 text-white/75">{pilar.bajada}</p>

              <ul className="mt-6 flex flex-col gap-5">
                {pilar.items.map((item) => (
                  <li key={item.titulo} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/25 text-brand-red-light"
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
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
