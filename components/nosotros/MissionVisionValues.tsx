const valores = [
  "Acompañamiento",
  "Compromiso",
  "Innovación",
  "Calidad",
  "Cercanía",
  "Soluciones a medida",
];

export default function MissionVisionValues() {
  return (
    <section className="bg-navy px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-bold text-navy">Misión</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Diseñar, fabricar e implementar soluciones térmicas eficientes que
            garanticen agua caliente sanitaria de manera confiable y
            sostenible, acompañando a cada cliente con asesoramiento técnico,
            ingeniería especializada y soporte en todas las etapas del
            proyecto.
          </p>
        </div>

        <div className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-bold text-navy">Visión</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Ser la empresa referente en soluciones de agua caliente sanitaria
            para grandes demandas, reconocida por la innovación de su Sistema
            Santero, la calidad de sus equipos y el compromiso técnico con
            cada proyecto en Argentina y la región.
          </p>
        </div>

        <div className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-bold text-navy">
            Valores
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
            {valores.map((valor) => (
              <li key={valor} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                {valor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
