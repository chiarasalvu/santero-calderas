"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";

type Filtro = "todos" | Segmento;

const filtros: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...segmentos.map((segmento) => ({ id: segmento.id, label: segmento.label })),
];

type CasesExplorerProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function CasesExplorer({ logosPorSegmento }: CasesExplorerProps) {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const segmentosAMostrar =
    filtro === "todos" ? segmentos.map((s) => s.id) : [filtro];

  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-center gap-3 border-y border-steel/20 py-6">
          <span className="font-mono text-xs font-medium tracking-widest text-white/50 uppercase">
            Filtrar por sector:
          </span>
          {filtros.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setFiltro(opcion.id)}
              className={`rounded-lg px-4 py-2 font-mono text-xs font-medium tracking-widest uppercase transition-colors ${
                filtro === opcion.id
                  ? "bg-brand-red text-white"
                  : "border border-steel/30 text-white/70 hover:border-brand-red-light hover:text-brand-red-light"
              }`}
            >
              {opcion.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 flex flex-col gap-12">
          {segmentosAMostrar.map((segmentoId) => {
            const segmento = segmentos.find((s) => s.id === segmentoId)!;
            const logos = logosPorSegmento[segmentoId];

            if (logos.length === 0) return null;

            return (
              <div key={segmentoId}>
                <h2 className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
                  {segmento.label}
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {logos.map((logo) => (
                    <div
                      key={logo.src}
                      className="relative flex h-24 items-center justify-center rounded-xl border border-steel/20 bg-ink-light p-4"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
