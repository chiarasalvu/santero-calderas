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

// Página de un rubro: título a la izquierda y, a la derecha, la portada
// del video (cuadro grande con ▶ que abre el video en un modal, como el
// de Nosotros). Sin botón aparte. Sin video, queda solo el título.
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
    <section className="relative mt-[65px] flex min-h-[calc(100dvh-65px)] items-center overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Reveal className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[2fr_3fr]">
        <div>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Por rubro
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            {titulo}
          </h1>
        </div>

        {video && (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Ver video: ${titulo}`}
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-steel/20 bg-ink-light"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
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
