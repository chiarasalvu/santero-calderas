import Reveal from "@/components/motion/Reveal";

const valores = [
  "Honestidad y transparencia",
  "Calidad y excelencia",
  "Pasión y responsabilidad",
  "Desarrollo y colaboración",
];

export default function MissionVisionValues() {
  return (
    <section className="bg-navy px-6 pb-20">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
        <Reveal className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-semibold text-navy">Misión</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Diseñar, fabricar e implementar soluciones térmicas eficientes de agua
            caliente, climatización y vapor, acompañando a nuestros clientes
            con ingeniería especializada, asesoramiento técnico y soporte
            continuo en cada etapa del proyecto para asegurar máxima
            confiabilidad y sostenibilidad.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-semibold text-navy">Visión</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Liderar el futuro de la climatización para grandes demandas en
            Argentina y la región a través del Sistema Santero, elevando la
            vara del mercado e impulsando la transición hacia infraestructuras
            más eficientes, innovadoras y sustentables.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-semibold text-navy">
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
        </Reveal>
      </div>
    </section>
  );
}
