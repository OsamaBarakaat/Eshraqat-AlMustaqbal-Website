"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";
import { ApiService } from "@/lib/api-service";

export default function ContactPage() {
  const { dir, t, lang } = useLanguage();
  const [cmsConfig, setCmsConfig] = useState<any>(null);

  useEffect(() => {
    ApiService.getWebsiteConfig().then((data) => {
      if (data) setCmsConfig(data);
    });
  }, []);

  const contact = cmsConfig?.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("استفسار عن عقار");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const TYPE_MAP: Record<string, string> = {
      "استفسار عن عقار": "PROPERTY_INQUIRY",
      "حجز موعد معاينة خاصة": "PROPERTY_INQUIRY",
      "فرصة استثمارية": "PARTNERSHIP",
      "طلب تسويق عقاري": "PARTNERSHIP",
      "Property Inquiry": "PROPERTY_INQUIRY",
      "Private Viewing": "PROPERTY_INQUIRY",
      "Investment Opportunity": "PARTNERSHIP",
      "Property Marketing": "PARTNERSHIP",
    };

    try {
      await ApiService.submitInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        type: TYPE_MAP[subject.trim()] || "GENERAL_CONTACT",
      });
      try {
        localStorage.setItem("eshraqat_guest_inquiry_email_v1", email.trim().toLowerCase());
        window.dispatchEvent(new CustomEvent("refresh-inquiries"));
      } catch {
        // ignore
      }
    } catch {
      // ignore
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className={`relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground ${dir === "rtl" ? "text-right" : "text-left"} overflow-hidden`}>
      {/* Floating Golden Bubbles */}
      <FloatingGoldenBubbles />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("contact.badge")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t("contact.title")}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-[#141418] border border-white/10 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white">{t("contact.info_title")}</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{t("contact.headquarters")}</span>
                    <span className="text-zinc-400">
                      {lang === "en" ? (contact?.addressEn || t("contact.address_fallback")) : (contact?.address || t("contact.address_fallback"))}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{t("contact.toll_free")}</span>
                    <span className="text-zinc-400 font-mono dir-ltr">
                      {contact?.contactPhone || "+966 11 000 0000"}
                    </span>
                  </div>
                </div>

                {contact?.secondaryPhone && (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-white">{t("contact.secondary_phone")}</span>
                      <span className="text-zinc-400 font-mono dir-ltr">
                        {contact.secondaryPhone}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{t("contact.email")}</span>
                    <span className="text-zinc-400 font-mono dir-ltr">
                      {contact?.email || "vip@eshraqat-almustaqbal.sa"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{t("contact.working_hours_title")}</span>
                    <span className="text-zinc-400">
                      {contact?.workingHours ? (lang === "en" && contact?.workingHoursEn ? contact.workingHoursEn : contact.workingHours) : t("contact.working_hours_val")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-4 border-t border-white/5">
                <a
                  href={`https://api.whatsapp.com/send?phone=${(contact?.secondaryPhone || contact?.contactPhone || "966500000000").replace(/[^0-9]/g, "")}&text=${encodeURIComponent(lang === "en" ? "Hello Eshraqat Al-Mustaqbal, I would like to inquire about projects" : "مرحباً إشراقة المستقبل، أود الاستفسار عن المشاريع")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("contact.whatsapp_btn")}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#141418] border border-white/10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("contact.success_title")}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    {t("contact.success_desc")}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#C5A059] text-black hover:brightness-110 cursor-pointer"
                  >
                    {t("contact.send_another")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">{t("contact.form_title")}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">{t("contact.name_label")}</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("contact.name_placeholder")}
                        required
                        className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">{t("contact.phone_label")}</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 5X XXX XXXX"
                        required
                        className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] dir-ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">{t("contact.email_label")}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@example.com"
                        required
                        className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] dir-ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">{t("contact.type_label")}</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] cursor-pointer"
                      >
                        <option value="استفسار عن عقار">{t("contact.type_prop")}</option>
                        <option value="حجز موعد معاينة خاصة">{t("contact.type_booking")}</option>
                        <option value="فرصة استثمارية">{t("contact.type_invest")}</option>
                        <option value="طلب تسويق عقاري">{t("contact.type_marketing")}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">{t("contact.message_label")}</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("contact.message_placeholder")}
                      required
                      className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isLoading ? t("contact.submitting") : t("contact.submit_btn")}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
