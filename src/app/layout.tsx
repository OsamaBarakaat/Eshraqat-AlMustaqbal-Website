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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eshraqat-almustaqbal.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "إشراقة المستقبل | عقارات للبيع بالسعودية والرياض • فلل وقصور فاخرة",
    template: "%s | إشراقة المستقبل للتطوير العقاري",
  },
  description:
    "بوابتك الأولى لامتلاك أرقى عقارات للبيع بالسعودية والرياض. فلل مودرن، قصور فاخرة، شقق تمليك ومشاريع سكنية وتجارية متكاملة بأرقى أحياء الرياض (النرجس، حطين، الملقا، العقيق).",
  keywords: [
    "عقارات للبيع بالسعودية",
    "عقارات للبيع في الرياض",
    "عقارات الرياض",
    "فلل للبيع بالرياض",
    "فلل فاخرة للبيع بالسعودية",
    "قصور للبيع شمال الرياض",
    "شقق تمليك بالرياض",
    "شقق للبيع بالرياض",
    "أراضي للبيع في الرياض",
    "مشاريع سكنية الرياض",
    "إشراقة المستقبل للتطوير العقاري",
    "تطوير عقاري السعودية",
    "استثمار عقاري الرياض",
  ],
  authors: [{ name: "إشراقة المستقبل للتطوير العقاري", url: siteUrl }],
  creator: "إشراقة المستقبل للتطوير العقاري",
  publisher: "إشراقة المستقبل للتطوير العقاري",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "إشراقة المستقبل | عقارات للبيع بالسعودية والرياض • فلل وقصور فاخرة",
    description:
      "تصفح أفضل الفلل والشقق والقصور المعتمدة للبيع في أرقى أحياء الرياض. معاينة ميدانية واستشارات عقارية متخصصة.",
    url: siteUrl,
    siteName: "إشراقة المستقبل للتطوير العقاري",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "إشراقة المستقبل للتطوير العقاري بالسعودية",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "إشراقة المستقبل | عقارات للبيع بالسعودية والرياض",
    description:
      "مشاريع سكنية وتجارية متكاملة في أرقى أحياء الرياض. اكتشف الفلل والقصور المعتمدة.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/favicon.ico" },
    ],
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const companyJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "إشراقة المستقبل للتطوير العقاري",
    "alternateName": "Eshraqat Al-Mustaqbal Real Estate Development",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "description": "شركة متخصصة في تطوير وتسويق العقارات والفلل والقصور الفاخرة في مدينة الرياض والمملكة العربية السعودية.",
    "telephone": "+966500000000",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "طريق الملك فهد",
      "addressLocality": "الرياض",
      "addressRegion": "منطقة الرياض",
      "addressCountry": "SA",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753,
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "المملكة العربية السعودية",
      },
      {
        "@type": "City",
        "name": "الرياض",
      },
    ],
    "sameAs": [
      "https://twitter.com",
      "https://instagram.com",
      "https://linkedin.com",
    ],
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${plusJakartaSans.variable} dark scroll-smooth overflow-x-hidden max-w-[100vw]`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(companyJsonLd) }}
        />
      </head>
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
