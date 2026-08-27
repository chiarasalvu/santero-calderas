import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Preguntas frecuentes
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Respuestas claras a las consultas técnicas más habituales sobre
            nuestros equipos e instalaciones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
