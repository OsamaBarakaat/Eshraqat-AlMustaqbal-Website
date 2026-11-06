import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { HomePropertiesSection } from "@/components/home/home-properties-section";
import { VisionPillars } from "@/components/home/vision-pillars";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { ApiService } from "@/lib/api-service";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eshraqat-almustaqbal.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "إشراقة المستقبل | عقارات للبيع بالسعودية والرياض • فلل، قصور ومشاريع فاخرة",
  description:
    "وجهتك الرائدة لشراء وتملك أرقى عقارات للبيع بالسعودية والرياض. مشاريع سكنية وتجارية متكاملة في أرقى أحياء الرياض (النرجس، حطين، الملقا، العقيق). احجز معاينتك الميدانية الفورية واكتشف عروضنا الحصرية المعتمدة.",
  keywords: [
    "عقارات للبيع بالسعودية",
    "عقارات للبيع في الرياض",
    "عقارات الرياض للبيع",
    "فلل للبيع بالرياض",
    "فلل فاخرة شمال الرياض",
    "قصور للبيع بالرياض",
    "شقق تمليك الرياض",
    "شقق فاخرة بالسعودية",
    "مشاريع سكنية في السعودية",
    "إشراقة المستقبل للتطوير العقاري",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "إشراقة المستقبل | عقارات للبيع بالسعودية والرياض • فلل وقصور فاخرة",
    description:
      "تصفح أحدث عقارات للبيع في السعودية والرياض مع إشراقة المستقبل للتطوير العقاري. فلل مودرن وقصور راقية وشقق تمليك.",
    url: siteUrl,
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
      "مشاريع سكنية وتجارية متكاملة في أرقى أحياء الرياض (النرجس، حطين، الملقا، العقيق).",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default async function HomePage() {
  const [properties, cmsConfig] = await Promise.all([
    ApiService.getProperties(),
    ApiService.getWebsiteConfig(),
  ]);

  const websiteSearchJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "إشراقة المستقبل للتطوير العقاري",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/properties?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSearchJsonLd) }}
      />
      <main className="min-h-screen bg-[#09090B] text-foreground">
        {/* 1. The Grand Luxury Hero Section */}
        <HeroSection homepageContent={cmsConfig?.homepage} />

        {/* 2. Interactive Search Engine & Live Properties Showcase */}
        <HomePropertiesSection initialProperties={properties} />

        {/* 3. Four Pillars of Excellence */}
        <VisionPillars homepageContent={cmsConfig?.homepage} />

        {/* 4. Testimonials & Client Trust */}
        <TestimonialsSection homepageContent={cmsConfig?.homepage} />

        {/* 5. Frequently Asked Questions (FAQ) Section linked to Dashboard CMS */}
        <FaqSection initialFaqs={cmsConfig?.faqs} />
      </main>
    </>
  );
}
