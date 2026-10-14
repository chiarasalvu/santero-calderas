// Triángulo de "play" dibujado como SVG. El carácter "▶" se mostraba como un
// emoji gris en iOS/Android, así que los botones de video usan este ícono.
export default function PlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8.5 5.2v13.6a.9.9 0 0 0 1.4.75l10.2-6.8a.9.9 0 0 0 0-1.5L9.9 4.45a.9.9 0 0 0-1.4.75Z" />
    </svg>
  );
}
