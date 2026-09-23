// Rating y cantidad de reseñas de Google de Calderas Santero.
//
// Por defecto usa estos valores fijos (los que ya estaban hardcodeados
// en el sitio). Si se configuran las variables de entorno
// GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID, en cambio, los trae en vivo
// desde la Places API de Google — así el número de reseñas se va
// actualizando solo a medida que entran nuevas, sin tocar código.
//
// Cómo activarlo (queda para cuando el cliente/agencia lo necesite):
// 1. Crear un proyecto en Google Cloud Console y habilitar "Places API
//    (New)" — requiere una cuenta de Google Cloud con facturación
//    activada (tiene uso gratuito mensual, pero igual pide tarjeta
//    para habilitarla). Esto no lo puede hacer Claude: hay que crearlo
//    desde la cuenta de Google del cliente o de la agencia.
// 2. Generar una API key restringida a "Places API (New)".
// 3. Buscar el Place ID de Calderas Santero acá:
//    https://developers.google.com/maps/documentation/places/web-service/place-id
//    (buscar "Calderas Santero" en el mapita, copiar el Place ID que
//    muestra — empieza con "ChIJ...", es distinto al "cid" que usan
//    los links a Google Maps).
// 4. Cargar GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID como variables de
//    entorno en Vercel (Project Settings → Environment Variables) y
//    redeployar.
//
// Se cachea 24hs (revalidate) — no pega a la API en cada visita de
// cada usuario. Si algo falla (key vencida, sin cuota, etc.) cae en
// los valores de respaldo en vez de romper el sitio.

export const FALLBACK_RATING = 4.8;
export const FALLBACK_REVIEW_COUNT = 70;

export type GoogleRating = {
  rating: number;
  reviewCount: number;
};

const FALLBACK: GoogleRating = {
  rating: FALLBACK_RATING,
  reviewCount: FALLBACK_REVIEW_COUNT,
};

export async function getGoogleRating(): Promise<GoogleRating> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return FALLBACK;
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount`,
      {
        headers: { "X-Goog-Api-Key": apiKey },
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    if (!res.ok) return FALLBACK;

    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
    };

    if (
      typeof data.rating !== "number" ||
      typeof data.userRatingCount !== "number"
    ) {
      return FALLBACK;
    }

    return { rating: data.rating, reviewCount: data.userRatingCount };
  } catch {
    return FALLBACK;
  }
}
