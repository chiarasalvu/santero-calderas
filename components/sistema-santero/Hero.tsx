"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-10%"],
  );

  return (
    <section
      ref={sectionRef}
      className="bg-navy px-6 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Tecnología de intercambio
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Sistema Santero
          </h1>

          <p className="mt-6 max-w-md text-white/80">
            Calentamiento indirecto de alta eficiencia. Diseñado para
            evitar la acumulación de sarro y maximizar el rendimiento
            térmico en aplicaciones industriales exigentes.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircleIcon />
              Acero inoxidable
            </span>
            <span className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircleIcon />
              Bajo mantenimiento
            </span>
          </div>

          <a
            href="/contacto?motivo=visita-tecnica"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
          >
            Consultar con un ingeniero
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <motion.div
            style={{ y: imageY }}
            className="mx-auto aspect-square max-w-md rounded-2xl bg-white p-3 shadow-lg"
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src="/img/generales/caldera-4.png"
                alt="Sistema Santero instalado"
                fill
                className="object-contain p-6"
              />
            </div>
          </motion.div>

          <div className="absolute -bottom-4 -left-4 rounded-xl bg-cream px-6 py-4 shadow-lg sm:-bottom-6 sm:-left-6">
            <p className="flex items-baseline font-heading text-3xl font-semibold text-brand-red">
              <AnimatedCounter value={98} />%
            </p>
            <p className="text-xs font-light text-zinc-500">
              Eficiencia estacionaria
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0 text-brand-red-light"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
