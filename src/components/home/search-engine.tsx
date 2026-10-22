"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, Banknote, Filter, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function SearchEngine() {
  const router = useRouter();
  const { t, lang, dir } = useLanguage();

  const [activeTab, setActiveTab] = useState<"SALE" | "RENT" | "INVESTMENT">("SALE");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    query.set("purpose", activeTab);
    if (selectedType) query.set("type", selectedType);
    if (selectedDistrict) query.set("district", selectedDistrict);
    if (selectedPrice) query.set("priceRange", selectedPrice);

    router.push(`/properties?${query.toString()}`);
  };

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-8 sm:-mt-10">
      <div className="p-4 sm:p-6 rounded-3xl bg-[#141418]/95 backdrop-blur-2xl border border-[#C5A059]/30 shadow-2xl shadow-black/90">
        {/* Purpose Tabs */}
        <div className="flex items-center gap-2 mb-5 border-b border-white/10 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("SALE")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "SALE"
                ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-md shadow-[#C5A059]/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {t("search.tab_buy")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("RENT")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "RENT"
                ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-md shadow-[#C5A059]/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {t("search.tab_rent")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("INVESTMENT")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "INVESTMENT"
                ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-md shadow-[#C5A059]/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {t("search.tab_invest")}
          </button>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
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
                <option value="">{t("search.type_placeholder")}</option>
                <option value="VILLA">فلل وقصور فاخرة</option>
                <option value="APARTMENT">شقق سكنية</option>
                <option value="PENTHOUSE">بنتهاوس ورووف</option>
                <option value="COMMERCIAL">مباني ومقرات تجارية</option>
                <option value="LAND">أراضي استثمارية</option>
              </select>
              <Home className="absolute top-3.5 left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          {/* 2. District / City */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 text-right">
              {t("search.location_label")}
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] text-right cursor-pointer"
              >
                <option value="">{t("search.location_placeholder")}</option>
                <option value="حي النرجس">الرياض - حي النرجس</option>
                <option value="حي حطين">الرياض - حي حطين</option>
                <option value="حي الملقا">الرياض - حي الملقا</option>
                <option value="حي الياسمين">الرياض - حي الياسمين</option>
                <option value="حي العقيق">الرياض - حي العقيق</option>
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
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] text-right cursor-pointer"
              >
                <option value="">{t("search.price_placeholder")}</option>
                <option value="0-2000000">أقل من 2 مليون ر.س</option>
                <option value="2000000-4000000">2 مليون - 4 مليون ر.س</option>
                <option value="4000000-8000000">4 مليون - 8 مليون ر.س</option>
                <option value="8000000-99999999">أكثر من 8 مليون ر.س (VIP)</option>
              </select>
              <Banknote className="absolute top-3.5 left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          {/* 4. Search Submit Button */}
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
  );
}
