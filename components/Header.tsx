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
// Debe coincidir con el max-w del panel lateral (ver className del
// <motion.nav> más abajo) — es el punto donde arranca el flyout de
// "Qué hacemos" en sm+.
const SIDEBAR_WIDTH_PX = 380;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [queHacemosOpen, setQueHacemosOpen] = useState(false);
  const [flyoutTop, setFlyoutTop] = useState(0);
  const queHacemosButtonRef = useRef<HTMLButtonElement>(null);
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

  // El flyout de "Qué hacemos" se saca del contenedor con scroll (ver
  // nota más abajo) y se posiciona con fixed — hay que medir en qué Y
  // quedó el botón para alinearlo, cada vez que se abre.
  useEffect(() => {
    if (!queHacemosOpen) return;
    const button = queHacemosButtonRef.current;
    if (!button) return;
    setFlyoutTop(button.getBoundingClientRect().top);
  }, [queHacemosOpen]);

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
          <div className="fixed inset-0 top-16 z-[60]" onClick={closeMenu}>
            <motion.nav
              onClick={(event) => event.stopPropagation()}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full w-full max-w-[360px] flex-col border-r border-steel/20 bg-ink/97 backdrop-blur-xl sm:max-w-[380px]"
            >
              {/* Todo lo que scrollea vive en ESTE contenedor. El flyout
                  de "Qué hacemos" (más abajo) se renderiza AFUERA de
                  acá a propósito: un ancestro con overflow-y-auto
                  recorta cualquier hijo posicionado que se salga de su
                  caja (incluido el eje X), así que si el flyout quedara
                  adentro, quedaría invisible aunque exista en el DOM. */}
              <div className="flex flex-1 flex-col items-center gap-6 overflow-y-auto px-8 py-10 text-center">
                {renderPanelLink(homeLink)}
                {navLinks.slice(0, 2).map(renderPanelLink)}

                <button
                  ref={queHacemosButtonRef}
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

                {/* En mobile no hay lugar para el flyout al costado —
                    se despliega acá mismo, en el flujo normal. */}
                <AnimatePresence initial={false}>
                  {queHacemosOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden md:hidden"
                    >
                      <div className="rounded-2xl border border-steel/20 bg-ink-light p-6 text-left">
                        <QueHacemosGrid />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
              </div>
            </motion.nav>

            {/* Flyout de "Qué hacemos" en sm+: hermano de <motion.nav>,
                no su descendiente — motion.nav tiene su propio
                transform (la animación de entrada/salida) y eso lo
                convierte en "containing block" de cualquier fixed
                adentro, corriendo mal las coordenadas. Estando afuera,
                el fixed queda relativo al viewport real, nunca se
                recorta por el scroll del panel y siempre queda por
                encima del video. */}
            <AnimatePresence initial={false}>
              {queHacemosOpen && (
                <motion.div
                  onClick={(event) => event.stopPropagation()}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    top: flyoutTop,
                    left: SIDEBAR_WIDTH_PX + 16,
                    maxHeight: `calc(100vh - ${flyoutTop + 32}px)`,
                  }}
                  className="fixed z-[65] hidden w-[340px] overflow-y-auto rounded-2xl border border-steel/20 bg-ink-light p-8 shadow-2xl md:block"
                >
                  <QueHacemosGrid />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function QueHacemosGrid() {
  return (
    <div className="flex flex-col divide-y divide-steel/20">
      <div className="pb-6">
        <QueHacemosColumn titulo="Por rubro" items={porRubro} />
      </div>
      <div className="py-6">
        <QueHacemosColumn titulo="Por servicio" items={porServicio} />
      </div>
      <div className="pt-6">
        <QueHacemosColumn titulo="Por producto" items={porProducto} />
      </div>
    </div>
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
