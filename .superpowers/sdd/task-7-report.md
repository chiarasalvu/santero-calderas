# Task 7 Report: Casos de Éxito page with category filter

## What was done

1. Created `app/casos-de-exito/page.tsx` — Client Component (`"use client"`) with `useState` filter
   (`"todos" | CategoriaCaso`), filter buttons (Todos/Hogar/Empresa), and a grid of `Card`s rendering
   `casosDeExito` filtered by category. Content matches the brief's code block verbatim.
2. Created `app/casos-de-exito/layout.tsx` — Server Component exporting `metadata` (title/description),
   since the sibling page.tsx is a Client Component and cannot export `metadata` itself. Content matches
   the brief's code block verbatim.

Note: the actual Next.js project root is nested one level deeper than the repo root
(`calderas-santero/calderas-santero/app/...`), matching the working directory specified in the task.

## Build + smoke-check (Step 3)

`npm run build` output:

```
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully in 1108ms
✓ Generating static pages using 9 workers (8/8) in 163ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /casos-de-exito
├ ○ /nosotros
├ ○ /servicios
└ ○ /sistema-santero
```

Exit code 0. `/casos-de-exito` compiled as a static route alongside the other pages.

Port 3000 was free (verified with `lsof -ti:3000`, nothing to kill). Started `npm run dev` in the
background, waited 5s, then ran the curl checks from the brief:

```
curl -s http://localhost:3000/casos-de-exito | grep -o "Renovación de calefacción residencial"
→ Renovación de calefacción residencial

curl -s http://localhost:3000/casos-de-exito | grep -o "Mantenimiento de planta industrial"
→ Mantenimiento de planta industrial
```

Both matched — confirms a "hogar" case and an "empresa" case both render under the default "Todos" filter.
Dev server was killed afterward and port 3000 confirmed free again.

## Step 4 substitute (no browser available)

Could not click filter buttons interactively (no browser in this environment). As a substitute, fetched
the initial server-rendered HTML of `/casos-de-exito` and grepped for all four case titles, confirming the
default "todos" state renders the full set:

```
Renovación de calefacción residencial      (hogar)
Mantenimiento de planta industrial          (empresa)
Instalación en edificio de departamentos    (empresa)
Reparación de urgencia en vivienda          (hogar)
```

All four titles were present in the initial render. **The interactive click-through (Hogar/Empresa/Todos
button clicks changing the card count) still needs a human/browser check** — this is a known limitation of
the current environment, not an unresolved defect in the implementation.

## Commit

```
git add app/casos-de-exito/page.tsx app/casos-de-exito/layout.tsx
git commit -m "feat: add Casos de Exito page with category filter"
```

Commit hash: `56b1bdede90c8ef4678c38610c139bfb603cca8d`

Note: most of the repo's other files (package.json, app/globals.css, etc.) showed as untracked in
`git status` — this appears to be pre-existing repo state unrelated to this task. Only the two files
specified in the brief were staged and committed, per instructions (no `-A`/`.`).

## Concerns

- None functional. The only gap is the manual browser verification of the filter buttons' interactive
  behavior (Step 4 of the brief), which is explicitly called out as needing a human/browser check.
