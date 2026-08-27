import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

type Servicio = {
  id: string;
  label: string;
  image: string;
};

const servicios: Servicio[] = [
  {
    id: "agua-caliente",
    label: "Agua Caliente",
    image: "/img/rubros-home/agua-caliente.jpg",
  },
  {
    id: "climatizacion",
    label: "Climatización",
    image: "/img/rubros-home/climatizacion.jpg",
  },
  {
    id: "calefaccion",
    label: "Calefacción",
    image: "/img/rubros-home/calefaccion.jpg",
  },
];

export default function ServiciosPrincipales() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {servicios.map((servicio, index) => (
            <Reveal key={servicio.id} delay={Math.min(index * 0.08, 0.3)}>
              <Link
                href="/servicios"
                className="group relative block aspect-[3/4] overflow-hidden rounded-[28px]"
              >
                <Image
                  src={servicio.image}
                  alt={servicio.label}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-6 left-6 font-heading text-lg font-light text-white uppercase sm:text-xl">
                  {servicio.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
