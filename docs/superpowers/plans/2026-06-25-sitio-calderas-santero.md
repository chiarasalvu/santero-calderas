# Sitio Calderas Santero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 6-page "Calderas Santero" marketing site (Home, Nosotros, Sistema Santero, Servicios, Casos de Éxito, Contacto) with placeholder content on top of the existing Next.js 16 App Router scaffold.

**Architecture:** Shared `Header`/`Footer` wired into `app/layout.tsx`, one route folder per page under `app/`, presentational primitives (`Hero`, `Section`, `Card`) reused across pages, and list content (servicios, casos de éxito, pasos del Sistema Santero) extracted into typed data files under `data/` so real content can replace placeholders later without touching JSX.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4. No CMS, no backend, no test framework — this repo ships from `create-next-app` with no test runner configured.

## Global Constraints

- All page/UI copy is in Spanish (the spec and existing scaffold target a Spanish-speaking audience).
- No CMS, no backend, no real form submission — `docs/superpowers/specs/2026-06-25-sitio-calderas-santero-design.md` explicitly puts these out of scope for this iteration.
- No external image assets or map APIs — use plain Tailwind placeholder blocks (per spec, "fuera de alcance: integración de mapas reales", "contenido y fotos reales").
- Use the `@/*` path alias already configured in `tsconfig.json` (maps to project root) for all internal imports.
- No test framework is configured in this repo (`package.json` has no test script). Verification per task = `npm run build` (catches TypeScript/React errors across the whole app) plus a `npm run dev` + `curl` smoke check of the specific route(s) touched in that task, confirming key copy renders. Run `npm run lint` in the final task.
- Keep the existing Geist font setup in `app/layout.tsx` — do not swap fonts.

---

### Task 1: Nav and content data layer

**Files:**
- Create: `lib/nav.ts`
- Create: `data/servicios.ts`
- Create: `data/casos-de-exito.ts`
- Create: `data/sistema-santero.ts`

**Interfaces:**
- Produces: `NavLink` type and `navLinks: NavLink[]` from `lib/nav.ts`, each `{ href: string; label: string }`.
- Produces: `Servicio` type and `servicios: Servicio[]` from `data/servicios.ts`, each `{ id: string; icono: string; titulo: string; descripcion: string }`.
- Produces: `CategoriaCaso` (`"hogar" | "empresa"`), `CasoExito` type, and `casosDeExito: CasoExito[]` from `data/casos-de-exito.ts`, each `{ id: string; titulo: string; descripcion: string; categoria: CategoriaCaso }`.
- Produces: `PasoSistemaSantero`/`pasosSistemaSantero: PasoSistemaSantero[]` (`{ id: string; titulo: string; descripcion: string }`) and `DiferencialSistemaSantero`/`diferencialesSistemaSantero: DiferencialSistemaSantero[]` (same shape) from `data/sistema-santero.ts`.

- [ ] **Step 1: Create `lib/nav.ts`**

```ts
export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/sistema-santero", label: "Sistema Santero" },
  { href: "/servicios", label: "Servicios" },
  { href: "/casos-de-exito", label: "Casos de Éxito" },
  { href: "/contacto", label: "Contacto" },
];
```

- [ ] **Step 2: Create `data/servicios.ts`**

```ts
export type Servicio = {
  id: string;
  icono: string;
  titulo: string;
  descripcion: string;
};

export const servicios: Servicio[] = [
  {
    id: "instalacion",
    icono: "🔧",
    titulo: "Instalación",
    descripcion:
      "Instalamos calderas nuevas en hogares y edificios, adaptando el equipo a las necesidades de cada espacio.",
  },
  {
    id: "mantenimiento",
    icono: "🛠️",
    titulo: "Mantenimiento",
    descripcion:
      "Revisiones periódicas para asegurar el funcionamiento seguro y eficiente de tu caldera durante todo el año.",
  },
  {
    id: "reparacion",
    icono: "⚙️",
    titulo: "Reparación",
    descripcion:
      "Diagnóstico y reparación de fallas en calderas de cualquier marca, con respuesta rápida ante urgencias.",
  },
  {
    id: "asesoria",
    icono: "📋",
    titulo: "Asesoría Hogar y Empresa",
    descripcion:
      "Te ayudamos a elegir el sistema de calefacción más adecuado según el uso particular o industrial que necesites.",
  },
];
```

- [ ] **Step 3: Create `data/casos-de-exito.ts`**

