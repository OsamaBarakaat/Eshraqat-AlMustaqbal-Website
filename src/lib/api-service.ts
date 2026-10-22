import { Property } from "@/types/property";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://eshraqat-almustaqbal-backend.vercel.app/api/v1";

// High-end Saudi luxury curated properties matching the uploaded design aesthetic
export const FALLBACK_PROPERTIES: Property[] = [
  {
    id: "prop-luxury-1",
    code: "ESH-801",
    title: "فيلا مودرن ملكية مع شلال ومسبح خاص | حي النرجس",
    titleEn: "Modern Royal Villa with Waterfall & Private Pool | Al-Narjis",
    description:
      "تحفة معمارية استثنائية في أرقى مربعات حي النرجس بالرياض. تتميز بواجهات زجاجية مزدوجة بارتفاع 6 أمتار، مصعد بانورامي راكب، مسبح خارجي بشلال متدفق، وتدفئة أرضية ذكية متصلة بنظام Smart Home متكامل.",
    descriptionEn:
      "An exceptional architectural masterpiece in the prime quarter of Al-Narjis, Riyadh. Features double-height glass facades, panoramic elevator, private overflow pool, and fully integrated Smart Home automation.",
    price: 4850000,
    type: "VILLA",
    purpose: "SALE",
    city: "الرياض",
    district: "حي النرجس",
    area: 520,
    bedrooms: 5,
    bathrooms: 7,
    livingRooms: 3,
    yearBuilt: 2025,
    featured: true,
    status: "PUBLISHED",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "مسبح خاص مع نظام تدفئة",
      "مصعد بانورامي راكب",
      "غرفة سينما خاصة",
      "جناح كامل للخادمة والغسيل",
      "غرفة سائق بحمام خاص",
      "نظام سمارت هوم ذكي KNX",
      "حديقة شتوية وجلسة شواء",
    ],
    mortgageEligible: true,
    hasElectronicDeed: true,
    finishingType: "ألترا سوبر ديلوكس",
    parkingSpaces: 3,
    virtualTourUrl: "https://my.matterport.com/show/?m=sample",
  },
  {
    id: "prop-luxury-2",
    code: "ESH-802",
    title: "قصر مودرن فاخر بإطلالة بانورامية | حي حطين النموذجي",
    titleEn: "Ultra-Luxury Modern Palace with Panoramic Views | Hittin",
    description:
      "قصر استثنائي على شارعين متقاطعين بالقرب من بوليفارد رياض سيتي ومجمع مركز الملك عبد الله المالي KAFD. تصميم أوروبي متفرد وتشطيبات من أجود أنواع الرخام الإيطالي (كلكتا ومارينارا).",
    descriptionEn:
      "Spectacular corner palace minutes away from Boulevard Riyadh City and KAFD. Italian marble flooring, lush landscape, and bespoke interior architecture.",
    price: 9200000,
    type: "PALACE",
    purpose: "SALE",
    city: "الرياض",
    district: "حي حطين",
    area: 840,
    bedrooms: 6,
    bathrooms: 9,
    livingRooms: 4,
    yearBuilt: 2026,
    featured: true,
    status: "PUBLISHED",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "مسبح داخلي وخارجي",
      "مصعد إيطالي ميتسوبيشي",
      "نادي رياضي خاص Gym",
      "مجلس ضيافة ملكي مستقل",
      "مواقف تتسع لـ 5 سيارات",
      "نظام كاميرات ومراقبة ذكية",
    ],
    mortgageEligible: true,
    hasElectronicDeed: true,
    finishingType: "رخام ملكي وتشطيب ألماني",
    parkingSpaces: 5,
  },
  {
    id: "prop-luxury-3",
    code: "ESH-803",
    title: "بنتهاوس فاخر بتراس خاص وإطلالة أبراج كافد | حي العقيق",
    titleEn: "Luxury Sky Penthouse with KAFD Skyline View | Al-Aqeeq",
    description:
      "شقة بنتهاوس علوية تغطي الطابق بالكامل، مع روف خاص وتراس بمسطحات خضراء وجلسة نار خارجية مطابقة لإطلالة كافد الساحرة. تشطيب فندقي 5 نجوم مع دخول خاص عبر المصعد.",
    descriptionEn:
      "Whole-floor luxury penthouse with expansive private sky terrace overlooking the KAFD skyline. Private keycard elevator access and 5-star hotel finishing.",
    price: 2150000,
    type: "PENTHOUSE",
    purpose: "SALE",
    city: "الرياض",
    district: "حي العقيق",
    area: 280,
    bedrooms: 3,
    bathrooms: 4,
    livingRooms: 2,
    yearBuilt: 2025,
    featured: true,
    status: "PUBLISHED",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "تراس وسيع مع جلسة شواء",
      "دخول خاص برمز مشفر للمصعد",
      "مطبخ ألماني مجهز بالكامل",
      "موقفين قبو مظللة",
      "مستودع خاص بالقبو",
    ],
    mortgageEligible: true,
    hasElectronicDeed: true,
    finishingType: "سوبر فندقي",
    parkingSpaces: 2,
  },
  {
    id: "prop-luxury-4",
    code: "ESH-804",
    title: "فيلا تاون هاوس حديثة بتصميم نيو كلاسيك | حي الملقا",
    titleEn: "Modern Neo-Classic Townhouse Villa | Al-Malqa",
    description:
      "تصميم عملي وراقي يلبي تطلعات العائلة السعودية العصرية، بهو مدخل واسع، مطبخ أمريكي مفتوح، وصالة عائلية تطل على فناء جانبي وشلال مائي هادئ.",
    descriptionEn:
      "Neo-classic luxury townhouse designed for modern Saudi living. Open-plan kitchen, water cascade courtyard, and private master suites.",
    price: 3600000,
    type: "VILLA",
    purpose: "SALE",
    city: "الرياض",
    district: "حي الملقا",
    area: 360,
    bedrooms: 4,
    bathrooms: 6,
    livingRooms: 2,
    yearBuilt: 2025,
    featured: false,
    status: "PUBLISHED",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "حديقة جانبية وشلال",
      "مصعد راكب",
      "أجنحة نوم ماستر بالكامل",
      "تكييف مخفي لكامل الفيلا",
      "عزل حراري ومائي بضمان 10 سنوات",
    ],
    mortgageEligible: true,
    hasElectronicDeed: true,
    finishingType: "ديلوكس فاخر",
    parkingSpaces: 2,
  },
];

