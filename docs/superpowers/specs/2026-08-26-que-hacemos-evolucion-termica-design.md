# Qué Hacemos — Sistema de diseño "Evolución Térmica" — Diseño

## Contexto

Último sub-proyecto pendiente del sistema de diseño "Evolución Térmica".
"Qué Hacemos" hoy **no es una página** — es el mega-menú desplegable del
Header (3 columnas: Por Rubro/Por Servicio/Por Producto, datos en
`data/que-hacemos.ts`). El mock del cliente y su documento original de
orden de páginas ("Home → Nosotros → Sistema Santero → Qué Hacemos →
Servicios → Referencias → Casos de Éxito → FAQs") la tratan como una
página propia — se decidió crear `/que-hacemos` como página real,
manteniendo el mega-menú del Header sin cambios de comportamiento.

**Contenido inventado del mock, no usado:** la columna central del mock
de "Qué Hacemos" es literalmente una captura de pantalla de una nota de
feedback del cliente que se coló por error en el diseño ("Querían que
hagamos un menú desplegable como el de IDERO...") — no es contenido de
Calderas Santero, es un descarte del proceso de diseño del cliente con
otra agencia. No se reproduce. Se usa en cambio el contenido real que ya
existe en `data/que-hacemos.ts` (idéntico al que ya muestra el mega-menú
del Header).

## Objetivo

Crear `/que-hacemos` como página real con las 3 categorías existentes
(Por Rubro, Por Servicio, Por Producto), y sumar un link de acceso desde
el mega-menú del Header hacia esa página.

## Alcance

- Nuevo `app/que-hacemos/page.tsx`.
- Nuevo `components/que-hacemos/Hero.tsx`.
- Nuevo `components/que-hacemos/Categorias.tsx`.
- `components/Header.tsx` — se agrega un link "Ver todo →" a
  `/que-hacemos` dentro del panel del mega-menú (desktop) y del
  acordeón (mobile). **No se toca ningún otro comportamiento del
  Header** — el botón "Qué Hacemos" sigue siendo un toggle puro del
  desplegable, sin convertirse en link.
- Fuera de alcance: `data/que-hacemos.ts`, `data/rubros.ts` (sin
  cambios, se reutilizan tal cual).

## Página `/que-hacemos`

- **Hero**: título "Qué Hacemos" + bajada ("Soluciones térmicas
  organizadas por rubro, servicio y producto — encontrá la que
  necesitás para tu proyecto."), mismo patrón visual que los demás
  Heroes nuevos del sitio (eyebrow-less, tracked/liviano, centrado).
- **Categorías**: grilla de 3 columnas (colapsa a 1 en mobile), cada una
  una tarjeta con el título de la categoría y la lista completa de sus
  ítems reales (11 en Por Rubro, 8 en Por Servicio, 10 en Por
  Producto), cada ítem como link con flecha, mismos destinos que ya
  usa el mega-menú (`/servicios` o `/sistema-santero`, sin páginas de
  detalle nuevas).
- **CTA final**: reutiliza el `CtaBanner` compartido (sin cambios al
  componente), con destino a cotizar proyecto y a Sistema Santero.

## Header — link "Ver todo"

En el panel del mega-menú desktop (dentro del `AnimatePresence` que ya
existe), debajo de la grilla de 3 columnas, se agrega una fila con un
link "Ver todo →" a `/que-hacemos` que cierra el mega-menú al navegar
(mismo patrón `onClick={() => setQueHacemosOpen(false)}` ya usado por
los links de las columnas).

En el acordeón mobile "Qué Hacemos" (dentro del panel a pantalla
completa), debajo de las 3 columnas apiladas, se agrega el mismo link,
cerrando el panel completo al navegar (`onClick={closeMobileMenu}`,
mismo patrón que el resto de los links del panel mobile).

No se modifica ningún estado, efecto, ni z-index existente del Header —
es una adición puramente de contenido (un `<Link>` más) en dos lugares
ya existentes.

## Sistema visual

Reutiliza tokens y componentes ya existentes (`bg-ink`, `bg-ink-light`,
`border-steel/20`, `text-brand-red-light`, `font-mono`, `Reveal`,
`CtaBanner`) — sin tokens ni componentes compartidos nuevos.

## Testing / verificación

Mismo patrón de siempre: `npm run build` + `npm run lint` + verificación
interactiva (la página `/que-hacemos` muestra las 3 categorías completas
con sus links reales; el link "Ver todo" del mega-menú desktop y del
acordeón mobile navegan correctamente y cierran el menú/panel; el resto
del comportamiento del Header — apertura/cierre, Escape, scroll-lock,
z-index — sigue funcionando exactamente igual que antes, sin
regresiones). Sin tests automatizados nuevos.

## Fuera de alcance

- `data/que-hacemos.ts`, `data/rubros.ts` — sin cambios.
- Cualquier comportamiento del botón "Qué Hacemos" del Header (sigue
  siendo un toggle, no se convierte en link).
- Páginas de detalle por rubro/servicio/producto individuales.
- El contenido inventado/roto del mock (captura de feedback del
  cliente) — no se reproduce.
