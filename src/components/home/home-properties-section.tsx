"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Flame,
  ArrowLeft,
  ArrowRight,
  Home,
} from "lucide-react";
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/properties/property-card";
import { useLanguage } from "@/lib/i18n";

interface HomePropertiesSectionProps {
  initialProperties: Property[];
}

export function HomePropertiesSection({ initialProperties }: HomePropertiesSectionProps) {
  const { t, dir } = useLanguage();

  // Show top premier properties on homepage
  const displayedProperties = useMemo(() => {
    return (initialProperties || []).slice(0, 6);
  }, [initialProperties]);

  return (
    <section id="properties-showcase" className="py-14 sm:py-24 bg-[#09090B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${dir === "rtl" ? "text-right" : "text-left"} border-b border-white/10 pb-6`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold mb-3">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{t("home_props.badge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("home_props.title")}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
              {t("home_props.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/properties"
              className="text-xs sm:text-sm text-[#C5A059] hover:underline flex items-center gap-1.5 font-semibold"
            >
              <span>{t("home_props.explore_all")}</span>
              <span className="font-mono text-zinc-400">({initialProperties.length})</span>
            </Link>
          </div>
        </div>

        {/* Properties Grid */}
        {displayedProperties.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-[#141418]/80 border border-white/5 space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
              <Home className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">{t("home_props.empty_title")}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t("home_props.empty_subtitle")}
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-block px-5 py-2 rounded-xl text-xs font-bold bg-[#C5A059] text-black hover:brightness-110 shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer"
            >
              {t("home_props.view_all")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Bottom CTA to View Full Catalog on /properties */}
        <div className="text-center pt-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#1C1C22] to-[#25252E] hover:from-[#C5A059] hover:to-[#D4AF37] text-white hover:text-black border border-[#C5A059]/40 hover:border-[#C5A059] transition-all shadow-xl hover:shadow-[#C5A059]/20 cursor-pointer group"
          >
            <span>{t("home_props.explore_all")}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-mono group-hover:bg-black/20">
              {initialProperties.length} {t("home_props.properties")}
            </span>
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
