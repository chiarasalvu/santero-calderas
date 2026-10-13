import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SilaVideoButton from "@/components/servicios/SilaVideoButton";
import { silaServicios } from "@/data/sila";

// Portada de la página de Servicios, que ahora es la presentación de SILA
// Termomecánica: video de fondo (momentos del video corporativo, sin sonido
// y en bucle), logo, frase y los dos botones.
export default function SilaHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-sila px-6 pt-28 pb-12 sm:pt-28">
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
          className="h-24 w-auto sm:h-28"
        />
        <h1 className="mt-6 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-5xl">
          Soluciones técnicas integrales para su proyecto
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white sm:text-lg [text-shadow:0_1px_12px_rgba(16,38,92,0.9)]">
          Desde que entra el primer caño hasta que se termina el trabajo, está
          presente SILA Termomecánica.
        </p>

        {/* Los servicios, en una o dos líneas separados por "|" (van en el
            mismo bloque de texto que la frase). */}
        <ul className="mt-5 flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white sm:text-base [text-shadow:0_1px_12px_rgba(16,38,92,0.9)]">
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
