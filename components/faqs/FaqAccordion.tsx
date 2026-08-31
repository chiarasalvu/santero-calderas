"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

type PreguntaFrecuente = {
  id: string;
  pregunta: string;
  respuesta: string;
};

const preguntas: PreguntaFrecuente[] = [
  {
    id: "electricidad",
    pregunta: "¿Los equipos requieren alimentación eléctrica?",
    respuesta:
      "Si, requieren alimentación a 220V para su funcionamiento. Es esencial que tenga la polaridad correcta y una buena puesta a tierra. La corriente eléctrica alimenta el tablero y bomba recirculadora propia del equipo.",
  },
  {
    id: "servicio-tecnico",
    pregunta: "¿Cuentan con servicio técnico?",
    respuesta:
      "Contamos con servicio técnico especializado propio. Brindamos asesoramiento presencial y/o telefónico.",
  },
  {
    id: "garantia",
    pregunta: "¿Cuentan con garantía?",
    respuesta:
      "Contamos con garantía en todos nuestros equipos. 1 año para todo el equipamiento eléctrico, controles, quemador y tablero, 3 años para cuerpo, tubos y serpentina para la línea ADN-TS-TSE y 5 años para cuerpo, tubos y serpentina para la línea ATSOL-ATS-VTS.",
  },
  {
    id: "stock",
    pregunta: "¿Cuentan con stock inmediato?",
    respuesta:
      "Cada proyecto es distinto. Por ende, se fabrican en base a cada necesidad. Solemos entregar en 30 días.",
  },
  {
    id: "instalacion-santero",
    pregunta: "¿La instalación y/o puesta en marcha es con Santero?",
    respuesta:
      "Desde Santero recomendamos que la instalación sea realizada por personal matriculado. Si el cliente lo desea, puede contratar la instalación con SILA Termomecánica (empresa del grupo), especialista en este tipo de montajes. Se deberá contemplar relevamiento y cotización independiente.",
  },
  {
    id: "exterior",
    pregunta: "¿Se pueden instalar en el exterior?",
    respuesta:
      "Nuestros equipos están diseñados para ser instalados dentro de una sala de máquinas, ventilada y con las dimensiones recomendadas por las normativas vigentes.",
  },
  {
    id: "envios",
    pregunta: "¿Realizan envíos?",
    respuesta:
      "Entregamos dentro de AMBA, sobre camión, en domicilio sin cargo. Para otros destinos, entregamos en depósito del transporte elegido por el cliente. Dicho transporte y traslado queda a cargo del cliente.",
  },
  {
    id: "sarro",
    pregunta: "¿Porque genera menos sarro este sistema?",
    respuesta:
      "Se juntan dos factores fundamentales, que son la baja temperatura de trabajo y el calentamiento indirecto, evitando que el fuego pegue sobre las placas del agua de consumo.",
  },
  {
    id: "bacterias",
    pregunta: "¿Como se comporta el sistema en relación a las bacterias del Agua?",
    respuesta:
      "Sin dudas, es el mejor sistema del mercado para evitar esas bacterias, la salubridad que logramos con la serpentina de acero inoxidable con soldadura especial y barrido de argón, logra una pureza del material y nulo espacio poroso para que se aloje la bacteria, sumado a que evitamos la acumulación.",
  },
  {
    id: "combustible",
    pregunta: "¿Porqué consume menos combustible?",
    respuesta:
      "El principal factor es que no entrega calorías cuando no se necesita, el concepto de generación instantánea es como el de un gran calefón, Otro factor es la cantidad de material que ponemos en el interior de los equipos, absorbiendo gran parte de las calorías que uno quema.",
  },
];

export default function FaqAccordion() {
  const [abierta, setAbierta] = useState<string | null>(null);

  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {preguntas.map((item, index) => {
          const open = abierta === item.id;
          return (
            <Reveal
              key={item.id}
              delay={Math.min(index * 0.05, 0.3)}
              className="rounded-lg border border-steel/20 bg-ink-light px-5 py-4 transition-colors duration-300 hover:border-brand-red-light/40"
            >
              <button
                type="button"
                onClick={() => setAbierta(open ? null : item.id)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="font-heading text-base font-semibold text-white sm:text-lg">
                  {item.pregunta}
                </span>
                <span
                  className={`shrink-0 text-brand-red-light transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="respuesta"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-white/70">
                      {item.respuesta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
