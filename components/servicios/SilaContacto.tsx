import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { silaWhatsAppHref } from "@/data/sila";

// Cierre de la página de Servicios: la misma foto de taller (chispas) que
// tenía el bloque final anterior, con un velo oscuro neutro (sin tinte
// azul) para que se lea el texto.
export default function SilaContacto() {
  return (
    <section className="relative overflow-hidden bg-sila px-6 py-20 sm:py-28">
      <Image
        src="/img/generales/trabajo-3.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/50"
        aria-hidden
      />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-light text-brand-blue-light">
          Contacto
        </p>
        <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
          Hablemos de su proyecto
        </h2>
        <p className="mt-4 text-white/80">
          Escribinos por WhatsApp y te respondemos a la brevedad.
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
