# Nosotros + Sistema Santero — Sistema de diseño "Evolución Térmica" — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualizar el Hero de Nosotros (foto real de fondo, nuevo copy, modal de video) y el Hero + Líneas de Producto de Sistema Santero (nuevo copy, badges, formato título+ícono en los bullets, dato de rendimiento) al contenido del mock del cliente, usando únicamente assets y contenido reales.

**Architecture:** 3 archivos, 3 tasks independientes entre sí (no comparten código ni se importan mutuamente). `components/AboutHero.tsx` pasa a ser client component por el estado del modal de video. `components/sistema-santero/Hero.tsx` y `components/sistema-santero/ProductLines.tsx` siguen siendo server components (sin estado nuevo).

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4, framer-motion v13 — sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-26-nosotros-sistema-santero-evolucion-termica-design.md](../specs/2026-08-26-nosotros-sistema-santero-evolucion-termica-design.md)

## Global Constraints

- **No se toca** `components/HistoryTimeline.tsx`, `components/nosotros/MissionVisionValues.tsx`, `components/sistema-santero/Overview.tsx`, `components/sistema-santero/ComparisonTable.tsx`, ni ningún `CtaBanner` — solo los 3 archivos listados en el alcance.
- **El video institucional es un placeholder real, documentado, no una funcionalidad rota:** el modal de video de `AboutHero.tsx` apunta a `/video/hero-santero.mp4` (el mismo video real que ya usa el Hero de Home) con un comentario explícito en el código señalando que se reemplaza por el video institucional real cuando el cliente lo envíe.
- **El z-index del modal de video es `z-[80]`** — por encima del Header (`z-[70]`) y su panel mobile (`z-[60]`), que son los z-index más altos ya establecidos en el sitio.
- **El link "Consultar con un Ingeniero" de Sistema Santero se corrige** de `href="#consultar"` (bug pre-existente, anchor que no existe) a `href="/contacto?motivo=visita-tecnica"` — mismo patrón `?motivo=` ya usado en el resto del sitio.
- **Los bullets de ProductLines.tsx son contenido real reagrupado, no contenido nuevo** — los 3 bullets existentes de cada línea (ATSOL/ADN) se combinan en 2 ítems con título, sin agregar ninguna afirmación técnica que no estuviera ya en el sitio.
- **Las cifras de rendimiento (98% ATSOL, 92% ADN) son reales**, ya usadas en una versión anterior del sitio — el 98% de ATSOL ya fue confirmado explícitamente por el cliente en el sub-proyecto de Home.
- Sin test runner en este repo. Verificación por task: `npm run build` + `npm run lint` + verificación interactiva en navegador.
- Commits en español, uno por task.

---

## Task 1: Reescribir el Hero de Nosotros

**Files:**
- Modify: `components/AboutHero.tsx`

**Interfaces:**
- Produces: sigue exportando `export default function AboutHero()` sin props, igual que hoy. Pasa a `"use client"` (antes era server component).

- [ ] **Step 1: Reemplazar `components/AboutHero.tsx` completo**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

export default function AboutHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/sobre-nosotros.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50"
        aria-hidden
      />

      <Reveal className="relative mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
          Evolución Térmica
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-6xl">
          Forjando el futuro
          <span className="block text-white/50">Desde 1935</span>
        </h1>

        <p className="mt-6 max-w-xl text-white/70">
          Cuatro generaciones de excelencia en ingeniería térmica.
          Transformamos el acero en potencia industrial, combinando
          precisión técnica con robustez legendaria.
        </p>

        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="mt-8 flex items-center gap-3 text-xs font-medium tracking-widest text-white/70 uppercase transition-colors hover:text-white"
        >
          Ver video institucional
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-steel/40"
            aria-hidden
          >
            ▶
          </span>
        </button>
      </Reveal>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-6"
            onClick={() => setVideoOpen(false)}
          >
            <button
              type="button"
              aria-label="Cerrar video"
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
            >
              ✕
            </button>
            {/* TODO: reemplazar por el video institucional real que va a
                enviar el cliente — hoy apunta al video genérico de planta
                que ya usa el Hero de Home, como placeholder real (no un
                archivo roto) hasta que llegue el definitivo. */}
            <video
              src="/video/hero-santero.mp4"
              controls
              autoPlay
              className="max-h-[80vh] w-full max-w-4xl rounded-lg"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 3: Verificación interactiva**

