import { NextResponse } from "next/server";
import { OtpService } from "@/lib/otp-store";
import { sendOtpEmail } from "@/lib/email-service";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "يرجى إدخال بريد إلكتروني صحيح." },
        { status: 400 }
      );
    }

    const { code, token, expiresAt } = OtpService.createOtp(email);
    const emailResult = await sendOtpEmail(email, code);

    const isRealEmailSent = Boolean(emailResult?.success && !(emailResult as any)?.simulated);

    return NextResponse.json({
      success: true,
      message: isRealEmailSent
        ? "تم إرسال رمز التحقق بنجاح إلى بريدك الإلكتروني عبر Resend."
        : "تم إنشاء رمز التحقق بنجاح.",
      debugOtp: process.env.NODE_ENV !== "production" ? code : undefined,
      token,
      expiresAt,
      fallbackSent: (emailResult as any)?.fallbackSent,
      sentTo: (emailResult as any)?.recipient,
      isSimulated: !isRealEmailSent,
    });
  } catch (err: any) {
    console.error("[OTP Send Route Error]:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "حدث خطأ أثناء إرسال الرمز." },
      { status: 500 }
    );
  }
}
