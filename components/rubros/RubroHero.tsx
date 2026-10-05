"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import Reveal from "@/components/motion/Reveal";
import type { BloqueTexto, RubroPagina } from "@/data/que-hacemos";

type RubroHeroProps = {
  titulo: string;
  subtitulo: string;
  contenido: BloqueTexto[];
  video: RubroPagina["video"];
};

// Página de un rubro, en dos bloques: a la izquierda el título, la frase
// destacada y la descripción; a la derecha la portada del video (cuadro
// con ▶ que abre el video en un modal, como el de Nosotros), que queda
// fija mientras se lee el texto. En mobile el video va entre el título y
// la descripción. Arriba a la izquierda va el botón "Volver".
export default function RubroHero({
  titulo,
  subtitulo,
  contenido,
  video,
}: RubroHeroProps) {
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
    <section className="relative mt-[65px] min-h-[calc(100dvh-65px)] bg-ink px-6 pt-24 pb-20">
      <div className="absolute inset-x-0 top-6 z-10 px-6">
        <div className="mx-auto max-w-7xl">
          <BackButton />
        </div>
      </div>

      <Reveal className="relative mx-auto grid w-full max-w-7xl gap-x-14 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="font-mono text-xs font-light text-brand-red-light">
            Por rubro
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            {titulo}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">{subtitulo}</p>
        </div>

        {video && (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Ver video: ${titulo}`}
            className="group relative block aspect-video w-full self-start overflow-hidden rounded-2xl border border-steel/20 bg-ink-light lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
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

        <div className="max-w-xl lg:col-start-1 lg:row-start-2">
          <div className="flex flex-col gap-5">
            {contenido.map((bloque, index) =>
              Array.isArray(bloque) ? (
                <ul key={index} className="flex flex-col gap-2">
                  {bloque.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/80"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-light"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  key={index}
                  className="hyphens-auto text-justify text-white/70"
                >
                  {bloque}
                </p>
              ),
            )}
          </div>

          <Link
            href="/contacto"
            className="mt-10 inline-block rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
          >
            Solicitar asesoramiento
          </Link>
        </div>
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