```ts
export type CategoriaCaso = "hogar" | "empresa";

export type CasoExito = {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: CategoriaCaso;
};

export const casosDeExito: CasoExito[] = [
  {
    id: "caso-1",
    titulo: "Renovación de calefacción residencial",
    descripcion:
      "Reemplazo completo de una caldera obsoleta por un equipo de alta eficiencia en una vivienda familiar.",
    categoria: "hogar",
  },
  {
    id: "caso-2",
    titulo: "Mantenimiento de planta industrial",
    descripcion:
      "Plan de mantenimiento preventivo anual para el sistema de calderas de una planta de producción.",
    categoria: "empresa",
  },
  {
    id: "caso-3",
    titulo: "Instalación en edificio de departamentos",
    descripcion:
      "Instalación de un sistema de calefacción centralizado para un edificio de 12 unidades.",
    categoria: "empresa",
  },
  {
    id: "caso-4",
    titulo: "Reparación de urgencia en vivienda",
    descripcion:
      "Diagnóstico y reparación en menos de 24 horas ante una falla total de calefacción en pleno invierno.",
    categoria: "hogar",
  },
];
```

- [ ] **Step 4: Create `data/sistema-santero.ts`**

```ts
export type PasoSistemaSantero = {
  id: string;
  titulo: string;
  descripcion: string;
};

export const pasosSistemaSantero: PasoSistemaSantero[] = [
  {
    id: "diagnostico",
    titulo: "Diagnóstico",
    descripcion:
      "Evaluamos el estado actual del sistema de calefacción y las necesidades específicas del espacio.",
  },
  {
    id: "propuesta",
    titulo: "Propuesta",
    descripcion:
      "Presentamos una propuesta clara con el equipo recomendado, tiempos y costos, sin sorpresas.",
  },
  {
    id: "instalacion",
    titulo: "Instalación",
    descripcion:
      "Instalamos el sistema siguiendo protocolos de seguridad y control de calidad en cada paso.",
  },
  {
    id: "mantenimiento",
    titulo: "Mantenimiento",
    descripcion:
      "Acompañamos el equipo a lo largo de su vida útil con revisiones periódicas y soporte continuo.",
  },
];

export type DiferencialSistemaSantero = {
  id: string;
  titulo: string;
  descripcion: string;
};

export const diferencialesSistemaSantero: DiferencialSistemaSantero[] = [
  {
    id: "experiencia",
    titulo: "Experiencia comprobada",
    descripcion: "Años de trabajo en proyectos residenciales e industriales.",
  },
  {
    id: "transparencia",
    titulo: "Transparencia",
    descripcion: "Presupuestos claros y sin costos ocultos en cada etapa.",
  },
  {
    id: "respuesta",
    titulo: "Respuesta rápida",
    descripcion: "Atención prioritaria ante urgencias y fallas críticas.",
  },
  {
    id: "seguimiento",
    titulo: "Seguimiento post-instalación",
    descripcion: "Control continuo del equipo luego de cada instalación.",
  },
];
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0 (these files have no JSX and no other code depends on them yet, so this just confirms valid syntax/types).

- [ ] **Step 6: Commit**

```bash
git add lib/nav.ts data/servicios.ts data/casos-de-exito.ts data/sistema-santero.ts
git commit -m "feat: add nav and content data layer for site pages"
```

---

### Task 2: Header, Footer, and root layout wiring

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `navLinks` from `lib/nav.ts` (Task 1).
- Produces: `Header` (default export, client component, no props) and `Footer` (default export, no props) used by `app/layout.tsx` and reusable by any future page.

- [ ] **Step 1: Create `components/Header.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-zinc-900">
          Calderas Santero
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          className="flex items-center justify-center rounded-md p-2 text-zinc-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import Link from "next/link";
import { navLinks } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div>
          <p className="text-lg font-bold text-zinc-900">Calderas Santero</p>
          <p className="mt-2 text-sm text-zinc-600">
            Tel: (011) 5555-5555
            <br />
            Email: contacto@calderassantero.com
            <br />
            WhatsApp: +54 9 11 5555-5555
            <br />
            Dirección: Av. Siempreviva 123, Buenos Aires
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Calderas Santero. Todos los derechos reservados.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Modify `app/layout.tsx`**

Replace the file contents with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calderas Santero",
  description:
    "Instalación, mantenimiento y reparación de calderas para hogares y empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Build and smoke-check the header/footer render on the default Home page**

Run:

```bash
npm run build
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
curl -s http://localhost:3000 | grep -o "Calderas Santero"
curl -s http://localhost:3000 | grep -o "Sistema Santero"
kill $DEV_PID
```

