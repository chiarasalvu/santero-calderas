# Nosotros + Sistema Santero — Sistema de diseño "Evolución Térmica" — Diseño

## Contexto

Tercer sub-proyecto del sistema de diseño "Evolución Térmica" (tokens +
Header/Footer, y Home, ya mergeados a `master`). Este toca dos páginas a
la vez, agrupadas por pedido del cliente: Nosotros y Sistema Santero.

Ambas páginas ya pasaron por un reskin oscuro y una capa de animación en
sub-proyectos anteriores — la base ya está. Este sub-proyecto solo toca
el **Hero** de cada página (y las Líneas de Producto de Sistema Santero)
para adoptar el contenido/estilo específico del mock del cliente. El
resto de cada página (`HistoryTimeline`, `MissionVisionValues`,
`CtaBanner` en Nosotros; `Overview`, `ComparisonTable`, `CtaBanner` en
Sistema Santero) no se toca.

**Assets reales encontrados y usados en este plan:**
`public/img/generales/sobre-nosotros.png` es una foto real de la empresa
(una persona junto a un cartel antiguo genuino "Nicolás O. Santero —
Máquinas y Calderas", que además conecta con la propia línea de tiempo
real de la empresa) — se usa como fondo del Hero de Nosotros.

**Gaps de contenido resueltos con criterio, sin inventar nada:**
- El mock de Nosotros tiene un botón "Ver video institucional" — no
  existe ese archivo todavía (el cliente lo va a mandar más adelante).
  Se construye el modal de video completo, apuntando temporalmente al
  video real que ya usa el Hero de Home (`hero-santero.mp4`) — queda
  documentado con un comentario en el código para cambiar el `src` en
  una línea cuando llegue el archivo real.
- El mock de Sistema Santero muestra una foto de un "serpentín de
  intercambio" que no existe como asset en este sitio — se mantiene la
  imagen y el badge "98%" que ya existen en el Hero actual, sin forzar
  un reemplazo con un asset que no es el real.
- El mock de "Líneas de Producto" incluye afirmaciones técnicas
  específicas no confirmadas (integración SCADA, acero inoxidable
  316L) — no se usan. En su lugar, los bullets reales que ya existen en
  el sitio se reorganizan en el mismo formato visual (título + ícono +
  descripción) del mock.

## Objetivo

Actualizar el Hero de Nosotros y el Hero + Líneas de Producto de Sistema
Santero al contenido y estilo del mock del cliente, usando únicamente
contenido y assets reales.

## Alcance

- `components/AboutHero.tsx` (Nosotros) — reescritura completa: nuevo
  copy, foto de fondo real, modal de video.
- `components/sistema-santero/Hero.tsx` — nuevo copy (eyebrow, título en
  dos líneas, bajada, 2 badges con check). De paso, se corrige el bug
  pre-existente del botón "Consultar con un Ingeniero" (linkeaba a un
  anchor `#consultar` que no existe en ningún lado) — pasa a
  `/contacto?motivo=visita-tecnica`, mismo criterio ya usado en el resto
  del sitio.
- `components/sistema-santero/ProductLines.tsx` — restyle de las
  tarjetas ATSOL/ADN: nuevo label de categoría, bullets reorganizados en
  formato título+descripción con ícono, y se suma el dato real de
  rendimiento (98%/92%) al pie de cada tarjeta.
- Fuera de alcance: `components/HistoryTimeline.tsx`,
  `components/nosotros/MissionVisionValues.tsx`,
  `components/sistema-santero/Overview.tsx`,
  `components/sistema-santero/ComparisonTable.tsx`, `CtaBanner` en
  ambas páginas — ninguno se toca.

## Nosotros — `AboutHero.tsx`

Pasa a ser un client component (necesita estado para el modal de video):

- Fondo: `Image` con `/img/generales/sobre-nosotros.png` (`fill`,
  `object-cover`) + gradiente oscuro encima (mismo patrón que otros
  Heroes con foto de fondo del sitio) — reemplaza el fondo de gradientes
  radiales actual.
- Eyebrow: "Evolución Térmica" (`font-mono`, tracking ancho, rojo claro).
- Título: "Forjando el futuro" / "Desde 1935" en dos líneas (segunda
  línea en `text-white/50`, más apagada) — Montserrat liviana con
  tracking ancho, mayúsculas.
- Bajada: "Cuatro generaciones de excelencia en ingeniería térmica.
  Transformamos el acero en potencia industrial, combinando precisión
  técnica con robustez legendaria." (texto genérico del mock).
