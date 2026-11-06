import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | شركة إشراقة المستقبل للتطوير العقاري بالرياض",
  description:
    "تعرف على شركة إشراقة المستقبل للتطوير العقاري، رؤيتنا في تطوير مجتمعات سكنية عصرية، وفريق خبرائنا المعتمدين في المملكة العربية السعودية.",
  keywords: [
    "من نحن إشراقة المستقبل",
    "شركة عقارات بالرياض",
    "شركات التطوير العقاري بالسعودية",
    "تطوير عقاري الرياض",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
