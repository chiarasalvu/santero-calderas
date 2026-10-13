"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// Botón que abre el video de SILA Termomecánica a pantalla grande (mismo
// patrón que el video institucional de Nosotros: Escape, scroll bloqueado,
// foco). El modal se monta en document.body con un portal: el botón vive
// dentro de una card con transform (hover/animación), y un `position: fixed`
// adentro de un ancestro transformado queda encerrado en la card (se veía
// chico, duplicado y trabado).
export default function SilaVideoButton({
  variant = "boton",
}: {
  /** "boton": botón chico; "poster": portada del video con ▶ (16:9). */
  variant?: "boton" | "poster";
}) {
  const [abierto, setAbierto] = useState(false);
  // true solo en el cliente (en el servidor no existe document.body).
  const montado = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAbierto(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [abierto]);

  return (
    <>
      {variant === "poster" ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setAbierto(true)}
          aria-label="Ver video de SILA Termomecánica"
          className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/video/sila-video-portada.jpg"
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/0"
            aria-hidden
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-xl text-white shadow-lg transition-transform group-hover:scale-110">
              ▶
            </span>
          </span>
        </button>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setAbierto(true)}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-steel/40 px-4 py-3 text-xs font-semibold text-white transition-colors hover:border-brand-red-light hover:text-brand-red-light"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-[10px] text-white"
            aria-hidden
          >
            ▶
          </span>
          Ver video de SILA Termomecánica
        </button>
      )}

      {montado &&
        createPortal(
          <AnimatePresence>
            {abierto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 sm:p-8"
                onClick={() => setAbierto(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Video de SILA Termomecánica"
              >
                <button
                  type="button"
                  aria-label="Cerrar video"
                  onClick={() => setAbierto(false)}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:border-white sm:top-6 sm:right-6"
                >
                  ✕
                </button>
                <video
                  src="/video/sila.mp4"
                  poster="/video/sila-poster.jpg"
                  controls
                  autoPlay
                  playsInline
                  className="max-h-full w-full max-w-[1500px] rounded-lg bg-black object-contain"
                  onClick={(event) => event.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
