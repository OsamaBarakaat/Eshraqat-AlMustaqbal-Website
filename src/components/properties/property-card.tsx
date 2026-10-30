"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Share2,
  Scale,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Tag,
} from "lucide-react";
import { Property } from "@/types/property";
import { useLanguage } from "@/lib/i18n";
import { useCompare } from "@/lib/compare-context";
import { formatPrice } from "@/lib/utils";
import { BookingModal } from "@/components/booking/booking-modal";
import { ShareModal } from "@/components/share/share-modal";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t, lang, dir } = useLanguage();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const isCompared = isInCompare(property.id);

  const hasDiscount = Boolean(
    (property.originalPrice && Number(property.originalPrice) > Number(property.price)) ||
    (property.discountPercentage && Number(property.discountPercentage) > 0)
  );
  const discountPercent = property.discountPercentage || (
    property.originalPrice && Number(property.originalPrice) > Number(property.price)
      ? Math.round(((Number(property.originalPrice) - Number(property.price)) / Number(property.originalPrice)) * 100)
      : 0
  );

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <>
      <div className="group relative rounded-3xl bg-[#141418] border border-white/10 hover:border-[#C5A059]/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between text-right">
        {/* Top: Image Carousel */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/40">
          <Link
            href={`/properties/${property.id}`}
            className="block w-full h-full cursor-pointer"
            title={property.title}
          >
            <img
              src={property.images[activeImageIdx] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </Link>

          {/* Image Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-[#C5A059] hover:text-black cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-[#C5A059] hover:text-black cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 z-10">
            {hasDiscount && (
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-lg flex items-center gap-1">
                <Tag className="w-3 h-3 fill-current" />
                <span>{lang === "en" ? `Offer -${discountPercent}%` : `عرض خاص -${discountPercent}%`}</span>
              </span>
            )}
            {property.featured && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#C5A059] text-black shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>{t("common.exclusive")}</span>
              </span>
            )}
            {property.virtualTourUrl && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/70 backdrop-blur-md text-white border border-white/20">
                {t("common.virtual_tour")}
              </span>
            )}
          </div>

          {/* Quick Actions (Share & Compare) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShareModalOpen(true);
              }}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-[#C5A059] hover:bg-black/90 transition-colors cursor-pointer"
              title={t("common.share")}
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleCompareClick}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isCompared
                  ? "bg-[#C5A059] text-black"
                  : "bg-black/60 text-white hover:text-[#C5A059] hover:bg-black/90"
              }`}
              title={t("common.compare")}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-[#C5A059]/40 text-white">
              <span className="text-[10px] text-zinc-400 block font-light leading-none">
                {lang === "en" ? "Price" : "السعر"}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-lg font-bold font-mono text-[#F3E5AB]">
                  {formatPrice(property.price, undefined, lang)}
                </span>
                {hasDiscount && property.originalPrice && (
                  <span className="text-xs font-mono text-zinc-400 line-through">
                    {formatPrice(property.originalPrice, undefined, lang)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Location & Code */}
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <div className="flex items-center gap-1 text-[#C5A059] font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.city} - {property.district}</span>
              </div>
              <span className="font-mono text-zinc-500">{property.code}</span>
            </div>

            {/* Title */}
            <Link href={`/properties/${property.id}`} className="block group-hover:text-[#C5A059] transition-colors">
              <h3 className="font-bold text-base sm:text-lg text-white leading-snug line-clamp-1">
                {property.title}
              </h3>
            </Link>

            {/* Short Description */}
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {property.shortDescription || property.description}
            </p>
          </div>

          {/* Dynamic Specs Bar */}
          <div className={`pt-3 border-t border-white/5 grid gap-2 text-center text-xs ${
            (property.bedrooms && property.bedrooms > 0) && (property.bathrooms && property.bathrooms > 0)
              ? "grid-cols-3"
              : (property.bedrooms && property.bedrooms > 0) || (property.bathrooms && property.bathrooms > 0) || property.parkingSpaces
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}>
            <div className="p-2 rounded-xl bg-[#1C1C22] border border-white/5">
              <span className="text-[10px] text-zinc-400 block mb-0.5">{t("compare.spec_area")}</span>
              <span className="font-bold text-white font-mono">{property.area} {property.areaUnit || (lang === "en" ? "sqm" : "م²")}</span>
            </div>
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <div className="p-2 rounded-xl bg-[#1C1C22] border border-white/5">
                <span className="text-[10px] text-zinc-400 block mb-0.5">{t("compare.spec_rooms")}</span>
                <span className="font-bold text-white font-mono">{property.bedrooms} {lang === "en" ? "Beds" : "غرف"}</span>
              </div>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <div className="p-2 rounded-xl bg-[#1C1C22] border border-white/5">
                <span className="text-[10px] text-zinc-400 block mb-0.5">{t("compare.spec_baths")}</span>
                <span className="font-bold text-white font-mono">{property.bathrooms} {lang === "en" ? "Baths" : "حمام"}</span>
              </div>
            )}
            {/* If neither bedrooms nor bathrooms (e.g. land), show category */}
            {(!property.bedrooms || property.bedrooms <= 0) && (!property.bathrooms || property.bathrooms <= 0) && (
              <div className="p-2 rounded-xl bg-[#1C1C22] border border-white/5">
                <span className="text-[10px] text-zinc-400 block mb-0.5">{lang === "en" ? "Category" : "التصنيف"}</span>
                <span className="font-bold text-[#C5A059] truncate block">
                  {property.category === "AGRICULTURAL"
                    ? (lang === "en" ? "Agricultural" : "أرض زراعية")
                    : property.category === "COMMERCIAL"
                    ? (lang === "en" ? "Commercial" : "تجاري")
                    : (lang === "en" ? "Residential" : "سكني")}
                </span>
              </div>
            )}
          </div>

          {/* Buttons: Book Viewing & View Details */}
          <div className="pt-3 flex items-center gap-2">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-md shadow-[#C5A059]/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t("common.book_viewing")}</span>
            </button>

            <Link
              href={`/properties/${property.id}`}
              className="p-2.5 rounded-xl bg-[#1C1C22] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title={t("common.view_details")}
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          property={property}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          property={property}
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
      )}
    </>
  );
}
