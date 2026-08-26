import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";

type LogosGridProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function LogosGrid({ logosPorSegmento }: LogosGridProps) {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {segmentos.map((segmento) => {
          const logos = logosPorSegmento[segmento.id];
          if (logos.length === 0) return null;

          return (
            <Reveal key={segmento.id}>
              <h2 className="font-heading text-xl font-bold tracking-wide text-white uppercase">
                {segmento.label}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {logos.map((logo) => (
                  <div
                    key={logo.src}
                    className="relative flex h-24 items-center justify-center rounded-xl border border-white/10 bg-ink-light p-4"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.nombre}
                      fill
                      sizes="200px"
                      className="object-contain p-4"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
