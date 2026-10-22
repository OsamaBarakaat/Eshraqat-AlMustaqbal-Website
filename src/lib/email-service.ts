import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string) {
  try {
    // If SMTP is provided via environment variables, use it
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: '"إشراقة المستقبل" <no-reply@eshraqat-almustaqbal.sa>',
        to: email,
        subject: `رمز التحقق الخاص بك: ${otp} | إشراقة المستقبل`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #0d0d0f; color: #f5f5f0; padding: 40px; text-align: center; border-radius: 16px;">
            <h1 style="color: #C5A059; margin-bottom: 10px;">إشراقة المستقبل</h1>
            <p style="color: #a1a1aa; font-size: 14px;">وجهة جديدة لحياة أرقى</p>
            <hr style="border: 0; border-top: 1px solid rgba(197, 160, 89, 0.2); margin: 25px 0;" />
            <p style="font-size: 16px; margin-bottom: 20px;">مرحباً بك، رمز التحقق السريع لتسجيل دخولك وتأكيد المعاينة هو:</p>
            <div style="display: inline-block; background: #1a1a20; border: 2px solid #C5A059; padding: 15px 35px; border-radius: 12px; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #C5A059;">
              ${otp}
            </div>
            <p style="color: #71717a; font-size: 12px; margin-top: 25px;">الرمز صالح لمدة 5 دقائق فقط. لا تشارك هذا الرمز مع أي شخص.</p>
          </div>
        `,
      });

      return { success: true };
    }

    // Default development fallback: Generate Ethereal or log
    console.log(`\n========================================\n[EMAIL DISPATCH] To: ${email}\n[OTP CODE]: ${otp}\n========================================\n`);
    return { success: true, simulated: true };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: err };
  }
}
