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
    const emailResult = await sendOtpEmail(email, otp);

    const isRealEmailSent = Boolean(emailResult?.success && !(emailResult as any)?.simulated);

    return NextResponse.json({
      success: true,
      message: isRealEmailSent
        ? "تم إرسال رمز التحقق بنجاح إلى بريدك الإلكتروني."
        : "تم إنشاء رمز التحقق الفوري بنجاح.",
      debugOtp: otp,
      isSimulated: !isRealEmailSent,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "حدث خطأ أثناء إرسال الرمز." },
      { status: 500 }
    );
  }
}
