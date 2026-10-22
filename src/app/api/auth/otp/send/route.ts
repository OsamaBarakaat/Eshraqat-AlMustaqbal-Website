import { NextResponse } from "next/server";
import { OtpService } from "@/lib/otp-store";
import { sendOtpEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "يرجى إدخال بريد إلكتروني صحيح." },
        { status: 400 }
      );
    }

    const otp = OtpService.createOtp(email);
    await sendOtpEmail(email, otp);

    return NextResponse.json({
      success: true,
      message: "تم إرسال رمز التحقق بنجاح إلى بريدك الإلكتروني.",
      // Include debug OTP in development for super easy testing
      debugOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "حدث خطأ أثناء إرسال الرمز." },
      { status: 500 }
    );
  }
}
