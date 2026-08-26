# Sistema de diseño v2 (Evolución Térmica) + Header/Footer — Diseño

## Contexto

El cliente diseñó (vía Stitch, la herramienta de diseño con IA de Google) un
sistema de diseño completo para las 8 páginas del sitio — un export en
`stitch_santero_thermal_evolution_web.zip` con `screen.png` + `code.html` por
página y un `DESIGN.md` con la especificación de tokens ("Evolución
Térmica": fusión de ingeniería industrial cruda y estética de lujo,
inspirada en moda de alta gama para la estructura y en maquinaria industrial
para la textura). Pidió rediseñar el sitio para parecerse lo más posible a
esa referencia, usando criterio propio donde haga falta, y manteniendo el
badge de reseñas de Google que ya está en Home.

Es un cambio grande: nueva paleta de color (negro neutro en vez del azul
oscuro actual), 3 tipografías nuevas, un patrón de Header distinto
(navegación horizontal siempre visible en vez del menú a pantalla completa
recién mergeado), y contenido/layout específico por página. Se decidió
decompensarlo en sub-proyectos — este es el primero: la base (tokens +
Header/Footer) de la que dependen todos los demás.

**Advertencia de contenido, no de este sub-proyecto pero registrada para
los siguientes:** los mocks de "Casos de Éxito" y "Referencias" incluyen
contenido inventado por la IA — un caso ficticio ("Hotel X") con métricas
inventadas (28%, 85%), testimonios de personas que no existen, logos de
clientes falsos (incluyendo el logo de Audi, protegido por marca
registrada), y un mapa de cobertura Mercosur inventado. Ninguno de esos
sub-proyectos futuros puede usar ese contenido tal cual — se adapta la
estructura visual con datos reales o se deja pendiente donde no hay data
real todavía (Casos de Éxito sigue bloqueado por falta de contenido real
del cliente, sin cambios en esa página en este plan).

## Objetivo

Establecer la base visual del sistema de diseño nuevo — tokens de color,
tipografías, y el Header/Footer — de la que van a depender todos los
sub-proyectos de página siguientes.

## Alcance

- `app/globals.css` — tokens de color y tipografía dentro de `@theme`.
- `app/layout.tsx` — carga de fuentes (`next/font/google`).
- `components/Header.tsx` — reescritura completa (nuevo patrón de nav).
- `components/Footer.tsx` — restyle a la paleta nueva (sin cambios de
  contenido/estructura).
- Fuera de alcance: cualquier página de contenido (`app/**/page.tsx` y sus
  componentes), la nueva página `/faqs` (sub-proyecto futuro), Casos de
  Éxito/Referencias con datos reales o inventados, el `GoogleReviewsBadge`
  (se mantiene sin cambios).

## Tokens de color (`app/globals.css`)

Se **redefinen los valores** de los tokens de color oscuro ya existentes
(no se renombran) — esto propaga la paleta nueva a todo lo que ya usa
`bg-ink`/`bg-ink-light`/`bg-navy` en el sitio sin tocar ningún archivo de
componente:

```
--color-ink:           #0f1729 → #131313   (fondo oscuro principal)
--color-ink-light:     #1a2540 → #1c1b1b   (superficie/tarjeta)
--color-navy:          #2a2a2e → #131313   (unifica el azul oscuro legado
                                             con el negro neutro nuevo —
                                             hoy usado en Nosotros y en el
                                             Hero de Sistema Santero)
--color-brand-red:      #d20a10 → #d3000d  (ajuste mínimo, calza exacto
                                             con secondary-container del
                                             DESIGN.md)
--color-brand-red-light: #ff6b6b → #ffb4aa (ajuste mínimo, calza con
                                             secondary del DESIGN.md)
```

Se **agregan** tres tokens nuevos:

```
--color-ink-deep:      #0e0e0e   (capa más profunda: Footer, fondo de página)
--color-ink-elevated:  #2a2a2a   (superficies elevadas: hover, tarjetas
                                   destacadas — uso en sub-proyectos futuros)
--color-steel:         #71717A   (borde "plano técnico" — se usa como
                                   border-steel/20, nunca como color de
                                   texto sólido)
```

## Tipografía

- `--font-sans` (cuerpo de texto en todo el sitio, hoy `Helvetica, Arial,
  sans-serif`) pasa a **Hanken Grotesk**, cargada vía `next/font/google`
  con peso 400.
- `--font-heading` sigue siendo Montserrat (`var(--font-montserrat)`, sin
  cambios de token) — pero en `app/layout.tsx` se agrega el peso **300** a
  la lista de pesos cargados (`weight: ["300", "400", "500", "600", "700",
  "800"]`), necesario para los títulos livianos con tracking ancho del
  diseño nuevo. Los pesos 400/500/600/700/800 ya cargados no se tocan —
  siguen en uso en el resto del sitio.
