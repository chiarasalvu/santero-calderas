import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-5xl">
            Soporte Técnico &amp; FAQs
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Respuestas claras a las consultas técnicas más habituales sobre
            nuestros equipos e instalaciones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
