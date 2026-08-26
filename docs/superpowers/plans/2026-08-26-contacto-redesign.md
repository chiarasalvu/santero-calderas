# Rediseño de Contacto + CTAs contextuales (Calderas Santero) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/contacto` a paleta oscura y agregar un selector de "motivo de consulta" (`?motivo=<slug>`) que los CTAs del resto del sitio puedan usar para llegar con una intención específica preseleccionada.

**Architecture:** `app/contacto/page.tsx` sigue siendo un Server Component estático — no lee `searchParams` directamente. Dos componentes cliente puntuales (`MotivoSelector`, `ContactForm`), cada uno envuelto en su propio `<Suspense>`, usan `useSearchParams()` de `next/navigation` para leer el motivo sin forzar a toda la página a renderizado dinámico.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4 — sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-26-contacto-redesign-design.md](../specs/2026-08-26-contacto-redesign-design.md)

## Global Constraints

- `app/contacto/page.tsx` no se modifica — no debe leer `searchParams` como prop. Toda la lógica de motivo vive en componentes cliente (`MotivoSelector`, `ContactForm`).
- **Todo componente que llame a `useSearchParams()` debe estar envuelto en `<Suspense>` en el punto donde se renderiza**, o `npm run build` falla con el error "Missing Suspense boundary with useSearchParams" — este error NO aparece en `npm run dev`, así que `npm run build` es la única verificación real de esto.
- La ruta `/contacto` debe seguir apareciendo como `○ (Static)` en la salida de `npm run build` (no `ƒ (Dynamic)`) — confirma que el patrón de Suspense funcionó y no se degradó a renderizado dinámico.
- El formulario sigue sin conectarse a un backend real — se mantiene la confirmación simulada (`setEnviado(true)`) que ya existe.
- No se agrega framework de testing. Verificación: `npm run build` + `npm run lint` + greps sobre el HTML estático + chequeo interactivo en navegador para el comportamiento dependiente de `?motivo=`.

---

## Task 1: Datos de motivos y componente selector

**Files:**
- Create: `data/motivos-contacto.ts`
- Create: `components/contacto/MotivoSelector.tsx`

**Interfaces:**
- Produces: `type MotivoContacto = { slug: string; label: string }`, `export const motivosContacto: MotivoContacto[]` (4 elementos) — usado por la Task 2 (`MotivoSelector`) y la Task 3 (`ContactForm`).
- Produces: `export default function MotivoSelector(): JSX.Element` — componente cliente, usado por la Task 2 dentro de un `<Suspense>`.

- [ ] **Step 1: Crear `data/motivos-contacto.ts`**

```ts
export type MotivoContacto = {
  slug: string;
  label: string;
};

export const motivosContacto: MotivoContacto[] = [
  { slug: "cotizar-proyecto", label: "Cotizar mi proyecto" },
  { slug: "visita-tecnica", label: "Solicitar visita técnica en obra" },
  { slug: "ficha-tecnica", label: "Descargar ficha técnica" },
  { slug: "guardia-24hs", label: "Contactar Guardia Técnica 24hs" },
];
```

- [ ] **Step 2: Crear `components/contacto/MotivoSelector.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motivosContacto } from "@/data/motivos-contacto";

export default function MotivoSelector() {
  const searchParams = useSearchParams();
  const motivoActivo = searchParams.get("motivo");

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {motivosContacto.map((motivo) => {
        const active = motivoActivo === motivo.slug;
        return (
          <Link
            key={motivo.slug}
            href={`/contacto?motivo=${motivo.slug}#formulario`}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              active
                ? "border-brand-red bg-brand-red text-white"
                : "border-white/30 text-white hover:border-brand-red hover:bg-brand-red"
            }`}
          >
            {motivo.label}
          </Link>
        );
      })}
    </div>
  );
}
```

