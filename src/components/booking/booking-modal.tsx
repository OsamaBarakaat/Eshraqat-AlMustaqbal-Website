"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  X,
  Sparkles,
  Loader2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Property } from "@/types/property";
import { useClientAuth } from "@/lib/client-auth";
import { useLanguage } from "@/lib/i18n";
import { ApiService } from "@/lib/api-service";
import { ClientBookingsService, ClientBooking } from "@/lib/client-bookings";
import { ClientAuthModal } from "@/components/auth/client-auth-modal";

interface BookingModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_TIMES = [
  { id: "10:00", label: "10:00 ص", labelEn: "10:00 AM", period: "morning" },
  { id: "11:30", label: "11:30 ص", labelEn: "11:30 AM", period: "morning" },
  { id: "16:30", label: "04:30 م", labelEn: "04:30 PM", period: "evening" },
  { id: "18:00", label: "06:00 م", labelEn: "06:00 PM", period: "evening" },
  { id: "19:30", label: "07:30 م", labelEn: "07:30 PM", period: "evening" },
  { id: "21:00", label: "09:00 م", labelEn: "09:00 PM", period: "evening" },
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

  // Multi-Month interactive calendar state
  const [viewDate, setViewDate] = useState(() => new Date(2026, 3, 1)); // April 2026 initial

  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date();
      setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = tomorrow.toISOString().split("T")[0];
      setSelectedDate(iso);
    }
  }, [isOpen]);

  useEffect(() => {
    if (user?.name && !name) setName(user.name);
    if (user?.phone && !phone) setPhone(user.phone);
  }, [user, name, phone]);

  // Calendar calculations
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const startDayOfWeek = useMemo(() => {
    // 0 = Sunday, 1 = Monday ... 6 = Saturday
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const monthTitle = useMemo(() => {
    try {
      return viewDate.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return `${month + 1} / ${year}`;
    }
  }, [viewDate, lang, month, year]);

  const canGoPrevMonth = useMemo(() => {
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return viewDate > currentMonthStart;
  }, [viewDate]);

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const isDateInPast = (d: number) => {
    const target = new Date(year, month, d, 23, 59, 59);
    return target < new Date();
  };

  const isToday = (d: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === d
    );
  };

  const isDaySelected = (d: number) => {
    const dayStr = String(d).padStart(2, "0");
    const mStr = String(month + 1).padStart(2, "0");
    const dateStr = `${year}-${mStr}-${dayStr}`;
    return selectedDate === dateStr;
  };

  const selectDay = (d: number) => {
    const dayStr = String(d).padStart(2, "0");
    const mStr = String(month + 1).padStart(2, "0");
    setSelectedDate(`${year}-${mStr}-${dayStr}`);
  };

  const weekHeaders = lang === "ar"
    ? ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const customerEmail = user?.email || "client@eshraqat.sa";
      const customerName = name.trim() || user?.name || user?.email?.split("@")[0] || "عميل إشراقة";
      const customerPhone = phone.trim() || user?.phone || "+966500000000";

      const res = await ApiService.bookViewing({
        propertyId: property.id,
        customerName,
        customerPhone,
        customerEmail,
        requestedDate: selectedDate,
        requestedTime: selectedTime,
        notes: notes.trim(),
      });

      const generatedRef = res?.id || `ESH-${Date.now().toString().slice(-6)}`;
      setBookingRef(generatedRef);

      // Save into ClientBookingsService for the user's "My Bookings" page
      const clientBooking: ClientBooking = {
        id: generatedRef,
        propertyId: property.id,
        propertyCode: property.code,
        propertyTitle: property.title,
        propertyTitleEn: property.titleEn,
        propertyImage: property.images?.[0] || "",
        propertyCity: property.city,
        propertyDistrict: property.district,
        propertyPrice: property.price,
        date: selectedDate,
        time: selectedTime,
        customerName,
        customerPhone,
        customerEmail,
        notes: notes.trim(),
        status: "PENDING_CONFIRMATION",
        createdAt: new Date().toISOString(),
      };
      ClientBookingsService.add(clientBooking);

      setIsLoading(false);
      setIsSuccess(true);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 rounded-3xl bg-[#141418] border border-[#C5A059]/30 shadow-2xl shadow-black/90 text-foreground">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t("booking.success_title")}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                {t("booking.success_desc")}
              </p>

              <div className="p-4 rounded-2xl bg-[#1C1C22] border border-white/10 text-right space-y-2.5 max-w-md mx-auto text-xs sm:text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">رقم طلب المعاينة:</span>
                  <span className="font-mono font-bold text-[#C5A059]">{bookingRef}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">العقار:</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">{property.title}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">الموعد المحدد:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {selectedDate} • {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-400">حالة الطلب:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-amber-500/15 text-amber-300 font-medium border border-amber-500/30">
                    بانتظار التأكيد (Pending)
                  </span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/my-bookings"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>عرض قائمة معايناتي</span>
                </Link>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-[#1C1C22] text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold mb-2">
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
                {/* 1. Full Multi-Month Interactive Calendar */}
                <div className="p-4 rounded-2xl bg-[#18181E] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-xs font-bold text-white">
                        {t("booking.select_date")}
                      </span>
                    </div>

                    {/* Month Navigator */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={!canGoPrevMonth}
                        className="p-1.5 rounded-lg bg-[#22222A] text-zinc-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title="الشهر السابق"
                      >
                        {dir === "rtl" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                      </button>

                      <span className="text-xs font-bold text-[#C5A059] px-2 min-w-[110px] text-center">
                        {monthTitle}
                      </span>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg bg-[#22222A] text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="الشهر التالي"
                      >
                        {dir === "rtl" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-zinc-400">
                    {weekHeaders.map((dayName, idx) => (
                      <div key={idx} className="py-1">
                        {dayName}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Blank slots before first day */}
                    {Array.from({ length: startDayOfWeek }).map((_, i) => (
                      <div key={`blank-${i}`} className="h-8 sm:h-9" />
                    ))}

                    {/* Day numbers */}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                      const past = isDateInPast(d);
                      const selected = isDaySelected(d);
                      const currentDay = isToday(d);

                      return (
                        <button
                          key={d}
                          type="button"
                          disabled={past}
                          onClick={() => selectDay(d)}
                          className={`h-8 sm:h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                            selected
                              ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black font-extrabold shadow-md shadow-[#C5A059]/30 scale-105 ring-2 ring-[#C5A059]"
                              : past
                              ? "text-zinc-600 opacity-40 cursor-not-allowed"
                              : "bg-[#1C1C22]/80 text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer"
                          } ${currentDay && !selected ? "border border-[#C5A059]/40 text-[#C5A059]" : ""}`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Date Indicator */}
                  <div className="pt-2 text-[11px] text-zinc-400 flex items-center justify-between border-t border-white/5">
                    <span>التاريخ المختار:</span>
                    <span className="font-mono font-bold text-[#C5A059]">
                      {selectedDate}
                    </span>
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
                          className={`py-2 px-1 sm:px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#C5A059] border-[#C5A059] text-black shadow-sm font-bold"
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
                    <span>يلزم تسجيل الدخول لتأكيد المعاينة وحفظها في حسابك.</span>
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
