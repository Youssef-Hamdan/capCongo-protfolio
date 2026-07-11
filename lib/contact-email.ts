type ContactEmailParams = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmailSubject(subject?: string) {
  return `Contact CAP Congo — ${subject?.trim() || "Nouveau message"}`;
}

export function buildContactEmailHtml({
  name,
  email,
  subject,
  message,
}: ContactEmailParams) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject?.trim() || "Non renseigné");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const receivedAt = new Date().toLocaleString("fr-FR", {
    timeZone: "Africa/Kinshasa",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Contact CAP Congo</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f2;font-family:Arial,Helvetica,sans-serif;color:#1d1d1b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e8e6;">
            <!-- Header -->
            <tr>
              <td style="background-color:#1d1d1b;padding:28px 32px;text-align:center;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#70aa43;font-weight:bold;">
                  CAP Congo SARL
                </p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;color:#f7d616;font-weight:bold;">
                  Formulaire de contact
                </h1>
                <p style="margin:10px 0 0;font-size:14px;color:#ffffff;opacity:0.75;">
                  Nouveau message reçu depuis le site web
                </p>
              </td>
            </tr>

            <!-- Intro -->
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#575756;">
                  Vous avez reçu une demande de contact. Répondez directement à cet e-mail pour écrire à <strong style="color:#1d1d1b;">${safeName}</strong>.
                </p>
              </td>
            </tr>

            <!-- Contact details -->
            <tr>
              <td style="padding:16px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ececea;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="padding:14px 18px;background-color:#fafaf8;border-bottom:1px solid #ececea;width:120px;font-size:12px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;color:#575756;">
                      Nom
                    </td>
                    <td style="padding:14px 18px;background-color:#ffffff;border-bottom:1px solid #ececea;font-size:15px;color:#1d1d1b;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;background-color:#fafaf8;border-bottom:1px solid #ececea;width:120px;font-size:12px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;color:#575756;">
                      E-mail
                    </td>
                    <td style="padding:14px 18px;background-color:#ffffff;border-bottom:1px solid #ececea;font-size:15px;">
                      <a href="mailto:${safeEmail}" style="color:#4377bc;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;background-color:#fafaf8;border-bottom:1px solid #ececea;width:120px;font-size:12px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;color:#575756;">
                      Sujet
                    </td>
                    <td style="padding:14px 18px;background-color:#ffffff;border-bottom:1px solid #ececea;font-size:15px;color:#1d1d1b;">
                      ${safeSubject}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;background-color:#fafaf8;width:120px;font-size:12px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;color:#575756;">
                      Reçu le
                    </td>
                    <td style="padding:14px 18px;background-color:#ffffff;font-size:15px;color:#1d1d1b;">
                      ${receivedAt}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:20px 32px 8px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:#3d632f;">
                  Message
                </p>
                <div style="background-color:#f7faf3;border-left:4px solid #70aa43;border-radius:0 8px 8px 0;padding:18px 20px;font-size:15px;line-height:1.7;color:#1d1d1b;">
                  ${safeMessage}
                </div>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:24px 32px 32px;text-align:center;">
                <a href="mailto:${safeEmail}?subject=Re%3A%20${encodeURIComponent(subject?.trim() || "Votre message — CAP Congo")}"
                   style="display:inline-block;background-color:#70aa43;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:14px 28px;border-radius:999px;">
                  Répondre à ${safeName}
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#1d1d1b;padding:20px 32px;text-align:center;">
                <p style="margin:0 0 6px;font-size:12px;color:#f7d616;font-weight:bold;">
                  CAP Congo — Produire local, nourrir durablement
                </p>
                <p style="margin:0;font-size:11px;line-height:1.5;color:#ffffff;opacity:0.65;">
                  Cet e-mail a été généré automatiquement depuis le formulaire « Contactez-nous » sur
                  <a href="https://www.cap-congo.com/contact" style="color:#70aa43;text-decoration:none;">cap-congo.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}
