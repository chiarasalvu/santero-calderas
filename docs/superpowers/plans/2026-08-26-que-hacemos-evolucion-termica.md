# Qué Hacemos — Evolución Térmica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a dedicated `/que-hacemos` page presenting the site's 3 real categories (Por Rubro, Por Servicio, Por Producto), and add a "Ver todo →" access link to that page from inside the Header's existing mega-menu (desktop) and accordion (mobile).

**Architecture:** Two independent, small deliverables. Task 1 builds the new page and its two supporting components, reusing existing data (`data/que-hacemos.ts`) and shared components (`Reveal`, `CtaBanner`). Task 2 adds a single new `<Link>` in two existing render branches of `components/Header.tsx`, touching no state, effect, or z-index logic.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, framer-motion (via existing `Reveal` component).

**Spec:** [docs/superpowers/specs/2026-08-26-que-hacemos-evolucion-termica-design.md](../specs/2026-08-26-que-hacemos-evolucion-termica-design.md)

## Global Constraints

- No fabricated content: only real data already present in `data/que-hacemos.ts` may be used. Do not invent items, stats, or copy.
- `data/que-hacemos.ts` and `data/rubros.ts` are NOT modified.
- The Header's "Qué Hacemos" button keeps its exact current toggle behavior (`queHacemosOpen`/`queHacemosMobileOpen` state) — it must remain a button, never become a link, and no existing state/effect/z-index logic in `components/Header.tsx` may change.
- Reuse existing design tokens/classes already used elsewhere in the site (`bg-ink`, `bg-ink-light`, `border-steel/20`, `text-brand-red-light`, `font-mono`, `font-heading`) — no new tokens.
- Reuse the existing `Reveal` component (`@/components/motion/Reveal`) for scroll-in motion, and the existing shared `CtaBanner` component unchanged.

---

### Task 1: `/que-hacemos` page

**Files:**
- Create: `components/que-hacemos/Hero.tsx`
- Create: `components/que-hacemos/Categorias.tsx`
- Create: `app/que-hacemos/page.tsx`

**Interfaces:**
- Consumes: `porRubro`, `porServicio`, `porProducto`, `type QueHacemosLink` from `@/data/que-hacemos` (each item is `{ label: string; href: string }`); `Reveal` from `@/components/motion/Reveal` (props: `children`, optional `delay?: number`, optional `className?: string}` — same usage pattern as `components/referencias/LogosGrid.tsx`); `CtaBanner` from `@/components/CtaBanner` (props used elsewhere in the codebase: `titulo`, `descripcion`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`, `tone`).
- Produces: default-exported `Hero` and `Categorias` components with no props, consumed only by `app/que-hacemos/page.tsx`.

- [ ] **Step 1: Create the Hero component**

Create `components/que-hacemos/Hero.tsx`:

```tsx
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="bg-ink px-6 pt-28 pb-16 sm:pt-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="font-heading text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-5xl">
            Qué Hacemos
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Soluciones térmicas organizadas por rubro, servicio y producto —
            encontrá la que necesitás para tu proyecto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the Categorias component**

Create `components/que-hacemos/Categorias.tsx`:

```tsx
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import {
  porRubro,
  porServicio,
  porProducto,
  type QueHacemosLink,
} from "@/data/que-hacemos";

const categorias: { titulo: string; items: QueHacemosLink[] }[] = [
  { titulo: "Por Rubro", items: porRubro },
  { titulo: "Por Servicio", items: porServicio },
  { titulo: "Por Producto", items: porProducto },
];

export default function Categorias() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        {categorias.map((categoria, index) => (
          <Reveal
            key={categoria.titulo}
            delay={Math.min(index * 0.1, 0.3)}
            className="rounded-2xl border border-steel/20 bg-ink-light p-8"
          >
            <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
              {categoria.titulo}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {categoria.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-2 text-sm text-white/70 transition-colors hover:text-brand-red-light"
                  >
                    {item.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

Note: verify the exact prop name/type `Reveal` accepts for `delay` and `className` by reading `components/motion/Reveal.tsx` before writing this file — match its real signature exactly (it is already used with both props in `components/referencias/LogosGrid.tsx`).

- [ ] **Step 3: Create the page**

Create `app/que-hacemos/page.tsx`:

```tsx
import type { Metadata } from "next";
import Hero from "@/components/que-hacemos/Hero";
import Categorias from "@/components/que-hacemos/Categorias";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Qué Hacemos | Calderas Santero",
  description:
    "Soluciones térmicas organizadas por rubro, servicio y producto.",
};

