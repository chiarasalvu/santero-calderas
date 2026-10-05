import Reveal from "@/components/motion/Reveal";

export default function BeforeAfter() {
  return (
    <section className="bg-ink px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs font-light text-brand-red-light">
            Casos reales
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Antes y después del Sistema Santero
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <video
            src="/video/antes-y-despues.mp4"
            poster="/video/antes-y-despues-poster.jpg"
            controls
            playsInline
            preload="none"
            className="aspect-video w-full rounded-2xl border border-steel/20 bg-ink-light"
          />
        </Reveal>
      </div>
    </section>
  );
}
