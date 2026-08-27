# Servicios — Sistema de diseño "Evolución Térmica" — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualizar `/servicios` al contenido y estructura del mock del cliente — Hero minimalista, pilares en grilla de 3 columnas con botones de contacto reales, y una nueva sección final "Compromiso Santero" con foto — usando únicamente contenido real ya existente.

**Architecture:** 3 tasks. Task 1 y 2 modifican archivos existentes (`Hero.tsx`, `ServicePillars.tsx`) de forma independiente. Task 3 crea un componente nuevo (`Compromiso.tsx`) y actualiza `app/servicios/page.tsx` para usarlo en vez del `CtaBanner` compartido — sin tocar `CtaBanner.tsx` en sí, que otras 4 páginas siguen usando sin cambios.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4 — sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-26-servicios-evolucion-termica-design.md](../specs/2026-08-26-servicios-evolucion-termica-design.md)

## Global Constraints

- **`components/CtaBanner.tsx` no se toca** — sigue usándose sin cambios en Home, Nosotros, Sistema Santero y Casos de Éxito. Solo `/servicios` deja de usarlo.
- **`data/servicios-pilares.ts` no se toca** — mismos datos (`numero`, `titulo`, `bajada`, `items`), solo cambia cómo se presentan en `ServicePillars.tsx`.
- **Los 3 botones de contacto por pilar usan motivos reales ya existentes** en `data/motivos-contacto.ts` (`ficha-tecnica`, `visita-tecnica`, `guardia-24hs`) — no se inventa ningún destino nuevo.
- **Todos los ítems reales de cada pilar se mantienen** (5 en Ingeniería, 1 en Instalación, 2 en Soporte) — no se recorta contenido para calzar con la cantidad más corta del mock.
- **`trabajo-3.png` se reutiliza**: sale del Hero (Task 1) y pasa a la nueva sección `Compromiso` (Task 3) — mismo asset real, no uno nuevo.
- Sin test runner en este repo. Verificación por task: `npm run build` + `npm run lint` + verificación interactiva en navegador.
- Commits en español, uno por task.

---

## Task 1: Simplificar el Hero de Servicios

**Files:**
- Modify: `components/servicios/Hero.tsx`

**Interfaces:**
- Produces: sigue exportando `export default function Hero()` sin props.

- [ ] **Step 1: Reemplazar `components/servicios/Hero.tsx` completo**

```tsx
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Acompañamos cada proyecto desde la planificación técnica hasta el
            funcionamiento diario del sistema, garantizando la máxima
            eficiencia operativa.
          </p>
          <span
            className="mx-auto mt-8 block h-0.5 w-16 bg-brand-red"
            aria-hidden
          />
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 3: Verificación interactiva**

Con `npm run dev`, cargar `/servicios`: debe verse el Hero centrado, sin
imagen, con el título, la bajada, y una barra roja fina debajo. NO debe
quedar ningún layout de 2 columnas ni la imagen `trabajo-3.png` en el
Hero.

- [ ] **Step 4: Commit**

```bash
git add components/servicios/Hero.tsx
git commit -m "Simplificar el Hero de Servicios al patrón centrado del mock"
```

---

## Task 2: Pilares en grilla de 3 columnas con botones de contacto

**Files:**
- Modify: `components/servicios/ServicePillars.tsx`

**Interfaces:**
- Consumes: `serviciosPilares` de `@/data/servicios-pilares` (sin cambios — `{id, numero, titulo, bajada, items: {titulo, descripcion}[]}[]`).
- Produces: sigue exportando `export default function ServicePillars()` sin props.

- [ ] **Step 1: Reemplazar `components/servicios/ServicePillars.tsx` completo**

```tsx
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

const contactoPorPilar: Record<string, { label: string; motivo: string }> = {
  "ingenieria-proyectos": {
    label: "Descargar Ficha Técnica",
    motivo: "ficha-tecnica",
  },
  "instalacion-puesta-en-marcha": {
    label: "Consultar Protocolo de Instalación",
    motivo: "visita-tecnica",
  },
  "soporte-postventa": {
    label: "Contactar Guardia Técnica",
    motivo: "guardia-24hs",
  },
};

