import Reveal from "@/components/motion/Reveal";
import Nivel from "@/components/comparativa/Nivel";
import {
  columnasComparativa,
  filasComparativa,
  type CeldaComparativa,
} from "@/data/comparativa";

// Comparativa de tres sistemas (termotanques tradicionales, calderas con
// intermediarios y Sistema Santero). En escritorio es una tabla con la
// columna de Santero destacada en azul; en mobile cada variable pasa a una
// card con los tres sistemas apilados. Alto / Medio / Bajo van en color.
export default function ComparisonTable() {
  return (
    <section
      id="comparativa"
      className="scroll-mt-28 bg-ink px-6 pb-20 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-blue-light">
            Ventaja competitiva Santero
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Comparativa técnica y económica
          </h2>
        </Reveal>

        {/* Escritorio */}
        <Reveal
          delay={0.1}
          className="mt-12 hidden overflow-hidden rounded-2xl border border-white/15 bg-ink-elevated lg:block"
        >
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="border-b border-white/15">
                <th
                  scope="col"
                  className="w-[18%] p-4 text-sm font-bold text-white"
                >
                  Variable de análisis
                </th>
                <th
                  scope="col"
                  className="p-4 text-center font-heading text-sm font-semibold text-white/80"
                >
                  {columnasComparativa.termotanque}
                </th>
                <th
                  scope="col"
                  className="p-4 text-center font-heading text-sm font-semibold text-white/80"
                >
                  {columnasComparativa.caldera}
                </th>
                <th
                  scope="col"
                  className="bg-brand-blue/30 p-4 text-center font-heading text-sm font-semibold text-brand-blue-light"
                >
                  {columnasComparativa.santero}
                </th>
              </tr>
            </thead>
            <tbody>
              {filasComparativa.map((fila) => (
                <tr
                  key={fila.id}
                  className="border-b border-white/10 align-top last:border-b-0"
                >
                  <th scope="row" className="p-4 text-[13px] font-bold text-white">
                    {fila.variable}
                    {fila.nota && (
                      <span className="mt-1 block font-mono text-[11px] font-light text-white/60">
                        {fila.nota}
                      </span>
                    )}
                  </th>
                  <td className="p-4">
                    <Celda celda={fila.termotanque} />
                  </td>
                  <td className="p-4">
                    <Celda celda={fila.caldera} />
                  </td>
                  <td className="bg-brand-blue/30 p-4">
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
              className="rounded-2xl border border-white/15 bg-ink-elevated p-6"
            >
              <h3 className="font-heading text-lg font-bold text-white">
                {fila.variable}
              </h3>
              {fila.nota && (
                <p className="mt-1 font-mono text-[11px] font-light text-white/60">
                  {fila.nota}
                </p>
              )}
              <dl className="mt-5 flex flex-col gap-5">
                <div>
                  <dt className="text-center font-mono text-xs font-light text-white/60">
                    {columnasComparativa.termotanque}
                  </dt>
                  <dd className="mt-2">
                    <Celda celda={fila.termotanque} />
                  </dd>
                </div>
                <div>
                  <dt className="text-center font-mono text-xs font-light text-white/60">
                    {columnasComparativa.caldera}
                  </dt>
                  <dd className="mt-2">
                    <Celda celda={fila.caldera} />
                  </dd>
                </div>
                <div className="rounded-xl bg-brand-blue/30 p-4">
                  <dt className="text-center font-mono text-xs font-light text-brand-blue-light">
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
    <div className="text-center">
      <p>
        <Nivel celda={celda} className="font-heading text-base" />
      </p>
      <p
        className={`mt-1.5 text-center text-[13px] leading-snug ${destacada ? "text-white/90" : "text-white/70"}`}
      >
        {celda.detalle}
      </p>
    </div>
  );
}
