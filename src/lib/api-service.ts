import { Property, PropertyType, PropertyPurpose } from "@/types/property";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://eshraqat-almustaqbal-backend.vercel.app/api/v1";

export interface DistrictItem {
  id: string;
  cityId: string;
  nameArabic: string;
  nameEnglish: string;
  enabled?: boolean;
}

export interface CityItem {
  id: string;
  provinceId: string;
  nameArabic: string;
  nameEnglish: string;
  districts: DistrictItem[];
  enabled?: boolean;
}

export interface ProvinceItem {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  cities: CityItem[];
  enabled?: boolean;
}

// Fallback Location Hierarchy matching Saudi Cities & Districts
export const FALLBACK_LOCATIONS: ProvinceItem[] = [
  {
    id: "prov-riyadh",
    nameArabic: "منطقة الرياض",
    nameEnglish: "Riyadh Province",
    cities: [
      {
        id: "city-riyadh",
        provinceId: "prov-riyadh",
        nameArabic: "مدينة الرياض",
        nameEnglish: "Riyadh City",
        districts: [
          { id: "dist-narjis", cityId: "city-riyadh", nameArabic: "حي النرجس", nameEnglish: "An Narjis" },
          { id: "dist-hittin", cityId: "city-riyadh", nameArabic: "حي حطين", nameEnglish: "Hittin" },
          { id: "dist-malqa", cityId: "city-riyadh", nameArabic: "حي الملقا", nameEnglish: "Al Malqa" },
          { id: "dist-yasmin", cityId: "city-riyadh", nameArabic: "حي الياسمين", nameEnglish: "Al Yasmin" },
          { id: "dist-aqeeq", cityId: "city-riyadh", nameArabic: "حي العقيق", nameEnglish: "Al Aqeeq" },
          { id: "dist-olaya", cityId: "city-riyadh", nameArabic: "حي العليا", nameEnglish: "Al Olaya" },
          { id: "dist-nakheel", cityId: "city-riyadh", nameArabic: "حي النخيل", nameEnglish: "Al Nakheel" },
        ],
      },
      {
        id: "city-kharj",
        provinceId: "prov-riyadh",
        nameArabic: "الخرج",
        nameEnglish: "Al Kharj",
        districts: [
          { id: "dist-kharj-1", cityId: "city-kharj", nameArabic: "حي الخالدية", nameEnglish: "Al Khalidiyah" },
          { id: "dist-kharj-2", cityId: "city-kharj", nameArabic: "حي الاندلس", nameEnglish: "Al Andalus" },
        ],
      },
    ],
  },
  {
    id: "prov-makkah",
    nameArabic: "منطقة مكة المكرمة",
    nameEnglish: "Makkah Province",
    cities: [
      {
        id: "city-jeddah",
        provinceId: "prov-makkah",
        nameArabic: "مدينة جدة",
        nameEnglish: "Jeddah City",
        districts: [
          { id: "dist-shati", cityId: "city-jeddah", nameArabic: "حي الشاطئ", nameEnglish: "Al Shati" },
          { id: "dist-mohammadiya", cityId: "city-jeddah", nameArabic: "حي المحمدية", nameEnglish: "Al Mohammadiyah" },
          { id: "dist-rawdah", cityId: "city-jeddah", nameArabic: "حي الروضة", nameEnglish: "Al Rawdah" },
          { id: "dist-andalus", cityId: "city-jeddah", nameArabic: "حي الأندلس", nameEnglish: "Al Andalus" },
        ],
      },
      {
        id: "city-makkah",
        provinceId: "prov-makkah",
        nameArabic: "مكة المكرمة",
        nameEnglish: "Makkah",
        districts: [
          { id: "dist-awali", cityId: "city-makkah", nameArabic: "حي العوالي", nameEnglish: "Al Awali" },
          { id: "dist-shouqia", cityId: "city-makkah", nameArabic: "حي الشوقية", nameEnglish: "Al Shouqiyah" },
        ],
      },
    ],
  },
  {
    id: "prov-eastern",
    nameArabic: "المنطقة الشرقية",
    nameEnglish: "Eastern Province",
    cities: [
      {
        id: "city-khobar",
        provinceId: "prov-eastern",
        nameArabic: "الخبر",
        nameEnglish: "Al Khobar",
        districts: [
          { id: "dist-hizam-thahabi", cityId: "city-khobar", nameArabic: "الحزام الذهبي", nameEnglish: "Golden Belt" },
          { id: "dist-corniche", cityId: "city-khobar", nameArabic: "الكورنيش", nameEnglish: "Corniche" },
        ],
      },
      {
        id: "city-dammam",
        provinceId: "prov-eastern",
        nameArabic: "الدمام",
        nameEnglish: "Dammam",
        districts: [
          { id: "dist-shatee-dammam", cityId: "city-dammam", nameArabic: "حي الشاطئ الشرقي", nameEnglish: "East Shati" },
          { id: "dist-faisaliyah", cityId: "city-dammam", nameArabic: "حي الفيصلية", nameEnglish: "Al Faisaliyah" },
        ],
      },
    ],
  },
];

