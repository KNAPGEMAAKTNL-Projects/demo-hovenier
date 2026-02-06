export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildConfirmationEmail(data: {
  naam: string;
  onderwerp: string;
}): string {
  const { naam, onderwerp } = data;
  const firstName = naam.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bedankt voor uw aanvraag</title>
</head>
<body style="margin:0;padding:0;background-color:#faf7f2;font-family:Georgia,'Times New Roman',Times,serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f2;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Accent line -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="width:60px;height:3px;background-color:#b8624e;"></div>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding-bottom:24px;">
              <h1 style="margin:0;font-size:28px;line-height:1.3;color:#1c1c1a;font-weight:normal;font-family:Georgia,'Times New Roman',Times,serif;">
                Bedankt voor uw bericht, ${escapeHtml(firstName)}.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0;font-size:16px;line-height:1.7;color:#7a7568;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                Goed om van u te horen. Uw aanvraag over <strong style="color:#1c1c1a;">${escapeHtml(onderwerp).toLowerCase()}</strong> is bij ons binnengekomen.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0;font-size:16px;line-height:1.7;color:#7a7568;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                We nemen binnen &eacute;&eacute;n werkdag contact met u op om uw wensen te bespreken. Mocht u in de tussentijd nog vragen hebben, dan kunt u ons gewoon even bellen of appen.
              </p>
            </td>
          </tr>

          <!-- CTA buttons -->
          <tr>
            <td style="padding:24px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="tel:0623571852" style="display:inline-block;background-color:#2d3b2d;color:#faf7f2;text-decoration:none;padding:14px 28px;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;letter-spacing:0.5px;text-transform:uppercase;">
                      Bel ons
                    </a>
                  </td>
                  <td>
                    <a href="https://wa.me/31623571852" style="display:inline-block;background-color:#25D366;color:#ffffff;text-decoration:none;padding:14px 28px;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;letter-spacing:0.5px;text-transform:uppercase;">
                      WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px;background-color:#ede6db;"></div>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#7a7568;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                Met vriendelijke groet,<br>
                <strong style="color:#1c1c1a;">Hoveniersbedrijf De Oude Stad</strong><br>
                <span style="font-size:13px;">Culemborg en omstreken</span>
              </p>
            </td>
          </tr>

          <!-- Footer divider -->
          <tr>
            <td style="padding-bottom:20px;">
              <div style="height:1px;background-color:#ede6db;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="margin:0;font-size:12px;line-height:1.6;color:#7a7568;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;opacity:0.7;">
                Deze e-mail is automatisch verzonden na uw aanvraag via onze website.
              </p>
              <p style="margin:8px 0 0;font-size:12px;line-height:1.6;color:#b8624e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                Automatisering door <a href="https://knapgemaakt.nl/aanvragen/" style="color:#b8624e;text-decoration:underline;">KNAP GEMAAKT.</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildNotificationEmail(data: {
  naam: string;
  email: string;
  telefoon: string;
  onderwerp: string;
  adres: string;
  bericht: string;
}): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#faf7f2;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #ede6db;padding:32px;">
    <h2 style="margin:0 0 24px;color:#1c1c1a;font-size:20px;">Nieuwe aanvraag via de website</h2>
    <table style="width:100%;border-collapse:collapse;font-size:15px;color:#1c1c1a;">
      <tr>
        <td style="padding:8px 16px 8px 0;color:#7a7568;vertical-align:top;white-space:nowrap;">Naam</td>
        <td style="padding:8px 0;font-weight:600;">${escapeHtml(data.naam)}</td>
      </tr>
      <tr>
        <td style="padding:8px 16px 8px 0;color:#7a7568;vertical-align:top;white-space:nowrap;">E-mail</td>
        <td style="padding:8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#b8624e;">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="padding:8px 16px 8px 0;color:#7a7568;vertical-align:top;white-space:nowrap;">Telefoon</td>
        <td style="padding:8px 0;">${data.telefoon ? escapeHtml(data.telefoon) : '<span style="color:#7a7568;">—</span>'}</td>
      </tr>
      <tr>
        <td style="padding:8px 16px 8px 0;color:#7a7568;vertical-align:top;white-space:nowrap;">Onderwerp</td>
        <td style="padding:8px 0;">${escapeHtml(data.onderwerp)}</td>
      </tr>
      <tr>
        <td style="padding:8px 16px 8px 0;color:#7a7568;vertical-align:top;white-space:nowrap;">Adres</td>
        <td style="padding:8px 0;">${data.adres ? escapeHtml(data.adres) : '<span style="color:#7a7568;">—</span>'}</td>
      </tr>
    </table>
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #ede6db;">
      <p style="margin:0 0 8px;color:#7a7568;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Bericht</p>
      <p style="margin:0;font-size:15px;line-height:1.7;color:#1c1c1a;white-space:pre-wrap;">${escapeHtml(data.bericht)}</p>
    </div>
  </div>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const apiKey =
      (locals as any).runtime?.env?.RESEND_API_KEY ||
      import.meta.env.RESEND_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server configuratie ontbreekt." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { naam, email, telefoon, onderwerp, adres, bericht } = body;

    if (!naam || !email || !bericht) {
      return new Response(
        JSON.stringify({ error: "Vul alle verplichte velden in." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Vul een geldig e-mailadres in." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Hoveniersbedrijf De Oude Stad <noreply@knapgemaakt.nl>",
      to: email,
      subject: `Bedankt voor uw aanvraag, ${naam.split(" ")[0]}`,
      html: buildConfirmationEmail({ naam, onderwerp: onderwerp || "uw tuin" }),
    });

    // Send notification email to Yannick
    await resend.emails.send({
      from: "De Oude Stad Formulier <noreply@knapgemaakt.nl>",
      to: "yannick@knapgemaakt.nl",
      subject: `Nieuwe aanvraag: ${onderwerp || "Algemeen"} – ${naam}`,
      html: buildNotificationEmail({
        naam,
        email,
        telefoon: telefoon || "",
        onderwerp: onderwerp || "Niet opgegeven",
        adres: adres || "",
        bericht,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({
        error: "Er ging iets mis bij het versturen. Probeer het later opnieuw.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
