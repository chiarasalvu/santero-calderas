import Reveal from "@/components/motion/Reveal";
import {
  columnasComparativa,
  filasComparativa,
  type CeldaComparativa,
} from "@/data/comparativa";

// Comparativa de tres sistemas (termotanques tradicionales, calderas con
// intermediarios y Sistema Santero). En escritorio es una tabla con la
// columna de Santero destacada; en mobile cada variable pasa a una card con
// los tres sistemas apilados.
export default function ComparisonTable() {
  return (
    <section
      id="comparativa"
      className="scroll-mt-28 bg-ink px-6 pb-20 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Comparativa técnica
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Ventaja competitiva Santero
          </h2>
        </Reveal>

        {/* Escritorio */}
        <Reveal
          delay={0.1}
          className="mt-12 hidden overflow-hidden rounded-2xl border border-steel/20 bg-ink-light lg:block"
        >
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="border-b border-steel/20">
                <th
                  scope="col"
                  className="w-[18%] p-5 font-mono text-xs font-light text-white/50"
                >
                  Variable de análisis
                </th>
                <th
                  scope="col"
                  className="p-5 font-heading text-base font-semibold text-white/80"
                >
                  {columnasComparativa.termotanque}
                </th>
                <th
                  scope="col"
                  className="p-5 font-heading text-base font-semibold text-white/80"
                >
                  {columnasComparativa.caldera}
                </th>
                <th
                  scope="col"
                  className="bg-brand-red/10 p-5 font-heading text-base font-semibold text-brand-red-light"
                >
                  {columnasComparativa.santero}
                </th>
              </tr>
            </thead>
            <tbody>
              {filasComparativa.map((fila) => (
                <tr
                  key={fila.id}
                  className="border-b border-steel/10 align-top last:border-b-0"
                >
                  <th scope="row" className="p-5 text-sm font-semibold text-white">
                    {fila.variable}
                    {fila.nota && (
                      <span className="mt-1 block font-mono text-[11px] font-light text-white/50">
                        {fila.nota}
                      </span>
                    )}
                  </th>
                  <td className="p-5">
                    <Celda celda={fila.termotanque} />
                  </td>
                  <td className="p-5">
                    <Celda celda={fila.caldera} />
                  </td>
                  <td className="bg-brand-red/10 p-5">
                    <Celda celda={fila.santero} destacada />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile / tablet */}
        <div className="mt-12 flex flex-col gap-6 lg:hidden">
          {filasComparativa.map((fila, index) => (
            <Reveal
              key={fila.id}
              delay={Math.min(index * 0.05, 0.2)}
              className="rounded-2xl border border-steel/20 bg-ink-light p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {fila.variable}
              </h3>
              {fila.nota && (
                <p className="mt-1 font-mono text-[11px] font-light text-white/50">
                  {fila.nota}
                </p>
              )}
              <dl className="mt-5 flex flex-col gap-5">
                <div>
                  <dt className="font-mono text-xs font-light text-white/50">
                    {columnasComparativa.termotanque}
                  </dt>
                  <dd className="mt-2">
                    <Celda celda={fila.termotanque} />
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs font-light text-white/50">
                    {columnasComparativa.caldera}
                  </dt>
                  <dd className="mt-2">
                    <Celda celda={fila.caldera} />
                  </dd>
                </div>
                <div className="rounded-xl bg-brand-red/10 p-4">
                  <dt className="font-mono text-xs font-light text-brand-red-light">
                    {columnasComparativa.santero}
                  </dt>
                  <dd className="mt-2">
                    <Celda celda={fila.santero} destacada />
                  </dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Celda({
  celda,
  destacada,
}: {
  celda: CeldaComparativa;
  destacada?: boolean;
}) {
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          className={`font-heading text-lg font-semibold ${
            destacada ? "text-white" : "text-white/80"
          }`}
        >
          {celda.nivel}
        </span>
        {celda.valor && (
          <span
            className={`font-heading text-sm font-semibold ${
              destacada ? "text-brand-red-light" : "text-white/50"
            }`}
          >
            {celda.valor}
          </span>
        )}
      </p>
      <p
        className={`mt-2 text-left text-sm ${destacada ? "text-white/80" : "text-white/60"}`}
      >
        {celda.detalle}
      </p>
    </div>
  );
}
