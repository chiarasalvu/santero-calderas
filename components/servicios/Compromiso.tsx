import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function Compromiso() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Image
        src="/img/generales/trabajo-3.png"
        alt=""
        fill
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60"
        aria-hidden
      />

      <Reveal className="relative mx-auto max-w-3xl">
        <p className="font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
          Compromiso Santero
        </p>
        <h2 className="mt-4 max-w-xl text-lg text-white/90">
          La excelencia térmica no es un objetivo, es nuestro estándar
          operativo. Conozca nuestra planta de desarrollo.
        </h2>

        <Link
          href="/contacto?motivo=visita-tecnica"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
        >
          Solicitar Visita Técnica
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
