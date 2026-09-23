"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Pausa entre que el logo termina de armarse del todo y arranca el
// esfumado hacia el video de planta — pedido explícito del cliente
// (26/09): "que termine la presentación de la animación del logo y ahí
// recién que arranque el esfumado al video".
const HOLD_AFTER_LOGO_MS = 500;
// Duración del cross-fade (opacity) entre los dos <video>.
const CROSSFADE_MS = 900;

export default function Hero() {
  const logoRef = useRef<HTMLVideoElement>(null);
  const footageRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [showFootage, setShowFootage] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "8%"],
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    const logo = logoRef.current;
    const footage = footageRef.current;
    if (!logo || !footage) return;

    let holdTimer: ReturnType<typeof setTimeout> | null = null;

    function playLogo() {
      setShowFootage(false);
      if (!logo) return;
      logo.currentTime = 0;
      void logo.play();
    }

    function onLogoEnded() {
      // El logo ya terminó de armarse del todo (frame final, cuadrado
      // centrado) — esperamos un instante quieto antes de arrancar el
      // esfumado al video, en vez de cortar en seco.
      holdTimer = setTimeout(() => {
        setShowFootage(true);
        if (!footage) return;
        footage.currentTime = 0;
        void footage.play();
      }, HOLD_AFTER_LOGO_MS);
    }

    function onFootageEnded() {
      playLogo();
    }

    logo.addEventListener("ended", onLogoEnded);
    footage.addEventListener("ended", onFootageEnded);
    playLogo();

    return () => {
      logo.removeEventListener("ended", onLogoEnded);
      footage.removeEventListener("ended", onFootageEnded);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative mt-[65px] flex min-h-[calc(100dvh-65px)] items-center overflow-hidden bg-ink px-6 py-24 sm:py-32"
    >
      <motion.div
        className="absolute inset-x-0 -top-[4%] h-[108%]"
        style={{ y: backgroundY }}
      >
        {/* Entrada del logo: recorte propio, sin loop, centrado real
            (object-position center) para que el cuadrado quede
            perfectamente centrado en pantalla — no comparte el
            object-position "70%" del metraje de planta. */}
        <video
          ref={logoRef}
          src="/video/hero-logo-intro.mp4"
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity motion-reduce:hidden ${
            showFootage ? "opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
          aria-hidden
        />

        {/* Metraje de planta: propio object-position, arranca oculto y
            se esfuma hacia adentro recién cuando el logo terminó y tuvo
            su pausa. */}
        <video
          ref={footageRef}
          src="/video/hero-footage.mp4"
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover object-[center_70%] transition-opacity motion-reduce:hidden ${
            showFootage ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
