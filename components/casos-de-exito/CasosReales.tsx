import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

type Barra = {
  etiqueta: string;
  /** Texto debajo de la etiqueta (período). */
  detalle?: string;
  valor: number;
};

type Caso = {
  id: string;
  nombre: string;
  ubicacion: string;
  dato: string;
  antes: string;
  despues: string;
  equipoFoto: string;
  equipoAlt: string;
  graficoTitulo: string;
  barras: Barra[];
  /** Si es true, la última barra se resalta (es la más reciente). */
  resaltarUltima: boolean;
  fuente: string;
};

// Datos del documento del cliente (MKT – Modificaciones 04-10-26). Los
// consumos salen de las facturas de gas de cada consorcio.
const casos: Caso[] = [
  {
    id: "mitre-259",
    nombre: "Consorcio Mitre 259",
    ubicacion: "CABA",
    dato: "120 unidades funcionales",
    antes: "Calderas con tanques acumuladores",
    despues: "2 equipos ATSOL-250",
    equipoFoto: "/img/equipos/atsol.jpg",
    equipoAlt: "Equipo ATSOL",
    graficoTitulo: "Consumo de gas facturado por período (m³)",
    barras: [
      { etiqueta: "05/25", valor: 19017 },
      { etiqueta: "06/25", valor: 17859 },
      { etiqueta: "01/26", valor: 16446 },
      { etiqueta: "02/26", valor: 13494 },
      { etiqueta: "03/26", valor: 15040 },
      { etiqueta: "04/26", valor: 9986 },
      { etiqueta: "05/26", valor: 10486 },
    ],
    resaltarUltima: true,
    fuente: "Facturas de gas del consorcio.",
  },
  {
    id: "santa-fe-3942",
    nombre: "Consorcio Av. Santa Fe 3942",
    ubicacion: "CABA",
    dato: "54 departamentos",
    antes: "Termotanque de acumulación de 3.000 litros",
    despues: "1 equipo ATSOL-175",
    equipoFoto: "/img/equipos/atsol.jpg",
    equipoAlt: "Equipo ATSOL",
    graficoTitulo: "Consumo de gas facturado por bimestre (m³)",
    barras: [
      {
        etiqueta: "Antes",
        detalle: "Oct – Dic 2023",
        valor: 6209,
      },
      {
        etiqueta: "Después",
        detalle: "Dic 2024 – Feb 2025",
        valor: 2606,
      },
    ],
    resaltarUltima: true,
    fuente: "Facturas de gas del consorcio.",
  },
];

const formatear = (n: number) => n.toLocaleString("es-AR");

export default function CasosReales() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Consorcios
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Edificios que modernizaron su sistema
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8">
          {casos.map((caso) => (
            <Reveal
              key={caso.id}
              className="grid gap-8 rounded-2xl border border-steel/20 bg-ink-light p-6 transition-colors duration-300 hover:border-brand-red-light/40 sm:p-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className="flex flex-col">
                <p className="font-mono text-xs font-light text-white/50">
                  {caso.ubicacion} · {caso.dato}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-white">
                  {caso.nombre}
                </h3>

                <dl className="mt-6 flex flex-col gap-5">
                  <div>
                    <dt className="font-mono text-xs font-light text-white/50">
                      Antes
                    </dt>
                    <dd className="mt-1 text-white/80">{caso.antes}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs font-light text-brand-red-light">
                      Con el Sistema Santero
                    </dt>
                    <dd className="mt-1 text-white">{caso.despues}</dd>
                  </div>
                </dl>

                <div className="relative mt-8 aspect-[4/3] w-40 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={caso.equipoFoto}
                    alt={caso.equipoAlt}
                    fill
                    sizes="160px"
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <figure className="flex flex-col">
                <figcaption className="font-mono text-xs font-light text-white/60">
                  {caso.graficoTitulo}
                </figcaption>
                <Grafico
                  barras={caso.barras}
                  resaltarUltima={caso.resaltarUltima}
                />
                <p className="mt-4 text-xs text-white/40">
                  Fuente: {caso.fuente}
                </p>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Grafico({
  barras,
  resaltarUltima,
}: {
  barras: Barra[];
  resaltarUltima: boolean;
}) {
  const maximo = Math.max(...barras.map((b) => b.valor));

  return (
    <div className="mt-6 flex h-72 items-end gap-3 sm:gap-4">
      {barras.map((barra, index) => {
        const destacada = resaltarUltima && index === barras.length - 1;
        return (
          <div
            key={barra.etiqueta}
            className="flex h-full min-w-0 flex-1 flex-col justify-end"
          >
            <span className="mb-2 text-center text-xs font-semibold text-white sm:text-sm">
              {formatear(barra.valor)}
            </span>
            <div
              className={`w-full rounded-t-md ${
                destacada ? "bg-brand-red" : "bg-white/20"
              }`}
              style={{ height: `${(barra.valor / maximo) * 78}%` }}
            />
            <span className="mt-2 text-center text-xs text-white/70">
              {barra.etiqueta}
            </span>
            <span className="min-h-8 text-center text-[11px] text-white/40">
              {barra.detalle}
            </span>
          </div>
        );
      })}
    </div>
  );
}
