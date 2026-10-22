"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Home,
  Banknote,
  Flame,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/properties/property-card";
import { useLanguage } from "@/lib/i18n";
import { ApiService, FALLBACK_LOCATIONS, ProvinceItem } from "@/lib/api-service";

interface HomePropertiesSectionProps {
  initialProperties: Property[];
}

export function HomePropertiesSection({ initialProperties }: HomePropertiesSectionProps) {
  const router = useRouter();
  const { t, lang, dir } = useLanguage();

  // Active Search & Filter state
  const [activeTab, setActiveTab] = useState<"ALL" | "SALE" | "RENT" | "INVESTMENT">("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [locations, setLocations] = useState<ProvinceItem[]>(FALLBACK_LOCATIONS);

  useEffect(() => {
    ApiService.getLocationsHierarchy().then((data) => {
      if (data && data.length > 0) {
        setLocations(data);
      }
    });
  }, []);

  // Filter properties based strictly on the upper search engine controls
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // 1. Purpose filter
      if (activeTab === "SALE" && property.purpose !== "SALE") return false;
      if (activeTab === "RENT" && property.purpose !== "RENT") return false;
      if (activeTab === "INVESTMENT" && property.purpose !== "INVESTMENT" && property.purpose !== "SALE") {
        return false;
      }

      // 2. Type filter
      if (selectedType !== "ALL") {
        if (selectedType === "VILLA" && property.type !== "VILLA" && property.type !== "PALACE") {
          return false;
        } else if (selectedType === "APARTMENT" && property.type !== "APARTMENT" && property.type !== "PENTHOUSE") {
          return false;
        } else if (selectedType !== "VILLA" && selectedType !== "APARTMENT" && property.type !== selectedType) {
          return false;
        }
      }

      // 3. Location filter (City / District)
      if (selectedLocation !== "ALL") {
        const locLower = selectedLocation.toLowerCase();
        const cityMatch = property.city?.toLowerCase().includes(locLower);
        const districtMatch = property.district?.toLowerCase().includes(locLower);
        if (!cityMatch && !districtMatch) return false;
      }

      // 4. Price range filter
      if (selectedPriceRange !== "ALL") {
        const [minStr, maxStr] = selectedPriceRange.split("-");
        const min = Number(minStr) || 0;
        const max = Number(maxStr) || Infinity;
        if (property.price < min || property.price > max) return false;
      }

      return true;
    });
  }, [initialProperties, activeTab, selectedType, selectedLocation, selectedPriceRange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Smooth scroll down to the properties results grid
    const target = document.getElementById("properties-showcase");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    setActiveTab("ALL");
    setSelectedType("ALL");
    setSelectedLocation("ALL");
    setSelectedPriceRange("ALL");
  };

  return (
    <div className="relative">
      {/* ================= 1. THE UPPER SEARCH ENGINE DOCK ================= */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-8 sm:-mt-10">
        <div className="p-4 sm:p-6 rounded-3xl bg-[#141418]/95 backdrop-blur-2xl border border-[#C5A059]/30 shadow-2xl shadow-black/90 space-y-4">
          {/* Purpose Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
            {[
              { id: "ALL", labelAr: "جميع العقارات", labelEn: "All Properties" },
              { id: "SALE", labelAr: "شراء", labelEn: "Buy / For Sale" },
              { id: "RENT", labelAr: "إيجار", labelEn: "Rent" },
              { id: "INVESTMENT", labelAr: "استثمار", labelEn: "Invest" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-md shadow-[#C5A059]/25 scale-105"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {lang === "ar" ? tab.labelAr : tab.labelEn}
                </button>
              );
            })}
          </div>

          {/* Filter Controls Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end"
          >
            {/* 1. Property Type */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 text-right">
                {t("search.type_label")}
              </label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] text-right cursor-pointer"
                >
                  <option value="ALL">{t("search.type_placeholder")}</option>
                  <option value="VILLA">فلل وقصور سكنية</option>
                  <option value="APARTMENT">شقق وبنتهاوس</option>
                  <option value="COMMERCIAL">مباني ومقرات تجارية</option>
                  <option value="LAND">أراضي ومخططات</option>
                </select>
                <Home className="absolute top-3.5 left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
            </div>

            {/* 2. Dynamic Location (Provinces & Cities) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 text-right">
                {t("search.location_label")}
              </label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] text-right cursor-pointer"
                >
                  <option value="ALL">{t("search.location_placeholder")}</option>
                  {locations.map((prov) => (
                    <optgroup key={prov.id} label={lang === "ar" ? prov.nameArabic : prov.nameEnglish}>
                      {prov.cities?.map((city) => (
                        <option key={city.id} value={city.nameArabic}>
                          {lang === "ar" ? city.nameArabic : city.nameEnglish}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <MapPin className="absolute top-3.5 left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
            </div>

            {/* 3. Price Range */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 text-right">
                {t("search.price_label")}
              </label>
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] text-right cursor-pointer"
                >
                  <option value="ALL">{t("search.price_placeholder")}</option>
                  <option value="0-2000000">أقل من 2 مليون ر.س</option>
                  <option value="2000000-5000000">2 مليون - 5 مليون ر.س</option>
                  <option value="5000000-10000000">5 مليون - 10 مليون ر.س</option>
                  <option value="10000000-99999999">أكثر من 10 مليون ر.س (VIP)</option>
                </select>
                <Banknote className="absolute top-3.5 left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
            </div>

            {/* 4. Search Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <Search className="w-4 h-4" />
                <span>{t("search.button")}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= 2. THE PROPERTIES SHOWCASE SECTION ================= */}
      <section id="properties-showcase" className="py-24 bg-[#09090B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header (Bottom filter pills completely removed!) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold mb-3">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>مختارات فاخرة حصرية</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                أحدث العقارات المتاحة للبيع والاستثمار
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
                تصفح نخبة من مشاريعنا السكنية والتجارية المطروحة حالياً، مع ضمانات إنشائية معتمدة وصكوك إلكترونية فورية.
              </p>
            </div>

            {/* Matching Properties Count & Reset Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400">
                المطابق: <strong className="text-[#C5A059] font-mono text-sm">{filteredProperties.length}</strong> عقار
              </span>

              {(activeTab !== "ALL" || selectedType !== "ALL" || selectedLocation !== "ALL" || selectedPriceRange !== "ALL") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط</span>
                </button>
              )}
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-[#141418]/80 border border-white/5 space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                <Home className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">لا توجد عقارات مطابقة لخيارات الفلترة المحددة</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  جرب تغيير خيار الغرض (شراء/إيجار) أو الموقع لعرض العقارات المتاحة.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#C5A059] text-black hover:brightness-110 shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer"
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

          {/* Bottom CTA to View Full Catalog */}
          <div className="text-center pt-6">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-[#1C1C22] hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/40 hover:border-[#C5A059] transition-all shadow-lg cursor-pointer group"
            >
              <span>استعراض كافة العقارات والمشاريع في الكتالوج الكامل</span>
              {dir === "rtl" ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
