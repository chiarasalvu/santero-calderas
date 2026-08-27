import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-8 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="font-heading text-4xl font-light text-white uppercase sm:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Acompañamos cada proyecto desde la planificación técnica hasta el
            funcionamiento diario del sistema, garantizando la máxima
            eficiencia operativa.
          </p>
          <span
            className="mx-auto mt-8 block h-0.5 w-16 bg-brand-red"
            aria-hidden
          />
        </Reveal>
      </div>
    </section>
  );
}
