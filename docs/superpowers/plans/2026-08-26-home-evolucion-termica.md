# Home — Sistema de diseño "Evolución Térmica" — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restylear el Hero de Home (vuelve el texto y 3 botones de categoría) y agregar 2 secciones nuevas del mock del cliente ("El Diferencial Santero" y "Tecnología en Acero Inoxidable"), sin tocar ni remover ninguna de las secciones de Home que ya existen.

**Architecture:** `components/home/Hero.tsx` se reescribe en el lugar (mismo archivo, mismo fondo de video/imagen, se agrega contenido visible encima). Dos componentes nuevos, `components/home/Diferencial.tsx` y `components/home/FeaturedProduct.tsx`, se insertan en `app/page.tsx` entre las secciones existentes sin tocar ninguna de ellas. `Diferencial` reutiliza `serviciosPilares` de `data/servicios-pilares.ts` (ya existe, sin cambios). `FeaturedProduct` reutiliza datos y el asset de imagen ya reales de la Línea ATSOL (de `components/sistema-santero/ProductLines.tsx` y `components/sistema-santero/Hero.tsx`) — **nunca** el producto ficticio "Serie VXT-Pro" del mock del cliente.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4, framer-motion v13 — sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-26-home-evolucion-termica-design.md](../specs/2026-08-26-home-evolucion-termica-design.md)

## Global Constraints

- **No se elimina ni se modifica ninguna sección existente de Home** (`RubroFinder`, `SistemaSanteroTeaser`, `ProductLines`, `CasesPreview`, `HistoryTimeline`, `Faq`, `CtaBanner`) — ya heredan la paleta nueva vía los tokens del sub-proyecto anterior sin necesitar código nuevo.
- **`FeaturedProduct` usa datos 100% reales**, nunca el contenido inventado del mock: nombre "Línea ATSOL" (no "Serie VXT-Pro"), imagen `/img/generales/caldera-9.png` (ya usada en `sistema-santero/ProductLines.tsx`), los 3 bullets textuales exactos de esa misma línea, y la estadística "98% / Eficiencia estacionaria" (exactamente la misma que ya se muestra en `sistema-santero/Hero.tsx`).
- **Los 3 botones del Hero apuntan los tres a `/servicios`** (no existen todavía páginas de detalle por categoría — mismo criterio que ya usan todos los links "Por Servicio" del mega-menú "Qué Hacemos").
- `Diferencial` usa `serviciosPilares[i].numero`/`.titulo`/`.bajada` únicamente — **no** el campo `.items` (ese detalle completo ya vive en `/servicios`).
- La sección `Diferencial` lleva `id="diferencial"`, que es el destino del link "Descubrir ↓" del Hero — deben coincidir exactamente.
- `app/page.tsx` gana exactamente 2 imports y 2 líneas de JSX nuevas (`<Diferencial />` después de `<GoogleReviewsBadge />`, `<FeaturedProduct />` después de `<ProductLines />`) — ninguna otra línea del archivo cambia.
- Sin test runner en este repo. Verificación por task: `npm run build` + `npm run lint` + grep + verificación interactiva en navegador.
- Commits en español, uno por task.

---

## Task 1: Reescribir el Hero de Home

**Files:**
- Modify: `components/home/Hero.tsx`

**Interfaces:**
- Produces: sigue exportando `export default function Hero()` sin props, igual que hoy. El link "Descubrir ↓" apunta a `#diferencial`, un `id` que el Task 2 va a crear — hasta que ese task se complete, el anchor simplemente no encuentra destino (no rompe nada, es un link `<a href="#diferencial">` normal).

- [ ] **Step 1: Reemplazar `components/home/Hero.tsx` completo**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categorias = [
  { label: "Agua Caliente Sanitaria (ACS)", icon: "droplet" },
  { label: "Climatización", icon: "wind" },
  { label: "Vapor", icon: "gauge" },
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/caldera-5.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <video
        src="/video/hero-santero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/img/generales/caldera-5.png"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <motion.div
        className="relative mx-auto flex max-w-4xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <h1 className="font-heading text-3xl font-light tracking-[0.15em] text-white uppercase sm:text-5xl">
          Calidez que perdura.
        </h1>
        <p className="mt-6 max-w-xl text-sm text-white/70 sm:text-base">
          Ingeniería térmica de precisión para la industria moderna. Sistemas
          robustos diseñados para el rendimiento extremo.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {categorias.map((categoria) => (
            <Link
              key={categoria.label}
              href="/servicios"
              className="flex items-center gap-2 rounded border border-steel/40 bg-ink/60 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white"
            >
              <CategoriaIcon name={categoria.icon} />
              {categoria.label}
            </Link>
          ))}
        </div>

        <a
          href="#diferencial"
          className="mt-16 flex flex-col items-center gap-2 text-xs font-medium tracking-widest text-white/60 uppercase transition-colors hover:text-white"
        >
          Descubrir
          <span aria-hidden>↓</span>
        </a>
      </motion.div>
    </section>
  );
}

