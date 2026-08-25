"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, legalLinks } from "@/lib/nav";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t-4 border-brand-red bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold text-brand-red">
            Calderas Santero
          </p>
          <p className="mt-3 max-w-xs text-sm text-zinc-500">
            Líderes en ingeniería térmica desde 1935. Tecnología argentina
            para la industria global.
          </p>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold text-navy">
            Secciones
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            {navLinks
              .filter((link) => link.href !== "/#faqs")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${
                    pathname === link.href
                      ? "font-medium text-brand-red"
                      : "text-zinc-500 hover:text-brand-red"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold text-navy">
            Legal &amp; Contacto
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/calderassantero"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Calderas Santero"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="7" r="0.75" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/calderassantero"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Calderas Santero"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <svg viewBox="0 0 320 512" fill="currentColor" className="h-4 w-4">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/calderas-santero/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Calderas Santero"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <svg viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCkrvvYgSqETuBZjmH1jNy5g"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube de Calderas Santero"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <svg viewBox="0 0 576 512" fill="currentColor" className="h-4 w-4">
                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232 335.5V176.5L361 256l-129 79.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} Calderas Santero. Industria
            Argentina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
