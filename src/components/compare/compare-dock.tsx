"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, Scale } from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { useLanguage } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

export function CompareDock() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { dir, lang } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-3 sm:p-4 rounded-2xl bg-[#141418]/95 backdrop-blur-xl border border-[#C5A059]/40 shadow-2xl shadow-black/90 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left / Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 rounded-xl bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white">
                {lang === "ar" ? "قائمة المقارنة" : "Compare Tray"}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A059] text-black">
                {compareList.length}/2
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
              {compareList.length === 1
                ? lang === "ar"
                  ? "اختر عقاراً آخر لمقارنته"
                  : "Select another property to compare"
                : lang === "ar"
                ? "جاهز للمقارنة التفصيلية"
                : "Ready for side-by-side comparison"}
            </p>
          </div>
        </div>

        {/* Center: Selected Thumbnails */}
        <div className="flex items-center gap-2">
          {compareList.map((p) => (
            <div
              key={p.id}
              className="relative group w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFromCompare(p.id)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition-opacity cursor-pointer"
                title="إزالة من المقارنة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {compareList.length === 1 && (
            <div className="w-12 h-12 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-zinc-600 text-xs font-bold">
              +1
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearCompare}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
          >
            {lang === "ar" ? "إلغاء" : "Clear"}
          </button>

          <Link
            href="/compare"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-md shadow-[#C5A059]/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>{lang === "ar" ? "قارن الآن" : "Compare Now"}</span>
            {dir === "rtl" ? (
              <ArrowLeft className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
