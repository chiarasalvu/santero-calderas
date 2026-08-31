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
    label: "Agua caliente",
    image: "/img/rubros-home/agua-caliente.jpg",
  },
  {
    id: "climatizacion",
    label: "Climatización de piscina",
    image: "/img/rubros-home/climatizacion-v4.jpg",
  },
  {
    id: "calefaccion",
    label: "Calefacción",
    image: "/img/rubros-home/calefaccion.jpg",
  },
  {
    id: "vapor",
    label: "Vapor",
    image: "/img/rubros-home/vapor-v5.jpg",
  },
];

export default function ServiciosPrincipales() {
  return (
    <section className="bg-ink px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Qué hacemos
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {servicios.map((servicio, index) => (
            <Reveal key={servicio.id} delay={Math.min(index * 0.08, 0.3)}>
              <Link
                href="/servicios"
                className="group relative block aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={servicio.image}
                  alt={servicio.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-5 left-5 font-heading text-base font-light text-white sm:text-lg">
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
