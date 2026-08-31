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
const homeLink: NavLink = { href: "/", label: "Home" };

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [queHacemosOpen, setQueHacemosOpen] = useState(false);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    closeMenu();
  }

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
        className={`font-heading text-lg font-light transition-colors sm:text-xl ${
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
      {/* Header único: Contacto a la izquierda, logo centrado, hamburguesa
          a la derecha — mismo layout en mobile y desktop. */}
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-steel/20 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-6">
          <Link
            href="/contacto"
            onClick={closeMenu}
            className="justify-self-start rounded border border-steel/40 px-3 py-2 text-xs font-light text-white/80 transition-colors hover:border-white hover:text-white sm:px-4"
          >
            Contacto
          </Link>

          <Link href="/" onClick={closeMenu} className="justify-self-center">
            <Image
              src="/img/generales/logo-blanco.png"
              alt="Calderas Santero"
              width={746}
              height={248}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="flex items-center justify-self-end gap-2 rounded border border-steel/40 px-2.5 py-2 text-xs font-light text-white transition-colors hover:border-white sm:px-3"
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
      </header>

      {/* Panel a pantalla completa — hermano del <header>, nunca su
          descendiente. Mismo panel en todos los breakpoints. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-[60] overflow-y-auto bg-ink"
          >
            <nav className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center gap-4 px-6 py-16 lg:max-w-5xl lg:gap-5">
              {renderPanelLink(homeLink)}
              {navLinks.slice(0, 2).map(renderPanelLink)}

              <div className="flex w-full flex-col items-center">
                <button
                  type="button"
                  aria-expanded={queHacemosOpen}
                  onClick={() => setQueHacemosOpen((prev) => !prev)}
                  className={`flex items-center gap-2 font-heading text-lg font-light transition-colors sm:text-xl ${
                    queHacemosOpen
                      ? "text-brand-red-light"
                      : "text-white hover:text-brand-red-light"
                  }`}
                >
                  Qué hacemos
                  <span
                    className={`text-sm transition-transform ${
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
                      <div className="mt-6 rounded-2xl border border-steel/20 bg-ink-light p-6 lg:p-8">
                        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0 lg:divide-x lg:divide-steel/20">
                          <div className="lg:pr-8">
                            <QueHacemosColumn titulo="Por rubro" items={porRubro} />
                          </div>
                          <div className="lg:px-8">
                            <QueHacemosColumn
                              titulo="Por servicio"
                              items={porServicio}
                            />
                          </div>
                          <div className="lg:pl-8">
                            <QueHacemosColumn
                              titulo="Por producto"
                              items={porProducto}
                            />
                          </div>
                        </div>
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
                className="mt-6 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
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
}: {
  titulo: string;
  items: QueHacemosLink[];
}) {
  return (
    <div>
      <p className="text-xs font-light text-white/40">{titulo}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label} className="text-sm text-white/70">
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