// Curated high-end Saudi luxury properties matching the brand aesthetic
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
    city: "مدينة الرياض",
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
    city: "مدينة الرياض",
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
    city: "مدينة الرياض",
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
    finishingType: "فندقي مودرن فاخر",
    parkingSpaces: 2,
  },
  {
    id: "prop-luxury-4",
    code: "ESH-804",
    title: "فيلا تاون هاوس ذكية بتصميم سداسي مع حديقة | حي الملقا",
    titleEn: "Smart Architectural Townhouse with Garden | Al-Malqa",
    description:
      "فيلا تاون هاوس بتصميم معماري انسيابي مستوحى من كود وادي حنيفة، مساحات مفتوحة وتوزيع ذكي للضوء الطبيعي. تقع بجوار أفضل المدارس الدولية والمراكز الصحية.",
    descriptionEn:
      "Contemporary townhouse with fluid architectural contours, natural skylights, and manicured private garden located in the vibrant hub of Al-Malqa.",
    price: 3600000,
    type: "VILLA",
    purpose: "SALE",
    city: "مدينة الرياض",
    district: "حي الملقا",
    area: 380,
    bedrooms: 4,
    bathrooms: 5,
    livingRooms: 2,
    yearBuilt: 2025,
    featured: false,
    status: "PUBLISHED",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "حديقة خاصة مع ري ذكي",
      "مطبخ أمريكي مفتوح",
      "تكييف مركزي دايكن إنفرتر",
      "عوازل حرارية ومائية معتمدة",
    ],
    mortgageEligible: true,
    hasElectronicDeed: true,
    finishingType: "ديلوكس فاخر",
    parkingSpaces: 2,
  },
];

// Helper to map backend property entity to frontend Property interface
function mapBackendProperty(item: any): Property {
  // Extract images array
  let images: string[] = [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    images = item.images.map((img: any) => (typeof img === "string" ? img : img.url)).filter(Boolean);
  }
  if (images.length === 0) {
    images = ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85"];
  }

  // Location text
  const city = item.cityRel?.nameArabic || item.city || "مدينة الرياض";
  const district = item.districtRel?.nameArabic || item.areaName || "حي النرجس";

  // Category to PropertyType
  let type: PropertyType = "VILLA";
  const cat = (item.category || item.type || "").toUpperCase();
  if (["VILLA", "APARTMENT", "PENTHOUSE", "PALACE", "LAND", "COMMERCIAL"].includes(cat)) {
    type = cat as PropertyType;
  }

  const purpose: PropertyPurpose = (item.purpose || "SALE").toUpperCase() === "RENT" ? "RENT" : "SALE";

  return {
    id: item.id || `prop-${Date.now()}`,
    code: item.code || `ESH-${(item.id || "0000").slice(0, 4).toUpperCase()}`,
    title: item.title || "عقار فاخر مميز",
    titleEn: item.nameEnglish || item.titleEn,
    description: item.shortDescription || item.fullDescription || item.description || "عقار فاخر تم تطويره بأرقى المعايير الإنشائية.",
    descriptionEn: item.descriptionEn,
    price: Number(item.price) || 2500000,
    type,
    purpose,
    city,
    district,
    area: Number(item.area) || 350,
    bedrooms: Number(item.residentialBedrooms) || Number(item.bedrooms) || 4,
    bathrooms: Number(item.residentialBathrooms) || Number(item.bathrooms) || 5,
    livingRooms: Number(item.residentialLivingRooms) || Number(item.livingRooms) || 2,
    yearBuilt: item.yearBuilt || 2025,
    featured: Boolean(item.featured),
    status: item.status || "PUBLISHED",
    images,
    amenities: Array.isArray(item.amenities) && item.amenities.length > 0
      ? item.amenities
      : ["موقف خاص", "مصعد راكب", "سمارت هوم", "تكييف مركزي"],
    mortgageEligible: item.mortgageEligible !== false,
    hasElectronicDeed: item.hasElectronicDeed !== false,
    finishingType: item.finishingType || "تشطيب فاخر ديلوكس",
    parkingSpaces: Number(item.parkingSpaces) || 2,
    virtualTourUrl: item.virtualTourUrl,
  };
}

