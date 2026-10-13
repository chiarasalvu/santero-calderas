// Cuadro comparativo del Sistema Santero contra los sistemas tradicionales.
// Contenido del documento del cliente "Últimos detalles WEB" (13/10). Lo usan
// la página /sistema-santero (tabla completa) y el Home (versión resumida).
// Sin cifras: solo Alto / Medio / Bajo (pedido del cliente, 14/10).

export type CeldaComparativa = {
  /** Nivel (Alto / Medio / Bajo...). */
  nivel: string;
  /** Cómo es ese nivel para el cliente: "bueno" (verde), "medio"
   *  (amarillo) o "malo" (rojo). Alto = rojo, Medio = amarillo, Bajo =
   *  verde en costos; en versatilidad es al revés (Alta = verde). */
  tono: "bueno" | "medio" | "malo";
  detalle: string;
};

export type FilaComparativa = {
  id: string;
  variable: string;
  /** Aclaración de la variable (se muestra más chica). */
  nota?: string;
  termotanque: CeldaComparativa;
  caldera: CeldaComparativa;
  santero: CeldaComparativa;
};

export const columnasComparativa = {
  termotanque: "Termotanques tradicionales",
  caldera: "Calderas con intermediarios",
  santero: "Sistema Santero",
} as const;

export const filasComparativa: FilaComparativa[] = [
  {
    id: "consumo",
    variable: "Consumo energético (Opex)",
    termotanque: {
      nivel: "Alto",
      tono: "malo",
      detalle:
        "Este sistema es uno de los más ineficientes del mercado. Muchos con piloto permanente aún.",
    },
    caldera: {
      nivel: "Medio",
      tono: "medio",
      detalle:
        "Las calderas son más eficientes que los TT pero hay traslado de energía y acumulación.",
    },
    santero: {
      nivel: "Bajo",
      tono: "bueno",
      detalle:
        "Generación instantánea y solo enciende a demanda. Encendido electrónico implementado hace una década.",
    },
  },
  {
    id: "tco",
    variable: "Costo total (TCO) a 10 años",
    termotanque: {
      nivel: "Medio",
      tono: "medio",
      detalle:
        "Consta de inversión baja, pero alto consumo por ineficiencia y acumulación, alto mantenimiento.",
    },
    caldera: {
      nivel: "Alto",
      tono: "malo",
      detalle:
        "Inversión alta y altos costos de consumo por traslado y acumulación, sumado al mantenimiento.",
    },
    santero: {
      nivel: "Bajo",
      tono: "bueno",
      detalle:
        "Tomamos éste como base para poder comparar. Inversión media, bajo consumo y mantenimiento casi nulo.",
    },
  },
  {
    id: "espacio",
    variable: "Espacio requerido (sala)",
    nota: "Referencia 80 UF ACS",
    termotanque: {
      nivel: "Medio",
      tono: "medio",
      detalle:
        "Este sistema se basa en acumulación de agua caliente todo el tiempo.",
    },
    caldera: {
      nivel: "Alto",
      tono: "malo",
      detalle:
        "Sumado a la característica de acumulación se agrega la caldera, bombas y cañerías.",
    },
    santero: {
      nivel: "Bajo",
      tono: "bueno",
      detalle:
        "El equipo más compacto del mercado, el concepto All in one sin acumulación demanda el menor espacio.",
    },
  },
  {
    id: "mantenimiento",
    variable: "Costo de mantenimiento y formación de sarro",
    termotanque: {
      nivel: "Alto",
      tono: "malo",
      detalle:
        "Es muy alto el costo operativo, cambio de ánodos y repintados internos. Formación crítica de sarro por ser de fuego directo.",
    },
    caldera: {
      nivel: "Medio",
      tono: "medio",
      detalle:
        "Caldera con acumuladores que requieren ánodos y pintura. Bombas y accesorios, sarro intermedio por fuego indirecto.",
    },
    santero: {
      nivel: "Bajo",
      tono: "bueno",
      detalle:
        "Calentamiento indirecto de intercambio interno sin acumulación. Sin ánodos ni repintados. Mínima formación de sarro controlada en serpentina de inoxidable.",
    },
  },
  {
    id: "versatilidad",
    variable: "Versatilidad de servicios",
    termotanque: {
      nivel: "Baja",
      tono: "malo",
      detalle:
        "Se encuentra limitado únicamente a la provisión de agua caliente sanitaria limitado a distintas presiones.",
    },
    caldera: {
      nivel: "Media",
      tono: "medio",
      detalle:
        "Permite incorporar nuevos servicios, requiere de bombas, cañerías e intercambiadores externos.",
    },
    santero: {
      nivel: "Alta",
      tono: "bueno",
      detalle:
        "El sistema de intercambio interno permite abastecer varios servicios o columnas de presión desde el mismo equipo.",
    },
  },
];
