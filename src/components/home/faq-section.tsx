"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ApiService } from "@/lib/api-service";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: "GENERAL" | "BUYING" | "SELLING" | "RENTING" | string;
  displayOrder?: number;
  published?: boolean;
}

interface FaqSectionProps {
  initialFaqs?: FAQItem[];
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "ما هي الضمانات التي تقدمها إشراقة المستقبل على الفلل والمشاريع السكنية؟",
    answer: "نقدم ضمانات إنشائية شاملة تصل إلى 10 سنوات على الهيكل الإنشائي والعوازل المائية والحرارية، إضافة إلى ضمانات ممتدة على الأعمال الكهروميكانيكية والتشطيبات والأبواب والمصاعد عبر نخبة من كبرى شركات التأمين والرقابة الهندسية المعتمدة في المملكة.",
    category: "BUYING",
  },
  {
    id: "faq-2",
    question: "هل العقارات المعروضة متوافقة مع شروط التمويل العقاري والبرامج الحكومية؟",
    answer: "نعم، كافة مشاريعنا ووحداتنا السكنية والتجارية معتمدة بصكوك إلكترونية مستقلة ورخص بناء نظامية، مما يجعلها متوافقة ومؤهلة لدى كافة البنوك السعودية وبرامج صندوق التنمية العقارية وبرنامج 'سكني'.",
    category: "BUYING",
  },
  {
    id: "faq-3",
    question: "كيف يمكنني حجز موعد لمعاينة العقار على أرض الواقع؟",
    answer: "يمكنك بسهولة حجز موعد فوري عبر الضغط على زر 'احجز موعد معاينة' في صفحة أي عقار، واختيار التاريخ والوقت المناسب لك، وسيتواصل معك مستشارك العقاري المختص لتأكيد الموعد واستقبالك في موقع المشروع.",
    category: "GENERAL",
  },
  {
    id: "faq-4",
    question: "هل تقدمون خدمات إدارة الأملاك وتأجير المقرات التجارية؟",
    answer: "نعم، نقدم حلولاً متكاملة لإدارة الأصول العقارية تشمل استقطاب المستأجرين النوعيين، وإبرام عقود منصة 'إيجار' الإلكترونية، والتحصيل الدوري، والإشراف على الصيانة الدورية لتعظيم العائد الاستثماري لمالك العقار.",
    category: "RENTING",
  },
  {
    id: "faq-5",
    question: "ما هي آلية الإفراغ العقاري والرسوم المترتبة عند الشراء؟",
    answer: "يتم الإفراغ إلكترونياً وبشكل فوري عبر بوابة وزارة العدل الإلكترونية (البورصة العقارية) لضمان أعلى درجات الأمان المالي والقانوني، مع توضيح كامل لضريبة التصرفات العقارية وأي رسوم قبل إتمام الصفقة دون أي تكاليف خفية.",
    category: "SELLING",
  },
];

export function FaqSection({ initialFaqs }: FaqSectionProps) {
  const { lang, dir } = useLanguage();
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs && initialFaqs.length > 0 ? initialFaqs : DEFAULT_FAQS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    if (!initialFaqs || initialFaqs.length === 0) {
      ApiService.getFaqs().then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setFaqs(data.filter((f) => f.published !== false));
        }
      });
    } else {
      setFaqs(initialFaqs.filter((f) => f.published !== false));
    }
  }, [initialFaqs]);

  // Set the first item open by default
  useEffect(() => {
    if (faqs.length > 0 && activeId === null) {
      setActiveId(faqs[0].id);
    }
  }, [faqs, activeId]);

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const categories = [
    { key: "ALL", label: lang === "en" ? "All Questions" : "كل الأسئلة" },
    { key: "GENERAL", label: lang === "en" ? "General" : "عام" },
    { key: "BUYING", label: lang === "en" ? "Buying & Ownership" : "الشراء والتملك" },
    { key: "SELLING", label: lang === "en" ? "Selling & Deals" : "البيع والصفقات" },
    { key: "RENTING", label: lang === "en" ? "Renting & Investment" : "الإيجار والاستثمار" },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory === "ALL") return true;
    return faq.category === selectedCategory;
  });

  return (
    <section id="faqs" className={`relative py-20 bg-[#0B0B0F] border-t border-white/5 scroll-mt-24 overflow-hidden ${dir === "rtl" ? "text-right" : "text-left"}`}>
      {/* Golden glow behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C5A059]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-xs font-semibold shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Frequently Asked Questions" : "الأسئلة الشائعة والمساعدة"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === "en" ? "Everything You Need to Know" : "إجابات وافية لكل استفساراتك العقارية"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            {lang === "en"
              ? "Comprehensive answers to the most common questions regarding property purchase, investment returns, structural guarantees, and electronic deeds."
              : "إجابات واضحة ودقيقة لأهم الأسئلة المتعلقة بآلية التملك، الضمانات الإنشائية، التمويل العقاري، والإفراغ الإلكتروني لدى إشراقة المستقبل."}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20 font-bold scale-105"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List with Smooth Transitions */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = activeId === faq.id;
              return (
                <div
                  key={faq.id || idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#141418] border-[#C5A059]/40 shadow-xl shadow-black/60"
                      : "bg-[#141418]/60 hover:bg-[#141418] border-white/5 hover:border-white/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-start cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isOpen ? "bg-[#C5A059] text-black" : "bg-white/5 text-zinc-400"
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? "text-[#F3E5AB]" : "text-white hover:text-[#C5A059]"
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`p-1.5 rounded-xl transition-all duration-300 shrink-0 ${
                      isOpen ? "bg-[#C5A059]/20 text-[#C5A059] rotate-180" : "bg-white/5 text-zinc-400 rotate-0"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth Collapsible Answer Container */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed border-t border-white/5 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-zinc-500 rounded-2xl bg-[#141418] border border-white/5">
              {lang === "en" ? "No questions in this category." : "لا توجد أسئلة ضمن هذا التصنيف حالياً."}
            </div>
          )}
        </div>

        {/* Contact CTA Strip */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#141418] via-[#1C1C22] to-[#141418] border border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>{lang === "en" ? "Still have a question?" : "لديك استفسار خاص لم تجد إجابته هنا؟"}</span>
            </h4>
            <p className="text-xs text-zinc-400 font-light">
              {lang === "en"
                ? "Our senior real estate advisors are ready 24/7 to assist you."
                : "فريق مستشارينا العقاريين جاهز على مدار الساعة للإجابة وتقديم الاستشارات المجانية."}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Contact Advisory Team" : "تواصل مع المستشار العقاري"}</span>
            {dir === "rtl" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </div>
    </section>
  );
}