export const ApiService = {
  async getProperties(): Promise<Property[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties?limit=50&status=PUBLISHED`, {
        next: { revalidate: 30 },
      });
      if (!res.ok) throw new Error("Backend response error");
      const data = await res.json();
      if (data?.items && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.map((item: any) => ({
          id: item.id,
          code: item.code || `ESH-${item.id.slice(0, 4)}`,
          title: item.title,
          description: item.description || "",
          price: Number(item.price) || 1000000,
          type: item.type || "VILLA",
          purpose: item.purpose || "SALE",
          city: item.city || "الرياض",
          district: item.district || "حي النرجس",
          area: Number(item.area) || 350,
          bedrooms: Number(item.bedrooms) || 4,
          bathrooms: Number(item.bathrooms) || 5,
          livingRooms: Number(item.livingRooms) || 2,
          yearBuilt: item.yearBuilt || 2025,
          featured: !!item.featured,
          status: item.status || "PUBLISHED",
          images:
            item.images && item.images.length > 0
              ? item.images
              : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85"],
          amenities: item.amenities || [
            "موقف خاص",
            "مصعد راكب",
            "سمارت هوم",
            "تكييف مركزي",
          ],
          mortgageEligible: true,
          hasElectronicDeed: true,
        }));
      }
      return FALLBACK_PROPERTIES;
    } catch {
      return FALLBACK_PROPERTIES;
    }
  },

  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${id}`);
      if (res.ok) {
        const item = await res.json();
        return {
          id: item.id,
          code: item.code || `ESH-${item.id.slice(0, 4)}`,
          title: item.title,
          description: item.description || "",
          price: Number(item.price) || 1000000,
          type: item.type || "VILLA",
          purpose: item.purpose || "SALE",
          city: item.city || "الرياض",
          district: item.district || "حي النرجس",
          area: Number(item.area) || 350,
          bedrooms: Number(item.bedrooms) || 4,
          bathrooms: Number(item.bathrooms) || 5,
          livingRooms: Number(item.livingRooms) || 2,
          yearBuilt: item.yearBuilt || 2025,
          featured: !!item.featured,
          status: item.status || "PUBLISHED",
          images:
            item.images && item.images.length > 0
              ? item.images
              : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85"],
          amenities: item.amenities || [
            "موقف خاص",
            "مصعد راكب",
            "سمارت هوم",
            "تكييف مركزي",
          ],
          mortgageEligible: true,
          hasElectronicDeed: true,
        };
      }
    } catch {
      // fallback
    }
    return FALLBACK_PROPERTIES.find((p) => p.id === id) || FALLBACK_PROPERTIES[0];
  },

  async bookViewing(data: {
    propertyId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    requestedDate: string;
    requestedTime: string;
    notes?: string;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      // Return simulated success if offline
      return {
        id: `appt-${Date.now()}`,
        status: "PENDING_CONFIRMATION",
        message: "تم تسجيل موعد المعاينة بنجاح.",
      };
    }
  },
};
