import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiService } from "@/lib/api-service";
import { PropertyDetailClient } from "./property-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eshraqat-almustaqbal.com";

// Open Graph & SEO Metadata connected with Dashboard SEO Section
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await ApiService.getPropertyById(id);

  if (!property) {
    return {
      title: "العقار غير موجود | إشراقة المستقبل للتطوير العقاري",
    };
  }

  // 1. Title Priority: Custom SEO Title from Dashboard -> Fallback to Property Title + Brand
  const shareTitle = property.seoTitle && property.seoTitle.trim().length > 0
    ? property.seoTitle.trim()
    : `${property.title} | إشراقة المستقبل للتطوير العقاري`;

  const locationText = property.streetAddress
    ? `${property.city} - ${property.district} (${property.streetAddress})`
    : `${property.city} - ${property.district}`;

  const defaultDescription = `عقار للبيع في ${locationText} • المساحة: ${property.area} ${property.areaUnit || "م²"} • ${property.bedrooms ? `${property.bedrooms} غرف نوم • ` : ""}السعر: ${property.price.toLocaleString("ar-SA")} ${property.currency || "ر.س"}. تفاصيل العرض والمعاينة الميدانية المباشرة من إشراقة المستقبل.`;

  // 2. Description Priority: Custom Meta Description from Dashboard -> Fallback to specs description
  const shareDescription = property.metaDescription && property.metaDescription.trim().length > 0
    ? property.metaDescription.trim()
    : defaultDescription;

  const mainImage = property.images[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80";
  const canonicalUrl = `${siteUrl}/properties/${property.slug || id}`;

  // 3. Keywords strategy for Google Saudi Arabia
  const keywords = [
    property.title,
    `عقارات للبيع بالسعودية`,
    `عقارات للبيع في ${property.city}`,
    `عقارات حي ${property.district}`,
    `فلل للبيع في ${property.city}`,
    `شقق فاخرة ${property.city}`,
    `إشراقة المستقبل للتطوير العقاري`,
    property.category === "COMMERCIAL" ? "عقارات تجارية بالسعودية" : "عقارات سكنية فاخرة",
  ];

  return {
    title: shareTitle,
    description: shareDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: canonicalUrl,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: "website",
      locale: "ar_SA",
      siteName: "إشراقة المستقبل للتطوير العقاري",
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [mainImage],
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
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = await ApiService.getPropertyById(id);

  if (!property) {
    notFound();
  }

  const allProps = await ApiService.getProperties();
  const similarProperties = allProps.filter((p) => p.id !== property.id).slice(0, 3);

  const canonicalUrl = `${siteUrl}/properties/${property.slug || id}`;
  const mainImage = property.images[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80";

  // Google Schema.org Structured Data (JSON-LD) for Real Estate
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
          {
            "@type": "ListItem",
            "position": 3,
            "name": property.title,
            "item": canonicalUrl,
          },
        ],
      },
      {
        "@type": property.category === "COMMERCIAL" ? "RealEstateListing" : "SingleFamilyResidence",
        "name": property.seoTitle || property.title,
        "description": property.metaDescription || property.shortDescription || property.description,
        "url": canonicalUrl,
        "image": property.images.length > 0 ? property.images : [mainImage],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.city || "الرياض",
          "addressRegion": property.district || "منطقة الرياض",
          "streetAddress": property.streetAddress || property.district || "المملكة العربية السعودية",
          "addressCountry": "SA",
        },
        ...(property.latitude && property.longitude
          ? {
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": property.latitude,
                "longitude": property.longitude,
              },
            }
          : {}),
        ...(property.bedrooms
          ? {
              "numberOfRooms": property.bedrooms,
              "numberOfBedrooms": property.bedrooms,
            }
          : {}),
        ...(property.bathrooms
          ? {
              "numberOfBathroomsTotal": property.bathrooms,
            }
          : {}),
        ...(property.area
          ? {
              "floorSize": {
                "@type": "QuantitativeValue",
                "value": property.area,
                "unitCode": "MTK",
              },
            }
          : {}),
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": property.currency === "ر.س" || !property.currency ? "SAR" : property.currency,
          "priceValidUntil": "2026-12-31",
          "availability": property.status === "PUBLISHED" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
          "url": canonicalUrl,
          "seller": {
            "@type": "RealEstateAgent",
            "name": "إشراقة المستقبل للتطوير العقاري",
            "url": siteUrl,
          },
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
      <PropertyDetailClient property={property} similarProperties={similarProperties} />
    </>
  );
}
