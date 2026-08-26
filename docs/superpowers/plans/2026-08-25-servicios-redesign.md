# Rediseño de Servicios (Calderas Santero) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la grilla plana de 8 servicios por 3 pilares (Ingeniería & Proyectos / Instalación & Puesta en Marcha / Soporte & Postventa) y llevar la página `/servicios` al tema oscuro del resto del sitio.

**Architecture:** Página estática de Next.js (sin estado de cliente). El copy de los 8 servicios se migra literal desde `data/servicios-detalle.ts` a un nuevo archivo `data/servicios-pilares.ts` que los agrupa en 3 pilares. `ServicesList.tsx` se reemplaza por `ServicePillars.tsx`.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4 — sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-25-servicios-redesign-design.md](../specs/2026-08-25-servicios-redesign-design.md)

## Global Constraints

- El copy de los 8 servicios (títulos y descripciones) se migra **literal** desde `data/servicios-detalle.ts` — mismo texto, sin reescribir ni una palabra. `data/servicios-detalle.ts` no se borra ni se modifica (queda como fuente histórica, aunque deje de usarse).
- Tema oscuro en toda la página: `bg-ink` / `bg-ink-light` / `text-brand-red-light` (tokens ya creados en `app/globals.css`, no se crean tokens nuevos).
- No se tocan Header, Footer, ni ninguna otra página.
- No se agrega framework de testing. Verificación: `npm run build` + `npm run lint` + greps sobre el HTML estático generado (la página es 100% estática, sin `{condición && ...}`, así que todo el contenido aparece siempre en el HTML).

---

## Task 1: Datos de los 3 pilares de servicios

**Files:**
- Create: `data/servicios-pilares.ts`

**Interfaces:**
- Produces: `type ServicioItem = { titulo: string; descripcion: string }`, `type ServicioPilar = { id: string; numero: string; titulo: string; bajada: string; items: ServicioItem[] }`, `export const serviciosPilares: ServicioPilar[]` (3 elementos) — usado por la Task 3 (`ServicePillars.tsx`).

- [ ] **Step 1: Crear el archivo de datos**

```ts
export type ServicioItem = {
  titulo: string;
  descripcion: string;
};

export type ServicioPilar = {
  id: string;
  numero: string;
  titulo: string;
  bajada: string;
  items: ServicioItem[];
};

export const serviciosPilares: ServicioPilar[] = [
  {
    id: "ingenieria-proyectos",
    numero: "01",
    titulo: "Ingeniería & Proyectos",
    bajada:
      "Relevamiento, asesoramiento técnico, documentación BIM y fabricación a medida — todo el trabajo previo a la obra.",
    items: [
      {
        titulo: "Consultoría y Soporte",
        descripcion:
          "No vendemos por vender. Acompañamos a nuestros clientes en la toma de decisiones para encontrar la solución más eficiente según las características de cada proyecto.",
      },
      {
        titulo: "Asesoramiento Técnico y Relevamientos",
        descripcion:
          "Realizamos visitas presenciales o videollamadas a planta y obra para diagnosticar necesidades reales y dimensionar correctamente cada sistema.",
      },
      {
        titulo: "Ingeniería de Proyectos",
        descripcion:
          "Diseñamos soluciones térmicas personalizadas para hoteles, clubes, edificios de gran escala y complejos residenciales.",
      },
      {
        titulo: "Fabricación a Medida",
        descripcion:
          "Desarrollamos equipos adaptados a los requerimientos técnicos específicos de cada instalación, optimizando rendimiento, eficiencia y durabilidad.",
      },
      {
        titulo: "Documentación Técnica BIM",
        descripcion:
          "Generamos fichas técnicas y modelos 3D para facilitar la integración de nuestros equipos en proyectos de arquitectura e ingeniería desarrollados bajo metodología BIM.",
      },
    ],
  },
  {
    id: "instalacion-puesta-en-marcha",
    numero: "02",
    titulo: "Instalación & Puesta en Marcha",
    bajada:
      "Montaje supervisado y calibración de equipos para un arranque seguro desde el primer día.",
    items: [
      {
        titulo: "Instalación y Puesta en Marcha",
        descripcion:
          "Supervisamos y ejecutamos el montaje de los equipos para garantizar una operación segura y un funcionamiento óptimo desde el primer día.",
      },
    ],
  },
  {
    id: "soporte-postventa",
    numero: "03",
    titulo: "Soporte & Postventa (SILA / Guardia 24hs)",
    bajada:
      "Mantenimiento preventivo, repuestos originales y guardia técnica telefónica/presencial las 24 horas.",
    items: [
      {
        titulo: "Mantenimiento Preventivo y Correctivo",
        descripcion:
          "Brindamos servicio técnico especializado para prolongar la vida útil de las unidades y asegurar su máximo desempeño.",
      },
      {
        titulo: "Guardia Técnica",
        descripcion:
          "Ofrecemos soporte telefónico y asistencia presencial para que cada cliente cuente con respaldo cuando lo necesite.",
      },
    ],
  },
];
```

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores de TypeScript.

