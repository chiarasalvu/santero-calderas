"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motivosContacto } from "@/data/motivos-contacto";

export default function MotivoSelector() {
  const searchParams = useSearchParams();
  const motivoActivo = searchParams.get("motivo");

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {motivosContacto.map((motivo) => {
        const active = motivoActivo === motivo.slug;
        return (
          <Link
            key={motivo.slug}
            href={`/contacto?motivo=${motivo.slug}#formulario`}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              active
                ? "border-brand-red bg-brand-red text-white"
                : "border-white/30 text-white hover:border-brand-red hover:bg-brand-red"
            }`}
          >
            {motivo.label}
          </Link>
        );
      })}
    </div>
  );
}
