"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Building2, Flame } from "lucide-react";
import { Property, PropertyType } from "@/types/property";
import { useLanguage } from "@/lib/i18n";
import { PropertyCard } from "@/components/properties/property-card";

interface FeaturedPropertiesProps {
  initialProperties: Property[];
}

export function FeaturedProperties({ initialProperties }: FeaturedPropertiesProps) {
  const { dir, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filterTabs = [
    { id: "ALL", label: "جميع العروض الحصرية" },
    { id: "VILLA", label: "فلل وقصور" },
    { id: "APARTMENT", label: "شقق وبنتهاوس" },
    { id: "COMMERCIAL", label: "مشاريع تجارية" },
  ];

  const filtered = initialProperties.filter((p) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "VILLA") return p.type === "VILLA" || p.type === "PALACE";
    if (activeFilter === "APARTMENT") return p.type === "APARTMENT" || p.type === "PENTHOUSE";
    if (activeFilter === "COMMERCIAL") return p.type === "COMMERCIAL";
    return true;
  });

  return (
    <section id="properties" className="py-24 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold mb-3">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>مختارات فاخرة حصرية</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              أحدث العقارات المتاحة للبيع والاستثمار
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
              تصفح نخبة من مشاريعنا السكنية والتجارية المطروحة حالياً في أرقى أحياء الرياض، مع ضمانات إنشائية معتمدة وصكوك إلكترونية فورية.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#141418] border border-white/10 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-md shadow-[#C5A059]/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Bottom CTA to view all properties */}
        <div className="text-center pt-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-[#1C1C22] hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/40 hover:border-[#C5A059] transition-all shadow-lg cursor-pointer group"
          >
            <span>استعراض كافة العقارات والمشاريع المطروحة</span>
            {dir === "rtl" ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </div>
      </div>
    </section>
  );
}
