"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full bg-white/70 px-6 py-3 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/img/generales/logo.png"
            alt="Calderas Santero"
            width={201}
            height={72}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  active
                    ? "border-b-2 border-brand-red text-brand-red"
                    : "border-b-2 border-transparent text-zinc-700 hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contacto"
          className="hidden shrink-0 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy md:inline-block"
        >
          Solicitar asesoramiento
        </Link>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          className="flex items-center justify-center rounded-md p-2 text-zinc-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl bg-white/90 px-6 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-2 py-2 text-sm font-medium uppercase ${
                pathname === link.href
                  ? "text-brand-red"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-brand-red"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="mt-2 rounded-full bg-brand-red px-4 py-2 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Solicitar asesoramiento
          </Link>
        </nav>
      )}
    </header>
  );
}
