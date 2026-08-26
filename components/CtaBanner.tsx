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
  tone?: "light" | "dark";
};

const MotionLink = motion.create(Link);

export default function CtaBanner({
  titulo,
  descripcion,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  tone = "light",
}: CtaBannerProps) {
  return (
    <section className={`px-6 py-16 ${tone === "dark" ? "bg-ink" : ""}`}>
      <Reveal className="mx-auto max-w-6xl rounded-3xl bg-brand-red px-8 py-16 text-center sm:px-16">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-4xl">
          {titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">{descripcion}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MotionLink
            href={primaryHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg bg-cream px-6 py-3 text-sm font-semibold text-brand-red transition-colors hover:bg-white"
          >
            {primaryLabel}
          </MotionLink>
          <MotionLink
            href={secondaryHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {secondaryLabel}
          </MotionLink>
        </div>
      </Reveal>
    </section>
  );
}
