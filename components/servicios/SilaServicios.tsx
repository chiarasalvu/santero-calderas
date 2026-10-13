import Reveal from "@/components/motion/Reveal";
import { silaServicios } from "@/data/sila";

const iconos: Record<string, React.ReactNode> = {
  "Servicio técnico": (
    <path
      d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z"
      strokeLinejoin="round"
    />
  ),
  Instalaciones: (
    <path
      d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.4 4a7.9 7.9 0 0 0-.14-1.5l2-1.56-2-3.46-2.36.96a8.1 8.1 0 0 0-1.3-.75L16.2 3h-4l-.4 2.69a8.1 8.1 0 0 0-1.3.75l-2.36-.96-2 3.46 2 1.56a7.9 7.9 0 0 0 0 3l-2 1.56 2 3.46 2.36-.96c.4.3.84.55 1.3.75L11.8 21h4l.4-2.69c.46-.2.9-.45 1.3-.75l2.36.96 2-3.46-2-1.56c.1-.49.14-.99.14-1.5Z"
      strokeLinejoin="round"
    />
  ),
  Desguaces: (
    <path
      d="M4 20 14 10m0 0 2.5-2.5a3.5 3.5 0 0 1 5 5L19 15m-5-5 5 5M5 9l4-4m-2.5 6.5 4-4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "Obras llave en mano": (
    <path
      d="M15 9a5 5 0 1 1-4.5 2.8L3 19.3V21h2.5v-2H8v-2.2h2.2l1.1-1.1A5 5 0 0 1 15 9Zm1.5 2h.01"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "Logística y repuestos": (
    <path
      d="M3 6h11v10H3V6Zm11 3h4l3 3v4h-7M7 19.5a1.8 1.8 0 1 0 0-.01M17 19.5a1.8 1.8 0 1 0 0-.01"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

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

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {silaServicios.map((servicio, index) => (
            <li key={servicio}>
              <Reveal
                delay={Math.min(index * 0.08, 0.4)}
                className="flex h-full flex-col items-start gap-5 rounded-2xl border border-sila-accent/40 bg-sila-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-light/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red-light">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-6 w-6"
                    aria-hidden
                  >
                    {iconos[servicio]}
                  </svg>
                </span>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {servicio}
                </h3>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
