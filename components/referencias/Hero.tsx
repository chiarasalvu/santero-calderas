import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-5xl">
            Confianza Forjada en Acero
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Empresas que ya confían en el Sistema Santero para su operación
            diaria — hoteles, clubes, desarrolladoras e industrias en toda la
            Argentina.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
