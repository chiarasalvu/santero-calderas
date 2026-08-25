import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-navy px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/caldera-5.png"
        alt="Sala de calderas Calderas Santero"
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <h1 className="max-w-2xl font-heading text-4xl font-bold text-white sm:text-5xl">
          Agua caliente confiable, para cada escala de negocio.
        </h1>

        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
        >
          Solicitar Asesoramiento
        </Link>
      </div>
    </section>
  );
}