Con `npm run dev`, cargar `/nosotros`: debe verse la foto real de fondo
(`sobre-nosotros.png`) con degradado oscuro, el eyebrow "Evolución
Térmica", el título en dos líneas ("Forjando el futuro" / "Desde
1935"), la bajada, y el botón "Ver video institucional". NO debe
aparecer ningún botón "Quiero Asesoramiento" en el Hero. Click en "Ver
video institucional" — debe abrir un overlay oscuro con el video
reproduciéndose y controles nativos visibles. Click en el botón ✕ o en
el fondo oscuro (fuera del video) — debe cerrar el overlay. Click
dentro del propio video no debe cerrarlo.

- [ ] **Step 4: Commit**

```bash
git add components/AboutHero.tsx
git commit -m "Reescribir el Hero de Nosotros: foto real, nuevo copy y modal de video"
```

---

## Task 2: Reescribir el Hero de Sistema Santero

**Files:**
- Modify: `components/sistema-santero/Hero.tsx`

**Interfaces:**
- Produces: sigue exportando `export default function Hero()` sin props, sin cambios de tipo. Sigue siendo server component (sin estado nuevo).

- [ ] **Step 1: Reemplazar `components/sistema-santero/Hero.tsx` completo**

```tsx
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-navy px-6 py-24 sm:py-28">
      <div className="mx-auto mt-12 grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
            Tecnología de Intercambio
          </p>
          <h1 className="mt-4 font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-5xl">
            Sistema
            <span className="block">Santero</span>
          </h1>

          <p className="mt-6 max-w-md text-white/80">
            Calentamiento indirecto de alta eficiencia. Diseñado para
            evitar la acumulación de sarro y maximizar el rendimiento
            térmico en aplicaciones industriales exigentes.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircleIcon />
              Acero Inoxidable
            </span>
            <span className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircleIcon />
              Bajo Mantenimiento
            </span>
          </div>

          <a
            href="/contacto?motivo=visita-tecnica"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
          >
            Consultar con un Ingeniero
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="aspect-square rounded-2xl bg-white p-4 shadow-xl">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src="/img/generales/caldera-4.png"
                alt="Sistema Santero instalado"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-xl bg-cream px-6 py-4 shadow-lg sm:-bottom-6 sm:-left-6">
            <p className="font-heading text-3xl font-bold text-brand-red">
              98%
            </p>
            <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
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
```

- [ ] **Step 2: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 3: Verificación interactiva**

