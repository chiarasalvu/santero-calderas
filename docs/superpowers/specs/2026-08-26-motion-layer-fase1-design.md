# Capa de animación con framer-motion — Fase 1 (Home + Header/Footer) — Diseño

## Contexto

El cliente pidió "más movimiento" en todo el sitio usando framer-motion. Dado el volumen (~20 archivos en todo el sitio), se divide en 2 fases. Esta es la **Fase 1**: primitivos reutilizables + Home completo + Header/Footer/WhatsAppButton (lo ya rediseñado y más visible). La Fase 2 (Servicios, Nosotros, Sistema Santero, Casos de Éxito, Contacto) es un sub-proyecto separado, posterior.

Se trabaja en la rama `motion-layer-phase1`, bifurcada de `master` (que ya tiene Home, Header/Nav, y el Hero limpio + reseñas de Google mergeados). La rama `servicios-redesign` sigue sin mergear por decisión del cliente — esta fase NO toca Servicios.

No existe hoy ninguna sección de "contadores" (stats tipo "+90 años") en el sitio construido; el único elemento numérico visible es el badge de reseñas de Google (4.8 / 70 reseñas), que es donde se aplica la animación de conteo.

## Objetivo

Agregar: (1) aparición de contenido al scrollear (fade + slide), (2) micro-interacciones de hover/tap en los botones principales, (3) transiciones animadas en menús/acordeones que hoy aparecen/desaparecen de golpe, (4) conteo animado en el badge de reseñas de Google. Respetar `prefers-reduced-motion`.

## Alcance

- Nueva dependencia: `framer-motion`.
- Nuevos primitivos: `components/motion/Reveal.tsx`, `components/motion/AnimatedCounter.tsx`.
- `app/layout.tsx`: envolver el contenido en `MotionConfig` con `reducedMotion="user"`.
- Componentes de Home: `Hero.tsx`, `GoogleReviewsBadge.tsx`, `RubroFinder.tsx`, `SistemaSanteroTeaser.tsx`, `ProductLines.tsx` (home), `CasesPreview.tsx`, `HistoryTimeline.tsx`, `Faq.tsx`.
- Componentes globales: `Header.tsx`, `Footer.tsx`, `WhatsAppButton.tsx`, `CtaBanner.tsx` (compartido por 5 páginas — la animación se agrega al componente, así que se ve también en las páginas de Fase 2 sin trabajo adicional).
- Fuera de alcance: `app/servicios/*`, `app/nosotros/*`, `app/sistema-santero/*`, `app/casos-de-exito/*`, `app/contacto/*` y sus componentes (Fase 2).

## Primitivos

**`components/motion/Reveal.tsx`** — client component. Envuelve children en `motion.div` con fade + slide-up (`opacity: 0, y: 24` → `opacity: 1, y: 0`), disparado por `whileInView` con `viewport={{ once: true, margin: "-80px" }}` (se anima una sola vez, un poco antes de entrar del todo en pantalla). Acepta `className` y `delay` opcional (para escalonar listas).

**`components/motion/AnimatedCounter.tsx`** — client component. Cuenta un número desde 0 hasta `value` cuando el elemento entra en pantalla (`useInView`, una sola vez), usando `animate()` de framer-motion sobre un `motionValue`. Acepta `value`, `decimals` (para el "4.8"), `duration`.

**Reducción de movimiento**: `app/layout.tsx` envuelve `{children}` (y Header/Footer) en `<MotionConfig reducedMotion="user">` — framer-motion desactiva automáticamente las animaciones de transformación para usuarios con esa preferencia del sistema, sin lógica adicional.

## Tratamiento por componente

- **Header.tsx**: el panel del mega-menú "Qué Hacemos" y el drawer mobile pasan de `{condición && <div>...}` a `<AnimatePresence>` + `motion.div` con fade + slide/scale de entrada y salida. El botón CTA "Solicitar asesoramiento" (desktop y mobile) suma `whileHover={{ scale: 1.03 }}` / `whileTap={{ scale: 0.97 }}`.
- **Footer.tsx**: el contenido (las 3 columnas) se envuelve en un solo `Reveal` al entrar en pantalla — cambio mínimo, no se anima cada link individualmente.
- **WhatsAppButton.tsx**: pasa a `motion.a` con una entrada suave (`initial`/`animate`, escala de 0 a 1 con un pequeño rebote) al cargar la página, más `whileHover`/`whileTap`.
- **Home `Hero.tsx`**: el overlay degradado hace un fade-in suave al montar (no depende de scroll, es lo primero que se ve).
- **`GoogleReviewsBadge.tsx`**: pasa a client component con una entrada de escala+fade al montar (con un pequeño delay para no competir con el video del Hero), y el "4.8" y el "70" usan `AnimatedCounter`.
- **`RubroFinder.tsx`, `SistemaSanteroTeaser.tsx`, `ProductLines.tsx` (home), `CasesPreview.tsx`, `HistoryTimeline.tsx`, `Faq.tsx`**: el título/bajada de cada sección se envuelve en un `Reveal`; los ítems repetidos (cards de rubro, pasos del método, líneas de producto, segmentos de casos, hitos de la línea de tiempo, preguntas) se envuelven cada uno en su propio `Reveal` con un `delay` escalonado según su índice (ej. `index * 0.06`, con un tope razonable para que listas largas no tarden demasiado en terminar de aparecer). Los acordeones ya existentes en `Faq.tsx` y `CasesPreview.tsx` pasan sus respuestas/grillas de logos por `AnimatePresence` en vez de un `{open && ...}` seco.
- **`CtaBanner.tsx`**: el bloque completo se envuelve en un `Reveal`; los dos botones suman `whileHover`/`whileTap`.

No se cambia ningún texto, dato, ni la paleta de colores existente — solo se agrega la capa de movimiento sobre lo ya construido.

## Testing / verificación

Sin framework de testing nuevo (consistente con el resto del proyecto). Verificación: `npm run build` + `npm run lint` (los componentes que pasan a `"use client"` deben seguir compilando y las rutas estáticas no deben romperse) + chequeo visual/interactivo en navegador de las animaciones de scroll, hover, y apertura/cierre de menús y acordeones, en desktop y mobile.

## Fuera de alcance

- Fase 2 (Servicios, Nosotros, Sistema Santero, Casos de Éxito, Contacto) — sub-proyecto separado.
- Cualquier sección de "stats/contadores" nueva — no existe hoy; si se agrega en el futuro, reutiliza `AnimatedCounter`.
- Transiciones de página completa (page transitions entre rutas) — no fue parte del pedido.
