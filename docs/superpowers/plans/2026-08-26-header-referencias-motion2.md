# Header estilo Gucci + Referencias + Motion Fase 2 — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el Header actual (pill flotante con links visibles) por el patrón Gucci confirmado por el cliente (logo centrado, barra oscura minimalista, todo detrás de un botón MENU que abre un panel a pantalla completa); crear la página `/referencias` que faltaba; y cerrar la Fase 2 de animaciones (`Reveal`) en Nosotros, Sistema Santero, Servicios y Contacto, sumando el reskin oscuro de las secciones de Nosotros/Sistema Santero que hoy quedan en blanco a mitad de página.

**Architecture:** `components/Header.tsx` sigue siendo un client component, pero pasa de tener dos implementaciones de menú (mega-menú desktop + drawer mobile) a una sola: un overlay (`AnimatePresence` + `motion.div`) a pantalla completa que sirve para desktop y mobile por igual. El acordeón "Qué Hacemos" dentro de ese panel reutiliza sin cambios los datos de `data/que-hacemos.ts`. `lib/nav.ts` suma un link (`Referencias`) en la posición exacta que ya consume el patrón `navLinks.slice(0,2)` / `navLinks.slice(2)` que usan Header y Footer — por eso el Footer no necesita tocarse. El resto del trabajo son cambios de estilo (Tailwind) y wrapping con el componente `Reveal` ya existente, sin lógica nueva.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4, framer-motion v13 (`motion`, `AnimatePresence`, `motion.create`) — sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-26-header-referencias-motion2-design.md](../specs/2026-08-26-header-referencias-motion2-design.md)

## Global Constraints

