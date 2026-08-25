# Rediseño del Home (Calderas Santero) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `app/page.tsx` (Home) de Calderas Santero: mensaje concreto, buscador por rubro, diferencial y productos separados, historia reubicada, y paleta oscura — según el feedback del cliente.

**Architecture:** Next.js 16 App Router, componentes de servidor (sin estado) salvo los que ya usan `"use client"` para acordeones (`CasesPreview`, `Faq`). Un nuevo token de color oscuro (`--color-ink` / `--color-ink-light`) en Tailwind v4 vía `@theme` en `app/globals.css`. Cada sección del Home es un componente propio en `components/home/`, ensamblado en `app/page.tsx`.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind CSS v4 (tokens vía `@theme`), sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-25-home-redesign-design.md](../specs/2026-08-25-home-redesign-design.md)

## Global Constraints

- Alcance: solo `app/page.tsx` y los componentes que renderiza. No se tocan Header ni Footer (ni su esquema de color). No se crean páginas nuevas.
- El tema oscuro (`bg-ink` / `bg-ink-light`) aplica **solo** a las secciones del Home. No se modifica el token `--color-navy` existente (usado en otras páginas).
- El copy de ATSOL y ADN se migra **literal** desde `SistemaSanteroTeaser.tsx` a `ProductLines.tsx` — mismo texto, mismos bullets, sin reescribir.
- Todos los links de esta etapa (Hero, RubroFinder, CTA final) apuntan a rutas ya existentes: `/servicios` y `/contacto`. No inventar rutas nuevas.
- No se agrega framework de testing (el proyecto no tiene tests hoy; es fuera de alcance del spec). La verificación de cada tarea es: `npm run build` (compila y type-checka) + `npm run lint`, más una comprobación de contenido con `grep` sobre el HTML estático generado en `.next/server/app/index.html` (Next.js prerenderiza el Home como página estática, así que esto refleja exactamente lo que ve un usuario, sin necesidad de levantar un browser).
- Cada tarea termina con un `npm run build` limpio — si un paso rompe el build, hay que arreglarlo antes de seguir a la tarea siguiente.

---

## Task 1: Tokens de tema oscuro

**Files:**
- Modify: `app/globals.css:16-22`

**Interfaces:**
- Produces: clases Tailwind `bg-ink`, `text-ink`, `border-ink`, `bg-ink-light`, `text-ink-light`, etc. (generadas automáticamente por Tailwind v4 a partir de `--color-ink` / `--color-ink-light` en `@theme`), disponibles para todas las tareas siguientes.

- [ ] **Step 1: Agregar los tokens al bloque `@theme`**

En `app/globals.css`, el bloque actual es:

```css
@theme {
  --color-navy: #2a2a2e;
  --color-brand-red: #d20a10;
  --color-sky: #005faf;
  --color-cream: #f5f5f4;
  --color-cream-card: #f5f5f4;
}
```

Reemplazar por:

```css
@theme {
  --color-navy: #2a2a2e;
  --color-brand-red: #d20a10;
  --color-sky: #005faf;
  --color-cream: #f5f5f4;
  --color-cream-card: #f5f5f4;
  --color-ink: #0f1729;
  --color-ink-light: #1a2540;
}
```

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: `✓ Compiled successfully` y `Route (app)` lista todas las rutas como `○ (Static)`, sin errores.

- [ ] **Step 3: Verificar que el token se generó en el CSS**

Run: `grep -r "0f1729" .next/static/css/ | head -1`
Expected: al menos una coincidencia (confirma que Tailwind generó la clase con el color nuevo).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add dark theme tokens (ink/ink-light) for Home redesign"
```

---

## Task 2: Datos de rubros

**Files:**
- Create: `data/rubros.ts`

**Interfaces:**
- Produces: `type Rubro = { id: string; label: string; imageSrc: string }` y `export const rubros: Rubro[]` — usado por la Task 3 (`RubroFinder`).

- [ ] **Step 1: Crear el archivo de datos**

```ts
export type Rubro = {
  id: string;
  label: string;
  imageSrc: string;
};

