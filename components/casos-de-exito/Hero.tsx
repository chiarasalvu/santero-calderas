import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-28 pb-16 sm:pt-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-5xl">
            Casos de Éxito
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Resultados reales en la implementación de sistemas de alta
            eficiencia térmica, en cada sector donde trabajamos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