Expected: `npm run build` exits 0; both `curl` calls print at least one match (`Calderas Santero` from the header/footer brand, `Sistema Santero` from the footer nav link) even though `app/page.tsx` still has the default scaffold content.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/Footer.tsx app/layout.tsx
git commit -m "feat: add shared header/footer and wire into root layout"
```

---

### Task 3: Shared UI primitives and Home page

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/Section.tsx`
- Create: `components/Card.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `servicios` from `data/servicios.ts`, `casosDeExito` from `data/casos-de-exito.ts` (Task 1).
- Produces: `Hero` (default export, props `{ titulo: string; subtitulo: string; ctaHref?: string; ctaLabel?: string }`), `Section` (default export, props `{ titulo: string; subtitulo?: string; children: React.ReactNode }`), `Card` (default export, props `{ titulo: string; descripcion: string; icono?: string; href?: string }`) — all reused by every later page task.

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import Link from "next/link";

type HeroProps = {
  titulo: string;
  subtitulo: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Hero({ titulo, subtitulo, ctaHref, ctaLabel }: HeroProps) {
  return (
    <section className="bg-zinc-50 px-6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          {titulo}
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600">{subtitulo}</p>
        {ctaHref && ctaLabel && (
          <Link
            href={ctaHref}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Section.tsx`**

```tsx
type SectionProps = {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
};

export default function Section({ titulo, subtitulo, children }: SectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            {titulo}
          </h2>
          {subtitulo && (
            <p className="mx-auto mt-3 max-w-2xl text-zinc-600">{subtitulo}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/Card.tsx`**

```tsx
import Link from "next/link";

type CardProps = {
  titulo: string;
  descripcion: string;
  icono?: string;
  href?: string;
};

export default function Card({ titulo, descripcion, icono, href }: CardProps) {
  const content = (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {icono && <span className="text-3xl">{icono}</span>}
      <h3 className="text-lg font-semibold text-zinc-900">{titulo}</h3>
      <p className="text-sm text-zinc-600">{descripcion}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
```

- [ ] **Step 4: Replace `app/page.tsx` with the Home page**

```tsx
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { servicios } from "@/data/servicios";
import { casosDeExito } from "@/data/casos-de-exito";

export default function Home() {
  const serviciosDestacados = servicios.slice(0, 4);
  const casosDestacados = casosDeExito.slice(0, 3);

  return (
    <>
      <Hero
        titulo="Calefacción confiable para tu hogar o tu empresa"
        subtitulo="Instalamos, mantenemos y reparamos calderas con un método propio que garantiza seguridad y eficiencia en cada proyecto."
        ctaHref="/contacto"
        ctaLabel="Solicitar contacto"
      />

      <Section
        titulo="Nuestros servicios"
        subtitulo="Soluciones de calefacción para particulares y empresas."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviciosDestacados.map((servicio) => (
            <Card
              key={servicio.id}
              titulo={servicio.titulo}
              descripcion={servicio.descripcion}
              icono={servicio.icono}
              href="/servicios"
            />
          ))}
        </div>
      </Section>

      <Section
        titulo="El Sistema Santero"
        subtitulo="Nuestro método propio de trabajo, pensado para acompañarte en cada etapa."
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-zinc-600">
            Diagnóstico, propuesta, instalación y mantenimiento: cuatro
            etapas claras que aplicamos en cada proyecto, sin sorpresas.
          </p>
          <Link
            href="/sistema-santero"
            className="rounded-full border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            Conocer el Sistema Santero
          </Link>
        </div>
      </Section>

      <Section
        titulo="Casos de éxito"
        subtitulo="Algunos de los proyectos que llevamos adelante."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {casosDestacados.map((caso) => (
            <Card
              key={caso.id}
              titulo={caso.titulo}
              descripcion={caso.descripcion}
              href="/casos-de-exito"
            />
          ))}
        </div>
      </Section>

      <Section titulo="¿Listo para empezar tu proyecto?">
        <div className="flex justify-center">
          <Link
            href="/contacto"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Contactanos
          </Link>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 5: Build and smoke-check Home content**

Run:

```bash
npm run build
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
curl -s http://localhost:3000 | grep -o "Calefacción confiable para tu hogar o tu empresa"
curl -s http://localhost:3000 | grep -o "Instalación"
curl -s http://localhost:3000 | grep -o "Renovación de calefacción residencial"
kill $DEV_PID
```

Expected: `npm run build` exits 0; all three `curl` calls print a match (hero title, a servicio title, a caso de éxito title).

- [ ] **Step 6: Commit**

```bash
git add components/Hero.tsx components/Section.tsx components/Card.tsx app/page.tsx
git commit -m "feat: add Hero/Section/Card primitives and build Home page"
```

---

### Task 4: Nosotros page

**Files:**
- Create: `app/nosotros/page.tsx`

**Interfaces:**
- Consumes: `Section` from `components/Section.tsx` (Task 3). Valores and equipo data are page-local (not reused elsewhere, so no separate data file per YAGNI).

- [ ] **Step 1: Create `app/nosotros/page.tsx`**

```tsx
import Section from "@/components/Section";