export const rubros: Rubro[] = [
  { id: "real-estate", label: "Real Estate", imageSrc: "/img/generales/trabajo-1.png" },
  { id: "hoteleria", label: "Hotelería", imageSrc: "/img/generales/trabajo-2.png" },
  { id: "consorcios", label: "Consorcios", imageSrc: "/img/generales/trabajo-3.png" },
  { id: "clubes-gym", label: "Clubes & Gym", imageSrc: "/img/generales/trabajo-4.png" },
  { id: "natatorios", label: "Natatorios", imageSrc: "/img/generales/trabajo-5.png" },
  { id: "industrias", label: "Industrias", imageSrc: "/img/generales/trabajo-6.png" },
  { id: "balnearios", label: "Balnearios", imageSrc: "/img/generales/trabajo-7.png" },
  { id: "camping", label: "Camping", imageSrc: "/img/generales/trabajo-8.png" },
  { id: "spa-wellness", label: "SPA & Wellness", imageSrc: "/img/generales/trabajo-9.png" },
  { id: "gastronomia", label: "Gastronomía", imageSrc: "/img/generales/trabajo-10.png" },
  { id: "hospitales-clinicas", label: "Hospitales y Clínicas", imageSrc: "/img/generales/equipo-1.png" },
];
```

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores de TypeScript (confirma que el archivo es válido aunque todavía no se importe en ningún lado).

- [ ] **Step 3: Commit**

```bash
git add data/rubros.ts
git commit -m "feat: add rubros data for RubroFinder section"
```

---

## Task 3: Componente RubroFinder + wiring en el Home

**Files:**
- Create: `components/home/RubroFinder.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `rubros` de `@/data/rubros` (Task 2).
- Produces: `export default function RubroFinder(): JSX.Element` — sección renderizada en `app/page.tsx` después del `Hero`.

- [ ] **Step 1: Crear el componente**

```tsx
import Image from "next/image";
import Link from "next/link";
import { rubros } from "@/data/rubros";

export default function RubroFinder() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Encontrá tu solución por rubro
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          No hace falta saber qué equipo necesitás. Elegí lo que administrás
          y te mostramos la solución.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rubros.map((rubro) => (
            <Link
              key={rubro.id}
              href="/servicios"
              className="group relative flex h-40 items-end overflow-hidden rounded-2xl"
            >
              <Image
                src={rubro.imageSrc}
                alt={rubro.label}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
                aria-hidden
              />
              <span className="relative z-10 p-4 font-heading text-sm font-semibold text-white">
                {rubro.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insertar la sección en el Home, después del Hero**

En `app/page.tsx`, agregar el import:

```tsx
import RubroFinder from "@/components/home/RubroFinder";
```

Y agregar `<RubroFinder />` inmediatamente después de `<Hero />` en el JSX devuelto por `Home()`.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores.

- [ ] **Step 4: Verificar contenido renderizado**

Run: `grep -o "Encontrá tu solución por rubro" .next/server/app/index.html`
Expected: la línea coincide (confirma que la sección se renderiza en el HTML estático del Home).

Run: `grep -c "Hospitales y Clínicas" .next/server/app/index.html`
Expected: `1` o más (confirma que los 11 rubros están en el markup).

- [ ] **Step 5: Commit**

```bash
git add components/home/RubroFinder.tsx app/page.tsx
git commit -m "feat: add RubroFinder section to Home"
```

---

## Task 4: Reescribir el Hero

**Files:**
- Modify: `components/home/Hero.tsx` (reescritura completa)

**Interfaces:**
- Produces: `export default function Hero(): JSX.Element` (misma firma, sin props) — ya importado en `app/page.tsx`, no requiere cambios ahí.

- [ ] **Step 1: Reemplazar el contenido del archivo**

```tsx
import Image from "next/image";
import Link from "next/link";

