"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=2012556644267159200";
const RATING = 4.8;
const REVIEW_COUNT = 70;

export default function GoogleReviewsBadge() {
  return (
    <motion.a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver reseñas de Calderas Santero en Google — ${RATING} de 5 estrellas, ${REVIEW_COUNT} reseñas`}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full bg-white/95 px-4 py-2.5 shadow-lg ring-1 ring-black/5 backdrop-blur-md"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <GoogleLogo className="h-6 w-6 shrink-0" />
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-navy">
            <AnimatedCounter value={RATING} decimals={1} />
          </span>
          <Stars />
        </div>
        <span className="text-xs text-zinc-500">
          <AnimatedCounter value={REVIEW_COUNT} /> reseñas en Google
        </span>
      </div>
    </motion.a>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002 l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}
