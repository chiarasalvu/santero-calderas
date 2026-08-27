import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Casos de éxito
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Resultados reales en la implementación de sistemas de alta
            eficiencia térmica, en cada sector donde trabajamos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
