/**
 * POST /api/enquiry
 * ---------------------------------------------------------------------------
 * Enquiry form ka server-side handler. Cloudflare Pages Functions ke liye
 * likha hai (file ka path hi URL ban jata hai — koi routing config nahi).
 *
 * Ye file tab kaam aayegi jab domain aur domain-wala email set ho jayega.
 * Us waqt assets/js/data.js me: forms.mode = "server"
 *
 * Environment variables (Cloudflare dashboard → Settings → Environment variables):
 *   RESEND_API_KEY   (secret)  Resend dashboard se — re_xxxxxxxx
 *   MAIL_TO          info@eagleppf.com   ya  Eagleppf@gmail.com
 *   MAIL_FROM        Eagle PPF Website <website@eagleppf.com>
 *                    ^ ye domain Resend me verified hona chahiye
 *   TURNSTILE_SECRET (optional) spam protection ke liye
 *
 * KOI KEY IS FILE ME LIKHNI NAHI HAI. Sab environment se aati hai.
 * ---------------------------------------------------------------------------
 */

const FIELD_LABELS = {
  enquiry_type: "Enquiry type",
  name: "Name",
  phone: "Phone",
  email: "Email",
  company: "Company",
  city: "City",
  business: "Current business",
  volume: "Expected volume",
  vehicle: "Vehicle",
  product: "Product of interest",
  requirement: "Requirement",
  message: "Message",
  page: "Submitted from",
};

const REQUIRED = ["name", "phone", "email", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/** Cloudflare Turnstile verification. Skipped if no secret is configured. */
async function verifyTurnstile(token, secret, ip) {
  if (!secret) return true;
  if (!token) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = await res.json().catch(() => ({ success: false }));
  return data.success === true;
}

export async function onRequestPost({ request, env }) {
  // 1. Parse
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid request body" });
  }

  // 2. Honeypot + basic size guard (cheap spam filter, no user friction)
  if (data._gotcha) return json(200, { ok: true });
  if (JSON.stringify(data).length > 8000) {
    return json(413, { ok: false, error: "Payload too large" });
  }

  // 3. Validate exactly what the frontend validates
  const missing = REQUIRED.filter((k) => !String(data[k] || "").trim());
  if (missing.length) {
    return json(422, { ok: false, error: "Missing fields", fields: missing });
  }
  if (!EMAIL_RE.test(String(data.email).trim())) {
    return json(422, { ok: false, error: "Invalid email", fields: ["email"] });
  }

  // 4. Spam check
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const human = await verifyTurnstile(data.turnstile_token, env.TURNSTILE_SECRET, ip);
  if (!human) {
    return json(403, { ok: false, error: "Verification failed" });
  }

  // 5. Configuration check — fail loudly in logs, softly to the visitor
  if (!env.RESEND_API_KEY || !env.MAIL_TO || !env.MAIL_FROM) {
    console.error("enquiry: missing RESEND_API_KEY / MAIL_TO / MAIL_FROM");
    return json(500, { ok: false, error: "Mail service not configured" });
  }

  // 6. Build the email
  const rows = Object.keys(FIELD_LABELS)
    .filter((k) => String(data[k] || "").trim())
    .map(
      (k) =>
        `<tr><td style="padding:8px 14px;border-bottom:1px solid #e6e6e6;color:#666;font:14px system-ui">${
          FIELD_LABELS[k]
        }</td><td style="padding:8px 14px;border-bottom:1px solid #e6e6e6;font:14px system-ui"><b>${escapeHtml(
          data[k]
        )}</b></td></tr>`
    )
    .join("");

  const type = data.enquiry_type === "distributor" ? "Distributor application" : "Quote request";
  const subject = `${type} — ${String(data.name).trim()}`;

  const html = `<div style="max-width:620px;margin:0 auto;font:15px system-ui;color:#111">
      <p style="font:600 13px system-ui;letter-spacing:.12em;text-transform:uppercase;color:#E01A22">Eagle PPF website</p>
      <h2 style="margin:6px 0 18px;font:700 22px system-ui">${escapeHtml(type)}</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e6e6e6">${rows}</table>
      <p style="margin-top:18px;color:#777;font-size:13px">Received ${new Date().toUTCString()} · IP ${escapeHtml(ip)}</p>
    </div>`;

  const text = Object.keys(FIELD_LABELS)
    .filter((k) => String(data[k] || "").trim())
    .map((k) => `${FIELD_LABELS[k]}: ${data[k]}`)
    .join("\n");

  // 7. Send through Resend
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: [env.MAIL_TO],
        reply_to: String(data.email).trim(),
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("resend failed", res.status, detail);
      return json(502, { ok: false, error: "Could not send the enquiry" });
    }
  } catch (err) {
    console.error("resend threw", err);
    return json(502, { ok: false, error: "Could not send the enquiry" });
  }

  return json(200, { ok: true });
}

/** A browser hitting the URL directly gets a clear answer, not a blank page. */
export async function onRequestGet() {
  return json(405, { ok: false, error: "Use POST" });
}
