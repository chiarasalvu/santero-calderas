"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, type NavLink } from "@/lib/nav";
import {
  porRubro,
  porServicio,
  porProducto,
  type QueHacemosLink,
} from "@/data/que-hacemos";

const MotionLink = motion.create(Link);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [queHacemosOpen, setQueHacemosOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setQueHacemosOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    setQueHacemosOpen(false);
  }

  const renderPanelLink = (link: NavLink) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={closeMenu}
        className={`font-heading text-2xl font-bold tracking-wide uppercase transition-colors sm:text-3xl ${
          active
            ? "text-brand-red-light"
            : "text-white hover:text-brand-red-light"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          href="/contacto"
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          Contacto
        </Link>

        <Link
          href="/"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/img/generales/logo.png"
            alt="Calderas Santero"
            width={201}
            height={72}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:border-white"
        >
          {menuOpen ? "Cerrar" : "Menu"}
          <span aria-hidden className="flex flex-col gap-[3px]">
            <span
              className={`h-[1.5px] w-4 bg-white transition-transform ${
                menuOpen ? "translate-y-[4.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-4 bg-white transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-4 bg-white transition-transform ${
                menuOpen ? "-translate-y-[4.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-20 overflow-y-auto bg-ink"
          >
            <nav className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16">
              {navLinks.slice(0, 2).map(renderPanelLink)}

              <div className="flex w-full flex-col items-center">
                <button
                  type="button"
                  aria-expanded={queHacemosOpen}
                  onClick={() => setQueHacemosOpen((prev) => !prev)}
                  className={`flex items-center gap-2 font-heading text-2xl font-bold tracking-wide uppercase transition-colors sm:text-3xl ${
                    queHacemosOpen
                      ? "text-brand-red-light"
                      : "text-white hover:text-brand-red-light"
                  }`}
                >
                  Qué Hacemos
                  <span
                    className={`text-base transition-transform ${
                      queHacemosOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {queHacemosOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="w-full overflow-hidden"
                    >
                      <div className="mt-6 grid gap-8 sm:grid-cols-3">
                        <QueHacemosColumn
                          titulo="Por Rubro"
                          items={porRubro}
                          onNavigate={closeMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Servicio"
                          items={porServicio}
                          onNavigate={closeMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Producto"
                          items={porProducto}
                          onNavigate={closeMenu}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map(renderPanelLink)}

              <MotionLink
                href="/contacto"
                onClick={closeMenu}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 rounded-full bg-brand-red px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
              >
                Solicitar asesoramiento
              </MotionLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function QueHacemosColumn({
  titulo,
  items,
  onNavigate,
}: {
  titulo: string;
  items: QueHacemosLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">
        {titulo}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="text-sm text-white/70 transition-colors hover:text-brand-red-light"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
