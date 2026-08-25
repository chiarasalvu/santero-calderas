"use client";

import Image from "next/image";
import { useState } from "react";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";

type CasesPreviewProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function CasesPreview({ logosPorSegmento }: CasesPreviewProps) {
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <section className="bg-ink px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
          Casos de Éxito
        </h2>

        <div className="mt-10">
          {segmentos.map((segmento, index) => {
            const open = abierto === segmento.id;
            const logos = logosPorSegmento[segmento.id];

            return (
              <div key={segmento.id} className="border-b border-white/10 first:border-t">
                <button
                  type="button"
                  onClick={() => setAbierto(open ? null : segmento.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-8 text-left"
                >
                  <span className="flex items-baseline gap-3 sm:gap-5">
                    <span className="text-sm text-brand-red/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-lg font-bold tracking-wide text-white uppercase sm:text-2xl lg:text-3xl">
                      {segmento.label}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-2xl text-white transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ⌄
                  </span>
                </button>

                {open && (
                  <div className="grid grid-cols-3 gap-3 pb-8 sm:grid-cols-4 lg:grid-cols-6">
                    {logos.map((logo) => (
                      <div
                        key={logo.src}
                        className="relative flex h-16 items-center justify-center rounded-lg border border-white/10 bg-white p-2"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.nombre}
                          fill
                          sizes="140px"
                          className="object-contain p-2"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
