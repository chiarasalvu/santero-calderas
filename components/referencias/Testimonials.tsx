"use client";

import { useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import { googleReviews } from "@/data/google-reviews";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Calderas+Santero/@-34.6530001,-58.406007,17z/data=!4m8!3m7!1s0x95bccb023a387d97:0x1bee099adfe56ea0!8m2!3d-34.6530001!4d-58.406007!9m1!1b1!16s%2Fg%2F1vtzjd9x";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: "smooth",
    });
  }

  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-light text-brand-red-light">
              Testimonios
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-steel/40 px-4 py-2.5 transition-colors hover:border-brand-red-light"
          >
            <GoogleLogo className="h-5 w-5 shrink-0" />
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">4.8</span> · 70
              reseñas en Google
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10">
          <div
            ref={trackRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {googleReviews.map((review) => (
              <div
                key={review.id}
                className="flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-steel/20 bg-ink-light p-8 transition-colors duration-300 hover:border-brand-red-light/40 sm:w-[46%] lg:w-[31%]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Stars />
                    <GoogleLogo className="h-4 w-4 shrink-0 opacity-60" />
                  </div>
                  <p className="mt-4 text-sm text-white/80">
                    &ldquo;{review.texto}&rdquo;
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-mono text-xs font-light text-white">
                    {review.autor}
                  </p>
                  <p className="mt-1 font-mono text-xs font-light text-white/40">
                    {review.contexto} · {review.fecha}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Ver testimonios anteriores"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-steel/40 text-white transition-colors hover:border-brand-red-light hover:text-brand-red-light"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Ver más testimonios"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-steel/40 text-white transition-colors hover:border-brand-red-light hover:text-brand-red-light"
            >
              →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
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
