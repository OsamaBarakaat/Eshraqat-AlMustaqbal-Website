"use client";

import React, { useState } from "react";
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

export default function ContactPage() {
  const { dir } = useLanguage();

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

    try {
      await fetch("https://eshraqat-almustaqbal-backend.vercel.app/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
    } catch {
      // ignore
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground text-right overflow-hidden">
      {/* Floating Golden Bubbles */}
      <FloatingGoldenBubbles />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خدمة كبار العملاء والمستثمرين</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            يسعدنا تواصلك مع مستشارينا
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            فريقنا العقاري المتخصص جاهز للإجابة على كافة استفساراتك وتقديم استشارات استثمارية وسكنية مخصصة لاحتياجاتك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-[#141418] border border-white/10 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white">معلومات المقر والتواصل</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">المقر الرئيسي</span>
                    <span className="text-zinc-400">الرياض، طريق الملك فهد، برج المستقبل، الطابق 14</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">الهاتف الموحد</span>
                    <span className="text-zinc-400 font-mono dir-ltr">+966 11 000 0000</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">البريد الإلكتروني</span>
                    <span className="text-zinc-400 font-mono dir-ltr">vip@eshraqat-almustaqbal.sa</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">ساعات العمل الرسمية</span>
                    <span className="text-zinc-400">الأحد - الخميس: 9:00 ص - 6:00 م</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-4 border-t border-white/5">
                <a
                  href="https://api.whatsapp.com/send?phone=966500000000&text=مرحباً%20إشراقة%20المستقبل،%20أود%20الاستفسار%20عن%20المشاريع"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل فوري عبر الواتساب</span>
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
                  <h3 className="text-2xl font-bold text-white">تم استلام رسالتك بنجاح!</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    شكراً لتواصلك مع إشراقة المستقبل. سيقوم مستشارنا العقاري بالتواصل معك خلال ساعات العمل الرسمية.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#C5A059] text-black hover:brightness-110 cursor-pointer"
                  >
                    إرسال استفسار آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">أرسل استفسارك مباشرة</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">الاسم الكامل</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: عبد الله السبيعي"
                        required
                        className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">رقم الجوال</label>
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
                      <label className="block text-xs text-zinc-300 mb-1">البريد الإلكتروني</label>
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
                      <label className="block text-xs text-zinc-300 mb-1">نوع الاستفسار</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] cursor-pointer"
                      >
                        <option value="استفسار عن عقار">استفسار عن عقار معروض</option>
                        <option value="حجز موعد معاينة خاصة">حجز موعد معاينة خاصة</option>
                        <option value="فرصة استثمارية">شراكة وفرصة استثمارية</option>
                        <option value="طلب تسويق عقاري">طلب تسويق وإدارة أملاك</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">تفاصيل الرسالة</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب هنا تفاصيل طلبك أو الحي المستهدف..."
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
                    <span>{isLoading ? "جاري الإرسال..." : "إرسال الاستفسار الآن"}</span>
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
