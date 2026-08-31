"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative mt-[65px] flex min-h-[calc(100dvh-65px)] items-center overflow-hidden bg-ink px-6 py-24 sm:py-32"
    >
      <motion.div
        className="absolute inset-x-0 -top-[4%] h-[108%]"
        style={{ y: backgroundY }}
      >
        <video
          ref={videoRef}
          src="/video/hero-santero-v4.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-[center_70%] motion-reduce:hidden"
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
