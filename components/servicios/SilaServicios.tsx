import Reveal from "@/components/motion/Reveal";
import { silaServicios } from "@/data/sila";

// Los servicios de SILA como lista con viñetas (tilde roja), igual que
// cuando eran el recuadro de la página de Servicios.
export default function SilaServicios() {
  return (
    <section className="bg-sila px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-blue-light">
            Lo que hacemos
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Servicios de SILA
          </h2>
        </Reveal>

        <ul className="mt-10 flex flex-col gap-4">
          {silaServicios.map((servicio, index) => (
            <li key={servicio}>
              <Reveal
                delay={Math.min(index * 0.08, 0.4)}
                className="flex items-center gap-3 text-lg font-semibold text-white"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/25 text-brand-red-light"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M5 13l3.5 3.5L19 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {servicio}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
