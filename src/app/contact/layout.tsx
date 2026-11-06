import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا | إشراقة المستقبل للتطوير العقاري - حجز معاينة واستشارات",
  description:
    "تواصل مع فريق مستشاري إشراقة المستقبل للتطوير العقاري بالرياض. احجز موعد معاينة ميدانية فورية أو استفسر عن أحدث مشاريع الفلل والأراضي والشقق.",
  keywords: [
    "اتصل بنا إشراقة المستقبل",
    "حجز معاينة عقار بالرياض",
    "رقم شركة إشراقة المستقبل",
    "استشارات عقارية الرياض",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