const soluciones = [
  { label: "Agua Caliente Sanitaria", href: "/servicios" },
  { label: "Climatización", href: "/servicios" },
  { label: "Vapor", href: "/servicios" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/caldera-5.png"
        alt="Sala de máquinas Calderas Santero"
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="font-heading text-sm font-semibold tracking-[0.2em] text-brand-red uppercase">
          Industria Argentina desde 1935
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold text-white sm:text-6xl">
          Calidez que perdura.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          Somos una fábrica de soluciones en Agua Caliente Sanitaria,
          Climatización y Vapor para hogares, empresas e industria.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {soluciones.map((solucion) => (
            <Link
              key={solucion.label}
              href={solucion.href}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-red hover:bg-brand-red"
            >
              {solucion.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Verificar contenido renderizado**

Run: `grep -o "Calidez que perdura\." .next/server/app/index.html`
Expected: coincide.

Run: `grep -o "Agua caliente confiable[^<]*" .next/server/app/index.html`
Expected: **sin coincidencias** (confirma que el mensaje viejo y abstracto ya no está).

- [ ] **Step 4: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: rewrite Hero with concrete message and solution buttons"
```

---

## Task 5: Separar Sistema Santero (método) de Productos Principales (ATSOL/ADN)

**Files:**
- Create: `components/home/ProductLines.tsx`
- Modify: `components/home/SistemaSanteroTeaser.tsx` (reescritura completa)
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `export default function ProductLines(): JSX.Element` (nuevo) y `export default function SistemaSanteroTeaser(): JSX.Element` (misma firma que antes, sin props).
- Consumes: ninguno externo — el copy de ATSOL/ADN se migra literal desde la versión actual de `SistemaSanteroTeaser.tsx`.

- [ ] **Step 1: Crear `ProductLines.tsx` con el copy migrado literal**

```tsx
type LineaProducto = {
  id: string;
  nombre: string;
  badge: string;
  subtitulo: string;
  descripcion: string;
  bullets: string[];
};

const lineas: LineaProducto[] = [
  {
    id: "atsol",
    nombre: "ATSOL",
    badge: "Premium",
    subtitulo: "Alta eficiencia con quemadores de modulación",
    descripcion:
      "Circuito cerrado primario con tecnología acuotubular. Serpentinas de acero inoxidable intercambiables para múltiples servicios simultáneos. Ideal para proyectos de gran escala.",
    bullets: [
      "Sin acumulación — sin termotanques ni tanques intermediarios",
      "Mantenimiento casi nulo — sin ánodos, sin purgas, sin repintados",
      "Abastece distintas presiones y circuitos independientes",
      "Reduce el consumo de gas hasta un 30%",
      "Múltiples servicios desde un solo equipo",
    ],
  },
  {
    id: "adn",
    nombre: "ADN",
    badge: "Relación precio-calidad",
    subtitulo: "Ideal para reemplazar termotanques industriales",
    descripcion:
      'Nace de la excelencia técnica del ATSOL, adaptada para proyectos que buscan equilibrio entre precio y calidad. Reemplaza termotanques de 300 a 1.000 litros o climatizadores de piscina convencionales.',
    bullets: [
      'Protección "baño maría" — igual que la línea premium',
      "Sin piloto permanente — encendido electrónico por demanda",
      "Sistema compacto — adapta a normativas vigentes de salas de máquinas",
      "Elimina gastos fijos de mantenimiento tradicional",
      "Control digital integrado",
    ],
  },
];

export default function ProductLines() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Productos Principales
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Las dos líneas de generación de agua caliente que respaldan el
          Sistema Santero.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {lineas.map((linea) => (
            <div key={linea.id} className="overflow-hidden rounded-2xl bg-white">
              <div className="bg-gradient-to-br from-navy to-sky px-6 py-6">
                <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                  {linea.badge}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-white">
                  {linea.nombre}
                </h3>
                <p className="mt-1 text-sm text-white/80">{linea.subtitulo}</p>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-zinc-600">
                  {linea.descripcion}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {linea.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-zinc-700"
                    >
                      <span className="mt-0.5 shrink-0 text-sky">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Reescribir `SistemaSanteroTeaser.tsx` enfocado solo en el método**

```tsx
type Paso = {
  numero: string;
  titulo: string;
  descripcion: string;
};

const pasos: Paso[] = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    descripcion:
      "Relevamos la instalación existente y las necesidades reales de agua caliente, climatización o vapor del proyecto.",
  },
  {
    numero: "02",
    titulo: "Propuesta",
    descripcion:
      "Dimensionamos el sistema de calentamiento indirecto más eficiente para cada escala de negocio.",
  },
  {
    numero: "03",
    titulo: "Instalación",
    descripcion:
      "Supervisamos y ejecutamos el montaje para garantizar un funcionamiento seguro desde el primer día.",
  },
  {
    numero: "04",
    titulo: "Mantenimiento",
    descripcion:
      "Guardia técnica y mantenimiento preventivo para prolongar la vida útil de la instalación.",
  },
];

export default function SistemaSanteroTeaser() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-heading text-sm font-semibold tracking-wide text-brand-red uppercase">
          Ingeniería propia. Tecnología avanzada.
        </p>
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl">
          Sistema Santero
        </h2>
        <p className="mt-4 max-w-2xl text-white/80">
          Un sistema de calentamiento indirecto que genera agua caliente de
          forma instantánea, sin acumulación y con mínima formación de
          sarro, prolongando la vida útil de las instalaciones y reduciendo
          el consumo energético.
        </p>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso) => (
            <li key={paso.numero} className="rounded-2xl bg-ink-light p-6">
              <span className="font-heading text-3xl font-bold text-brand-red">
                {paso.numero}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                {paso.titulo}
              </h3>
              <p className="mt-2 text-sm text-white/70">{paso.descripcion}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Agregar `ProductLines` al Home, después de `SistemaSanteroTeaser`**

En `app/page.tsx`, agregar el import:

```tsx
import ProductLines from "@/components/home/ProductLines";
```

Y agregar `<ProductLines />` inmediatamente después de `<SistemaSanteroTeaser />`.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Verificar contenido renderizado**

```bash
grep -o "Reduce el consumo de gas hasta un 30%" .next/server/app/index.html
grep -o "Productos Principales" .next/server/app/index.html
grep -o "Diagnóstico" .next/server/app/index.html
```

Expected: las tres coinciden (confirma que ATSOL/ADN siguen con su copy real, ahora en su propia sección, y que Sistema Santero muestra los pasos del método).

- [ ] **Step 6: Commit**

```bash
git add components/home/ProductLines.tsx components/home/SistemaSanteroTeaser.tsx app/page.tsx
git commit -m "feat: split Sistema Santero (método) from Productos Principales (ATSOL/ADN)"
```

---

## Task 6: Restyle de Casos de Éxito a paleta oscura

**Files:**
- Modify: `components/home/CasesPreview.tsx:15-19,27,34-38,42-49,53,57`

**Interfaces:**
- Sin cambios de props ni de lógica — solo clases de Tailwind.

- [ ] **Step 1: Aplicar los cambios de clase**

En `components/home/CasesPreview.tsx`, reemplazar:

```tsx
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-bold tracking-wide text-navy uppercase sm:text-4xl">
          Casos de Éxito
        </h2>
```

por:

```tsx
    <section className="bg-ink px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
          Casos de Éxito
        </h2>
```

Reemplazar:

```tsx
              <div key={segmento.id} className="border-b border-zinc-200 first:border-t">
                <button
                  type="button"
                  onClick={() => setAbierto(open ? null : segmento.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-8 text-left"
                >
                  <span className="flex items-baseline gap-3 sm:gap-5">
                    <span className="text-sm text-brand-red/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-lg font-bold tracking-wide text-navy uppercase sm:text-2xl lg:text-3xl">
                      {segmento.label}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-2xl text-navy transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ⌄
                  </span>
                </button>
```

por:

```tsx
              <div key={segmento.id} className="border-b border-white/10 first:border-t">
                <button
                  type="button"
                  onClick={() => setAbierto(open ? null : segmento.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-8 text-left"
                >
                  <span className="flex items-baseline gap-3 sm:gap-5">
                    <span className="text-sm text-brand-red/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-lg font-bold tracking-wide text-white uppercase sm:text-2xl lg:text-3xl">
                      {segmento.label}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-2xl text-white transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ⌄
                  </span>
                </button>
```

Reemplazar:

```tsx
                        className="relative flex h-16 items-center justify-center rounded-lg border border-zinc-200 bg-white p-2"
```

por:

```tsx
                        className="relative flex h-16 items-center justify-center rounded-lg border border-white/10 bg-white p-2"
```

(se mantiene `bg-white` en el tile para que los logos con fondo transparente se sigan viendo bien).

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Verificar visualmente en el HTML**

Run: `grep -o 'bg-ink px-6 py-24' .next/server/app/index.html`
Expected: coincide (confirma que la clase se aplicó a la sección correcta).

- [ ] **Step 4: Commit**

```bash
git add components/home/CasesPreview.tsx
git commit -m "style: restyle CasesPreview to dark palette"
```

---

## Task 7: Restyle de Historia/Trayectoria y reubicación en el Home

**Files:**
- Modify: `components/HistoryTimeline.tsx` (función `HistoryTimeline` y `TimelineCard`, sin tocar el array `historia`)
- Modify: `app/page.tsx`

**Interfaces:**
- Sin cambios de props ni de lógica — solo clases de Tailwind y la posición del `import`/uso en `app/page.tsx`.

- [ ] **Step 1: Restyle de `HistoryTimeline.tsx`**

Reemplazar la función `HistoryTimeline` (sin tocar el array `historia` ni el tipo `HitoHistoria`):

```tsx
export default function HistoryTimeline() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-2xl text-white sm:text-3xl">
          Somos más que una compañía.
          <br />
          Somos{" "}
          <span className="font-bold">
            trayectoria, tecnología, compromiso y mejora constante
          </span>
          .
        </h2>

        <ol className="relative mt-16 flex flex-col gap-10 sm:gap-16">
          <div
            className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-brand-red/30 sm:block"
            aria-hidden
          />

          {historia.map((hito, index) => {
            const cardOnRight = index % 2 === 0;

            return (
              <li
                key={hito.id}
                className="relative flex flex-col items-center gap-2 sm:flex-row sm:gap-12"
              >
                <span
                  className={`font-heading text-lg font-bold tracking-wide text-brand-red uppercase sm:flex-1 sm:text-5xl sm:font-normal sm:tracking-normal sm:text-brand-red/60 sm:normal-case lg:text-6xl ${
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
                  <TimelineCard hito={hito} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TimelineCard({ hito }: { hito: HitoHistoria }) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-ink-light p-6">
      <h3 className="font-heading text-lg font-semibold text-white">
        {hito.titulo}
      </h3>
      <p className="mt-2 text-sm text-white/70">{hito.descripcion}</p>
    </div>
  );
}
```

- [ ] **Step 2: Reubicar en `app/page.tsx`**

Mover el `import HistoryTimeline from "@/components/HistoryTimeline";` y el uso de `<HistoryTimeline />` para que queden **después** de `<CasesPreview logosPorSegmento={logosPorSegmento} />` y **antes** de `<Faq />` (hoy está justo después del `Hero`).

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Verificar orden en el HTML renderizado**

```bash
python3 -c "
html = open('.next/server/app/index.html').read()
i_cases = html.index('Casos de Éxito')
i_history = html.index('Somos más que una compañía')
i_faq = html.index('Preguntas Frecuentes')
assert i_cases < i_history < i_faq, 'orden incorrecto'
print('orden OK: Casos de Éxito -> Historia -> FAQ')
"
```

Expected: imprime `orden OK: Casos de Éxito -> Historia -> FAQ`.

- [ ] **Step 5: Commit**

```bash
git add components/HistoryTimeline.tsx app/page.tsx
git commit -m "style: restyle HistoryTimeline to dark palette and move it below Casos de Éxito"
```

---

## Task 8: Restyle de FAQ a paleta oscura

**Files:**
- Modify: `components/home/Faq.tsx:77-94`

**Interfaces:**
- Sin cambios de props, de estado ni de lógica — solo clases de Tailwind.

- [ ] **Step 1: Aplicar los cambios de clase**

En `components/home/Faq.tsx`, reemplazar el bloque de apertura de la sección:

```tsx
<section id="faqs" className="scroll-mt-28 px-6 py-16">
  <div className="mx-auto max-w-6xl rounded-3xl bg-cream p-8 sm:p-16">
    <h2 className="text-center font-heading text-3xl font-bold text-brand-red">
      Preguntas Frecuentes
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-navy/70">
```

por:

```tsx
<section id="faqs" className="scroll-mt-28 bg-ink px-6 py-16">
  <div className="mx-auto max-w-6xl rounded-3xl bg-ink-light p-8 sm:p-16">
    <h2 className="text-center font-heading text-3xl font-bold text-white">
      Preguntas Frecuentes
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-white/70">
```

Y el bloque de cada pregunta:

```tsx
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
```

por:

```tsx
<div
  key={item.id}
  className="rounded-lg border border-white/10 bg-ink px-5 py-4"
>
  <button
    type="button"
    onClick={() => setAbierta(open ? null : item.id)}
    aria-expanded={open}
    className="flex w-full items-center justify-between gap-4 text-left"
  >
    <span className="font-heading text-sm font-semibold text-white">
      {item.pregunta}
    </span>
```

Y la respuesta abierta: cambiar `text-zinc-600` por `text-white/70`.

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Verificar en el HTML**

Run: `grep -o 'id="faqs" class="scroll-mt-28 bg-ink' .next/server/app/index.html`
Expected: coincide.

- [ ] **Step 4: Commit**

```bash
git add components/home/Faq.tsx
git commit -m "style: restyle Faq to dark palette"
```

---

## Task 9: CTA final con copy específico y limpieza de ServicesPreview

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Sin cambios de firma en `CtaBanner` (ya acepta `titulo`, `descripcion`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`) — solo cambian los valores pasados desde `app/page.tsx`.

- [ ] **Step 1: Quitar `ServicesPreview` del Home**

`components/home/ServicesPreview.tsx` no forma parte del nuevo orden del Home (spec: la información de servicios ahora se encuentra a través del buscador por rubro, Sistema Santero y Productos Principales; el detalle completo de servicios vive en `/servicios`). Quitar el `import ServicesPreview from "@/components/home/ServicesPreview";` y el `<ServicesPreview />` de `app/page.tsx`. El archivo `components/home/ServicesPreview.tsx` no se borra (queda sin uso, disponible por si se necesita en otro lado).

- [ ] **Step 2: Actualizar el copy del CTA final**

En `app/page.tsx`, cambiar:

```tsx
<CtaBanner
  titulo="¿Listo para modernizar su planta?"
  descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
  primaryLabel="Ver Soluciones Técnicas"
  primaryHref="/servicios"
  secondaryLabel="Agendar Consultoría"
  secondaryHref="/contacto"
/>
```

por:

```tsx
<CtaBanner
  titulo="¿Listo para modernizar su planta?"
  descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
  primaryLabel="Cotizar mi proyecto"
  primaryHref="/contacto"
  secondaryLabel="Agendar videollamada"
  secondaryHref="/contacto"
/>
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Verificar en el HTML**

```bash
grep -o "Cotizar mi proyecto" .next/server/app/index.html
grep -o "Agendar videollamada" .next/server/app/index.html
grep -c "Nuestros Servicios" .next/server/app/index.html
```

Expected: las dos primeras coinciden; la tercera devuelve `0` (confirma que la sección `ServicesPreview` ya no se renderiza en el Home).

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update final CTA copy and remove ServicesPreview from Home"
```

---

## Task 10: Verificación final integral

**Files:**
- No modifica archivos (solo verificación).

- [ ] **Step 1: Build y lint limpios**

```bash
npm run build
npm run lint
```

Expected: ambos sin errores.

- [ ] **Step 2: Verificar el orden completo de secciones en el HTML final**

```bash
python3 -c "
html = open('.next/server/app/index.html').read()
marcas = [
    'Calidez que perdura',
    'Encontrá tu solución por rubro',
    'Sistema Santero',
    'Productos Principales',
    'Casos de Éxito',
    'Somos más que una compañía',
    'Preguntas Frecuentes',
    'Cotizar mi proyecto',
]
posiciones = [html.index(m) for m in marcas]
assert posiciones == sorted(posiciones), f'orden incorrecto: {list(zip(marcas, posiciones))}'
print('Orden de secciones OK:', marcas)
"
```

Expected: imprime `Orden de secciones OK: [...]` con la lista completa.

- [ ] **Step 3: Chequeo visual en el navegador (desktop y mobile)**

```bash
npm run dev
```

Con el servidor corriendo en `http://localhost:3000`, abrir el Home en el browser (herramienta de preview), tomar una captura en viewport desktop (1280×800) y otra en mobile (375×812), y confirmar:
- El Hero muestra "Calidez que perdura." con los 3 botones de solución.
- El grid de rubros se ve completo y legible en ambos tamaños.
- No hay texto blanco sobre fondo blanco ni contraste roto en ninguna sección.
- El menú mobile del Header (hamburguesa) sigue abriendo y cerrando correctamente sobre el nuevo fondo oscuro.

Si algo se ve roto, corregirlo antes de continuar (no commitear con problemas visuales conocidos).

- [ ] **Step 4: Commit final (si hubo ajustes del Step 3)**

```bash
git add -A
git commit -m "fix: visual adjustments after full-page review"
```

(Si no hubo ajustes, este paso se omite.)
