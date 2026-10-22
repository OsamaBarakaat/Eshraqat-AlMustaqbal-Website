import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { HomePropertiesSection } from "@/components/home/home-properties-section";
import { NeighborhoodsSection } from "@/components/home/neighborhoods-section";
import { VisionPillars } from "@/components/home/vision-pillars";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ApiService } from "@/lib/api-service";

export const metadata = {
  title: "إشراقة المستقبل | وجهة جديدة لحياة أرقى • فلل وقصور ومشاريع فاخرة بالرياض",
  description:
    "مشاريع سكنية وتجارية متكاملة في أرقى أحياء الرياض (النرجس، حطين، الملقا، العقيق). احجز معاينتك الميدانية الفورية واكتشف أرقى الفلل والقصور المعتمدة.",
};

export default async function HomePage() {
  const properties = await ApiService.getProperties();

  return (
    <main className="min-h-screen bg-[#09090B] text-foreground">
      {/* 1. The Grand Luxury Hero Section */}
      <HeroSection />

      {/* 2. Interactive Search Engine & Live Properties Showcase (Unified with bottom pills removed) */}
      <HomePropertiesSection initialProperties={properties} />

      {/* 3. Strategic Riyadh Neighborhoods Explorer (Commented out temporarily) */}
      {/* <NeighborhoodsSection /> */}

      {/* 4. Four Pillars of Excellence */}
      <VisionPillars />

      {/* 5. Testimonials & Client Trust */}
      <TestimonialsSection />
    </main>
  );
}
