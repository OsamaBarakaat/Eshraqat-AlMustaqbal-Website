"use client";

import React, { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  Send,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Property } from "@/types/property";
import { useLanguage } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

interface ShareModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ property, isOpen, onClose }: ShareModalProps) {
  const { t, lang, dir } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/properties/${property.id}`
      : `https://eshraqat-almustaqbal.sa/properties/${property.id}`;

  // Formatted Haraj-style Saudi real estate share text
  const shareTitle = `${property.title} | إشراقة المستقبل`;
  const shareBody = `للبيع في ${property.city} - ${property.district}
🏡 ${property.title}
💰 السعر: ${formatPrice(property.price)}
📐 المساحة: ${property.area} م² | 🛏️ ${property.bedrooms} غرف نوم | 🚿 ${property.bathrooms} دورات مياه
✨ مميزات: ${property.amenities.slice(0, 3).join("، ")}
📍 فرصة عقارية استثنائية موثقة من إشراقة المستقبل للتطوير العقاري.

أعجبني هذا العرض في إشراقة المستقبل:
${currentUrl}`;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(shareBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareBody)}`;
    window.open(url, "_blank");
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
      `🏡 ${property.title} - السعر: ${formatPrice(property.price)} | إشراقة المستقبل`
    )}`;
    window.open(url, "_blank");
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `🏡 عرض عقاري مميز: ${property.title} في ${property.city}\nالسعر: ${formatPrice(property.price)}\n${currentUrl}`
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#141418] border border-[#C5A059]/30 shadow-2xl shadow-black/80 text-foreground overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-5 text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة العرض العقاري</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {t("share.modal_title")}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {t("share.modal_desc")}
          </p>
        </div>

        {/* Live Preview Box (Haraj WhatsApp Style) */}
        <div className="p-4 rounded-2xl bg-[#0B141A] border border-[#00A884]/30 shadow-inner mb-5 text-right relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2.5">
            <span className="text-[11px] text-[#00A884] font-medium flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> معاينة كارت الواتساب
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">WhatsApp Preview</span>
          </div>

          <div className="bg-[#1F2C34] rounded-xl p-3 border border-white/5 space-y-2">
            {property.images[0] && (
              <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden border border-white/5">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[#C5A059] font-bold text-xs font-mono">
                  {formatPrice(property.price)}
                </span>
              </div>
            )}
            <h4 className="font-bold text-xs sm:text-sm text-zinc-100 line-clamp-1">
              {property.title} | إشراقة المستقبل
            </h4>
            <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-2">
              📍 {property.city} - {property.district} • المساحة: {property.area}م² • {property.bedrooms} غرف نوم • {property.amenities.slice(0, 2).join("، ")}
            </p>
            <div className="pt-1 text-[11px] text-[#53BDEB] font-mono truncate">
              eshraqat-almustaqbal.sa/properties/{property.id}
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-2 italic">
            &quot;أعجبني هذا العرض في إشراقة المستقبل&quot;
          </p>
        </div>

        {/* Share Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
          <button
            onClick={handleWhatsApp}
            className="p-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب</span>
          </button>

          <button
            onClick={handleTelegram}
            className="p-3 rounded-xl bg-[#0088CC]/15 hover:bg-[#0088CC]/25 border border-[#0088CC]/40 text-[#0088CC] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>تيلجرام</span>
          </button>

          <button
            onClick={handleTwitter}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer col-span-2 sm:col-span-1"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>منصة X</span>
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
            copied
              ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
              : "bg-[#1C1C22] border-white/15 text-white hover:border-[#C5A059] hover:text-[#C5A059]"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{t("share.copied")}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{t("share.copy")}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
