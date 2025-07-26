// ./src/services/email-service.ts
import nodemailer from "nodemailer";
export interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailParams): Promise<boolean> => {
  try {
    // إعداد نقل البريد
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // إرسال البريد
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to,
      subject,
      html
    });

    return true;
  } catch (error) {
    console.error(`فشل في إرسال البريد إلى ${to}:`, error);
    return false;
  }
};