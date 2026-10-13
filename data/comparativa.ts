// Cuadro comparativo del Sistema Santero contra los sistemas tradicionales.
// Contenido del documento del cliente "Últimos detalles WEB" (13/10). Lo usan
// la página /sistema-santero (tabla completa) y el Home (versión resumida).

export type CeldaComparativa = {
  /** Nivel (Alto / Medio / Bajo...). */
  nivel: string;
  /** Cifra destacada, si la hay (costo a 10 años, m² de sala). */
  valor?: string;
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
      detalle:
        "Este sistema es uno de los más ineficientes del mercado. Muchos con piloto permanente aún.",
    },
    caldera: {
      nivel: "Medio",
      detalle:
        "Las calderas son más eficientes que los TT pero hay traslado de energía y acumulación.",
    },
    santero: {
      nivel: "Bajo",
      detalle:
        "Generación instantánea y solo enciende a demanda. Encendido electrónico implementado hace una década.",
    },
  },
  {
    id: "tco",
    variable: "Costo total (TCO) a 10 años",
    termotanque: {
      nivel: "Medio",
      valor: "$180",
      detalle:
        "Consta de inversión baja, pero alto consumo por ineficiencia y acumulación, alto mantenimiento.",
    },
    caldera: {
      nivel: "Alto",
      valor: "$235",
      detalle:
        "Inversión alta y altos costos de consumo por traslado y acumulación, sumado al mantenimiento.",
    },
    santero: {
      nivel: "Bajo",
      valor: "$100",
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
      valor: "16,7 m² · 293%",
      detalle:
        "Este sistema se basa en acumulación de agua caliente todo el tiempo.",
    },
    caldera: {
      nivel: "Alto",
      valor: "24,5 m² · 430%",
      detalle:
        "Sumado a la característica de acumulación se agrega la caldera, bombas y cañerías.",
    },
    santero: {
      nivel: "Bajo",
      valor: "5,7 m² · base 100%",
      detalle:
        "El equipo más compacto del mercado, el concepto All in one sin acumulación demanda solo 5,7 m².",
    },
  },
  {
    id: "mantenimiento",
    variable: "Costo de mantenimiento y formación de sarro",
    termotanque: {
      nivel: "Alto",
      detalle:
        "Es muy alto el costo operativo, cambio de ánodos y repintados internos. Formación crítica de sarro por ser de fuego directo.",
    },
    caldera: {
      nivel: "Medio",
      detalle:
        "Caldera con acumuladores que requieren ánodos y pintura. Bombas y accesorios, sarro intermedio por fuego indirecto.",
    },
    santero: {
      nivel: "Bajo",
      detalle:
        "Calentamiento indirecto de intercambio interno sin acumulación. Sin ánodos ni repintados. Mínima formación de sarro controlada en serpentina de inoxidable.",
    },
  },
  {
    id: "versatilidad",
    variable: "Versatilidad de servicios",
    termotanque: {
      nivel: "Baja",
      detalle:
        "Se encuentra limitado únicamente a la provisión de agua caliente sanitaria limitado a distintas presiones.",
    },
    caldera: {
      nivel: "Media",
      detalle:
        "Permite incorporar nuevos servicios, requiere de bombas, cañerías e intercambiadores externos.",
    },
    santero: {
      nivel: "Alta",
      detalle:
        "El sistema de intercambio interno permite abastecer varios servicios o columnas de presión desde el mismo equipo.",
    },
  },
];
