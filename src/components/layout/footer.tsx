"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ApiService } from "@/lib/api-service";

export function Footer() {
  const { t, lang, dir } = useLanguage();
  const [cmsConfig, setCmsConfig] = useState<any>(null);
  const [topRiyadhDistricts, setTopRiyadhDistricts] = useState<any[]>([]);

  useEffect(() => {
    ApiService.getWebsiteConfig().then((data) => {
      if (data) setCmsConfig(data);
    });

    // Fetch dynamic top districts in Riyadh from live backend
    ApiService.getLocationsHierarchy().then((hierarchy) => {
      if (hierarchy && Array.isArray(hierarchy)) {
        let riyadhDistricts: any[] = [];
        for (const prov of hierarchy) {
          for (const city of prov.cities || []) {
            if (
              city.nameArabic?.includes("الرياض") ||
              city.nameEnglish?.toLowerCase().includes("riyadh")
            ) {
              if (Array.isArray(city.districts) && city.districts.length > 0) {
                riyadhDistricts = city.districts;
                break;
              }
            }
          }
          if (riyadhDistricts.length > 0) break;
        }
        if (riyadhDistricts.length > 0) {
          setTopRiyadhDistricts(riyadhDistricts.slice(0, 4));
        }
      }
    });
  }, []);

  const contact = cmsConfig?.contact;
  const rawSocial = cmsConfig?.socialLinks;
  const socialLinks = Array.isArray(rawSocial) ? rawSocial.filter((s: any) => s.enabled !== false) : [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSocialIcon = (platform: string) => {
    const p = (platform || "").toUpperCase();
    if (p.includes("WHATSAPP")) {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12c0 1.97.578 3.844 1.672 5.437L2 22l4.703-1.656C8.25 21.375 10.094 22 12.031 22c5.516 0 10-4.484 10-10s-4.484-10-10-10zm5.828 14.281c-.25.703-1.453 1.344-2 1.391-.5.047-1.14.078-3.64-0.953-3.032-1.25-4.969-4.328-5.125-4.531-.14-.203-1.219-1.625-1.219-3.11 0-1.484.781-2.203 1.062-2.5.281-.297.609-.375.812-.375.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.109.938 2.266.078.156.125.344.031.547-.094.203-.14.328-.281.5-.14.172-.297.375-.422.5-.14.141-.297.297-.125.594.172.297.766 1.266 1.641 2.047 1.125 1 2.078 1.312 2.375 1.453.297.141.469.125.641-.078.172-.203.734-.859.938-1.156.203-.297.406-.25.688-.141.281.109 1.781.844 2.094 1 .312.156.516.234.594.359.078.125.078.734-.172 1.437z" />
        </svg>
      );
    }
    if (p.includes("INSTAGRAM")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    }
    if (p.includes("LINKEDIN")) {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    }
    if (p.includes("SNAPCHAT")) {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12.002 2C8.742 2 6.55 4.385 6.55 7.15c0 .762.16 1.49.444 2.115-.65.234-1.32.748-1.32 1.492 0 .584.417 1.05.97 1.258-.29.58-.696 1.157-1.22 1.67-.384.378-.456.66-.456.88 0 .524.475.95 1.58 1.144.757.132 1.83.212 2.67.247.348.878 1.332 1.624 2.802 1.624 1.47 0 2.454-.746 2.802-1.624.84-.035 1.913-.115 2.67-.247 1.105-.194 1.58-.62 1.58-1.144 0-.22-.072-.502-.456-.88-.524-.513-.93-1.09-1.22-1.67.553-.208.97-.674.97-1.258 0-.744-.67-1.258-1.32-1.492.284-.625.444-1.353.444-2.115C17.454 4.385 15.262 2 12.002 2z" />
        </svg>
      );
    }
    if (p.includes("FACEBOOK")) {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    }
    if (p.includes("TIKTOK")) {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.89-4.49V8.75a8.28 8.28 0 0 0 4.88 1.59V6.89a4.84 4.84 0 0 1-1-.2z" />
        </svg>
      );
    }
    if (p.includes("YOUTUBE")) {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    }
    // Default X (Twitter)
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  };

  return (
    <footer className={`relative bg-[#070709] border-t border-white/10 text-zinc-400 pt-16 pb-12 overflow-hidden ${dir === "rtl" ? "text-right" : "text-left"}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Info & Licenses */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#1C1C22] border border-[#C5A059]/40 p-2 flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#C5A059]">
                  <path d="M12 3L2 12H5V20H19V12H22L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className={lang === "en" ? "text-left" : "text-right"}>
                <span className="block text-lg font-bold text-white tracking-wide">
                  {lang === "en" ? "Eshraqat Al-Mustaqbal" : "إشراقة المستقبل"}
                </span>
                <span className="block text-[10px] text-[#C5A059] tracking-widest font-medium">
                  {lang === "en" ? "Real Estate Development & Investment" : "للتطوير والاستثمار العقاري"}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light max-w-sm">
              {lang === "en"
                ? "A leading Saudi real estate development company, building integrated residential communities and commercial headquarters that elevate the quality of life aligned with Saudi Vision 2030."
                : "شركة تطوير عقاري سعودية رائدة، نبني مجتمعات سكنية ومقرات تجارية متكاملة ترتقي بجودة الحياة وتواكب مستهدفات رؤية المملكة 2030 في صناعة مستقبل عمراني مستدام."}
            </p>

            {/* Saudi Real Estate Authority Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{lang === "en" ? "Fal License: 1200000000" : "رخصة فال: 1200000000"}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === "en" ? "Certified by Real Estate General Authority" : "معتمد من الهيئة العامة للعقار"}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links (Requirement 7) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
              {lang === "en" ? "Quick Links" : "روابط سريعة"}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#C5A059] transition-colors block">
                  {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C5A059] transition-colors block">
                  {lang === "en" ? "Terms & Conditions" : "الشروط والأحكام"}
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-[#C5A059] transition-colors block">
                  {lang === "en" ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Districts in Riyadh (First 4 from live backend - Requirement 8) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
              {lang === "en" ? "Top Riyadh Districts" : "أبرز أحياء الرياض"}
            </h4>
            <ul className="space-y-2 text-xs">
              {(topRiyadhDistricts.length > 0
                ? topRiyadhDistricts
                : [
                    { id: "dist-narjis", nameArabic: "حي النرجس", nameEnglish: "Al-Narjis" },
                    { id: "dist-hittin", nameArabic: "حي حطين", nameEnglish: "Hittin" },
                    { id: "dist-malqa", nameArabic: "حي الملقا", nameEnglish: "Al-Malqa" },
                    { id: "dist-yasmin", nameArabic: "حي الياسمين", nameEnglish: "Al-Yasmin" },
                  ]
              ).map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/properties?district=${encodeURIComponent(d.nameArabic)}&districtId=${d.id}`}
                    className="hover:text-[#C5A059] transition-colors block"
                  >
                    {lang === "en" ? `${d.nameEnglish || d.nameArabic} Properties` : `عقارات ${d.nameArabic}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Location (Live from Dashboard CMS - Requirement 9) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
              {lang === "en" ? "Headquarters & Contact" : "المقر الرئيسي والتواصل"}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  {lang === "en"
                    ? (contact?.addressEn || "Riyadh, King Fahd Road, Al-Malqa District, Future Tower, 9th Floor, Saudi Arabia")
                    : (contact?.address || "الرياض، طريق الملك فهد، حي الملقا، برج المستقبل")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-mono dir-ltr">{contact?.contactPhone || "+966 11 000 0000"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-mono dir-ltr">{contact?.email || "info@eshraqat-almustaqbal.sa"}</span>
              </div>
            </div>

            {/* Social Icons (Dynamic from Backend CMS) */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              {socialLinks.length > 0 ? (
                socialLinks.map((s: any) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white flex items-center justify-center transition-all hover:scale-105"
                    title={s.title || s.platform}
                  >
                    {renderSocialIcon(s.platform)}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white flex items-center justify-center transition-all hover:scale-105"
                    title="X"
                  >
                    {renderSocialIcon("X")}
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white flex items-center justify-center transition-all hover:scale-105"
                    title="Instagram"
                  >
                    {renderSocialIcon("INSTAGRAM")}
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white flex items-center justify-center transition-all hover:scale-105"
                    title="LinkedIn"
                  >
                    {renderSocialIcon("LINKEDIN")}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            {lang === "en"
              ? "© 2026 Eshraqat Al-Mustaqbal Real Estate Development. All rights reserved."
              : "© 2026 إشراقة المستقبل للتطوير العقاري. جميع الحقوق محفوظة."}
          </p>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
            <Link href="/privacy" className="hover:underline">
              {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">
              {lang === "en" ? "Terms & Conditions" : "الشروط والأحكام"}
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#1C1C22] text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all flex items-center gap-1 cursor-pointer"
              title={lang === "en" ? "Back to top" : "العودة لأعلى الصفحة"}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Top" : "للأعلى"}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
