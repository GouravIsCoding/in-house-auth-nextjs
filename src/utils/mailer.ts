import nodemailer from "nodemailer";
import CONFIG from "@/config";

const html = (uuid: string) => `<body style="font-family: Arial, sans-serif;">

<div style="max-width: 600px; margin: 0 auto;">
    <h2>Email Verification</h2>
    <p>
        Thank you for signing up! Please verify your email address by clicking the link below:
    </p>
    <p>
        <a href="${CONFIG.DOMAIN}/verify/${uuid}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">CLICK HERE</a>
    </p>
    <p>
        If you did not sign up for an account, you can ignore this email.
    </p>
    <p>
        Best regards,<br>
        Your Company Name
    </p>
</div>

</body>`;

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: CONFIG.MAILTRAP_USER,
    pass: CONFIG.MAILTRAP_PASS,
  },
});

export async function sendMail(email: string, uuid: string) {
  const info = await transporter.sendMail({
    from: '"in-house-auth" <in-house-auth@example.email>',
    to: email,
    subject: "Email verification",
    text: "Follow the instructions to verify your email at in-house-auth",
    html: html(uuid),
  });

  return info;
}
