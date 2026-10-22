"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Building2,
  Home,
  MapPin,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { FALLBACK_PROPERTIES } from "@/lib/api-service";
import { Property, PropertyType, PropertyPurpose } from "@/types/property";
import { PropertyCard } from "@/components/properties/property-card";
import { useLanguage } from "@/lib/i18n";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

export default function PropertiesCatalogPage() {
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(10000000);

  const filteredProperties = useMemo(() => {
    return FALLBACK_PROPERTIES.filter((p) => {
      // Type
      if (selectedType !== "ALL" && p.type !== selectedType) return false;
      // Purpose
      if (selectedPurpose !== "ALL" && p.purpose !== selectedPurpose) return false;
      // District
      if (selectedDistrict !== "ALL" && !p.district.includes(selectedDistrict)) return false;
      // Price
      if (p.price > maxPrice) return false;
      // Keyword
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesDistrict = p.district.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesDistrict) return false;
      }
      return true;
    });
  }, [selectedType, selectedPurpose, selectedDistrict, maxPrice, searchTerm]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("ALL");
    setSelectedPurpose("ALL");
    setSelectedDistrict("ALL");
    setMaxPrice(10000000);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground text-right overflow-hidden">
      {/* Floating Golden Ambient Bubbles */}
      <FloatingGoldenBubbles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>كتالوج العقارات والمشاريع المعتمدة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            استكشف أحدث العقارات المتاحة
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-light">
            مجموعة منتقاة بعناية من الفلل والقصور والشقق والمقرات التجارية في أكثر أحياء الرياض تميزاً واستقراراً، مع ضمانات إنشائية وصكوك إلكترونية معتمدة.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-5 rounded-3xl bg-[#141418] border border-white/10 shadow-2xl space-y-4">
          {/* Top row: Search input & counts */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث بالاسم، الحي، أو الكود..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-[#C5A059]"
              />
              <Search className="absolute top-3 left-3 w-4 h-4 text-zinc-400" />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-zinc-400">
                المطابق: <strong className="text-[#C5A059] font-mono text-sm">{filteredProperties.length}</strong> عقار
              </span>

              <button
                onClick={resetFilters}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
            </div>
          </div>

          {/* Bottom row: Filter Selects */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5">
            {/* Type */}
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">نوع العقار</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="ALL">جميع الأنواع</option>
                <option value="VILLA">فلل فاخرة</option>
                <option value="PALACE">قصور ملكية</option>
                <option value="PENTHOUSE">بنتهاوس ورووف</option>
                <option value="APARTMENT">شقق سكنية</option>
                <option value="COMMERCIAL">مباني تجارية</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">الغرض</label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="ALL">الكل (بيع وإيجار)</option>
                <option value="SALE">للبيع</option>
                <option value="RENT">للإيجار</option>
                <option value="INVESTMENT">فرصة استثمارية</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">الحي بالرياض</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="ALL">كافة الأحياء</option>
                <option value="النرجس">حي النرجس</option>
                <option value="حطين">حي حطين</option>
                <option value="الملقا">حي الملقا</option>
                <option value="العقيق">حي العقيق</option>
              </select>
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                الحد الأقصى للسعر: <span className="font-mono text-[#C5A059]">{(maxPrice / 1000000).toFixed(1)}M</span>
              </label>
              <input
                type="range"
                min={1000000}
                max={10000000}
                step={500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProperties.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#141418] border border-white/5 space-y-3">
            <p className="text-base font-bold text-white">لا توجد عقارات مطابقة لمعايير البحث الحالية</p>
            <p className="text-xs text-zinc-500">جرب تخفيف شروط التصفية أو تغيير نطاق السعر أو الحي</p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#C5A059] text-black hover:brightness-110 cursor-pointer"
            >
              عرض كافة العقارات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
