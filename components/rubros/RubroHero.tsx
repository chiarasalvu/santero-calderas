"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import type { RubroPagina } from "@/data/que-hacemos";

// Portada común a los 4 rubros: solo el logo.
const PORTADA = "/img/rubros/portada-logo.jpg";

type RubroHeroProps = {
  titulo: string;
  video: RubroPagina["video"];
};

// Página de un rubro: una portada (la del video), un botón para verlo y
// el título — nada más. Mismo lenguaje visual que el hero de Nosotros
// (eyebrow, título, botón con ▶ y modal de video). Si el rubro todavía no
// tiene video, queda solo el título.
export default function RubroHero({ titulo, video }: RubroHeroProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!videoOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setVideoOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoOpen]);

  return (
    <section className="relative mt-[65px] overflow-hidden bg-ink px-6 py-16 sm:py-24">
      <Reveal className="relative mx-auto w-full max-w-6xl">
        <div>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Por rubro
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            {titulo}
          </h1>

          {video && (
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setVideoOpen(true)}
              className="mt-8 inline-flex items-center gap-3 rounded-lg border border-steel/40 py-2 pr-6 pl-2 text-sm font-semibold text-white transition-colors hover:border-brand-red-light hover:text-brand-red-light"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-white"
                aria-hidden
              >
                ▶
              </span>
              Ver video
            </button>
          )}
        </div>

        {video && (
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Ver video: ${titulo}`}
            className="group relative mt-12 block aspect-video w-full overflow-hidden rounded-2xl border border-steel/20 bg-ink-light"
          >
            <Image
              src={PORTADA}
              alt=""
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors group-hover:bg-ink/10"
              aria-hidden
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-xl text-white shadow-lg transition-transform group-hover:scale-110">
                ▶
              </span>
            </span>
          </button>
        )}
      </Reveal>

      <AnimatePresence>
        {video && videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-6"
            onClick={() => setVideoOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              aria-label="Cerrar video"
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
            >
              ✕
            </button>
            <video
              src={video.src}
              poster={PORTADA}
              controls
              autoPlay
              playsInline
              className="max-h-[88vh] w-full max-w-6xl rounded-lg"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