function CategoriaIcon({ name }: { name: string }) {
  if (name === "droplet") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 shrink-0"
        aria-hidden
      >
        <path
          d="M12 2.5s6.5 7.02 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 9.52 12 2.5 12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "wind") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 shrink-0"
        aria-hidden
      >
        <path
          d="M3 8h11a3 3 0 1 0-3-3M3 16h14a3 3 0 1 1-3 3M3 12h17a2.5 2.5 0 1 0-2.5-2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <path
        d="M12 3a9 9 0 1 0 9 9M12 3v4M12 12l4-3"
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

Con `npm run dev`, cargar `/`: el Hero debe mostrar el video de fondo con
el título "CALIDEZ QUE PERDURA" (mayúsculas por `uppercase`, tracking
ancho), la bajada, los 3 botones de categoría (cada uno con su ícono), y
el link "Descubrir ↓" al pie. Los 3 botones deben apuntar a `/servicios`.
El link "Descubrir" no necesita hacer scroll a ningún lado todavía (la
sección `#diferencial` se crea en el Task 2) — solo confirmar que el
`href` del `<a>` es exactamente `#diferencial`.

- [ ] **Step 4: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "Restylear el Hero de Home: título, bajada y botones de categoría"
```

---

## Task 2: Crear "El Diferencial Santero" y sumarla a Home

**Files:**
- Create: `components/home/Diferencial.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `serviciosPilares` de `@/data/servicios-pilares` (ya existe: `{id, numero, titulo, bajada, items}[]`, se usan solo `numero`/`titulo`/`bajada`), `Reveal` de `@/components/motion/Reveal` (ya existe, sin cambios).
- Produces: `export default function Diferencial()`, sin props. Se monta en `app/page.tsx` entre `<GoogleReviewsBadge />` y `<RubroFinder />`.

- [ ] **Step 1: Crear `components/home/Diferencial.tsx`**

```tsx
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

export default function Diferencial() {
  return (
    <section id="diferencial" className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            El Diferencial Santero
          </h2>
          <Link
            href="/servicios"
            className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase transition-colors hover:text-white"
          >
            Ver metodología →
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {serviciosPilares.map((pilar, index) => (
            <Reveal
              key={pilar.id}
              delay={Math.min(index * 0.1, 0.3)}
              className="relative overflow-hidden rounded-2xl border border-steel/20 bg-ink-light p-8"
            >
              <span
                className="pointer-events-none absolute -top-4 -right-2 font-heading text-8xl font-bold text-white/5"
                aria-hidden
              >
                {pilar.numero}
              </span>

              <div className="relative">
                <PilarIcon id={pilar.id} />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-sm text-white/60">{pilar.bajada}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PilarIcon({ id }: { id: string }) {
  const className = "h-6 w-6 text-brand-red-light";

  if (id === "ingenieria-proyectos") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 20 14 4l2 3-8 13H4Zm10-4 4-6.5 2 1.2L15.5 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "instalacion-puesta-en-marcha") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.4 4a7.9 7.9 0 0 0-.14-1.5l2-1.56-2-3.46-2.36.96a8.1 8.1 0 0 0-1.3-.75L16.2 3h-4l-.4 2.69a8.1 8.1 0 0 0-1.3.75l-2.36-.96-2 3.46 2 1.56a7.9 7.9 0 0 0 0 3l-2 1.56 2 3.46 2.36-.96c.4.3.84.55 1.3.75L11.8 21h4l.4-2.69c.46-.2.9-.45 1.3-.75l2.36.96 2-3.46-2-1.56c.1-.49.14-.99.14-1.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v-5H4Zm16 0h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Modificar `app/page.tsx`**

Reemplazar el archivo completo:

```tsx
import Hero from "@/components/home/Hero";
import GoogleReviewsBadge from "@/components/home/GoogleReviewsBadge";
import Diferencial from "@/components/home/Diferencial";
import RubroFinder from "@/components/home/RubroFinder";
import SistemaSanteroTeaser from "@/components/home/SistemaSanteroTeaser";
import ProductLines from "@/components/home/ProductLines";
import CasesPreview from "@/components/home/CasesPreview";
import HistoryTimeline from "@/components/HistoryTimeline";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/CtaBanner";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export default function Home() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <GoogleReviewsBadge />
      <Diferencial />
      <RubroFinder />
      <SistemaSanteroTeaser />
      <ProductLines />
      <CasesPreview logosPorSegmento={logosPorSegmento} />
      <HistoryTimeline tone="dark" />
      <Faq />
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto?motivo=cotizar-proyecto"
        secondaryLabel="Agendar videollamada"
        secondaryHref="/contacto?motivo=visita-tecnica"
        tone="dark"
      />
    </>
  );
}
```

(Nota: este `page.tsx` todavía no incluye `<FeaturedProduct />` — eso lo agrega el Task 3, que va a modificar este mismo archivo de nuevo.)

- [ ] **Step 3: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 4: Verificación interactiva**

Con `npm run dev`, cargar `/` y click en "Descubrir ↓" del Hero — debe
hacer scroll suave hasta "El Diferencial Santero" (verificar que el
`id="diferencial"` de la sección coincide con el `href="#diferencial"`
del Hero). La sección debe mostrar 3 tarjetas (Ingeniería & Proyectos,
Instalación & Puesta en Marcha, Soporte & Postventa) con un numeral
grande semi-transparente de fondo en cada una, y el link "Ver
metodología →" debe llevar a `/servicios`.

- [ ] **Step 5: Commit**

```bash
git add components/home/Diferencial.tsx app/page.tsx
git commit -m "Agregar sección 'El Diferencial Santero' a Home"
```

---

## Task 3: Crear "Tecnología en Acero Inoxidable" y sumarla a Home

**Files:**
- Create: `components/home/FeaturedProduct.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal` (sin cambios). No consume ningún dato de `data/servicios-pilares.ts` ni de otro archivo de datos — el texto/imagen/estadística están hardcodeados en el propio componente, copiados literalmente de `components/sistema-santero/ProductLines.tsx` (bullets de la Línea ATSOL) y `components/sistema-santero/Hero.tsx` (estadística "98%"), sin importar esos archivos ni depender de ellos en tiempo de ejecución.
- Produces: `export default function FeaturedProduct()`, sin props. Se monta en `app/page.tsx` entre `<ProductLines />` y `<CasesPreview />`.

- [ ] **Step 1: Crear `components/home/FeaturedProduct.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const bullets = [
  "Capacidades para proyectos de alta exigencia.",
  "Generación instantánea mediante calentamiento indirecto.",
  "Ideal para hoteles, clubes, edificios e industrias.",
];

