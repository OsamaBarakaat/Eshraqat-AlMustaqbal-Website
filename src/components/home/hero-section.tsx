"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Play,
  ArrowLeft,
  ArrowRight,
  Users2,
  Building,
  Award,
  HeartHandshake,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  X,
  Search,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ApiService, FALLBACK_LOCATIONS, ProvinceItem } from "@/lib/api-service";

const heroDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "Asia/Riyadh",
});

interface HeroSectionProps {
  homepageContent?: {
    heroTitle?: string;
    heroSubtitle?: string;
    ctaLabel?: string;
    ctaLink?: string;
    heroBannerImage?: string;
    badgeText?: string;
  };
}

export function HeroSection({ homepageContent }: HeroSectionProps = {}) {
  const router = useRouter();
  const { t, dir, lang } = useLanguage();
  const currentDate = heroDateFormatter
    .formatToParts(new Date())
    .filter(({ type }) => type === "day" || type === "month")
    .map(({ value }) => value)
    .join(" / ");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Search by City / Location state
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [locations, setLocations] = useState<ProvinceItem[]>(FALLBACK_LOCATIONS);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ApiService.getLocationsHierarchy().then((data) => {
      if (data && data.length > 0) {
        setLocations(data);
      }
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Flatten cities and districts for autosuggest
  const suggestedLocations = React.useMemo(() => {
    const items: Array<{
      id: string;
      titleArabic: string;
      titleEnglish: string;
      provinceArabic: string;
      type: "CITY" | "DISTRICT";
      cityName?: string;
    }> = [];

    locations.forEach((prov) => {
      prov.cities?.forEach((city) => {
        items.push({
          id: city.id,
          titleArabic: city.nameArabic,
          titleEnglish: city.nameEnglish,
          provinceArabic: prov.nameArabic,
          type: "CITY",
        });
        city.districts?.forEach((dist) => {
          items.push({
            id: dist.id,
            titleArabic: dist.nameArabic,
            titleEnglish: dist.nameEnglish,
            provinceArabic: `${prov.nameArabic} • ${city.nameArabic}`,
            type: "DISTRICT",
            cityName: city.nameArabic,
          });
        });
      });
    });

    if (!searchQuery.trim()) {
      return items.slice(0, 7);
    }

    const q = searchQuery.toLowerCase().trim();
    return items
      .filter(
        (it) =>
          it.titleArabic.toLowerCase().includes(q) ||
          it.titleEnglish.toLowerCase().includes(q) ||
          it.provinceArabic.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [locations, searchQuery]);

  const handleSelectLocation = (locName: string) => {
    setSearchQuery(locName);
    setIsDropdownOpen(false);
    router.push(`/properties?location=${encodeURIComponent(locName)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsDropdownOpen(false);
      router.push(`/properties?location=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/properties");
    }
  };

  const stats = [
    { value: "500+", label: t("hero.units"), icon: Users2 },
    { value: "25+", label: t("hero.projects_count"), icon: Building },
    { value: "10+", label: t("hero.years"), icon: Award },
    { value: "1000+", label: t("hero.happy_clients"), icon: HeartHandshake },
  ];

  const categories = [
    {
      title: t("showcase.villas"),
      subtitle: t("showcase.villas_sub"),
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
      href: "/properties?type=VILLA",
    },
    {
      title: t("showcase.apartments"),
      subtitle: t("showcase.apartments_sub"),
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      href: "/properties?type=APARTMENT",
    },
    {
      title: t("showcase.commercial"),
      subtitle: t("showcase.commercial_sub"),
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      href: "/properties?type=COMMERCIAL",
    },
  ];

  return (
    <>
      <section className="relative min-h-0 sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-14 bg-[#09090B] overflow-hidden">
        {/* Background Image with Brighter Luxurious Visibility */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={
              homepageContent?.heroBannerImage ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=95"
            }
            alt="Eshraqat Al-Mustaqbal Luxury Architecture"
            className="w-full h-full object-cover object-center scale-105 brightness-115 contrast-105 animate-in fade-in zoom-in-105 duration-1000"
          />
          {/* Gentle, balanced gradients to let the image shine through brilliantly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/20 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A059]/15 via-transparent to-transparent" />
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Main Content Hero Container */}
        <div className="relative z-30 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Start Column: Hero Headline & Narrative (Structured at the start) */}
            <div
              className={`lg:col-span-8 ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              <div className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-black/50 lg:bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl space-y-3.5 sm:space-y-6 max-w-3xl">
                {/* Badge Tag from Dashboard if present */}
                {homepageContent?.badgeText && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 text-[10px] sm:text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{homepageContent.badgeText}</span>
                  </div>
                )}

                {/* Huge Luxury Title */}
                <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.25] sm:leading-[1.15] tracking-tight">
                  {lang === "ar" && homepageContent?.heroTitle ? (
                    (() => {
                      const words = homepageContent.heroTitle.trim().split(" ");
                      const mid = Math.ceil(words.length / 2);
                      const part1 = words.slice(0, mid).join(" ");
                      const part2 = words.slice(mid).join(" ");
                      return (
                        <>
                          <span className="block masked-text font-black">{part1}</span>
                          {part2 && <span className="block masked-text-gold font-black">{part2}</span>}
                        </>
                      );
                    })()
                  ) : (
                    <>
                      <span className="block masked-text font-black">
                        {t("hero.title_part1")}
                      </span>
                      <span className="block masked-text-gold font-black">
                        {t("hero.title_part2")}
                      </span>
                    </>
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-base lg:text-lg text-zinc-200 max-w-2xl leading-relaxed font-light drop-shadow-sm">
                  {lang === "ar" && homepageContent?.heroSubtitle
                    ? homepageContent.heroSubtitle
                    : t("hero.subtitle")}
                </p>

                {/* Luxury Glassmorphic Location Search Bar */}
                <div ref={searchContainerRef} className="relative w-full max-w-xl pt-1 sm:pt-2 z-50">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="relative flex items-center bg-[#141418]/90 hover:bg-[#18181D] focus-within:bg-[#18181D] backdrop-blur-xl rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl border border-white/20 focus-within:border-[#C5A059] focus-within:ring-4 focus-within:ring-[#C5A059]/15 transition-all">
                      <div className="flex-1 flex items-center px-2 sm:px-3 gap-2 min-w-0">
                        <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsDropdownOpen(true);
                          }}
                          onFocus={() => setIsDropdownOpen(true)}
                          placeholder={
                            lang === "ar"
                              ? "أدخل اسم المدينة أو الحي (الرياض، جدة...)"
                              : "Enter a city, neighborhood, or district..."
                          }
                          className="w-full bg-transparent text-white placeholder-zinc-400 text-xs sm:text-sm font-medium outline-none py-1.5 sm:py-2 text-right selection:bg-[#C5A059] selection:text-black min-w-0"
                          dir={dir}
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery("");
                              setIsDropdownOpen(false);
                            }}
                            className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors mx-1 cursor-pointer shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#997736] hover:brightness-110 active:scale-[0.98] text-black font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer shrink-0"
                      >
                        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        <span>{lang === "ar" ? "بحث" : "Search"}</span>
                      </button>
                    </div>
                  </form>

                  {/* Autosuggest Dropdown Menu (Luxurious Dark Gold Glassmorphic) */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2.5 bg-[#141418]/98 backdrop-blur-3xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/20 overflow-hidden z-50 text-right animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>
                            {lang === "ar"
                              ? "أبرز المدن والأحياء العقارية المتاحة"
                              : "Available Cities & Districts"}
                          </span>
                        </span>
                        <span className="text-[10px] text-[#C5A059] font-mono bg-[#C5A059]/10 px-2 py-0.5 rounded-full border border-[#C5A059]/20">
                          {suggestedLocations.length} موقع
                        </span>
                      </div>

                      <div className="max-h-56 overflow-y-auto divide-y divide-white/5 scrollbar-thin scrollbar-thumb-[#C5A059]/30">
                        {suggestedLocations.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectLocation(item.titleArabic)}
                            className="w-full px-4 py-3 text-right hover:bg-white/10 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-[#C5A059]/20 group-hover:text-[#C5A059] text-zinc-400 flex items-center justify-center shrink-0 transition-colors border border-white/5 group-hover:border-[#C5A059]/30">
                                <MapPin className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-[#C5A059] transition-colors">
                                  {lang === "ar" ? item.titleArabic : item.titleEnglish}
                                </span>
                                <span className="block text-[10px] text-zinc-400">
                                  {item.provinceArabic}
                                </span>
                              </div>
                            </div>

                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 group-hover:bg-[#C5A059]/20 text-zinc-300 group-hover:text-[#C5A059] border border-white/5 group-hover:border-[#C5A059]/30 transition-colors">
                              {item.type === "CITY" ? (lang === "ar" ? "مدينة" : "City") : (lang === "ar" ? "حي" : "District")}
                            </span>
                          </button>
                        ))}

                        {suggestedLocations.length === 0 && (
                          <div className="px-4 py-8 text-center text-xs text-zinc-400">
                            {lang === "ar"
                              ? "لا توجد نتائج مطابقة لاسم المدينة أو الحي المدخل"
                              : "No matching cities or districts found"}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Left Column: Subtle Architectural Editorial Statement (RTL in Arabic / LTR in English) */}
            <div
              className={`hidden lg:flex lg:col-span-4 flex-col justify-between h-full ${
                dir === "rtl"
                  ? "text-right pr-6 border-r border-white/15"
                  : "text-left pl-6 border-l border-white/15"
              }`}
            >
              <div className="space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#C5A059] font-bold">{currentDate}</span>
                <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-xs drop-shadow-sm">
                  {lang === "ar" ? (
                    <>
                      نبني أكثر من مبانٍ..
                      <br />
                      نبني مستقبلاً أفضل يلهم الأجيال.
                    </>
                  ) : (
                    <>
                      Building more than structures..
                      <br />
                      shaping a future that inspires generations.
                    </>
                  )}
                </p>
              </div>

              <div className="pt-20">
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-md max-w-xs shadow-xl">
                  <div className="flex items-center gap-2 text-xs text-[#C5A059] font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lang === "ar" ? "الرياض • المملكة العربية السعودية" : "Riyadh • Saudi Arabia"}</span>
                  </div>
                  {/* <p className="text-[11px] text-zinc-300">
                    {lang === "ar"
                      ? "مشاريع نوعية في أرقى أحياء الرياض."
                      : "Prime development projects in prestigious Riyadh."}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Showcase Cards */}
        <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full mt-6 sm:mt-12 space-y-4 sm:space-y-6">
          {/* 2. Floating Showcase Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className={`group relative h-20 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-[#C5A059]/60 transition-all p-2.5 sm:p-4 flex flex-col justify-end cursor-pointer ${
                  dir === "rtl" ? "text-right" : "text-left"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                <div
                  className={`relative z-10 flex items-end justify-between gap-1.5 sm:gap-2 ${
                    dir === "rtl" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-black/60 border border-white/20 group-hover:bg-[#C5A059] group-hover:text-black text-white flex items-center justify-center transition-colors shrink-0">
                    {dir === "rtl" ? (
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[11px] sm:text-sm font-bold text-white group-hover:text-[#C5A059] transition-colors truncate leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[8px] sm:text-[11px] text-zinc-300 font-light truncate hidden xs:block sm:block">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {/* 4th Card: Strategic Riyadh Map Explorer */}
            <Link
              href="/properties"
              className={`group relative h-20 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden border border-[#C5A059]/40 hover:border-[#C5A059] transition-all p-2.5 sm:p-4 flex flex-col justify-end bg-gradient-to-br from-[#1C1C22] to-[#0D0D0F] cursor-pointer ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`relative z-10 flex items-end justify-between gap-1.5 sm:gap-2 ${
                  dir === "rtl" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#C5A059] text-black flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                </div>
                <div className="min-w-0">
                  <div
                    className={`flex items-center gap-1 text-[#C5A059] text-[8px] sm:text-xs font-bold mb-0.5 ${
                      dir === "rtl" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{lang === "ar" ? "الرياض" : "Riyadh"}</span>
                  </div>
                  <h3 className="text-[11px] sm:text-sm font-bold text-white truncate leading-tight">
                    {t("showcase.lands")}
                  </h3>
                  <p className="text-[8px] sm:text-[10px] text-zinc-400 truncate hidden xs:block sm:block">
                    {t("showcase.map_link")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Cinema Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Eshraqat Al-Mustaqbal Presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
