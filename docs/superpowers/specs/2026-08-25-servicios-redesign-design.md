# Rediseño de Servicios — Calderas Santero — Diseño

## Contexto

Sub-proyecto 3 de 5 del rediseño mayor del sitio (sub-proyectos 1 y 2 — Home y Header/Navegación — ya implementados y mergeados a `master`). El feedback del cliente ("MKT – Web Santero – Agosto 2026") señala explícitamente que la página de Servicios actual, con 8 ítems iguales en grilla, es confusa: *"Hay 8 opciones iguales de texto... Me pierdo. Mucha Info. Termino no viendo nada."* Pide agruparlos en 3 pilares:

1. **Ingeniería & Proyectos** (Asesoramiento, Relevamiento en obra, Documentación BIM, Fabricación a medida)
2. **Instalación & Puesta en Marcha** (Montaje supervisado y calibración de equipos)
3. **Soporte & Postventa (SILA / Guardia 24hs)** (Mantenimiento preventivo, Repuestos originales, Guardia técnica telefónica/presencial 24/7)

El copy real de los 8 servicios ya existe en `data/servicios-detalle.ts` (viene del documento "Información Web - Santero"). Este sub-proyecto reorganiza ese contenido, sin reescribirlo.

## Objetivo

Reemplazar la grilla plana de 8 ítems por 3 pilares claros, cada uno agrupando los servicios relacionados, y llevar la página al tema oscuro ya establecido en Home y Header (decisión del cliente: consistencia visual en todo el sitio).

## Alcance

- `app/servicios/page.tsx`, `components/servicios/Hero.tsx`, `components/servicios/ServicesList.tsx` (se renombra a `ServicePillars.tsx`).
- Nuevo archivo de datos `data/servicios-pilares.ts`.
- No se toca `data/servicios-detalle.ts` (queda como fuente histórica; los 8 títulos/descripciones se migran literales al nuevo archivo, no se borran ni reescriben).
- No se tocan Header, Footer, ni ninguna otra página.

## Contenido y datos

`data/servicios-pilares.ts` reagrupa los 8 servicios existentes (copy migrado literal, sin cambios de texto) en 3 pilares:

**Pilar 1 — Ingeniería & Proyectos**
Bajada: "Relevamiento, asesoramiento técnico, documentación BIM y fabricación a medida — todo el trabajo previo a la obra."
Ítems: Consultoría y Soporte · Asesoramiento Técnico y Relevamientos · Ingeniería de Proyectos · Fabricación a Medida · Documentación Técnica BIM

**Pilar 2 — Instalación & Puesta en Marcha**
Bajada: "Montaje supervisado y calibración de equipos para un arranque seguro desde el primer día."
Ítems: Instalación y Puesta en Marcha

**Pilar 3 — Soporte & Postventa (SILA / Guardia 24hs)**
Bajada: "Mantenimiento preventivo, repuestos originales y guardia técnica telefónica/presencial las 24 horas."
Ítems: Mantenimiento Preventivo y Correctivo · Guardia Técnica

Cada ítem dentro de un pilar conserva su título y descripción originales de `data/servicios-detalle.ts`, tal cual.

## Estructura de la página

1. **Hero** (`components/servicios/Hero.tsx`, restyled) — mismo mensaje que hoy ("Nuestros Servicios" + bajada), imagen existente (`trabajo-3.png`), pasado a paleta oscura (`bg-ink`, texto blanco).
2. **ServicePillars** (`components/servicios/ServicePillars.tsx`, reemplaza a `ServicesList.tsx`) — 3 cards grandes (una por pilar), cada una con: número de pilar, título, bajada, y sus ítems como checklist (título + descripción corta) adentro. Fondo `bg-ink`, cards en `bg-ink-light`.
3. **CtaBanner** — se le agrega `tone="dark"` (prop ya existente desde el sub-proyecto 1), sin cambios de copy.

## Sistema visual

Reutiliza los tokens ya creados: `bg-ink`, `bg-ink-light`, `text-brand-red-light` para acentos de texto sobre fondo oscuro, `text-white`/`text-white/70` para texto. No se crean tokens nuevos.

## Testing / verificación

Igual que los sub-proyectos anteriores: `npm run build` + `npm run lint` + verificación de contenido con `grep` sobre el HTML estático generado (la página es completamente estática, sin estado de cliente) + chequeo visual manual (desktop y mobile). No se agregan tests automatizados.

## Fuera de alcance

- Rediseño de Casos de Éxito y Contacto (sub-proyectos 4 y 5).
- Página o contenido de SILA (no tiene web propia; se menciona solo como marca dentro del Pilar 3, sin link).
- CTAs contextuales específicos por pilar (eso es parte del sub-proyecto 5, CTAs contextuales) — el CTA final de la página se mantiene genérico como está hoy.
