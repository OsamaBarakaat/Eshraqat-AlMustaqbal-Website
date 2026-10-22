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
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useClientAuth } from "@/lib/client-auth";
import { useCompare } from "@/lib/compare-context";
import { ClientAuthModal } from "@/components/auth/client-auth-modal";

export function Navbar() {
  const pathname = usePathname();
  const { t, lang, toggleLang, dir } = useLanguage();
  const { user, isLoggedIn, logout } = useClientAuth();
  const { compareList } = useCompare();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/properties", label: t("nav.properties") },
    { href: "/#projects", label: t("nav.projects") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#investment", label: t("nav.investment") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#09090B]/90 backdrop-blur-xl border-b border-[#C5A059]/20 shadow-xl shadow-black/60 py-3.5"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 1. Logo (Brand Emblem) */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#1C1C22] to-[#0D0D0F] border border-[#C5A059]/40 p-2 flex items-center justify-center shadow-lg shadow-[#C5A059]/15 group-hover:border-[#C5A059] transition-all">
              {/* Sunburst Villa Icon */}
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#C5A059]">
                <path
                  d="M12 3L2 12H5V20H19V12H22L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                <path d="M12 15V20M9 20V17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-right">
              <span className="block text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[#C5A059] transition-colors">
                إشراقة المستقبل
              </span>
              <span className="block text-[10px] text-[#C5A059] tracking-widest font-medium">
                نحو غدٍ مشرق • LUXURY REAL ESTATE
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
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "text-[#C5A059] font-bold"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A059] shadow-sm shadow-[#C5A059]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Badge */}
            {compareList.length > 0 && (
              <Link
                href="/compare"
                className="relative p-2.5 rounded-full bg-[#1C1C22] border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/15 transition-colors cursor-pointer"
                title={t("nav.compare")}
              >
                <Scale className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-black font-bold text-[9px] flex items-center justify-center">
                  {compareList.length}
                </span>
              </Link>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[#1C1C22]/80 hover:bg-[#1C1C22] text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>

            {/* Client User / Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1C22] border border-[#C5A059]/30 text-white text-xs hover:border-[#C5A059] transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C5A059] text-black font-bold flex items-center justify-center text-[10px]">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-mono text-[11px] max-w-[100px] truncate">
                    {user?.email}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 w-48 p-2 rounded-2xl bg-[#141418] border border-[#C5A059]/30 shadow-2xl shadow-black/80 space-y-1 text-right animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-white/5">
                      <span className="block text-[10px] text-zinc-500">الحساب المسجل</span>
                      <span className="block text-xs font-bold text-white truncate font-mono">
                        {user?.email}
                      </span>
                    </div>

                    <Link
                      href="/properties"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <CalendarDays className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>حجز معاينة جديدة</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1C1C22] text-zinc-200 hover:text-white border border-white/10 hover:border-[#C5A059]/50 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t("nav.login")}</span>
              </button>
            )}

            {/* Primary Action Button (Explore Projects) */}
            <Link
              href="/properties"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t("nav.explore")}</span>
              {dir === "rtl" ? (
                <ArrowLeft className="w-3.5 h-3.5" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white bg-[#1C1C22] border border-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pb-4 animate-in slide-in-from-top-3 duration-200">
            <div className="p-4 rounded-2xl bg-[#141418]/95 backdrop-blur-xl border border-[#C5A059]/20 shadow-2xl space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-[#C5A059] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/5 space-y-2">
                {!isLoggedIn && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#1C1C22] text-white border border-white/10 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#C5A059]" />
                    <span>{t("nav.login")}</span>
                  </button>
                )}

                <Link
                  href="/properties"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black flex items-center justify-center gap-2"
                >
                  <span>{t("nav.explore")}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
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
