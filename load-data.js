import { getStore } from "@netlify/blobs";

// Restituisce l'ultimo stato salvato (o record: null se non è mai stato
// salvato nulla, ad es. al primissimo deploy).
export default async () => {
  try {
    // Lettura a coerenza "forte": di default Netlify Blobs è eventualmente
    // coerente (un aggiornamento può impiegare fino a 60s per propagarsi a
    // tutte le edge location) — qui vogliamo invece vedere subito l'ultimo
    // dato scritto da un altro dispositivo.
    const store = getStore({ name: "calendario-canto", consistency: "strong" });
    const record = await store.get("data", { type: "json" });
    return new Response(JSON.stringify({ ok: true, record: record || null }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config = { path: "/api/load-data" };
