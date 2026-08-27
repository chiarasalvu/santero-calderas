import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-8 sm:pt-40 sm:pb-10 lg:pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Contacto
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            Escribinos y te respondemos a la brevedad. Nuestro equipo técnico
            está listo para asesorarte en tu próximo proyecto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
