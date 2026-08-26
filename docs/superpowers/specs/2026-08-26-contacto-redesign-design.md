# Rediseño de Contacto + CTAs contextuales — Calderas Santero — Diseño

## Contexto

Sub-proyecto 5 de 5 del rediseño mayor del sitio (sub-proyectos 1-3 — Home, Header/Navegación, Servicios — ya mergeados a `master`). El feedback del cliente pide llamados a la acción específicos según de dónde venga el usuario, en vez de un único "Solicitar asesoramiento" genérico: *"Cotizar equipo para mi consorcio/hotel"*, *"Descargar ficha técnica/Modelo 3D"*, *"Solicitar visita técnica en obra"* / *"Coordinar videollamada comercial"*, *"Contactar a Guardia Técnica 24hs"*.

El sub-proyecto 4 (Casos de Éxito con métricas reales) queda pendiente — necesita contenido real de casos concretos que el cliente todavía no proveyó.

## Objetivo

Rediseñar `/contacto` al tema oscuro del resto del sitio, y agregar un mecanismo de "motivo de consulta" que cualquier botón del sitio pueda usar para llegar a Contacto con una intención específica ya preseleccionada — sin necesidad de crear páginas de detalle nuevas (rubros, fichas técnicas) que siguen fuera de alcance.

## Alcance

- `components/contacto/Hero.tsx`, `components/contacto/ContactSection.tsx`, `components/ContactForm.tsx`.
- Nuevo `data/motivos-contacto.ts` y nuevo `components/contacto/MotivoSelector.tsx`.
- Los 2 `CtaBanner` que ya apuntan a `/contacto` (`app/page.tsx` y `app/servicios/page.tsx`) pasan a linkear con un `motivo` específico.
- `app/contacto/page.tsx` no necesita cambios (ver "Enfoque técnico").
- Fuera de alcance: envío real del formulario a un backend/email (el formulario sigue mostrando la confirmación simulada que ya tiene); Casos de Éxito (sub-proyecto 4); páginas de detalle por rubro/servicio/producto.

## Enfoque técnico — por qué `useSearchParams` + `Suspense`, no el prop `searchParams` de la página

Next.js permite leer el motivo de dos formas: (a) como prop `searchParams` (una `Promise`) en `app/contacto/page.tsx`, lo que obliga a esa página entera a pasar de estática a dinámica, o (b) con el hook `useSearchParams()` de `next/navigation` dentro de componentes cliente puntuales, envueltos en `<Suspense>`. Se elige la opción (b): la página sigue prerenderizada como estática (igual que el resto del sitio), y solo los dos componentes que necesitan el motivo (`MotivoSelector`, `ContactForm`) se renderizan del lado del cliente dentro de su propio `Suspense`. Esto es el patrón documentado por Next.js para este caso exacto.

**Importante para quien implemente:** en `npm run dev` todo funciona igual con o sin `Suspense` (Next dice explícitamente que en desarrollo `useSearchParams` no sushiende). El error de "falta un `Suspense` boundary" solo aparece en `npm run build`. No confundir "funciona en dev" con "está bien" — verificar siempre con `npm run build`.

## Contenido y datos

`data/motivos-contacto.ts` define 4 motivos (mismo texto que pidió el cliente):

```
cotizar-proyecto     → "Cotizar mi proyecto"
visita-tecnica        → "Solicitar visita técnica en obra"
ficha-tecnica         → "Descargar ficha técnica"
guardia-24hs          → "Contactar Guardia Técnica 24hs"
```

## Estructura de la página

1. **Hero** (`components/contacto/Hero.tsx`, restyled a `bg-ink`) — mismo título/bajada de hoy, más un `MotivoSelector` (4 botones tipo pill) debajo, envuelto en `Suspense`. Cada botón linkea a `/contacto?motivo=<slug>#formulario` y se resalta si es el motivo activo en la URL actual.
2. **ContactSection** (`components/contacto/ContactSection.tsx`, restyled a `bg-ink`/`bg-ink-light`) — el formulario (con `id="formulario"` para el anchor scroll) envuelto en `Suspense`, los datos de contacto, y el mapa embebido, sin cambios de lógica.
3. **ContactForm** (`components/ContactForm.tsx`, restyled a paleta oscura) — se agrega un campo `<select>` "Motivo de consulta" al principio del formulario, pre-seleccionado con el `motivo` de la URL si existe (vía `useSearchParams`). El resto del formulario (nombre, email, teléfono, mensaje, confirmación simulada al enviar) no cambia de comportamiento.

## CTAs contextuales ya existentes que se actualizan

- `app/page.tsx` (Home): `CtaBanner` primaryHref `/contacto` → `/contacto?motivo=cotizar-proyecto`; secondaryHref `/contacto` → `/contacto?motivo=visita-tecnica` (la etiqueta "Agendar videollamada" cae dentro del mismo motivo de relevamiento/consulta técnica que "Solicitar visita técnica en obra", según cómo los agrupó el cliente en su feedback).
- `app/servicios/page.tsx`: `CtaBanner` primaryHref `/contacto` → `/contacto?motivo=visita-tecnica` (la etiqueta "Solicitar asesoramiento técnico" corresponde a ese mismo motivo). El secondaryHref (`/sistema-santero`) no cambia — no es un CTA de contacto.

Las etiquetas de los botones (`primaryLabel`/`secondaryLabel`) no cambian, solo sus `href`.

## Sistema visual

Reutiliza los tokens ya creados: `bg-ink`, `bg-ink-light`, `text-brand-red-light`. Los inputs del formulario pasan a fondo `bg-ink` con borde `border-white/20` y texto blanco, consistente con el resto del sitio oscuro.

## Testing / verificación

Igual que los sub-proyectos anteriores: `npm run build` (clave para detectar el error de `Suspense` boundary, que NO aparece en `npm run dev`) + `npm run lint` + verificación de contenido con `grep` sobre el HTML estático (para todo lo que no dependa del motivo) + chequeo interactivo en navegador para el comportamiento dependiente de `?motivo=`. No se agregan tests automatizados.

## Fuera de alcance

- Envío real del formulario (backend/email).
- Casos de Éxito con métricas reales (sub-proyecto 4, pendiente de contenido del cliente).
- Páginas de detalle por rubro/servicio/producto y sus propios CTAs contextuales — cuando existan, podrán linkear a `/contacto?motivo=<slug>` reutilizando este mismo mecanismo sin cambios adicionales.
- Fase 2 de animaciones (framer-motion) para esta página — queda para esa fase, no para este sub-proyecto.
