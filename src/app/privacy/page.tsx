import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, FileText, ArrowRight, Clock, HelpCircle, PhoneCall } from "lucide-react";
import { apiService } from "@/lib/api-service";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await apiService.getPublicPage("privacy-policy");
  return {
    title: page?.metaTitle || "سياسة الخصوصية وسرية المعلومات | إشراقة المستقبل للعقارات",
    description:
      page?.metaDescription ||
      "تعرف على سياسة الخصوصية وسرية المعلومات في منصة إشراقة المستقبل للتطوير والاستثمار العقاري بالمملكة العربية السعودية.",
  };
}

const DEFAULT_PRIVACY_CONTENT = `
<h2>تولي شركة إشراقة المستقبل للعقارات أهمية بالغة لسرية وحماية بيانات عملائها الكرام وزوار منصتها الإلكترونية.</h2>
<p>نلتزم في منصة إشراقة المستقبل بحماية خصوصية المستخدمين بما يتوافق مع الأنظمة واللوائح المعمول بها في المملكة العربية السعودية، وعلى رأسها نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي.</p>

<h3>1. البيانات التي نقوم بجمعها</h3>
<p>نقوم بجمع البيانات الضرورية لتقديم الخدمات العقارية المتميزة بكفاءة، وتشمل:</p>
<ul>
  <li><b>البيانات الشخصية:</b> الاسم الكامل، رقم الجوال، والبريد الإلكتروني عند طلب حجز معاينة أو إرسال استفسار عن عقار.</li>
  <li><b>بيانات الاستخدام:</b> العقارات المفضلة، ونوع العقار المستهدف (فلل، شقق، أراضي، مباني تجارية) لتخصيص نتائج البحث.</li>
  <li><b>البيانات التقنية:</b> عنوان بروتوكول الإنترنت (IP)، ونوع المتصفح والجهاز لضمان أعلى معايير الأمان ومكافحة الاحتيال.</li>
</ul>

<h3>2. كيفية استخدام البيانات ومعالجتها</h3>
<p>تُستخدم البيانات المستلمة حصرياً للأغراض التالية:</p>
<ul>
  <li>تنسيق وتأكيد مواعيد المعاينات الميدانية مع مستشارينا العقاريين المعتمدين.</li>
  <li>الرد على الاستفسارات وتقديم الاستشارات الاستثمارية المتخصصة.</li>
  <li>إرسال الإشعارات والتحديثات المهمة المتعلقة بالعقارات والمشاريع الجديدة في حال موافقة العميل.</li>
  <li>الامتثال لمتطلبات الأنظمة واللوائح الصادرة عن الهيئة العامة للعقار بالمملكة العربية السعودية.</li>
</ul>

<h3>3. أمن وحماية المعلومات</h3>
<p>نطبق في إشراقة المستقبل أعلى المعايير التقنية والتنظيمية لتشفير وحماية البيانات من أي اختراق أو وصول أو تعديل أو إفصاح غير مصرح به.</p>

<h3>4. سرية البيانات ومشاركتها مع أطراف ثالثة</h3>
<p>نؤكد التزامنا التام بعدم بيع أو تأجير أو المتاجرة ببيانات العملاء لأي طرف ثالث لأغراض دعائية، ويقتصر الإفصاح عن البيانات فقط على الجهات الرسمية والتنظيمية متى كان ذلك مطلوباً بموجب الأنظمة السعودية النافذة.</p>

<h3>5. حقوق صاحب البيانات</h3>
<p>يحق لجميع عملائنا الكرام التواصل معنا في أي وقت لطلب تحديث بياناتهم الشخصية أو تصحيحها أو طلب حذفها وفق الضوابط النظامية المقررة.</p>
`;

export default async function PrivacyPage() {
  const page = await apiService.getPublicPage("privacy-policy");

  const title = page?.title || "سياسة الخصوصية وسرية المعلومات";
  const content = page?.content?.trim() ? page.content : DEFAULT_PRIVACY_CONTENT;
  const updatedAt = page?.updatedAt
    ? new Date(page.updatedAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "محدثة وفق أحدث الأنظمة";

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
          <span className="text-[#C5A059] font-medium">سياسة الخصوصية</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>حماية البيانات والسرية التامة</span>
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
              <span className="text-emerald-400 font-medium">معتمدة ومتوافقة مع نظام حماية البيانات الشخصية السعودي</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Privacy / Terms) */}
        <div className="flex items-center gap-3 p-1.5 bg-[#141418] border border-white/5 rounded-2xl w-fit">
          <Link
            href="/privacy"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#C5A059] text-black shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>سياسة الخصوصية</span>
          </Link>
          <Link
            href="/terms"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>الشروط والأحكام</span>
          </Link>
        </div>

        {/* Policy Content Card */}
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
              <h4 className="text-sm font-bold text-white">هل تحتاج لمساعدة أو توضيح إضافي؟</h4>
              <p className="text-xs text-zinc-400">فريق خدمة العملاء متاح للرد على كافة استفساراتكم على مدار الساعة.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:brightness-110 transition-all shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>تواصل مع الدعم</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
