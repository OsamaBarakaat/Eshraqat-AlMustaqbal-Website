"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock3,
  XCircle,
  Building2,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useClientAuth } from "@/lib/client-auth";
import { ClientBookingsService, ClientBooking } from "@/lib/client-bookings";
import { ClientAuthModal } from "@/components/auth/client-auth-modal";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

export default function MyBookingsPage() {
  const { t, dir, lang } = useLanguage();
  const { user, isLoggedIn, logout } = useClientAuth();

  const [bookings, setBookings] = useState<ClientBooking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Load bookings for current user
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user?.email) {
        const userBookings = ClientBookingsService.getByUserEmail(user.email);
        setBookings(userBookings);
      } else {
        // If not logged in or no email, check all local bookings
        const all = ClientBookingsService.getAll();
        setBookings(all);
      }
    }
  }, [user]);

  const handleCancelBooking = (id: string) => {
    if (confirm(lang === "ar" ? "هل أنت متأكد من رغبتك في إلغاء موعد المعاينة هذا؟" : "Are you sure you want to cancel this viewing appointment?")) {
      ClientBookingsService.cancel(id);
      if (user?.email) {
        setBookings(ClientBookingsService.getByUserEmail(user.email));
      } else {
        setBookings(ClientBookingsService.getAll());
      }
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "ALL") return true;
    return b.status === filterStatus;
  });

  const pendingCount = bookings.filter((b) => b.status === "PENDING_CONFIRMATION").length;
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const cancelledCount = bookings.filter((b) => b.status === "CANCELLED").length;

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground">
      {/* Floating Golden Bubbles in Background */}
      <FloatingGoldenBubbles />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "لوحة العميل • إدارة المعاينات الخاصة" : "Client Portal • Viewing Bookings"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {lang === "ar" ? "قائمة مواعيد معايناتي" : "My Scheduled Viewings"}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-light">
              {lang === "ar"
                ? "تابع حالة طلبات المعاينات الميدانية لمشاريع إشراقة المستقبل، وتواصل مباشرة مع المستشار العقاري المخصص لمرافقتك."
                : "Track the status of your on-site property viewings and coordinate directly with your dedicated real estate advisor."}
            </p>
          </div>

          {/* User Sign In / Status */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#141418] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs text-right">
                <span className="block text-zinc-400 text-[10px]">{lang === "ar" ? "مسجل باسم" : "Signed in as"}</span>
                <span className="block text-white font-mono font-semibold truncate max-w-[150px]">{user?.email}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === "ar" ? "تسجيل الدخول بالـ OTP" : "Sign in with OTP"}</span>
            </button>
          )}
        </div>

        {/* Not Logged In Banner Notice */}
        {!isLoggedIn && (
          <div className="p-6 rounded-3xl bg-[#141418]/90 border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-right">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {lang === "ar" ? "سجل بريدك الإلكتروني لحفظ ومزامنة كافة معايناتك" : "Sign in to synchronize all your viewing requests"}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {lang === "ar"
                    ? "عند تسجيل الدخول يتم حفظ مواعيدك تلقائياً وتصلك إشعارات فورية عند اعتماد وتأكيد موعد المعاينة من الإدارة."
                    : "Logging in enables cloud sync for all your viewing slots and instant email confirmations."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C5A059] text-black hover:brightness-110 shrink-0 cursor-pointer shadow-md"
            >
              {lang === "ar" ? "تسجيل الدخول الآن" : "Sign In Now"}
            </button>
          </div>
        )}

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141418] border border-white/5 space-y-1">
            <span className="text-[11px] text-zinc-400 block">{lang === "ar" ? "إجمالي المعاينات" : "Total Viewings"}</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{bookings.length}</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#141418] border border-white/5 space-y-1">
            <span className="text-[11px] text-amber-400 block">{lang === "ar" ? "بانتظار التأكيد" : "Pending Confirmation"}</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">{pendingCount}</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#141418] border border-white/5 space-y-1">
            <span className="text-[11px] text-emerald-400 block">{lang === "ar" ? "مؤكدة رسمياً" : "Confirmed"}</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">{confirmedCount}</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#141418] border border-white/5 space-y-1">
            <span className="text-[11px] text-zinc-400 block">{lang === "ar" ? "ملغاة" : "Cancelled"}</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-400 font-mono">{cancelledCount}</span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          {[
            { id: "ALL", labelAr: "كافة المعاينات", labelEn: "All Bookings" },
            { id: "PENDING_CONFIRMATION", labelAr: "بانتظار التأكيد", labelEn: "Pending" },
            { id: "CONFIRMED", labelAr: "مؤكدة", labelEn: "Confirmed" },
            { id: "CANCELLED", labelAr: "ملغاة", labelEn: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/20"
                  : "bg-[#141418] text-zinc-300 hover:text-white hover:bg-white/5 border border-white/5"
              }`}
            >
              {lang === "ar" ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#141418] border border-white/5 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {lang === "ar" ? "لا توجد مواعيد معاينة في هذا التصنيف" : "No viewing appointments found"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {lang === "ar"
                  ? "يمكنك تصفح كتالوج العقارات الفاخرة وحجز موعد معاينة ميدانية خاصة مجاناً في أي وقت يناسبك."
                  : "Browse our luxury property catalog and book a complimentary private viewing at your convenience."}
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#C5A059] text-black hover:brightness-110 shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
              >
                <span>{lang === "ar" ? "استكشف العقارات واحجز معاينة" : "Explore Properties & Book"}</span>
                {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((b) => {
              const isPending = b.status === "PENDING_CONFIRMATION";
              const isConfirmed = b.status === "CONFIRMED";
              const isCancelled = b.status === "CANCELLED";

              // Pre-filled WhatsApp advisor link
              const waMessage = encodeURIComponent(
                `مرحباً، إشراقة المستقبل للتطوير العقاري\nأنا العميل: ${b.customerName}\nأود الاستفسار عن موعد المعاينة رقم (${b.id}) لعقار: ${b.propertyTitle}\nالمحدد بتاريخ: ${b.date} الساعة ${b.time}`
              );
              const waUrl = `https://wa.me/966500000000?text=${waMessage}`;

              return (
                <div
                  key={b.id}
                  className="rounded-3xl bg-[#141418] border border-white/10 hover:border-[#C5A059]/40 transition-all p-5 sm:p-6 space-y-4 shadow-xl relative overflow-hidden group"
                >
                  {/* Status Banner Tag */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C5A059]">
                        #{b.id}
                      </span>
                      <span className="text-[10px] text-zinc-500">•</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {new Date(b.createdAt).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US")}
                      </span>
                    </div>

                    <div>
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                          <span>{lang === "ar" ? "بانتظار التأكيد" : "Pending Confirmation"}</span>
                        </span>
                      )}
                      {isConfirmed && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{lang === "ar" ? "موعد مؤكد" : "Confirmed"}</span>
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          <XCircle className="w-3 h-3" />
                          <span>{lang === "ar" ? "معاينة ملغاة" : "Cancelled"}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Property Info Row */}
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-black">
                      <img
                        src={b.propertyImage || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80"}
                        alt={b.propertyTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <MapPin className="w-3 h-3 text-[#C5A059]" />
                        <span className="truncate">{b.propertyCity} - {b.propertyDistrict}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                        {b.propertyTitle}
                      </h4>
                      <p className="text-xs font-bold text-[#C5A059] font-mono">
                        {b.propertyPrice.toLocaleString()} {t("common.sar")}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Scheduled Date & Time Card */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C22] border border-white/5 grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-400 block">{lang === "ar" ? "تاريخ المعاينة" : "Viewing Date"}</span>
                      <div className="flex items-center gap-1.5 text-white font-semibold font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{b.date}</span>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-400 block">{lang === "ar" ? "الوقت المحدد" : "Time Slot"}</span>
                      <div className="flex items-center gap-1.5 text-white font-semibold font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{b.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes if available */}
                  {b.notes && (
                    <div className="text-[11px] text-zinc-400 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                      <strong className="text-zinc-300 block mb-0.5">{lang === "ar" ? "ملاحظاتك للمستشار:" : "Your Notes:"}</strong>
                      <p className="italic">"{b.notes}"</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/properties/${b.propertyId}`}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#22222A] text-zinc-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3 text-[#C5A059]" />
                        <span>{lang === "ar" ? "تفاصيل العقار" : "Property"}</span>
                      </Link>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{lang === "ar" ? "تواصل واتساب" : "WhatsApp"}</span>
                      </a>
                    </div>

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{lang === "ar" ? "إلغاء المعاينة" : "Cancel"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAuthModal && (
        <ClientAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            if (user?.email) {
              setBookings(ClientBookingsService.getByUserEmail(user.email));
            }
          }}
        />
      )}
    </div>
  );
}