- **`lib/nav.ts` gana exactamente un elemento nuevo**, `{ href: "/referencias", label: "Referencias" }`, insertado entre "Servicios" y "Casos de Éxito" (índice 3 de 6). Esto es intencional: mantiene sin cambios el patrón `navLinks.slice(0, 2)` (Nosotros, Sistema Santero) + "Qué Hacemos" insertado a mano + `navLinks.slice(2)` (ahora Servicios, Referencias, Casos de Éxito, FAQ's) que ya usan `Header.tsx` y `Footer.tsx` — **no se toca `Footer.tsx`**, Referencias aparece ahí solo, por herencia de `navLinks`.
- El Header nuevo **unifica** desktop y mobile en un solo panel full-screen — se eliminan `queHacemosMobileOpen` y el `motion.nav` del drawer mobile; queda un solo estado de acordeón (`queHacemosOpen`) dentro del panel único.
- Se **elimina** el botón CTA "Solicitar asesoramiento" de la barra superior; se reubica como único CTA al pie del panel del menú.
- Ningún componente pasa a `"use client"` salvo los que ya lo eran (`Header.tsx`, `Footer.tsx`, `CtaBanner.tsx`, `ContactForm.tsx`, `MotivoSelector.tsx`). `Reveal` ya es `"use client"` y puede usarse como hijo de un Server Component sin propagar la directiva.
- Reskin oscuro (tokens `bg-ink` / `bg-ink-light` / `text-brand-red-light`, ya creados en `app/globals.css`) limitado a: `components/sistema-santero/Overview.tsx`, `ProductLines.tsx`, `ComparisonTable.tsx`, y pasar `tone="dark"` a `HistoryTimeline`/`CtaBanner` en `app/nosotros/page.tsx`. `AboutHero.tsx` y `MissionVisionValues.tsx` **no** cambian de paleta (ya son `bg-navy`), solo suman `Reveal`.
- Casos de Éxito no se toca en ningún task de este plan.
- Sin test runner en este repo. Verificación por task: `npm run build` (detecta errores de tipos/compilación en todo el proyecto — correrlo después de cada task, no solo al final, para no arrastrar errores de un task a otro) + `npm run lint` + `grep` sobre el HTML estático generado (`.next/server/app/**`) o sobre el código fuente para contenido condicional + una verificación interactiva puntual en el task del Header (es el único con estado/interacción nueva).
- Commits en español, uno por task, seguidos del mensaje de coautoría estándar del repo.

---

## Task 1: Agregar "Referencias" a `lib/nav.ts`

**Files:**
- Modify: `lib/nav.ts`

**Interfaces:**
- Produces: `navLinks` ahora tiene 6 elementos en vez de 5, con `{ href: "/referencias", label: "Referencias" }` en el índice 3. Los tasks 2 y 3 dependen de esto (Header renderiza `navLinks.slice(2)`, que debe incluir Referencias; la página `/referencias` debe existir en el Task 3 antes de que este link deje de ser un 404).

- [ ] **Step 1: Editar el archivo**

Reemplazar el array `navLinks` completo:

```ts
export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/sistema-santero", label: "Sistema Santero" },
  { href: "/servicios", label: "Servicios" },
  { href: "/referencias", label: "Referencias" },
  { href: "/casos-de-exito", label: "Casos de Éxito" },
  { href: "/#faqs", label: "FAQ's" },
];

export const legalLinks: NavLink[] = [
  { href: "/contacto", label: "Contacto" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos-y-condiciones", label: "Términos y Condiciones" },
];
```

- [ ] **Step 2: Verificar**

Correr: `grep -n "Referencias" lib/nav.ts`
Esperado: una línea con `{ href: "/referencias", label: "Referencias" }`.

No correr `npm run build` todavía — el Header (Task 2) todavía referencia rutas viejas y la página `/referencias` no existe hasta el Task 3, así que un build en este punto es esperable que compile igual (el link a una ruta inexistente no rompe el build de Next, solo sería un 404 en runtime) pero no aporta señal útil todavía. Se verifica el build completo recién en el Task 3, una vez que Header, nav y la página nueva coexisten.

- [ ] **Step 3: Commit**

```bash
git add lib/nav.ts
git commit -m "Agregar Referencias a la navegación del sitio"
```

---

## Task 2: Reescribir `components/Header.tsx` al patrón Gucci

**Files:**
- Modify: `components/Header.tsx`

**Interfaces:**
- Consumes: `navLinks` de `@/lib/nav` (Task 1, 6 elementos), `porRubro`/`porServicio`/`porProducto`/`type QueHacemosLink` de `@/data/que-hacemos` (sin cambios, ya existen).
- Produces: sigue exportando `export default function Header()`. No expone nada nuevo a otros archivos — `app/layout.tsx` ya lo importa sin props y sigue sin necesitarlos.

- [ ] **Step 1: Reemplazar el archivo completo**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [queHacemosOpen, setQueHacemosOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setQueHacemosOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    setQueHacemosOpen(false);
  }

  const renderPanelLink = (link: NavLink) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={closeMenu}
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          href="/contacto"
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          Contacto
        </Link>

        <Link
          href="/"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/img/generales/logo.png"
            alt="Calderas Santero"
            width={201}
            height={72}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:border-white"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-20 overflow-y-auto bg-ink"
          >
            <nav className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16">
              {navLinks.slice(0, 2).map(renderPanelLink)}

              <div className="flex w-full flex-col items-center">
                <button
                  type="button"
                  aria-expanded={queHacemosOpen}
                  onClick={() => setQueHacemosOpen((prev) => !prev)}
                  className={`flex items-center gap-2 font-heading text-2xl font-bold tracking-wide uppercase transition-colors sm:text-3xl ${
                    queHacemosOpen
                      ? "text-brand-red-light"
                      : "text-white hover:text-brand-red-light"
                  }`}
                >
                  Qué Hacemos
                  <span
                    className={`text-base transition-transform ${
                      queHacemosOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {queHacemosOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="w-full overflow-hidden"
                    >
                      <div className="mt-6 grid gap-8 sm:grid-cols-3">
                        <QueHacemosColumn
                          titulo="Por Rubro"
                          items={porRubro}
                          onNavigate={closeMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Servicio"
                          items={porServicio}
                          onNavigate={closeMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Producto"
                          items={porProducto}
                          onNavigate={closeMenu}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map(renderPanelLink)}

              <MotionLink
                href="/contacto"
                onClick={closeMenu}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 rounded-full bg-brand-red px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
              >
                Solicitar asesoramiento
              </MotionLink>
            </nav>
          </motion.div>
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
    <div className="text-center sm:text-left">
      <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">
        {titulo}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
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

Notar que esto elimina por completo `triggerRef`/`panelRef` y el `useEffect` de click-afuera del mega-menú desktop viejo (ya no aplica: el panel nuevo ocupa toda la pantalla, no hay "afuera" al que hacer click) y el `motion.nav` del drawer mobile viejo (unificado en el panel único).

- [ ] **Step 2: Levantar el dev server y correr `npm run build`**

Run: `npm run build`
Esperado: compila sin errores de tipos. Como `/referencias` todavía no existe (Task 3), Next.js no falla por esto — un `<Link href="/referencias">` a una ruta inexistente es válido en build time, solo daría 404 en runtime hasta que el Task 3 la cree.

- [ ] **Step 3: Verificación interactiva**

Con `npm run dev` corriendo, en el navegador:
1. Cargar `/` — confirmar que el header es una barra oscura de ancho completo, logo centrado, "Contacto" a la izquierda, botón "Menu" a la derecha (no debe verse ningún link de texto en la barra).
2. Click en "Menu" — debe abrirse un panel oscuro a pantalla completa con: Nosotros, Sistema Santero, "Qué Hacemos" (con flecha), Servicios, Referencias, Casos de Éxito, FAQ's, y el CTA "Solicitar asesoramiento" al pie. El botón pasa a decir "Cerrar" y la scroll del body queda bloqueada.
3. Click en "Qué Hacemos" — despliega las 3 columnas (Por Rubro/Servicio/Producto) sin cerrar el panel.
4. Click en cualquier link del panel (por ejemplo "Servicios") — navega a esa página y el panel se cierra solo.
5. Reabrir el panel y presionar `Escape` — se cierra.
6. Achicar la ventana a un ancho mobile (o usar `resize_window` a `mobile`) y repetir 1-5 — debe comportarse igual, sin una implementación separada.

- [ ] **Step 4: Commit**

```bash
git add components/Header.tsx
git commit -m "Rediseñar Header al patrón Gucci: logo centrado y menú a pantalla completa"
```

---

## Task 3: Crear la página `/referencias`

**Files:**
- Create: `app/referencias/page.tsx`
- Create: `components/referencias/Hero.tsx`
- Create: `components/referencias/LogosGrid.tsx`

**Interfaces:**
- Consumes: `getLogosPorSegmento()` de `@/lib/segment-logos` (ya existe, devuelve `Record<Segmento, SegmentoLogo[]>`), `segmentos` y los tipos `Segmento`/`SegmentoLogo` de `@/lib/segments` (ya existen). `Reveal` de `@/components/motion/Reveal` (ya existe, props `{ children, className?, delay? }`).
- Produces: la ruta `/referencias` deja de ser un 404 (cierra la dependencia pendiente del Task 1 y del link ya agregado en el Header del Task 2).

- [ ] **Step 1: Crear `components/referencias/Hero.tsx`**

```tsx
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-28 pb-16 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Empresas que confían en Calderas Santero
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
            Hoteles, clubes, desarrolladoras e industrias que ya suman el
            Sistema Santero a sus instalaciones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Crear `components/referencias/LogosGrid.tsx`**

```tsx
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";

type LogosGridProps = {
  logosPorSegmento: Record<Segmento, SegmentoLogo[]>;
};

export default function LogosGrid({ logosPorSegmento }: LogosGridProps) {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {segmentos.map((segmento) => {
          const logos = logosPorSegmento[segmento.id];
          if (logos.length === 0) return null;

          return (
            <Reveal key={segmento.id}>
              <h2 className="font-heading text-xl font-bold tracking-wide text-white uppercase">
                {segmento.label}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {logos.map((logo) => (
                  <div
                    key={logo.src}
                    className="relative flex h-24 items-center justify-center rounded-xl border border-white/10 bg-ink-light p-4"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.nombre}
                      fill
                      sizes="200px"
                      className="object-contain p-4"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Crear `app/referencias/page.tsx`**

```tsx
import type { Metadata } from "next";
import Hero from "@/components/referencias/Hero";
import LogosGrid from "@/components/referencias/LogosGrid";
import { getLogosPorSegmento } from "@/lib/segment-logos";

export const metadata: Metadata = {
  title: "Referencias | Calderas Santero",
  description:
    "Empresas y proyectos que confían en las soluciones térmicas de Calderas Santero.",
};

export default function Referencias() {
  const logosPorSegmento = getLogosPorSegmento();

  return (
    <>
      <Hero />
      <LogosGrid logosPorSegmento={logosPorSegmento} />
    </>
  );
}
```

- [ ] **Step 4: Verificar build completo**

Run: `npm run build`
Esperado: compila sin errores. `/referencias` aparece en el resumen de rutas generadas (`○ /referencias`).

Run: `grep -n "Empresas que confían" .next/server/app/referencias.html || grep -rn "Empresas que confían" .next/server/app/referencias`
Esperado: al menos una coincidencia (confirma que el HTML estático de la página nueva se generó con el contenido esperado).

- [ ] **Step 5: Verificación interactiva**

Con `npm run dev`, navegar a `/referencias`: confirmar fondo oscuro, título, y al menos un grupo de logos con imágenes visibles (si algún segmento no tiene archivos en `public/img/<carpeta>/` esa sección simplemente no se renderiza — no es un error).

- [ ] **Step 6: Commit**

```bash
git add app/referencias components/referencias
git commit -m "Crear página Referencias con logos de clientes por rubro"
```

---

## Task 4: Animar y reskin oscuro de Nosotros

**Files:**
- Modify: `components/AboutHero.tsx`
- Modify: `components/nosotros/MissionVisionValues.tsx`
- Modify: `app/nosotros/page.tsx`

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal`. `HistoryTimeline` y `CtaBanner` ya aceptan `tone?: "light" | "dark"` (sin cambios en esos dos archivos, ya soportan el prop).

- [ ] **Step 1: Modificar `components/AboutHero.tsx`**

```tsx
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-navy px-6 py-24 sm:py-32">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.06),transparent_40%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"
        aria-hidden
      />

      <Reveal className="relative mx-auto w-full max-w-6xl">
        <h1 className="max-w-2xl font-heading text-4xl font-bold text-white sm:text-5xl lg:max-w-4xl">
          Más de 90 años transformando la industria térmica argentina.
        </h1>

        <p className="mt-6 max-w-2xl text-left text-white/80 sm:text-justify">
          Desde 1935, lideramos el mercado nacional con soluciones de
          ingeniería de alta precisión y un compromiso inquebrantable con la
          calidad.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
        >
          Quiero Asesoramiento
        </Link>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Modificar `components/nosotros/MissionVisionValues.tsx`**

```tsx
import Reveal from "@/components/motion/Reveal";

const valores = [
  "Acompañamiento",
  "Compromiso",
  "Innovación",
  "Calidad",
  "Cercanía",
  "Soluciones a medida",
];

export default function MissionVisionValues() {
  return (
    <section className="bg-navy px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
        <Reveal className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-bold text-navy">Misión</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Diseñar, fabricar e implementar soluciones térmicas eficientes que
            garanticen agua caliente sanitaria de manera confiable y
            sostenible, acompañando a cada cliente con asesoramiento técnico,
            ingeniería especializada y soporte en todas las etapas del
            proyecto.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-bold text-navy">Visión</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Ser la empresa referente en soluciones de agua caliente sanitaria
            para grandes demandas, reconocida por la innovación de su Sistema
            Santero, la calidad de sus equipos y el compromiso técnico con
            cada proyecto en Argentina y la región.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="rounded-2xl bg-cream p-8">
          <h3 className="font-heading text-xl font-bold text-navy">
            Valores
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
            {valores.map((valor) => (
              <li key={valor} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                {valor}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Modificar `app/nosotros/page.tsx`**

```tsx
import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import HistoryTimeline from "@/components/HistoryTimeline";
import MissionVisionValues from "@/components/nosotros/MissionVisionValues";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Nosotros | Calderas Santero",
  description:
    "Más de 90 años de trayectoria, misión, visión y valores de Calderas Santero.",
};

export default function Nosotros() {
  return (
    <>
      <AboutHero />
      <HistoryTimeline tone="dark" />
      <MissionVisionValues />
      <CtaBanner
        titulo="¿Listo para modernizar su planta?"
        descripcion="Nuestra ingeniería se adapta a los desafíos de hoy con la solidez de siempre. Conozca todas nuestras soluciones técnicas."
        primaryLabel="Ver Soluciones Técnicas"
        primaryHref="/servicios"
        secondaryLabel="Agendar Consultoría"
        secondaryHref="/contacto"
        tone="dark"
      />
    </>
  );
}
```

- [ ] **Step 4: Verificar**

Run: `npm run build`
Esperado: compila sin errores.

Run: `grep -n 'tone="dark"' app/nosotros/page.tsx`
Esperado: 2 coincidencias (`HistoryTimeline` y `CtaBanner`).

Verificación interactiva en `/nosotros`: toda la página debe verse en tonos oscuros de punta a punta (ya no debe haber ningún tramo blanco entre el Hero y el CTA final), y el contenido debe aparecer con fade-in al hacer scroll.

- [ ] **Step 5: Commit**

```bash
git add components/AboutHero.tsx components/nosotros/MissionVisionValues.tsx app/nosotros/page.tsx
git commit -m "Animar y unificar tema oscuro en Nosotros"
```

---

## Task 5: Animar y reskin oscuro de Sistema Santero

**Files:**
- Modify: `components/sistema-santero/Hero.tsx`
- Modify: `components/sistema-santero/Overview.tsx`
- Modify: `components/sistema-santero/ProductLines.tsx`
- Modify: `components/sistema-santero/ComparisonTable.tsx`

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal`.

- [ ] **Step 1: Modificar `components/sistema-santero/Hero.tsx`**

```tsx
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-navy px-6 py-24 sm:py-28">
      <div className="mx-auto mt-12 grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-5xl">
            Sistema Santero:
            <span className="block">Eficiencia Térmica Reinventada</span>
          </h1>

          <p className="mt-6 max-w-md text-white/80">
            No es una caldera. Es un sistema pensado para transformar la
            manera de generar agua caliente sanitaria.
          </p>

          <a
            href="#consultar"
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
```

- [ ] **Step 2: Modificar `components/sistema-santero/Overview.tsx`**

```tsx
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

const caracteristicas = [
  {
    id: "sarro",
    titulo: "Menor formación de sarro",
    descripcion:
      "Al trabajar mediante calentamiento indirecto y sin acumulación permanente de agua caliente, se reducen significativamente las incrustaciones calcáreas que afectan el rendimiento de los equipos convencionales.",
  },
  {
    id: "eficiencia",
    titulo: "Alta Eficiencia Energética",
    descripcion:
      "La transferencia térmica optimizada permite generar agua caliente sanitaria con un menor consumo de energía, reduciendo costos operativos y mejorando el rendimiento general de la instalación.",
  },
  {
    id: "instantanea",
    titulo: "Agua Caliente Instantánea",
    descripcion:
      "El sistema genera agua caliente en el momento de la demanda, evitando grandes acumulaciones y garantizando disponibilidad constante para instalaciones de alto consumo.",
  },
  {
    id: "mantenimiento",
    titulo: "Menor Necesidad de Mantenimiento",
    descripcion:
      "La reducción de sarro y el diseño del sistema contribuyen a disminuir intervenciones correctivas y tareas de mantenimiento a lo largo del tiempo.",
  },
];

export default function Overview() {
  return (
    <section className="border-b border-white/10 bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-heading text-sm leading-tight font-semibold tracking-wide text-brand-red-light uppercase">
            Ingeniería propia.
            <br />
            Tecnología avanzada.
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            Sistema Santero
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            El Sistema Santero utiliza un sistema de calentamiento indirecto
            que genera agua caliente de forma instantánea, sin acumulación y
            con mínima formación de sarro, prolongando la vida útil de las
            instalaciones y reduciendo el consumo energético.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.1} className="aspect-square w-full rounded-2xl bg-ink-light p-3 ring-1 ring-white/10">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-ink">
              <Image
                src="/img/generales/caldera-8.png"
                alt="Detalle del equipo del Sistema Santero"
                fill
                className="object-contain p-6"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            {caracteristicas.map((item, index) => (
              <Reveal
                key={item.id}
                delay={Math.min(index * 0.08, 0.3)}
                className="flex gap-4"
              >
                <span className="h-10 w-10 shrink-0 rounded-xl bg-white/10" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {item.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    {item.descripcion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Modificar `components/sistema-santero/ProductLines.tsx`**

```tsx
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

type LineaProducto = {
  id: string;
  nombre: string;
  imagen: string;
  badge: string;
  badgeClassName: string;
  subtitulo: string;
  bullets: string[];
};

const lineas: LineaProducto[] = [
  {
    id: "atsol",
    nombre: "Línea ATSOL",
    imagen: "/img/generales/caldera-9.png",
    badge: "Alto consumo",
    badgeClassName: "bg-brand-red text-white",
    subtitulo: "La solución para grandes demandas de agua caliente sanitaria.",
    bullets: [
      "Capacidades para proyectos de alta exigencia.",
      "Generación instantánea mediante calentamiento indirecto.",
      "Ideal para hoteles, clubes, edificios e industrias.",
    ],
  },
  {
    id: "adn",
    nombre: "Línea ADN",
    imagen: "/img/generales/caldera-11.png",
    badge: "Diseño compacto",
    badgeClassName: "bg-navy text-white",
    subtitulo: "La eficiencia del Sistema Santero en formato compacto.",
    bullets: [
      "Diseñada para demandas medianas y espacios reducidos.",
      "Generación instantánea y bajo mantenimiento.",
      "Ideal para consorcios, gimnasios y climatización de piscinas.",
    ],
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

                <ul className="mt-4 flex flex-col gap-2">
                  {linea.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-white/60"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-[10px] text-brand-red-light">
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

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
```

- [ ] **Step 4: Modificar `components/sistema-santero/ComparisonTable.tsx`**

```tsx
import Reveal from "@/components/motion/Reveal";

type FilaComparacion = {
  id: string;
  caracteristica: string;
  tradicional: string;
  santero: string;
  destacado?: boolean;
};

const filas: FilaComparacion[] = [
  {
    id: "calentamiento",
    caracteristica: "Tipo de Calentamiento",
    tradicional: "Directo (Fuego sobre agua)",
    santero: "Indirecto (Baño María técnico)",
  },
  {
    id: "sarro",
    caracteristica: "Riesgo de Sarro",
    tradicional: "Crítico y constante",
    santero: "Reducido",
  },
  {
    id: "generacion",
    caracteristica: "Generación de agua caliente",
    tradicional: "Acumulación en tanques",
    santero: "Generación instantánea",
    destacado: true,
  },
  {
    id: "mantenimiento",
    caracteristica: "Mantenimiento",
    tradicional: "Mayor frecuencia de intervención",
    santero: "Menor necesidad de mantenimiento",
  },
  {
    id: "adaptabilidad",
    caracteristica: "Adaptabilidad",
    tradicional: "Equipos estandarizados",
    santero: "Soluciones dimensionadas a medida",
  },
];

export default function ComparisonTable() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Ventaja Competitiva Santero
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-ink-light">
                <th className="rounded-l-lg px-4 py-4 font-heading text-base font-bold text-white sm:px-6">
                  Característica
                </th>
                <th className="px-4 py-4 font-heading text-base font-medium text-white/50 sm:px-6">
                  Sistema Tradicional
                </th>
                <th className="rounded-r-lg px-4 py-4 font-heading text-base font-bold text-brand-red-light sm:px-6">
                  Sistema Santero
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => (
                <tr key={fila.id} className="border-b border-white/10">
                  <td className="px-4 py-5 text-sm font-semibold text-white sm:px-6">
                    {fila.caracteristica}
                  </td>
                  <td className="px-4 py-5 text-sm text-white/40 sm:px-6">
                    {fila.tradicional}
                  </td>
                  <td
                    className={`px-4 py-5 text-sm sm:px-6 ${
                      fila.destacado
                        ? "font-medium text-brand-red-light"
                        : "text-white/80"
                    }`}
                  >
                    {fila.santero}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verificar**

Run: `npm run build`
Esperado: compila sin errores.

Run: `grep -c "bg-ink" components/sistema-santero/Overview.tsx components/sistema-santero/ProductLines.tsx components/sistema-santero/ComparisonTable.tsx`
Esperado: al menos 1 coincidencia por archivo (nota: `grep -c` cuenta líneas, no ocurrencias — un archivo con `bg-ink` y `bg-ink-light` en la misma línea sigue contando como 1; no es un bug si el número es menor a la cantidad de usos).

Verificación interactiva en `/sistema-santero`: la página completa debe verse oscura de punta a punta, sin ningún tramo blanco, y cada sección debe aparecer con fade-in al hacer scroll.

- [ ] **Step 6: Commit**

```bash
git add components/sistema-santero/Hero.tsx components/sistema-santero/Overview.tsx components/sistema-santero/ProductLines.tsx components/sistema-santero/ComparisonTable.tsx
git commit -m "Animar y unificar tema oscuro en Sistema Santero"
```

---

## Task 6: Animar Servicios

**Files:**
- Modify: `components/servicios/Hero.tsx`
- Modify: `components/servicios/ServicePillars.tsx`

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal`, `serviciosPilares` de `@/data/servicios-pilares` (sin cambios).

- [ ] **Step 1: Modificar `components/servicios/Hero.tsx`**

```tsx
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mt-6 max-w-xl text-white/80">
            Acompañamos cada proyecto desde la planificación técnica hasta el
            funcionamiento diario del sistema, garantizando la máxima
            eficiencia operativa.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="aspect-square rounded-2xl bg-white p-4 shadow-xl">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src="/img/generales/trabajo-3.png"
              alt="Equipo técnico de Calderas Santero trabajando"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modificar `components/servicios/ServicePillars.tsx`**

```tsx
import Reveal from "@/components/motion/Reveal";
import { serviciosPilares } from "@/data/servicios-pilares";

export default function ServicePillars() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {serviciosPilares.map((pilar, index) => (
          <Reveal
            key={pilar.id}
            delay={Math.min(index * 0.1, 0.3)}
            className="rounded-3xl bg-ink-light p-8 sm:p-12"
          >
            <span
              className="font-heading text-sm font-bold text-brand-red-light"
              aria-hidden
            >
              {pilar.numero}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
              {pilar.titulo}
            </h2>
            <p className="mt-3 max-w-2xl text-white/70">{pilar.bajada}</p>

            {pilar.items.length > 1 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {pilar.items.map((item) => (
                  <div
                    key={item.titulo}
                    className="border-t border-white/10 pt-4"
                  >
                    <h3 className="font-heading text-sm font-bold tracking-tight text-white uppercase">
                      <span aria-hidden>✓ </span>
                      {item.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {item.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-8 max-w-2xl border-t border-white/10 pt-4 text-sm leading-relaxed text-white/60">
                {pilar.items[0].descripcion}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar**

Run: `npm run build`
Esperado: compila sin errores.

Verificación interactiva en `/servicios`: los 3 pilares deben aparecer con fade-in escalonado al hacer scroll (no todos a la vez).

- [ ] **Step 4: Commit**

```bash
git add components/servicios/Hero.tsx components/servicios/ServicePillars.tsx
git commit -m "Animar secciones de Servicios con Reveal"
```

---

## Task 7: Animar Contacto

**Files:**
- Modify: `components/contacto/Hero.tsx`
- Modify: `components/contacto/ContactSection.tsx`

**Interfaces:**
- Consumes: `Reveal` de `@/components/motion/Reveal`. No se toca `MotivoSelector` ni `ContactForm` ni sus `Suspense` boundaries (siguen exactamente igual — envolverlos en `Reveal` no cambia su comportamiento de `useSearchParams`, solo se envuelve el texto estático alrededor).

- [ ] **Step 1: Modificar `components/contacto/Hero.tsx`**

```tsx
import { Suspense } from "react";
import Reveal from "@/components/motion/Reveal";
import MotivoSelector from "@/components/contacto/MotivoSelector";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-24 pb-10 sm:py-28">
      <div className="mx-auto mt-12 max-w-6xl">
        <Reveal>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
            Escribinos y te respondemos a la brevedad. Nuestro equipo técnico
            está listo para asesorarte en tu próximo proyecto.
          </p>
        </Reveal>

        <Suspense fallback={null}>
          <MotivoSelector />
        </Suspense>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modificar `components/contacto/ContactSection.tsx`**

```tsx
import { Suspense } from "react";
import Reveal from "@/components/motion/Reveal";
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
        <Reveal
          id="formulario"
          className="rounded-2xl border border-white/10 bg-ink-light p-8"
        >
          <h2 className="font-heading text-xl font-bold text-white">
            Envianos tu consulta
          </h2>
          <div className="mt-6">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
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
        </Reveal>
      </div>
    </section>
  );
}
```

**Nota importante para quien implemente:** `id="formulario"` pasa del `<div>` original al componente `Reveal` — verificar en `components/motion/Reveal.tsx` que `motion.div` efectivamente reenvía props HTML arbitrarias como `id` (framer-motion las pasa al DOM element por defecto; si `Reveal` tuviera una firma de props estricta que no incluya `id`, hay que agregarlo a `RevealProps` como `id?: string` y pasarlo al `motion.div`). Este anchor (`/contacto?motivo=...#formulario`) es usado por `MotivoSelector` y por los `CtaBanner` de Home/Servicios — no puede perderse.

- [ ] **Step 3: Si hace falta, ajustar `components/motion/Reveal.tsx` para aceptar `id`**

Solo ejecutar este step si el Step 2 anterior muestra un error de TypeScript tipo `Property 'id' does not exist on type 'IntrinsicAttributes & RevealProps'`. En ese caso, reemplazar el archivo:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export default function Reveal({ children, className, delay = 0, id }: RevealProps) {
  return (
    <motion.div
      id={id}
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

- [ ] **Step 4: Verificar**

Run: `npm run build`
Esperado: compila sin errores.

Run: `grep -n 'id="formulario"' components/contacto/ContactSection.tsx`
Esperado: 1 coincidencia.

Verificación interactiva: navegar a `/contacto?motivo=cotizar-proyecto#formulario` — debe scrollear directo al bloque del formulario (confirma que el anchor sigue funcionando) y el `<select>` debe mostrar "Cotizar mi proyecto" preseleccionado. Recargar la página completa (no solo navegación client-side) para confirmar que el anchor scroll ocurre incluso en una carga fresca.

**Importante:** probar esto contra `npm run build && npm run start`, no solo `npm run dev` — en sub-proyectos anteriores de este mismo sitio, `next dev` mostró artefactos de Suspense engañosos en esta página exacta que no reproducen en build de producción.

- [ ] **Step 5: Commit**

```bash
git add components/contacto/Hero.tsx components/contacto/ContactSection.tsx
git commit -m "Animar secciones de Contacto con Reveal"
```
