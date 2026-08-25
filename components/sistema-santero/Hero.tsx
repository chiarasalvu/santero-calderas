import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-navy px-6 py-24 sm:py-28">
      <div className="mx-auto mt-12 grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-5xl">
            Sistema Santero:
            <span className="block">Eficiencia Térmica Reinventada</span>
          </h1>

          <p className="mt-6 max-w-md text-white/80">
            No es una caldera. Es un sistema pensado para transformar la
            manera de generar agua caliente sanitaria.
          </p>

          <a
            href="#consultar"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
          >
            Consultar con un Ingeniero
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl bg-white p-4 shadow-xl">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src="/img/generales/caldera-4.png"
                alt="Sistema Santero instalado"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-xl bg-cream px-6 py-4 shadow-lg sm:-bottom-6 sm:-left-6">
            <p className="font-heading text-3xl font-bold text-brand-red">
              98%
            </p>
            <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
              Eficiencia estacionaria
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
