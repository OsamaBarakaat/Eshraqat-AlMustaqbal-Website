"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ar" | "en";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.properties": "عقاراتنا",
    "nav.projects": "مشاريعنا",
    "nav.about": "عن الشركة",
    "nav.services": "الخدمات",
    "nav.investment": "الفرص الاستثمارية",
    "nav.contact": "تواصل معنا",
    "nav.compare": "المقارنة",
    "nav.my_bookings": "معايناتي",
    "nav.login": "تسجيل الدخول",
    "nav.explore": "استكشف مشاريعنا",

    // Hero
    "hero.badge": "إشراقة المستقبل للتطوير العقاري",
    "hero.title_part1": "وجهة جديدة",
    "hero.title_part2": "لحياة أرقى",
    "hero.subtitle": "مشاريع سكنية وتجارية متكاملة، بمعايير عالمية تصنع قيمة حقيقية.. وتبني مستقبلاً أفضل في قلب المملكة العربية السعودية.",
    "hero.cta_explore": "استكشف مشاريعنا",
    "hero.cta_video": "شاهد فيديو تعريفي",
    "hero.units": "وحدة سكنية",
    "hero.projects_count": "مشروع متكامل",
    "hero.years": "سنوات من الخبرة",
    "hero.happy_clients": "عميل سعيد",

    // Showcase Cards
    "showcase.villas": "فلل سكنية",
    "showcase.villas_sub": "رفاهية في كل تفصيل",
    "showcase.apartments": "شقق سكنية",
    "showcase.apartments_sub": "مجتمعات متكاملة ومستدامة",
    "showcase.commercial": "مباني تجارية",
    "showcase.commercial_sub": "فرص استثمارية استثنائية",
    "showcase.lands": "أراضي ومخططات",
    "showcase.lands_sub": "مواقع استراتيجية لقيمة أكبر",
    "showcase.map_link": "اكتشف مواقعنا على الخريطة",

    // Search Engine
    "search.tab_buy": "شراء",
    "search.tab_rent": "إيجار",
    "search.tab_invest": "استثمار",
    "search.type_label": "نوع العقار",
    "search.type_placeholder": "جميع الأنواع",
    "search.location_label": "المدينة والحي",
    "search.location_placeholder": "اختر الحي أو المدينة",
    "search.price_label": "الميزانية",
    "search.price_placeholder": "جميع الأسعار",
    "search.button": "بحث عن العقارات",
    "search.results_found": "عقار متاح حالياً",

    // Common
    "common.sar": "ر.س",
    "common.book_viewing": "احجز معاينة",
    "common.share": "مشاركة العرض",
    "common.compare": "مقارنة",
    "common.view_details": "تفاصيل العقار",
    "common.exclusive": "عرض حصري",
    "common.virtual_tour": "معاينة 3D",
    "common.ready": "جاهز للسكن",
    "common.under_construction": "تحت الإنشاء",
    "common.close": "إغلاق",

    // Booking & Auth
    "auth.modal_title": "تسجيل دخول العميل",
    "auth.modal_desc": "أدخل بريدك الإلكتروني لتلقي رمز التحقق السريع (OTP) وتأكيد موعد المعاينة.",
    "auth.email_label": "البريد الإلكتروني",
    "auth.email_placeholder": "example@domain.com",
    "auth.send_otp": "إرسال رمز التحقق",
    "auth.otp_label": "رمز التحقق (OTP)",
    "auth.otp_desc": "تم إرسال رمز مكون من 6 أرقام إلى بريدك الإلكتروني",
    "auth.verify_otp": "تأكيد الدخول",
    "auth.remember_me": "تذكرني على هذا الجهاز",
    "auth.resend": "إعادة إرسال الرمز",
    "auth.signed_in_as": "مسجل كـ",
    "auth.logout": "تسجيل الخروج",

    // Booking Modal
    "booking.modal_title": "حجز موعد معاينة ميدانية",
    "booking.modal_desc": "اختر اليوم والوقت الأنسب لك وسيقوم مستشارنا العقاري باستقبالك وإرشادك في الموقع.",
    "booking.select_date": "اختر تاريخ المعاينة",
    "booking.select_time": "اختر الوقت المناسب",
    "booking.name_label": "الاسم الكامل",
    "booking.phone_label": "رقم الجوال",
    "booking.notes_label": "ملاحظات إضافية (اختياري)",
    "booking.submit": "تأكيد حجز المعاينة",
    "booking.success_title": "تم تسجيل طلب المعاينة بنجاح!",
    "booking.success_desc": "سيتواصل معك مستشار إشراقة المستقبل هاتفياً وعبر البريد الإلكتروني لتأكيد الموعد.",

    // Share Modal
    "share.modal_title": "مشاركة تفاصيل العقار",
    "share.modal_desc": "شارك هذا العرض العقاري المميز مباشرة مع زملائك أو عائلتك عبر المنصات التالية:",
    "share.whatsapp": "واتساب (WhatsApp)",
    "share.telegram": "تيلجرام (Telegram)",
    "share.copy": "نسخ الرابط والملخص",
    "share.copied": "تم نسخ تفاصيل العقار والرابط بنجاح!",

    // Compare
    "compare.title": "مقارنة العقارات المختارة",
    "compare.subtitle": "جدول مقارنة تفصيلي وشفاف لمساعدتك في اتخاذ القرار الاستثماري والسكني الأمثل.",
    "compare.select_to_compare": "اختر عقارين للمقارنة بينهما",
    "compare.spec_price": "السعر الإجمالي",
    "compare.spec_area": "المساحة",
    "compare.spec_type": "نوع العقار",
    "compare.spec_location": "الموقع والحي",
    "compare.spec_rooms": "غرف النوم",
    "compare.spec_baths": "دورات المياه",
    "compare.spec_amenities": "المزايا والمرافق",
    "compare.spec_completion": "حالة البناء",
    "compare.clear_all": "إفراغ المقارنة",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.projects": "Projects",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.investment": "Investment",
    "nav.contact": "Contact",
    "nav.compare": "Compare",
    "nav.my_bookings": "My Bookings",
    "nav.login": "Client Login",
    "nav.explore": "Explore Projects",

    // Hero
    "hero.badge": "Eshraqat Al-Mustaqbal Real Estate Development",
    "hero.title_part1": "A New Destination",
    "hero.title_part2": "For Refined Living",
    "hero.subtitle": "Integrated residential and commercial projects built to international standards, creating genuine value and building a brighter future in the heart of Saudi Arabia.",
    "hero.cta_explore": "Explore Projects",
    "hero.cta_video": "Watch Video",
    "hero.units": "Residential Units",
    "hero.projects_count": "Integrated Projects",
    "hero.years": "Years of Experience",
    "hero.happy_clients": "Happy Clients",

    // Showcase Cards
    "showcase.villas": "Luxury Villas",
    "showcase.villas_sub": "Elegance in every detail",
    "showcase.apartments": "Modern Apartments",
    "showcase.apartments_sub": "Integrated & sustainable communities",
    "showcase.commercial": "Commercial Buildings",
    "showcase.commercial_sub": "Exceptional investment returns",
    "showcase.lands": "Prime Lands & Masterplans",
    "showcase.lands_sub": "Strategic locations for higher value",
    "showcase.map_link": "Explore locations on map",

    // Search Engine
    "search.tab_buy": "Buy",
    "search.tab_rent": "Rent",
    "search.tab_invest": "Invest",
    "search.type_label": "Property Type",
    "search.type_placeholder": "All Types",
    "search.location_label": "City & District",
    "search.location_placeholder": "Select District or City",
    "search.price_label": "Budget",
    "search.price_placeholder": "Any Budget",
    "search.button": "Search Properties",
    "search.results_found": "Properties Available",

    // Common
    "common.sar": "SAR",
    "common.book_viewing": "Book Viewing",
    "common.share": "Share Property",
    "common.compare": "Compare",
    "common.view_details": "View Details",
    "common.exclusive": "Exclusive",
    "common.virtual_tour": "3D Tour",
    "common.ready": "Ready to Move",
    "common.under_construction": "Under Construction",
    "common.close": "Close",

    // Booking & Auth
    "auth.modal_title": "Client Sign In",
    "auth.modal_desc": "Enter your email to receive a secure instant OTP code and confirm your viewing.",
    "auth.email_label": "Email Address",
    "auth.email_placeholder": "name@example.com",
    "auth.send_otp": "Send Verification Code",
    "auth.otp_label": "Verification Code (OTP)",
    "auth.otp_desc": "A 6-digit code has been sent to your email",
    "auth.verify_otp": "Confirm & Sign In",
    "auth.remember_me": "Remember me on this device",
    "auth.resend": "Resend Code",
    "auth.signed_in_as": "Signed in as",
    "auth.logout": "Sign Out",

    // Booking Modal
    "booking.modal_title": "Schedule a Private Viewing",
    "booking.modal_desc": "Choose your preferred date and time, and our luxury real estate advisor will meet you on site.",
    "booking.select_date": "Select Date",
    "booking.select_time": "Select Time Slot",
    "booking.name_label": "Full Name",
    "booking.phone_label": "Phone Number",
    "booking.notes_label": "Additional Notes (Optional)",
    "booking.submit": "Confirm Viewing Appointment",
    "booking.success_title": "Viewing Request Received!",
    "booking.success_desc": "An advisor will contact you by phone and email to confirm the schedule.",

    // Share Modal
    "share.modal_title": "Share Property Details",
    "share.modal_desc": "Share this luxury property offer directly with colleagues or family:",
    "share.whatsapp": "WhatsApp",
    "share.telegram": "Telegram",
    "share.copy": "Copy Link & Summary",
    "share.copied": "Property summary and link copied to clipboard!",

    // Compare
    "compare.title": "Property Comparison",
    "compare.subtitle": "Side-by-side transparent matrix to help you make the best investment and residential decision.",
    "compare.select_to_compare": "Select 2 properties to compare",
    "compare.spec_price": "Total Price",
    "compare.spec_area": "Area",
    "compare.spec_type": "Property Type",
    "compare.spec_location": "Location & District",
    "compare.spec_rooms": "Bedrooms",
    "compare.spec_baths": "Bathrooms",
    "compare.spec_amenities": "Amenities",
    "compare.spec_completion": "Status",
    "compare.clear_all": "Clear Comparison",
  },
};

const I18nContext = createContext<I18nContextType>({
  lang: "ar",
  setLang: () => {},
  toggleLang: () => {},
  dir: "rtl",
  t: (key) => key,
});

const STORAGE_KEY = "eshraqat_client_lang_v1";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved === "ar" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["ar"]?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, dir, t }}>
      <div dir={dir} className={lang === "ar" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  return useContext(I18nContext);
}
