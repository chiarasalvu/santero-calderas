import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="font-heading text-4xl font-light text-white uppercase sm:text-5xl">
            Qué Hacemos
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Soluciones térmicas organizadas por rubro, servicio y producto —
            encontrá la que necesitás para tu proyecto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
