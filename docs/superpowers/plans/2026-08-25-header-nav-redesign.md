# Rediseño de Header / Navegación (Calderas Santero) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un ítem "Qué Hacemos" al Header (desktop mega-menú de 3 columnas + expansión mobile) y al Footer, sin crear páginas de detalle nuevas.

**Architecture:** `components/Header.tsx` sigue siendo un client component (`"use client"`, ya usa `useState`). Se agrega estado adicional para el mega-menú desktop (`queHacemosOpen`) y su versión mobile (`queHacemosMobileOpen`), más un `useEffect` para cerrar con click-afuera/Escape. Los datos de las 3 columnas viven en un archivo nuevo (`data/que-hacemos.ts`), reutilizando `data/rubros.ts` para la columna "Por Rubro".

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind v4 — sin librerías nuevas.

**Spec:** [docs/superpowers/specs/2026-08-25-header-nav-redesign-design.md](../specs/2026-08-25-header-nav-redesign-design.md)

## Global Constraints

- **Ruling sobre una ambigüedad del spec:** el spec dice que `navLinks` "pasa a incluir Qué Hacemos" pero también que "se maneja aparte de navLinks". Se resuelve así: **`lib/nav.ts` NO se modifica en absoluto.** `navLinks` sigue siendo exactamente los 5 links reales que ya tiene (Nosotros, Sistema Santero, Servicios, Casos de Éxito, FAQ's). "Qué Hacemos" se renderiza en `Header.tsx` (y en `Footer.tsx`) como un elemento aparte, insertado visualmente entre "Sistema Santero" y "Servicios" mediante `navLinks.slice(0, 2)` / `navLinks.slice(2)` — sin tocar el array ni su tipo. Esto evita que "Qué Hacemos" (que no navega a una página real) contamine el modelo de datos compartido.
- Los links "Por Rubro" y "Por Servicio" apuntan a `/servicios`. Los links "Por Producto" apuntan a `/sistema-santero`. No se crean rutas nuevas.
- No se toca ninguna página de contenido (`app/**/page.tsx`) — solo `Header.tsx`, `Footer.tsx`, y el nuevo archivo de datos.
- No se agrega framework de testing. Verificación: `npm run build` + `npm run lint` + greps sobre el código fuente (para la parte condicional que no aparece en el HTML estático) + greps sobre el HTML estático (para la parte que sí se renderiza siempre) + una verificación interactiva final en browser.
- Solo un menú puede estar abierto a la vez: abrir el mega-menú desktop cierra el drawer mobile y viceversa.
- El mega-menú desktop se cierra con click afuera, con Escape (devolviendo foco al botón), o al clickear cualquiera de sus links.

---

## Task 1: Datos del mega-menú "Qué Hacemos"

**Files:**
- Create: `data/que-hacemos.ts`

**Interfaces:**
- Consumes: `rubros` de `@/data/rubros` (ya existe, `{ id, label, imageSrc }[]`).
- Produces: `type QueHacemosLink = { label: string; href: string }`, `export const porRubro: QueHacemosLink[]`, `export const porServicio: QueHacemosLink[]`, `export const porProducto: QueHacemosLink[]` — usados por la Task 2 (`Header.tsx`).

- [ ] **Step 1: Crear el archivo de datos**

```ts
import { rubros } from "@/data/rubros";

export type QueHacemosLink = {
  label: string;
  href: string;
};

export const porRubro: QueHacemosLink[] = rubros.map((rubro) => ({
  label: rubro.label,
  href: "/servicios",
}));

export const porServicio: QueHacemosLink[] = [
  { label: "Agua Caliente Sanitaria", href: "/servicios" },
  { label: "Calefacción Central", href: "/servicios" },
  { label: "Climatización de Piscinas", href: "/servicios" },
  { label: "Procesos con Vapor", href: "/servicios" },
  { label: "Servicio Técnico Oficial", href: "/servicios" },
  { label: "Solar", href: "/servicios" },
  { label: "Instalación Llave en Mano", href: "/servicios" },
  { label: "Desguaces y Traslados", href: "/servicios" },
];

export const porProducto: QueHacemosLink[] = [
  { label: "Caldera de Agua", href: "/sistema-santero" },
  { label: "Caldera de Vapor", href: "/sistema-santero" },
  { label: "Generador Agua Caliente", href: "/sistema-santero" },
  { label: "Climatizador de Piscina", href: "/sistema-santero" },
  { label: "Termotanque", href: "/sistema-santero" },
  { label: "Termotanque Eléctrico", href: "/sistema-santero" },
  { label: "Tanque de Acumulación", href: "/sistema-santero" },
  { label: "Intercambiador de Calor", href: "/sistema-santero" },
  { label: "Generador Multiservicio", href: "/sistema-santero" },
  { label: "Complemento Solar", href: "/sistema-santero" },
];
```

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores de TypeScript.

- [ ] **Step 3: Verificar cantidad de entradas**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('data/que-hacemos.ts', 'utf8');
const countRubro = (src.match(/href: \"\/servicios\"/g) || []).length;
console.log('porServicio + porRubro placeholder count check (informational):', countRubro);
"
```

(Este chequeo es informativo — el conteo real de `porRubro` depende de `rubros.length`, que ya es 11 según `data/rubros.ts`. Lo importante es que el `npm run build` del Step 2 no falle: eso confirma que los tipos y el import de `rubros` son correctos.)

- [ ] **Step 4: Commit**

```bash
git add data/que-hacemos.ts
git commit -m "feat: add data for the Qué Hacemos mega-menu (por rubro/servicio/producto)"
```

---

## Task 2: Mega-menú en el Header (desktop + mobile)

**Files:**
- Modify: `components/Header.tsx` (reescritura completa)

**Interfaces:**
- Consumes: `navLinks, type NavLink` de `@/lib/nav` (sin cambios); `porRubro, porServicio, porProducto, type QueHacemosLink` de `@/data/que-hacemos` (Task 1).
- Produces: `export default function Header(): JSX.Element` (misma firma que antes, sin props) — no requiere cambios en `app/layout.tsx`.

- [ ] **Step 1: Reemplazar el contenido completo del archivo**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, type NavLink } from "@/lib/nav";
import {
  porRubro,
  porServicio,
  porProducto,
  type QueHacemosLink,
} from "@/data/que-hacemos";

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
            aria-haspopup="true"
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

        <Link
          href="/contacto"
          className="hidden shrink-0 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy md:inline-block"
        >
          Solicitar asesoramiento
        </Link>

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

      {queHacemosOpen && (
        <div
          ref={panelRef}
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
        </div>
      )}

      {open && (
        <nav className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl bg-white/90 px-6 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:hidden">
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

          <Link
            href="/contacto"
            className="mt-2 rounded-full bg-brand-red px-4 py-2 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Solicitar asesoramiento
          </Link>
        </nav>
      )}
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
      <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
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

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, sin errores de TypeScript, todas las rutas siguen `○ (Static)`.

- [ ] **Step 3: Verificar la parte siempre-renderizada en el HTML estático**

El botón "Qué Hacemos" del nav desktop se renderiza siempre (solo se oculta con CSS en mobile vía `hidden md:flex`, no está detrás de un `{condición && ...}`). El panel de 29 links y el drawer mobile SÍ están detrás de `{queHacemosOpen && ...}` / `{open && ...}`, así que no aparecen en el HTML estático hasta que se interactúa — eso se confirma en la Task 4 con el browser.

```bash
grep -o "Qué Hacemos" .next/server/app/index.html | wc -l
```

Expected: `1` (el botón del nav desktop; el del footer todavía no existe hasta la Task 3, y el del drawer mobile no está en el HTML por estar detrás de `{open && ...}`).

- [ ] **Step 4: Verificar en el código fuente que las 3 columnas están cableadas**

```bash
grep -c "QueHacemosColumn" components/Header.tsx
```

Expected: `7` (1 definición de la función + 3 usos en el panel desktop + 3 usos en el drawer mobile).

```bash
grep -c "porRubro\|porServicio\|porProducto" components/Header.tsx
```

Expected: `7` (1 línea de import con los 3 nombres + 3 usos en el panel desktop + 3 usos en el drawer mobile — el import cuenta como 1 línea que matchea).

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add Qué Hacemos mega-menu to desktop and mobile header"
```

---

## Task 3: Link "Qué Hacemos" en el Footer

**Files:**
- Modify: `components/Footer.tsx`

**Interfaces:**
- Sin cambios de props ni de firma — solo se agrega un link estático más dentro de la lista de "Secciones".

- [ ] **Step 1: Agregar la variable derivada y el link**

En `components/Footer.tsx`, dentro de `export default function Footer() {`, después de la línea `const pathname = usePathname();`, agregar:

```tsx
  const footerSectionLinks = navLinks.filter((link) => link.href !== "/#faqs");
```

Luego reemplazar el bloque completo:

```tsx
        <div>
          <p className="font-heading text-sm font-semibold text-navy">
            Secciones
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            {navLinks
              .filter((link) => link.href !== "/#faqs")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${
                    pathname === link.href
                      ? "font-medium text-brand-red"
                      : "text-zinc-500 hover:text-brand-red"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>
```

por:

```tsx
        <div>
          <p className="font-heading text-sm font-semibold text-navy">
            Secciones
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            {footerSectionLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  pathname === link.href
                    ? "font-medium text-brand-red"
                    : "text-zinc-500 hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/servicios"
              className={`text-sm ${
                pathname === "/servicios"
                  ? "font-medium text-brand-red"
                  : "text-zinc-500 hover:text-brand-red"
              }`}
            >
              Qué Hacemos
            </Link>
            {footerSectionLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  pathname === link.href
                    ? "font-medium text-brand-red"
                    : "text-zinc-500 hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Verificar en el HTML estático**

El Footer no tiene estado — se renderiza siempre completo.

```bash
grep -o "Qué Hacemos" .next/server/app/index.html | wc -l
```

Expected: `2` (el botón del nav desktop de la Task 2 + este link del footer).

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Qué Hacemos link to footer sections"
```

---

## Task 4: Verificación final integral

**Files:**
- No modifica archivos, salvo que la verificación interactiva encuentre algo roto (en ese caso, arreglarlo aquí mismo y commitear).

- [ ] **Step 1: Build y lint limpios**

```bash
npm run build
npm run lint
```

Expected: ambos sin errores.

- [ ] **Step 2: Confirmar que el Header es realmente global**

El Header se usa en `app/layout.tsx`, así que debe aparecer igual en cualquier página, no solo en el Home.

```bash
grep -o "Qué Hacemos" .next/server/app/nosotros.html | wc -l
```

Expected: `2` (mismo resultado que en el Home: botón del nav + link del footer), confirmando que el mega-menú está disponible sitio-wide y no solo en `/`.

- [ ] **Step 3: Verificación interactiva en el browser**

Levantar el servidor de desarrollo (`npm run dev`) y, usando la herramienta de browser disponible, sobre `http://localhost:PUERTO/`:

1. Click en el botón "Qué Hacemos" del nav desktop (viewport ≥768px). Si el click por coordenadas de mouse falla o el panel no aparece en la captura, usar `javascript_tool` para disparar el click programáticamente (`document.querySelectorAll('button')` y buscar el que contenga el texto "Qué Hacemos") y luego leer `document.body.innerText` para confirmar que aparecen las 3 columnas con sus títulos ("Por Rubro", "Por Servicio", "Por Producto") y que suman 29 links entre las tres.
2. Presionar Escape y confirmar (vía `document.activeElement` o una captura) que el panel se cierra.
3. Cambiar a viewport mobile (375×812), abrir el menú hamburguesa, click en "Qué Hacemos" dentro del drawer, y confirmar que expande mostrando las mismas 3 columnas apiladas.
4. Confirmar que abrir el mega-menú desktop y luego el hamburguesa mobile (o viceversa, cambiando de viewport) no deja ambos abiertos a la vez.

Si algo no funciona como se describe, corregirlo en `components/Header.tsx` antes de continuar.

- [ ] **Step 4: Commit final (solo si hubo ajustes del Step 3)**

```bash
git add -A && git commit -m "fix: adjustments after Qué Hacemos mega-menu QA"
```

(Si no hubo ajustes, se omite este paso.)
