"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import type { RubroPagina } from "@/data/que-hacemos";

type RubroHeroProps = {
  titulo: string;
  video: RubroPagina["video"];
};

// Página de un rubro: la portada original del video como hero, y encima
// solo el título y el botón "Ver video" (que abre el video en un modal,
// igual que el hero de Nosotros). Sin video, queda solo el título.
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
    <section className="relative mt-[65px] flex min-h-[calc(100dvh-65px)] items-end overflow-hidden bg-ink px-6 py-16 sm:py-20">
      {video && (
        <Image
          src={video.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
        aria-hidden
      />

      <Reveal className="relative mx-auto w-full max-w-6xl">
        <h1 className="max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
          {titulo}
        </h1>

        {video && (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setVideoOpen(true)}
            className="mt-8 inline-flex items-center gap-3 rounded-lg border border-steel/40 bg-ink/60 py-2 pr-6 pl-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-brand-red-light hover:text-brand-red-light"
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
              poster={video.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-full max-w-4xl rounded-lg"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
