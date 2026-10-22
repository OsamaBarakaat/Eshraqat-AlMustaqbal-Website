import { NextResponse } from "next/server";
import { OtpService } from "@/lib/otp-store";

export async function POST(req: Request) {
  try {
    const { email, otp, rememberMe } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "البريد الإلكتروني ورمز التحقق مطلوبان." },
        { status: 400 }
      );
    }

    const result = OtpService.verifyOtp(email, otp);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    // Generate client auth token
    const clientToken = `client_${Buffer.from(email + ":" + Date.now()).toString("base64")}`;

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح.",
      user: {
        email: email.trim().toLowerCase(),
        token: clientToken,
      },
    });

    // Set cookie if remember me
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
    response.cookies.set("eshraqat_client_token", clientToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "فشل التحقق من الرمز." },
      { status: 500 }
    );
  }
}
