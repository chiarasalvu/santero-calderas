# Sistema de diseño v2 (Evolución Térmica) + Header/Footer — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establecer la base visual del sistema de diseño "Evolución Térmica" (paleta neutra industrial, 3 tipografías nuevas) y reescribir el Header al patrón de navegación horizontal siempre visible con mega-menú "Qué Hacemos", más el restyle del Footer — la base de la que van a depender los sub-proyectos de página que vienen después.

**Architecture:** Los tokens de color se redefinen en su lugar (mismos nombres de variable, valores nuevos) dentro de `@theme` en `app/globals.css`, lo que propaga la paleta nueva a todo lo que ya usa `bg-ink`/`bg-ink-light`/`bg-navy` sin tocar ningún componente de página. `app/layout.tsx` carga las 3 fuentes nuevas vía `next/font/google`. `components/Header.tsx` se reescribe con dos variantes responsive (`hidden lg:block` para el nav horizontal + mega-menú desktop, `lg:hidden` para una barra + panel a pantalla completa en mobile, reutilizando el mecanismo de panel ya construido en el sub-proyecto de hoy) — el panel mobile se mantiene como hermano del `<header>` mobile (no descendiente) para evitar el mismo bug de "containing block" de `backdrop-filter` que ya se corrigió una vez hoy. `components/Footer.tsx` solo cambia de paleta, sin tocar contenido/estructura.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4, framer-motion v13 — sin librerías nuevas. 3 fuentes nuevas vía `next/font/google` (Hanken Grotesk, JetBrains Mono) más un peso nuevo de una ya existente (Montserrat 300).

**Spec:** [docs/superpowers/specs/2026-08-26-design-system-v2-header-footer-design.md](../specs/2026-08-26-design-system-v2-header-footer-design.md)

## Global Constraints

- **Los tokens de color se redefinen, no se renombran.** `--color-ink`, `--color-ink-light`, `--color-navy`, `--color-brand-red`, `--color-brand-red-light` mantienen sus nombres — solo cambian sus valores hex. Esto es intencional: todo el código existente que usa `bg-ink`/`bg-navy`/`text-brand-red-light`/etc. se actualiza visualmente sin que este plan toque esos archivos.
- **`--color-steel: #71717A` es nuevo** y se usa siempre como borde con opacidad (`border-steel/20`, `border-steel/30`, `divide-steel/20`) — nunca como color de texto sólido (el DESIGN.md lo reserva para bordes/"ghost lines", no para contenido legible).
- **`--font-mono` pasa de Geist Mono a JetBrains Mono.** Confirmado sin ningún uso existente en el código (`grep -rn "font-mono"` solo encuentra la propia definición del token) — es un swap sin riesgo de romper nada visualmente hoy.
- **El Header nuevo no tiene un link persistente a "Contacto"** en la barra (a diferencia del Header de hoy, que sí lo tenía) — las 8 pantallas del mock del cliente no lo muestran; Contacto se sigue alcanzando por los CTAs de cada página y por el Footer. Esto es una decisión de criterio tomada en este plan, no un error.
- **Se agrega "Home" como primer ítem del nav**, hardcodeado en `Header.tsx` (no se toca `lib/nav.ts`, que sigue siendo la fuente de los 6 links reales — mismo patrón ya usado para inyectar "Qué Hacemos" estructuralmente sin tocar el array compartido).
- **z-index del Header:** se mantiene el esquema `z-[70]` para las barras y `z-[60]` para overlays (mega-menú, panel mobile) ya validado en el sub-proyecto de hoy — necesario porque `WhatsAppButton` (`z-50`) y `GoogleReviewsBadge` (`z-40`) siguen flotando sin cambios y un esquema de z-index más bajo repetiría el bug de integración que la revisión final de hoy encontró y corrigió.
- **El panel mobile a pantalla completa debe ser hermano del `<header>` mobile, nunca su descendiente** — ambos headers (desktop y mobile) llevan `backdrop-blur-xl`, y un `position: fixed`/`absolute` anidado dentro de un elemento con `backdrop-filter` queda contenido por ese elemento en vez de por el viewport (el mismo bug de CSS ya diagnosticado y corregido hoy en el Header "Gucci"). El mega-menú desktop, en cambio, sí puede (y debe) ser descendiente de su `<header>`: usa `position: absolute` con `top-full`, y quiere exactamente que el header sea su "containing block" para posicionarse pegado debajo de él — ahí el mismo mecanismo de CSS es la solución, no el problema.
- **Fuera de alcance, documentado para no confundirlo con un bug:** el nuevo header desktop es más alto que el de hoy (~120px: fila de logo + fila de nav, contra los 80px de antes). El padding superior de cada Hero de página (`pt-24`, `pt-28`, etc.) no se ajusta en este plan — eso es contenido de página, corresponde a los sub-proyectos futuros de cada página. Es esperable que en este sub-proyecto el contenido de cada Hero quede ligeramente más pegado al header en desktop hasta que se ajuste.
- Sin test runner en este repo. Verificación por task: `npm run build` + `npm run lint` + grep sobre código fuente/HTML estático + verificación interactiva en navegador (desktop y mobile), como en todos los sub-proyectos anteriores.
- Commits en español, uno por task.

