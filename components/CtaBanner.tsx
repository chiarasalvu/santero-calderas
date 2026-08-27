"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

type CtaBannerProps = {
  titulo: string;
  descripcion: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const MotionLink = motion.create(Link);

export default function CtaBanner({
  titulo,
  descripcion,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBannerProps) {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-light text-brand-red-light uppercase">
          Siguiente Paso
        </p>
        <h2 className="mt-4 font-heading text-2xl font-semibold text-white sm:text-4xl">
          {titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">{descripcion}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MotionLink
            href={primaryHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
          >
            {primaryLabel}
          </MotionLink>
          <MotionLink
            href={secondaryHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg border border-steel/40 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
          >
            {secondaryLabel}
          </MotionLink>
        </div>
      </Reveal>
    </section>
  );
}