- Se **elimina** el botón "Quiero Asesoramiento" (el mock no lo tiene en
  el Hero; sigue disponible en el `CtaBanner` al final de la página).
- Botón "Ver video institucional ▶" que abre un modal a pantalla
  completa (overlay oscuro + video + botón de cierre), con
  `z-[80]` (por encima de todo lo demás del sitio, incluido el Header en
  `z-[70]`). El `src` del `<video>` apunta a `/video/hero-santero.mp4`
  con un comentario en el código indicando que es un placeholder hasta
  que el cliente envíe el video institucional real.

## Sistema Santero — `Hero.tsx`

- Eyebrow: "Tecnología de Intercambio" (mismo estilo que el eyebrow de
  Nosotros).
- Título: "Sistema" / "Santero" en dos líneas, mismo tratamiento
  tipográfico liviano con tracking que el resto de los Heroes nuevos.
- Bajada: "Calentamiento indirecto de alta eficiencia. Diseñado para
  evitar la acumulación de sarro y maximizar el rendimiento térmico en
  aplicaciones industriales exigentes." (paráfrasis más corta del texto
  real que ya usa `Overview.tsx` en la misma página — no es contenido
  nuevo, solo una versión resumida del que ya existe y está aprobado).
- 2 badges con ícono de check: "Acero Inoxidable" y "Bajo
  Mantenimiento".
- El botón "Consultar con un Ingeniero" pasa de `href="#consultar"`
  (roto) a `href="/contacto?motivo=visita-tecnica"`.
- La imagen (`caldera-4.png`) y el badge flotante "98% / Eficiencia
  estacionaria" no cambian.

## Sistema Santero — `ProductLines.tsx`

- Los badges de categoría cambian: ATSOL pasa de "Alto consumo" a
  "Línea Premium" (coherente con cómo ya se describe ATSOL en Home —
  badge "Premium" en `components/home/ProductLines.tsx`), ADN pasa de
  "Diseño compacto" a "Relación Precio-Calidad".
- Los bullets de cada línea (ya existentes, sin cambios de contenido)
  se reorganizan de una lista plana a 2 ítems con título + descripción +
  ícono de check, agrupando los 3 bullets reales de cada línea en 2
  títulos:
  - ATSOL: "Alta Exigencia" (une los bullets de "alta exigencia" e
    "ideal para hoteles/clubes/edificios/industrias") + "Generación
    Instantánea" (el bullet de calentamiento indirecto, sin cambios).
  - ADN: "Diseño Compacto" (une "demandas medianas/espacios reducidos"
    e "ideal para consorcios/gimnasios/climatización de piscinas") +
    "Bajo Mantenimiento" (el bullet de generación instantánea y bajo
    mantenimiento, sin cambios).
- Se agrega una fila "Rendimiento" al pie de cada tarjeta, antes del
  botón "Descargar ficha técnica": ATSOL "98%", ADN "92%" — cifras
  reales ya usadas en versiones anteriores del sitio (el 98% de ATSOL
  ya fue confirmado por el cliente en el sub-proyecto de Home).
- El botón "Descargar ficha técnica" no cambia.

## Sistema visual

Reutiliza los tokens ya existentes (`bg-ink`, `bg-ink-light`,
`border-steel/20`, `text-brand-red-light`, `font-mono` para
labels/eyebrows) — sin tokens nuevos.

## Testing / verificación

Mismo patrón de siempre: `npm run build` + `npm run lint` + grep sobre
HTML estático + verificación interactiva en navegador (el modal de
video de Nosotros: abre, reproduce, cierra con el botón y con click
afuera; el link "Consultar con un Ingeniero" de Sistema Santero apunta
a `/contacto?motivo=visita-tecnica`; las 2 tarjetas de Líneas de
Producto muestran los 2 ítems con ícono y el dato de rendimiento). Sin
tests automatizados nuevos.

## Fuera de alcance

- `HistoryTimeline`, `MissionVisionValues`, `Overview`,
  `ComparisonTable`, `CtaBanner` en ambas páginas.
- El video institucional real (el cliente lo va a proveer más
  adelante — hoy queda wireado a un placeholder real, no fabricado).
- Cualquier reemplazo de imagen que requiera un asset que no existe
  (el "serpentín de intercambio" del mock).
- Las afirmaciones técnicas específicas del mock no confirmadas (SCADA,
  acero 316L).
