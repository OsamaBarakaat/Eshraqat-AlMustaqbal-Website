"use client";

import React, { useState } from "react";
import { Calendar, Clock, User, Phone, CheckCircle2, X, Sparkles, Loader2, MapPin } from "lucide-react";
import confetti from "canvas-confetti";
import { Property } from "@/types/property";
import { useClientAuth } from "@/lib/client-auth";
import { useLanguage } from "@/lib/i18n";
import { ApiService } from "@/lib/api-service";
import { ClientAuthModal } from "@/components/auth/client-auth-modal";

interface BookingModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_TIMES = [
  { id: "10:00", label: "10:00 ص", labelEn: "10:00 AM", period: "صباحي" },
  { id: "11:30", label: "11:30 ص", labelEn: "11:30 AM", period: "صباحي" },
  { id: "16:30", label: "04:30 م", labelEn: "04:30 PM", period: "مسائي" },
  { id: "18:00", label: "06:00 م", labelEn: "06:00 PM", period: "مسائي" },
  { id: "19:30", label: "07:30 م", labelEn: "07:30 PM", period: "مسائي" },
  { id: "21:00", label: "09:00 م", labelEn: "09:00 PM", period: "مسائي" },
];

export function BookingModal({ property, isOpen, onClose }: BookingModalProps) {
  const { t, dir, lang } = useLanguage();
  const { user, isLoggedIn } = useClientAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-04-15");
  const [selectedTime, setSelectedTime] = useState("16:30");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      setSelectedDate(d.toISOString().split("T")[0]);
    }
  }, []);

  const nextDays = React.useMemo(() => {
    if (!isOpen) return [];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "short" });
      const dayNum = d.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { day: "numeric" });
      const month = d.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { month: "short" });
      return { dateStr, dayName, dayNum, month };
    });
  }, [isOpen, lang]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await ApiService.bookViewing({
        propertyId: property.id,
        customerName: name.trim() || user?.email?.split("@")[0] || "عميل إشراقة",
        customerPhone: phone.trim() || "+966500000000",
        customerEmail: user?.email || "client@eshraqat.sa",
        requestedDate: selectedDate,
        requestedTime: selectedTime,
        notes: notes.trim(),
      });

      setIsLoading(false);
      setIsSuccess(true);
      setBookingRef(res?.id || `APP-${Date.now().toString().slice(-4)}`);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C5A059", "#D4AF37", "#ffffff", "#000000"],
        });
      } catch {
        // ignore
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#141418] border border-[#C5A059]/30 shadow-2xl shadow-black/80 text-foreground">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t("booking.success_title")}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                {t("booking.success_desc")}
              </p>

              <div className="p-4 rounded-2xl bg-[#1C1C22] border border-white/10 text-right space-y-2 max-w-sm mx-auto text-xs sm:text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">رقم طلب المعاينة:</span>
                  <span className="font-mono font-bold text-[#C5A059]">{bookingRef}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">العقار:</span>
                  <span className="font-semibold text-white truncate max-w-[180px]">{property.title}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">الموعد المحدد:</span>
                  <span className="text-emerald-400 font-bold">{selectedDate} - الساعة {selectedTime}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-400">حالة الطلب:</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500/15 text-amber-300 font-medium border border-amber-500/30">
                    بانتظار التأكيد (Pending)
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
                >
                  إتمام وإغلاق
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>معاينة حصرية خاصة</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {t("booking.modal_title")}
                </h2>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="truncate">{property.title} ({property.city} - {property.district})</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Date Selector */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    {t("booking.select_date")}
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {nextDays.map((d) => {
                      const isSelected = selectedDate === d.dateStr;
                      return (
                        <button
                          key={d.dateStr}
                          type="button"
                          onClick={() => setSelectedDate(d.dateStr)}
                          className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-b from-[#C5A059] to-[#997736] border-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/20"
                              : "bg-[#1C1C22] border-white/5 text-zinc-300 hover:border-white/20"
                          }`}
                        >
                          <span className="block text-[10px] opacity-80">{d.dayName}</span>
                          <span className="block text-sm font-bold my-0.5">{d.dayNum}</span>
                          <span className="block text-[9px] opacity-70">{d.month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Time Slot Selector */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    {t("booking.select_time")}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {AVAILABLE_TIMES.map((tItem) => {
                      const isSelected = selectedTime === tItem.id;
                      return (
                        <button
                          key={tItem.id}
                          type="button"
                          onClick={() => setSelectedTime(tItem.id)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#C5A059] border-[#C5A059] text-black shadow-sm"
                              : "bg-[#1C1C22] border-white/5 text-zinc-300 hover:border-white/20"
                          }`}
                        >
                          {lang === "ar" ? tItem.label : tItem.labelEn}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      {t("booking.name_label")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: فهد القحطاني"
                        required
                        className="w-full pl-9 pr-3 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm"
                      />
                      <User className="absolute top-3 left-3 w-3.5 h-3.5 text-zinc-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      {t("booking.phone_label")}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 5X XXX XXXX"
                        required
                        className="w-full pl-9 pr-3 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm dir-ltr"
                      />
                      <Phone className="absolute top-3 left-3 w-3.5 h-3.5 text-zinc-400" />
                    </div>
                  </div>
                </div>

                {/* 4. Notes */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    {t("booking.notes_label")}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: أود معاينة الفيلا برفقة العائلة، يرجى تجهيز المخطط الهندسي."
                    className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm resize-none"
                  />
                </div>

                {/* Notice if not logged in */}
                {!isLoggedIn && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-center justify-between">
                    <span>يلزم تسجيل الدخول لتأكيد المعاينة وإرسال الإشعار.</span>
                    <button
                      type="button"
                      onClick={() => setShowAuthModal(true)}
                      className="text-[#C5A059] underline font-bold cursor-pointer"
                    >
                      تسجيل الدخول بالـ OTP
                    </button>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري إرسال الطلب...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>{t("booking.submit")}</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {showAuthModal && (
        <ClientAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
          }}
        />
      )}
    </>
  );
}
