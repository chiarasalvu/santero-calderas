import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

type LineaItem = {
  titulo: string;
  descripcion: string;
};

type LineaProducto = {
  id: string;
  nombre: string;
  /** Una o dos fotos (si son dos, se muestran lado a lado). */
  imagenes: { src: string; alt: string }[];
  badge?: string;
  badgeClassName?: string;
  subtitulo?: string;
  items: LineaItem[];
  rendimiento?: number;
};

// Fotos de /img/equipos: las del Drive del cliente ("Equipos"), una por
// equipo, con su nombre real.
const lineas: LineaProducto[] = [
  {
    id: "atsol-etercal",
    nombre: "Línea ATSOL / ETERCAL",
    imagenes: [
      { src: "/img/equipos/atsol.jpg", alt: "Equipo ATSOL" },
      { src: "/img/equipos/etercal.jpg", alt: "Equipo ETERCAL" },
    ],
    badge: "Línea premium",
    badgeClassName: "bg-brand-red text-white",
    subtitulo: "La solución para grandes demandas de agua caliente sanitaria.",
    items: [
      {
        titulo: "Generación instantánea sin acumulación",
        descripcion:
          "Diseño compacto que ocupa menos de la mitad de espacio que los sistemas tradicionales, consumiendo energía de forma proporcional a la demanda real.",
      },
      {
        titulo: "Doble circuito (baño María)",
        descripcion:
          "Calentamiento indirecto a fuego lento mediante un circuito cerrado de calefacción con serpentina de acero inoxidable, reduciendo la formación de sarro y soportando altas presiones.",
      },
      {
        titulo: "Mantenimiento casi nulo",
        descripcion:
          "Elimina la necesidad de pilotos permanentes, ánodos de sacrificio, purgas programadas y repintados internos característicos del fuego directo.",
      },
      {
        titulo: "Versatilidad multiservicio",
        descripcion:
          "Capacidad única para alimentar múltiples prestaciones independientes en simultáneo (agua caliente sanitaria, climatización de piscinas y calefacción).",
      },
    ],
    rendimiento: 98,
  },
  {
    id: "adn",
    nombre: "Línea ADN",
    imagenes: [{ src: "/img/equipos/adn.jpg", alt: "Equipo ADN" }],
    badge: "Relación precio-calidad",
    badgeClassName: "bg-navy text-white",
    items: [
      {
        titulo: "Evolución y accesibilidad",
        descripcion:
          "Desarrollada para responder a proyectos de gran demanda y mayor consumo. Ej: termotanques 300/500 litros y climatizadores de piscina, ofreciendo máxima competitividad en precio sin sacrificar calidad ni servicio.",
      },
      {
        titulo: "Mismo principio tecnológico",
        descripcion:
          "Generación instantánea sin acumulación y doble circuito de calentamiento indirecto, logrando ahorros de gas superiores al 30%.",
      },
      {
        titulo: "Cero mantenimiento y alto confort",
        descripcion:
          "Elimina por completo los costos de recambio de ánodos y de pilotos permanentes. Tampoco se da la gran problemática de vibraciones constantes por el sarro.",
      },
      {
        titulo: "Aceptación masiva",
        descripcion:
          "La alternativa elegida por constructoras, hoteles, clubes y consorcios para cambiar verdaderamente de sistema y no solo de marca, que llevan al mismo resultado.",
      },
    ],
    rendimiento: 92,
  },
  {
    id: "ats",
    nombre: "Línea ATS",
    imagenes: [{ src: "/img/equipos/ats.jpg", alt: "Equipo ATS" }],
    items: [
      {
        titulo: "Concepto principal",
        descripcion:
          "Calderas de agua caliente en circuito cerrado para diversas prestaciones.",
      },
      {
        titulo: "Aplicación versátil",
        descripcion:
          "Ideales para calefacción, procesos industriales, tanques intermediarios e intercambiadores de calor.",
      },
      {
        titulo: "Intercambiador acuotubular",
        descripcion:
          "Adaptación del sistema líder de gran escala, optimizado de forma única a pequeña escala para un máximo aprovechamiento térmico.",
      },
      {
        titulo: "Máxima eficiencia y seguridad",
        descripcion:
          "Bajo consumo, pronta puesta en régimen y seguridad integral en niveles, presión y temperatura para resultados certificados.",
      },
    ],
  },
  {
    id: "vts",
    nombre: "Línea VTS",
    imagenes: [{ src: "/img/equipos/vts.jpg", alt: "Equipo VTS" }],
    items: [
      {
        titulo: "Vaporizadores de vanguardia",
        descripcion:
          "Calderas verticales acuotubulares de pequeña escala que trasladan la alta eficiencia de las grandes centrales térmicas a innumerables procesos industriales.",
      },
      {
        titulo: "Diseño estructural superior",
        descripcion:
          "Cámara de combustión sumergida con tubos de agua helicoidales e inclinados que garantizan una rápida circulación y máxima retención calórica.",
      },
      {
        titulo: "Puesta en régimen rápida",
        descripcion:
          "El concepto de la caldera Santero se basa en poco volumen y mucha superficie de transferencia, lo que implica llegar a régimen en la mitad de tiempo que los sistemas tradicionales.",
      },
      {
        titulo: "Seguridad inexplosiva",
        descripcion:
          "Intercambiador, tubos, cielo y chimenea permanentemente inundados de agua, eliminando por completo el riesgo de explosión o deformación de hogares de las clásicas horizontales humotubulares.",
      },
    ],
  },
  {
    id: "intercambiadores-tanques",
    nombre: "Intercambiadores y tanques de acumulación",
    imagenes: [
      { src: "/img/equipos/intercambiador.jpg", alt: "Tanque de acumulación" },
    ],
    items: [
      {
        titulo: "Tanques intermediarios",
        descripcion:
          "Solución tradicional robusta para sistemas centrales (calefacción y agua sanitaria) provistos con serpentinas de acero inoxidable y fabricación a medida (hierro negro o acero inoxidable).",
      },
      {
        titulo: "Intercambiadores de calor",
        descripcion:
          "A diferencia de los intercambiadores de placa convencionales o de casco y tubo (que sufren en zonas de aguas duras por su paso milimétrico y costo de juntas), Santero prioriza caños de acero inoxidable de gran volumen interior y circuito cerrado exterior, logrando menos mantenimiento, mayor durabilidad y rendimiento.",
      },
      {
        titulo: "Versatilidad y fabricación a medida",
        descripcion:
          "Equipos no seriados diseñados según las calorías y dimensiones exactas de cada proyecto, con capacidad de incorporar múltiples serpentinas interiores para combinar energía solar, calefacción, sanitaria y piscinas.",
      },
    ],
  },
  {
    id: "electro",
    nombre: "Línea Electro",
    imagenes: [{ src: "/img/equipos/electro.jpg", alt: "Equipo Electro" }],
    items: [
      {
        titulo: "Versatilidad",
        descripcion:
          "Equipos monofásicos y trifásicos hechos a medida (termotanques, calderas de calefacción, climatizadores de piscina y de vapor).",
      },
      {
        titulo: "Calidad constructiva y rendimiento",
        descripcion:
          "Máximo aprovechamiento eléctrico con control digital electrónico que inicia la recuperación al mínimo consumo. Fondos y espesores reforzados para mayor durabilidad.",
      },
      {
        titulo: "Seguridad integral",
        descripcion:
          "Tableros de electricistas matriculados, termostatos de seguridad y controles de nivel por falta de agua para proteger las resistencias contra sobrecalentamientos.",
      },
      {
        titulo: "Aislamiento térmico",
        descripcion:
          "Uso de lana de vidrio mineral para altas temperaturas que previene pérdidas por acumulación, garantizando máxima durabilidad y eficiencia en el segmento.",
      },
    ],
  },
];

