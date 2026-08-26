# Header estilo Gucci + página Referencias + Motion Fase 2 — Diseño

## Contexto

El cliente y su equipo mandaron un screenshot del header de Gucci como
referencia de estilo ("Logo en el centro y más sutil el encabezado, me
gustó Gucci") y confirmaron el orden de páginas del sitio en su documento
de feedback: **Home → Nosotros → Sistema Santero → Qué Hacemos → Servicios
→ Referencias → Casos de Éxito → FAQs**.

Comparado con el sitio actual, dos gaps quedaron confirmados:

1. El Header hoy es una "pill" flotante blanca, con logo a la izquierda y
   los 5 links de `navLinks` siempre visibles — no se parece al patrón
   Gucci (logo centrado, barra sutil, todo detrás de un botón MENU).
2. **"Referencias" no existe** como página ni como ítem de navegación en
   ningún lugar del sitio.

Además, el cliente pidió que "toda la web tenga animaciones que generen
modernidad". La Fase 1 de la capa de animación (framer-motion) ya cubrió
los primitivos (`Reveal`, `AnimatedCounter`) y los animó en Home,
Header/Footer/WhatsApp/CtaBanner. La Fase 2 — animar el contenido propio
de Servicios, Nosotros, Sistema Santero y Contacto — seguía pendiente.
Casos de Éxito queda fuera (pendiente de contenido real de casos, sin
cambios en este plan).

## Objetivo

1. Rediseñar el Header al patrón Gucci: barra minimalista de tema oscuro,
   logo centrado, botón "MENU" que abre un panel de navegación a pantalla
   completa con el orden de páginas confirmado por el cliente.
2. Crear la página `/referencias` (logos de clientes por rubro,
   reutilizando datos ya existentes) y sumarla a la navegación en su
   lugar correcto.
3. Cerrar la Fase 2 de animaciones: aplicar `Reveal` a las secciones de
   Servicios, Nosotros, Sistema Santero, Contacto y la nueva Referencias.

## Alcance

- `components/Header.tsx` — reescritura completa del patrón de navegación.
- `lib/nav.ts` — se agrega el link de Referencias en su posición.
- `components/Footer.tsx` — se actualiza para incluir Referencias en su
  lista de links (mismo patrón slice-insertion que ya usa para "Qué
  Hacemos", ver "Fuera de alcance" sobre qué NO cambia ahí).
- Nuevo `app/referencias/page.tsx` + nuevo `components/referencias/Hero.tsx`
  y `components/referencias/LogosGrid.tsx`.
- Animación (`Reveal`) agregada a las secciones de:
  `components/AboutHero.tsx`, `components/HistoryTimeline.tsx` (ya tiene
  motion propio — no se toca), `components/nosotros/MissionVisionValues.tsx`,
  `components/sistema-santero/Hero.tsx`, `components/sistema-santero/Overview.tsx`,
  `components/sistema-santero/ProductLines.tsx`,
  `components/sistema-santero/ComparisonTable.tsx`,
  `components/servicios/Hero.tsx`, `components/servicios/ServicePillars.tsx`,
  `components/contacto/Hero.tsx`, `components/contacto/ContactSection.tsx`.
- Fuera de alcance: Casos de Éxito (contenido real pendiente); reskin de
  color de Nosotros/Sistema Santero (ya están en tema oscuro `navy`, no
  hace falta tocar su paleta); envío real de formularios; páginas de
  detalle por rubro/servicio/producto.

## Header — estructura final

**Barra fija** (`fixed inset-x-0 top-0 z-50`, ya no es una pill con
margen): fondo `bg-ink/90` + `backdrop-blur-md`, borde inferior
`border-b border-white/10`, altura consistente en todas las páginas
(incluida sobre el video del Hero, donde hoy la pill flota).

- **Izquierda**: `Link` de texto sutil "Contacto" → `/contacto`
  (equivalente al "+ Contact Us" de la referencia).
- **Centro**: logo (`Image`, mismo asset actual), centrado con
  `absolute left-1/2 -translate-x-1/2` dentro de la barra flex.
- **Derecha**: botón bordeado con texto "MENU" + ícono hamburguesa
  (`border border-white/30 rounded-full px-4 py-2`), único trigger de
  navegación — igual en desktop y mobile, sin dos implementaciones
  separadas como hoy.
- Se **elimina** el CTA "Solicitar asesoramiento" de la barra.

**Panel de menú** (overlay a pantalla completa, `motion.div` con
`AnimatePresence`, fondo `bg-ink`, fade + slight scale/slide al abrir):

- Lista centrada, en el orden confirmado por el cliente:
  Nosotros, Sistema Santero, **Qué Hacemos** (ítem-acordeón: al hacer
  click despliega las 3 columnas `porRubro`/`porServicio`/`porProducto`
  ya existentes en `data/que-hacemos.ts`, reutilizadas sin cambios),
  Servicios, **Referencias**, Casos de Éxito, FAQ's (`/#faqs`).
- Al pie del panel, un CTA destacado "Solicitar asesoramiento" →
  `/contacto`.
- Botón de cierre (✕) en la misma posición donde estaba MENU, más cierre
  por `Escape` y por click en cualquier link (igual que el drawer mobile
  actual).
- El acordeón "Qué Hacemos" dentro del panel reemplaza tanto al mega-menú
  desktop como al drawer-accordion mobile que existen hoy — se unifica en
  una sola implementación.

`lib/nav.ts` no se toca en su forma (sigue siendo la fuente de los 5
links "planos"); "Qué Hacemos" y "Referencias" se siguen inyectando
estructuralmente en el componente igual que hoy se inyecta "Qué
Hacemos" — ver más abajo.

### `lib/nav.ts` — dónde entra Referencias

```
navLinks: NavLink[] = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/sistema-santero", label: "Sistema Santero" },
  { href: "/servicios", label: "Servicios" },
  { href: "/referencias", label: "Referencias" },      // nuevo
  { href: "/casos-de-exito", label: "Casos de Éxito" },
  { href: "/#faqs", label: "FAQ's" },
];
```

Con esto, el patrón de slice ya usado en Header/Footer para insertar "Qué
Hacemos" entre el índice 2 y 3 (`navLinks.slice(0,2)` … `navLinks.slice(2)`)
sigue funcionando igual, y Referencias queda automáticamente en su lugar
correcto sin lógica adicional.

## Footer

Se actualiza `components/Footer.tsx` para que su lista de links refleje
el mismo `navLinks` ya actualizado (incluye Referencias sin cambios de
lógica, solo porque ahora `navLinks` tiene un elemento más). No se
rediseña el Footer en este plan.

## Página `/referencias`

- `app/referencias/page.tsx`: `<Hero />` + `<LogosGrid />`, metadata
  ("Referencias | Calderas Santero").
- `components/referencias/Hero.tsx`: tema oscuro (`bg-ink`), título tipo
  "Empresas que confían en Calderas Santero", envuelto en `Reveal`.
- `components/referencias/LogosGrid.tsx`: recibe
  `logosPorSegmento: Record<Segmento, SegmentoLogo[]>` (mismo shape que ya
  produce `getLogosPorSegmento()`), renderiza una grilla por segmento
  (título + grid de logos, mismo patrón visual que `CasesExplorer` pero
  **sin** los tabs de filtro — se listan todos los segmentos con logos en
  orden, cada grupo envuelto en `Reveal`). Tema oscuro: tarjetas
  `bg-ink-light` en vez de `bg-white`.
- Sin CTA banner al final (página corta, el CTA ya vive en el panel del
  menú y en el Footer).

## Motion Fase 2 — alcance concreto

Se envuelve con `<Reveal>` (primitivo ya existente, sin cambios) el
contenido de cada sección de:

- **Nosotros**: `AboutHero` (título/bajada), `MissionVisionValues` (cada
  una de las 3 tarjetas con `delay` escalonado).
- **Sistema Santero**: `Hero`, `Overview`, `ProductLines` (cada línea de
  producto), `ComparisonTable` (la tabla completa).
- **Servicios**: `Hero`, cada pilar de `ServicePillars`.
- **Contacto**: `Hero` (ya tiene `MotivoSelector` en `Suspense`, no se
  toca esa parte — se envuelve el título/bajada), `ContactSection` (el
  bloque del formulario y el de datos de contacto, cada uno con su
  propio `Reveal`).
- **Referencias** (nueva): ya nace animada, ver arriba.

No se agregan animaciones nuevas a Casos de Éxito ni Home (Home ya está
cubierto por Fase 1).

## Testing / verificación

Mismo patrón que sub-proyectos anteriores: `npm run build` + `npm run
lint`, verificación de contenido con `grep` sobre el HTML estático para
todo lo que no dependa de interacción, y chequeo interactivo en
navegador para: apertura/cierre del panel MENU, acordeón "Qué Hacemos"
dentro del panel, navegación funcional a las 6 páginas + FAQ anchor,
`Escape`/click-fuera para cerrar el panel, y verificación visual de que
Reveal dispara correctamente en cada página tocada. Sin tests
automatizados nuevos.

## Fuera de alcance

- Casos de Éxito (contenido real de casos, pendiente del cliente).
- Reskin de paleta de Nosotros/Sistema Santero (ya están en `navy`).
- Envío real de formularios a backend/email.
- Páginas de detalle por rubro/servicio/producto.
- Íconos de bolsa/cuenta/búsqueda del header de Gucci (no aplican al
  negocio de Calderas Santero).
