#!/usr/bin/env python3
"""Normaliza los logos de clientes para que se vean parejos en los carruseles.

Lee las carpetas originales de public/img/<segmento>/ (no las toca) y genera
en public/img/logos/<segmento>/ un PNG por logo, todos con:
  - mismo lienzo (480x192, transparente),
  - el logo recortado a su contenido real (sin márgenes blancos/transparentes),
  - escalado para caber en una caja común (400x136), centrado,
  - los logos blancos sobre fondo transparente (que desaparecen en la tarjeta
    blanca) teñidos de gris oscuro para que se lean.

Uso (cuando se sumen logos nuevos):  python3 scripts/normalizar-logos.py
"""
import os
import sys
import numpy as np
from PIL import Image

RAIZ = os.path.join(os.path.dirname(__file__), "..", "public", "img")
SALIDA = os.path.join(RAIZ, "logos")
CARPETAS = ["Clubes - Gym - Natatorios", "Desarrolladoras", "Hoteles", "Industrias"]
EXT = {".png", ".jpg", ".jpeg", ".webp"}
# No son logos (p. ej. un flyer vertical de ATSOL que quedó en la carpeta).
EXCLUIR = {"GRAFICA 01B"}
LIENZO = (480, 192)
CAJA = (400, 136)
GRIS_OSCURO = (51, 51, 51)


def cargar(path):
    im = Image.open(path)
    im.load()
    return im.convert("RGBA")


def quitar_fondo(im):
    """Si el logo viene con fondo opaco liso, lo pasa a transparente.

    - Fondo claro: queda el logo tal cual.
    - Fondo oscuro liso con logo claro (p. ej. Almarena, Faires): se saca el
      fondo y lo claro/gris del logo se tiñe de gris oscuro; los colores de
      marca (rojo, etc.) se conservan.
    """
    a = np.array(im).astype(np.int32)
    alpha = a[..., 3]
    if (alpha < 250).mean() > 0.05:  # ya tiene transparencia real
        return im
    # 2px de borde fuera: los JPG suelen traer una línea gris de compresión
    if min(a.shape[:2]) > 40:
        im = im.crop((2, 2, im.width - 2, im.height - 2))
        a = np.array(im).astype(np.int32)
        alpha = a[..., 3]
    borde = np.concatenate([a[0, :, :3], a[-1, :, :3], a[:, 0, :3], a[:, -1, :3]])
    fondo = np.median(borde, axis=0)
    dist = np.abs(a[..., :3] - fondo).max(axis=2)
    nuevo = a.copy()
    if fondo.mean() >= 225:
        nuevo[..., 3] = np.where(dist < 22, 0, alpha)
    elif fondo.mean() < 110 and borde.std(axis=0).max() < 14:
        nuevo[..., 3] = np.clip((dist - 20) * 255 / 60, 0, 255)
        mx, mn = a[..., :3].max(axis=2), a[..., :3].min(axis=2)
        lum = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
        claro_y_gris = (lum > 130) & ((mx - mn) < 60)
        for c in range(3):
            nuevo[..., c] = np.where(claro_y_gris, GRIS_OSCURO[c], nuevo[..., c])
    else:
        return im  # fondo de color de marca: es parte del logo
    return Image.fromarray(nuevo.astype(np.uint8), "RGBA")


def teñir_si_es_claro(im):
    a = np.array(im).astype(np.float32)
    opaco = a[..., 3] > 20
    if opaco.sum() == 0:
        return im
    lum = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    if lum[opaco].mean() > 225:  # logo blanco sobre transparente
        a[..., 0], a[..., 1], a[..., 2] = GRIS_OSCURO
        return Image.fromarray(a.astype(np.uint8), "RGBA")
    return im


def recortar(im):
    alpha = np.array(im)[..., 3]
    ys, xs = np.where(alpha > 20)
    if len(xs) == 0:
        return im
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def normalizar(path):
    im = cargar(path)
    im = quitar_fondo(im)
    im = teñir_si_es_claro(im)
    im = recortar(im)
    w, h = im.size
    escala = min(CAJA[0] / w, CAJA[1] / h)
    # los logos casi cuadrados pesan visualmente más que los apaisados:
    # se les baja un poco el tamaño para equilibrar
    aspecto = w / h
    if aspecto < 1.6:
        escala *= 0.88
    nw, nh = max(1, round(w * escala)), max(1, round(h * escala))
    im = im.resize((nw, nh), Image.LANCZOS)
    lienzo = Image.new("RGBA", LIENZO, (0, 0, 0, 0))
    lienzo.paste(im, ((LIENZO[0] - nw) // 2, (LIENZO[1] - nh) // 2), im)
    return lienzo


def main():
    total = 0
    for carpeta in CARPETAS:
        origen = os.path.join(RAIZ, carpeta)
        destino = os.path.join(SALIDA, carpeta)
        os.makedirs(destino, exist_ok=True)
        for f in sorted(os.listdir(origen)):
            nombre, ext = os.path.splitext(f)
            if ext.lower() not in EXT or nombre in EXCLUIR:
                continue
            try:
                normalizar(os.path.join(origen, f)).save(
                    os.path.join(destino, nombre + ".png"), optimize=True
                )
                total += 1
            except Exception as e:  # noqa: BLE001
                print("ERROR", carpeta, f, e, file=sys.stderr)
    print(f"{total} logos normalizados en {SALIDA}")


if __name__ == "__main__":
    main()
