import Reveal from "@/components/motion/Reveal";

type Paso = {
  numero: string;
  titulo: string;
  descripcion: string;
};

const pasos: Paso[] = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    descripcion:
      "Relevamos la instalación existente y las necesidades reales de agua caliente, climatización o vapor del proyecto.",
  },
  {
    numero: "02",
    titulo: "Propuesta",
    descripcion:
      "Dimensionamos el sistema de calentamiento indirecto más eficiente para cada escala de negocio.",
  },
  {
    numero: "03",
    titulo: "Instalación",
    descripcion:
      "Supervisamos y ejecutamos el montaje para garantizar un funcionamiento seguro desde el primer día.",
  },
  {
    numero: "04",
    titulo: "Mantenimiento",
    descripcion:
      "Guardia técnica y mantenimiento preventivo para prolongar la vida útil de la instalación.",
  },
];

export default function SistemaSanteroTeaser() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-heading text-sm font-semibold text-brand-red-light uppercase">
            Ingeniería propia. Tecnología avanzada.
          </p>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            Sistema Santero
          </h2>
          <p className="mt-4 max-w-2xl text-white/80">
            Un sistema de calentamiento indirecto que genera agua caliente de
            forma instantánea, sin acumulación y con mínima formación de
            sarro, prolongando la vida útil de las instalaciones y reduciendo
            el consumo energético.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, index) => (
            <li key={paso.numero}>
              <Reveal
                delay={Math.min(index * 0.08, 0.4)}
                className="h-full rounded-2xl border border-transparent bg-ink-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
              >
                <span className="font-heading text-3xl font-semibold text-brand-red-light">
                  {paso.numero}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                  {paso.titulo}
                </h3>
                <p className="mt-2 text-sm text-white/70">{paso.descripcion}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
