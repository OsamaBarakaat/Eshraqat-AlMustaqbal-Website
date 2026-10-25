import { Resend } from "resend";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

let resendInstance: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export async function sendOtpEmail(email: string, otp: string) {
  const resend = getResendClient();

  if (!resend) {
    console.error("[Resend Error] RESEND_API_KEY is not defined in environment variables.");
    return {
      success: false,
      error: "مفتاح RESEND_API_KEY غير مضاف في إعدادات البيئة (Vercel Environment Variables) لمشروع الويب سايت.",
    };
  }

  const targetEmail = email.trim().toLowerCase();

  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <title>رمز التحقق - إشراقة المستقبل</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 24px; background-color: #08080A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; direction: rtl; text-align: right; color: #FFFFFF;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #121217; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8); border: 1px solid rgba(197, 160, 89, 0.25);">
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(180deg, #1A1A22 0%, #121217 100%); padding: 36px 24px 28px; text-align: center; border-bottom: 1px solid rgba(197, 160, 89, 0.15);">
            <h1 style="color: #C5A059; font-size: 24px; font-weight: 800; margin: 0 0 6px; letter-spacing: 0.5px;">
              إشراقة المستقبل
            </h1>
            <p style="color: #A1A1AA; font-size: 13px; margin: 0; font-weight: 300;">
              وجهة جديدة لحياة أرقى • إدارة الاستثمار والتطوير العقاري
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 36px 32px; text-align: center;">
            <h2 style="color: #F4F4F5; font-size: 19px; font-weight: 600; margin: 0 0 12px;">
              رمز التحقق لتسجيل الدخول وحجز المعاينة
            </h2>
            <p style="color: #A1A1AA; font-size: 14px; line-height: 1.7; margin: 0 0 28px;">
              مرحباً بك،<br>
              استخدم رمز التحقق السري أدناه لتأكيد بريدك الإلكتروني والوصول إلى حجوزاتك ومعايناتك العقارية:
            </p>

            <!-- OTP Box -->
            <div style="background: #181820; border: 2px dashed #C5A059; border-radius: 18px; padding: 22px; display: inline-block; margin-bottom: 24px; min-width: 260px;">
              <span style="font-size: 38px; font-weight: 900; letter-spacing: 12px; color: #F3E5AB; font-family: 'Courier New', monospace; display: block; padding-right: 12px;">
                ${otp}
              </span>
            </div>

            <p style="color: #EAB308; font-size: 13px; font-weight: 500; margin: 0 0 8px;">
              ⏱️ هذا الرمز صالح لمدة 10 دقائق فقط.
            </p>
            <p style="color: #71717A; font-size: 12px; margin: 0;">
              يُرجى عدم مشاركة هذا الرمز مع أي شخص حفاظاً على أمان بياناتك وحجوزاتك.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #0E0E12; padding: 20px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
            <p style="color: #71717A; font-size: 12px; margin: 0 0 4px;">
              المرسل إليه: <span dir="ltr" style="font-family: monospace; color: #A1A1AA;">${targetEmail}</span>
            </p>
            <p style="color: #52525B; font-size: 11px; margin: 0;">
              جميع الحقوق محفوظة © ${new Date().getFullYear()} شركة إشراقة المستقبل للعقارات
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: targetEmail,
      subject: `رمز التحقق الخاص بك: ${otp} | إشراقة المستقبل`,
      html,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      // Helpful error message if on Resend free tier attempting to send to arbitrary email
      if (
        FROM_EMAIL.includes("resend.dev") &&
        (error.message?.includes("testing emails") || (error as any).statusCode === 403)
      ) {
        return {
          success: false,
          error:
            "تنبيه Resend: النطاق المجاني المؤقت (onboarding@resend.dev) مخصص للتجربة فقط ويسمح فقط بالإرسال للبريد المسجل في حساب Resend. لكي يرسل النظام لأي بريد عميل مختلف في العالم، يجب ربط دومينك الخاص في resend.com/domains.",
        };
      }
      return {
        success: false,
        error: error.message || "فشل إرسال البريد عبر Resend",
      };
    }

    return {
      success: true,
      data,
      recipient: targetEmail,
    };
  } catch (err: any) {
    console.error("[Resend Send Exception]:", err);
    return {
      success: false,
      error: err?.message || "حدث خطأ غير متوقع أثناء إرسال البريد",
    };
  }
}
