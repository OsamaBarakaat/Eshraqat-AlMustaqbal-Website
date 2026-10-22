"use client";

import React from "react";
import { ShieldCheck, Cpu, Banknote, Building2, Award, Sparkles, CheckCircle } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  ShieldCheck,
  Cpu,
  Banknote,
  Award,
  Sparkles,
};

interface VisionPillarsProps {
  homepageContent?: {
    pillarsBadge?: string;
    pillarsTitle?: string;
    pillarsSubtitle?: string;
    pillars?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export function VisionPillars({ homepageContent }: VisionPillarsProps) {
  const badge = homepageContent?.pillarsBadge || "ركائز التميز المؤسسي";
  const title = homepageContent?.pillarsTitle || 'لماذا يختار النخبة "إشراقة المستقبل"؟';
  const subtitle =
    homepageContent?.pillarsSubtitle ||
    "نضع الشفافية والجودة الهندسية وراحة العميل في صدارة أولوياتنا منذ مرحلة المخططات الأولى وحتى تسليم المفتاح.";

  const rawPillars =
    homepageContent?.pillars && homepageContent.pillars.length > 0
      ? homepageContent.pillars
      : [
          {
            title: "معايير معمارية استثنائية",
            description:
              "تصاميم عصرية مستوحاة من العمارة السلمانية الحديثة بأعلى معايير الإضاءة الطبيعية والواجهات الزجاجية العازلة للصوت والحرارة.",
            icon: "Building2",
          },
          {
            title: "صكوك إلكترونية وضمانات شاملة",
            description:
              "صكوك ملكية إلكترونية فورية مرخصة، مع ضمانات تصل إلى 10 سنوات على الهيكل الإنشائي والعوازل وتركيبات السباكة والكهرباء.",
            icon: "ShieldCheck",
          },
          {
            title: "تقنيات Smart Home ذكية",
            description:
              "تكامل ذكي كامل للتحكم بالتكييف والإضاءة والمداخل والمسابح عبر تطبيقات الهواتف الذكية مع نظام توفير الطاقة الصديق للبيئة.",
            icon: "Cpu",
          },
          {
            title: "عوائد استثمارية متنامية",
            description:
              "دراسات جدوى متخصصة للمواقع الواعدة تضمن للمستثمر عوائد إيجارية مجزية وارتفاعاً مستمراً في القيمة الرأسمالية للعقار.",
            icon: "Banknote",
          },
        ];

  return (
    <section id="services" className="py-28 bg-[#09090B] relative text-right border-t border-white/5 overflow-hidden">
      {/* ================= Luxurious Golden Meteors Background Animation ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[160px]" />

        {/* Shooting Stars (شهب ذهبية بميل انسيابي من الأعلى للأسفل) */}
        {[
          { top: "-5%", right: "15%", width: "160px", duration: "7s", delay: "0s" },
          { top: "5%", right: "35%", width: "130px", duration: "8.5s", delay: "2.5s" },
          { top: "15%", right: "60%", width: "180px", duration: "9s", delay: "1.2s" },
          { top: "-10%", right: "75%", width: "140px", duration: "7.8s", delay: "4s" },
          { top: "25%", right: "20%", width: "170px", duration: "8.2s", delay: "5.5s" },
          { top: "10%", right: "90%", width: "150px", duration: "9.5s", delay: "3.2s" },
          { top: "35%", right: "45%", width: "120px", duration: "8s", delay: "6.8s" },
        ].map((star, idx) => (
          <span
            key={idx}
            className="meteor"
            style={{
              top: star.top,
              right: star.right,
              width: star.width,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rawPillars.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Building2;
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
