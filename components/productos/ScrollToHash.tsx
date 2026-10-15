"use client";

import { useEffect } from "react";

// Lleva al producto elegido (/productos#adn, #vts, …) y lo mantiene a la
// vista. Next puede dejar la URL como "#adn#vts" cuando se elige otro
// producto estando en la misma página, y las tipografías/imágenes que
// terminan de cargar después del primer scroll corren el contenido: en esos
// casos la persona quedaba en "Productos" en general en vez de en su línea.
export default function ScrollToHash() {
  useEffect(() => {
    let cancelado = false;

    const idDesdeHash = (hash: string) => {
      const ultimo = hash.split("#").filter(Boolean).pop() ?? "";
      try {
        return decodeURIComponent(ultimo);
      } catch {
        return ultimo;
      }
    };

    function irA(id: string) {
      const el = id ? document.getElementById(id) : null;
      el?.scrollIntoView({ behavior: "auto", block: "start" });
      return Boolean(el);
    }

    // Si la persona empieza a scrollear, no se le pelea el scroll.
    const eventos = ["wheel", "touchstart", "keydown"] as const;
    const frenar = () => {
      cancelado = true;
    };

    // Se acomoda y se re-acomoda: cuando se cierra el menú (que bloquea el
    // scroll de la página), cuando terminan de cargar las tipografías y
    // pasado un instante, por si el contenido de arriba cambia de alto.
    function mantener(id: string, demoras: number[]) {
      cancelado = false;
      eventos.forEach((e) =>
        window.addEventListener(e, frenar, { passive: true, once: true }),
      );
      const reacomodar = () => {
        if (!cancelado) irA(id);
      };
      demoras.forEach((ms) => timers.push(setTimeout(reacomodar, ms)));
      void document.fonts?.ready.then(reacomodar);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const id = idDesdeHash(window.location.hash);
    if (id) {
      irA(id);
      mantener(id, [350, 1100]);
    }

    // Links a otra línea estando ya en /productos: se resuelve acá, con una
    // URL limpia (#id), en vez de depender del scroll por hash de Next.
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("/productos#")) return;
      if (window.location.pathname !== "/productos") return;

      const destino = idDesdeHash(href);
      if (!document.getElementById(destino)) return;
      event.preventDefault();
      window.history.pushState(null, "", `/productos#${destino}`);
      // Con el menú abierto la página no scrollea: se espera a que cierre.
      mantener(destino, [0, 150, 500, 1200]);
    }
    // En captura: corre antes que el <Link> de Next y le saca el control.
    document.addEventListener("click", onClick, true);

    return () => {
      timers.forEach(clearTimeout);
      eventos.forEach((e) => window.removeEventListener(e, frenar));
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
