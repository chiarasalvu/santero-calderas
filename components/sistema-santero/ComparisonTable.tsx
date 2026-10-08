import Reveal from "@/components/motion/Reveal";

type FilaComparacion = {
  id: string;
  caracteristica: string;
  tradicional: string;
  santero: string;
};

const filas: FilaComparacion[] = [
  {
    id: "calentamiento",
    caracteristica: "Tipo de calentamiento",
    tradicional: "Directo (fuego sobre agua)",
    santero: "Indirecto (Baño María técnico)",
  },
  {
    id: "sarro",
    caracteristica: "Riesgo de sarro",
    tradicional: "Crítico y constante",
    santero: "Reducido",
  },
  {
    id: "generacion",
    caracteristica: "Generación de agua caliente",
    tradicional: "Acumulación en tanques",
    santero: "Generación instantánea",
  },
  {
    id: "mantenimiento",
    caracteristica: "Mantenimiento",
    tradicional: "Mayor frecuencia de intervención",
    santero: "Menor necesidad de mantenimiento",
  },
  {
    id: "adaptabilidad",
    caracteristica: "Adaptabilidad",
    tradicional: "Equipos estandarizados",
    santero: "Soluciones dimensionadas a medida",
  },
];

// Comparativa en dos columnas enfrentadas: lo que pasa con un sistema
// tradicional (apagado) contra lo que resuelve el Sistema Santero
// (destacado, con check). Más rápida de leer que una tabla.
export default function ComparisonTable() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Comparativa técnica
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Ventaja competitiva Santero
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-steel/20 bg-ink-light p-6 sm:p-8">
            <p className="font-mono text-xs font-light text-white/50">
              Sistema tradicional
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {filas.map((fila) => (
                <li key={fila.id} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50"
                    aria-hidden
                  >
                    <CruzIcon />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] font-light text-white/40">
                      {fila.caracteristica}
                    </p>
                    <p className="mt-1 text-white/50">{fila.tradicional}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-2xl border border-brand-red-light/30 bg-ink-light p-6 sm:p-8"
          >
            <p className="font-mono text-xs font-light text-brand-red-light">
              Sistema Santero
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {filas.map((fila) => (
                <li key={fila.id} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light"
                    aria-hidden
                  >
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] font-light text-white/50">
                      {fila.caracteristica}
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {fila.santero}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
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

function CruzIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
