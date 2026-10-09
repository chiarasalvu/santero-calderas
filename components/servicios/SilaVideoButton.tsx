"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Botón que abre el video de SILA Termomecánica en un modal (mismo patrón
// que el video institucional de Nosotros: Escape, scroll bloqueado, foco).
export default function SilaVideoButton() {
  const [abierto, setAbierto] = useState(false);
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

      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-6"
            onClick={() => setAbierto(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Video de SILA Termomecánica"
          >
            <button
              type="button"
              aria-label="Cerrar video"
              onClick={() => setAbierto(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
            >
              ✕
            </button>
            <video
              src="/video/sila.mp4"
              poster="/video/sila-poster.jpg"
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-full max-w-4xl rounded-lg"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
