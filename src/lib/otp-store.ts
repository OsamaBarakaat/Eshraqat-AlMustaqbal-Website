// In-memory OTP storage for client email verification
// Automatically expires after 5 minutes

interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}

const otpMap = new Map<string, OtpEntry>();

export const OtpService = {
  createOtp(email: string): string {
    const cleanEmail = email.trim().toLowerCase();
    // Generate secure 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpMap.set(cleanEmail, {
      otp: code,
      expiresAt,
      attempts: 0,
    });

    console.log(`[AUTH OTP] Code for ${cleanEmail}: ${code} (valid for 5 mins)`);
    return code;
  },

  verifyOtp(email: string, inputOtp: string): { valid: boolean; message: string } {
    const cleanEmail = email.trim().toLowerCase();
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

    if (entry.otp !== inputOtp.trim()) {
      entry.attempts += 1;
      return { valid: false, message: "رمز التحقق غير صحيح، حاول مرة أخرى." };
    }

    // Success - consume OTP
    otpMap.delete(cleanEmail);
    return { valid: true, message: "تم التحقق بنجاح." };
  },
};
