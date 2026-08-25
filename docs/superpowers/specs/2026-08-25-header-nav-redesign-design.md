# Rediseño de Header / Navegación — Calderas Santero — Diseño

## Contexto

Sub-proyecto 2 de 5 del rediseño mayor del sitio (sub-proyecto 1, Home, ya implementado y mergeable en la rama `home-redesign`). El feedback del cliente ("MKT – Web Santero – Agosto 2026") pide una navegación "Por Solución / Rubro" estilo ORBIS/IDERO: el visitante no siempre sabe qué equipo necesita, pero sí sabe qué administra o qué problema tiene. Un segundo documento ("Información Web - Santero") confirma que quieren un menú desplegable estilo IDERO para una página "Qué hacemos", con columnas por Rubro / Servicio / Producto, y aporta las listas completas de cada columna.

Este spec cubre el Header (nav desktop + mobile) y el Footer. Se trabaja sobre la misma copia aislada en `/Users/chiara/studio-due/calderas-santero-redesign`, rama `home-redesign` (se continúa en la misma rama ya que Header/Footer son compartidos por todas las páginas, incluida la Home ya rediseñada).

## Objetivo

Agregar un ítem de navegación "Qué Hacemos" que despliega un mega-menú de 3 columnas (Por Rubro / Por Servicio / Por Producto), dando acceso directo a las 29 combinaciones que pidió el cliente, sin crear todavía las páginas de detalle individuales (eso queda para un sub-proyecto futuro).

## Alcance

- `components/Header.tsx`, `components/Footer.tsx`, `lib/nav.ts`.
- Un nuevo archivo de datos para las 3 columnas del mega-menú.
- No se crean páginas nuevas de detalle (rubro/servicio/producto individuales) — los links de esta etapa apuntan a páginas ya existentes.
- No se modifica ninguna página de contenido (`app/**/page.tsx`) más allá de que automáticamente heredan el Header/Footer actualizados.

## Contenido y datos

**Por Rubro** (11, reutiliza `data/rubros.ts` del sub-proyecto 1 — mismos 11 id/label, sin duplicar la lista): Real Estate, Hotelería, Consorcios, Clubes & Gym, Natatorios, Industrias, Balnearios, Camping, SPA & Wellness, Gastronomía, Hospitales y Clínicas.

**Por Servicio** (8, nuevo): Agua Caliente Sanitaria, Calefacción Central, Climatización de Piscinas, Procesos con Vapor, Servicio Técnico Oficial, Solar, Instalación Llave en Mano, Desguaces y Traslados.

**Por Producto** (10, nuevo): Caldera de Agua, Caldera de Vapor, Generador Agua Caliente, Climatizador de Piscina, Termotanque, Termotanque Eléctrico, Tanque de Acumulación, Intercambiador de Calor, Generador Multiservicio, Complemento Solar.

Estas listas viven en un nuevo archivo `data/que-hacemos.ts`:
- `porRubro`: se arma a partir de `rubros` (de `data/rubros.ts`), mapeando cada uno a `{ label, href: "/servicios" }` — no se importa el `imageSrc`, el mega-menú es solo texto.
- `porServicio: { label: string; href: string }[]` — 8 entradas, todas con `href: "/servicios"`.
- `porProducto: { label: string; href: string }[]` — 10 entradas, todas con `href: "/sistema-santero"`.

## Header — Desktop

Estructura actual (logo izquierda, nav horizontal, CTA rojo, pill flotante clara con blur) se mantiene. Cambios:

- `lib/nav.ts`: `navLinks` pasa a `Nosotros, Sistema Santero, Qué Hacemos, Servicios, Casos de Éxito, FAQ's` (se inserta "Qué Hacemos" entre "Sistema Santero" y "Servicios"). "Qué Hacemos" no es un link normal — se maneja aparte del resto de `navLinks` dentro de `Header.tsx` porque abre un panel en vez de navegar directo.
- El ítem "Qué Hacemos" es un `<button>` con flecha (▾) que al hacer click despliega un panel debajo del header: mismo estilo pill/blur/sombra que el header (`bg-white/90`, `backdrop-blur-md`, `rounded-2xl`, `shadow-sm`), ancho ajustado al contenido (no full-bleed), con 3 columnas (`Por Rubro`, `Por Servicio`, `Por Producto`), cada una con su título en mayúscula pequeña y la lista de links debajo.
- Se cierra al hacer click en cualquier link del panel, al hacer click afuera, o con la tecla Escape.
- Solo un menú puede estar abierto a la vez (desktop dropdown y mobile drawer son estados independientes, no se abren juntos).

## Header — Mobile

El drawer existente (`open` state) se mantiene. "Qué Hacemos" se agrega como un ítem más de la lista, pero en vez de navegar, expande/colapsa in-place (estado local `queHacemosAbierto` dentro del drawer) mostrando las 3 columnas apiladas verticalmente, cada una con su título y su lista de links debajo — sin acordeones anidados por columna, ya que el drawer entero ya es scrolleable.

## Footer

Se agrega "Qué Hacemos" a la lista de "Secciones" del footer, como link directo a `/servicios` (en el footer no tiene sentido un dropdown; apunta a la página más cercana, igual que el resto de los links de esta etapa).

## Accesibilidad

- El botón "Qué Hacemos" lleva `aria-expanded` y `aria-haspopup="true"`.
- El panel desktop se cierra con Escape y devuelve el foco al botón.
- Los links del mega-menú son `<Link>` de Next.js normales, con texto visible (sin iconos que requieran `alt`).

## Componentes y archivos afectados

**Nuevo:**
- `data/que-hacemos.ts`

**Modificados:**
- `components/Header.tsx` (agrega estado y UI del mega-menú desktop + expansión mobile)
- `components/Footer.tsx` (agrega el link "Qué Hacemos")
- `lib/nav.ts` (actualiza `navLinks`)

## Testing / verificación

Igual que el sub-proyecto 1: `npm run build` + `npm run lint` deben pasar sin errores; verificación de contenido con `grep` sobre el HTML estático generado (ej. confirmar que las 29 entradas del mega-menú están presentes en `index.html`, ya que el Header es compartido por todas las páginas); chequeo visual manual (desktop y mobile) del menú abriendo/cerrando. No se agregan tests automatizados.

## Fuera de alcance

- Páginas de detalle individuales por rubro/servicio/producto (sub-proyecto futuro).
- Página "Referencias" mencionada en el documento del cliente pero no definida — no se crea en esta etapa.
- Rediseño de contenido de las páginas existentes (Servicios, Casos de Éxito, Contacto) — eso son los sub-proyectos 3, 4 y 5.
