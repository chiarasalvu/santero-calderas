import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

type Barra = {
  etiqueta: string;
  /** Texto debajo de la etiqueta (período). */
  detalle?: string;
  valor: number;
  /** "antes" del equipo Santero (gris) o "ahora" con el Sistema Santero (rojo). */
  momento: "antes" | "ahora";
};

type Caso = {
  id: string;
  nombre: string;
  ubicacion: string;
  dato: string;
  antes: string;
  despues: string;
  /** Cuándo se instaló (se muestra bajo "Con el Sistema Santero"). */
  instalacion?: string;
  equipoFoto: string;
  equipoAlt: string;
  graficoTitulo: string;
  barras: Barra[];
  /** Comparación destacada entre dos barras (por etiqueta). */
  comparacion?: { desde: string; hasta: string };
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
    despues: "2 equipos Sistema Santero, modelo ATSOL-250",
    instalacion: "Instalados en 04/26",
    equipoFoto: "/img/equipos/atsol-2-recorte.jpg",
    equipoAlt: "Dos equipos ATSOL",
    graficoTitulo: "Consumo de gas facturado por período (m³)",
    barras: [
      { etiqueta: "05/25", valor: 19017, momento: "antes" },
      { etiqueta: "06/25", valor: 17859, momento: "antes" },
      { etiqueta: "01/26", valor: 16446, momento: "antes" },
      { etiqueta: "02/26", valor: 13494, momento: "antes" },
      { etiqueta: "03/26", valor: 15040, momento: "antes" },
      { etiqueta: "04/26", valor: 9986, momento: "ahora" },
      { etiqueta: "05/26", valor: 10486, momento: "ahora" },
    ],
    comparacion: { desde: "05/25", hasta: "05/26" },
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
        momento: "antes",
      },
      {
        etiqueta: "Después",
        detalle: "Dic 2024 – Feb 2025",
        valor: 2606,
        momento: "ahora",
      },
    ],
    fuente: "Facturas de gas del consorcio.",
  },
];

const formatear = (n: number) => n.toLocaleString("es-AR");

export default function CasosReales() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8">
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
                    {caso.instalacion && (
                      <dd className="mt-1 text-sm text-white/60">
                        {caso.instalacion}
                      </dd>
                    )}
                  </div>
                </dl>

                <div className="relative mt-8 aspect-[4/3] w-56 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={caso.equipoFoto}
                    alt={caso.equipoAlt}
                    fill
                    sizes="224px"
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <figure className="flex flex-col">
                <figcaption className="font-mono text-xs font-light text-white/60">
                  {caso.graficoTitulo}
                </figcaption>
                <Grafico barras={caso.barras} />
                <Leyenda />
                {caso.comparacion && (
                  <Comparacion barras={caso.barras} {...caso.comparacion} />
                )}
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

function Grafico({ barras }: { barras: Barra[] }) {
  const maximo = Math.max(...barras.map((b) => b.valor));

  return (
    <div className="mt-6 flex h-72 items-end gap-3 sm:gap-4">
      {barras.map((barra) => (
        <div
          key={barra.etiqueta}
          className="flex h-full min-w-0 flex-1 flex-col justify-end"
        >
          <span className="mb-2 text-center text-xs font-semibold text-white sm:text-sm">
            {formatear(barra.valor)}
          </span>
          <div
            className={`w-full rounded-t-md ${
              barra.momento === "ahora" ? "bg-brand-red" : "bg-white/20"
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
      ))}
    </div>
  );
}

// Aclara qué significa cada color: gris = antes, rojo = con el Sistema Santero.
function Leyenda() {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm bg-white/20" aria-hidden />
        Antes
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm bg-brand-red" aria-hidden />
        Ahora, con el Sistema Santero
      </span>
    </div>
  );
}

// Compara el mismo mes de dos años y calcula la reducción con los datos de
// las propias barras.
function Comparacion({
  barras,
  desde,
  hasta,
}: {
  barras: Barra[];
  desde: string;
  hasta: string;
}) {
  const antes = barras.find((b) => b.etiqueta === desde);
  const ahora = barras.find((b) => b.etiqueta === hasta);
  if (!antes || !ahora) return null;

  const ahorro = ((antes.valor - ahora.valor) / antes.valor) * 100;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-red-light/30 bg-ink px-5 py-4">
      <p className="text-sm text-white/80">
        <span className="font-semibold text-white">{desde}</span> ={" "}
        {formatear(antes.valor)} m³ ·{" "}
        <span className="font-semibold text-white">{hasta}</span> ={" "}
        {formatear(ahora.valor)} m³
      </p>
      <p className="font-heading text-2xl font-semibold text-brand-red-light">
        {ahorro.toLocaleString("es-AR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}
        % menos
      </p>
    </div>
  );
}
