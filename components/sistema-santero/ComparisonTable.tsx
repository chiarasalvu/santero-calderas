import Reveal from "@/components/motion/Reveal";

type FilaComparacion = {
  id: string;
  caracteristica: string;
  tradicional: string;
  santero: string;
  destacado?: boolean;
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
    destacado: true,
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

        <Reveal
          delay={0.1}
          className="mt-12 overflow-hidden rounded-2xl border border-steel/20"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-ink-light">
                  <th className="px-4 py-4 font-mono text-xs font-light text-white/50 sm:px-6">
                    Característica
                  </th>
                  <th className="px-4 py-4 font-mono text-xs font-light text-white/50 sm:px-6">
                    Sistema tradicional
                  </th>
                  <th className="px-4 py-4 font-mono text-xs font-light text-brand-red-light sm:px-6">
                    Sistema Santero
                  </th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila) => (
                  <tr
                    key={fila.id}
                    className="border-t border-steel/20 bg-ink"
                  >
                    <td className="px-4 py-5 text-sm font-semibold text-white sm:px-6">
                      {fila.caracteristica}
                    </td>
                    <td className="px-4 py-5 text-sm text-white/40 sm:px-6">
                      {fila.tradicional}
                    </td>
                    <td
                      className={`px-4 py-5 text-sm sm:px-6 ${
                        fila.destacado
                          ? "font-light text-brand-red-light"
                          : "text-white/80"
                      }`}
                    >
                      {fila.santero}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
