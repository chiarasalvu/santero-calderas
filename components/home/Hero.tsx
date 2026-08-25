import Image from "next/image";
import Link from "next/link";

const soluciones = [
  { label: "Agua Caliente Sanitaria", href: "/servicios" },
  { label: "Climatización", href: "/servicios" },
  { label: "Vapor", href: "/servicios" },
];

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
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="font-heading text-sm font-semibold tracking-[0.2em] text-brand-red-light uppercase">
          Industria Argentina desde 1935
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold text-white sm:text-6xl">
          Calidez que perdura.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          Somos una fábrica de soluciones en Agua Caliente Sanitaria,
          Climatización y Vapor para hogares, empresas e industria.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {soluciones.map((solucion) => (
            <Link
              key={solucion.label}
              href={solucion.href}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-red hover:bg-brand-red"
            >
              {solucion.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