**Nota:** este componente todavía no se usa en ninguna página (eso es la Task 2). `npm run build` debe compilar igual, ya que TypeScript no exige que un componente exportado esté siendo consumido.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores.

- [ ] **Step 4: Commit**

```bash
git add data/motivos-contacto.ts components/contacto/MotivoSelector.tsx
git commit -m "feat: add motivos-contacto data and MotivoSelector component"
```

---

## Task 2: Restyle del Hero de Contacto + selector de motivo

**Files:**
- Modify: `components/contacto/Hero.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `MotivoSelector` de `@/components/contacto/MotivoSelector` (Task 1).

- [ ] **Step 1: Reemplazar el contenido completo del archivo**

```tsx
import { Suspense } from "react";
import MotivoSelector from "@/components/contacto/MotivoSelector";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-24 pb-10 sm:py-28">
      <div className="mx-auto mt-12 max-w-6xl">
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
          Contacto
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
          Escribinos y te respondemos a la brevedad. Nuestro equipo técnico
          está listo para asesorarte en tu próximo proyecto.
        </p>

        <Suspense fallback={null}>
          <MotivoSelector />
        </Suspense>
      </div>
    </section>
  );
}
```

**Importante:** `<MotivoSelector />` debe quedar envuelto en `<Suspense fallback={null}>` — sin esto, `npm run build` va a fallar (aunque `npm run dev` funcione igual). No omitir el `Suspense` aunque parezca innecesario.

- [ ] **Step 2: Verificar build (clave: acá es donde fallaría si falta el `Suspense`)**

Run: `npm run build`
Expected: `✓ Compiled successfully`. En la tabla de rutas impresa al final, `/contacto` debe seguir apareciendo en el grupo `○ (Static)`, no en un grupo `ƒ (Dynamic)`.

- [ ] **Step 3: Verificar en el HTML estático**

```bash
grep -o "Cotizar mi proyecto" .next/server/app/contacto.html
grep -o "Solicitar visita técnica en obra" .next/server/app/contacto.html
grep -o "Descargar ficha técnica" .next/server/app/contacto.html
grep -o "Contactar Guardia Técnica 24hs" .next/server/app/contacto.html
```

Expected: los cuatro coinciden (confirma que los 4 botones de motivo se renderizan en el HTML estático inicial, sin motivo activo, ya que durante el build no hay query string real).

- [ ] **Step 4: Commit**

```bash
git add components/contacto/Hero.tsx
git commit -m "style: restyle Contacto Hero to dark palette and add MotivoSelector"
```

---

## Task 3: Restyle de ContactForm + ContactSection (van juntas: el `Suspense` de una depende de la otra)

**Files:**
- Modify: `components/ContactForm.tsx` (reescritura completa)
- Modify: `components/contacto/ContactSection.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `motivosContacto` de `@/data/motivos-contacto` (Task 1) en `ContactForm.tsx`.
- `ContactSection.tsx` sigue consumiendo `ContactForm` de `@/components/ContactForm`, ahora envuelto en `<Suspense>`.

**Por qué van en la misma tarea:** `ContactForm.tsx` pasa a usar `useSearchParams()`, lo que exige que quien lo renderice lo envuelva en `<Suspense>` — eso lo hace `ContactSection.tsx`. Si se hicieran en tareas separadas, el build quedaría roto entre una tarea y la siguiente (con el error "Missing Suspense boundary with useSearchParams", que no aparece en `npm run dev`, solo en `npm run build`). Se cambian los dos archivos juntos para que el build quede verde al final de esta única tarea.