export default function FeaturedProduct() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Tecnología en Acero Inoxidable
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Nuestra línea de calderas de alto rendimiento está diseñada para
            soportar las exigencias más severas del entorno industrial,
            optimizando el consumo energético y reduciendo emisiones.
          </p>

          <ul className="mt-6 flex flex-col gap-3 border-t border-steel/20 pt-6">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-sm text-white/70"
              >
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-[10px] text-brand-red-light"
                  aria-hidden
                >
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <Link
            href="/sistema-santero"
            className="mt-8 inline-flex items-center gap-2 rounded border border-steel/40 px-6 py-3 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:border-white"
          >
            Catálogo Técnico
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-steel/20 bg-ink-light">
            <Image
              src="/img/generales/caldera-9.png"
              alt="Línea ATSOL — caldera de acero inoxidable"
              fill
              className="object-contain p-6"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-xl bg-cream px-6 py-4 shadow-lg sm:-bottom-6 sm:-left-6">
            <p className="font-mono text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
              Modelo Destacado
            </p>
            <p className="font-heading text-lg font-bold text-navy">
              Línea ATSOL
            </p>
            <p className="mt-2 border-t border-zinc-200 pt-2 text-xs text-zinc-600">
              <span className="font-heading text-xl font-bold text-brand-red">
                98%
              </span>{" "}
              eficiencia estacionaria
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modificar `app/page.tsx`**

Agregar el import y la línea de JSX. El archivo completo queda así:

```tsx
import Hero from "@/components/home/Hero";
import GoogleReviewsBadge from "@/components/home/GoogleReviewsBadge";
import Diferencial from "@/components/home/Diferencial";
import RubroFinder from "@/components/home/RubroFinder";
import SistemaSanteroTeaser from "@/components/home/SistemaSanteroTeaser";
import ProductLines from "@/components/home/ProductLines";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import CasesPreview from "@/components/home/CasesPreview";
import HistoryTimeline from "@/components/HistoryTimeline";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/CtaBanner";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export default function Home() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <GoogleReviewsBadge />
      <Diferencial />
      <RubroFinder />
      <SistemaSanteroTeaser />
      <ProductLines />
      <FeaturedProduct />
      <CasesPreview logosPorSegmento={logosPorSegmento} />
      <HistoryTimeline tone="dark" />
      <Faq />
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto?motivo=cotizar-proyecto"
        secondaryLabel="Agendar videollamada"
        secondaryHref="/contacto?motivo=visita-tecnica"
        tone="dark"
      />
    </>
  );
}
```

- [ ] **Step 3: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 4: Verificación interactiva**

Con `npm run dev`, cargar `/` y scrollear hasta después de "Productos
Principales" (ATSOL/ADN) — debe aparecer "Tecnología en Acero
Inoxidable" con el texto, los 3 bullets, el botón "Catálogo Técnico"
(→ `/sistema-santero`), y a la derecha la imagen con el badge "Modelo
Destacado / Línea ATSOL / 98% eficiencia estacionaria". Confirmar que
NO aparece en ningún lado el texto "VXT-Pro" ni las cifras "3.5 t/h" o
"22 bar".

- [ ] **Step 5: Commit**

```bash
git add components/home/FeaturedProduct.tsx app/page.tsx
git commit -m "Agregar sección 'Tecnología en Acero Inoxidable' a Home"
```
