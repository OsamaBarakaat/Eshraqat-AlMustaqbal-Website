import { NextResponse } from "next/server";
import { OtpService } from "@/lib/otp-store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, otp, rememberMe, token } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "البريد الإلكتروني ورمز التحقق مطلوبان." },
        { status: 400 }
      );
    }

    const result = OtpService.verifyOtp(email, otp, token);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    // Generate client auth token
    const normalizedEmail = email.trim().toLowerCase();
    const clientToken = `client_${Buffer.from(normalizedEmail + ":" + Date.now()).toString("base64")}`;

    // Sync client to backend PostgreSQL CRM Database immediately
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://eshraqat-almustaqbal-backend.vercel.app/api/v1";

    try {
      await fetch(`${API_BASE_URL}/clients/public/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          source: "WEBSITE_INQUIRY",
          notes: "تسجيل دخول وتوثيق البريد الإلكتروني عبر OTP في الموقع الرسمي",
        }),
      });
    } catch (syncErr) {
      console.warn("Failed to sync client to backend CRM:", syncErr);
    }

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح.",
      user: {
        email: normalizedEmail,
        token: clientToken,
      },
    });

    // Set cookie if remember me
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
    response.cookies.set("eshraqat_client_token", clientToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("[OTP Verify Route Error]:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "حدث خطأ أثناء التحقق." },
      { status: 500 }
    );
  }
}
