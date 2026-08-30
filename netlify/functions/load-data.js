import { getStore } from "@netlify/blobs";

// Restituisce l'ultimo stato salvato (o record: null se non è mai stato
// salvato nulla, ad es. al primissimo deploy).
export default async () => {
  try {
    const store = getStore("calendario-canto");
    const record = await store.get("data", { type: "json" });
    return new Response(JSON.stringify({ ok: true, record: record || null }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config = { path: "/api/load-data" };
