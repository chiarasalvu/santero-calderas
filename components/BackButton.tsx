"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  /** A dónde ir si no hay página anterior (entró directo por un link). */
  fallbackHref?: string;
  /** Se llama al hacer click (p. ej. para cerrar el menú). */
  onNavigate?: () => void;
};

// Vuelve a la página anterior, para no rehacer todo el circuito del menú.
// Vive en el header, al lado del botón Menu; en mobile queda solo la flecha.
export default function BackButton({
  fallbackHref = "/",
  onNavigate,
}: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    onNavigate?.();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Volver"
      className="group flex items-center gap-2 rounded border border-steel/40 px-2.5 py-2 text-xs font-light text-white transition-colors hover:border-white sm:px-3"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
        aria-hidden
      >
        <path
          d="M19 12H5m0 0l6-6m-6 6l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="hidden sm:inline">Volver</span>
    </button>
  );
}
