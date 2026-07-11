import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
} from "@/lib/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante");
      return NextResponse.json(
        { error: "Configuration e-mail manquante" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 },
      );
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "CAP Congo <onboarding@resend.dev>";
    const toEmail = process.env.RESEND_TO_EMAIL || "info@cap-congo.com";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: buildContactEmailSubject(subject),
      html: buildContactEmailHtml({ name, email, subject, message }),
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        {
          error: "Échec de l'envoi de l'e-mail",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Erreur Resend:", error);
    return NextResponse.json(
      { error: "Échec de l'envoi de l'e-mail" },
      { status: 500 },
    );
  }
}
