import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function Compromiso() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-20 sm:py-28">
      <Image
        src="/img/generales/trabajo-3.png"
        alt=""
        fill
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/92 to-ink/80"
        aria-hidden
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs font-light text-brand-red-light">
          Compromiso Santero
        </p>
        <h2 className="mt-4 font-heading text-2xl font-semibold text-white sm:text-3xl">
          La excelencia térmica no es un objetivo, es nuestro estándar
          operativo. Conozca nuestra planta de desarrollo.
        </h2>

        <Link
          href="/contacto?motivo=visita-tecnica"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
        >
          Solicitar visita técnica
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
