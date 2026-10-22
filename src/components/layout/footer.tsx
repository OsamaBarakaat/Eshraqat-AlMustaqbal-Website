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
  const { t, lang } = useLanguage();
  const [cmsConfig, setCmsConfig] = useState<any>(null);

  useEffect(() => {
    ApiService.getWebsiteConfig().then((data) => {
      if (data) setCmsConfig(data);
    });
  }, []);

  const contact = cmsConfig?.contact;
  const rawSocial = cmsConfig?.socialLinks;
  const socialLinks = Array.isArray(rawSocial) ? rawSocial.filter((s: any) => s.enabled !== false) : [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070709] border-t border-white/10 text-zinc-400 pt-16 pb-12 overflow-hidden text-right">
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
              <div className="text-right">
                <span className="block text-lg font-bold text-white tracking-wide">
                  إشراقة المستقبل
                </span>
                <span className="block text-[10px] text-[#C5A059] tracking-widest font-medium">
                  للتطوير والاستثمار العقاري
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light max-w-sm">
              شركة تطوير عقاري سعودية رائدة، نبني مجتمعات سكنية ومقرات تجارية متكاملة ترتقي بجودة الحياة وتواكب مستهدفات رؤية المملكة 2030 في صناعة مستقبل عمراني مستدام.
            </p>

            {/* Saudi Real Estate Authority Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>رخصة فال: 1200000000</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>معتمد من الهيئة العامة للعقار</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties?type=VILLA" className="hover:text-[#C5A059] transition-colors">
                  فلل وقصور فاخرة
                </Link>
              </li>
              <li>
                <Link href="/properties?type=APARTMENT" className="hover:text-[#C5A059] transition-colors">
                  شقق سكنية ومجتمعات
                </Link>
              </li>
              <li>
                <Link href="/properties?type=COMMERCIAL" className="hover:text-[#C5A059] transition-colors">
                  مباني ومقرات تجارية
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#C5A059] transition-colors">
                  مقارنة العقارات
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C5A059] transition-colors">
                  عن إشراقة المستقبل
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Districts in Riyadh */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
              أبرز أحياء الرياض
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties?district=حي النرجس" className="hover:text-[#C5A059] transition-colors">
                  عقارات حي النرجس
                </Link>
              </li>
              <li>
                <Link href="/properties?district=حي حطين" className="hover:text-[#C5A059] transition-colors">
                  عقارات حي حطين
                </Link>
              </li>
              <li>
                <Link href="/properties?district=حي الملقا" className="hover:text-[#C5A059] transition-colors">
                  عقارات حي الملقا
                </Link>
              </li>
              <li>
                <Link href="/properties?district=حي الياسمين" className="hover:text-[#C5A059] transition-colors">
                  عقارات حي الياسمين
                </Link>
              </li>
              <li>
                <Link href="/properties?district=حي العقيق" className="hover:text-[#C5A059] transition-colors">
                  عقارات حي العقيق (KAFD)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Location (Live from Dashboard CMS) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
              المقر الرئيسي والتواصل
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{contact?.address || "الرياض، طريق الملك فهد، برج المستقبل"}</span>
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

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((s: any) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white text-[11px] font-bold transition-colors flex items-center gap-1.5"
                    title={s.title}
                  >
                    <span>{s.platform}</span>
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white flex items-center justify-center transition-colors"
                    title="X"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white flex items-center justify-center transition-colors"
                    title="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black text-white flex items-center justify-center transition-colors"
                    title="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 إشراقة المستقبل للتطوير العقاري. جميع الحقوق محفوظة.</p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">سياسة الخصوصية</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">الشروط والأحكام</Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#1C1C22] text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all flex items-center gap-1 cursor-pointer"
              title="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>للأعلى</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
