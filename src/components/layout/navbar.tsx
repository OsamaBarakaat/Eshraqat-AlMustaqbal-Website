"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Globe,
  User,
  Menu,
  X,
  Sparkles,
  Scale,
  LogOut,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  Home,
  Phone,
  ShieldCheck,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useClientAuth } from "@/lib/client-auth";
import { useCompare } from "@/lib/compare-context";
import { useInquiries } from "@/lib/inquiries-context";
import { ClientAuthModal } from "@/components/auth/client-auth-modal";

export function Navbar() {
  const pathname = usePathname();
  const { t, lang, toggleLang, dir } = useLanguage();
  const { user, isLoggedIn, logout } = useClientAuth();
  const { compareList } = useCompare();
  const { inquiries, unreadCount, hasUnreadReply, openChat } = useInquiries();

  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/properties", label: t("nav.properties") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#investment", label: t("nav.investment") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/my-bookings", label: t("nav.my_bookings") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#09090B]/95 backdrop-blur-xl shadow-2xl shadow-black/90 py-3.5"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* 1. Logo (Brand Emblem) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0 min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black/60 border border-[#C5A059]/40 p-1 flex items-center justify-center shadow-lg shadow-[#C5A059]/15 group-hover:border-[#C5A059] transition-all overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="إشراقة المستقبل"
                className="w-full h-full object-contain"
              />
            </div>
            <div className={dir === "rtl" ? "text-right" : "text-left"}>
              <span className="block text-sm sm:text-base lg:text-lg font-bold text-white tracking-wide group-hover:text-[#C5A059] transition-colors leading-tight">
                {lang === "en" ? "Eshraqat Al-Mustaqbal" : "إشراقة المستقبل"}
              </span>
              <span className="block text-[9px] sm:text-[10px] text-[#C5A059] tracking-wider font-medium">
                {lang === "en" ? "Towards a Brighter Future" : "نحو غدٍ مشرق"}
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#141418]/60 backdrop-blur-md border border-white/5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    isActive
                      ? "text-[#C5A059] font-bold"
                      : "text-zinc-300 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Compare Badge */}
            {mounted && compareList.length > 0 && (
              <Link
                href="/compare"
                className="relative p-2 sm:p-2.5 rounded-full bg-[#1C1C22] border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/15 transition-colors cursor-pointer shrink-0"
                title={t("nav.compare")}
              >
                <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-black font-bold text-[9px] flex items-center justify-center">
                  {compareList.length}
                </span>
              </Link>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[#1C1C22]/80 hover:bg-[#1C1C22] text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              title="تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] sm:text-xs">{lang === "ar" ? "EN" : "عربي"}</span>
            </button>

            {/* Client User / Login */}
            {mounted && isLoggedIn ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-[#1C1C22] border border-[#C5A059]/30 text-white text-xs hover:border-[#C5A059] transition-all cursor-pointer"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C5A059] text-black font-bold flex items-center justify-center text-[10px]">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-mono text-[11px] max-w-[100px] truncate">
                    {user?.email}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className={`absolute top-full mt-2 left-0 w-48 p-2 rounded-2xl bg-[#141418] border border-[#C5A059]/30 shadow-2xl shadow-black/80 space-y-1 ${dir === "rtl" ? "text-right" : "text-left"} animate-in fade-in zoom-in-95 z-50`}>
                    <div className="px-3 py-2 border-b border-white/5">
                      <span className="block text-[10px] text-zinc-500">
                        {lang === "en" ? "Signed in as" : "الحساب المسجل"}
                      </span>
                      <span className="block text-xs font-bold text-white truncate font-mono">
                        {user?.email}
                      </span>
                    </div>

                    <Link
                      href="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-[#C5A059] transition-colors"
                    >
                      <CalendarDays className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{t("nav.my_bookings")}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openChat("HISTORY");
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-[#C5A059] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{lang === "en" ? "My Inquiries & Replies" : "استفساراتي والردود"}</span>
                      </div>
                      {hasUnreadReply && unreadCount > 0 && inquiries.length > 0 && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{lang === "en" ? "Logout" : "تسجيل الخروج"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1C1C22] text-zinc-200 hover:text-white border border-white/10 hover:border-[#C5A059]/50 transition-colors cursor-pointer shrink-0"
              >
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden sm:inline">{t("nav.login")}</span>
              </button>
            )}

            {/* Mobile Menu Toggle - ALWAYS PROMINENT AND VISIBLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-200 hover:text-white bg-[#1C1C22] hover:bg-[#25252D] border border-[#C5A059]/30 hover:border-[#C5A059] cursor-pointer shrink-0 transition-all shadow-md"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#C5A059]" />
              ) : (
                <Menu className="w-5 h-5 text-[#C5A059]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Slide-over Sidebar Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container from right in RTL, left in LTR */}
          <div
            className={`fixed inset-y-0 ${
              dir === "rtl" ? "right-0" : "left-0"
            } w-[85vw] max-w-[340px] bg-[#0E0E12] border-white/10 ${
              dir === "rtl" ? "border-l" : "border-r"
            } shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen
                ? "translate-x-0"
                : dir === "rtl"
                ? "translate-x-full"
                : "-translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-black border border-[#C5A059]/40 p-1 flex items-center justify-center">
                  <img src="/logo.png" alt="إشراقة المستقبل" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-bold text-white group-hover:text-[#C5A059] transition-colors">
                  {lang === "en" ? "Eshraqat Al-Mustaqbal" : "إشراقة المستقبل"}
                </span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5 text-[#C5A059]" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-5 ${dir === "rtl" ? "text-right" : "text-left"}`}>
              {/* Navigation Links */}
              <div className="space-y-1">
                <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-2">
                  {lang === "en" ? "Main Navigation" : "القائمة الرئيسية"}
                </span>
                <div className="grid grid-cols-1 divide-y divide-white/5">
                  {navLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-[#C5A059]/15 text-[#C5A059]"
                            : "text-zinc-200 hover:bg-white/5 hover:text-[#C5A059]"
                        }`}
                      >
                        <span>{item.label}</span>
                        {dir === "rtl" ? (
                          <ChevronLeft className="w-4 h-4 text-zinc-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-zinc-500" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Property Category Quick Filters */}
              <div className="pt-3 border-t border-white/10">
                <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-2">
                  {lang === "en" ? "Property Categories" : "تصفح فئات العقارات"}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <Link
                    href="/properties?type=VILLA"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059]/20 hover:text-[#C5A059] text-zinc-300 transition-colors text-center border border-white/5"
                  >
                    {lang === "en" ? "Villas & Mansions" : "فلل وقصور"}
                  </Link>
                  <Link
                    href="/properties?type=APARTMENT"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059]/20 hover:text-[#C5A059] text-zinc-300 transition-colors text-center border border-white/5"
                  >
                    {lang === "en" ? "Apartments" : "شقق ومجتمعات"}
                  </Link>
                  <Link
                    href="/properties?type=COMMERCIAL"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059]/20 hover:text-[#C5A059] text-zinc-300 transition-colors text-center border border-white/5"
                  >
                    {lang === "en" ? "Commercial" : "مباني تجارية"}
                  </Link>
                  <Link
                    href="/properties?type=LAND"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059]/20 hover:text-[#C5A059] text-zinc-300 transition-colors text-center border border-white/5"
                  >
                    {lang === "en" ? "Lands & Plots" : "أراضي ومخططات"}
                  </Link>
                </div>
              </div>

              {/* Language & Compare Quick Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 flex items-center justify-center gap-2 border border-white/5 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{lang === "en" ? "العربية" : "English"}</span>
                </button>
                <Link
                  href="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 flex items-center justify-center gap-2 border border-white/5 cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{t("nav.compare")}</span>
                  {compareList.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#C5A059] text-black text-[10px] font-bold flex items-center justify-center">
                      {compareList.length}
                    </span>
                  )}
                </Link>
              </div>

              {/* Auth / Account */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                {!mounted || !isLoggedIn ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black hover:brightness-110 flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span>{t("nav.login")} / {lang === "en" ? "Register" : "إنشاء حساب"}</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[11px] text-zinc-400 block">{lang === "en" ? "Signed in as" : "مسجل الدخول باسم"}</span>
                      <span className="text-xs font-bold text-white block mt-0.5">{user?.name || user?.phone}</span>
                    </div>
                    <Link
                      href="/my-bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#C5A059] text-black hover:brightness-110 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>{t("nav.my_bookings")}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openChat("HISTORY");
                      }}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#1C1C22] border border-[#C5A059]/40 text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                      <span>{lang === "en" ? "My Inquiries & Replies" : "صندوق استفساراتي والردود"}</span>
                      {hasUnreadReply && unreadCount > 0 && inquiries.length > 0 && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{lang === "en" ? "Logout" : "تسجيل الخروج"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {authModalOpen && (
        <ClientAuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </>
  );
}
