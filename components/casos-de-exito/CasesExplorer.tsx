"use client";

import Image from "next/image";
import { useState } from "react";
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
    <>
      <div className="border-y border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Filtrar por sector:
          </span>
          {filtros.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setFiltro(opcion.id)}
              className={`rounded-md px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
                filtro === opcion.id
                  ? "bg-brand-red text-white"
                  : "border border-zinc-300 text-zinc-700 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {opcion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-16">
          {segmentosAMostrar.map((segmentoId) => {
            const segmento = segmentos.find((s) => s.id === segmentoId)!;
            const logos = logosPorSegmento[segmentoId];

            if (logos.length === 0) return null;

            return (
              <div key={segmentoId}>
                <h2 className="font-heading text-xl font-bold tracking-wide text-navy uppercase">
                  {segmento.label}
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {logos.map((logo) => (
                    <div
                      key={logo.src}
                      className="relative flex h-24 items-center justify-center rounded-xl border border-zinc-200 bg-white p-4"
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
    </>
  );
}