Con `npm run dev`, cargar `/sistema-santero`: debe verse el eyebrow
"Tecnología de Intercambio", el título en dos líneas ("Sistema" /
"Santero"), la bajada nueva, los 2 badges con check ("Acero
Inoxidable", "Bajo Mantenimiento"), y el botón "Consultar con un
Ingeniero". La imagen y el badge "98%" no deben haber cambiado. Click
en "Consultar con un Ingeniero" — debe navegar a
`/contacto?motivo=visita-tecnica` (confirmar en la barra de
direcciones, no a `#consultar`).

- [ ] **Step 4: Commit**

```bash
git add components/sistema-santero/Hero.tsx
git commit -m "Reescribir el Hero de Sistema Santero: nuevo copy, badges y fix del link roto"
```

---

## Task 3: Restylear las Líneas de Producto de Sistema Santero

**Files:**
- Modify: `components/sistema-santero/ProductLines.tsx`

**Interfaces:**
- Produces: sigue exportando `export default function ProductLines()` sin props. El tipo local `LineaProducto` cambia su campo `bullets: string[]` por `items: LineaItem[]` (tipo nuevo, local a este archivo, no exportado ni usado en ningún otro lugar del código).

- [ ] **Step 1: Reemplazar `components/sistema-santero/ProductLines.tsx` completo**

```tsx
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

type LineaItem = {
  titulo: string;
  descripcion: string;
};

type LineaProducto = {
  id: string;
  nombre: string;
  imagen: string;
  badge: string;
  badgeClassName: string;
  subtitulo: string;
  items: LineaItem[];
  rendimiento: string;
};

const lineas: LineaProducto[] = [
  {
    id: "atsol",
    nombre: "Línea ATSOL",
    imagen: "/img/generales/caldera-9.png",
    badge: "Línea Premium",
    badgeClassName: "bg-brand-red text-white",
    subtitulo: "La solución para grandes demandas de agua caliente sanitaria.",
    items: [
      {
        titulo: "Alta Exigencia",
        descripcion:
          "Capacidades para proyectos de alta exigencia, ideal para hoteles, clubes, edificios e industrias.",
      },
      {
        titulo: "Generación Instantánea",
        descripcion:
          "Generación instantánea mediante calentamiento indirecto.",
      },
    ],
    rendimiento: "98%",
  },
  {
    id: "adn",
    nombre: "Línea ADN",
    imagen: "/img/generales/caldera-11.png",
    badge: "Relación Precio-Calidad",
    badgeClassName: "bg-navy text-white",
    subtitulo: "La eficiencia del Sistema Santero en formato compacto.",
    items: [
      {
        titulo: "Diseño Compacto",
        descripcion:
          "Diseñada para demandas medianas y espacios reducidos, ideal para consorcios, gimnasios y climatización de piscinas.",
      },
      {
        titulo: "Bajo Mantenimiento",
        descripcion: "Generación instantánea y bajo mantenimiento.",
      },
    ],
    rendimiento: "92%",
  },
];

export default function ProductLines() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Líneas de Producto
          </h2>
          <p className="mt-2 text-white/70">
            Soluciones adaptadas a cada escala industrial y de servicios.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {lineas.map((linea, index) => (
            <Reveal
              key={linea.id}
              delay={index * 0.1}
              className="overflow-hidden rounded-2xl border border-white/10 bg-ink-light"
            >
              <div className="relative aspect-video">
                <Image
                  src={linea.imagen}
                  alt={linea.nombre}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${linea.badgeClassName}`}
                >
                  {linea.badge}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-white">
                  {linea.nombre}
                </h3>
                <p className="mt-2 text-sm font-medium text-white/90">
                  {linea.subtitulo}
                </p>

                <ul className="mt-6 flex flex-col gap-4">
                  {linea.items.map((item) => (
                    <li key={item.titulo} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light"
                        aria-hidden
                      >
                        <CheckIcon />
                      </span>
                      <div>
                        <p className="font-mono text-[11px] font-medium tracking-widest text-white uppercase">
                          {item.titulo}
                        </p>
                        <p className="mt-1 text-sm text-white/60">
                          {item.descripcion}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-xs font-medium tracking-widest text-white/50 uppercase">
                    Rendimiento
                  </span>
                  <span className="font-heading text-2xl font-bold text-brand-red-light">
                    {linea.rendimiento}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
                >
                  <span aria-hidden>⬇</span>
                  Descargar ficha técnica
                </button>
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
```

- [ ] **Step 2: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 3: Verificación interactiva**

Con `npm run dev`, cargar `/sistema-santero` y scrollear a "Líneas de
Producto": la tarjeta ATSOL debe mostrar el badge "Línea Premium", 2
ítems con ícono de check ("Alta Exigencia", "Generación Instantánea") y
al pie "Rendimiento 98%". La tarjeta ADN debe mostrar el badge
"Relación Precio-Calidad", 2 ítems ("Diseño Compacto", "Bajo
Mantenimiento") y al pie "Rendimiento 92%". El botón "Descargar ficha
técnica" debe seguir presente en ambas tarjetas, sin cambios.

- [ ] **Step 4: Commit**

```bash
git add components/sistema-santero/ProductLines.tsx
git commit -m "Restylear Líneas de Producto de Sistema Santero: badges, ítems con ícono y rendimiento"
```
