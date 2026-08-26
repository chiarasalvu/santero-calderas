"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

export default function AboutHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/sobre-nosotros.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50"
        aria-hidden
      />

      <Reveal className="relative mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
          Evolución Térmica
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-6xl">
          Forjando el futuro
          <span className="block text-white/50">Desde 1935</span>
        </h1>

        <p className="mt-6 max-w-xl text-white/70">
          Cuatro generaciones de excelencia en ingeniería térmica.
          Transformamos el acero en potencia industrial, combinando
          precisión técnica con robustez legendaria.
        </p>

        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="mt-8 flex items-center gap-3 text-xs font-medium tracking-widest text-white/70 uppercase transition-colors hover:text-white"
        >
          Ver video institucional
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-steel/40"
            aria-hidden
          >
            ▶
          </span>
        </button>
      </Reveal>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-6"
            onClick={() => setVideoOpen(false)}
          >
            <button
              type="button"
              aria-label="Cerrar video"
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
            >
              ✕
            </button>
            {/* TODO: reemplazar por el video institucional real que va a
                enviar el cliente — hoy apunta al video genérico de planta
                que ya usa el Hero de Home, como placeholder real (no un
                archivo roto) hasta que llegue el definitivo. */}
            <video
              src="/video/hero-santero.mp4"
              controls
              autoPlay
              className="max-h-[80vh] w-full max-w-4xl rounded-lg"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
