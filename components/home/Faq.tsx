"use client";

import { useState } from "react";

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
      "Sí, necesitan una conexión eléctrica estándar para el panel de control y el encendido electrónico.",
  },
  {
    id: "servicio-tecnico",
    pregunta: "¿Cuentan con servicio técnico?",
    respuesta:
      "Sí, contamos con guardia técnica propia para asistencia telefónica y presencial ante cualquier consulta o urgencia.",
  },
  {
    id: "garantia",
    pregunta: "¿Cuentan con garantía?",
    respuesta:
      "Todos nuestros equipos cuentan con garantía de fábrica, con condiciones específicas según la línea de producto.",
  },
  {
    id: "stock",
    pregunta: "¿Cuentan con stock inmediato?",
    respuesta:
      "Trabajamos con stock disponible para las líneas principales; para proyectos a medida coordinamos los tiempos de fabricación con el cliente.",
  },
  {
    id: "instalacion-santero",
    pregunta: "¿La instalación es con Santero?",
    respuesta:
      "Sí, nuestro equipo supervisa y ejecuta la instalación para garantizar un funcionamiento seguro desde el primer día.",
  },
  {
    id: "exterior",
    pregunta: "¿Se pueden instalar en el exterior?",
    respuesta:
      "Sí, nuestros equipos están diseñados para operar tanto en salas de máquinas interiores como en instalaciones a la intemperie.",
  },
  {
    id: "envios",
    pregunta: "¿Realizan envíos?",
    respuesta: "Sí, coordinamos el envío de equipos y repuestos a todo el país.",
  },
  {
    id: "sarro",
    pregunta: "¿Porque genera menos sarro este sistema?",
    respuesta:
      "Porque el calentamiento indirecto evita el contacto directo del fuego con el agua, reduciendo la formación de incrustaciones calcáreas.",
  },
  {
    id: "bacterias",
    pregunta: "¿Relación a las bacterias del Agua?",
    respuesta:
      "El diseño del sistema minimiza zonas de estancamiento, reduciendo el riesgo de proliferación bacteriana en el agua.",
  },
  {
    id: "combustible",
    pregunta: "¿Porqué consume menos combustible?",
    respuesta:
      "Porque la transferencia térmica optimizada aprovecha mejor la energía, reduciendo el consumo de gas frente a sistemas tradicionales.",
  },
];

export default function Faq() {
  const [abierta, setAbierta] = useState<string | null>(null);

  return (
    <section id="faqs" className="scroll-mt-28 px-6 py-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-cream p-8 sm:p-16">
        <h2 className="text-center font-heading text-3xl font-bold text-brand-red">
          Preguntas Frecuentes
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-navy/70">
          Soluciones inmediatas a las consultas técnicas más habituales sobre
          nuestra ingeniería térmica de alta precisión. Garantizamos
          confiabilidad absoluta en cada respuesta.
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3">
          {preguntas.map((item) => {
            const open = abierta === item.id;
            return (
              <div
                key={item.id}
                className="rounded-lg border border-zinc-200 bg-white px-5 py-4"
              >
                <button
                  type="button"
                  onClick={() => setAbierta(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-heading text-sm font-semibold text-navy">
                    {item.pregunta}
                  </span>
                  <span
                    className={`shrink-0 text-brand-red transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                {open && (
                  <p className="mt-3 text-sm text-zinc-600">
                    {item.respuesta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
