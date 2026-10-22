import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FileText,
  ShieldCheck,
  ArrowRight,
  Clock,
  HelpCircle,
  PhoneCall,
  Scale,
} from "lucide-react";
import { apiService } from "@/lib/api-service";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await apiService.getPublicPage("terms-conditions");
  return {
    title:
      page?.metaTitle || "الشروط والأحكام العامة | إشراقة المستقبل للعقارات",
    description:
      page?.metaDescription ||
      "الشروط والأحكام المنظمة للتعاملات وتصفح العقارات وحجز المعاينات عبر منصة إشراقة المستقبل للتطوير والاستثمار العقاري بالمملكة.",
  };
}

const DEFAULT_TERMS_CONTENT = `
<h2>أهلاً بكم في منصة إشراقة المستقبل للتطوير والاستثمار العقاري بالمملكة العربية السعودية.</h2>
<p>يخضع استخدامك لهذه المنصة وكافة التعاملات العقارية والخدمات المتاحة من خلالها للشروط والأحكام التالية، بالإضافة إلى الأنظمة واللوائح السارية بالمملكة الصادرة عن الهيئة العامة للعقار والجهات ذات العلاقة.</p>

<h3>1. الموافقة على الشروط والأحكام</h3>
<p>يُعد دخولك للمنصة أو تصفح قوائم العقارات أو تقديم طلب حجز موعد معاينة إقراراً صريحاً منك بالاطلاع والموافقة التامة والالتزام بكافة بنود هذه الشروط والأحكام وسياسة الخصوصية التابعة لها دون قيد أو شرط.</p>

<h3>2. دقة بيانات العقارات والعروض الاستثمارية</h3>
<p>تبذل إشراقة المستقبل قصارى جهدها لضمان دقة وتحديث كافة تفاصيل العقارات المعروضة من مساحات، ومخططات، ومواصفات معمارية، وأسعار، وأرقام رخص الإعلان العقاري (فال). ومع ذلك، فإن هذه البيانات والعروض تخضع للتوافر الفعلي والتحقق النهائي قبل إبرام أي عقود ملزمة.</p>

<h3>3. طلبات المعاينة والحجوزات المبدئية</h3>
<ul>
  <li>تسجيل طلب حجز معاينة عبر الموقع لا يُمثل التزاماً نهائياً بالبيع أو الشراء أو الإيجار، وإنما هو موعد مبدئي للتنسيق والتواصل المباشر مع مستشارينا المعتمدين.</li>
  <li>لا يتم تحصيل أي مبالغ مالية أو عربون عبر الموقع إلا وفق الإجراءات النظامية المعتمدة رسمياً وبعد توقيع العقود والاتفاقيات النظامية.</li>
</ul>

<h3>4. الاستخدام المشروع وحقوق الملكية الفكرية</h3>
<p>كافة العلامات التجارية، والنصوص، والتصاميم المعمارية، والصور، والمقاطع المرئية، والمخططات الهندسية المعروضة على المنصة هي ملكية فكرية حصرية لشركة إشراقة المستقبل للتطوير العقاري. ويحظر تماماً نسخ أو إعادة نشر أو استغلال أي جزء منها لأغراض تجارية دون موافقة خطية مسبقة وموثقة من الشركة.</p>

<h3>5. التزامات العميل والمستخدم</h3>
<ul>
  <li>الالتزام بتقديم معلومات صحيحة ودقيقة عند تعبئة نماذج التواصل أو طلب المعاينة.</li>
  <li>عدم استخدام المنصة بأي وسيلة قد تعطل عملها أو تضر بخوادمها أو تؤثر على تجربة المستخدمين الآخرين.</li>
</ul>

<h3>6. التعديلات على الشروط والأحكام</h3>
<p>تحتفظ شركة إشراقة المستقبل بحق تعديل أو تحديث هذه الشروط في أي وقت لمواكبة التحديثات النظامية أو تطوير الخدمات. وتصبح التعديلات سارية المفعول فور نشرها على هذه الصفحة.</p>

<h3>7. النظام الواجب التطبيق والاختصاص القضائي</h3>
<p>تخضع هذه الشروط وتُفسر وفقاً للأنظمة واللوائح المعمول بها في المملكة العربية السعودية، وتختص المحاكم السعودية بمدينة الرياض حصرياً بالنظر في أي نزاع أو مطالبة تنشأ عن استخدام المنصة.</p>
`;

export default async function TermsPage() {
  const page = await apiService.getPublicPage("terms-conditions");

  const title = page?.title || "الشروط والأحكام العامة";
  const content = page?.content?.trim() ? page.content : DEFAULT_TERMS_CONTENT;
  const updatedAt = page?.updatedAt
    ? new Date(page.updatedAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "محدثة وفق أحدث الأنظمة العقارية";

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-[#09090B] text-foreground text-right overflow-hidden">
      {/* Background Floating Golden Bubbles */}
      <FloatingGoldenBubbles />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#C5A059] font-medium">الشروط والأحكام</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <Scale className="w-4 h-4" />
            <span>الضوابط والأنظمة المنظمة للمنصة</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>آخر تحديث: {updatedAt}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">
                معتمدة وفق لوائح الهيئة العامة للعقار بالمملكة
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Privacy / Terms) */}
        <div className="flex items-center gap-3 p-1.5 bg-[#141418] border border-white/5 rounded-2xl w-fit">
          <Link
            href="/privacy"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>سياسة الخصوصية</span>
          </Link>
          <Link
            href="/terms"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#C5A059] text-black shadow-md transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>الشروط والأحكام</span>
          </Link>
        </div>

        {/* Terms Content Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#141418]/90 backdrop-blur-md border border-white/5 shadow-2xl space-y-6">
          <div
            className="policy-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Footer of Card */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <span>شركة إشراقة المستقبل للتطوير والاستثمار العقاري © 2026</span>
          </div>
        </div>

        {/* Contact Support Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1C1C22] to-[#141418] border border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                هل ترغب في استشارة قانونية أو عقارية؟
              </h4>
              <p className="text-xs text-zinc-400">
                مستشارونا العقاريون والقانونيون جاهزون لخدمتكم ومساعدتكم بكل
                شفافية.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:brightness-110 transition-all shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>تواصل معنا الآن</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
