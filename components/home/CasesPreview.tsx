"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";
import Reveal from "@/components/motion/Reveal";

type CasesPreviewProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function CasesPreview({ logosPorSegmento }: CasesPreviewProps) {
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <section className="bg-ink px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
            Casos de Éxito
          </h2>
        </Reveal>

        <div className="mt-10">
          {segmentos.map((segmento, index) => {
            const open = abierto === segmento.id;
            const logos = logosPorSegmento[segmento.id];

            return (
              <Reveal
                key={segmento.id}
                delay={Math.min(index * 0.06, 0.3)}
                className="border-b border-white/10 first:border-t"
              >
                <button
                  type="button"
                  onClick={() => setAbierto(open ? null : segmento.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-8 text-left"
                >
                  <span className="flex items-baseline gap-3 sm:gap-5">
                    <span className="text-sm text-brand-red-light">
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

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="logos"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-3 gap-3 pb-8 sm:grid-cols-4 lg:grid-cols-6">
                        {logos.map((logo) => (
                          <div
                            key={logo.src}
                            className="relative flex h-16 items-center justify-center rounded-lg border border-black/10 bg-white p-2"
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