export default function QueHacemosPage() {
  return (
    <>
      <Hero />
      <Categorias />
      <CtaBanner
        titulo="¿No encontrás lo que buscás?"
        descripcion="Contanos tu proyecto y te ayudamos a encontrar la solución térmica adecuada."
        primaryLabel="Cotizar mi proyecto"
        primaryHref="/contacto?motivo=cotizar-proyecto"
        secondaryLabel="Ver Sistema Santero"
        secondaryHref="/sistema-santero"
        tone="dark"
      />
    </>
  );
}
```

Before writing this step, confirm `CtaBanner`'s exact prop names/types by reading `components/CtaBanner.tsx` — match the real signature exactly (it is already used with this exact prop shape in `app/servicios/page.tsx` and `app/page.tsx`, e.g. `app/page.tsx:27-35`).

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: build succeeds with no type errors, and `/que-hacemos` appears in the route list.

- [ ] **Step 5: Verify content manually**

Start the dev server (`npm run dev`) and load `/que-hacemos`. Confirm:
- Hero renders with the title and subhead above.
- 3 category cards render (Por Rubro: 11 items, Por Servicio: 8 items, Por Producto: 10 items), each item a working link.
- CTA banner renders at the bottom with both buttons linking correctly.
- No console errors.

- [ ] **Step 6: Commit**

```bash
git add components/que-hacemos/Hero.tsx components/que-hacemos/Categorias.tsx app/que-hacemos/page.tsx
git commit -m "feat: add dedicated /que-hacemos page"
```

---

### Task 2: Header "Ver todo →" link

**Files:**
- Modify: `components/Header.tsx`

**Interfaces:**
- Consumes: existing `setQueHacemosOpen` (desktop dropdown close setter) and the existing mobile-menu-close handler already used by other links inside the mobile full-screen panel (read the current file first to get its exact name — it closes `menuOpen` and resets `queHacemosMobileOpen`; do not introduce a new handler if an equivalent one already exists for sibling links in that panel).
- Produces: no new exports; purely additive JSX inside two existing render branches.

- [ ] **Step 1: Read the current Header.tsx in full**

Before editing, read `components/Header.tsx` end to end to get the exact current structure of (a) the desktop mega-menu dropdown panel (the `AnimatePresence`-wrapped block containing the 3-column `QueHacemosColumn` grid), and (b) the mobile "Qué Hacemos" accordion panel (the block stacking the same 3 `QueHacemosColumn`s inside the full-screen mobile panel). Note the exact close handler(s) used by the existing links in each of those two blocks — reuse them verbatim rather than introducing new ones.

- [ ] **Step 2: Add the desktop "Ver todo" link**

Inside the desktop mega-menu dropdown, immediately after the 3-column grid `<div>` (still inside the same dropdown container, before its closing tag), add:

```tsx
<div className="mx-auto max-w-6xl border-t border-steel/20 px-6 py-4">
  <Link
    href="/que-hacemos"
    onClick={() => setQueHacemosOpen(false)}
    className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase transition-colors hover:text-white"
  >
    Ver todo →
  </Link>
</div>
```

If the existing 3-column grid container already has its own `mx-auto max-w-6xl` wrapper one level up (rather than on the grid `div` itself), place this new `div` as a sibling of the grid `div` inside that same outer wrapper instead of duplicating `mx-auto max-w-6xl` — match whatever the real current structure is (confirmed in Step 1), preserving one consistent horizontal alignment with the 3 columns above it.

- [ ] **Step 3: Add the mobile "Ver todo" link**

Inside the mobile "Qué Hacemos" accordion's expanded content, immediately after the stacked 3 `QueHacemosColumn`s, add:

```tsx
<Link
  href="/que-hacemos"
  onClick={closeMobileMenu}
  className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase transition-colors hover:text-white"
>
  Ver todo →
</Link>
```

Replace `closeMobileMenu` with whatever the real existing handler is called (confirmed in Step 1) that the sibling links in this same mobile panel already use to close the full mobile menu on navigation (it resets both `menuOpen` and `queHacemosMobileOpen`). Do not write a new handler — reuse the existing one exactly.

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: build succeeds with no type errors.

- [ ] **Step 5: Verify manually — desktop**

Start the dev server, open the site at a desktop width (≥1024px). Click "Qué Hacemos" to open the mega-menu. Confirm the "Ver todo →" link appears below the 3 columns, is visually aligned with them, and clicking it navigates to `/que-hacemos` and closes the dropdown.

- [ ] **Step 6: Verify manually — mobile**

Resize/emulate a mobile width (<1024px). Open the hamburger menu, tap "Qué Hacemos" to expand the accordion. Confirm the "Ver todo →" link appears below the 3 stacked columns, and tapping it navigates to `/que-hacemos` and closes the full mobile panel.

- [ ] **Step 7: Regression-check existing Header behavior**

Confirm, on both desktop and mobile: the "Qué Hacemos" button still only toggles the dropdown/accordion (does not itself navigate); Escape still closes the desktop dropdown and the mobile panel; clicking outside the desktop dropdown still closes it; scroll-lock while the mobile panel is open still works; crossing the `1024px` breakpoint while the mobile panel is open still closes it. No regressions from before this change.

- [ ] **Step 8: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add Ver todo link to Qué Hacemos mega-menu and mobile accordion"
```
