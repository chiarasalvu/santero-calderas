import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-28 pb-16 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Empresas que confían en Calderas Santero
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
            Hoteles, clubes, desarrolladoras e industrias que ya suman el
            Sistema Santero a sus instalaciones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
