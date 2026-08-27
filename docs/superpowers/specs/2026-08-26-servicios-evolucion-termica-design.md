# Servicios — Sistema de diseño "Evolución Térmica" — Diseño

## Contexto

Cuarto sub-proyecto del sistema de diseño "Evolución Térmica" (tokens +
Header/Footer, Home, y Nosotros + Sistema Santero, ya mergeados a
`master`). Esta vez toca la página `/servicios`.

El mock del cliente para esta página tiene una estructura distinta a la
actual: Hero minimalista sin imagen, los 3 pilares en grilla horizontal
(no apilados) con ícono + botón de descarga por pilar, y una sección
final "Compromiso Santero" con foto de fondo (en vez del `CtaBanner`
compartido actual).

**Gaps de contenido resueltos con criterio, sin inventar nada:**
- El mock muestra solo 2-3 ítems cortos por pilar; el sitio real tiene
  contenido más completo y aprobado (5 ítems en Ingeniería, 1 en
  Instalación, 2 en Soporte) — se mantiene todo el contenido real, mismo
  criterio ya aplicado en Home.
- Los 3 botones de descarga del mock ("Ficha Técnica", "Protocolo de
  Instalación", "Planes de Mantenimiento") no tienen archivos PDF reales
  detrás de ellos. En vez de dejarlos decorativos o inventar una
  descarga que no existe, se conectan a `/contacto?motivo=...`
  reutilizando los 3 motivos reales que ya existen en
  `data/motivos-contacto.ts` (`ficha-tecnica`, `visita-tecnica`,
  `guardia-24hs`) — quedan funcionales de verdad.

## Objetivo

Actualizar `/servicios` (Hero, pilares, sección final) al contenido y
estructura del mock del cliente, usando únicamente contenido y motivos
de contacto reales ya existentes.

## Alcance

- `components/servicios/Hero.tsx` — simplificación: se saca la imagen,
  queda centrado con acento de línea roja.
- `components/servicios/ServicePillars.tsx` — pasa de tarjetas apiladas
  verticalmente a grilla de 3 columnas, con ícono por pilar (mismos
  íconos ya usados en `components/home/Diferencial.tsx`, por
  consistencia visual en todo el sitio), checkmarks con ícono SVG (en
  vez de "✓" de texto plano), y un botón de contacto al pie de cada
  tarjeta.
- Nuevo `components/servicios/Compromiso.tsx` — sección final con foto
  de fondo real (`trabajo-3.png`, la misma que hoy usa el Hero — queda
  libre al sacarla de ahí) + texto + botón, reemplaza el `CtaBanner`
  compartido **solo en esta página** (no se toca el componente
  `CtaBanner` en sí, que lo siguen usando Home/Nosotros/Sistema
  Santero/Casos de Éxito sin cambios).
- `app/servicios/page.tsx` — se actualiza para usar `Compromiso` en vez
  de `CtaBanner`.
- Fuera de alcance: `data/servicios-pilares.ts` (los datos no cambian,
  solo cómo se presentan), `components/CtaBanner.tsx` (sin cambios).

## Hero

Se elimina la imagen (`trabajo-3.png`) y el layout de 2 columnas.
Queda centrado, siguiendo el mismo patrón que los demás Heroes nuevos
del sitio:
- Título "Nuestros Servicios" (Montserrat liviana, tracking ancho,
  mayúsculas).
- Bajada (mismo texto real ya existente: "Acompañamos cada proyecto
  desde la planificación técnica hasta el funcionamiento diario del
  sistema, garantizando la máxima eficiencia operativa.").
- Barra roja fina de acento debajo (`bg-brand-red`, ~2px alto, corta,
  centrada) — mismo elemento decorativo que el mock usa bajo varios
  títulos de página.

## Pilares — grilla de 3 columnas

`ServicePillars.tsx` pasa de `flex flex-col` a `grid sm:grid-cols-3`.
Cada tarjeta (`bg-ink-light`, borde `border-steel/20`) mantiene:
- Ícono del pilar arriba (mismo `PilarIcon` de `Diferencial.tsx`,
  duplicado localmente en este archivo — mismo patrón ya usado en el
  sitio para íconos pequeños específicos de una sección).
- Número + título + bajada (sin cambios de contenido).
- **Todos** los ítems reales del pilar (no se recortan), cada uno con
  un ícono de check SVG (mismo patrón ya usado en
  `components/sistema-santero/ProductLines.tsx`) en vez del "✓" de
  texto plano actual.
- Un botón de contacto al pie, específico por pilar:
  - Ingeniería & Proyectos → "Descargar Ficha Técnica" →
    `/contacto?motivo=ficha-tecnica`.
  - Instalación & Puesta en Marcha → "Consultar Protocolo de
    Instalación" → `/contacto?motivo=visita-tecnica`.
  - Soporte & Postventa → "Contactar Guardia Técnica" →
    `/contacto?motivo=guardia-24hs`.

Como las columnas van a tener alturas distintas (5 ítems vs. 1 vs. 2),
la grilla permite eso sin problema — es el mismo comportamiento que ya
tiene el mock (sus 3 columnas también tienen distinta cantidad de
ítems).

## Nueva sección "Compromiso Santero"

Reemplaza el `CtaBanner` al final de `/servicios` únicamente:
- Foto real de fondo (`trabajo-3.png`) + degradado oscuro encima.
- Texto: "Compromiso Santero" (eyebrow) + "La excelencia térmica no es
  un objetivo, es nuestro estándar operativo. Conozca nuestra planta de
  desarrollo." (copy genérico del mock).
- Botón "Solicitar Visita Técnica" → `/contacto?motivo=visita-tecnica`
  (mismo motivo que ya usaba el `CtaBanner` que reemplaza en esta
  página).

## Sistema visual

Reutiliza tokens ya existentes (`bg-ink`, `bg-ink-light`,
`border-steel/20`, `text-brand-red-light`, `font-mono` para labels) —
sin tokens nuevos.

## Testing / verificación

Mismo patrón de siempre: `npm run build` + `npm run lint` + grep sobre
HTML estático + verificación interactiva (los 3 botones de contacto de
los pilares apuntan a sus `?motivo=` correctos, la grilla de 3 columnas
se ve bien en desktop y colapsa a 1 columna en mobile, la sección
"Compromiso Santero" muestra la foto y el botón funciona). Sin tests
automatizados nuevos.

## Fuera de alcance

- `data/servicios-pilares.ts` — contenido sin cambios.
- `components/CtaBanner.tsx` — sin cambios, sigue usándose en las otras
  4 páginas.
- Archivos PDF reales de fichas técnicas/protocolos (tarea de
  background ya existente, separada de este sub-proyecto).
