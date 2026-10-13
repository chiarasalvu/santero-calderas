import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

const caracteristicas = [
  {
    id: "eficiencia",
    titulo: "Alta eficiencia energética",
    descripcion:
      "La transferencia térmica interna de uno o más circuitos de agua optimiza al máximo la energía consumida. Evita el exceso de equipamiento, bombas y acumuladores, reduciendo los costos de inversión y operativos, y mejorando el rendimiento general de la instalación.",
  },
  {
    id: "instantanea",
    titulo: "Agua caliente instantánea",
    descripcion:
      "El sistema genera agua caliente en el momento exacto de la demanda, evitando grandes acumulaciones, costos de mantenimiento y consumo innecesario. De esta manera, garantiza una disponibilidad constante e ininterrumpida para instalaciones de alta exigencia.",
  },
  {
    id: "mantenimiento",
    titulo: "Menor sarro y mantenimiento",
    descripcion:
      "La reducción de sarro es reflejo directo de su sistema de calentamiento indirecto y su baja temperatura de operación. El diseño del equipo contribuye a disminuir las intervenciones correctivas y las tareas de mantenimiento, como el cambio de ánodos, repintados y purgas continuas.",
  },
  {
    id: "espacio",
    titulo: "Optimización de espacio en sala",
    descripcion:
      "Basado en una ingeniería AIO (All In One), el sistema ofrece la mayor prestación térmica en la menor huella de espacio posible. Esta es una ventaja competitiva clave respecto a los sistemas tradicionales de acumulación. El abastecimiento multicircuito desde un mismo núcleo representa verdadera innovación y eficiencia operacional.",
  },
];

export default function Overview() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Ingeniería propia. Tecnología avanzada.
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Beneficios del Sistema
          </h2>
          <p className="mt-6 max-w-5xl text-justify text-lg leading-relaxed text-white/70">
            El Sistema Santero utiliza un sistema de calentamiento indirecto que
            genera agua caliente de forma instantánea, sin acumulación y con
            mínima formación de sarro, prolongando la vida útil de las
            instalaciones y reduciendo el consumo energético.
          </p>
        </Reveal>

        {/* La foto va apaisada (se ven las 3 calderas completas) y los
            textos la envuelven: los tres primeros beneficios a su lado y
            el último debajo de la imagen, a todo el ancho. */}
        <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal
            delay={0.1}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white"
          >
            <Image
              src="/img/generales/atsol-500-river.jpg"
              alt="Sala de máquinas con tres equipos ATSOL 500 (proyecto River)"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div className="flex flex-col justify-between gap-8">
            {caracteristicas.slice(0, 3).map((item, index) => (
              <Beneficio key={item.id} item={item} index={index} />
            ))}
          </div>

          <div className="lg:col-span-2">
            {caracteristicas.slice(3).map((item) => (
              <Beneficio key={item.id} item={item} index={3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Beneficio({
  item,
  index,
}: {
  item: (typeof caracteristicas)[number];
  index: number;
}) {
  return (
    <Reveal delay={Math.min(index * 0.08, 0.3)} className="flex gap-4">
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
        <p className="mt-1 text-justify text-sm text-white/60">
          {item.descripcion}
        </p>
      </div>
    </Reveal>
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
