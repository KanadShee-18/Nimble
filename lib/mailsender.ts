import nodemailer from "nodemailer";
import { baseUrl } from "@/lib/url";
import { emailTemplates } from "@/lib/emailTemplates";

interface EmailSendingProps {
  email: string;
  token: string;
  title: string;
  body: string;
  type: "VERIFY" | "RESET" | "TWO_FA";
}

export const sendVerificationEmail = async ({
  email,
  token,
  title,
  body,
  type,
}: EmailSendingProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Create appropriate link based on the type
    const confirmLink =
      type === "VERIFY"
        ? `${baseUrl}/auth/email-confirmation?token=${token}`
        : type === "RESET"
        ? `${baseUrl}/auth/new-password?token=${token}`
        : "";

    // Get the HTML template based on the type
    const html =
      type === "TWO_FA"
        ? emailTemplates.TWO_FA(token)
        : type === "VERIFY"
        ? emailTemplates.VERIFY(confirmLink, body)
        : emailTemplates.RESET(confirmLink, body);

    // Send the email
    await transporter.sendMail({
      from: `"Next-Auth - by Kanad" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html,
    });

    return {
      success:
        type === "VERIFY"
          ? "Confirmation mail has been sent!"
          : "Reset password mail has been sent!",
    };
  } catch (error) {
    console.log("Mail sending error: ", error);
    return {
      error: "Some error occurred while sending mail",
    };
  }
};