- [ ] **Step 3: Verificar que el copy coincide con la fuente original (literal, palabra por palabra)**

Cada uno de estos 8 checks busca una frase distintiva de la descripción original de `data/servicios-detalle.ts` dentro del nuevo `data/servicios-pilares.ts`:

```bash
grep -c "No vendemos por vender" data/servicios-pilares.ts
grep -c "diagnosticar necesidades reales" data/servicios-pilares.ts
grep -c "hoteles, clubes, edificios de gran escala" data/servicios-pilares.ts
grep -c "optimizando rendimiento, eficiencia y durabilidad" data/servicios-pilares.ts
grep -c "funcionamiento óptimo desde el primer día" data/servicios-pilares.ts
grep -c "prolongar la vida útil de las unidades" data/servicios-pilares.ts
grep -c "respaldo cuando lo necesite" data/servicios-pilares.ts
grep -c "metodología BIM" data/servicios-pilares.ts
```

Expected: los 8 comandos devuelven `1` (cada frase aparece exactamente una vez, confirmando que las 8 descripciones se migraron literales).

- [ ] **Step 4: Commit**

```bash
git add data/servicios-pilares.ts
git commit -m "feat: add servicios-pilares data grouping the 8 services into 3 pillars"
```

---

## Task 2: Restyle del Hero de Servicios a paleta oscura

**Files:**
- Modify: `components/servicios/Hero.tsx:5`

**Interfaces:**
- Sin cambios de props ni de lógica — un solo cambio de clase.

- [ ] **Step 1: Cambiar el fondo de la sección**

En `components/servicios/Hero.tsx`, cambiar:

```tsx
    <section className="bg-navy px-6 py-28 sm:py-36">
```

por:

```tsx
    <section className="bg-ink px-6 py-28 sm:py-36">
```

(El resto del archivo ya usa `text-white`/`text-white/80`, que funcionan igual sobre `bg-ink` que sobre `bg-navy` — no requieren cambios.)

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Verificar en el HTML estático**

```bash
grep -o 'bg-ink px-6 py-28' .next/server/app/servicios.html
```

Expected: coincide.

- [ ] **Step 4: Commit**

```bash
git add components/servicios/Hero.tsx
git commit -m "style: restyle Servicios Hero to dark palette"
```

---

## Task 3: Reemplazar la grilla de 8 servicios por los 3 pilares

**Files:**
- Create: `components/servicios/ServicePillars.tsx`
- Delete: `components/servicios/ServicesList.tsx`
- Modify: `app/servicios/page.tsx`

**Interfaces:**
- Consumes: `serviciosPilares` de `@/data/servicios-pilares` (Task 1).
- Produces: `export default function ServicePillars(): JSX.Element` (sin props) — reemplaza a `ServicesList` en `app/servicios/page.tsx`.

- [ ] **Step 1: Crear `ServicePillars.tsx`**

