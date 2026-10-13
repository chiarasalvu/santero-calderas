import Reveal from "@/components/motion/Reveal";
import SilaVideoButton from "@/components/servicios/SilaVideoButton";
import { silaServicios } from "@/data/sila";

// El texto de la portada, ahora debajo del video: frase, servicios en una
// línea separados por "|" y el botón para ver el video completo.
export default function SilaIntro() {
  return (
    <section className="bg-sila px-6 py-16 sm:py-20">
      <Reveal className="mx-auto max-w-6xl">
        <h1 className="max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl">
          Soluciones técnicas integrales para su proyecto
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/85">
          Desde que entra el primer caño hasta que se termina el trabajo, está
          presente SILA Termomecánica.
        </p>

        <ul className="mt-6 flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white sm:text-base">
          {silaServicios.map((servicio, index) => (
            <li key={servicio} className="flex items-center gap-3">
              {servicio}
              {index < silaServicios.length - 1 && (
                <span className="font-light text-white/50" aria-hidden>
                  |
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 sm:w-72">
          <SilaVideoButton />
        </div>
      </Reveal>
    </section>
  );
}
