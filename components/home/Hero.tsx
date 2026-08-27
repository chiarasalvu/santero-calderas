"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const categorias = [
  { label: "Agua Caliente Sanitaria (ACS)", icon: "droplet" },
  { label: "Climatización", icon: "wind" },
  { label: "Vapor", icon: "gauge" },
] as const;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [showText, setShowText] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "18%"],
  );

  useEffect(() => {
    const video = videoRef.current;

    // Salvavidas: si el video no carga (autoplay bloqueado, error de red,
    // etc.) el texto igual aparece a los 9s en vez de quedar oculto para
    // siempre.
    const fallback = setTimeout(() => setShowText(true), 9000);

    if (!video) {
      return () => clearTimeout(fallback);
    }

    function handleTimeUpdate() {
      if (video && video.currentTime >= 7) {
        setShowText(true);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      clearTimeout(fallback);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-[65px] flex min-h-[calc(100dvh-65px)] items-center overflow-hidden bg-ink px-6 py-24 sm:py-32 lg:mt-[121px] lg:min-h-[calc(100dvh-121px)]"
    >
      <motion.div
        className="absolute inset-x-0 -top-[9%] h-[118%]"
        style={{ y: backgroundY }}
      >
        <Image
          src="/img/generales/caldera-5.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <video
          ref={videoRef}
          src="/video/hero-santero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img/generales/caldera-5.png"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          aria-hidden
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-heading text-3xl font-light text-white uppercase sm:text-5xl">
          Calidez que perdura
        </h1>
        <p className="mt-6 max-w-xl text-sm text-white/70 sm:text-base">
          Ingeniería térmica de precisión para la industria moderna. Sistemas
          robustos diseñados para el rendimiento extremo.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {categorias.map((categoria) => (
            <Link
              key={categoria.label}
              href="/servicios"
              className="flex items-center gap-2 rounded border border-steel/40 bg-ink/60 px-5 py-3 text-sm font-light text-white backdrop-blur-sm transition-colors hover:border-white"
            >
              <CategoriaIcon name={categoria.icon} />
              {categoria.label}
            </Link>
          ))}
        </div>

        <a
          href="#diferencial"
          className="mt-16 flex flex-col items-center gap-2 text-xs font-light text-white/60 uppercase transition-colors hover:text-white"
        >
          Descubrir
          <span aria-hidden>↓</span>
        </a>
      </motion.div>
    </section>
  );
}

function CategoriaIcon({ name }: { name: string }) {
  if (name === "droplet") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 shrink-0"
        aria-hidden
      >
        <path
          d="M12 2.5s6.5 7.02 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 9.52 12 2.5 12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "wind") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 shrink-0"
        aria-hidden
      >
        <path
          d="M3 8h11a3 3 0 1 0-3-3M3 16h14a3 3 0 1 1-3 3M3 12h17a2.5 2.5 0 1 0-2.5-2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <path
        d="M12 3a9 9 0 1 0 9 9M12 3v4M12 12l4-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
