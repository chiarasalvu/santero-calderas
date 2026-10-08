"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import type { BloqueTexto, RubroPagina } from "@/data/que-hacemos";

type RubroHeroProps = {
  titulo: string;
  subtitulo: string;
  contenido: BloqueTexto[];
  video: RubroPagina["video"];
};

// Página de un rubro: título y frase a la izquierda, la portada del video
// (cuadro con ▶ que abre el video en un modal, como el de Nosotros) a la
// derecha, y el texto "bordeando" al video: sigue a su costado y continúa
// debajo a todo el ancho. El botón "Volver" está en el header.
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
    <section className="relative mt-[65px] min-h-[calc(100dvh-65px)] bg-ink px-6 pt-16 pb-20">
      <Reveal className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 lg:block">
        {/* El video va flotado a la derecha y el texto lo "bordea": sigue a
            su costado y continúa debajo, a todo el ancho, así se ve todo
            sin bajar. En mobile, el orden es título → video → texto. */}
        {video && (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Ver video: ${titulo}`}
            className="group relative order-2 block aspect-video w-full overflow-hidden rounded-2xl border border-steel/20 bg-ink-light lg:float-right lg:mb-6 lg:ml-12 lg:w-[48%]"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
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

        <div className="order-1">
          <p className="font-mono text-xs font-light text-brand-red-light">
            Por rubro
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
            {titulo}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">{subtitulo}</p>
        </div>

        <div className="order-3 lg:mt-8">
          <div className="space-y-5">
            {contenido.map((bloque, index) =>
              Array.isArray(bloque) ? (
                <ul key={index} className="space-y-2">
                  {bloque.map((item) => (
                    <li key={item} className="relative pl-5 text-white/80">
                      <span
                        className="absolute top-2.5 left-0 h-1.5 w-1.5 rounded-full bg-brand-red-light"
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
