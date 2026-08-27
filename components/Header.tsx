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
const homeLink: NavLink = { href: "/", label: "Home" };

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [queHacemosOpen, setQueHacemosOpen] = useState(false);
  const [queHacemosMobileOpen, setQueHacemosMobileOpen] = useState(false);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
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

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        closeMobileMenu();
      }
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setQueHacemosOpen(false);
    closeMobileMenu();
  }

  function closeMobileMenu() {
    setMenuOpen(false);
    setQueHacemosMobileOpen(false);
  }

  const renderDesktopLink = (link: NavLink) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`border-b pb-1 text-xs font-medium tracking-widest uppercase transition-colors ${
          active
            ? "border-white text-white"
            : "border-transparent text-white/70 hover:text-white"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  const renderPanelLink = (link: NavLink) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={closeMobileMenu}
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
    <>
      {/* Desktop: logo centrado + nav horizontal + mega-menú "Qué Hacemos" */}
      <header className="fixed inset-x-0 top-0 z-[70] hidden border-b border-steel/20 bg-ink/80 backdrop-blur-xl lg:block">
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-end border-b border-steel/20 px-6">
          <Link
            href="/"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/img/generales/logo-blanco.png"
              alt="Calderas Santero"
              width={746}
              height={248}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <Link
            href="/contacto"
            className="rounded border border-steel/40 px-4 py-2 text-xs font-medium tracking-widest text-white/80 uppercase transition-colors hover:border-white hover:text-white"
          >
            Contacto
          </Link>
        </div>

        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-center gap-8 px-6">
          {renderDesktopLink(homeLink)}
          {navLinks.slice(0, 2).map(renderDesktopLink)}

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={queHacemosOpen}
            onClick={() => setQueHacemosOpen((prev) => !prev)}
            className={`flex items-center gap-1 border-b border-transparent pb-1 text-xs font-medium tracking-widest uppercase transition-colors ${
              queHacemosOpen
                ? "text-brand-red-light"
                : "text-white/70 hover:text-white"
            }`}
          >
            Qué Hacemos
            <span
              className={`text-[10px] transition-transform ${queHacemosOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {navLinks.slice(2).map(renderDesktopLink)}
        </nav>

        <AnimatePresence>
          {queHacemosOpen && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full border-t border-steel/20 bg-ink/95 backdrop-blur-xl"
            >
              <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-steel/20 px-6 py-10">
                <div className="pr-8">
                  <QueHacemosColumn
                    titulo="Por Rubro"
                    items={porRubro}
                    onNavigate={() => setQueHacemosOpen(false)}
                  />
                </div>
                <div className="px-8">
                  <QueHacemosColumn
                    titulo="Por Servicio"
                    items={porServicio}
                    onNavigate={() => setQueHacemosOpen(false)}
                  />
                </div>
                <div className="pl-8">
                  <QueHacemosColumn
                    titulo="Por Producto"
                    items={porProducto}
                    onNavigate={() => setQueHacemosOpen(false)}
                  />
                </div>
              </div>
              <div className="mx-auto max-w-6xl border-t border-steel/20 px-6 py-4">
                <Link
                  href="/que-hacemos"
                  onClick={() => setQueHacemosOpen(false)}
                  className="group/link flex w-fit items-center gap-1 font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase transition-colors hover:text-white"
                >
                  Ver todo
                  <span
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile: barra angosta + botón MENU */}
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-steel/20 bg-ink/90 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-6">
          <div />

          <Link href="/" onClick={closeMobileMenu} className="justify-self-center">
            <Image
              src="/img/generales/logo-blanco.png"
              alt="Calderas Santero"
              width={746}
              height={248}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center justify-self-end gap-2">
            <Link
              href="/contacto"
              onClick={closeMobileMenu}
              className="rounded border border-steel/40 px-2.5 py-2 text-[10px] font-medium tracking-widest text-white/80 uppercase transition-colors hover:border-white hover:text-white"
            >
              Contacto
            </Link>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => (menuOpen ? closeMobileMenu() : setMenuOpen(true))}
              className="flex items-center gap-2 rounded border border-steel/40 px-2.5 py-2 text-[10px] font-medium tracking-widest text-white uppercase transition-colors hover:border-white"
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
        </div>
      </header>

      {/* Panel mobile a pantalla completa — hermano de ambos <header>, nunca su descendiente */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-[60] overflow-y-auto bg-ink lg:hidden"
          >
            <nav className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16">
              {renderPanelLink(homeLink)}
              {navLinks.slice(0, 2).map(renderPanelLink)}

              <div className="flex w-full flex-col items-center">
                <button
                  type="button"
                  aria-expanded={queHacemosMobileOpen}
                  onClick={() => setQueHacemosMobileOpen((prev) => !prev)}
                  className={`flex items-center gap-2 font-heading text-2xl font-bold tracking-wide uppercase transition-colors sm:text-3xl ${
                    queHacemosMobileOpen
                      ? "text-brand-red-light"
                      : "text-white hover:text-brand-red-light"
                  }`}
                >
                  Qué Hacemos
                  <span
                    className={`text-base transition-transform ${
                      queHacemosMobileOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {queHacemosMobileOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="w-full overflow-hidden"
                    >
                      <div className="mt-6 flex flex-col gap-6">
                        <QueHacemosColumn
                          titulo="Por Rubro"
                          items={porRubro}
                          onNavigate={closeMobileMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Servicio"
                          items={porServicio}
                          onNavigate={closeMobileMenu}
                        />
                        <QueHacemosColumn
                          titulo="Por Producto"
                          items={porProducto}
                          onNavigate={closeMobileMenu}
                        />
                        <Link
                          href="/que-hacemos"
                          onClick={closeMobileMenu}
                          className="group/link flex w-fit items-center gap-1 font-mono text-xs font-medium tracking-widest text-brand-red-light uppercase transition-colors hover:text-white"
                        >
                          Ver todo
                          <span
                            className="transition-transform duration-200 group-hover/link:translate-x-1"
                            aria-hidden
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map(renderPanelLink)}

              <MotionLink
                href="/contacto"
                onClick={closeMobileMenu}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 rounded bg-brand-red px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
              >
                Solicitar asesoramiento
              </MotionLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
      <p className="font-mono text-[11px] font-medium tracking-widest text-white/40 uppercase">
        {titulo}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href="/que-hacemos"
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
