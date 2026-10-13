import type { CeldaComparativa } from "@/data/comparativa";

// Alto / Medio / Bajo con su color: verde = bueno para el cliente, amarillo
// = intermedio, rojo = malo (en costos Alto es rojo y Bajo verde; en
// versatilidad es al revés).
const colorPorTono: Record<CeldaComparativa["tono"], string> = {
  bueno: "text-green-400",
  medio: "text-yellow-300",
  malo: "text-red-400",
};

export default function Nivel({
  celda,
  className = "",
}: {
  celda: CeldaComparativa;
  className?: string;
}) {
  return (
    <span className={`font-semibold ${colorPorTono[celda.tono]} ${className}`}>
      {celda.nivel}
    </span>
  );
}
