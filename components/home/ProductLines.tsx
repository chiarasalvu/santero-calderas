import Reveal from "@/components/motion/Reveal";

type LineaProducto = {
  id: string;
  nombre: string;
  badge: string;
  subtitulo: string;
  descripcion: string;
  bullets: string[];
};

const lineas: LineaProducto[] = [
  {
    id: "atsol",
    nombre: "ATSOL",
    badge: "Premium",
    subtitulo: "Alta eficiencia con quemadores de modulación",
    descripcion:
      "Circuito cerrado primario con tecnología acuotubular. Serpentinas de acero inoxidable intercambiables para múltiples servicios simultáneos. Ideal para proyectos de gran escala.",
    bullets: [
      "Sin acumulación — sin termotanques ni tanques intermediarios",
      "Mantenimiento casi nulo — sin ánodos, sin purgas, sin repintados",
      "Abastece distintas presiones y circuitos independientes",
      "Reduce el consumo de gas hasta un 30%",
      "Múltiples servicios desde un solo equipo",
    ],
  },
  {
    id: "adn",
    nombre: "ADN",
    badge: "Relación precio-calidad",
    subtitulo: "Ideal para reemplazar termotanques industriales",
    descripcion:
      'Nace de la excelencia técnica del ATSOL, adaptada para proyectos que buscan equilibrio entre precio y calidad. Reemplaza termotanques de 300 a 1.000 litros o climatizadores de piscina convencionales.',
    bullets: [
      'Protección "baño maría" — igual que la línea premium',
      "Sin piloto permanente — encendido electrónico por demanda",
      "Sistema compacto — adapta a normativas vigentes de salas de máquinas",
      "Elimina gastos fijos de mantenimiento tradicional",
      "Control digital integrado",
    ],
  },
];

export default function ProductLines() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Productos Principales
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Las dos líneas de generación de agua caliente que respaldan el
            Sistema Santero.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {lineas.map((linea, index) => (
            <Reveal
              key={linea.id}
              delay={index * 0.1}
              className="group rounded-2xl border border-steel/20 bg-ink-light p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
            >
              <span className="inline-block rounded-full bg-brand-red/20 px-3 py-1 font-mono text-[10px] font-medium tracking-widest text-brand-red-light uppercase">
                {linea.badge}
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold text-white">
                {linea.nombre}
              </h3>
              <p className="mt-1 text-sm font-medium text-white/80">
                {linea.subtitulo}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {linea.descripcion}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {linea.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light transition-transform duration-300 group-hover:scale-110"
                      aria-hidden
                    >
                      <CheckIcon />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
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