export default function ServicePillars() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {serviciosPilares.map((pilar, index) => {
          const contacto = contactoPorPilar[pilar.id];

          return (
            <Reveal
              key={pilar.id}
              delay={Math.min(index * 0.1, 0.3)}
              className="flex flex-col rounded-2xl border border-steel/20 bg-ink-light p-8"
            >
              <PilarIcon id={pilar.id} />
              <h2 className="mt-4 font-heading text-xl font-bold text-white uppercase">
                {pilar.titulo}
              </h2>
              <p className="mt-2 text-sm text-white/60">{pilar.bajada}</p>

              <ul className="mt-6 flex flex-col gap-4">
                {pilar.items.map((item) => (
                  <li key={item.titulo} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-brand-red-light"
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

              {contacto && (
                <Link
                  href={`/contacto?motivo=${contacto.motivo}`}
                  className="mt-8 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
                >
                  {contacto.label}
                </Link>
              )}
            </Reveal>
          );
        })}
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

Con `npm run dev`, cargar `/servicios` y scrollear a los pilares: en
desktop deben verse las 3 tarjetas lado a lado (grilla de 3 columnas),
cada una con su ícono, título, bajada, TODOS sus ítems reales (5 en
Ingeniería, 1 en Instalación, 2 en Soporte — nada recortado) con
checkmark SVG, y un botón de contacto al pie. Click en cada botón:
"Descargar Ficha Técnica" → `/contacto?motivo=ficha-tecnica`,
"Consultar Protocolo de Instalación" → `/contacto?motivo=visita-tecnica`,
"Contactar Guardia Técnica" → `/contacto?motivo=guardia-24hs`. En mobile
(<640px) la grilla debe colapsar a 1 columna.

- [ ] **Step 4: Commit**

```bash
git add components/servicios/ServicePillars.tsx
git commit -m "Reestructurar pilares de Servicios en grilla de 3 columnas con botones de contacto"
```

---

## Task 3: Nueva sección "Compromiso Santero" y wiring de la página

**Files:**
- Create: `components/servicios/Compromiso.tsx`
- Modify: `app/servicios/page.tsx`

**Interfaces:**
- Produces: `export default function Compromiso()` sin props — usado únicamente por `app/servicios/page.tsx` en este task.

- [ ] **Step 1: Crear `components/servicios/Compromiso.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function Compromiso() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/trabajo-3.png"
        alt=""
        fill
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60"
        aria-hidden
      />

      <Reveal className="relative mx-auto max-w-3xl">
        <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
          Compromiso Santero
        </p>
        <p className="mt-4 max-w-xl text-lg text-white/90">
          La excelencia térmica no es un objetivo, es nuestro estándar
          operativo. Conozca nuestra planta de desarrollo.
        </p>

        <Link
          href="/contacto?motivo=visita-tecnica"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
        >
          Solicitar Visita Técnica
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Reemplazar `app/servicios/page.tsx` completo**

```tsx
import type { Metadata } from "next";
import Hero from "@/components/servicios/Hero";
import ServicePillars from "@/components/servicios/ServicePillars";
import Compromiso from "@/components/servicios/Compromiso";

export const metadata: Metadata = {
  title: "Servicios | Calderas Santero",
  description:
    "Ingeniería & Proyectos, Instalación & Puesta en Marcha, y Soporte & Postventa: los 3 pilares de servicio de Calderas Santero.",
};

export default function Servicios() {
  return (
    <>
      <Hero />
      <ServicePillars />
      <Compromiso />
    </>
  );
}
```

- [ ] **Step 3: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 4: Verificación interactiva**

Con `npm run dev`, cargar `/servicios` y scrollear hasta el final: debe
verse la sección "Compromiso Santero" con la foto real de fondo
(`trabajo-3.png`), el texto, y el botón "Solicitar Visita Técnica" que
navega a `/contacto?motivo=visita-tecnica`. El `CtaBanner` rojo antiguo
no debe aparecer en esta página. Verificar además que las otras páginas
que usan `CtaBanner` (`/`, `/nosotros`, `/sistema-santero`,
`/casos-de-exito`) siguen mostrándolo sin cambios (no se tocó ese
componente).

- [ ] **Step 5: Commit**

```bash
git add components/servicios/Compromiso.tsx app/servicios/page.tsx
git commit -m "Crear sección Compromiso Santero y reemplazar el CtaBanner en Servicios"
```