const valores = [
  {
    id: "calidad",
    titulo: "Calidad",
    descripcion:
      "Trabajamos con materiales y procesos que garantizan resultados duraderos.",
  },
  {
    id: "compromiso",
    titulo: "Compromiso",
    descripcion:
      "Acompañamos a cada cliente desde el diagnóstico hasta el mantenimiento final.",
  },
  {
    id: "seguridad",
    titulo: "Seguridad",
    descripcion:
      "Cumplimos protocolos estrictos en cada instalación y reparación.",
  },
];

const equipo = [
  { id: "persona-1", nombre: "Nombre Apellido", rol: "Dirección Técnica" },
  { id: "persona-2", nombre: "Nombre Apellido", rol: "Jefe de Instalaciones" },
  { id: "persona-3", nombre: "Nombre Apellido", rol: "Atención al Cliente" },
];

export default function Nosotros() {
  return (
    <>
      <Section titulo="Nosotros">
        <p className="mx-auto max-w-3xl text-center text-zinc-600">
          Calderas Santero es una empresa dedicada a la instalación,
          mantenimiento y reparación de sistemas de calefacción para hogares
          y empresas. Nuestra misión es ofrecer soluciones confiables,
          seguras y eficientes en cada proyecto que encaramos.
        </p>
      </Section>

      <Section titulo="Nuestros valores">
        <div className="grid gap-6 sm:grid-cols-3">
          {valores.map((valor) => (
            <div
              key={valor.id}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {valor.titulo}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{valor.descripcion}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section titulo="Nuestro equipo">
        <div className="grid gap-6 sm:grid-cols-3">
          {equipo.map((persona) => (
            <div
              key={persona.id}
              className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="h-20 w-20 rounded-full bg-zinc-200" />
              <p className="font-semibold text-zinc-900">{persona.nombre}</p>
              <p className="text-sm text-zinc-600">{persona.rol}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Build and smoke-check**

Run:

```bash
npm run build
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
curl -s http://localhost:3000/nosotros | grep -o "Nuestro equipo"
curl -s http://localhost:3000/nosotros | grep -o "Compromiso"
kill $DEV_PID
```

Expected: `npm run build` exits 0; both `curl` calls print a match.

- [ ] **Step 3: Commit**

```bash
git add app/nosotros/page.tsx
git commit -m "feat: add Nosotros page"
```

---

### Task 5: Sistema Santero page

**Files:**
- Create: `app/sistema-santero/page.tsx`

**Interfaces:**
- Consumes: `pasosSistemaSantero`, `diferencialesSistemaSantero` from `data/sistema-santero.ts` (Task 1); `Section` from `components/Section.tsx` (Task 3).

- [ ] **Step 1: Create `app/sistema-santero/page.tsx`**

```tsx
import Section from "@/components/Section";
import {
  pasosSistemaSantero,
  diferencialesSistemaSantero,
} from "@/data/sistema-santero";

export default function SistemaSantero() {
  return (
    <>
      <Section
        titulo="El Sistema Santero"
        subtitulo="Nuestro método propio para garantizar resultados consistentes en cada proyecto."
      >
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasosSistemaSantero.map((paso, index) => (
            <li
              key={paso.id}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-semibold text-blue-600">
                Paso {index + 1}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900">
                {paso.titulo}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{paso.descripcion}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section titulo="Qué nos diferencia">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {diferencialesSistemaSantero.map((diferencial) => (
            <div
              key={diferencial.id}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {diferencial.titulo}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {diferencial.descripcion}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Build and smoke-check**

Run:

```bash
npm run build
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
curl -s http://localhost:3000/sistema-santero | grep -o "Paso 1"
curl -s http://localhost:3000/sistema-santero | grep -o "Qué nos diferencia"
kill $DEV_PID
```

Expected: `npm run build` exits 0; both `curl` calls print a match.

- [ ] **Step 3: Commit**

```bash
git add app/sistema-santero/page.tsx
git commit -m "feat: add Sistema Santero page"
```

---

### Task 6: Servicios page

**Files:**
- Create: `app/servicios/page.tsx`

**Interfaces:**
- Consumes: `servicios` from `data/servicios.ts` (Task 1); `Section` from `components/Section.tsx`, `Card` from `components/Card.tsx` (Task 3).

- [ ] **Step 1: Create `app/servicios/page.tsx`**

```tsx
import Section from "@/components/Section";
import Card from "@/components/Card";
import { servicios } from "@/data/servicios";

export default function Servicios() {
  return (
    <Section
      titulo="Servicios"
      subtitulo="Soluciones de calefacción para hogares y empresas."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {servicios.map((servicio) => (
          <Card
            key={servicio.id}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            icono={servicio.icono}
          />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Build and smoke-check**

Run:

```bash
npm run build
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
curl -s http://localhost:3000/servicios | grep -o "Asesoría Hogar y Empresa"
kill $DEV_PID
```

Expected: `npm run build` exits 0; the `curl` call prints a match.

- [ ] **Step 3: Commit**

```bash
git add app/servicios/page.tsx
git commit -m "feat: add Servicios page"
```

---

### Task 7: Casos de Éxito page with category filter

**Files:**
- Create: `app/casos-de-exito/page.tsx`
- Create: `app/casos-de-exito/layout.tsx`

**Interfaces:**
- Consumes: `casosDeExito`, `CategoriaCaso` from `data/casos-de-exito.ts` (Task 1); `Section` from `components/Section.tsx`, `Card` from `components/Card.tsx` (Task 3).
- Note: `page.tsx` is a Client Component (`"use client"`) because it holds filter state, so route metadata must live in a sibling `layout.tsx` (Server Component) instead — Client Components cannot export `metadata` in the App Router.

- [ ] **Step 1: Create `app/casos-de-exito/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { casosDeExito, type CategoriaCaso } from "@/data/casos-de-exito";

type Filtro = "todos" | CategoriaCaso;

const filtros: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "hogar", label: "Hogar" },
  { id: "empresa", label: "Empresa" },
];

export default function CasosDeExito() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const casosFiltrados =
    filtro === "todos"
      ? casosDeExito
      : casosDeExito.filter((caso) => caso.categoria === filtro);

  return (
    <Section
      titulo="Casos de éxito"
      subtitulo="Proyectos que llevamos adelante en hogares y empresas."
    >
      <div className="mb-8 flex justify-center gap-2">
        {filtros.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            onClick={() => setFiltro(opcion.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              filtro === opcion.id
                ? "bg-blue-600 text-white"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {opcion.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {casosFiltrados.map((caso) => (
          <Card
            key={caso.id}
            titulo={caso.titulo}
            descripcion={caso.descripcion}
          />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create `app/casos-de-exito/layout.tsx`**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casos de Éxito | Calderas Santero",
  description:
    "Proyectos de instalación, mantenimiento y reparación de calderas que llevamos adelante.",
};

export default function CasosDeExitoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Build and smoke-check initial render (default filter)**

```bash
npm run build
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
curl -s http://localhost:3000/casos-de-exito | grep -o "Renovación de calefacción residencial"
curl -s http://localhost:3000/casos-de-exito | grep -o "Mantenimiento de planta industrial"
kill $DEV_PID
```

Expected: `npm run build` exits 0; both `curl` calls print a match, confirming both "hogar" and "empresa" cases render under the default "Todos" filter.

- [ ] **Step 4: Manually verify the filter buttons in a browser**

Run `npm run dev`, open `http://localhost:3000/casos-de-exito`, click "Hogar" and confirm only the two `categoria: "hogar"` cards remain, click "Empresa" and confirm only the two `categoria: "empresa"` cards remain, click "Todos" and confirm all four return. This step is manual because the filter is client-side interactive state that `curl` cannot exercise — there is no test framework in this repo to automate it.

- [ ] **Step 5: Commit**

```bash
git add app/casos-de-exito/page.tsx app/casos-de-exito/layout.tsx
git commit -m "feat: add Casos de Exito page with category filter"
```

---

### Task 8: Contacto page and contact form

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `app/contacto/page.tsx`

**Interfaces:**
- Consumes: `Section` from `components/Section.tsx` (Task 3).
- Produces: `ContactForm` (default export, client component, no props) used only by `app/contacto/page.tsx`.

- [ ] **Step 1: Create `components/ContactForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-green-800">
        ¡Gracias por tu mensaje! Nos pondremos en contacto a la brevedad.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="nombre" className="text-sm font-medium text-zinc-700">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="telefono" className="text-sm font-medium text-zinc-700">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mensaje" className="text-sm font-medium text-zinc-700">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create `app/contacto/page.tsx`**

```tsx
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function Contacto() {
  return (
    <Section
      titulo="Contacto"
      subtitulo="Escribinos y te respondemos a la brevedad."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <ContactForm />

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">
              Datos de contacto
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Tel: (011) 5555-5555
              <br />
              Email: contacto@calderassantero.com
              <br />
              WhatsApp: +54 9 11 5555-5555
              <br />
              Dirección: Av. Siempreviva 123, Buenos Aires
            </p>
          </div>

          <div className="flex h-48 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-sm text-zinc-500">
            Mapa placeholder
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Build and smoke-check**

```bash
npm run build
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
curl -s http://localhost:3000/contacto | grep -o "Enviar mensaje"
curl -s http://localhost:3000/contacto | grep -o "Mapa placeholder"
kill $DEV_PID
```

Expected: `npm run build` exits 0; both `curl` calls print a match.

- [ ] **Step 4: Manually verify the form's submit confirmation in a browser**

Run `npm run dev`, open `http://localhost:3000/contacto`, fill in Nombre/Email/Mensaje, click "Enviar mensaje", and confirm the form is replaced by the green "¡Gracias por tu mensaje!" confirmation. Manual because there is no test framework to automate this client-side interaction.

- [ ] **Step 5: Commit**

```bash
git add components/ContactForm.tsx app/contacto/page.tsx
git commit -m "feat: add Contacto page with placeholder contact form"
```

---

### Task 9: Per-page metadata and final verification pass

**Files:**
- Modify: `app/nosotros/page.tsx`
- Modify: `app/sistema-santero/page.tsx`
- Modify: `app/servicios/page.tsx`
- Modify: `app/contacto/page.tsx`

**Interfaces:**
- Consumes: nothing new — adds a `metadata` export (`Metadata` type from `next`) to each Server Component page created in Tasks 4, 5, 6, 8. `app/casos-de-exito/layout.tsx` (Task 7) already covers that route since its page is a Client Component.

- [ ] **Step 1: Add metadata export to `app/nosotros/page.tsx`**

Add this import and export at the top of the file, above `const valores = [...]`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Calderas Santero",
  description:
    "Conocé la historia, misión y valores del equipo de Calderas Santero.",
};
```

- [ ] **Step 2: Add metadata export to `app/sistema-santero/page.tsx`**

Add this import and export at the top of the file, above `export default function SistemaSantero()`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema Santero | Calderas Santero",
  description:
    "Conocé el método propio de diagnóstico, propuesta, instalación y mantenimiento de Calderas Santero.",
};
```

- [ ] **Step 3: Add metadata export to `app/servicios/page.tsx`**

Add this import and export at the top of the file, above `export default function Servicios()`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | Calderas Santero",
  description:
    "Instalación, mantenimiento, reparación y asesoría en calefacción para hogares y empresas.",
};
```

- [ ] **Step 4: Add metadata export to `app/contacto/page.tsx`**

Add this import and export at the top of the file, above `export default function Contacto()`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Calderas Santero",
  description: "Escribinos para coordinar una instalación, reparación o mantenimiento.",
};
```

- [ ] **Step 5: Run lint and build**

```bash
npm run lint
npm run build
```

Expected: both exit 0 with no errors.

- [ ] **Step 6: Smoke-check all 6 routes return 200 with expected content**

```bash
npm run dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 4
for route in "/" "/nosotros" "/sistema-santero" "/servicios" "/casos-de-exito" "/contacto"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}")
  echo "${route}: ${code}"
done
curl -s http://localhost:3000/nosotros | grep -o "<title>Nosotros | Calderas Santero</title>"
kill $DEV_PID
```

Expected: every route prints `200`; the title `curl` check finds the `Nosotros | Calderas Santero` title tag (confirming the metadata export took effect).

- [ ] **Step 7: Commit**

```bash
git add app/nosotros/page.tsx app/sistema-santero/page.tsx app/servicios/page.tsx app/contacto/page.tsx
git commit -m "feat: add per-page metadata for SEO and page titles"
```
