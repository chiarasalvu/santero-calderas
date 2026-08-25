import ContactForm from "@/components/ContactForm";

const datosContacto = [
  { label: "Tel", valor: "(011) 4931-0294 / 0183" },
  { label: "WhatsApp", valor: "+54 9 11 2866-8485" },
  { label: "Fábrica", valor: "Dr. Pedro Baliña 4046, C1437HSD, CABA" },
  { label: "Administración", valor: "Constitución 3227/29, C1254ABC, CABA" },
];

export default function ContactSection() {
  return (
    <section className="px-6 pt-8 pb-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 p-8">
          <h2 className="font-heading text-xl font-bold text-navy">
            Envianos tu consulta
          </h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-cream-card p-8">
            <h3 className="font-heading text-xl font-bold text-navy">
              Datos de contacto
            </h3>
            <dl className="mt-4 flex flex-col gap-3">
              {datosContacto.map((dato) => (
                <div key={dato.label}>
                  <dt className="text-xs font-semibold tracking-wide text-brand-red uppercase">
                    {dato.label}
                  </dt>
                  <dd className="text-sm text-zinc-600">{dato.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="h-56 overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0674251889054!2d-58.406006999999995!3d-34.6530001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb023a387d97%3A0x1bee099adfe56ea0!2sCalderas%20Santero!5e0!3m2!1ses!2sar!4v1782930687719!5m2!1ses!2sar"
              className="h-full w-full border-0"
              title="Ubicación de Calderas Santero en el mapa"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
