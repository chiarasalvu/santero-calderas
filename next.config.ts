import type { NextConfig } from "next";

// Vercel (el deploy de siempre) no usa esta variable. Con EXPORT_STATIC=1
// (npm run zip:cpanel) el sitio se exporta como HTML estático para subirlo
// a un hosting cPanel/Apache. Ver scripts/cpanel.mjs.
const exportEstatico = process.env.EXPORT_STATIC === "1";

const nextConfig: NextConfig = {
  ...(exportEstatico
    ? {
        output: "export" as const,
        // /productos/ -> productos/index.html (funciona en Apache sin reglas).
        trailingSlash: true,
        // Sin servidor no hay optimizador de imágenes de Next.
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
