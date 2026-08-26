# Capa de animación framer-motion — Fase 1 — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar `framer-motion` y una capa de animación (scroll-reveal, hover/tap, transiciones de menús/acordeones, contador animado) a Home, Header, Footer, WhatsAppButton y CtaBanner.

**Architecture:** Dos primitivos client-only reutilizables (`Reveal`, `AnimatedCounter`) en `components/motion/`, consumidos por componentes existentes. Los componentes que hoy son Server Components y necesitan animación pasan a `"use client"`. `MotionConfig reducedMotion="user"` en el layout raíz desactiva animaciones para usuarios con esa preferencia del sistema, sin lógica adicional en cada componente.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4, **framer-motion** (nueva dependencia).

**Spec:** [docs/superpowers/specs/2026-08-26-motion-layer-fase1-design.md](../specs/2026-08-26-motion-layer-fase1-design.md)

## Global Constraints

- No se cambia ningún texto, dato, ni color existente — solo se agrega movimiento sobre lo ya construido.
- No se toca `app/servicios/*`, `app/nosotros/*`, `app/sistema-santero/*`, `app/casos-de-exito/*`, `app/contacto/*` ni sus componentes (Fase 2, fuera de alcance). Excepción aceptada y explícita: `CtaBanner.tsx` y `HistoryTimeline.tsx` son compartidos por páginas de Fase 2 (`CtaBanner` por las 5 páginas; `HistoryTimeline` también por `/nosotros`) — al animarlos acá, esas páginas heredan la animación automáticamente sin trabajo adicional. Esto es intencional, no un error de alcance.
- Todo componente que use `motion.*`, `AnimatePresence`, o los primitivos de `components/motion/` necesita `"use client"` en su propio archivo si no lo tenía ya.
- No se agrega framework de testing. Verificación: `npm run build` + `npm run lint` + chequeo visual/interactivo en navegador.
- `framer-motion` se instala con `npm install framer-motion` (no editar `package.json` a mano — dejar que npm resuelva la versión y actualice `package-lock.json`).

---

## Task 1: Instalar framer-motion, primitivos, y MotionConfig global

**Files:**
- Modify: `package.json`, `package-lock.json` (vía `npm install`, no a mano)
- Create: `components/motion/Reveal.tsx`
- Create: `components/motion/AnimatedCounter.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `export default function Reveal({ children, className, delay }: { children: ReactNode; className?: string; delay?: number }): JSX.Element` — usado por las Tasks 2-6.
- Produces: `export default function AnimatedCounter({ value, decimals, duration, className }: { value: number; decimals?: number; duration?: number; className?: string }): JSX.Element` — usado por la Task 3.

- [ ] **Step 1: Instalar la dependencia**

```bash
npm install framer-motion
```

- [ ] **Step 2: Crear `components/motion/Reveal.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Crear `components/motion/AnimatedCounter.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
};

export default function AnimatedCounter({
  value,
  decimals = 0,
  duration = 1.2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = latest.toFixed(decimals);
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, motionValue]);

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
    </span>
  );
}
```

- [ ] **Step 4: Envolver el contenido del layout raíz en `MotionConfig`**

En `app/layout.tsx`, agregar el import:

```tsx
import { MotionConfig } from "framer-motion";
```

Y reemplazar el `<body>`:

```tsx
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
```

por:

```tsx
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionConfig>
      </body>
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores. `framer-motion` debe aparecer en `dependencies` de `package.json` tras el `npm install`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json components/motion/Reveal.tsx components/motion/AnimatedCounter.tsx app/layout.tsx
git commit -m "feat: install framer-motion, add Reveal/AnimatedCounter primitives, wrap layout in MotionConfig"
```

---

## Task 2: Animar Header, Footer y WhatsAppButton

