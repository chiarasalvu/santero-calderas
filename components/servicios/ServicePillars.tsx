import { serviciosPilares } from "@/data/servicios-pilares";

export default function ServicePillars() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {serviciosPilares.map((pilar) => (
          <div key={pilar.id} className="rounded-3xl bg-ink-light p-8 sm:p-12">
            <span
              className="font-heading text-sm font-bold text-brand-red-light"
              aria-hidden
            >
              {pilar.numero}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
              {pilar.titulo}
            </h2>
            <p className="mt-3 max-w-2xl text-white/70">{pilar.bajada}</p>

            {pilar.items.length > 1 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {pilar.items.map((item) => (
                  <div
                    key={item.titulo}
                    className="border-t border-white/10 pt-4"
                  >
                    <h3 className="font-heading text-sm font-bold tracking-tight text-white uppercase">
                      <span aria-hidden>✓ </span>
                      {item.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {item.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-8 max-w-2xl border-t border-white/10 pt-4 text-sm leading-relaxed text-white/60">
                {pilar.items[0].descripcion}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
