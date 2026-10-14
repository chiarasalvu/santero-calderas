"use client";

import { useState, type FormEvent } from "react";

// Los mensajes llegan por Formspree.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xljgoeyz";

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    setEnviando(true);
    setError(false);
    try {
      const respuesta = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (respuesta.ok) {
        setEnviado(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setEnviando(false);
    }
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
      {/* Trampa para bots: las personas no la ven ni la completan. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="text-sm font-light text-white">
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
        <label htmlFor="email" className="text-sm font-light text-white">
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
        <label htmlFor="telefono" className="text-sm font-light text-white">
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
        <label htmlFor="mensaje" className="text-sm font-light text-white">
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

      {error && (
        <p role="alert" className="text-sm text-brand-red-light">
          No pudimos enviar el mensaje. Probá de nuevo en unos minutos.
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red disabled:cursor-wait disabled:opacity-70"
      >
        {enviando ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