**Files:**
- Modify: `components/Header.tsx` (reescritura completa)
- Modify: `components/Footer.tsx`
- Modify: `components/WhatsAppButton.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal` (Task 1) en `Footer.tsx`.
- No cambia ninguna firma pública de estos componentes (siguen sin props, o con las mismas que antes).

- [ ] **Step 1: Reemplazar el contenido completo de `components/Header.tsx`**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, type NavLink } from "@/lib/nav";
import {
  porRubro,
  porServicio,
  porProducto,
  type QueHacemosLink,
} from "@/data/que-hacemos";

const MotionLink = motion.create(Link);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [queHacemosOpen, setQueHacemosOpen] = useState(false);
  const [queHacemosMobileOpen, setQueHacemosMobileOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!queHacemosOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setQueHacemosOpen(false);
        triggerRef.current?.focus();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setQueHacemosOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [queHacemosOpen]);

  const renderNavLink = (link: NavLink) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`text-sm font-medium tracking-wide uppercase transition-colors ${
          active
            ? "border-b-2 border-brand-red text-brand-red"
            : "border-b-2 border-transparent text-zinc-700 hover:text-brand-red"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  const renderMobileNavLink = (link: NavLink) => (
    <Link
      key={link.href}
      href={link.href}
      className={`rounded-md px-2 py-2 text-sm font-medium uppercase ${
        pathname === link.href
          ? "text-brand-red"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-brand-red"
      }`}
      onClick={() => setOpen(false)}
    >
      {link.label}
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full bg-white/70 px-6 py-3 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/img/generales/logo.png"
            alt="Calderas Santero"
            width={201}
            height={72}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.slice(0, 2).map(renderNavLink)}

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={queHacemosOpen}
            onClick={() => {
              setQueHacemosOpen((prev) => !prev);
              setOpen(false);
            }}
            className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors ${
              queHacemosOpen
                ? "text-brand-red"
                : "text-zinc-700 hover:text-brand-red"
            }`}
          >
            Qué Hacemos
            <span
              className={`text-xs transition-transform ${queHacemosOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {navLinks.slice(2).map(renderNavLink)}
        </nav>

        <MotionLink
          href="/contacto"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden shrink-0 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy md:inline-block"
        >
          Solicitar asesoramiento
        </MotionLink>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          className="flex items-center justify-center rounded-md p-2 text-zinc-700 md:hidden"
          onClick={() => {
            setOpen((prev) => !prev);
            setQueHacemosOpen(false);
          }}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {queHacemosOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 hidden max-w-4xl rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:block"
          >
            <div className="grid grid-cols-3 gap-8">
              <QueHacemosColumn
                titulo="Por Rubro"
                items={porRubro}
                onNavigate={() => setQueHacemosOpen(false)}
              />
              <QueHacemosColumn
                titulo="Por Servicio"
                items={porServicio}
                onNavigate={() => setQueHacemosOpen(false)}
              />
              <QueHacemosColumn
                titulo="Por Producto"
                items={porProducto}
                onNavigate={() => setQueHacemosOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl bg-white/90 px-6 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:hidden"
          >
            {navLinks.slice(0, 2).map(renderMobileNavLink)}

            <div>
              <button
                type="button"
                aria-expanded={queHacemosMobileOpen}
                onClick={() => setQueHacemosMobileOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-zinc-600 uppercase hover:bg-zinc-50 hover:text-brand-red"
              >
                Qué Hacemos
                <span
                  className={`text-xs transition-transform ${queHacemosMobileOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>

              {queHacemosMobileOpen && (
                <div className="flex flex-col gap-4 px-2 py-3">
                  <QueHacemosColumn
                    titulo="Por Rubro"
                    items={porRubro}
                    onNavigate={() => setOpen(false)}
                  />
                  <QueHacemosColumn
                    titulo="Por Servicio"
                    items={porServicio}
                    onNavigate={() => setOpen(false)}
                  />
                  <QueHacemosColumn
                    titulo="Por Producto"
                    items={porProducto}
                    onNavigate={() => setOpen(false)}
                  />
                </div>
              )}
            </div>

            {navLinks.slice(2).map(renderMobileNavLink)}

            <MotionLink
              href="/contacto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 rounded-full bg-brand-red px-4 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Solicitar asesoramiento
            </MotionLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function QueHacemosColumn({
  titulo,
  items,
  onNavigate,
}: {
  titulo: string;
  items: QueHacemosLink[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {titulo}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="text-sm text-zinc-700 transition-colors hover:text-brand-red"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Nota para quien implemente:** antes de reemplazar el archivo, leelo tal cual está en el repo y confirmá que el bloque de estado/efecto (líneas del `useState`/`useEffect` al principio) y la función `QueHacemosColumn` coinciden con lo de arriba. Si el archivo actual difiere en algo que no sea puramente estas adiciones de motion, DETENETE y reportá `NEEDS_CONTEXT` en vez de sobreescribir contenido que no reconocés — este archivo tuvo varias rondas de fixes en planes anteriores y el código de arriba refleja el estado esperado después de todas ellas.

- [ ] **Step 2: Envolver el contenido de `components/Footer.tsx` en `Reveal`**

Agregar el import:

```tsx
import Reveal from "@/components/motion/Reveal";
```

Y envolver el `<div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">...</div>` (todo el bloque de las 3 columnas, sin cambiar nada de su contenido interno) en `<Reveal>`:

```tsx
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
          {/* contenido existente sin cambios */}
        </div>
      </Reveal>
```

El bloque del copyright (`<div className="border-t border-zinc-200 bg-zinc-50">...</div>`) queda fuera del `Reveal`, sin cambios.

- [ ] **Step 3: Reemplazar el contenido completo de `components/WhatsAppButton.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5491128668485";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.82-3.01-.2-.31a8.24 8.24 0 0 1-1.26-4.4c0-4.55 3.7-8.25 8.25-8.25 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.26 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.88 2.4 1 2.57.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
      </svg>
    </motion.a>
  );
}
```

(Nota: se quita `transition-transform hover:scale-105` de las clases de Tailwind porque el hover ahora lo maneja `whileHover` de framer-motion — dejar ambos duplicaría/competiría con la animación.)

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/Footer.tsx components/WhatsAppButton.tsx
git commit -m "feat: animate Header mega-menu/drawer transitions, CTA hover, Footer reveal, WhatsApp button entrance"
```

---

## Task 3: Animar el Hero y el badge de reseñas de Google (Home)

**Files:**
- Modify: `components/home/Hero.tsx` (reescritura completa)
- Modify: `components/home/GoogleReviewsBadge.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `AnimatedCounter` de `@/components/motion/AnimatedCounter` (Task 1) en `GoogleReviewsBadge.tsx`.

- [ ] **Step 1: Reemplazar el contenido completo de `components/home/Hero.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

      <h1 className="sr-only">Calidez que perdura.</h1>
    </section>
  );
}
```

- [ ] **Step 2: Reemplazar el contenido completo de `components/home/GoogleReviewsBadge.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=2012556644267159200";
const RATING = 4.8;
const REVIEW_COUNT = 70;

export default function GoogleReviewsBadge() {
  return (
    <motion.a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver reseñas de Calderas Santero en Google — ${RATING} de 5 estrellas, ${REVIEW_COUNT} reseñas`}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full bg-white/95 px-4 py-2.5 shadow-lg ring-1 ring-black/5 backdrop-blur-md"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <GoogleLogo className="h-6 w-6 shrink-0" />
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-navy">
            <AnimatedCounter value={RATING} decimals={1} />
          </span>
          <Stars />
        </div>
        <span className="text-xs text-zinc-500">
          <AnimatedCounter value={REVIEW_COUNT} /> reseñas en Google
        </span>
      </div>
    </motion.a>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002 l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Verificar en el HTML estático**

```bash
grep -c "AnimatedCounter\|animate-" components/home/GoogleReviewsBadge.tsx
```

(chequeo informal de que el import se usa — lo importante es que el build de arriba compile sin error de tipos, ya que `AnimatedCounter` cuenta desde 0 al montar en el cliente, no aparece con el valor final en el HTML estático del servidor.)

```bash
grep -c "4.8\|70" .next/server/app/index.html
```

Expected: coincide al menos 1 vez (el `(0).toFixed(decimals)` inicial del server-render no muestra "4.8"/"70" todavía — esos números los pinta el cliente al montar; este grep solo confirma que el build no rompió nada obvio. La verificación real del conteo animado es visual, en la Task 5.)

- [ ] **Step 5: Commit**

```bash
git add components/home/Hero.tsx components/home/GoogleReviewsBadge.tsx
git commit -m "feat: animate Home hero overlay fade-in and Google reviews badge entrance/counter"
```

---

## Task 4: Animar RubroFinder, Sistema Santero y Productos Principales (Home)

**Files:**
- Modify: `components/home/RubroFinder.tsx` (reescritura completa)
- Modify: `components/home/SistemaSanteroTeaser.tsx` (reescritura completa)
- Modify: `components/home/ProductLines.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal` (Task 1) en los tres archivos.

- [ ] **Step 1: Reemplazar el contenido completo de `components/home/RubroFinder.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { rubros } from "@/data/rubros";
import Reveal from "@/components/motion/Reveal";

export default function RubroFinder() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Encontrá tu solución por rubro
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            No hace falta saber qué equipo necesitás. Elegí lo que administrás
            y te mostramos la solución.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rubros.map((rubro, index) => (
            <Reveal key={rubro.id} delay={Math.min(index * 0.06, 0.4)}>
              <Link
                href="/servicios"
                className="group relative flex h-40 items-end overflow-hidden rounded-2xl"
              >
                <Image
                  src={rubro.imageSrc}
                  alt=""
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Reemplazar el contenido completo de `components/home/SistemaSanteroTeaser.tsx`**

```tsx
import Reveal from "@/components/motion/Reveal";

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
        <Reveal>
          <p className="font-heading text-sm font-semibold tracking-wide text-brand-red-light uppercase">
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
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, index) => (
            <li key={paso.numero}>
              <Reveal
                delay={Math.min(index * 0.08, 0.4)}
                className="h-full rounded-2xl bg-ink-light p-6"
              >
                <span className="font-heading text-3xl font-bold text-brand-red-light">
                  {paso.numero}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                  {paso.titulo}
                </h3>
                <p className="mt-2 text-sm text-white/70">{paso.descripcion}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Reemplazar el contenido completo de `components/home/ProductLines.tsx`**

```tsx
import Reveal from "@/components/motion/Reveal";

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
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Productos Principales
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Las dos líneas de generación de agua caliente que respaldan el
            Sistema Santero.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {lineas.map((linea, index) => (
            <Reveal
              key={linea.id}
              delay={index * 0.1}
              className="overflow-hidden rounded-2xl bg-white"
            >
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Verificar contenido preservado en el HTML estático**

```bash
grep -o "Reduce el consumo de gas hasta un 30%" .next/server/app/index.html
grep -o "Diagnóstico" .next/server/app/index.html
grep -c "Hospitales y Clínicas" .next/server/app/index.html
```

Expected: los tres coinciden (confirma que el copy real de ATSOL/ADN, los pasos del método, y los 11 rubros siguen intactos — el `Reveal` solo agrega comportamiento de animación, no cambia el DOM inicial en el server-render más que envolver en un `<div>`).

- [ ] **Step 6: Commit**

```bash
git add components/home/RubroFinder.tsx components/home/SistemaSanteroTeaser.tsx components/home/ProductLines.tsx
git commit -m "feat: add scroll-reveal animations to RubroFinder, SistemaSanteroTeaser, ProductLines"
```

---

## Task 5: Animar Casos de Éxito, Historia y FAQ (Home)

**Files:**
- Modify: `components/home/CasesPreview.tsx` (reescritura completa)
- Modify: `components/HistoryTimeline.tsx` (reescritura completa)
- Modify: `components/home/Faq.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal` (Task 1) en los tres archivos.
- `HistoryTimeline` mantiene exactamente la misma firma `{ tone?: "light" | "dark" }` que ya tenía.

- [ ] **Step 1: Reemplazar el contenido completo de `components/home/CasesPreview.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";
import Reveal from "@/components/motion/Reveal";

type CasesPreviewProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function CasesPreview({ logosPorSegmento }: CasesPreviewProps) {
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <section className="bg-ink px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
            Casos de Éxito
          </h2>
        </Reveal>

        <div className="mt-10">
          {segmentos.map((segmento, index) => {
            const open = abierto === segmento.id;
            const logos = logosPorSegmento[segmento.id];

            return (
              <Reveal
                key={segmento.id}
                delay={Math.min(index * 0.06, 0.3)}
                className="border-b border-white/10 first:border-t"
              >
                <button
                  type="button"
                  onClick={() => setAbierto(open ? null : segmento.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-8 text-left"
                >
                  <span className="flex items-baseline gap-3 sm:gap-5">
                    <span className="text-sm text-brand-red-light">
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

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="logos"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-3 gap-3 pb-8 sm:grid-cols-4 lg:grid-cols-6">
                        {logos.map((logo) => (
                          <div
                            key={logo.src}
                            className="relative flex h-16 items-center justify-center rounded-lg border border-black/10 bg-white p-2"
                          >
                            <Image
                              src={logo.src}
                              alt={logo.nombre}
                              fill
                              sizes="140px"
                              className="object-contain p-2"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Reemplazar el contenido completo de `components/HistoryTimeline.tsx`**

```tsx
import Reveal from "@/components/motion/Reveal";

type HitoHistoria = {
  id: string;
  anio: string;
  titulo: string;
  descripcion: string;
};

const historia: HitoHistoria[] = [
  {
    id: "1935",
    anio: "1935",
    titulo: "Fundación de Calderas Santero",
    descripcion:
      "Empresa familiar fundada por Don Francisco Santero, dedicada exclusivamente a la fabricación de calderas de vapor y reparación de equipamiento textil.",
  },
  {
    id: "1955",
    anio: "1955",
    titulo: "Sucesores",
    descripcion:
      "Con mucha dedicación y pasión al trabajo, Nicolás O. Santero y Héctor F. Santero continuaron el desarrollo de la empresa iniciada por su padre.",
  },
  {
    id: "anios-70",
    anio: "Años 70",
    titulo: "Una nueva etapa",
    descripcion:
      "En manos de Juan Carlos Santero incorpora sistemas de provisión de agua caliente y calefacción central, ampliando la oferta de la compañía.",
  },
  {
    id: "anios-90",
    anio: "Años 90",
    titulo: "Sistema Santero",
    descripcion:
      "Se diseña y patenta un sistema innovador de alta eficiencia energética y generación instantánea de agua caliente. Una revolución que rompió con los paradigmas de los sistemas tradicionales y colocó a la empresa en la elite de los productos nacionales y del Mercosur.",
  },
  {
    id: "hoy",
    anio: "Hoy",
    titulo: "Cuarta generación",
    descripcion:
      "Carlos Larralde y Matías Simó continúan el legado incorporando nuevas tecnologías y manteniendo el compromiso con la mejora continua.",
  },
];

type HistoryTimelineProps = {
  tone?: "light" | "dark";
};

export default function HistoryTimeline({ tone = "light" }: HistoryTimelineProps) {
  const dark = tone === "dark";

  return (
    <section className={`px-6 py-20 sm:py-28 ${dark ? "bg-ink" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            className={`font-heading text-2xl sm:text-3xl ${dark ? "text-white" : "text-navy"}`}
          >
            Somos más que una compañía.
            <br />
            Somos{" "}
            <span className="font-bold">
              trayectoria, tecnología, compromiso y mejora constante
            </span>
            .
          </h2>
        </Reveal>

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
                  className={`font-heading text-lg font-bold tracking-wide uppercase sm:flex-1 sm:text-5xl sm:font-normal sm:tracking-normal sm:normal-case lg:text-6xl ${
                    dark
                      ? "text-brand-red-light sm:text-brand-red-light"
                      : "text-brand-red sm:text-brand-red/50"
                  } ${
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
                  <Reveal delay={Math.min(index * 0.08, 0.4)}>
                    <TimelineCard hito={hito} dark={dark} />
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TimelineCard({ hito, dark }: { hito: HitoHistoria; dark: boolean }) {
  return (
    <div
      className={`w-full max-w-md rounded-2xl p-6 ${dark ? "bg-ink-light" : "bg-cream-card"}`}
    >
      <h3
        className={`font-heading text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}
      >
        {hito.titulo}
      </h3>
      <p className={`mt-2 text-sm ${dark ? "text-white/70" : "text-zinc-600"}`}>
        {hito.descripcion}
      </p>
    </div>
  );
}
```

**Nota:** `HistoryTimeline` se usa también en `/nosotros` (tema claro, fuera de alcance de esta fase). Esta tarea no cambia colores ni contenido, solo agrega el `Reveal` — así que `/nosotros` también gana la animación de scroll-reveal automáticamente, sin quedar roto. Esto es aceptado explícitamente por el Global Constraint de este plan (igual que `CtaBanner`).

- [ ] **Step 3: Reemplazar el contenido completo de `components/home/Faq.tsx`**

```tsx
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
    <section id="faqs" className="scroll-mt-28 bg-ink px-6 py-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-ink-light p-8 sm:p-16">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold text-white">
            Preguntas Frecuentes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-white/70">
            Soluciones inmediatas a las consultas técnicas más habituales sobre
            nuestra ingeniería térmica de alta precisión. Garantizamos
            confiabilidad absoluta en cada respuesta.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3">
          {preguntas.map((item, index) => {
            const open = abierta === item.id;
            return (
              <Reveal
                key={item.id}
                delay={Math.min(index * 0.05, 0.3)}
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
                  <span
                    className={`shrink-0 text-brand-red transition-transform ${
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
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Verificar contenido preservado**

```bash
grep -c "¿Porqué consume menos combustible?" .next/server/app/index.html
grep -c "Fundación de Calderas Santero" .next/server/app/index.html
grep -c "Fundación de Calderas Santero" .next/server/app/nosotros.html
```

Expected: los tres devuelven `1` o más (confirma que las 10 preguntas y los 5 hitos de la historia siguen intactos, tanto en Home como en `/nosotros` vía el componente compartido).

- [ ] **Step 6: Commit**

```bash
git add components/home/CasesPreview.tsx components/HistoryTimeline.tsx components/home/Faq.tsx
git commit -m "feat: add scroll-reveal and animated accordion transitions to CasesPreview, HistoryTimeline, Faq"
```

---

## Task 6: Animar CtaBanner (compartido por 5 páginas)

**Files:**
- Modify: `components/CtaBanner.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal` (Task 1).
- Mantiene exactamente la misma firma de props (`titulo`, `descripcion`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`, `tone?`) — no cambia ningún call site en ninguna página.

- [ ] **Step 1: Reemplazar el contenido completo de `components/CtaBanner.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

type CtaBannerProps = {
  titulo: string;
  descripcion: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  tone?: "light" | "dark";
};

const MotionLink = motion.create(Link);

export default function CtaBanner({
  titulo,
  descripcion,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  tone = "light",
}: CtaBannerProps) {
  return (
    <section className={`px-6 py-16 ${tone === "dark" ? "bg-ink" : ""}`}>
      <Reveal className="mx-auto max-w-6xl rounded-3xl bg-brand-red px-8 py-16 text-center sm:px-16">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-4xl">
          {titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">{descripcion}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MotionLink
            href={primaryHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg bg-cream px-6 py-3 text-sm font-semibold text-brand-red transition-colors hover:bg-white"
          >
            {primaryLabel}
          </MotionLink>
          <MotionLink
            href={secondaryHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {secondaryLabel}
          </MotionLink>
        </div>
      </Reveal>
    </section>
  );
}
```

**Nota:** este componente pasa de Server Component a Client Component (`"use client"`). Se usa en 5 páginas (`app/page.tsx`, `app/servicios/page.tsx`, `app/nosotros/page.tsx`, `app/sistema-santero/page.tsx`, `app/casos-de-exito/page.tsx`), ninguna de las cuales necesita cambios — todas siguen pasándole las mismas props que antes.

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, y las 5 páginas que usan `CtaBanner` siguen listadas como `○ (Static)`.

- [ ] **Step 3: Verificar contenido preservado en dos páginas distintas**

```bash
grep -c "Cotizar mi proyecto" .next/server/app/index.html
grep -c "Optimice su rendimiento térmico" .next/server/app/servicios.html
```

Expected: ambos `1` o más (confirma que el `CtaBanner` sigue renderizando su copy correctamente tanto en Home como en Servicios, con props distintas).

- [ ] **Step 4: Commit**

```bash
git add components/CtaBanner.tsx
git commit -m "feat: add scroll-reveal and hover/tap animation to CtaBanner"
```

---

## Task 7: Verificación final integral

**Files:**
- No modifica archivos, salvo que la verificación visual encuentre algo roto (en ese caso, arreglarlo aquí mismo y commitear).

- [ ] **Step 1: Build y lint limpios**

```bash
npm run build
npm run lint
```

Expected: ambos sin errores.

- [ ] **Step 2: Verificación interactiva en el browser (desktop y mobile)**

Levantar el servidor de desarrollo (`npm run dev`) y sobre `http://localhost:PUERTO/`:

1. Scrollear el Home de punta a punta y confirmar que cada sección (buscador por rubro, Sistema Santero, Productos, Casos de Éxito, Historia, FAQ, CTA final) aparece con un fade + slide suave a medida que entra en pantalla, no de golpe.
2. Confirmar que el badge de reseñas de Google aparece con una animación de entrada al cargar la página, y que el "4.8" y el "70" cuentan hacia arriba desde 0 (no aparecen ya escritos).
3. Pasar el mouse sobre el botón "Solicitar asesoramiento" del header, los botones del CTA final, y el botón de WhatsApp — deben reaccionar con un leve efecto de escala, no un cambio brusco.
4. Abrir el mega-menú "Qué Hacemos" del header (desktop) y confirmar que el panel aparece/desaparece con una transición suave, no de golpe. Repetir con el menú hamburguesa en mobile.
5. Abrir y cerrar una pregunta de FAQ y un segmento de Casos de Éxito — la respuesta/grilla de logos debe expandirse y contraerse con animación, no aparecer/desaparecer instantáneamente.
6. En las herramientas de desarrollador del navegador, emular `prefers-reduced-motion: reduce` y recargar — las animaciones de transformación deben desactivarse (gracias a `MotionConfig reducedMotion="user"`), el contenido debe seguir siendo perfectamente usable (todo visible, todo clickeable) sin esperar a ninguna animación.

Si algo no funciona como se describe, corregirlo en el componente correspondiente antes de continuar.

- [ ] **Step 3: Commit final (solo si hubo ajustes del Step 2)**

```bash
git add -A && git commit -m "fix: adjustments after motion layer Phase 1 QA"
```

(Si no hubo ajustes, se omite este paso.)
