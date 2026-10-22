import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency?: string, lang: string = "ar") {
  const isEn = lang === "en";
  const defaultCurrency = isEn ? "SAR" : "ر.س";
  const curr = currency && currency !== "ر.س" ? currency : defaultCurrency;
  const locale = isEn ? "en-US" : "ar-SA";
  return `${new Intl.NumberFormat(locale).format(price)} ${curr}`;
}

export function formatNumber(num: number, lang: string = "ar") {
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "ar-SA").format(num);
}
