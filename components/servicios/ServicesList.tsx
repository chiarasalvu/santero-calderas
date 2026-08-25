import { serviciosDetalle } from "@/data/servicios-detalle";

export default function ServicesList() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-12 sm:grid-cols-2">
        {serviciosDetalle.map((servicio, index) => (
          <div key={servicio.id} className="border-b border-brand-red/20 pb-8">
            <p className="font-heading text-sm font-bold text-brand-red">
              {String(index + 1).padStart(2, "0")}/{serviciosDetalle.length
                .toString()
                .padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-heading text-lg font-bold tracking-tight text-navy uppercase">
              {servicio.titulo}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {servicio.descripcion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
