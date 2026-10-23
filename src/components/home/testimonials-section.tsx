"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface TestimonialItem {
  id?: string;
  name: string;
  title: string;
  content: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  homepageContent?: {
    testimonialsBadge?: string;
    testimonialsTitle?: string;
    testimonialsSubtitle?: string;
    testimonials?: TestimonialItem[];
  };
}

export function TestimonialsSection({ homepageContent }: TestimonialsSectionProps) {
  const { t: translate, lang, dir } = useLanguage();
  const isEn = lang === "en";

  const badge = isEn ? translate("testimonials.badge") : (homepageContent?.testimonialsBadge || translate("testimonials.badge"));
  const title = isEn ? translate("testimonials.title") : (homepageContent?.testimonialsTitle || translate("testimonials.title"));
  const subtitle = isEn ? translate("testimonials.subtitle") : (homepageContent?.testimonialsSubtitle || translate("testimonials.subtitle"));

  const defaultTestimonials: TestimonialItem[] = [
    {
      id: "1",
      name: translate("testimonials.item1_name"),
      title: translate("testimonials.item1_role"),
      content: translate("testimonials.item1_text"),
      rating: 5,
    },
    {
      id: "2",
      name: translate("testimonials.item2_name"),
      title: translate("testimonials.item2_role"),
      content: translate("testimonials.item2_text"),
      rating: 5,
    },
    {
      id: "3",
      name: translate("testimonials.item3_name"),
      title: translate("testimonials.item3_role"),
      content: translate("testimonials.item3_text"),
      rating: 5,
    },
  ];

  const testimonials = isEn
    ? defaultTestimonials
    : (homepageContent?.testimonials && homepageContent.testimonials.length > 0
        ? homepageContent.testimonials
        : defaultTestimonials);

  return (
    <section className={`py-16 sm:py-24 bg-[#0D0D10] relative ${dir === "rtl" ? "text-right" : "text-left"} border-t border-white/5 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="p-7 rounded-3xl bg-[#141418] border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300 shadow-xl space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1 text-[#C5A059]">
                  {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <span className="text-[11px] text-[#C5A059] font-medium">{t.title}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
