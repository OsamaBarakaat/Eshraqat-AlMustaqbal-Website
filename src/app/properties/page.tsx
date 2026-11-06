import React from "react";
import type { Metadata } from "next";
import { PropertiesCatalogClient } from "./properties-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eshraqat-almustaqbal.com";

export const metadata: Metadata = {
  title: "عقارات للبيع بالسعودية والرياض | فلل، قصور وشقق فاخرة - إشراقة المستقبل",
  description:
    "تصفح أفضل عقارات للبيع في السعودية والرياض مع إشراقة المستقبل للتطوير العقاري. فلل سكنية مودرن، شقق تمليك فاخرة، قصور ومشاريع استثمارية في أرقى أحياء الرياض (النرجس، حطين، الملقا، العقيق). احجز معاينتك الآن.",
  keywords: [
    "عقارات للبيع بالسعودية",
    "عقارات للبيع في الرياض",
    "عقارات الرياض للبيع",
    "فلل للبيع بالرياض",
    "فلل للبيع حي النرجس",
    "فلل للبيع حي حطين",
    "شقق تمليك فاخرة بالرياض",
    "شقق للبيع شمال الرياض",
    "قصور للبيع بالرياض",
    "أراضي للبيع في الرياض",
    "إشراقة المستقبل للتطوير العقاري",
    "مشاريع سكنية في السعودية",
  ],
  alternates: {
    canonical: `${siteUrl}/properties`,
  },
  openGraph: {
    title: "عقارات للبيع بالسعودية والرياض | إشراقة المستقبل للتطوير العقاري",
    description:
      "تصفح أحدث عقارات للبيع في السعودية والرياض. عروض حصرية للفلل والقصور والشقق الفاخرة المعتمدة.",
    url: `${siteUrl}/properties`,
    type: "website",
    locale: "ar_SA",
    siteName: "إشراقة المستقبل للتطوير العقاري",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "عقارات للبيع بالسعودية - إشراقة المستقبل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "عقارات للبيع بالسعودية والرياض | إشراقة المستقبل",
    description:
      "تصفح أرقى الفلل والشقق والقصور المتاحة للبيع في الرياض والمملكة العربية السعودية.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function PropertiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "عقارات للبيع بالسعودية",
            "item": `${siteUrl}/properties`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "name": "عقارات للبيع بالسعودية والرياض | إشراقة المستقبل",
        "url": `${siteUrl}/properties`,
        "description":
          "كتالوج العقارات المعتمدة للبيع في السعودية والرياض: فلل، شقق، قصور، وأراضي سكنية وتجارية.",
        "isPartOf": {
          "@type": "WebSite",
          "name": "إشراقة المستقبل للتطوير العقاري",
          "url": siteUrl,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertiesCatalogClient />
    </>
  );
}
