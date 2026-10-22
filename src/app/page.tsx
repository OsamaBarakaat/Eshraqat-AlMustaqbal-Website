import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { SearchEngine } from "@/components/home/search-engine";
import { FeaturedProperties } from "@/components/home/featured-properties";
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

      {/* 2. Interactive Search Engine Dock */}
      <SearchEngine />

      {/* 3. Featured Properties Showcase */}
      <FeaturedProperties initialProperties={properties} />

      {/* 4. Strategic Riyadh Neighborhoods Explorer */}
      <NeighborhoodsSection />

      {/* 5. Four Pillars of Excellence */}
      <VisionPillars />

      {/* 6. Testimonials & Client Trust */}
      <TestimonialsSection />
    </main>
  );
}
