# Sitio web "Calderas Santero" — Diseño

## Contexto

Proyecto Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4, recién scaffoldeado con `create-next-app` (sin contenido propio todavía). "Calderas Santero" es una empresa de instalación, mantenimiento y reparación de calderas/calefacción. "Santero" es el apellido/marca de la empresa, sin relación con santería. "Sistema Santero" es el método/proceso propio de trabajo de la empresa (su forma particular de diagnosticar, instalar y dar mantenimiento), no una línea de productos.

## Objetivo del sitio

Mostrar credibilidad y portfolio de la empresa ante dos públicos: hogares/particulares y empresas/industria. No es prioridad la captación inmediata de leads, aunque se incluye un formulario de contacto simple para etapas futuras.

## Alcance

Sitio de 6 páginas con contenido placeholder (textos e imágenes de ejemplo). El contenido real se cargará en una etapa posterior. Sin CMS ni backend en esta etapa.

## Enfoque técnico

- Next.js App Router, una carpeta de ruta por página: `app/page.tsx` (Home), `app/nosotros/page.tsx`, `app/sistema-santero/page.tsx`, `app/servicios/page.tsx`, `app/casos-de-exito/page.tsx`, `app/contacto/page.tsx`.
- Layout compartido en `app/layout.tsx`: header (logo + nav responsive con menú hamburguesa en mobile) y footer (datos de contacto resumidos + links rápidos).
- Contenido de listas (servicios, casos de éxito) extraído a archivos de datos TS en `data/` (ej. `data/servicios.ts`, `data/casos-de-exito.ts`) como arrays de objetos tipados, para que cargar contenido real más adelante sea editar datos, no JSX.
- Componentes reutilizables en `components/`: `Header`, `Footer`, `Hero`, `Section`, `Card` (genérica para servicios/casos), `ContactForm`.
- Sin CMS headless ni base de datos — fuera de alcance en esta etapa.
- Se mantiene la fuente Geist ya configurada en el scaffold.

## Estilo visual

Corporativo limpio y moderno: fondo blanco/gris claro, azul corporativo como color de acento, tipografía sans (Geist), espaciado generoso, cards con sombra sutil. Diseño responsive (mobile-first) válido tanto para clientes particulares como empresariales.

## Páginas

### Home (`/`)
- Hero: propuesta de valor + imagen/ilustración placeholder + CTA a Contacto.
- Resumen de servicios: 3-4 cards con ícono, título y descripción breve, linkeando a `/servicios`.
- Bloque "Sistema Santero": breve explicación del método + CTA a `/sistema-santero`.
- Casos de éxito destacados: 2-3 cards (imagen, título, descripción breve), linkeando a `/casos-de-exito`.
- CTA final a `/contacto`.

### Nosotros (`/nosotros`)
- Historia/misión de la empresa (texto placeholder).
- Valores (lista de 3-4 valores con breve descripción).
- Equipo: grid de tarjetas placeholder (foto genérica, nombre, rol).

### Sistema Santero (`/sistema-santero`)
- Explicación del método propio en pasos secuenciales (ej. Diagnóstico → Propuesta → Instalación → Mantenimiento), cada paso con título y descripción breve.
- Sección "qué lo diferencia" (3-4 puntos).

### Servicios (`/servicios`)
- Grid de servicios (instalación, mantenimiento, reparación, asesoría hogar/empresa), cada uno con ícono, título y descripción.
- Contenido proveniente de `data/servicios.ts`.

### Casos de Éxito (`/casos-de-exito`)
- Galería de proyectos placeholder: imagen, título, breve descripción por caso.
- Filtro simple por categoría (Hogar / Empresa) usando estado local de React (sin backend).
- Contenido proveniente de `data/casos-de-exito.ts`.

### Contacto (`/contacto`)
- Formulario de contacto (nombre, email, teléfono, mensaje) — controlado en el cliente, sin conexión a backend en esta etapa (al enviar, se puede mostrar un estado de confirmación simulado o dejar el submit sin handler real, a definir en el plan de implementación).
- Datos de contacto: teléfono, email, WhatsApp (placeholder), dirección.
- Mapa estático placeholder (imagen o embed simple, sin integración de API de mapas en esta etapa).

## Navegación

Header fijo con logo (texto placeholder "Calderas Santero") y nav a las 6 páginas. En mobile, menú hamburguesa con overlay o drawer. Footer con datos de contacto resumidos y los mismos 6 links.

## Fuera de alcance

- CMS o backend para contenido dinámico.
- Envío real de formulario de contacto (queda para etapa posterior).
- Integración de mapas reales (Google Maps, etc.).
- Contenido y fotos reales — se usan placeholders.
