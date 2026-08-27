import Reveal from "@/components/motion/Reveal";

const testimonios = [1, 2, 3];

export default function Testimonials() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
            Testimonios
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            Lo que dicen nuestros clientes
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonios.map((id, index) => (
            <Reveal
              key={id}
              delay={Math.min(index * 0.1, 0.3)}
              className="flex flex-col justify-between rounded-2xl border border-steel/20 bg-ink-light p-8"
            >
              <p className="text-sm text-white/60 italic">
                &ldquo;Espacio reservado para un testimonio real de un
                cliente — a completar.&rdquo;
              </p>
              <p className="mt-6 font-mono text-xs font-medium tracking-widest text-white/40 uppercase">
                Nombre del cliente — Cargo, Empresa
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Sección de ejemplo — pendiente de reemplazar con testimonios reales
          de clientes.
        </p>
      </div>
    </section>
  );
}