export default function ProductLines() {
  return (
    <section className="bg-ink px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Líneas de producto
          </h2>
          <p className="mt-2 text-white/70">
            Soluciones adaptadas a cada escala industrial y de servicios.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lineas.map((linea, index) => (
            <Reveal
              key={linea.id}
              delay={Math.min((index % 3) * 0.1, 0.3)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-light transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-light/40"
            >
              <div className="relative flex aspect-square gap-2 overflow-hidden bg-white p-4">
                {linea.imagenes.map((imagen) => (
                  <div key={imagen.src} className="relative h-full flex-1">
                    <Image
                      src={imagen.src}
                      alt={imagen.alt}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 90vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
                {linea.badge && (
                  <span
                    className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${linea.badgeClassName}`}
                  >
                    {linea.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-xl font-semibold text-white">
                  {linea.nombre}
                </h3>
                {linea.subtitulo && (
                  <p className="mt-2 text-sm font-light text-white/90">
                    {linea.subtitulo}
                  </p>
                )}

                <ul className="mt-6 flex flex-col gap-4">
                  {linea.items.map((item) => (
                    <li key={item.titulo} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light transition-transform duration-300 group-hover:scale-110"
                        aria-hidden
                      >
                        <CheckIcon />
                      </span>
                      <div>
                        <p className="font-mono text-[11px] font-light text-white">
                          {item.titulo}
                        </p>
                        <p className="mt-1 text-sm text-white/60">
                          {item.descripcion}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {linea.rendimiento !== undefined && (
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-xs font-light text-white/50">
                      Rendimiento
                    </span>
                    <span className="flex items-baseline font-heading text-2xl font-semibold text-brand-red-light">
                      <AnimatedCounter value={linea.rendimiento} />%
                    </span>
                  </div>
                )}

                <Link
                  href="/contacto"
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
                >
                  Consultar por esta línea
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M5 13l3.5 3.5L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
