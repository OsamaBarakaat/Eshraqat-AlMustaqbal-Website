import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { ClientAuthProvider } from "@/lib/client-auth";
import { CompareProvider } from "@/lib/compare-context";
import { InquiriesProvider } from "@/lib/inquiries-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CompareDock } from "@/components/compare/compare-dock";
import { ClientChatWidget } from "@/components/chat/client-chat-widget";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  title: "إشراقة المستقبل للتطوير العقاري | وجهة جديدة لحياة أرقى",
  description:
    "مشاريع سكنية وتجارية متكاملة في أرقى أحياء الرياض (النرجس، حطين، الملقا، العقيق). احجز معاينتك الميدانية واكتشف الفلل والقصور المعتمدة.",
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/favicon.ico" },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${plusJakartaSans.variable} dark scroll-smooth overflow-x-hidden max-w-[100vw]`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#09090B] text-[#EDEDED] font-arabic antialiased selection:bg-[#C5A059] selection:text-black overflow-x-hidden max-w-[100vw] w-full">
        <LanguageProvider>
          <ClientAuthProvider>
            <CompareProvider>
              <InquiriesProvider>
                <Suspense fallback={<div className="h-20 bg-[#09090B]" />}>
                  <Navbar />
                </Suspense>
                <div className="flex-1 w-full max-w-[100vw] overflow-x-hidden">{children}</div>
                <CompareDock />
                <ClientChatWidget />
                <Footer />
              </InquiriesProvider>
            </CompareProvider>
          </ClientAuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
