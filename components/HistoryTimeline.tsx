import Reveal from "@/components/motion/Reveal";

type HitoHistoria = {
  id: string;
  anio: string;
  titulo: string;
  descripcion: string;
};

const historia: HitoHistoria[] = [
  {
    id: "1935",
    anio: "1935",
    titulo: "Fundación de Calderas Santero",
    descripcion:
      "Empresa familiar fundada por Don Francisco Santero, dedicada exclusivamente a la fabricación de calderas de vapor y reparación de equipamiento textil.",
  },
  {
    id: "1955",
    anio: "1955",
    titulo: "Sucesores",
    descripcion:
      "Con mucha dedicación y pasión al trabajo, Nicolás O. Santero y Héctor F. Santero continuaron el desarrollo de la empresa iniciada por su padre.",
  },
  {
    id: "anios-70",
    anio: "Años 70",
    titulo: "Una nueva etapa",
    descripcion:
      "En manos de Juan Carlos Santero incorpora sistemas de provisión de agua caliente y calefacción central, ampliando la oferta de la compañía.",
  },
  {
    id: "anios-90",
    anio: "Años 90",
    titulo: "Sistema Santero",
    descripcion:
      "Se diseña y patenta un sistema innovador de alta eficiencia energética y generación instantánea de agua caliente. Una revolución que rompió con los paradigmas de los sistemas tradicionales y colocó a la empresa en la elite de los productos nacionales y del Mercosur.",
  },
  {
    id: "hoy",
    anio: "Hoy",
    titulo: "Cuarta generación",
    descripcion:
      "Carlos Larralde y Matías Simó continúan el legado incorporando nuevas tecnologías y manteniendo el compromiso con la mejora continua.",
  },
];

type HistoryTimelineProps = {
  tone?: "light" | "dark";
};

export default function HistoryTimeline({ tone = "light" }: HistoryTimelineProps) {
  const dark = tone === "dark";

  return (
    <section className={`px-6 py-20 sm:py-28 ${dark ? "bg-ink" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            className={`font-heading text-2xl sm:text-3xl ${dark ? "text-white" : "text-navy"}`}
          >
            Somos más que una compañía.
            <br />
            Somos{" "}
            <span className="font-bold">
              trayectoria, tecnología, compromiso y mejora constante
            </span>
            .
          </h2>
        </Reveal>

        <ol className="relative mt-16 flex flex-col gap-10 sm:gap-16">
          <div
            className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-brand-red/30 sm:block"
            aria-hidden
          />

          {historia.map((hito, index) => {
            const cardOnRight = index % 2 === 0;

            return (
              <li
                key={hito.id}
                className="relative flex flex-col items-center gap-2 sm:flex-row sm:gap-12"
              >
                <span
                  className={`font-heading text-lg font-bold tracking-wide uppercase sm:flex-1 sm:text-5xl sm:font-normal sm:tracking-normal sm:normal-case lg:text-6xl ${
                    dark
                      ? "text-brand-red-light sm:text-brand-red-light"
                      : "text-brand-red sm:text-brand-red/50"
                  } ${
                    cardOnRight
                      ? "sm:order-1 sm:text-right"
                      : "sm:order-3 sm:text-left"
                  }`}
                >
                  {hito.anio}
                </span>

                <span className="relative z-10 hidden h-3.5 w-3.5 shrink-0 rounded-full bg-brand-red sm:order-2 sm:block" />

                <div
                  className={`w-full sm:flex sm:flex-1 sm:items-center ${
                    cardOnRight
                      ? "sm:order-3 sm:justify-start"
                      : "sm:order-1 sm:justify-end"
                  }`}
                >
                  <Reveal delay={Math.min(index * 0.08, 0.4)}>
                    <TimelineCard hito={hito} dark={dark} />
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TimelineCard({ hito, dark }: { hito: HitoHistoria; dark: boolean }) {
  return (
    <div
      className={`w-full max-w-md rounded-2xl p-6 ${dark ? "bg-ink-light" : "bg-cream-card"}`}
    >
      <h3
        className={`font-heading text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}
      >
        {hito.titulo}
      </h3>
      <p className={`mt-2 text-sm ${dark ? "text-white/70" : "text-zinc-600"}`}>
        {hito.descripcion}
      </p>
    </div>
  );
}
