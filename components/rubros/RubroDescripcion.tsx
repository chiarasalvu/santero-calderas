import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { BloqueTexto } from "@/data/que-hacemos";

// Descripción del rubro, debajo del hero con el video.
export default function RubroDescripcion({
  contenido,
}: {
  contenido: BloqueTexto[];
}) {
  return (
    <section className="bg-ink px-6 pb-24">
      <Reveal className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-5">
          {contenido.map((bloque, index) =>
            Array.isArray(bloque) ? (
              <ul key={index} className="flex flex-col gap-2">
                {bloque.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-light"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p key={index} className="text-white/70">
                {bloque}
              </p>
            ),
          )}
        </div>

        <div className="mt-10">
          <Link
            href="/contacto"
            className="inline-block rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
          >
            Solicitar asesoramiento
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
