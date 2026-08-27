import Image from "next/image";
import Link from "next/link";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";
import Reveal from "@/components/motion/Reveal";

type CasesPreviewProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function CasesPreview({ logosPorSegmento }: CasesPreviewProps) {
  const todosLosLogos = segmentos.flatMap(
    (segmento) => logosPorSegmento[segmento.id],
  );
  const mitad = Math.ceil(todosLosLogos.length / 2);
  const fila1 = todosLosLogos.slice(0, mitad);
  const fila2 = todosLosLogos.slice(mitad);

  return (
    <section className="bg-ink px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
            Casos de Éxito
          </h2>
          <Link
            href="/referencias"
            className="group/link flex items-center gap-1 font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase transition-colors hover:text-white"
          >
            Ver todas las referencias
            <span
              className="transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
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
            className="relative flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-steel/20 bg-ink-light p-4"
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
