"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Share2,
  Scale,
  CheckCircle2,
  Bed,
  Bath,
  Maximize2,
  X,
  Car,
  Home,
  ShieldCheck,
  Award,
  Sparkles,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Property } from "@/types/property";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useCompare } from "@/lib/compare-context";
import { BookingModal } from "@/components/booking/booking-modal";
import { ShareModal } from "@/components/share/share-modal";
import { PropertyCard } from "@/components/properties/property-card";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

interface PropertyDetailClientProps {
  property: Property;
  similarProperties: Property[];
}

export function PropertyDetailClient({ property, similarProperties }: PropertyDetailClientProps) {
  const { t, dir, lang } = useLanguage();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleNextImg = useCallback(() => {
    if (property.images.length <= 1) return;
    setActiveImgIdx((prev) => (prev + 1) % property.images.length);
  }, [property.images.length]);

  const handlePrevImg = useCallback(() => {
    if (property.images.length <= 1) return;
    setActiveImgIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  }, [property.images.length]);

  // Lock body scroll on lightbox open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      } else if (isLightboxOpen && property.images.length > 1) {
        if (e.key === "ArrowLeft") {
          handleNextImg();
        } else if (e.key === "ArrowRight") {
          handlePrevImg();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextImg, handlePrevImg, isLightboxOpen, property.images.length]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      handleNextImg();
    } else if (distance < -50) {
      handlePrevImg();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Mortgage Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanYears, setLoanYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);

  const isCompared = isInCompare(property.id);

  // Calculate monthly mortgage payment
  const downPayment = (property.price * downPaymentPercent) / 100;
  const principal = property.price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : principal / totalMonths;

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground text-right overflow-hidden">
      {/* Floating Golden Bubbles */}
      <FloatingGoldenBubbles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-white">العقارات</Link>
            <span>/</span>
            <span className="text-[#C5A059] font-medium truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShareOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#1C1C22] hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>مشاركة العرض</span>
            </button>

            <button
              onClick={() => (isCompared ? removeFromCompare(property.id) : addToCompare(property))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompared
                  ? "bg-[#C5A059] text-black"
                  : "bg-[#1C1C22] text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? "تمت الإضافة للمقارنة" : "مقارنة"}</span>
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-3">
          <div className="group relative h-80 sm:h-[480px] w-full rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
            <img
              src={property.images[activeImgIdx] || property.images[0]}
              alt={property.title}
              onClick={() => setIsLightboxOpen(true)}
              className="w-full h-full object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Expand / Lightbox Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 left-4 z-20 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              title="تكبير الصور وعرض بملء الشاشة"
            >
              <Maximize2 className="w-4 h-4 text-[#C5A059]" />
              <span className="hidden sm:inline">تكبير الصور</span>
            </button>

            {/* Image Counter Badge */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium">
              <span>{activeImgIdx + 1} / {property.images.length || 1}</span>
            </div>

            {/* Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImg();
                  }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#C5A059] hover:text-black transition-all cursor-pointer z-20 shadow-md"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImg();
                  }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#C5A059] hover:text-black transition-all cursor-pointer z-20 shadow-md"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Price Floating Pill */}
            <div className="absolute bottom-4 right-4 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-[#C5A059]/40 text-white z-10 pointer-events-none">
              <span className="text-xs text-zinc-400 block font-light">السعر الإجمالي</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-[#F3E5AB]">
                {formatPrice(property.price)}
              </span>
            </div>
          </div>

          {/* Thumbnails Ribbon */}
          {property.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImgIdx(i)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImgIdx === i ? "border-[#C5A059] scale-105 shadow-md shadow-[#C5A059]/20" : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Lightbox Modal (like Dashboard) */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setIsLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-right text-white">
                <p className="font-bold text-sm sm:text-base text-zinc-100">{property.title}</p>
                <p className="text-xs text-[#C5A059] mt-0.5">
                  صورة {activeImgIdx + 1} من {property.images.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="إغلاق المعاينة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Main Image & Navigation */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={property.images[activeImgIdx] || property.images[0]}
                alt={property.title}
                className="max-h-[78vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl select-none"
              />

              {/* Lightbox Nav Buttons */}
              {property.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImg();
                    }}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:bg-[#C5A059] hover:text-black hover:scale-105 active:scale-95 z-30 cursor-pointer shadow-xl"
                    title="الصورة السابقة"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImg();
                    }}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:bg-[#C5A059] hover:text-black hover:scale-105 active:scale-95 z-30 cursor-pointer shadow-xl"
                    title="الصورة التالية"
                    aria-label="الصورة التالية"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnails Strip */}
            {property.images.length > 1 && (
              <div
                className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 max-w-4xl mx-auto w-full scrollbar-thin"
                onClick={(e) => e.stopPropagation()}
              >
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === activeImgIdx
                        ? "border-[#C5A059] scale-105 ring-2 ring-[#C5A059]/40"
                        : "border-white/20 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Code */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#C5A059] font-medium">
                <MapPin className="w-4 h-4" />
                <span>{property.city} - {property.district}</span>
                <span className="text-zinc-600">•</span>
                <span className="font-mono text-zinc-400">كود: {property.code}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {property.title}
              </h1>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#141418] border border-white/5 text-center">
              <div className="p-3 rounded-xl bg-[#1C1C22]">
                <Maximize2 className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                <span className="text-[11px] text-zinc-400 block">المساحة</span>
                <span className="text-sm font-bold text-white font-mono">{property.area} م²</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1C1C22]">
                <Bed className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                <span className="text-[11px] text-zinc-400 block">غرف النوم</span>
                <span className="text-sm font-bold text-white font-mono">{property.bedrooms} غرف</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1C1C22]">
                <Bath className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                <span className="text-[11px] text-zinc-400 block">دورات المياه</span>
                <span className="text-sm font-bold text-white font-mono">{property.bathrooms} حمامات</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1C1C22]">
                <Car className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                <span className="text-[11px] text-zinc-400 block">المواقف</span>
                <span className="text-sm font-bold text-white font-mono">{property.parkingSpaces || 2} مواقف</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/5 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white">وصف العقار ومواصفات البناء</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities & Features */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/5 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white">المرافق والمزايا الاستثنائية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-[#1C1C22] border border-white/5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/5 space-y-5">
              <div className="flex items-center gap-2 text-white">
                <Calculator className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-base sm:text-lg font-bold">حاسبة التمويل العقاري التقديرية</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    الدفعة الأولى ({downPaymentPercent}%):
                  </label>
                  <span className="font-mono text-sm font-bold text-[#C5A059] block mb-2">
                    {formatPrice(downPayment)}
                  </span>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    مدة التمويل ({loanYears} سنة):
                  </label>
                  <span className="font-mono text-sm font-bold text-white block mb-2">
                    {loanYears * 12} قسط شهري
                  </span>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={5}
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full accent-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    نسبة المرابحة التقديرية:
                  </label>
                  <span className="font-mono text-sm font-bold text-white block mb-2">
                    {interestRate}% سنوياً
                  </span>
                  <input
                    type="range"
                    min={3}
                    max={8}
                    step={0.5}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#C5A059]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1C1C22] border border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
                <div>
                  <span className="text-xs text-zinc-400 block">القسط الشهري التقديري</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#F3E5AB] font-mono">
                    {formatPrice(Math.round(monthlyPayment))} / شهرياً
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 max-w-xs">
                  * الحسبة استرشادية وتخضع لشروط البنك الممول وتاريخ المستفيد الائتماني.
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-5">
            <div className="p-6 rounded-3xl bg-[#141418] border border-[#C5A059]/40 shadow-2xl space-y-5">
              <div className="space-y-1">
                <span className="text-xs text-zinc-400">سعر العقار</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F3E5AB] font-mono">
                  {formatPrice(property.price)}
                </div>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full py-4 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>احجز موعد معاينة ميدانية</span>
              </button>

              {/* WhatsApp Quick Connect */}
              <button
                onClick={() => setShareOpen(true)}
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مشاركة العرض عبر الواتساب</span>
              </button>

              {/* Guarantee items */}
              <div className="pt-3 border-t border-white/5 space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>صك إلكتروني موثق وإفراغ فوري</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>ضمانات معتمدة 10 سنوات على الهيكل</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-white/10 space-y-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">عقارات مشابهة قد تناسبك</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <BookingModal
          property={property}
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
        />
      )}

      {/* Share Modal */}
      {shareOpen && (
        <ShareModal
          property={property}
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}
