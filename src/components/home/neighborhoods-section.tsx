"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Navigation, Compass, ArrowLeft, ArrowRight, Building, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function NeighborhoodsSection() {
  const { dir } = useLanguage();

  const neighborhoods = [
    {
      name: "حي حطين",
      nameEn: "Hittin District",
      badge: "الواجهة الأكثر طلباً",
      tagline: "نبض الفخامة بالقرب من بوليفارد رياض سيتي ومجمع الدرعية التاريخي",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      landmarks: ["5 دقائق من بوليفارد", "8 دقائق من KAFD", "مخارج مباشرة لطريق أنس بن مالك"],
      filterParam: "حي حطين",
    },
    {
      name: "حي النرجس",
      nameEn: "Al-Narjis District",
      badge: "النمو الاستثماري الأسرع",
      tagline: "مربعات سكنية هادئة وبنية تحتية متكاملة شمال الرياض",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      landmarks: ["10 دقائق من مطار الملك خالد", "قريب من محطة قطار الرياض", "مخططات راقية مكتملة الخدمات"],
      filterParam: "حي النرجس",
    },
    {
      name: "حي الملقا",
      nameEn: "Al-Malqa District",
      badge: "صفوة المجتمع والهدوء",
      tagline: "بيئة عائلية نموذجية مع أرقى المجمعات التجارية والمدارس العالمية",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      landmarks: ["دقيقتان من طريق الملك فهد", "ممشى رياضي ومساحات خضراء", "فلل مودرن بمساحات رحبة"],
      filterParam: "حي الملقا",
    },
    {
      name: "حي العقيق (KAFD)",
      nameEn: "Al-Aqeeq District",
      badge: "أفق الأعمال والعاصمة",
      tagline: "أبراج شاهقة وشقق بنتهاوس فاخرة بإطلالة مباشرة على المركز المالي",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      landmarks: ["ملاصق لمركز الملك عبد الله المالي", "خيارات إيجار واستثمار عالية العائد", "خدمات فندقية متكاملة"],
      filterParam: "حي العقيق",
    },
  ];

  return (
    <section className="py-24 bg-[#0D0D10] relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>التوزيع الجغرافي واستراتيجية المواقع</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            استكشف الحياة في أرقى أحياء العاصمة الرياض
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            نختار مواقع مشاريعنا السكنية والتجارية بدراسات دقيقة تركز على سهولة الوصول، جودة البنية التحتية، وقربها من المعالم الاستراتيجية الكبرى.
          </p>
        </div>

        {/* Neighborhoods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {neighborhoods.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#C5A059]/60 transition-all duration-300 bg-[#141418] shadow-2xl flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/60" />

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5A059] text-black shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>{item.badge}</span>
                  </span>
                </div>

                {/* Name */}
                <div className="absolute bottom-4 right-4">
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {item.name}
                  </h3>
                  <span className="text-xs font-mono text-[#F3E5AB]">
                    {item.nameEn}
                  </span>
                </div>
              </div>

              {/* Details & Landmarks */}
              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.tagline}
                </p>

                {/* Landmarks Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-[#C5A059] block">
                    أبرز نقاط القوة والمعالم:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.landmarks.map((l, lIdx) => (
                      <span
                        key={lIdx}
                        className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5"
                      >
                        <Navigation className="w-3 h-3 text-[#C5A059]" />
                        <span>{l}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore button */}
                <div className="pt-2">
                  <Link
                    href={`/properties?district=${encodeURIComponent(item.filterParam)}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C5A059] hover:text-[#D4AF37] group-hover:underline cursor-pointer"
                  >
                    <span>استعراض عقارات ومشاريع {item.name}</span>
                    {dir === "rtl" ? (
                      <ArrowLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
