import Reveal from "@/components/motion/Reveal";

const testimonios = [1, 2, 3];

export default function Testimonials() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Testimonios
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonios.map((id, index) => (
            <Reveal
              key={id}
              delay={Math.min(index * 0.1, 0.3)}
              className="flex flex-col justify-between rounded-2xl border border-steel/20 bg-ink-light p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
            >
              <p className="text-sm text-white/60 italic">
                &ldquo;Espacio reservado para un testimonio real de un
                cliente — a completar.&rdquo;
              </p>
              <p className="mt-6 font-mono text-xs font-light text-white/40">
                Nombre del cliente — cargo, empresa
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
