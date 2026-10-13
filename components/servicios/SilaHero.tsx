import Image from "next/image";

// Portada de la página de Servicios (SILA Termomecánica): solo el video, sin
// texto. Arranca con el logo armándose y sigue con tomas de obra, y vuelve
// a empezar (mismo planteo que el hero del Home). Para quien prefiere
// menos movimiento queda el logo ya armado, fijo.
export default function SilaHero() {
  return (
    <section
      aria-label="SILA Termomecánica"
      className="relative mt-[65px] min-h-[calc(100dvh-65px)] overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
        src="/video/sila-hero.mp4"
        poster="/video/sila-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <Image
        src="/video/sila-hero-poster.jpg"
        alt="SILA Termomecánica"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center motion-reduce:block"
      />
    </section>
  );
}