```tsx
import { serviciosPilares } from "@/data/servicios-pilares";

export default function ServicePillars() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {serviciosPilares.map((pilar) => (
          <div key={pilar.id} className="rounded-3xl bg-ink-light p-8 sm:p-12">
            <span className="font-heading text-sm font-bold text-brand-red-light">
              {pilar.numero}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
              {pilar.titulo}
            </h2>
            <p className="mt-3 max-w-2xl text-white/70">{pilar.bajada}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {pilar.items.map((item) => (
                <div key={item.titulo} className="border-t border-white/10 pt-4">
                  <h3 className="font-heading text-sm font-bold tracking-tight text-white uppercase">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Borrar el archivo viejo**

```bash
rm components/servicios/ServicesList.tsx
```

- [ ] **Step 3: Actualizar `app/servicios/page.tsx`**

Reemplazar el archivo completo:

```tsx
import type { Metadata } from "next";
import Hero from "@/components/servicios/Hero";
import ServicePillars from "@/components/servicios/ServicePillars";
import CtaBanner from "@/components/CtaBanner";

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
      <CtaBanner
        titulo="Optimice su rendimiento térmico"
        descripcion="Nuestros especialistas están listos para realizar un diagnóstico técnico de sus necesidades y proponer la solución más eficiente."
        primaryLabel="Solicitar asesoramiento técnico"
        primaryHref="/contacto"
        secondaryLabel="Ver catálogo completo"
        secondaryHref="/sistema-santero"
        tone="dark"
      />
    </>
  );
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores (confirma que no queda ninguna referencia rota a `ServicesList`).

- [ ] **Step 5: Verificar estructura en el HTML estático**

```bash
grep -c "Ingeniería & Proyectos" .next/server/app/servicios.html
grep -c "Instalación & Puesta en Marcha" .next/server/app/servicios.html
grep -c "Soporte & Postventa" .next/server/app/servicios.html
```

Expected: los tres devuelven `1` o más (cada título de pilar aparece).

```bash
grep -o 'text-sm font-bold tracking-tight text-white uppercase' .next/server/app/servicios.html | wc -l
```

Expected: `8` (un `<h3>` por cada uno de los 8 ítems, sumando los 3 pilares: 5 + 1 + 2).

```bash
grep -c "01/08" .next/server/app/servicios.html
```

Expected: `0` (confirma que la numeración vieja "01/08, 02/08..." de la grilla plana ya no existe).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: replace flat 8-item services grid with 3 service pillars"
```

---

## Task 4: Verificación final integral

**Files:**
- No modifica archivos, salvo que la verificación visual encuentre algo roto (en ese caso, arreglarlo aquí mismo y commitear).

- [ ] **Step 1: Build y lint limpios**

```bash
npm run build
npm run lint
```

Expected: ambos sin errores.

- [ ] **Step 2: Confirmar que no queda ninguna referencia al componente viejo**

```bash
grep -rl "ServicesList" app/ components/ 2>/dev/null
```

Expected: sin salida (ningún archivo referencia el componente borrado).

- [ ] **Step 3: Chequeo visual en el navegador (desktop y mobile)**

Levantar el servidor de desarrollo (`npm run dev`) y abrir `/servicios`. Confirmar:
- El Hero se ve oscuro (`bg-ink`), consistente con el Home y el resto del sitio.
- Los 3 pilares se ven como cards separadas, cada una con su número, título, bajada, y sus ítems adentro (5 en el primero, 1 en el segundo, 2 en el tercero) — no como una grilla plana de 8.
- El CTA final tiene fondo oscuro (`tone="dark"`), sin franja blanca antes del footer.
- En mobile, los ítems dentro de cada pilar pasan a una sola columna (el `sm:grid-cols-2` colapsa correctamente).

Si algo se ve roto, corregirlo antes de continuar.

- [ ] **Step 4: Commit final (solo si hubo ajustes del Step 3)**

```bash
git add -A && git commit -m "fix: visual adjustments after Servicios review"
```

(Si no hubo ajustes, se omite este paso.)
