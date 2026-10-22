"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Building2,
  Home,
  MapPin,
  Sparkles,
  RotateCcw,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  ApiService,
  FALLBACK_LOCATIONS,
  ProvinceItem,
  CityItem,
  DistrictItem,
} from "@/lib/api-service";
import { Property, PropertyType, PropertyPurpose } from "@/types/property";
import { PropertyCard } from "@/components/properties/property-card";
import { useLanguage } from "@/lib/i18n";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

const PAGE_SIZE = 12;

function PropertiesCatalogContent() {
  const { t, lang, dir } = useLanguage();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [locations, setLocations] = useState<ProvinceItem[]>(FALLBACK_LOCATIONS);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("ALL");
  const [selectedCityId, setSelectedCityId] = useState<string>("ALL");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(15000000);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync URL search params if present
  useEffect(() => {
    if (!searchParams) return;
    const purpose = searchParams.get("purpose");
    if (purpose) setSelectedPurpose(purpose.toUpperCase());

    const type = searchParams.get("type");
    if (type) setSelectedType(type.toUpperCase());

    const loc = searchParams.get("location") || searchParams.get("city");
    if (loc && loc !== "ALL") setSearchTerm(loc);

    const q = searchParams.get("search") || searchParams.get("q");
    if (q) setSearchTerm(q);
  }, [searchParams]);

  // 1. Fetch Dynamic Location Hierarchy from Backend API
  useEffect(() => {
    let isMounted = true;
    ApiService.getLocationsHierarchy().then((data) => {
      if (isMounted && data && data.length > 0) {
        setLocations(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch Live Properties from Backend API on Filter Change
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setCurrentPage(1); // Reset to first page on filter change

    const debounceTimer = setTimeout(() => {
      ApiService.getProperties({
        search: searchTerm,
        category: selectedType !== "ALL" ? selectedType : undefined,
        purpose: selectedPurpose !== "ALL" ? selectedPurpose : undefined,
        cityId: selectedCityId !== "ALL" ? selectedCityId : undefined,
        districtId: selectedDistrictId !== "ALL" ? selectedDistrictId : undefined,
        maxPrice,
      })
        .then((data) => {
          if (isMounted) {
            setProperties(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setIsLoading(false);
        });
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, selectedType, selectedPurpose, selectedCityId, selectedDistrictId, maxPrice]);

  // Flattened list of all cities across provinces
  const availableCities = useMemo(() => {
    const list: CityItem[] = [];
    for (const prov of locations) {
      if (Array.isArray(prov.cities)) {
        list.push(...prov.cities);
      }
    }
    return list;
  }, [locations]);

  // Dynamically compute available districts based on selected city
  const availableDistricts = useMemo(() => {
    if (selectedCityId === "ALL") {
      const allDists: DistrictItem[] = [];
      for (const city of availableCities) {
        if (Array.isArray(city.districts)) {
          allDists.push(...city.districts);
        }
      }
      return allDists;
    }
    const foundCity = availableCities.find((c) => c.id === selectedCityId);
    return foundCity?.districts || [];
  }, [selectedCityId, availableCities]);

  // When city changes, reset district
  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
    setSelectedDistrictId("ALL");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("ALL");
    setSelectedPurpose("ALL");
    setSelectedCityId("ALL");
    setSelectedDistrictId("ALL");
    setMaxPrice(15000000);
    setCurrentPage(1);
  };

  // Pagination calculations (strictly when properties.length > 12)
  const totalPages = Math.ceil(properties.length / PAGE_SIZE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return properties.slice(start, start + PAGE_SIZE);
  }, [properties, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  const startItemIndex = (currentPage - 1) * PAGE_SIZE + 1;
  const endItemIndex = Math.min(currentPage * PAGE_SIZE, properties.length);

  return (
    <div className="relative min-h-screen pt-32 pb-28 bg-[#09090B] text-foreground text-right overflow-hidden">
      {/* 1. Floating Golden Ambient Bubbles */}
      <FloatingGoldenBubbles />

      {/* 2. Main Page Content (relative z-10 over the floating bubbles) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 text-xs font-semibold shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>كتالوج العقارات والمشاريع المعتمدة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            استكشف أحدث العقارات المتاحة
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-light">
            مجموعة منتقاة بعناية من الفلل والقصور والشقق والمقرات التجارية في كافة مدن ومناطق المملكة، مربوطة مباشرة بقاعدة البيانات الرسمية مع ضمانات إنشائية وصكوك إلكترونية معتمدة.
          </p>
        </div>

        {/* Dynamic Filter Bar */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#141418]/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-5">
          {/* Top row: Search input & counts */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث بالاسم، المدينة، الحي، أو الكود..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] transition-colors"
              />
              <Search className="absolute top-3 left-3 w-4 h-4 text-zinc-400" />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-zinc-400 flex items-center gap-2">
                <span>المطابق:</span>
                <strong className="text-[#C5A059] font-mono text-sm">{properties.length}</strong>
                <span>عقار</span>
                {isLoading && <Loader2 className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />}
              </span>

              <button
                onClick={resetFilters}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
            </div>
          </div>

          {/* Bottom row: Dynamic 5 Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-white/5">
            {/* 1. Type */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">نوع العقار</label>
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
                <option value="COMMERCIAL">مباني تجارية ومكاتب</option>
                <option value="LAND">أراضي ومخططات</option>
              </select>
            </div>

            {/* 2. Purpose */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">الغرض</label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="ALL">الكل (بيع وإيجار)</option>
                <option value="SALE">للبيع</option>
                <option value="RENT">للإيجار</option>
              </select>
            </div>

            {/* 3. Dynamic City Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">المدينة</label>
              <select
                value={selectedCityId}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="ALL">كافة المدن والمناطق</option>
                {availableCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {lang === "ar" ? city.nameArabic : city.nameEnglish}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Dynamic District Dropdown (Depends on City) */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">
                الحي {selectedCityId !== "ALL" ? `(حسب المدينة)` : ""}
              </label>
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="ALL">كافة الأحياء</option>
                {availableDistricts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {lang === "ar" ? dist.nameArabic : dist.nameEnglish}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Max Price Range Slider */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">
                الحد الأقصى للسعر: <span className="font-mono text-[#C5A059]">{(maxPrice / 1000000).toFixed(1)}M ر.س</span>
              </label>
              <input
                type="range"
                min={500000}
                max={20000000}
                step={500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer mt-1"
              />
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        {isLoading ? (
          <div className="py-24 text-center rounded-3xl bg-[#141418]/60 border border-white/5 space-y-3">
            <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin mx-auto" />
            <p className="text-sm font-semibold text-zinc-300">جاري تحميل وتحديث العقارات من النظام...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#141418]/80 border border-white/5 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
              <Home className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-white">لا توجد عقارات مطابقة لمعايير البحث الحالية</p>
              <p className="text-xs text-zinc-400">جرب اختيار مدينة أخرى أو توسيع نطاق السعر والأحياء</p>
            </div>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C5A059] text-black hover:brightness-110 cursor-pointer shadow-lg shadow-[#C5A059]/20 transition-all"
            >
              عرض كافة العقارات
            </button>
          </div>
        ) : (
          <>
            {/* Properties Grid (12 items max per page) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination Controls - Strictly Hidden if Properties Count <= 12 */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Information Text */}
                <div className="text-xs text-zinc-400">
                  {lang === "ar" ? (
                    <span>
                      عرض <strong className="text-white font-mono">{startItemIndex} - {endItemIndex}</strong> من أصل{" "}
                      <strong className="text-[#C5A059] font-mono">{properties.length}</strong> عقار
                    </span>
                  ) : (
                    <span>
                      Showing <strong className="text-white font-mono">{startItemIndex} - {endItemIndex}</strong> of{" "}
                      <strong className="text-[#C5A059] font-mono">{properties.length}</strong> properties
                    </span>
                  )}
                </div>

                {/* Page Navigation Buttons */}
                <div className="flex items-center gap-1.5">
                  {/* Prev Button */}
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-[#141418] border border-white/5 text-zinc-300 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                    title={lang === "ar" ? "الصفحة السابقة" : "Previous Page"}
                  >
                    {dir === "rtl" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    <span className="hidden sm:inline">{lang === "ar" ? "السابق" : "Prev"}</span>
                  </button>

                  {/* Number Buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-lg shadow-[#C5A059]/30 scale-105"
                            : "bg-[#141418] border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-[#141418] border border-white/5 text-zinc-300 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                    title={lang === "ar" ? "الصفحة التالية" : "Next Page"}
                  >
                    <span className="hidden sm:inline">{lang === "ar" ? "التالي" : "Next"}</span>
                    {dir === "rtl" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function PropertiesCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 pb-24 bg-[#09090B] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
        </div>
      }
    >
      <PropertiesCatalogContent />
    </Suspense>
  );
}
