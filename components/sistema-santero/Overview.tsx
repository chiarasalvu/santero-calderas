import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

const caracteristicas = [
  {
    id: "sarro",
    titulo: "Menor formación de sarro",
    descripcion:
      "Al trabajar mediante calentamiento indirecto y sin acumulación permanente de agua caliente, se reducen significativamente las incrustaciones calcáreas que afectan el rendimiento de los equipos convencionales.",
  },
  {
    id: "eficiencia",
    titulo: "Alta eficiencia energética",
    descripcion:
      "La transferencia térmica optimizada permite generar agua caliente sanitaria con un menor consumo de energía, reduciendo costos operativos y mejorando el rendimiento general de la instalación.",
  },
  {
    id: "instantanea",
    titulo: "Agua caliente instantánea",
    descripcion:
      "El sistema genera agua caliente en el momento de la demanda, evitando grandes acumulaciones y garantizando disponibilidad constante para instalaciones de alto consumo.",
  },
  {
    id: "mantenimiento",
    titulo: "Menor necesidad de mantenimiento",
    descripcion:
      "La reducción de sarro y el diseño del sistema contribuyen a disminuir intervenciones correctivas y tareas de mantenimiento a lo largo del tiempo.",
  },
];

export default function Overview() {
  return (
    <section className="border-b border-steel/20 bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
            Ingeniería Propia. Tecnología Avanzada.
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            Sistema Santero
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            El Sistema Santero utiliza un sistema de calentamiento indirecto
            que genera agua caliente de forma instantánea, sin acumulación y
            con mínima formación de sarro, prolongando la vida útil de las
            instalaciones y reduciendo el consumo energético.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Reveal
            delay={0.1}
            className="aspect-square w-full rounded-2xl border border-steel/20 bg-ink-light p-3"
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-ink">
              <Image
                src="/img/generales/caldera-8.png"
                alt="Detalle del equipo del Sistema Santero"
                fill
                className="object-contain p-6"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            {caracteristicas.map((item, index) => (
              <Reveal
                key={item.id}
                delay={Math.min(index * 0.08, 0.3)}
                className="flex gap-4"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red-light"
                  aria-hidden
                >
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {item.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    {item.descripcion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
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