---

## Task 1: Tokens de color y tipografías nuevas

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: tokens de color redefinidos (`--color-ink`, `--color-ink-light`, `--color-navy`, `--color-brand-red`, `--color-brand-red-light`) y nuevos (`--color-ink-deep`, `--color-ink-elevated`, `--color-steel`); `--font-sans` (Hanken Grotesk), `--font-mono` (JetBrains Mono), Montserrat con peso `300` agregado — consumidos por los Tasks 2 y 3, y por cualquier sub-proyecto de página futuro.

- [ ] **Step 1: Reemplazar `app/globals.css`**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-hanken-grotesk);
  --font-mono: var(--font-jetbrains-mono);
  --font-heading: var(--font-montserrat);
}

@theme {
  --color-navy: #131313;
  --color-brand-red: #d3000d;
  --color-sky: #005faf;
  --color-cream: #f5f5f4;
  --color-cream-card: #f5f5f4;
  --color-ink: #131313;
  --color-ink-light: #1c1b1b;
  --color-ink-deep: #0e0e0e;
  --color-ink-elevated: #2a2a2a;
  --color-brand-red-light: #ffb4aa;
  --color-steel: #71717a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Reemplazar `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Montserrat } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      className={`${jetbrainsMono.variable} ${hankenGrotesk.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionConfig>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verificar**

Run: `npm run build`
Esperado: compila sin errores (Header.tsx y Footer.tsx todavía no fueron
tocados en este task, así que solo se verifica que las fuentes nuevas
carguen y el CSS sea válido).

Run: `grep -n "hanken-grotesk\|jetbrains-mono" app/layout.tsx app/globals.css`
Esperado: coincidencias en ambos archivos.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "Actualizar tokens de color y tipografías al sistema de diseño Evolución Térmica"
```

---

## Task 2: Restyle del Footer

**Files:**
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: los tokens del Task 1 (`bg-ink-deep`, `border-steel/NN`, `text-white/NN`, `text-brand-red-light`, `font-mono`). Sin cambios de `navLinks`/`legalLinks` (de `@/lib/nav`) ni de `Reveal` (de `@/components/motion/Reveal`).

- [ ] **Step 1: Reemplazar `components/Footer.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, legalLinks } from "@/lib/nav";
import Reveal from "@/components/motion/Reveal";

