export type Segmento = "clubes" | "hoteles" | "desarrolladoras" | "industrias";

export type SegmentoLogo = {
  nombre: string;
  src: string;
};

export const segmentos: { id: Segmento; label: string; carpeta: string }[] = [
  { id: "clubes", label: "Clubes", carpeta: "Clubes - Gym - Natatorios" },
  { id: "hoteles", label: "Hoteles", carpeta: "Hoteles" },
  { id: "desarrolladoras", label: "Desarrolladoras", carpeta: "Desarrolladoras" },
  { id: "industrias", label: "Industrias", carpeta: "Industrias" },
];
