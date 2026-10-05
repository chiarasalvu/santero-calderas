"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

type HitoHistoria = {
  id: string;
  anio: string;
  titulo: string;
  descripcion: string;
};

const historia: HitoHistoria[] = [
  {
    id: "1935",
    anio: "1935",
    titulo: "Fundación de Calderas Santero",
    descripcion:
      "Empresa familiar fundada por Don Francisco Santero, dedicada exclusivamente a la fabricación de calderas de vapor y reparación de equipamiento textil.",
  },
  {
    id: "1955",
    anio: "1955",
    titulo: "Sucesores",
    descripcion:
      "Con mucha dedicación y pasión al trabajo, Nicolás O. Santero y Héctor F. Santero continuaron el desarrollo de la empresa iniciada por su padre.",
  },
  {
    id: "1970",
    anio: "1970",
    titulo: "Una nueva etapa",
    descripcion:
      "En manos de Juan Carlos Santero incorpora sistemas de provisión de agua caliente y calefacción central, ampliando la oferta de la compañía.",
  },
  {
    id: "1995",
    anio: "1995",
    titulo: "Sistema Santero",
    descripcion:
      "Se diseña y patentan los primeros bocetos de un sistema innovador de alta eficiencia energética y generación instantánea.",
  },
  {
    id: "2003",
    anio: "2003",
    titulo: "Consolidación",
    descripcion:
      "Nos afianzamos como la verdadera alternativa del mercado de la climatización. Una revolución que rompió con los paradigmas de los sistemas tradicionales y colocó a la empresa en la elite de los productos nacionales y del Mercosur.",
  },
  {
    id: "2013",
    anio: "2013",
    titulo: "Cuarta generación",
    descripcion:
      "Carlos y Matías continúan el legado con orgullo y compromiso. Incorporando nuevas tecnologías, procesos y mejora continua.",
  },
];

type HistoryTimelineProps = {
  tone?: "light" | "dark";
};

export default function HistoryTimeline({ tone = "light" }: HistoryTimelineProps) {
  const dark = tone === "dark";
  const listRef = useRef<HTMLOListElement>(null);

  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className={`px-6 pt-16 pb-20 sm:pt-20 sm:pb-24 ${dark ? "bg-ink" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            className={`font-heading text-3xl font-semibold sm:text-4xl ${dark ? "text-white" : "text-navy"}`}
          >
            Somos más que una empresa.
          </h2>
          <div
            className={`mt-6 flex max-w-3xl flex-col gap-2 text-lg sm:text-xl ${dark ? "text-white/70" : "text-zinc-600"}`}
          >
            <p>
              Somos huéspedes y usuarios de los espacios que transformamos.
            </p>
            <p>
              Somos aliados que entienden y responden a las exigencias de cada
              sector.
            </p>
            <p>
              Somos{" "}
              <span
                className={dark ? "text-brand-red-light" : "text-brand-red"}
              >
                la combinación de trayectoria, tecnología, compromiso y mejora
                continua
              </span>
              .
            </p>
          </div>
        </Reveal>

        <ol ref={listRef} className="relative mt-16 flex flex-col gap-10 sm:gap-16">
          {/* La línea no está fija de entrada: se dibuja de arriba hacia
              abajo a medida que se scrollea la lista, en sincro con las
              cards que van apareciendo (Reveal). */}
          <div
            className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 sm:block"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top bg-brand-red/30"
              style={{ scaleY: shouldReduceMotion ? 1 : lineScale }}
            />
          </div>

          {historia.map((hito, index) => {
            const cardOnRight = index % 2 === 0;

            return (
              <li
                key={hito.id}
                className="relative flex flex-col items-center gap-2 sm:flex-row sm:gap-12"
              >
                <span
                  className={`font-heading text-lg font-light sm:flex-1 sm:text-5xl lg:text-6xl ${
                    dark
                      ? "text-brand-red-light sm:text-brand-red-light"
                      : "text-brand-red sm:text-brand-red/50"
                  } ${
                    cardOnRight
                      ? "sm:order-1 sm:text-right"
                      : "sm:order-3 sm:text-left"
                  }`}
                >
                  {hito.anio}
                </span>

                <span className="relative z-10 hidden h-3.5 w-3.5 shrink-0 rounded-full bg-brand-red sm:order-2 sm:block" />

                <div
                  className={`w-full sm:flex sm:flex-1 sm:items-center ${
                    cardOnRight
                      ? "sm:order-3 sm:justify-start"
                      : "sm:order-1 sm:justify-end"
                  }`}
                >
                  <Reveal
                    delay={Math.min(index * 0.08, 0.4)}
                    className="w-full"
                  >
                    <TimelineCard hito={hito} dark={dark} />
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TimelineCard({ hito, dark }: { hito: HitoHistoria; dark: boolean }) {
  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-transparent p-6 transition-all duration-300 hover:-translate-y-1 ${dark ? "bg-ink-light hover:border-brand-red-light/40" : "bg-cream-card hover:border-brand-red/30"}`}
    >
      <h3
        className={`font-heading text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}
      >
        {hito.titulo}
      </h3>
      <p className={`mt-2 text-sm ${dark ? "text-white/70" : "text-zinc-600"}`}>
        {hito.descripcion}
      </p>
    </div>
  );
}
