"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motivosContacto } from "@/data/motivos-contacto";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const motivoInicial = searchParams.get("motivo") ?? "";
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="rounded-2xl bg-ink-light p-8 text-center">
        <p className="font-heading text-lg font-semibold text-white">
          ¡Gracias por tu mensaje!
        </p>
        <p className="mt-2 text-sm text-white/70">
          Nos pondremos en contacto a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="motivo" className="text-sm font-medium text-white">
          Motivo de consulta
        </label>
        <select
          key={motivoInicial}
          id="motivo"
          name="motivo"
          defaultValue={motivoInicial}
          className="rounded-lg border border-white/40 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        >
          <option value="">Seleccioná un motivo</option>
          {motivosContacto.map((motivo) => (
            <option key={motivo.slug} value={motivo.slug}>
              {motivo.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="text-sm font-medium text-white">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="rounded-lg border border-white/40 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-white/40 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="telefono" className="text-sm font-medium text-white">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="rounded-lg border border-white/40 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensaje" className="text-sm font-medium text-white">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          className="rounded-lg border border-white/40 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
