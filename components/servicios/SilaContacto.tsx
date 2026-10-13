import Reveal from "@/components/motion/Reveal";
import { silaWhatsAppHref } from "@/data/sila";

export default function SilaContacto() {
  return (
    <section className="bg-sila px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-light text-brand-blue-light">
          Contacto
        </p>
        <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
          Hablemos de su proyecto
        </h2>
        <p className="mt-4 text-white/75">
          Escribinos por WhatsApp al +54 9 11 4048-6833 y te respondemos a la
          brevedad.
        </p>
        <a
          href={silaWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
        >
          Contactar a SILA por WhatsApp
          <span aria-hidden>→</span>
        </a>
      </Reveal>
    </section>
  );
}
