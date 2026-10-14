import Reveal from "@/components/motion/Reveal";
import SilaVideoButton from "@/components/servicios/SilaVideoButton";
import { silaServicios } from "@/data/sila";

// El texto de la portada, ahora debajo del video: frase y servicios en una
// línea separados por "|", y a la derecha la portada del video con ▶ (el
// mismo recurso que en las páginas por rubro) que abre el video completo.
export default function SilaIntro() {
  return (
    <section className="bg-sila px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            <span className="block">Soluciones técnicas</span>
            <span className="block">integrales para su proyecto</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Desde que entra el primer caño hasta que se termina el trabajo, está
            presente SILA Termomecánica.
          </p>

          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white sm:text-base">
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
        </Reveal>

        <Reveal delay={0.15}>
          <SilaVideoButton variant="poster" />
        </Reveal>
      </div>
    </section>
  );
}
