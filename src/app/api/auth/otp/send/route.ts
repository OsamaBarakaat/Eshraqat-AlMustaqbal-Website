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

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error || "فشل إرسال رمز التحقق عبر البريد الإلكتروني.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم إرسال رمز التحقق بنجاح إلى بريدك الإلكتروني عبر Resend.",
      debugOtp: process.env.NODE_ENV !== "production" ? code : undefined,
      token,
      expiresAt,
      fallbackSent: emailResult.fallbackSent,
      sentTo: emailResult.recipient,
    });
  } catch (err: any) {
    console.error("[OTP Send Route Error]:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "حدث خطأ أثناء إرسال الرمز." },
      { status: 500 }
    );
  }
}
