import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiService } from "@/lib/api-service";
import { PropertyDetailClient } from "./property-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Open Graph & Twitter Cards Metadata for WhatsApp / Telegram preview
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await ApiService.getPropertyById(id);

  if (!property) {
    return {
      title: "العقار غير موجود | إشراقة المستقبل",
    };
  }

  const shareTitle = `${property.title} | إشراقة المستقبل`;
  const shareDescription = `للبيع في ${property.city} - ${property.district} • المساحة: ${property.area}م² • ${property.bedrooms} غرف نوم • السعر: ${property.price.toLocaleString("ar-SA")} ر.س. تفاصيل العرض والمعاينة المباشرة.`;
  const mainImage = property.images[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80";

  return {
    title: shareTitle,
    description: shareDescription,
    openGraph: {
      title: shareTitle,
      description: shareDescription,
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
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const props = await ApiService.getProperties();
  return props.map((p) => ({
    id: p.id,
  }));
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = await ApiService.getPropertyById(id);

  if (!property) {
    notFound();
  }

  const allProps = await ApiService.getProperties();
  const similarProperties = allProps.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <PropertyDetailClient property={property} similarProperties={similarProperties} />
  );
}
