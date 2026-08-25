type LineaTeaser = {
  id: string;
  nombre: string;
  badge: string;
  subtitulo: string;
  descripcion: string;
  bullets: string[];
};

const lineas: LineaTeaser[] = [
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

export default function SistemaSanteroTeaser() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-navy p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
          <div>
            <p className="font-heading text-sm leading-tight font-semibold tracking-wide text-brand-red uppercase">
              Ingeniería propia.
              <br />
              Tecnología avanzada.
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-white">
              Sistema Santero
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              El Sistema Santero utiliza un sistema de calentamiento
              indirecto que genera agua caliente de forma instantánea, sin
              acumulación y con mínima formación de sarro, prolongando la
              vida útil de las instalaciones y reduciendo el consumo
              energético.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {lineas.map((linea) => (
              <div
                key={linea.id}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <div className="bg-gradient-to-br from-navy to-sky px-4 py-4">
                  <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                    {linea.badge}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-white">
                    {linea.nombre}
                  </h3>
                  <p className="mt-1 text-xs text-white/80">
                    {linea.subtitulo}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs leading-relaxed text-zinc-600">
                    {linea.descripcion}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {linea.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-1.5 text-xs text-zinc-700"
                      >
                        <span className="mt-0.5 shrink-0 text-sky">
                          ✓
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
