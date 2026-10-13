import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

type Barra = {
  /** "Antes" o "Ahora". */
  etiqueta: string;
  /** Período facturado, debajo de la etiqueta. */
  periodo: string;
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
  /** Siempre dos barras: antes y ahora. */
  barras: [Barra, Barra];
  /** Si los dos períodos son comparables (mismos meses, años distintos),
   *  se calcula y muestra el % de ahorro. */
  periodosComparables: boolean;
  fuente: string;
};

// Datos del documento del cliente (MKT – Modificaciones 04-10-26 y "Últimos
// detalles WEB" 13/10). Los consumos salen de las facturas de gas de cada
// consorcio. Las direcciones van aproximadas (pedido del cliente).
const casos: Caso[] = [
  {
    id: "mitre-200",
    nombre: "Consorcio Mitre al 200",
    ubicacion: "CABA",
    dato: "120 unidades funcionales",
    antes: "Calderas con tanques acumuladores",
    despues: "2 equipos Sistema Santero, modelo ATSOL-250",
    instalacion: "Instalados en 04/26",
    equipoFoto: "/img/equipos/atsol-2-recorte.jpg",
    equipoAlt: "Dos equipos ATSOL",
    graficoTitulo: "Consumo de gas facturado por período (m³)",
    barras: [
      { etiqueta: "Antes", periodo: "05/25", valor: 19017, momento: "antes" },
      { etiqueta: "Ahora", periodo: "05/26", valor: 10486, momento: "ahora" },
    ],
    periodosComparables: true,
    fuente: "Facturas de gas del consorcio.",
  },
  {
    id: "santa-fe-3900",
    nombre: "Consorcio Santa Fe al 3900",
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
        periodo: "Oct – Dic 2023",
        valor: 6209,
        momento: "antes",
      },
      {
        etiqueta: "Ahora",
        periodo: "Dic 2024 – Feb 2025",
        valor: 2606,
        momento: "ahora",
      },
    ],
    // Pendiente: el "antes" es oct–dic y el "ahora" dic–feb (otra época del
    // año). Hasta tener la factura del mismo bimestre no se muestra el %.
    periodosComparables: false,
    fuente: "Facturas de gas del consorcio.",
  },
];

const formatear = (n: number) => n.toLocaleString("es-AR");

export default function CasosReales() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {casos.map((caso, index) => (
            <Reveal
              key={caso.id}
              delay={index * 0.1}
              className="flex flex-col rounded-2xl border border-steel/20 bg-ink-light p-6 transition-colors duration-300 hover:border-brand-red-light/40 sm:p-8"
            >
              <p className="font-mono text-xs font-light text-white/50">
                {caso.ubicacion} · {caso.dato}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-white">
                {caso.nombre}
              </h3>

              <div className="mt-6 mb-8 grid gap-6 sm:grid-cols-[1fr_auto]">
                <dl className="flex flex-col gap-5">
                  <div>
                    <dt className="font-mono text-xs font-light text-white/50">
                      Antes
                    </dt>
                    <dd className="mt-1 text-sm text-white/80">{caso.antes}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs font-light text-brand-red-light">
                      Con el Sistema Santero
                    </dt>
                    <dd className="mt-1 text-sm text-white">{caso.despues}</dd>
                    {caso.instalacion && (
                      <dd className="mt-1 text-xs text-white/60">
                        {caso.instalacion}
                      </dd>
                    )}
                  </div>
                </dl>

                <div className="relative aspect-[4/3] w-36 overflow-hidden rounded-xl bg-white sm:w-40">
                  <Image
                    src={caso.equipoFoto}
                    alt={caso.equipoAlt}
                    fill
                    sizes="160px"
                    className="object-contain p-2"
                  />
                </div>
              </div>

              {/* El gráfico va pegado abajo: así las barras de los dos casos
                  quedan a la misma altura aunque el texto de arriba difiera. */}
              <figure className="mt-auto flex flex-col border-t border-steel/20 pt-6">
                <figcaption className="font-mono text-xs font-light text-white/60">
                  {caso.graficoTitulo}
                </figcaption>
                <Grafico barras={caso.barras} />
                <Comparacion
                  barras={caso.barras}
                  comparables={caso.periodosComparables}
                />
                <p className="mt-4 text-xs text-white/40">
                  Fuente: {caso.fuente}
                </p>
              </figure>
            </Reveal>
          ))}
        </div>

        <CasoPlanos />
      </div>
    </section>
  );
}

function Grafico({ barras }: { barras: [Barra, Barra] }) {
  const maximo = Math.max(...barras.map((b) => b.valor));

  return (
    <div className="mx-auto mt-6 flex h-56 w-full max-w-xs items-end gap-8">
      {barras.map((barra) => (
        <div
          key={barra.etiqueta}
          className="flex h-full min-w-0 flex-1 flex-col justify-end"
        >
          <span className="mb-2 text-center text-sm font-semibold text-white">
            {formatear(barra.valor)}
          </span>
          <div
            className={`w-full rounded-t-md ${
              barra.momento === "ahora" ? "bg-brand-red" : "bg-white/20"
            }`}
            style={{ height: `${(barra.valor / maximo) * 78}%` }}
          />
          <span className="mt-2 text-center text-xs font-semibold text-white/80">
            {barra.etiqueta}
          </span>
          <span className="min-h-8 text-center text-[11px] text-white/50">
            {barra.periodo}
          </span>
        </div>
      ))}
    </div>
  );
}

// Una sola línea con los dos períodos y, cuando se pueden comparar, el % de
// ahorro calculado con los datos de las propias barras.
function Comparacion({
  barras,
  comparables,
}: {
  barras: [Barra, Barra];
  comparables: boolean;
}) {
  const [antes, ahora] = barras;
  const ahorro = ((antes.valor - ahora.valor) / antes.valor) * 100;

  return (
    <div className="mt-4 flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-brand-red-light/30 bg-ink px-5 py-3">
      <p className="text-sm text-white/80">
        <span className="font-semibold text-white">{antes.periodo}</span> ={" "}
        {formatear(antes.valor)} m³ ·{" "}
        <span className="font-semibold text-white">{ahora.periodo}</span> ={" "}
        {formatear(ahora.valor)} m³
      </p>
      {comparables && (
        <p className="font-heading text-2xl font-semibold text-brand-red-light">
          {ahorro.toLocaleString("es-AR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          % menos
        </p>
      )}
    </div>
  );
}

// Obra de Devoto: el resultado se mide desde los planos (espacio en sala).
function CasoPlanos() {
  return (
    <Reveal className="mt-8 grid items-center gap-6 rounded-2xl border border-steel/20 bg-ink-light p-6 transition-colors duration-300 hover:border-brand-red-light/40 sm:p-8 lg:grid-cols-[1fr_380px] lg:gap-10">
      <div>
        <p className="font-mono text-xs font-light text-white/50">
          CABA · Obra de Devoto
        </p>
        <h3 className="mt-3 font-heading text-2xl font-semibold text-white">
          Una decisión inteligente se mide desde los planos
        </h3>
        <p className="mt-4 text-white/80">
          El Sistema Santero en esta obra de Devoto resolvió una ganancia del
          60% del espacio en sala y un enorme ahorro en equipamiento e
          instalación. Colaboró indirectamente con la resolución del tema
          crítico de la ubicación del generador.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl bg-white">
        <Image
          src="/img/casos/devoto-plano.jpg"
          alt="Plano de detalle de la instalación de climatización de la obra de Devoto"
          width={1299}
          height={519}
          sizes="380px"
          className="h-auto w-full"
        />
      </div>
    </Reveal>
  );
}
