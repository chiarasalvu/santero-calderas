import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function FeaturedCase() {
  return (
    <section className="bg-ink px-6 pb-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="grid gap-4 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border border-steel/20 lg:col-span-2">
            <div className="relative aspect-[4/3] w-full sm:aspect-video">
              <Image
                src="/img/generales/trabajo-5.png"
                alt="Instalación real de Calderas Santero"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-brand-red-light/30 bg-ink/80 px-3 py-1 font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase">
                    Caso de Ejemplo
                  </span>
                  <span className="rounded border border-steel/30 bg-ink/80 px-3 py-1 font-mono text-xs font-medium tracking-widest text-white/70 uppercase">
                    Sector Hotelero
                  </span>
                </div>
                <h2 className="mt-4 font-heading text-xl font-bold text-white sm:text-2xl">
                  Cliente Ejemplo — Renovación de Sistema Térmico
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/70">
                  Transición de un sistema tradicional a la Línea ATSOL,
                  buscando mayor eficiencia y menor mantenimiento. Caso de
                  ejemplo — a reemplazar con un proyecto real.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-2xl border border-steel/20 bg-ink-light p-8">
              <p className="font-mono text-xs font-medium tracking-widest text-white/55 uppercase">
                Ahorro Energético
              </p>
              <p className="mt-3 font-heading text-4xl font-bold text-brand-red-light">
                X%
              </p>
              <p className="mt-2 text-sm text-white/60">
                Dato de ejemplo — a completar con caso real.
              </p>
            </div>
            <div className="flex-1 rounded-2xl border border-steel/20 bg-ink-light p-8">
              <p className="font-mono text-xs font-medium tracking-widest text-white/55 uppercase">
                Reducción de Sarro
              </p>
              <p className="mt-3 font-heading text-4xl font-bold text-brand-red-light">
                X%
              </p>
              <p className="mt-2 text-sm text-white/60">
                Dato de ejemplo — a completar con caso real.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
