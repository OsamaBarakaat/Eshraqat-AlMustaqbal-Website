"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

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
  const { t, dir, lang } = useLanguage();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
      <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-[#09090B]">
        {/* Background Image with Brighter Luxurious Visibility */}
        <div className="absolute inset-0 z-0">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Start Column: Hero Headline & Narrative (Structured at the start) */}
            <div
              className={`lg:col-span-8 ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              <div className="p-6 sm:p-10 rounded-3xl bg-black/40 lg:bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl space-y-6 max-w-3xl">
                {/* Badge Tag from Dashboard if present */}
                {homepageContent?.badgeText && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{homepageContent.badgeText}</span>
                  </div>
                )}

                {/* Huge Luxury Title with Masked Background Animation */}
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.15] tracking-tight">
                  <span className="block masked-text font-black">
                    {t("hero.title_part1")}
                  </span>
                  <span className="block masked-text-gold font-black">
                    {t("hero.title_part2")}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-zinc-200 max-w-2xl leading-relaxed font-light drop-shadow-sm">
                  {lang === "ar" && homepageContent?.heroSubtitle
                    ? homepageContent.heroSubtitle
                    : t("hero.subtitle")}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={homepageContent?.ctaLink || "/properties"}
                    className="px-7 py-4 rounded-full font-bold text-sm sm:text-base bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#997736] hover:brightness-110 text-black shadow-xl shadow-[#C5A059]/25 transition-all flex items-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>
                      {lang === "ar" && homepageContent?.ctaLabel
                        ? homepageContent.ctaLabel
                        : t("hero.cta_explore")}
                    </span>
                    {dir === "rtl" ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Link>

                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="px-6 py-4 rounded-full font-semibold text-sm sm:text-base bg-[#141418]/80 hover:bg-[#141418] text-white border border-white/20 hover:border-[#C5A059]/60 backdrop-blur-md transition-all flex items-center gap-3 cursor-pointer group shadow-lg"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#C5A059] group-hover:text-black flex items-center justify-center transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span>{t("hero.cta_video")}</span>
                  </button>
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
                <span className="text-xs font-mono tracking-widest text-[#C5A059] font-bold">01 / 04</span>
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
                  <p className="text-[11px] text-zinc-300">
                    {lang === "ar"
                      ? "مشاريع نوعية في أرقى أحياء شمال وشرق العاصمة بالقرب من مركز الملك عبد الله المالي KAFD."
                      : "Prime development projects in prestigious north Riyadh districts near KAFD."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Showcase Cards */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 space-y-6">
          {/* 1. Stat Counters Bar (Commented out as requested) */}
          {/*
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl bg-[#141418]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-right border-l last:border-l-0 border-white/5 pl-3 rtl:border-l-0 rtl:border-r rtl:first:border-r-0 rtl:pr-3"
                >
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block text-xs text-zinc-400 font-medium">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          */}

          {/* 2. Floating Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className={`group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 hover:border-[#C5A059]/60 transition-all p-4 flex flex-col justify-end cursor-pointer ${
                  dir === "rtl" ? "text-right" : "text-left"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div
                  className={`relative z-10 flex items-end justify-between gap-2 ${
                    dir === "rtl" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 group-hover:bg-[#C5A059] group-hover:text-black text-white flex items-center justify-center transition-colors shrink-0">
                    {dir === "rtl" ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#C5A059] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-zinc-300 font-light">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {/* 4th Card: Strategic Riyadh Map Explorer */}
            <Link
              href="/properties"
              className={`group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#C5A059]/40 hover:border-[#C5A059] transition-all p-4 flex flex-col justify-end bg-gradient-to-br from-[#1C1C22] to-[#0D0D0F] cursor-pointer ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`relative z-10 flex items-end justify-between gap-2 ${
                  dir === "rtl" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#C5A059] text-black flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <div>
                  <div
                    className={`flex items-center gap-1.5 text-[#C5A059] text-xs font-bold mb-0.5 ${
                      dir === "rtl" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{lang === "ar" ? "الرياض" : "Riyadh"}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {t("showcase.lands")}
                  </h3>
                  <p className="text-[10px] text-zinc-400">
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
