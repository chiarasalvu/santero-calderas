import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SilaVideoButton from "@/components/servicios/SilaVideoButton";
import { silaWhatsAppHref } from "@/data/sila";

// Portada de la página de Servicios, que ahora es la presentación de SILA
// Termomecánica: video de fondo (momentos del video corporativo, sin sonido
// y en bucle), logo, frase y los dos botones.
export default function SilaHero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-sila px-6 pt-32 pb-20 sm:pt-40">
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src="/video/sila-hero.mp4"
        poster="/video/sila-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      {/* Fondo estático para quien prefiere menos movimiento. */}
      <Image
        src="/video/sila-hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover motion-reduce:block"
      />
      {/* Velo azul: más cerrado del lado del texto, abierto a la derecha,
          y se funde con el fondo de la sección de abajo. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-sila/95 via-sila/75 to-sila/25"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sila to-transparent"
        aria-hidden
      />

      <Reveal className="relative mx-auto w-full max-w-6xl">
        <Image
          src="/img/sila/logo-sila.png"
          alt="SILA Termomecánica"
          width={422}
          height={483}
          priority
          className="h-32 w-auto sm:h-40"
        />
        <h1 className="mt-8 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-5xl">
          Soluciones técnicas integrales para su proyecto
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white [text-shadow:0_1px_12px_rgba(11,21,48,0.9)]">
          Desde que entra el primer caño hasta que se termina el trabajo, está
          presente SILA Termomecánica.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href={silaWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
          >
            Contactar por WhatsApp
            <span aria-hidden>→</span>
          </a>
          <div className="sm:w-72">
            <SilaVideoButton />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
