import crypto from "crypto";

// In-memory OTP storage for client email verification with HMAC token support for Serverless
interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}

const OTP_SECRET = process.env.OTP_SECRET || process.env.RESEND_API_KEY || "eshraqat-website-otp-secret-2026";
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

const globalForOtp = global as unknown as { otpMap?: Map<string, OtpEntry> };
const otpMap = globalForOtp.otpMap || new Map<string, OtpEntry>();
if (process.env.NODE_ENV !== "production") globalForOtp.otpMap = otpMap;

export const OtpService = {
  createOtpToken(email: string, code: string, expiresAt: number): string {
    const cleanEmail = email.trim().toLowerCase();
    const data = `${cleanEmail}:${code}:${expiresAt}`;
    const signature = crypto.createHmac("sha256", OTP_SECRET).update(data).digest("hex");
    return `${expiresAt}.${signature}`;
  },

  createOtp(email: string): { code: string; token: string; expiresAt: number } {
    const cleanEmail = email.trim().toLowerCase();
    // Generate secure 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + OTP_EXPIRY_MS;

    otpMap.set(cleanEmail, {
      otp: code,
      expiresAt,
      attempts: 0,
    });

    const token = this.createOtpToken(cleanEmail, code, expiresAt);
    return { code, token, expiresAt };
  },

  verifyOtp(
    email: string,
    inputOtp: string,
    token?: string
  ): { valid: boolean; message: string } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanInput = inputOtp.trim();

    // 1. Stateless token verification (resilient for Vercel Serverless multi-instances)
    if (token && token.includes(".")) {
      const [expiresAtStr, signature] = token.split(".");
      const expiresAt = parseInt(expiresAtStr, 10);

      if (isNaN(expiresAt) || Date.now() > expiresAt) {
        return { valid: false, message: "انتهت صلاحية الرمز، يرجى طلب رمز جديد." };
      }

      const expectedData = `${cleanEmail}:${cleanInput}:${expiresAt}`;
      const expectedSig = crypto.createHmac("sha256", OTP_SECRET).update(expectedData).digest("hex");

      if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
        otpMap.delete(cleanEmail);
        return { valid: true, message: "تم التحقق بنجاح." };
      }
    }

    // 2. In-memory fallback
    const entry = otpMap.get(cleanEmail);

    if (!entry) {
      return { valid: false, message: "لم يتم طلب رمز لهذا البريد أو انتهت صلاحيته." };
    }

    if (Date.now() > entry.expiresAt) {
      otpMap.delete(cleanEmail);
      return { valid: false, message: "انتهت صلاحية الرمز، يرجى طلب رمز جديد." };
    }

    if (entry.attempts >= 5) {
      otpMap.delete(cleanEmail);
      return { valid: false, message: "تم تجاوز الحد الأقصى للمحاولات الخاطئة." };
    }

    if (entry.otp !== cleanInput) {
      entry.attempts += 1;
      return { valid: false, message: "رمز التحقق غير صحيح، حاول مرة أخرى." };
    }

    // Success - consume OTP
    otpMap.delete(cleanEmail);
    return { valid: true, message: "تم التحقق بنجاح." };
  },
};
