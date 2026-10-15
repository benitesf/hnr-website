const DESTINATARIO = "benites.ee@gmail.com";
const REMITENTE = "HNR Website <onboarding@resend.dev>";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleContact(request, env) {
  let data;
  try {
    data = await request.json();
  } catch (err) {
    return jsonResponse({ ok: false, error: "Formulario inválido." }, 400);
  }

  const nombre = limpiar(data.nombre);
  const negocio = limpiar(data.negocio);
  const necesidad = limpiar(data.necesidad);
  const telefono = limpiar(data.telefono);

  if (!nombre && !negocio && !necesidad) {
    return jsonResponse({ ok: false, error: "Completa al menos tu nombre y qué quieres automatizar." }, 400);
  }

  const asunto = "Auditoría gratuita — " + (negocio || nombre || "consulta HNR");
  const texto = [
    "Alguien pidió agendar su auditoría gratuita desde la web de HNR.",
    "",
    nombre ? "Nombre: " + nombre : null,
    negocio ? "Negocio: " + negocio : null,
    necesidad ? "Qué quiere automatizar: " + necesidad : null,
    telefono ? "Teléfono: " + telefono : null
  ]
    .filter((linea) => linea !== null)
    .join("\n");

  let resendResp;
  try {
    resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        from: REMITENTE,
        to: [DESTINATARIO],
        subject: asunto,
        text: texto
      })
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: "No se pudo contactar al servicio de correo." }, 502);
  }

  if (!resendResp.ok) {
    return jsonResponse({ ok: false, error: "El servicio de correo rechazó el envío." }, 502);
  }

  return jsonResponse({ ok: true });
}

function limpiar(valor) {
  return (valor || "").toString().trim().slice(0, 2000);
}

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { "content-type": "application/json" }
  });
}
