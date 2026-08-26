"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [queHacemosOpen, setQueHacemosOpen] = useState(false);
  const [queHacemosMobileOpen, setQueHacemosMobileOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!queHacemosOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setQueHacemosOpen(false);
        triggerRef.current?.focus();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setQueHacemosOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [queHacemosOpen]);

  const renderNavLink = (link: NavLink) => {
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
  };

  const renderMobileNavLink = (link: NavLink) => (
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
  );

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
          {navLinks.slice(0, 2).map(renderNavLink)}

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={queHacemosOpen}
            onClick={() => {
              setQueHacemosOpen((prev) => !prev);
              setOpen(false);
            }}
            className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors ${
              queHacemosOpen
                ? "text-brand-red"
                : "text-zinc-700 hover:text-brand-red"
            }`}
          >
            Qué Hacemos
            <span
              className={`text-xs transition-transform ${queHacemosOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {navLinks.slice(2).map(renderNavLink)}
        </nav>

        <MotionLink
          href="/contacto"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden shrink-0 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy md:inline-block"
        >
          Solicitar asesoramiento
        </MotionLink>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          className="flex items-center justify-center rounded-md p-2 text-zinc-700 md:hidden"
          onClick={() => {
            setOpen((prev) => !prev);
            setQueHacemosOpen(false);
            setQueHacemosMobileOpen(false);
          }}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {queHacemosOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 hidden max-w-4xl rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:block"
          >
            <div className="grid grid-cols-3 gap-8">
              <QueHacemosColumn
                titulo="Por Rubro"
                items={porRubro}
                onNavigate={() => setQueHacemosOpen(false)}
              />
              <QueHacemosColumn
                titulo="Por Servicio"
                items={porServicio}
                onNavigate={() => setQueHacemosOpen(false)}
              />
              <QueHacemosColumn
                titulo="Por Producto"
                items={porProducto}
                onNavigate={() => setQueHacemosOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl bg-white/90 px-6 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:hidden"
          >
            {navLinks.slice(0, 2).map(renderMobileNavLink)}

            <div>
              <button
                type="button"
                aria-expanded={queHacemosMobileOpen}
                onClick={() => setQueHacemosMobileOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-zinc-600 uppercase hover:bg-zinc-50 hover:text-brand-red"
              >
                Qué Hacemos
                <span
                  className={`text-xs transition-transform ${queHacemosMobileOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>

              {queHacemosMobileOpen && (
                <div className="flex flex-col gap-4 px-2 py-3">
                  <QueHacemosColumn
                    titulo="Por Rubro"
                    items={porRubro}
                    onNavigate={() => setOpen(false)}
                  />
                  <QueHacemosColumn
                    titulo="Por Servicio"
                    items={porServicio}
                    onNavigate={() => setOpen(false)}
                  />
                  <QueHacemosColumn
                    titulo="Por Producto"
                    items={porProducto}
                    onNavigate={() => setOpen(false)}
                  />
                </div>
              )}
            </div>

            {navLinks.slice(2).map(renderMobileNavLink)}

            <MotionLink
              href="/contacto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 rounded-full bg-brand-red px-4 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Solicitar asesoramiento
            </MotionLink>
          </motion.nav>
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
    <div>
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {titulo}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="text-sm text-zinc-700 transition-colors hover:text-brand-red"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
