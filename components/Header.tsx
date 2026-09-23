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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
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
        className={`font-heading text-lg font-light transition-colors ${
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
      {/* Header único: Menu a la izquierda, logo centrado, Contacto
          a la derecha — mismo layout en mobile y desktop. */}
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-steel/20 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-6">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="flex items-center justify-self-start gap-2 rounded border border-steel/40 px-2.5 py-2 text-xs font-light text-white transition-colors hover:border-white sm:px-3"
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

          <Link href="/" onClick={closeMenu} className="justify-self-center">
            <Image
              src="/img/generales/logo-blanco-v2.png"
              alt="Calderas Santero"
              width={1090}
              height={234}
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>

          <Link
            href="/contacto"
            onClick={closeMenu}
            className="justify-self-end rounded border border-steel/40 px-3 py-2 text-xs font-light text-white/80 transition-colors hover:border-white hover:text-white sm:px-4"
          >
            Contacto
          </Link>
        </div>
      </header>

      {/* Panel lateral izquierdo — hermano del <header>, nunca su
          descendiente. El resto de la pantalla queda transparente (se ve
          lo que haya atrás, p. ej. el video del Hero) y cierra el menú al
          tocarlo. */}
      <AnimatePresence>
        {menuOpen && (
          <div
            className="fixed inset-0 top-16 z-[60]"
            onClick={closeMenu}
          >
            <motion.nav
              onClick={(event) => event.stopPropagation()}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full w-full max-w-[360px] flex-col gap-6 overflow-y-auto border-r border-steel/20 bg-ink/97 px-8 py-10 backdrop-blur-xl sm:max-w-[380px]"
            >
              {renderPanelLink(homeLink)}
              {navLinks.slice(0, 2).map(renderPanelLink)}

              <div className="relative">
                <button
                  type="button"
                  aria-expanded={queHacemosOpen}
                  onClick={() => setQueHacemosOpen((prev) => !prev)}
                  className={`flex items-center gap-2 font-heading text-lg font-light transition-colors ${
                    queHacemosOpen
                      ? "text-brand-red-light"
                      : "text-white hover:text-brand-red-light"
                  }`}
                >
                  Qué hacemos
                  <span
                    className={`text-sm transition-transform ${
                      queHacemosOpen ? "rotate-90" : ""
                    }`}
                    aria-hidden
                  >
                    ▸
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {queHacemosOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden sm:absolute sm:left-full sm:top-0 sm:ml-4 sm:h-auto sm:w-[520px] sm:overflow-visible sm:opacity-100"
                    >
                      <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-steel/20 bg-ink-light p-6 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:divide-x sm:divide-steel/20 sm:p-8">
                        <div className="sm:pr-6">
                          <QueHacemosColumn titulo="Por rubro" items={porRubro} />
                        </div>
                        <div className="sm:px-6">
                          <QueHacemosColumn
                            titulo="Por servicio"
                            items={porServicio}
                          />
                        </div>
                        <div className="sm:pl-6">
                          <QueHacemosColumn
                            titulo="Por producto"
                            items={porProducto}
                          />
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
                className="mt-2 w-fit rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-red"
              >
                Solicitar asesoramiento
              </MotionLink>
            </motion.nav>
          </div>
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
