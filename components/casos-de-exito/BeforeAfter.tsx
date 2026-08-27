import Reveal from "@/components/motion/Reveal";

const antes = [
  "Termotanques tradicionales con alta pérdida térmica pasiva.",
  "Roturas frecuentes por incrustación de sarro en el sistema.",
  "Falta de suministro constante en picos de demanda simultánea.",
];

const despues = [
  "Sistema Santero con generación instantánea por calentamiento indirecto.",
  "Calentamiento indirecto que aísla el agua de consumo, reduciendo el sarro.",
  "Recuperación rápida y bajo mantenimiento, con rendimientos de hasta 98%.",
];

export default function BeforeAfter() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light uppercase">
            Análisis Técnico
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl">
            Antes y después del Sistema Santero
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Reveal className="rounded-2xl border border-steel/20 bg-ink-light p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/30">
            <p className="font-mono text-xs font-light text-white/50 uppercase">
              Antes
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {antes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span className="mt-0.5 text-white/40" aria-hidden>
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-2xl border border-brand-red-light/20 bg-ink-light p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/50"
          >
            <p className="font-mono text-xs font-light text-brand-red-light uppercase">
              Después: Sistema Santero
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {despues.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/90"
                >
                  <span className="mt-0.5 text-brand-red-light" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
