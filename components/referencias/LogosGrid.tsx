import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { type Segmento, type SegmentoLogo } from "@/lib/segments";

type LogosGridProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function LogosGrid({ logosPorSegmento }: LogosGridProps) {
  const todosLosLogos = Object.values(logosPorSegmento).flat();
  const mitad = Math.ceil(todosLosLogos.length / 2);
  const fila1 = todosLosLogos.slice(0, mitad);
  const fila2 = todosLosLogos.slice(mitad);

  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-mono text-xs font-light text-brand-red-light">
            Partners estratégicos
          </p>
          <p className="font-mono text-xs font-light text-white/50">
            Clientes destacados
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col gap-6">
          {fila1.length > 0 && <LogoRow logos={fila1} direction="left" />}
          {fila2.length > 0 && <LogoRow logos={fila2} direction="right" />}
        </Reveal>
      </div>
    </section>
  );
}

function LogoRow({
  logos,
  direction,
}: {
  logos: SegmentoLogo[];
  direction: "left" | "right";
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.src}-${index}`}
            className="relative flex h-20 w-40 shrink-0 items-center justify-center rounded-xl bg-white p-4 shadow-sm transition-transform duration-300 hover:scale-110"
          >
            <Image
              src={logo.src}
              alt={logo.nombre}
              fill
              sizes="160px"
              className="object-contain p-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
