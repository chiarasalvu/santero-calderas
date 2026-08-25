# Rediseño del Home — Calderas Santero — Diseño

## Contexto

"Calderas Santero" es una fábrica argentina (desde 1935) de soluciones de Agua Caliente Sanitaria (ACS), Climatización y Vapor. El sitio actual (Next.js 16 App Router + React 19 + TypeScript + Tailwind v4) ya está desarrollado y en producción de prueba en Vercel (`https://calderas-santero.vercel.app/`), con 6 páginas: Home, Nosotros, Sistema Santero, Servicios, Casos de Éxito, Contacto.

El cliente envió feedback (documento "MKT – Web Santero – Agosto 2026") pidiendo un Home más moderno, con mensaje concreto (no abstracto), imágenes reales de fábrica, navegación por rubro/solución, y reordenamiento de secciones. También compartió un borrador visual propio (tema oscuro navy + rojo) que sirve de base estética. Un segundo documento ("Información Web - Santero") aporta el copy real de los 8 ítems de servicios y confirma la referencia de menú desplegable estilo IDERO para una futura página "Qué hacemos".

Este es el **sub-proyecto 1 de 5** de un rediseño mayor (los otros — navegación por rubro/servicio/producto, reorganización de Servicios en 3 pilares, Casos de Éxito con métricas reales, y CTAs contextuales — se abordan en specs separadas). Este spec cubre exclusivamente el **rediseño de la página Home**.

Se trabaja sobre una copia aislada del proyecto en `/Users/chiara/studio-due/calderas-santero-redesign` (con git propio), dejando intacto el original en `/Users/chiara/Desktop/calderas/calderas-santero/calderas-santero` y el deploy de Vercel.

## Objetivo

Rediseñar el Home para que:
- Comunique de forma concreta qué hace la empresa (fábrica de soluciones ACS / Climatización / Vapor), no un mensaje abstracto.
- Permita al usuario encontrar su solución por rubro (Hotelería, Consorcios, Industrias, etc.), no solo por producto.
- Muestre el diferencial ("Sistema Santero") separado de los productos concretos (ATSOL / ADN).
- Baje la prioridad visual de la trayectoria/historia (hoy ocupa un lugar demasiado principal).
- Adopte una estética más oscura, elegante y prolija, basada en el borrador ya provisto por el cliente/diseñadora.

## Alcance

Solo `app/page.tsx` y los componentes que renderiza (sección Home). No se tocan Header ni Footer más que ajustes mínimos de compatibilidad visual. No se crean páginas nuevas de rubro/producto (eso es el sub-proyecto 2) — los links de esta etapa apuntan a páginas existentes.

## Contenido y datos

- **ATSOL y ADN**: ya existen con copy real en `components/home/SistemaSanteroTeaser.tsx` (líneas de producto, bullets, badges). Se extraen a su propia sección "Productos Principales", sin reescribir el copy.
- **Rubros**: se parte de `lib/segments.ts` (4 segmentos con logos reales: Clubes, Hoteles, Desarrolladoras, Industrias) y se amplía a la lista completa del feedback del cliente: Real Estate, Hotelería, Consorcios, Clubes & Gym, Natatorios, Industrias, Balnearios, Camping, SPA & Wellness, Gastronomía, Hospitales y Clínicas. Los rubros nuevos (sin logos de clientes reales todavía) usan foto genérica de rubro como placeholder; no rompen la lógica existente de `segmentos`/`logosPorSegmento` que usa Casos de Éxito.
- **Imágenes de fábrica/planta**: se usan las imágenes reales ya presentes en `public/img/` (ej. `caldera-5.png`) como base; donde no alcancen, placeholder de stock de alta calidad (sala de máquinas / acero inoxidable), fácil de reemplazar después.
- **Historia/timeline**: sin cambios de contenido, solo de posición.

## Secciones del Home (orden final)

