# Home — Sistema de diseño "Evolución Térmica" — Diseño

## Contexto

Segundo sub-proyecto del sistema de diseño "Evolución Térmica" (el primero,
tokens + Header/Footer, ya está mergeado a `master`). Este toca la página
de Home según el mock que el cliente armó con Stitch
(`home_santero_calderas_updated_header`).

El mock de Home muestra bastante menos contenido que el Home real de hoy —
solo Hero + "El Diferencial Santero" (3 pilares) + "Tecnología en Acero
Inoxidable" + Footer. Se decidió con el cliente **mantener todo el
contenido actual** (Rubros, Sistema Santero 4 pasos, Líneas de Producto,
Casos de Éxito, Historia, FAQ, CTA final) y sumar las 2 secciones nuevas
del mock como agregado, no como reemplazo — Home queda más larga que el
mock, pero no se pierde nada de lo que ya existe.

**Advertencia de contenido:** la sección "Tecnología en Acero Inoxidable"
del mock presenta un producto ficticio inventado por la IA — "Serie
VXT-Pro" con specs inventadas (3.5 t/h Vapor, 22 bar Max). Mismo patrón ya
detectado en los mocks de Casos de Éxito y Referencias (ver spec del
sub-proyecto 1). No se reproduce: se reemplaza por la **Línea ATSOL real**,
con su imagen, bullets y estadística ya existentes en el sitio (nunca
antes vistos en este mock, pero 100% reales y ya aprobados).

## Objetivo

Restylear el Hero de Home al nuevo sistema de diseño (vuelve el texto y
los 3 botones de categoría) y agregar 2 secciones nuevas del mock,
manteniendo intacto el resto de Home.

## Alcance

- `components/home/Hero.tsx` — reescritura: se agrega título, bajada, 3
  botones de categoría y flecha de scroll. Se mantiene el video/imagen de
  fondo sin cambios.
- Nuevo `components/home/Diferencial.tsx` — sección "El Diferencial
  Santero", 3 tarjetas con numeral de fondo, reutilizando
  `serviciosPilares` de `data/servicios-pilares.ts` (sin cambios a ese
  archivo).
- Nuevo `components/home/FeaturedProduct.tsx` — sección "Tecnología en
  Acero Inoxidable", con la Línea ATSOL real.
- `app/page.tsx` — se agregan `<Diferencial />` (después de Hero) y
  `<FeaturedProduct />` (después de `<ProductLines />`) al orden de
  secciones.
- Fuera de alcance: cualquier otro componente de Home (`RubroFinder`,
  `SistemaSanteroTeaser`, `ProductLines`, `CasesPreview`,
  `HistoryTimeline`, `Faq`, `CtaBanner`) — ya heredan la paleta nueva vía
  los tokens del sub-proyecto 1 sin necesitar cambios de código. Tampoco
  se toca `data/servicios-pilares.ts` ni `components/sistema-santero/*`
  (solo se lee su contenido para reutilizarlo).

## Hero — texto y botones nuevos

Reemplaza el `<h1 className="sr-only">` actual por contenido visible,
manteniendo el video/imagen/gradiente de fondo sin cambios:

- Eyebrow: ninguno (el mock de Home no tiene uno en el Hero).
- `<h1>`: "Calidez que perdura." — mismo texto que ya existe como
  `sr-only`, ahora visible, en Montserrat peso 300 con tracking ancho
  (`font-heading font-light tracking-[0.15em] uppercase`, siguiendo
  `headline-lg` del DESIGN.md).
- Bajada: "Ingeniería térmica de precisión para la industria moderna.
  Sistemas robustos diseñados para el rendimiento extremo." (texto del
  mock, genérico, no es un dato inventado).
- 3 botones de categoría, iguales en estructura (ícono + label), los tres
  con `href="/servicios"` (mismo criterio que ya usan todos los links
  "Por Servicio" del mega-menú "Qué Hacemos" — no existe todavía una
  página de detalle por categoría):
  - "Agua Caliente Sanitaria (ACS)"
  - "Climatización"
  - "Vapor"
- Flecha de scroll "Descubrir ↓" debajo de los botones: link ancla a
  `#diferencial` (el `id` de la nueva sección `Diferencial`).

## "El Diferencial Santero" (`components/home/Diferencial.tsx`)

- Encabezado: "El Diferencial Santero" + link "Ver metodología →" a
  `/servicios`, alineados en la misma fila (título a la izquierda, link a
  la derecha, como en el mock).
- 3 tarjetas en grid (`sm:grid-cols-3`), una por cada
  `serviciosPilares[i]` (usa solo `numero`, `titulo`, `bajada` — ignora
  `items`, que es el detalle completo que ya vive en `/servicios`):
  - Numeral de fondo grande y semi-transparente (`pilar.numero`,
    `text-8xl` o similar, `text-white/5`, posicionado absoluto detrás del
    contenido — el "Pillar Block" del DESIGN.md).
  - Ícono simple de trazo fino (SVG inline, un ícono distinto por pilar:
    escuadra/compás para Ingeniería, engranaje para Instalación, auriculares
    para Soporte — mismo estilo que los íconos ya dibujados a mano en este
    codebase, ej. `Footer.tsx`).
  - `titulo` y `bajada` de cada pilar.
- Sección con `id="diferencial"` (target del "Descubrir ↓" del Hero).

## "Tecnología en Acero Inoxidable" (`components/home/FeaturedProduct.tsx`)

Layout partido en 2 columnas (`lg:grid-cols-2`):

- **Columna de texto:** título "Tecnología en Acero Inoxidable", párrafo
  ("Nuestra línea de calderas de alto rendimiento está diseñada para
  soportar las exigencias más severas del entorno industrial, optimizando
  el consumo energético y reduciendo emisiones." — texto genérico del
  mock, no es un dato inventado), 3 bullets con check — los mismos 3
  bullets reales que ya usa `components/sistema-santero/ProductLines.tsx`
  para la Línea ATSOL ("Capacidades para proyectos de alta exigencia.",
  "Generación instantánea mediante calentamiento indirecto.", "Ideal para
  hoteles, clubes, edificios e industrias."), y un botón "Catálogo
  Técnico" → `/sistema-santero`.
- **Columna de imagen:** `/img/generales/caldera-9.png` (mismo asset real
  que ya usa la Línea ATSOL), con una caption superpuesta abajo a la
  izquierda ("Modelo Destacado" + "Línea ATSOL" — nombre real, no
  "VXT-Pro") y un badge con la estadística real "98%" / "Eficiencia
  estacionaria" (el mismo dato que ya se muestra en
  `components/sistema-santero/Hero.tsx`).

## Sistema visual

Reutiliza los tokens del sub-proyecto 1 (`bg-ink`, `bg-ink-light`,
`border-steel/20`, `text-brand-red-light`, `font-mono` para
labels/badges técnicos) — sin tokens nuevos.

## Testing / verificación

Mismo patrón de siempre: `npm run build` + `npm run lint` + grep sobre
HTML estático + verificación interactiva en navegador (Hero con los 3
botones, scroll a `#diferencial`, las 2 secciones nuevas se ven
correctamente entre las existentes). Sin tests automatizados nuevos.

## Fuera de alcance

- Cualquier componente de Home fuera de Hero + las 2 secciones nuevas.
- `data/servicios-pilares.ts`, `components/sistema-santero/*` (solo
  lectura, no se modifican).
- Contenido inventado del mock ("Serie VXT-Pro" y sus specs) — no se usa
  en ningún lado.