- `--font-mono` (hoy Geist Mono vía `--font-geist-mono`, confirmado sin
  ningún uso real en el código actual — `grep` no encuentra `font-mono` en
  ningún componente) se reemplaza por **JetBrains Mono**, peso 500. Es un
  swap sin riesgo: no hay ningún lugar que dependa visualmente de Geist
  Mono hoy. Este es el font-family que va a usarse para chips/labels
  técnicos en sub-proyectos futuros (ej. "RENDIMIENTO 98%").

## Header — estructura nueva

Reemplaza por completo el patrón "menú a pantalla completa" mergeado hoy
mismo. Nuevo patrón, en dos variantes según viewport:

**Desktop (`lg:` y superior):**
- Barra fija (`fixed top-0 w-full z-[70]`), fondo `bg-ink/80` +
  `backdrop-blur-xl`, borde inferior `border-b border-steel/20` (la firma
  "ghost border" del DESIGN.md).
- Fila superior: logo real (`Image`, `/img/generales/logo.png`, el mismo
  asset de siempre) centrado — **no** se reemplaza por el texto "SANTERO"
  que aparece como placeholder en 7 de las 8 pantallas del mock (Home sí
  muestra el ícono real; se sigue ese criterio para las 8 páginas, es más
  consistente con la marca real).
- Fila de nav debajo, centrada, con los 6 links reales de `lib/nav.ts`
  (Nosotros, Sistema Santero, Servicios, Referencias, Casos de Éxito,
  FAQ's — este último apunta a `/#faqs` en este sub-proyecto; pasará a
  `/faqs` cuando se cree esa página en un sub-proyecto futuro) más "Qué
  Hacemos" insertado en su posición estructural de siempre
  (`navLinks.slice(0,2)` + "Qué Hacemos" + `navLinks.slice(2)`, el mismo
  patrón usado en todos los sub-proyectos anteriores). Texto en mayúsculas
  con tracking, link activo subrayado.
- "Qué Hacemos" es un mega-menú desplegable (no acordeón) que reutiliza
  sin cambios `porRubro`/`porServicio`/`porProducto` de
  `data/que-hacemos.ts`, en 3 columnas separadas por líneas verticales
  finas (`border-steel/20`), abre y cierra con click (no hover — evita
  problemas de accesibilidad por teclado/touch), cierra también con click
  afuera o Escape (mismo mecanismo que ya existía en el Header pre-Gucci
  de este sitio, antes del sub-proyecto de hoy).

**Mobile (debajo de `lg:`):**
- La fila de nav horizontal se oculta (no entran 6+ links en una fila
  angosta). Se mantiene el mecanismo de panel a pantalla completa
  construido en el sub-proyecto de hoy (mismo estado `menuOpen`, mismo
  botón "MENU"/"Cerrar", mismo panel con Escape/scroll-lock/click-to-close
  ya verificados) — pero restyleado a la paleta y tipografía nuevas. Esto
  no es una regresión de funcionalidad: es exactamente el patrón que el
  propio `code.html` del cliente usa (`<nav class="hidden lg:flex ...">`
  confirmado en el export), así que el mock mismo asume este fallback
  mobile.

## Footer — restyle sin cambios de contenido

Mismo contenido y estructura de 3 columnas de siempre (marca / Secciones /
Legal & Contacto + íconos sociales). Cambios solo de superficie:
- Fondo `bg-ink-deep` (en vez de `bg-white`).
- Borde superior/divisores en `border-steel/20` (en vez de
  `border-zinc-200`).
- Textos y links a la paleta oscura (`text-white`/`text-white/NN`, en vez
  de `text-zinc-500`).
- Encabezados de columna ("Secciones", "Legal & Contacto") en mayúsculas
  con tracking, siguiendo el criterio tipográfico del DESIGN.md.
- El borde superior rojo grueso actual (`border-t-4 border-brand-red`) se
  reemplaza por el borde fino `border-steel/20` — el rojo grueso no es
  parte del lenguaje visual nuevo (que reserva el rojo para CTAs, no para
  decoración estructural).

## Testing / verificación

Mismo patrón que todos los sub-proyectos anteriores de este sitio:
`npm run build` + `npm run lint`, grep sobre el HTML estático para
contenido/clases que no dependan de interacción, y verificación
interactiva en navegador para: apertura/cierre del mega-menú "Qué
Hacemos" en desktop, el panel mobile completo (Escape, scroll-lock,
click-fuera, click-en-link), y una revisión visual en ambos breakpoints
contra las capturas del mock. Sin tests automatizados nuevos.

## Fuera de alcance

- Contenido y layout de cada página (viene en sub-proyectos futuros,
  página por página).
- La nueva página `/faqs` (sub-proyecto futuro; el link del nav sigue
  apuntando a `/#faqs` hasta entonces).
- Casos de Éxito y Referencias con datos reales o basados en el mock
  (Casos de Éxito sigue bloqueado por falta de contenido real del
  cliente).
- `GoogleReviewsBadge` — se mantiene sin cambios de ningún tipo.
- Cualquier contenido inventado por el mock (ver advertencia en
  Contexto) — no se reproduce en ningún sub-proyecto.