export default function Footer() {
  const pathname = usePathname();
  const footerSectionLinks = navLinks.filter((link) => link.href !== "/#faqs");

  const renderFooterLink = (link: { href: string; label: string }) => (
    <Link
      key={link.href}
      href={link.href}
      className={`text-sm ${
        pathname === link.href
          ? "font-medium text-brand-red-light"
          : "text-white/60 hover:text-brand-red-light"
      }`}
    >
      {link.label}
    </Link>
  );

  return (
    <footer className="border-t border-steel/20 bg-ink-deep">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-bold text-white">
              Calderas Santero
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Líderes en ingeniería térmica desde 1935. Tecnología argentina
              para la industria global.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-white/40 uppercase">
              Secciones
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {footerSectionLinks.slice(0, 2).map(renderFooterLink)}
              <Link
                href="/servicios"
                className="text-sm text-white/60 hover:text-brand-red-light"
              >
                Qué Hacemos
              </Link>
              {footerSectionLinks.slice(2).map(renderFooterLink)}
            </nav>
          </div>

          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-white/40 uppercase">
              Legal &amp; Contacto
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-brand-red-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/calderassantero"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Calderas Santero"
                className="flex h-8 w-8 items-center justify-center rounded border border-steel/30 text-white/60 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="17" cy="7" r="0.75" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/calderassantero"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Calderas Santero"
                className="flex h-8 w-8 items-center justify-center rounded border border-steel/30 text-white/60 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
              >
                <svg viewBox="0 0 320 512" fill="currentColor" className="h-4 w-4">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/calderas-santero/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Calderas Santero"
                className="flex h-8 w-8 items-center justify-center rounded border border-steel/30 text-white/60 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
              >
                <svg viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCkrvvYgSqETuBZjmH1jNy5g"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube de Calderas Santero"
                className="flex h-8 w-8 items-center justify-center rounded border border-steel/30 text-white/60 transition-colors hover:border-brand-red-light hover:text-brand-red-light"
              >
                <svg viewBox="0 0 576 512" fill="currentColor" className="h-4 w-4">
                  <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232 335.5V176.5L361 256l-129 79.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-steel/20">
        <div className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Calderas Santero. Industria
            Argentina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Esperado: compila sin errores.

Run: `grep -c "border-steel\|bg-ink-deep" components/Footer.tsx`
Esperado: al menos 1 (nota: `grep -c` cuenta líneas, no ocurrencias — un
número menor a la cantidad real de usos no es un bug).

Verificación interactiva: cualquier página, scrollear al Footer — debe
verse fondo casi negro (`#0e0e0e`), bordes finos grises apenas visibles
(no el borde rojo grueso de antes), texto blanco/gris claro, hover en
links pasa a rojo claro.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "Restylear el Footer a la paleta del sistema de diseño Evolución Térmica"
```

---

## Task 3: Reescribir el Header — nav horizontal + mega-menú + panel mobile

**Files:**
- Modify: `components/Header.tsx`

**Interfaces:**
- Consumes: `navLinks` de `@/lib/nav` (6 elementos, sin cambios), `porRubro`/`porServicio`/`porProducto`/`type QueHacemosLink` de `@/data/que-hacemos` (sin cambios), tokens del Task 1.
- Produces: sigue exportando `export default function Header()` sin props, igual que hoy.

- [ ] **Step 1: Reemplazar `components/Header.tsx` completo**

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
const homeLink: NavLink = { href: "/", label: "Home" };

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMobileMenu() {
    setMenuOpen(false);
    setQueHacemosMobileOpen(false);
  }

  const renderDesktopLink = (link: NavLink) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`border-b pb-1 text-xs font-medium tracking-widest uppercase transition-colors ${
          active
            ? "border-white text-white"
            : "border-transparent text-white/70 hover:text-white"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  const renderPanelLink = (link: NavLink) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={closeMobileMenu}
        className={`font-heading text-2xl font-bold tracking-wide uppercase transition-colors sm:text-3xl ${
          active
            ? "text-brand-red-light"
            : "text-white hover:text-brand-red-light"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop: logo centrado + nav horizontal + mega-menú "Qué Hacemos" */}
      <header className="fixed inset-x-0 top-0 z-[70] hidden border-b border-steel/20 bg-ink/80 backdrop-blur-xl lg:block">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-center border-b border-steel/20 px-6">
          <Link href="/">
            <Image
              src="/img/generales/logo.png"
              alt="Calderas Santero"
              width={201}
              height={72}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-center gap-8 px-6">
          {renderDesktopLink(homeLink)}
          {navLinks.slice(0, 2).map(renderDesktopLink)}

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={queHacemosOpen}
            onClick={() => setQueHacemosOpen((prev) => !prev)}
            className={`flex items-center gap-1 border-b border-transparent pb-1 text-xs font-medium tracking-widest uppercase transition-colors ${
              queHacemosOpen
                ? "text-brand-red-light"
                : "text-white/70 hover:text-white"
            }`}
          >
            Qué Hacemos
            <span
              className={`text-[10px] transition-transform ${queHacemosOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {navLinks.slice(2).map(renderDesktopLink)}
        </nav>

        <AnimatePresence>
          {queHacemosOpen && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full border-t border-steel/20 bg-ink/95 backdrop-blur-xl"
            >
              <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-steel/20 px-6 py-10">
                <div className="pr-8">
                  <QueHacemosColumn
                    titulo="Por Rubro"
                    items={porRubro}
                    onNavigate={() => setQueHacemosOpen(false)}
                  />
                </div>
                <div className="px-8">
                  <QueHacemosColumn
                    titulo="Por Servicio"
                    items={porServicio}
                    onNavigate={() => setQueHacemosOpen(false)}
                  />
                </div>
                <div className="pl-8">
                  <QueHacemosColumn
                    titulo="Por Producto"
                    items={porProducto}
                    onNavigate={() => setQueHacemosOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile: barra angosta + botón MENU */}
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-steel/20 bg-ink/90 backdrop-blur-xl lg:hidden">
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-end px-6">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/img/generales/logo.png"
              alt="Calderas Santero"
              width={201}
              height={72}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => (menuOpen ? closeMobileMenu() : setMenuOpen(true))}
            className="flex items-center gap-2 rounded border border-steel/40 px-3 py-2 text-[11px] font-medium tracking-widest text-white uppercase transition-colors hover:border-white"
          >
            {menuOpen ? "Cerrar" : "Menu"}
            <span aria-hidden className="flex flex-col gap-[3px]">
              <span
                className={`h-[1.5px] w-4 bg-white transition-transform ${
                  menuOpen ? "translate-y-[4.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-4 bg-white transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-4 bg-white transition-transform ${
                  menuOpen ? "-translate-y-[4.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Panel mobile a pantalla completa — hermano de ambos <header>, nunca su descendiente */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-[60] overflow-y-auto bg-ink lg:hidden"
          >
            <nav className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16">
              {renderPanelLink(homeLink)}
              {navLinks.slice(0, 2).map(renderPanelLink)}

              <div className="flex w-full flex-col items-center">
                <button
                  type="button"
                  aria-expanded={queHacemosMobileOpen}
                  onClick={() => setQueHacemosMobileOpen((prev) => !prev)}
                  className={`flex items-center gap-2 font-heading text-2xl font-bold tracking-wide uppercase transition-colors sm:text-3xl ${
                    queHacemosMobileOpen
                      ? "text-brand-red-light"
                      : "text-white hover:text-brand-red-light"
                  }`}
                >
                  Qué Hacemos
                  <span
                    className={`text-base transition-transform ${
                      queHacemosMobileOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {queHacemosMobileOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="w-full overflow-hidden"
                    >
                      <div className="mt-6 flex flex-col gap-6">
                        <QueHacemosColumn
                          titulo="Por Rubro"
                          items={porRubro}
                          onNavigate={closeMobileMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Servicio"
                          items={porServicio}
                          onNavigate={closeMobileMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Producto"
                          items={porProducto}
                          onNavigate={closeMobileMenu}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map(renderPanelLink)}

              <MotionLink
                href="/contacto"
                onClick={closeMobileMenu}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 rounded bg-brand-red px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
              >
                Solicitar asesoramiento
              </MotionLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
      <p className="font-mono text-[11px] font-medium tracking-widest text-white/40 uppercase">
        {titulo}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="text-sm text-white/70 transition-colors hover:text-brand-red-light"
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

- [ ] **Step 2: Verificar con `npm run build`**

Run: `npm run build`
Esperado: compila sin errores.

- [ ] **Step 3: Verificación interactiva — desktop**

Con `npm run dev`, ventana ancha (≥1024px, breakpoint `lg`):
1. Cargar `/` — debe verse: fila de logo centrado arriba, fila de nav
   completa debajo (Home, Nosotros, Sistema Santero, Qué Hacemos ▾,
   Servicios, Referencias, Casos de Éxito, FAQ's), fondo oscuro con blur,
   borde inferior fino. El botón "MENU" mobile NO debe verse en este
   ancho.
2. Click en "Qué Hacemos" — despliega un panel debajo del header con 3
   columnas separadas por líneas verticales finas (Por Rubro/Servicio/
   Producto).
3. Click afuera del panel — se cierra. Reabrir y presionar `Escape` — se
   cierra y el foco vuelve al botón "Qué Hacemos".
4. Navegar a `/servicios` — el link "Servicios" del nav debe verse con
   una línea inferior blanca (estado activo), los demás sin ella.

- [ ] **Step 4: Verificación interactiva — mobile**

Con `resize_window` a `mobile` (o ventana angosta, <1024px):
1. Debe verse solo: logo centrado, botón "MENU" a la derecha. El nav
   horizontal completo NO debe verse en este ancho.
2. Click en "MENU" — abre el panel a pantalla completa (mismo
   comportamiento ya verificado en el sub-proyecto de hoy: Escape,
   scroll-lock, click-en-link cierra y navega). Debe listar: Home,
   Nosotros, Sistema Santero, Qué Hacemos (acordeón), Servicios,
   Referencias, Casos de Éxito, FAQ's, y el botón "Solicitar
   asesoramiento" al pie.
3. Confirmar que el botón "MENU"/"Cerrar" queda siempre visible y
   clickeable por encima del panel (no tapado por él) — este es
   exactamente el tipo de bug de z-index que la revisión final de hoy
   encontró en el sub-proyecto anterior; volver a verificarlo acá.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx
git commit -m "Reescribir el Header al patrón de nav horizontal con mega-menú (sistema de diseño Evolución Térmica)"
```
