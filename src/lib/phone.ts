/**
 * Saudi Phone Number Normalization & Validation (Frontend)
 * Canonical format: +9665xxxxxxxx
 */

export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string;
  error?: string;
}

export function normalizeSaudiPhone(input: string): PhoneValidationResult {
  if (!input || typeof input !== "string") {
    return {
      isValid: false,
      normalized: "",
      error: "رقم الجوال مطلوب",
    };
  }

  // Remove spaces, hyphens, parentheses, dots
  let cleaned = input.trim().replace(/[\s\-\(\)\.]/g, "");

  // International 00 prefix
  if (cleaned.startsWith("00966")) {
    cleaned = "+966" + cleaned.slice(5);
  } else if (cleaned.startsWith("966") && !cleaned.startsWith("+")) {
    cleaned = "+" + cleaned;
  }

  // Starts with +966
  if (cleaned.startsWith("+966")) {
    let nationalPart = cleaned.slice(4);
    if (nationalPart.startsWith("0")) {
      nationalPart = nationalPart.slice(1);
    }
    if (/^5\d{8}$/.test(nationalPart)) {
      return { isValid: true, normalized: `+966${nationalPart}` };
    }
    return {
      isValid: false,
      normalized: "",
      error: "رقم الجوال السعودي يجب أن يتكون من 9 أرقام تبدأ بـ 5 (مثال: 565642556)",
    };
  }

  // Starts with local 05
  if (cleaned.startsWith("05")) {
    const nationalPart = cleaned.slice(1);
    if (/^5\d{8}$/.test(nationalPart)) {
      return { isValid: true, normalized: `+966${nationalPart}` };
    }
    return {
      isValid: false,
      normalized: "",
      error: "رقم الجوال المحلي يجب أن يتكون من 10 أرقام (05xxxxxxxx)",
    };
  }

  // Raw national 9-digit starting with 5 (e.g. 565642556)
  if (/^5\d{8}$/.test(cleaned)) {
    return { isValid: true, normalized: `+966${cleaned}` };
  }

  return {
    isValid: false,
    normalized: "",
    error: "صيغة رقم الجوال غير صحيحة. يرجى إدخال 9 أرقام تبدأ بـ 5 بدون مفتاح الدولة (مثال: 565642556)",
  };
}

export function isEmail(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
}
