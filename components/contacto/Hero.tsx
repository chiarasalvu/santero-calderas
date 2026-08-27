import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-28 pb-8 sm:pt-32 sm:pb-10 lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
            Escribinos y te respondemos a la brevedad. Nuestro equipo técnico
            está listo para asesorarte en tu próximo proyecto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
