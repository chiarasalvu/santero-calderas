"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  /** A dónde ir si no hay página anterior (entró directo por un link). */
  fallbackHref?: string;
  className?: string;
};

// Vuelve a la página anterior, para no rehacer todo el circuito del menú.
export default function BackButton({
  fallbackHref = "/",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
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
      className={`group inline-flex items-center gap-2 rounded-lg border border-steel/40 bg-ink/60 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition-colors hover:border-brand-red-light hover:text-brand-red-light ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 transition-transform group-hover:-translate-x-1"
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
      Volver
    </button>
  );
}
