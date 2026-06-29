import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation des champs
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const data = await resend.emails.send({
      // L'adresse d'expédition (doit être configurée sur Resend)
      from: 'Contact Form <onboarding@resend.dev>', 
      to: ['youssefhamdan.work@gmail.com'], 
      replyTo: email,
      subject: `Nouveau message (Cap Congo) : ${subject || 'Sans objet'}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">Nouveau message depuis le site web</h2>
          
          <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Nom :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>E-mail :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Sujet :</strong></td>
              <td style="padding: 8px 0;">${subject || 'Non renseigné'}</td>
            </tr>
          </table>
          
          <h3 style="color: #1a1a1a; margin-top: 20px;">Message :</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; line-height: 1.6; border: 1px solid #eaeaea;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
            Cet e-mail a été envoyé depuis le formulaire de contact de Cap Congo.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Erreur Resend:', error);
    return NextResponse.json({ error: 'Échec de l\'envoi de l\'e-mail' }, { status: 500 });
  }
}