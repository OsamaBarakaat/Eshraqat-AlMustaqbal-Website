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
    <section id="services" className="py-28 bg-[#070709] relative text-right border-t border-white/5 overflow-hidden">
      {/* ================= Luxurious Golden Meteor Shower Background ================= */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 65%, transparent 98%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 98%)",
        }}
      >
        {/* Deep Warm Golden Ambient Core */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[170px]" />
        <div className="absolute -top-10 left-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[160px]" />

        {/* Dynamic Golden Shooting Stars / Meteors (حركة هادئة وبطيئة وتتلاشى بسلاسة في نهاية السيكشن) */}
        {[
          { top: "-10%", left: "5%", tailLength: "160px", duration: "11s", delay: "0s" },
          { top: "-5%", left: "22%", tailLength: "190px", duration: "12.5s", delay: "3.2s" },
          { top: "8%", left: "-6%", tailLength: "140px", duration: "11.8s", delay: "6.5s" },
          { top: "-15%", left: "42%", tailLength: "210px", duration: "14s", delay: "1.8s" },
          { top: "5%", left: "60%", tailLength: "175px", duration: "12s", delay: "5.4s" },
          { top: "-10%", left: "75%", tailLength: "160px", duration: "10.8s", delay: "8.1s" },
          { top: "12%", left: "30%", tailLength: "135px", duration: "13s", delay: "2.5s" },
          { top: "-18%", left: "88%", tailLength: "200px", duration: "14.5s", delay: "4.7s" },
          { top: "20%", left: "10%", tailLength: "150px", duration: "11.5s", delay: "7.6s" },
          { top: "25%", left: "50%", tailLength: "170px", duration: "13.2s", delay: "9.5s" },
        ].map((meteor, idx) => (
          <div
            key={idx}
            className="golden-meteor"
            style={{
              top: meteor.top,
              left: meteor.left,
              animationDuration: meteor.duration,
              animationDelay: meteor.delay,
            }}
          >
            {/* Glowing Meteor Tail */}
            <div
              className="meteor-tail"
              style={{ width: meteor.tailLength }}
            />
            {/* Blazing Golden Star Head */}
            <div className="meteor-head" />
          </div>
        ))}

        {/* Ambient Starlight / Golden Dust Particles */}
        {[
          { top: "15%", left: "18%", size: "3px", duration: "3.5s", delay: "0.2s" },
          { top: "35%", left: "28%", size: "2.5px", duration: "4.2s", delay: "1.5s" },
          { top: "20%", left: "72%", size: "3.5px", duration: "3.8s", delay: "0.8s" },
          { top: "60%", left: "85%", size: "2px", duration: "4.6s", delay: "2.1s" },
          { top: "75%", left: "15%", size: "3px", duration: "3.9s", delay: "1.2s" },
          { top: "80%", left: "45%", size: "2.5px", duration: "4.1s", delay: "2.7s" },
          { top: "25%", left: "92%", size: "3px", duration: "3.4s", delay: "0.5s" },
          { top: "70%", left: "68%", size: "2px", duration: "4.8s", delay: "1.9s" },
        ].map((star, idx) => (
          <span
            key={idx}
            className="golden-sparkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
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