- [ ] **Step 1: Reemplazar el contenido completo del archivo**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motivosContacto } from "@/data/motivos-contacto";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const motivoInicial = searchParams.get("motivo") ?? "";
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="rounded-2xl bg-ink-light p-8 text-center">
        <p className="font-heading text-lg font-semibold text-white">
          ¡Gracias por tu mensaje!
        </p>
        <p className="mt-2 text-sm text-white/70">
          Nos pondremos en contacto a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="formulario" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="motivo" className="text-sm font-medium text-white">
          Motivo de consulta
        </label>
        <select
          id="motivo"
          name="motivo"
          defaultValue={motivoInicial}
          className="rounded-lg border border-white/20 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        >
          <option value="">Seleccioná un motivo</option>
          {motivosContacto.map((motivo) => (
            <option key={motivo.slug} value={motivo.slug}>
              {motivo.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="text-sm font-medium text-white">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="rounded-lg border border-white/20 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-white/20 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="telefono" className="text-sm font-medium text-white">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="rounded-lg border border-white/20 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensaje" className="text-sm font-medium text-white">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          className="rounded-lg border border-white/20 bg-ink px-4 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
```

**Nota:** este componente ya tenía `"use client"` desde antes (usa `useState`). Ahora también llama a `useSearchParams()` — sigue siendo válido en un client component, pero **quien lo renderice debe envolverlo en `<Suspense>`**. El Step 2 de esta misma tarea hace exactamente eso en `ContactSection.tsx` — no correr `npm run build` hasta haber aplicado también el Step 2, o va a fallar con "Missing Suspense boundary with useSearchParams".

- [ ] **Step 2: Reemplazar el contenido completo de `components/contacto/ContactSection.tsx`**

```tsx
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

const datosContacto = [
  { label: "Tel", valor: "(011) 4931-0294 / 0183" },
  { label: "WhatsApp", valor: "+54 9 11 2866-8485" },
  { label: "Fábrica", valor: "Dr. Pedro Baliña 4046, C1437HSD, CABA" },
  { label: "Administración", valor: "Constitución 3227/29, C1254ABC, CABA" },
];

export default function ContactSection() {
  return (
    <section className="bg-ink px-6 pt-8 pb-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-ink-light p-8">
          <h2 className="font-heading text-xl font-bold text-white">
            Envianos tu consulta
          </h2>
          <div className="mt-6">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-ink-light p-8">
            <h3 className="font-heading text-xl font-bold text-white">
              Datos de contacto
            </h3>
            <dl className="mt-4 flex flex-col gap-3">
              {datosContacto.map((dato) => (
                <div key={dato.label}>
                  <dt className="text-xs font-semibold tracking-wide text-brand-red-light uppercase">
                    {dato.label}
                  </dt>
                  <dd className="text-sm text-white/70">{dato.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="h-56 overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0674251889054!2d-58.406006999999995!3d-34.6530001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb023a387d97%3A0x1bee099adfe56ea0!2sCalderas%20Santero!5e0!3m2!1ses!2sar!4v1782930687719!5m2!1ses!2sar"
              className="h-full w-full border-0"
              title="Ubicación de Calderas Santero en el mapa"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar build (acá el build DEBE quedar limpio, incluyendo el `Suspense`)**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin el error de "Missing Suspense boundary". `/contacto` sigue en el grupo `○ (Static)` de la tabla de rutas.

- [ ] **Step 4: Verificar en el HTML estático**

```bash
grep -o "Motivo de consulta" .next/server/app/contacto.html
grep -o "Seleccioná un motivo" .next/server/app/contacto.html
grep -o "Envianos tu consulta" .next/server/app/contacto.html
grep -o "Datos de contacto" .next/server/app/contacto.html
```

Expected: los cuatro coinciden.

- [ ] **Step 5: Commit**

```bash
git add components/ContactForm.tsx components/contacto/ContactSection.tsx
git commit -m "style: restyle ContactForm and ContactSection to dark palette, add motivo select and Suspense boundary"
```

---

## Task 4: Actualizar los CTAs de Home y Servicios para linkear con motivo

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/servicios/page.tsx`

**Interfaces:**
- Sin cambios de props ni de componentes — solo cambian los valores de `primaryHref`/`secondaryHref` que ya se le pasaban a `CtaBanner`.

- [ ] **Step 1: Actualizar el `CtaBanner` de `app/page.tsx`**

Reemplazar:

```tsx
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto"
        secondaryLabel="Agendar videollamada"
        secondaryHref="/contacto"
        tone="dark"
      />
```

por:

```tsx
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones térmicas."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto?motivo=cotizar-proyecto"
        secondaryLabel="Agendar videollamada"
        secondaryHref="/contacto?motivo=visita-tecnica"
        tone="dark"
      />
```

- [ ] **Step 2: Actualizar el `CtaBanner` de `app/servicios/page.tsx`**

Reemplazar:

```tsx
      <CtaBanner
        titulo="Optimice su rendimiento térmico"
        descripcion="Nuestros especialistas están listos para realizar un diagnóstico técnico de sus necesidades y proponer la solución más eficiente."
        primaryLabel="Solicitar asesoramiento técnico"
        primaryHref="/contacto"
        secondaryLabel="Ver catálogo completo"
        secondaryHref="/sistema-santero"
        tone="dark"
      />
```

por:

```tsx
      <CtaBanner
        titulo="Optimice su rendimiento térmico"
        descripcion="Nuestros especialistas están listos para realizar un diagnóstico técnico de sus necesidades y proponer la solución más eficiente."
        primaryLabel="Solicitar asesoramiento técnico"
        primaryHref="/contacto?motivo=visita-tecnica"
        secondaryLabel="Ver catálogo completo"
        secondaryHref="/sistema-santero"
        tone="dark"
      />
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Verificar en el HTML estático**

```bash
grep -o 'href="/contacto?motivo=cotizar-proyecto"' .next/server/app/index.html
grep -o 'href="/contacto?motivo=visita-tecnica"' .next/server/app/index.html
grep -o 'href="/contacto?motivo=visita-tecnica"' .next/server/app/servicios.html
```

Expected: los tres coinciden.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/servicios/page.tsx
git commit -m "feat: link Home/Servicios CtaBanner buttons to Contacto with a specific motivo"
```

---

## Task 5: Verificación final integral

**Files:**
- No modifica archivos, salvo que la verificación interactiva encuentre algo roto (en ese caso, arreglarlo aquí mismo y commitear).

- [ ] **Step 1: Build y lint limpios, y `/contacto` sigue estático**

```bash
npm run build
npm run lint
```

Expected: ambos sin errores. En la tabla de rutas de `npm run build`, `/contacto` debe estar en el grupo `○ (Static)`.

- [ ] **Step 2: Verificación interactiva en el navegador**

Levantar el servidor de desarrollo (`npm run dev`) y:

1. Ir a `http://localhost:PUERTO/contacto` sin query string. Confirmar que se ven los 4 botones de motivo, ninguno resaltado, y el `<select>` del formulario muestra "Seleccioná un motivo".
2. Ir a `http://localhost:PUERTO/contacto?motivo=guardia-24hs`. Confirmar que el botón "Contactar Guardia Técnica 24hs" aparece resaltado (fondo rojo) y que el `<select>` del formulario ya tiene ese motivo preseleccionado.
3. Desde el Home, hacer click en el botón "Cotizar mi proyecto" del CTA final y confirmar que lleva a `/contacto?motivo=cotizar-proyecto` con ese motivo preseleccionado.
4. Desde Servicios, hacer click en "Solicitar asesoramiento técnico" y confirmar que lleva a `/contacto?motivo=visita-tecnica` con ese motivo preseleccionado.
5. Completar y enviar el formulario (con cualquier motivo) y confirmar que sigue mostrando el mensaje de confirmación simulado ("¡Gracias por tu mensaje!").

Si algo no funciona como se describe, corregirlo antes de continuar.

- [ ] **Step 3: Commit final (solo si hubo ajustes del Step 2)**

```bash
git add -A && git commit -m "fix: adjustments after Contacto/motivo review"
```

(Si no hubo ajustes, se omite este paso.)
