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
    caracteristica: "Tipo de Calentamiento",
    tradicional: "Directo (Fuego sobre agua)",
    santero: "Indirecto (Baño María técnico)",
  },
  {
    id: "sarro",
    caracteristica: "Riesgo de Sarro",
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
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Ventaja Competitiva Santero
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-ink-light">
                <th className="rounded-l-lg px-4 py-4 font-heading text-base font-bold text-white sm:px-6">
                  Característica
                </th>
                <th className="px-4 py-4 font-heading text-base font-medium text-white/50 sm:px-6">
                  Sistema Tradicional
                </th>
                <th className="rounded-r-lg px-4 py-4 font-heading text-base font-bold text-brand-red-light sm:px-6">
                  Sistema Santero
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => (
                <tr key={fila.id} className="border-b border-white/10">
                  <td className="px-4 py-5 text-sm font-semibold text-white sm:px-6">
                    {fila.caracteristica}
                  </td>
                  <td className="px-4 py-5 text-sm text-white/40 sm:px-6">
                    {fila.tradicional}
                  </td>
                  <td
                    className={`px-4 py-5 text-sm sm:px-6 ${
                      fila.destacado
                        ? "font-medium text-brand-red-light"
                        : "text-white/80"
                    }`}
                  >
                    {fila.santero}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
