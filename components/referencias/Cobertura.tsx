import Reveal from "@/components/motion/Reveal";

export default function Cobertura() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
            Cobertura
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            Dónde trabajamos
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 overflow-hidden rounded-2xl border border-steel/20"
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-video">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1wYo9zjKffmKzjFCTp1tx6CwJ5PYs60gA&ehbc=2E312F"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de cobertura de Calderas Santero"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