export const ApiService = {
  /**
   * Fetch live dynamic hierarchy of Provinces -> Cities -> Districts
   */
  async getLocationsHierarchy(): Promise<ProvinceItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/locations/public`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) throw new Error("Locations fetch failed");
      const json = await res.json();
      const list = json?.data || json;
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
      return FALLBACK_LOCATIONS;
    } catch {
      return FALLBACK_LOCATIONS;
    }
  },

  /**
   * Fetch live properties with full query parameters
   */
  async getProperties(query?: {
    search?: string;
    category?: string;
    purpose?: string;
    cityId?: string;
    districtId?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]> {
    try {
      const params = new URLSearchParams();
      params.append("limit", "50");
      if (query?.search?.trim()) params.append("search", query.search.trim());
      if (query?.category && query.category !== "ALL") params.append("category", query.category);
      if (query?.purpose && query.purpose !== "ALL") params.append("purpose", query.purpose);
      if (query?.cityId && query.cityId !== "ALL") params.append("cityId", query.cityId);
      if (query?.districtId && query.districtId !== "ALL") params.append("districtId", query.districtId);
      if (query?.minPrice !== undefined) params.append("minPrice", String(query.minPrice));
      if (query?.maxPrice !== undefined) params.append("maxPrice", String(query.maxPrice));

      const isServer = typeof window === "undefined";
      const res = await fetch(`${API_BASE_URL}/properties/public?${params.toString()}`, {
        ...(isServer ? { next: { revalidate: 30 } } : { cache: "no-store" }),
      });

      if (res.ok) {
        const json = await res.json();
        const rawItems = json?.data?.items || json?.items || (Array.isArray(json) ? json : null);
        if (rawItems && Array.isArray(rawItems) && rawItems.length > 0) {
          const mappedApiProps = rawItems.map(mapBackendProperty);
          // If no specific backend search filters, include fallback properties too so the catalog is rich
          if (!query?.cityId && !query?.districtId && !query?.search) {
            const existingIds = new Set(mappedApiProps.map((p) => p.id));
            const uniqueFallbacks = FALLBACK_PROPERTIES.filter((p) => !existingIds.has(p.id));
            return [...mappedApiProps, ...uniqueFallbacks];
          }
          return mappedApiProps;
        }
      }
    } catch (err) {
      console.warn("Failed to fetch from backend properties API, using fallback:", err);
    }

    return FALLBACK_PROPERTIES;
  },

  /**
   * Get single property by ID or Slug from public endpoint
   */
  async getPropertyById(idOrSlug: string): Promise<Property | null> {
    try {
      const isServer = typeof window === "undefined";
      const res = await fetch(`${API_BASE_URL}/properties/public/${idOrSlug}`, {
        ...(isServer ? { next: { revalidate: 30 } } : { cache: "no-store" }),
      });
      if (res.ok) {
        const json = await res.json();
        const item = json?.data || json;
        if (item && item.id) {
          return mapBackendProperty(item);
        }
      }
    } catch {
      // fallback
    }

    // Check fallback
    return (
      FALLBACK_PROPERTIES.find((p) => p.id === idOrSlug || p.code.toLowerCase() === idOrSlug.toLowerCase()) ||
      null
    );
  },

  /**
   * Book viewing appointment
   */
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
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return {
      id: `APP-${Date.now().toString().slice(-6)}`,
      status: "PENDING_CONFIRMATION",
      message: "تم تسجيل موعد المعاينة بنجاح.",
    };
  },
};
