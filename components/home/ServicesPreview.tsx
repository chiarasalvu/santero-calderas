import { serviciosDetalle } from "@/data/servicios-detalle";

export default function ServicesPreview() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-red">
          Nuestros Servicios
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-600">
          Acompañamos cada proyecto desde la planificación hasta el
          funcionamiento diario del sistema.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviciosDetalle.map((servicio) => (
            <div
              key={servicio.id}
              className="rounded-[2.5rem] border border-brand-red/20 bg-cream-card p-8"
            >
              <h3 className="font-heading text-base font-bold text-navy">
                {servicio.titulo}
              </h3>
              <p className="mt-3 text-sm text-zinc-600">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
