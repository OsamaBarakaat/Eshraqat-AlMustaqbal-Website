"use client";

import React from "react";
import { ShieldCheck, Cpu, Banknote, Building2, Award, Sparkles, CheckCircle } from "lucide-react";

export function VisionPillars() {
  const pillars = [
    {
      title: "معايير معمارية استثنائية",
      description: "تصاميم عصرية مستوحاة من العمارة السلمانية الحديثة بأعلى معايير الإضاءة الطبيعية والواجهات الزجاجية العازلة للصوت والحرارة.",
      icon: Building2,
    },
    {
      title: "صكوك إلكترونية وضمانات شاملة",
      description: "صكوك ملكية إلكترونية فورية مرخصة، مع ضمانات تصل إلى 10 سنوات على الهيكل الإنشائي والعوازل وتركيبات السباكة والكهرباء.",
      icon: ShieldCheck,
    },
    {
      title: "تقنيات Smart Home ذكية",
      description: "تكامل ذكي كامل للتحكم بالتكييف والإضاءة والمداخل والمسابح عبر تطبيقات الهواتف الذكية مع نظام توفير الطاقة الصديق للبيئة.",
      icon: Cpu,
    },
    {
      title: "عوائد استثمارية متنامية",
      description: "دراسات جدوى متخصصة للمواقع الواعدة تضمن للمستثمر عوائد إيجارية مجزية وارتفاعاً مستمراً في القيمة الرأسمالية للعقار.",
      icon: Banknote,
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#09090B] relative text-right border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>ركائز التميز المؤسسي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            لماذا يختار النخبة &quot;إشراقة المستقبل&quot;؟
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            نضع الشفافية والجودة الهندسية وراحة العميل في صدارة أولوياتنا منذ مرحلة المخططات الأولى وحتى تسليم المفتاح.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-[#141418] border border-white/5 hover:border-[#C5A059]/40 transition-all duration-300 shadow-xl space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
