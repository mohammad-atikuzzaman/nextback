// lib/mailer.js
import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, token) {
  const url = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NextBack" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email Address</title>
</head>
<body style="margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; background-color: #f7f7f7; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
            <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; margin: 0 auto; padding: 20px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tr>
                        <td align="center" style="text-align: center; padding: 20px 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <!-- Replace with your logo -->
                            <h2 style="color:#4F46E5">NextBack</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <h1 style="color: #2c3e50; font-size: 24px; margin-top: 0; margin-bottom: 20px; text-align: center;">Verify Your Email Address</h1>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${url}" style="background-color: #4F46E5; border-radius: 4px; color: #ffffff !important; display: inline-block; font-size: 16px; font-weight: bold; line-height: 1.5; padding: 12px 24px; text-align: center; text-decoration: none; width: auto; max-width: 100%;">Verify Email Address</a>
                            </div>
                            
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">If you didn't create an account with us, please ignore this email.</p>
                            
                            <div style="border-top: 1px solid #eeeeee; margin: 20px 0;"></div>
                            
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">If the button above doesn't work, copy and paste this link into your browser:</p>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;"><a href="${url}" style="color: #3498db; text-decoration: none;">${url}</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 20px 0; font-size: 12px; color: #999999; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <p style="font-size: 12px; line-height: 1.5; margin-bottom: 10px;">&copy; 2023 Your Company Name. All rights reserved.</p>
                            
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
  });
}
