import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { columnasComparativa, filasComparativa } from "@/data/comparativa";

export default function SistemaSanteroTeaser() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-heading text-sm font-semibold text-brand-red-light">
            Ingeniería propia. Tecnología avanzada.
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-heading text-3xl font-semibold text-white sm:text-4xl">
              Sistema Santero
            </h2>
            <Link
              href="/sistema-santero"
              className="group/link flex items-center gap-1 font-mono text-xs font-light text-brand-red-light transition-colors hover:text-white"
            >
              Conocer el sistema
              <span
                className="transition-transform duration-200 group-hover/link:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-white/80">
            Un sistema de calentamiento indirecto que genera agua caliente de
            forma instantánea, sin acumulación y con mínima formación de
            sarro, prolongando la vida útil de las instalaciones y reduciendo
            el consumo energético.
          </p>
        </Reveal>

        {/* Cuadro comparativo resumido (el completo está en /sistema-santero). */}
        <Reveal
          delay={0.1}
          className="mt-12 overflow-x-auto rounded-2xl border border-steel/20 bg-ink-light"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-steel/20">
                <th
                  scope="col"
                  className="p-4 font-mono text-xs font-light text-white/50 sm:p-5"
                >
                  Variable de análisis
                </th>
                <th
                  scope="col"
                  className="p-4 text-center font-heading text-sm font-semibold text-white/80 sm:p-5"
                >
                  {columnasComparativa.termotanque}
                </th>
                <th
                  scope="col"
                  className="p-4 text-center font-heading text-sm font-semibold text-white/80 sm:p-5"
                >
                  {columnasComparativa.caldera}
                </th>
                <th
                  scope="col"
                  className="bg-brand-red/10 p-4 text-center font-heading text-sm font-semibold text-brand-red-light sm:p-5"
                >
                  {columnasComparativa.santero}
                </th>
              </tr>
            </thead>
            <tbody>
              {filasComparativa.map((fila) => (
                <tr
                  key={fila.id}
                  className="border-b border-steel/10 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="p-4 text-sm font-semibold text-white sm:p-5"
                  >
                    {fila.variable}
                  </th>
                  <td className="p-4 text-center text-sm text-white/70 sm:p-5">
                    <Resumen celda={fila.termotanque} />
                  </td>
                  <td className="p-4 text-center text-sm text-white/70 sm:p-5">
                    <Resumen celda={fila.caldera} />
                  </td>
                  <td className="bg-brand-red/10 p-4 text-center text-sm font-semibold text-white sm:p-5">
                    <Resumen celda={fila.santero} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Link
          href="/sistema-santero#comparativa"
          className="group/link mt-6 inline-flex items-center gap-1 font-mono text-xs font-light text-brand-red-light transition-colors hover:text-white"
        >
          Ver la comparativa completa
          <span
            className="transition-transform duration-200 group-hover/link:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

function Resumen({
  celda,
}: {
  celda: { nivel: string; valor?: string };
}) {
  return (
    <>
      {celda.nivel}
      {celda.valor && (
        <span className="block text-xs font-normal text-white/50">
          {celda.valor}
        </span>
      )}
    </>
  );
}
