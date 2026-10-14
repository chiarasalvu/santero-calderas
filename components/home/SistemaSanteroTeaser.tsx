import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Nivel from "@/components/comparativa/Nivel";
import {
  columnasComparativa,
  filasComparativa,
  type CeldaComparativa,
} from "@/data/comparativa";

export default function SistemaSanteroTeaser() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-heading text-sm font-semibold text-brand-red-light">
            Ingeniería propia. Tecnología avanzada.
          </p>
          <div className="mt-4 flex flex-col items-start gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
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

        {/* Cuadro comparativo resumido (el completo está en /sistema-santero).
            En escritorio es una tabla; en mobile cada variable pasa a una
            fila con los tres sistemas en columnas, así no hay scroll al
            costado. */}
        <Reveal
          delay={0.1}
          className="mt-12 hidden overflow-hidden rounded-2xl border border-white/15 bg-ink-elevated md:block"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/15">
                <th scope="col" className="p-5 text-sm font-bold text-white">
                  Variable de análisis
                </th>
                <th
                  scope="col"
                  className="p-5 text-center font-heading text-sm font-semibold text-white/80"
                >
                  {columnasComparativa.termotanque}
                </th>
                <th
                  scope="col"
                  className="p-5 text-center font-heading text-sm font-semibold text-white/80"
                >
                  {columnasComparativa.caldera}
                </th>
                <th
                  scope="col"
                  className="bg-brand-blue/30 p-5 text-center font-heading text-sm font-semibold text-brand-blue-light"
                >
                  {columnasComparativa.santero}
                </th>
              </tr>
            </thead>
            <tbody>
              {filasComparativa.map((fila) => (
                <tr
                  key={fila.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <th scope="row" className="p-5 text-sm font-bold text-white">
                    {fila.variable}
                  </th>
                  <td className="p-5 text-center text-sm">
                    <Resumen celda={fila.termotanque} />
                  </td>
                  <td className="p-5 text-center text-sm">
                    <Resumen celda={fila.caldera} />
                  </td>
                  <td className="bg-brand-blue/30 p-5 text-center text-sm">
                    <Resumen celda={fila.santero} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-12 overflow-hidden rounded-2xl border border-white/15 bg-ink-elevated md:hidden"
        >
          {filasComparativa.map((fila) => (
            <div
              key={fila.id}
              className="border-b border-white/10 p-4 last:border-b-0"
            >
              <p className="text-sm font-bold text-white">{fila.variable}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Mini
                  titulo={columnasComparativa.termotanque}
                  celda={fila.termotanque}
                />
                <Mini
                  titulo={columnasComparativa.caldera}
                  celda={fila.caldera}
                />
                <Mini
                  titulo={columnasComparativa.santero}
                  celda={fila.santero}
                  destacada
                />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Resumen({ celda }: { celda: CeldaComparativa }) {
  return <Nivel celda={celda} />;
}

function Mini({
  titulo,
  celda,
  destacada,
}: {
  titulo: string;
  celda: CeldaComparativa;
  destacada?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-lg px-1 py-2 ${
        destacada ? "bg-brand-blue/30" : ""
      }`}
    >
      <p
        className={`text-[10px] leading-tight ${
          destacada ? "text-brand-blue-light" : "text-white/60"
        }`}
      >
        {titulo}
      </p>
      <p className="mt-2 text-sm">
        <Nivel celda={celda} />
      </p>
    </div>
  );
}
