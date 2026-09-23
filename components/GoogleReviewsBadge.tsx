"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=2012556644267159200";

type GoogleReviewsBadgeProps = {
  rating: number;
  reviewCount: number;
};

/**
 * Insignia de reseñas de Google, fija en todas las páginas (montada en el
 * layout raíz). Arranca expandida y a los pocos segundos se achica a una
 * versión mini (solo rating + 1 estrella) — igual al patrón que usa
 * dorianargentina.com. En mobile arranca directamente en mini para no
 * ocupar espacio. El hover (desktop) la vuelve a expandir.
 *
 * `rating`/`reviewCount` vienen del layout raíz (server component), que
 * los trae en vivo de Google si está configurado (ver lib/google-rating.ts)
 * o usa los valores de respaldo si no.
 */
export default function GoogleReviewsBadge({
  rating,
  reviewCount,
}: GoogleReviewsBadgeProps) {
  const [collapsed, setCollapsed] = useState(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      collapseTimer.current = setTimeout(() => setCollapsed(true), 0);
      return () => {
        if (collapseTimer.current) clearTimeout(collapseTimer.current);
      };
    }

    collapseTimer.current = setTimeout(() => setCollapsed(true), 5000);
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

  const expand = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setCollapsed(false);
  };

  const scheduleCollapse = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setCollapsed(true), 1200);
  };

  return (
    <motion.a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver reseñas de Calderas Santero en Google — ${rating} de 5 estrellas, ${reviewCount} reseñas`}
      onMouseEnter={expand}
      onMouseLeave={scheduleCollapse}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      className={`fixed bottom-5 left-4 z-[65] flex items-center overflow-hidden rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition-[width] duration-500 sm:bottom-6 sm:left-6 ${
        collapsed ? "w-[116px]" : "w-[220px]"
      }`}
    >
      <span className="m-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white">
        <GoogleLogo className="h-6 w-6" />
      </span>

      <span
        className={`flex items-center gap-1.5 whitespace-nowrap pr-4 transition-opacity duration-300 ${
          collapsed ? "opacity-100" : "pointer-events-none absolute opacity-0"
        }`}
      >
        <span className="font-sans text-base font-bold text-[#202124]">
          {rating}
        </span>
        <span className="text-base leading-none text-[#fbbc04]">★</span>
      </span>

      <span
        className={`flex flex-col justify-center py-1 pr-3 leading-tight whitespace-nowrap transition-opacity duration-300 ${
          collapsed ? "pointer-events-none absolute opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-[10px] text-[#666]">Valoración de clientes</span>
        <span className="flex items-center gap-1.5 leading-none">
          <span className="font-sans text-sm font-bold text-[#202124]">
            <AnimatedCounter value={rating} decimals={1} />
          </span>
          <span className="text-xs tracking-[1px] text-[#fbbc04]">★★★★★</span>
        </span>
        <span className="text-[10px] text-[#888]">
          <AnimatedCounter value={reviewCount} /> reseñas en{" "}
          <strong className="text-[#4285F4]">Google</strong>
        </span>
      </span>
    </motion.a>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