1. **Header** — sin cambios de lógica; pill flotante clara sobre el hero oscuro (ya funciona así hoy).
2. **Hero** (`components/home/Hero.tsx`, reescrito) — imagen real de fondo con overlay navy, título "Calidez que perdura", bajada de una línea mencionando ACS / Climatización / Vapor, y 3 botones de solución (Agua Caliente Sanitaria | Climatización | Vapor) que apuntan a `/servicios`.
3. **Buscador por Rubro** (`components/home/RubroFinder.tsx`, nuevo) — grid de cards con foto + nombre de rubro (lista completa arriba), cada una linkeando a `/servicios`.
4. **Sistema Santero** (`components/home/SistemaSanteroTeaser.tsx`, reescrito) — queda enfocado solo en explicar el método/diferencial (calentamiento indirecto, sin acumulación, mínima formación de sarro) con apoyo visual de pasos/iconos; ya no incluye las cards de producto.
5. **Productos Principales** (`components/home/ProductLines.tsx`, nuevo) — las cards ATSOL/ADN existentes, migradas tal cual (mismo copy, mismos bullets) a esta sección independiente.
6. **Casos de Éxito** (`components/home/CasesPreview.tsx`, ajuste de estilo) — mismo acordeón por segmento y logos, adaptado a paleta oscura.
7. **Historia/Trayectoria** (`components/HistoryTimeline.tsx`, ajuste de estilo únicamente) — se mueve a esta posición (antes iba justo después del Hero).
8. **FAQ** (`components/home/Faq.tsx`, ajuste de estilo) — sin cambios de contenido.
9. **CTA final** (`components/CtaBanner.tsx`, copy ajustado) — botones más específicos ("Cotizar mi proyecto" / "Agendar videollamada") en vez de un único CTA genérico.

## Sistema visual

- Nuevos tokens en `app/globals.css`: `--color-ink` (~#0f1729, navy profundo) para fondo del Home, `--color-ink-light` (~#1a2540) para superficies/tarjetas sobre ese fondo. No se modifica `--color-navy` existente (usado en otras páginas) para no generar efectos secundarios fuera de alcance.
- `--color-brand-red` se mantiene como acento (botones, CTAs, detalles de marca).
- Texto sobre fondo oscuro en blanco/crema con contraste adecuado (WCAG AA como mínimo).
- Tipografía de titulares (Hero) más grande y con más aire, siguiendo la línea "limpia, fácil de leer" pedida por el cliente. Se mantiene la fuente heading ya configurada (Montserrat vía `--font-heading`).
- El tema oscuro aplica **solo al Home** en este sub-proyecto. El resto de páginas mantiene el tema claro actual hasta sus propios sub-proyectos de rediseño. Header y Footer no cambian de esquema de color (siguen funcionando igual sobre fondo oscuro o claro).

## Componentes y archivos afectados

**Nuevos:**
- `components/home/RubroFinder.tsx`
- `components/home/ProductLines.tsx`
- `data/rubros.ts` (lista ampliada de rubros con foto/label; compatible con `lib/segments.ts`)

**Reescritos:**
- `components/home/Hero.tsx`
- `components/home/SistemaSanteroTeaser.tsx`
- `app/page.tsx` (nuevo orden de imports/secciones)

**Ajuste de estilo (paleta oscura), sin cambio de lógica:**
- `components/home/CasesPreview.tsx`
- `components/HistoryTimeline.tsx`
- `components/home/Faq.tsx`
- `components/CtaBanner.tsx`

**Tokens:**
- `app/globals.css`

## Navegación / CTAs

Todos los CTAs de esta etapa (Hero, RubroFinder, CTA final) apuntan a rutas ya existentes (`/servicios`, `/contacto`). El sistema de CTAs completamente contextuales por sección/página (ficha de consorcio, ingeniería/BIM, etc.) es el sub-proyecto 5 y no se implementa acá — solo se ajusta el copy del CTA final a algo más específico que "Solicitar asesoramiento".

## Testing / verificación

- `npm run build` y `npm run lint` deben pasar sin errores sobre el proyecto en `calderas-santero-redesign`.
- Verificación visual manual (desktop y mobile) del Home corriendo en local (`npm run dev`).
- No se agregan tests automatizados: el proyecto no los tiene hoy y es un sitio de marketing mayormente estático.

## Fuera de alcance (de este sub-proyecto)

- Páginas nuevas de rubro/servicio/producto y su navegación dedicada (sub-proyecto 2).
- Reorganización de la página `/servicios` en 3 pilares (sub-proyecto 3).
- Casos de Éxito con métricas reales / antes-después (sub-proyecto 4).
- CTAs completamente contextuales por sección (sub-proyecto 5).
- Rediseño de Nosotros, Sistema Santero (página propia), Servicios, Casos de Éxito, Contacto — mantienen su diseño actual por ahora.
- Contenido/fotos definitivos de fábrica y de rubros sin logo real — quedan como placeholder de calidad hasta que el cliente los provea.
