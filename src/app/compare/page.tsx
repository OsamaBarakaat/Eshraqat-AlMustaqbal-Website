"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  X,
  Plus,
  Calendar,
  Share2,
  Check,
  Building2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { useLanguage } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { BookingModal } from "@/components/booking/booking-modal";
import { ShareModal } from "@/components/share/share-modal";
import { Property } from "@/types/property";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { t, dir, lang } = useLanguage();

  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [shareProperty, setShareProperty] = useState<Property | null>(null);

  const p1 = compareList[0];
  const p2 = compareList[1];

  const compareRows = [
    { label: "السعر الإجمالي", val1: p1 ? formatPrice(p1.price) : "-", val2: p2 ? formatPrice(p2.price) : "-", highlight: true },
    { label: "سعر المتر التقريبي", val1: p1 ? `${Math.round(p1.price / p1.area).toLocaleString("ar-SA")} ر.س/م²` : "-", val2: p2 ? `${Math.round(p2.price / p2.area).toLocaleString("ar-SA")} ر.س/م²` : "-" },
    { label: "الموقع والحي", val1: p1 ? `${p1.city} - ${p1.district}` : "-", val2: p2 ? `${p2.city} - ${p2.district}` : "-" },
    { label: "المساحة الإجمالية", val1: p1 ? `${p1.area} م²` : "-", val2: p2 ? `${p2.area} م²` : "-" },
    { label: "نوع العقار", val1: p1?.type || "-", val2: p2?.type || "-" },
    { label: "الغرض", val1: p1?.purpose === "SALE" ? "للبيع" : "للإيجار", val2: p2?.purpose === "SALE" ? "للبيع" : "للإيجار" },
    { label: "عدد غرف النوم", val1: p1 ? `${p1.bedrooms} غرف` : "-", val2: p2 ? `${p2.bedrooms} غرف` : "-" },
    { label: "دورات المياه", val1: p1 ? `${p1.bathrooms} حمامات` : "-", val2: p2 ? `${p2.bathrooms} حمامات` : "-" },
    { label: "الصالات والمجالس", val1: p1?.livingRooms ? `${p1.livingRooms} صالات` : "-", val2: p2?.livingRooms ? `${p2.livingRooms} صالات` : "-" },
    { label: "سنة البناء", val1: p1?.yearBuilt || "حديث 2025", val2: p2?.yearBuilt || "حديث 2025" },
    { label: "مواقف السيارات", val1: p1?.parkingSpaces ? `${p1.parkingSpaces} سيارات` : "موقفين", val2: p2?.parkingSpaces ? `${p2.parkingSpaces} سيارات` : "موقفين" },
    { label: "التمويل البنكي", val1: p1?.mortgageEligible !== false ? "متوافق مع البنوك" : "نقدي فقط", val2: p2?.mortgageEligible !== false ? "متوافق مع البنوك" : "نقدي فقط" },
    { label: "الصك الإلكتروني", val1: p1?.hasElectronicDeed !== false ? "صك إلكتروني فوري" : "تحت الإفراغ", val2: p2?.hasElectronicDeed !== false ? "صك إلكتروني فوري" : "تحت الإفراغ" },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground text-right overflow-hidden">
      {/* Floating Golden Bubbles */}
      <FloatingGoldenBubbles />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>مقارنة الخيارات الاستثمارية والسكنية</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("compare.title")}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              {t("compare.subtitle")}
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors self-start sm:self-auto cursor-pointer"
            >
              {t("compare.clear_all")}
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-[#141418] border border-white/5 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/5 text-[#C5A059] flex items-center justify-center">
              <Scale className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              لم تقم بإضافة عقارات للمقارنة بعد
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              تصفح قائمة العقارات واضغط على أيقونة المقارنة في أي عقارين للمفاضلة الدقيقة بينهما.
            </p>
            <div className="pt-2">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#C5A059] text-black hover:brightness-110 shadow-lg cursor-pointer"
              >
                <span>تصفح العقارات المتاحة</span>
                {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Properties Top Preview Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slot 1 */}
              <div className="relative rounded-3xl bg-[#141418] border border-[#C5A059]/40 p-5 shadow-2xl overflow-hidden">
                {p1 ? (
                  <div className="space-y-4">
                    <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
                      <img
                        src={p1.images[0]}
                        alt={p1.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromCompare(p1.id)}
                        className="absolute top-3 left-3 p-2 rounded-full bg-black/60 text-white hover:text-rose-400 transition-colors cursor-pointer"
                        title="إزالة العقار"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/80 text-[#F3E5AB] font-mono font-bold text-sm">
                        {formatPrice(p1.price)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#C5A059] font-medium block">
                        {p1.city} - {p1.district}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                        {p1.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => setBookingProperty(p1)}
                        className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>احجز معاينة لهذا العقار</span>
                      </button>
                      <button
                        onClick={() => setShareProperty(p1)}
                        className="p-2.5 rounded-xl bg-[#1C1C22] text-zinc-300 hover:text-white border border-white/10 cursor-pointer"
                        title="مشاركة"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-zinc-500">
                      <Plus className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-zinc-400">العقار الأول فارغ</p>
                  </div>
                )}
              </div>

              {/* Slot 2 */}
              <div className="relative rounded-3xl bg-[#141418] border border-[#C5A059]/40 p-5 shadow-2xl overflow-hidden">
                {p2 ? (
                  <div className="space-y-4">
                    <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
                      <img
                        src={p2.images[0]}
                        alt={p2.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromCompare(p2.id)}
                        className="absolute top-3 left-3 p-2 rounded-full bg-black/60 text-white hover:text-rose-400 transition-colors cursor-pointer"
                        title="إزالة العقار"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/80 text-[#F3E5AB] font-mono font-bold text-sm">
                        {formatPrice(p2.price)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#C5A059] font-medium block">
                        {p2.city} - {p2.district}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                        {p2.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => setBookingProperty(p2)}
                        className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>احجز معاينة لهذا العقار</span>
                      </button>
                      <button
                        onClick={() => setShareProperty(p2)}
                        className="p-2.5 rounded-xl bg-[#1C1C22] text-zinc-300 hover:text-white border border-white/10 cursor-pointer"
                        title="مشاركة"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-4 border border-dashed border-white/15 rounded-2xl">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white/5 text-[#C5A059] flex items-center justify-center">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">أضف عقاراً ثانياً للمقارنة</h4>
                      <p className="text-xs text-zinc-500">اختر عقاراً من الكتالوج لمشاهدة الفروقات بدقة</p>
                    </div>
                    <Link
                      href="/properties"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1C1C22] text-zinc-200 hover:text-white hover:border-[#C5A059] border border-white/10 transition-colors"
                    >
                      <span>تصفح العقارات الآن</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Hairline Comparison Matrix */}
            <div className="rounded-3xl bg-[#141418] border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-5 bg-[#1C1C22] border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>جدول المقارنة التفصيلية</span>
                </h3>
                <span className="text-xs text-zinc-400">مقارنة المواصفات الإنشائية والمالية</span>
              </div>

              <div className="divide-y divide-white/5">
                {compareRows.map((row, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 p-4 sm:p-5 text-xs sm:text-sm items-center ${
                      row.highlight ? "bg-[#C5A059]/5" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="text-right font-medium text-zinc-400">
                      {row.label}
                    </div>
                    <div className={`text-center font-bold px-2 ${row.highlight ? "text-[#C5A059] font-mono text-base" : "text-white"}`}>
                      {row.val1}
                    </div>
                    <div className={`text-center font-bold px-2 ${row.highlight ? "text-[#C5A059] font-mono text-base" : "text-white"}`}>
                      {row.val2}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingProperty && (
        <BookingModal
          property={bookingProperty}
          isOpen={!!bookingProperty}
          onClose={() => setBookingProperty(null)}
        />
      )}

      {/* Share Modal */}
      {shareProperty && (
        <ShareModal
          property={shareProperty}
          isOpen={!!shareProperty}
          onClose={() => setShareProperty(null)}
        />
      )}
    </div>
  );
}
