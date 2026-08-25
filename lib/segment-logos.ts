import fs from "node:fs";
import path from "node:path";
import { segmentos, type Segmento, type SegmentoLogo } from "@/lib/segments";

const extensionesValidas = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

function leerLogosDeCarpeta(carpeta: string): SegmentoLogo[] {
  const dir = path.join(process.cwd(), "public", "img", carpeta);

  let archivos: string[];
  try {
    archivos = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return archivos
    .filter((archivo) => extensionesValidas.has(path.extname(archivo).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "es"))
    .map((archivo) => ({
      nombre: path.parse(archivo).name,
      src: `/img/${encodeURIComponent(carpeta)}/${encodeURIComponent(archivo)}`,
    }));
}

export function getLogosPorSegmento(): Record<Segmento, SegmentoLogo[]> {
  return segmentos.reduce(
    (acc, segmento) => {
      acc[segmento.id] = leerLogosDeCarpeta(segmento.carpeta);
      return acc;
    },
    {} as Record<Segmento, SegmentoLogo[]>,
  );
}
