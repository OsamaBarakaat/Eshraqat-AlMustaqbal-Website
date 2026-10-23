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

    // Property Details
    "property.details": "تفاصيل العقار",
    "property.code": "كود",
    "property.area": "المساحة",
    "property.bedrooms": "غرف النوم",
    "property.bathrooms": "دورات المياه",
    "property.parking": "المواقف",
    "property.rooms_suffix": "غرف",
    "property.baths_suffix": "حمامات",
    "property.parking_suffix": "مواقف",
    "property.sqm": "م²",
    "property.price_total": "السعر الإجمالي",
    "property.price": "سعر العقار",
    "property.description_title": "وصف العقار ومواصفات البناء",
    "property.amenities_title": "المرافق والمزايا الاستثنائية",
    "property.mortgage_title": "حاسبة التمويل العقاري التقديرية",
    "property.down_payment": "الدفعة الأولى",
    "property.loan_duration": "مدة التمويل",
    "property.years": "سنة",
    "property.monthly_installments": "قسط شهري",
    "property.interest_rate": "نسبة المرابحة التقديرية",
    "property.yearly": "سنوياً",
    "property.monthly_payment": "القسط الشهري التقديري",
    "property.per_month": "شهرياً",
    "property.disclaimer": "* الحسبة استرشادية وتخضع لشروط البنك الممول وتاريخ المستفيد الائتماني.",
    "property.book_now": "احجز موعد معاينة ميدانية",
    "property.whatsapp_share": "مشاركة العرض عبر الواتساب",
    "property.guarantee_title": "صك إلكتروني موثق وإفراغ فوري",
    "property.guarantee_desc": "ضمانات معتمدة 10 سنوات على الهيكل",
    "property.similar_title": "عقارات مشابهة قد تناسبك",
    "property.expand_photos": "تكبير الصور",
    "property.photo_counter": "صورة",
    "property.of": "من",
    "property.close": "إغلاق المعاينة",
    "property.prev": "الصورة السابقة",
    "property.next": "الصورة التالية",
    "property.added_compare": "تمت الإضافة للمقارنة",

    // About Page
    "about.badge": "ريادة التطوير والاستثمار العقاري بالمملكة",
    "about.title": "نصنع مجتمعات تلهم الحياة وترتقي بمستقبل الرياض",
    "about.subtitle": "تأسست إشراقة المستقبل للتطوير العقاري لتكون نموذجاً وطنياً في تطوير البيئات السكنية الفاخرة والمقرات التجارية المبتكرة التي تترجم طموحات رؤية السعودية 2030.",
    "about.vision_badge": "رؤيتنا ورسالتنا",
    "about.vision_title": "البناء بإتقان، والتصميم بشغف، والاستثمار بثقة",
    "about.cta_explore": "استكشف مشاريعنا",
    "about.val1_title": "التميز الهندسي والمعماري",
    "about.val1_desc": "نختار أجود المواد الخام، ونعتمد أرقى تصاميم العمارة السلمانية المعاصرة التي تجمع بين الأصالة السعودية وقمة الحداثة.",
    "about.val2_title": "الشفافية والموثوقية",
    "about.val2_desc": "جميع مشاريعنا مرخصة رسمياً وموثقة بصكوك إلكترونية فورية وضمانات إنشائية ممتدة تمنح المستثمر والمالك راحة بال مطلقة.",
    "about.val3_title": "استدامة المستقبل",
    "about.val3_desc": "نلتزم بحلول الطاقة الذكية، العزل المائي والحراري المعتمد، وتوفير المساحات الخضراء بما يتماشى مع مبادرة السعودية الخضراء.",

    // Contact Page
    "contact.badge": "خدمة كبار العملاء والمستثمرين",
    "contact.title": "يسعدنا تواصلك مع مستشارينا",
    "contact.subtitle": "فريقنا العقاري المتخصص جاهز للإجابة على كافة استفساراتك وتقديم استشارات استثمارية وسكنية مخصصة لاحتياجاتك.",
    "contact.info_title": "معلومات المقر والتواصل",
    "contact.headquarters": "المقر الرئيسي",
    "contact.address_fallback": "الرياض، طريق الملك فهد، حي الملقا، برج المستقبل، الطابق التاسع",
    "contact.toll_free": "الهاتف الموحد",
    "contact.secondary_phone": "رقم إضافي",
    "contact.email": "البريد الإلكتروني",
    "contact.working_hours_title": "ساعات العمل الرسمية",
    "contact.working_hours_val": "السبت - الخميس: 9:00 ص - 9:00 م | الجمعة: 4:00 م - 9:00 م",
    "contact.whatsapp_btn": "تواصل فوري عبر الواتساب",
    "contact.form_title": "أرسل استفسارك مباشرة",
    "contact.name_label": "الاسم الكامل",
    "contact.name_placeholder": "مثال: عبد الله السبيعي",
    "contact.phone_label": "رقم الجوال",
    "contact.email_label": "البريد الإلكتروني",
    "contact.type_label": "نوع الاستفسار",
    "contact.type_prop": "استفسار عن عقار معروض",
    "contact.type_booking": "حجز موعد معاينة خاصة",
    "contact.type_invest": "شراكة وفرصة استثمارية",
    "contact.type_marketing": "طلب تسويق وإدارة أملاك",
    "contact.message_label": "تفاصيل الرسالة",
    "contact.message_placeholder": "اكتب هنا تفاصيل طلبك أو الحي المستهدف...",
    "contact.submit_btn": "إرسال الاستفسار الآن",
    "contact.submitting": "جاري الإرسال...",
    "contact.success_title": "تم استلام رسالتك بنجاح!",
    "contact.success_desc": "شكراً لتواصلك مع إشراقة المستقبل. سيقوم مستشارنا العقاري بالتواصل معك خلال ساعات العمل الرسمية.",
    "contact.send_another": "إرسال استفسار آخر",

    // Vision Pillars (لماذا يختار النخبة "إشراقة المستقبل"؟)
    "pillars.badge": "ركائز التميز المؤسسي",
    "pillars.title": "لماذا يختار النخبة \"إشراقة المستقبل\"؟",
    "pillars.subtitle": "نضع الشفافية والجودة الهندسية وراحة العميل في صدارة أولوياتنا منذ مرحلة المخططات الأولى وحتى تسليم المفتاح.",
    "pillars.item1_title": "معايير معمارية استثنائية",
    "pillars.item1_desc": "تصاميم عصرية مستوحاة من العمارة السلمانية الحديثة بأعلى معايير الإضاءة الطبيعية والواجهات الزجاجية العازلة للصوت والحرارة.",
    "pillars.item2_title": "صكوك إلكترونية وضمانات شاملة",
    "pillars.item2_desc": "صكوك ملكية إلكترونية فورية مرخصة، مع ضمانات تصل إلى 10 سنوات على الهيكل الإنشائي والعوازل وتركيبات السباكة والكهرباء.",
    "pillars.item3_title": "تقنيات Smart Home ذكية",
    "pillars.item3_desc": "تكامل ذكي كامل للتحكم بالتكييف والإضاءة والمداخل والمسابح عبر تطبيقات الهواتف الذكية مع نظام توفير الطاقة الصديق للبيئة.",
    "pillars.item4_title": "عوائد استثمارية متنامية",
    "pillars.item4_desc": "دراسات جدوى متخصصة للمواقع الواعدة تضمن للمستثمر عوائد إيجارية مجزية وارتفاعاً مستمراً في القيمة الرأسمالية للعقار.",

    // Testimonials (ماذا يقول عملاؤنا ومستثمرونا؟)
    "testimonials.badge": "ثقة وشهادات عملائنا",
    "testimonials.title": "ماذا يقول عملاؤنا ومستثمرونا؟",
    "testimonials.subtitle": "نفخر بأن نكون الخيار الأول للعائلات والمستثمرين في السوق العقاري السعودي.",
    "testimonials.item1_name": "م. خالد السبيعي",
    "testimonials.item1_role": "مالك فيلا مودرن - حي حطين",
    "testimonials.item1_text": "تجربة شراء استثنائية من كافة النواحي. الجودة الإنشائية للفيلا وتشطيبات الرخام والمسبح كانت مطابقة تماماً للمواصفات المعروضة، وفريق خدمة العملاء كان متواجداً معنا في كل خطوة حتى الإفراغ الإلكتروني.",
    "testimonials.item2_name": "عبد العزيز الراجحي",
    "testimonials.item2_role": "مستثمر في المجمعات التجارية",
    "testimonials.item2_text": "استثمرت في مبنى تجاري من تطوير إشراقة المستقبل شمال الرياض، وحققت عائداً إيجارياً سنوياً تجاوز 9.5%. الدراسات الاستثمارية التي يقدمونها تتميز بدقة متناهية والتزام تام بمواعيد التسليم.",
    "testimonials.item3_name": "د. نورة الشمري",
    "testimonials.item3_role": "مالكة بنتهاوس - حي العقيق",
    "testimonials.item3_text": "إطلالة الروف على أبراج كافد خيالية! النظام الذكي للتحكم بالمنزل والخصوصية في المصعد يعطي شعوراً حقيقياً بالفخامة الفندقية. فخورة بأن تكون هذه بداية مسكني الجديد في الرياض.",

    // Home Properties Showcase Section
    "home_props.badge": "مختارات فاخرة حصرية (أعلى 3 عقارات)",
    "home_props.title": "أحدث العقارات المتاحة للبيع والاستثمار",
    "home_props.subtitle": "تصفح نخبة من مشاريعنا السكنية والتجارية المطروحة حالياً، مع ضمانات إنشائية معتمدة وصكوك إلكترونية فورية.",
    "home_props.showing": "المعروض",
    "home_props.of": "من أصل",
    "home_props.properties": "عقار",
    "home_props.reset": "إعادة ضبط",
    "home_props.explore_all": "استكشف جميع المشاريع والعقارات المتاحة",
    "home_props.empty_title": "لا توجد عقارات مطابقة لخيارات الفلترة المحددة",
    "home_props.empty_subtitle": "جرب اختيار تصنيف آخر (سكني أو تجاري) أو تغيير الموقع.",
    "home_props.view_all": "عرض كافة العقارات",
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

    // Property Details
    "property.details": "Property Details",
    "property.code": "Code",
    "property.area": "Area",
    "property.bedrooms": "Bedrooms",
    "property.bathrooms": "Bathrooms",
    "property.parking": "Parking Spaces",
    "property.rooms_suffix": "Rooms",
    "property.baths_suffix": "Baths",
    "property.parking_suffix": "Slots",
    "property.sqm": "sqm",
    "property.price_total": "Total Price",
    "property.price": "Property Price",
    "property.description_title": "Property Description & Specifications",
    "property.amenities_title": "Amenities & Exceptional Features",
    "property.mortgage_title": "Estimated Mortgage Calculator",
    "property.down_payment": "Down Payment",
    "property.loan_duration": "Loan Duration",
    "property.years": "Years",
    "property.monthly_installments": "Monthly installments",
    "property.interest_rate": "Estimated Profit Rate",
    "property.yearly": "Yearly",
    "property.monthly_payment": "Estimated Monthly Payment",
    "property.per_month": "monthly",
    "property.disclaimer": "* Calculations are indicative and subject to bank approval and credit history.",
    "property.book_now": "Book a Private Site Viewing",
    "property.whatsapp_share": "Share Offer via WhatsApp",
    "property.guarantee_title": "Verified Electronic Deed & Immediate Conveyance",
    "property.guarantee_desc": "Certified 10-Year Structural & Waterproofing Warranty",
    "property.similar_title": "Similar Properties You May Like",
    "property.expand_photos": "Expand Photos",
    "property.photo_counter": "Photo",
    "property.of": "of",
    "property.close": "Close Preview",
    "property.prev": "Previous Photo",
    "property.next": "Next Photo",
    "property.added_compare": "Added to Compare",

    // About Page
    "about.badge": "Pioneering Real Estate Development & Investment in Saudi Arabia",
    "about.title": "Crafting Communities That Inspire Life and Elevate the Future of Riyadh",
    "about.subtitle": "Eshraqat Al-Mustaqbal Real Estate Development was established as a national model in developing luxury residential environments and innovative commercial headquarters, embodying the ambitions of Saudi Vision 2030.",
    "about.vision_badge": "Our Vision & Mission",
    "about.vision_title": "Building with mastery, designing with passion, investing with trust",
    "about.cta_explore": "Explore Our Projects",
    "about.val1_title": "Architectural & Engineering Excellence",
    "about.val1_desc": "We select the finest materials and embrace contemporary Salmani architecture that marries Saudi heritage with pinnacle modernity.",
    "about.val2_title": "Transparency & Reliability",
    "about.val2_desc": "All our projects are officially licensed, documented with instant electronic title deeds and extended structural warranties giving investors and homeowners absolute peace of mind.",
    "about.val3_title": "Sustainable Future",
    "about.val3_desc": "Committed to smart energy systems, certified thermal/waterproofing insulation, and abundant green landscapes aligned with the Saudi Green Initiative.",

    // Contact Page
    "contact.badge": "VIP Client & Investor Relations",
    "contact.title": "Connect with Our Property Advisors",
    "contact.subtitle": "Our dedicated real estate team is ready to answer all inquiries and provide bespoke residential and investment consultations tailored to your ambitions.",
    "contact.info_title": "Headquarters & Contact",
    "contact.headquarters": "Headquarters",
    "contact.address_fallback": "Riyadh, King Fahd Road, Al-Malqa District, Future Tower, 9th Floor, Saudi Arabia",
    "contact.toll_free": "Unified Toll-Free",
    "contact.secondary_phone": "Secondary Phone",
    "contact.email": "Email Address",
    "contact.working_hours_title": "Official Working Hours",
    "contact.working_hours_val": "Sat - Thu: 9:00 AM - 9:00 PM | Fri: 4:00 PM - 9:00 PM",
    "contact.whatsapp_btn": "Instant WhatsApp Chat",
    "contact.form_title": "Send Your Inquiry Directly",
    "contact.name_label": "Full Name",
    "contact.name_placeholder": "e.g., Abdullah Al-Subaie",
    "contact.phone_label": "Phone Number",
    "contact.email_label": "Email Address",
    "contact.type_label": "Inquiry Type",
    "contact.type_prop": "Property Inquiry",
    "contact.type_booking": "Book Private Site Viewing",
    "contact.type_invest": "Partnership & Investment",
    "contact.type_marketing": "Property Marketing & Asset Management",
    "contact.message_label": "Message Details",
    "contact.message_placeholder": "Type your inquiry or targeted district details here...",
    "contact.submit_btn": "Send Inquiry Now",
    "contact.submitting": "Sending...",
    "contact.success_title": "Inquiry Received Successfully!",
    "contact.success_desc": "Thank you for contacting Eshraqat Al-Mustaqbal. A dedicated consultant will reach out to you shortly.",
    "contact.send_another": "Send Another Inquiry",

    // Vision Pillars (Why Elite Clients Choose Eshraqat Al-Mustaqbal)
    "pillars.badge": "Pillars of Institutional Excellence",
    "pillars.title": "Why Does the Elite Choose \"Eshraqat Al-Mustaqbal\"?",
    "pillars.subtitle": "We place transparency, engineering excellence, and client peace of mind at the forefront of our priorities from the very first blueprints to turnkey handover.",
    "pillars.item1_title": "Exceptional Architectural Standards",
    "pillars.item1_desc": "Contemporary designs inspired by modern Salmani architecture, engineered with natural daylighting and sound/thermal insulated double-glazed glass.",
    "pillars.item2_title": "Electronic Title Deeds & Full Warranties",
    "pillars.item2_desc": "Immediate verified electronic title deeds with up to 10-year comprehensive structural, waterproofing, plumbing, and electrical warranties.",
    "pillars.item3_title": "Smart Home Automation",
    "pillars.item3_desc": "Full intelligent integration controlling climate, lighting, security access, and private pools via mobile apps with eco-friendly energy-saving automation.",
    "pillars.item4_title": "High-Yield Investment Growth",
    "pillars.item4_desc": "Specialized feasibility studies for strategic high-growth locations, delivering consistent annual rental yields and robust capital appreciation.",

    // Testimonials (What Our Clients & Investors Say)
    "testimonials.badge": "Client Trust & Testimonials",
    "testimonials.title": "What Our Clients & Investors Say",
    "testimonials.subtitle": "Proud to be the premier real estate partner for elite families and institutional investors in the Saudi market.",
    "testimonials.item1_name": "Eng. Khaled Al-Subaie",
    "testimonials.item1_role": "Modern Villa Owner - Hittin District",
    "testimonials.item1_text": "An exceptional acquisition journey in every aspect. The villa's structural integrity, marble masonry, and private pool matched the exact specifications shown. Customer relations guided us through every milestone until immediate electronic deed conveyance.",
    "testimonials.item2_name": "Abdulaziz Al-Rajhi",
    "testimonials.item2_role": "Commercial Centers Investor",
    "testimonials.item2_text": "I invested in a commercial complex developed by Eshraqat Al-Mustaqbal in North Riyadh, securing an annual rental yield exceeding 9.5%. Their investment feasibility studies are rigorously accurate with strict adherence to delivery timelines.",
    "testimonials.item3_name": "Dr. Noura Al-Shammari",
    "testimonials.item3_role": "Penthouse Owner - Al-Aqeeq District",
    "testimonials.item3_text": "The rooftop panoramic view of the KAFD towers is truly mesmerizing! The smart home climate automation and private elevator access evoke a genuine 5-star boutique hotel feeling. Proud to make this my home in Riyadh.",

    // Home Properties Showcase Section
    "home_props.badge": "Exclusive Luxury Selection (Top 3 Properties)",
    "home_props.title": "Latest Properties for Sale & Investment",
    "home_props.subtitle": "Browse our curated residential and commercial projects currently on offer, backed by certified structural warranties and instant electronic title deeds.",
    "home_props.showing": "Showing",
    "home_props.of": "of",
    "home_props.properties": "properties",
    "home_props.reset": "Reset",
    "home_props.explore_all": "Explore All Projects & Properties",
    "home_props.empty_title": "No properties match your selected filter criteria",
    "home_props.empty_subtitle": "Try selecting another category or changing location.",
    "home_props.view_all": "View All Properties",
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
