import { getStore } from "@netlify/blobs";

// Riceve l'intero stato dell'app (tutti gli anni scolastici) e lo salva
// come unico "blob" JSON. Nessuna autenticazione: chi conosce l'URL del
// sito può scrivere qui, come concordato per un uso personale.
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Metodo non consentito" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "JSON non valido" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const store = getStore("calendario-canto");
  const savedAt = new Date().toISOString();
  await store.setJSON("data", { payload, savedAt });

  return new Response(JSON.stringify({ ok: true, savedAt }), {
    headers: { "content-type": "application/json" },
  });
};

export const config = { path: "/api/save-data" };
