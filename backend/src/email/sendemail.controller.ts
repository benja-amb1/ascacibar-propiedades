import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import { Response, Request } from 'express';
import sanitizeHtml from 'sanitize-html'

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD_USER,
  },
});

const sendEmail = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, surname, subject, mail, message } = req.body;

    if (!name || !surname || !mail || !subject || !message) {
      return res.status(400).json({ error: 'Campos obligatorios' });
    }

    const safeMessage = sanitizeHtml(message, {
      allowedTags: [],
      allowedAttributes: {}
    })

    const info = await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: mail,
      subject: subject,
      html: `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nuevo mensaje de contacto</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:6px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#0f172a; padding:20px; color:#ffffff; text-align:center;">
                <h2 style="margin:0;">Nuevo mensaje de contacto</h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:20px; color:#333333;">
                <p><strong>Nombre:</strong> ${name} ${surname}</p>
                <p><strong>Email:</strong> ${mail}</p>
                <p><strong>Asunto:</strong> ${subject}</p>

                <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

                <p style="white-space:pre-line;">
                  ${safeMessage}
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#64748b;">
                <p style="margin:0;">
                  Este mensaje fue enviado desde el formulario de contacto.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
    })

    return res.status(200).json({
      success: true,
      message: 'Email enviado correctamente'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'No se pudo enviar el email'
    });
  }
}

export { sendEmail }