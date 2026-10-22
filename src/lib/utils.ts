import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "ر.س") {
  return `${new Intl.NumberFormat("ar-SA").format(price)} ${currency}`;
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("ar-SA").format(num);
}
