import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SilaVideoButton from "@/components/servicios/SilaVideoButton";
import { silaServicios, silaWhatsAppHref } from "@/data/sila";

// Presencia de SILA Termomecánica en la hoja de Servicios: fondo azul
// propio (para diferenciarla de Santero), logo, video corporativo y los
// servicios que brinda. El contacto va al WhatsApp de SILA.
export default function SilaSeccion() {
  return (
    <section
      id="sila"
      className="scroll-mt-28 bg-ink px-6 pb-20 sm:pb-28"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#3b5bb5]/40 bg-[#0b1530]">
        <Image
          src="/img/sila/corte-termotanque.jpg"
          alt=""
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover opacity-20"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0b1530] via-[#0b1530]/90 to-[#0b1530]/70"
          aria-hidden
        />

        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Image
              src="/img/sila/logo-sila.png"
              alt="SILA Termomecánica"
              width={422}
              height={483}
              className="h-24 w-auto sm:h-28"
            />
            <h2 className="mt-8 font-heading text-2xl font-semibold text-white sm:text-3xl">
              Soluciones técnicas integrales para su proyecto
            </h2>
            <p className="mt-4 text-white/80">
              SILA Termomecánica lleva adelante la instalación, la puesta en
              marcha y el soporte y postventa de los equipos Santero.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {silaServicios.map((servicio) => (
                <li
                  key={servicio}
                  className="flex items-center gap-3 text-sm font-semibold text-white"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/25 text-brand-red-light"
                    aria-hidden
                  >
                    <CheckIcon />
                  </span>
                  {servicio}
                </li>
              ))}
            </ul>

            <a
              href={silaWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
            >
              Contactar a SILA por WhatsApp
              <span aria-hidden>→</span>
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <SilaVideoButton variant="poster" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden>
      <path
        d="M5 13l3.5 3.5L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
