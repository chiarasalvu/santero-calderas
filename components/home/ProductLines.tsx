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
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Productos Principales
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Las dos líneas de generación de agua caliente que respaldan el
          Sistema Santero.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {lineas.map((linea) => (
            <div key={linea.id} className="overflow-hidden rounded-2xl bg-white">
              <div className="bg-gradient-to-br from-navy to-sky px-6 py-6">
                <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                  {linea.badge}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-white">
                  {linea.nombre}
                </h3>
                <p className="mt-1 text-sm text-white/80">{linea.subtitulo}</p>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-zinc-600">
                  {linea.descripcion}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {linea.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-zinc-700"
                    >
                      <span className="mt-0.5 shrink-0 text-sky">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
