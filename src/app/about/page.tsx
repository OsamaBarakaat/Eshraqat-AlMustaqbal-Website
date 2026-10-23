"use client";

import React from "react";
import Link from "next/link";
import { Building2, Award, ShieldCheck, Sparkles, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

export default function AboutPage() {
  const { dir, t } = useLanguage();

  return (
    <div className={`relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground ${dir === "rtl" ? "text-right" : "text-left"} overflow-hidden`}>
      {/* Floating Golden Bubbles */}
      <FloatingGoldenBubbles />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t("about.badge")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t("about.title")}
          </h1>
          <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-light">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Big Vision Banner */}
        <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
            alt="Eshraqat Al-Mustaqbal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-6 right-6 left-6 flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-[#C5A059] font-bold">{t("about.vision_badge")}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t("about.vision_title")}
              </h3>
            </div>
            <Link
              href="/properties"
              className="px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#C5A059] text-black hover:brightness-110 shadow-lg cursor-pointer"
            >
              {t("about.cta_explore")}
            </Link>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-7 rounded-3xl bg-[#141418] border border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("about.val1_title")}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              {t("about.val1_desc")}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#141418] border border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("about.val2_title")}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              {t("about.val2_desc")}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#141418] border border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("about.val3_title")}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              {t("about.val3_desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
