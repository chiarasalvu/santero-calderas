import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mt-6 max-w-xl text-white/80">
            Acompañamos cada proyecto desde la planificación técnica hasta el
            funcionamiento diario del sistema, garantizando la máxima
            eficiencia operativa.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="aspect-square rounded-2xl bg-white p-4 shadow-xl">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src="/img/generales/trabajo-3.png"
              alt="Equipo técnico de Calderas Santero trabajando"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
