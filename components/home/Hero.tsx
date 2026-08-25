import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/caldera-5.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <video
        src="/video/hero-santero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/img/generales/caldera-5.png"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50"
        aria-hidden
      />

      <h1 className="sr-only">Calidez que perdura.</h1>
    </section>
  );
}
