import { Property, PropertyType, PropertyPurpose } from "@/types/property";
import { ClientBooking } from "@/lib/client-bookings";

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

// Fallback Location Hierarchy matching Saudi Cities & Districts if offline
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

  // Category from DB (RESIDENTIAL, COMMERCIAL, AGRICULTURAL)
  const rawCategory = (item.category || "").toUpperCase();
  let category: string = "RESIDENTIAL";
  if (["RESIDENTIAL", "COMMERCIAL", "AGRICULTURAL"].includes(rawCategory)) {
    category = rawCategory;
  } else if (rawCategory.includes("COMMERCIAL") || rawCategory.includes("تجاري")) {
    category = "COMMERCIAL";
  } else if (rawCategory.includes("LAND") || rawCategory.includes("AGRICULTURAL") || rawCategory.includes("أراضي") || rawCategory.includes("زراعي")) {
    category = "AGRICULTURAL";
  }

  // Category to PropertyType
  let type: PropertyType = "VILLA";
  if (category === "COMMERCIAL") type = "COMMERCIAL";
  else if (category === "AGRICULTURAL") type = "LAND";
  else {
    const cat = (item.type || "").toUpperCase();
    if (["VILLA", "APARTMENT", "PENTHOUSE", "PALACE"].includes(cat)) {
      type = cat as PropertyType;
    }
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
    category,
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
   * Fetch strictly live properties from the backend database (no static fallback)
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

      const res = await fetch(`${API_BASE_URL}/properties/public?${params.toString()}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const json = await res.json();
        const rawItems = json?.data?.items || json?.items || (Array.isArray(json) ? json : null);
        if (rawItems && Array.isArray(rawItems)) {
          return rawItems.map(mapBackendProperty);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch from backend properties API:", err);
    }

    return [];
  },

  /**
   * Get single property strictly from backend database by ID or Slug
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
    } catch (err) {
      console.warn("Failed to fetch property by id from backend API:", err);
    }

    return null;
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
        const json = await res.json();
        return json?.data || json;
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

  /**
   * Fetch live bookings for a client by email or phone
   */
  async getClientBookings(email?: string, phone?: string): Promise<ClientBooking[]> {
    if (!email && !phone) return [];
    try {
      const params = new URLSearchParams();
      if (email) params.append("email", email);
      if (phone) params.append("phone", phone);

      const res = await fetch(`${API_BASE_URL}/appointments/client?${params.toString()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        const items = json?.data || json;
        if (Array.isArray(items)) {
          return items.map((item: any) => ({
            id: item.id,
            propertyId: item.propertyId,
            propertyCode: item.propertyCode || `ESH-${(item.propertyId || "").slice(0, 4).toUpperCase()}`,
            propertyTitle: item.propertyTitle || "عقار إشراقة",
            propertyImage: item.propertyImage || "",
            propertyCity: item.propertyLocation?.split(" - ")[0] || "",
            propertyDistrict: item.propertyLocation?.split(" - ")[1] || "",
            propertyPrice: Number(item.propertyPrice) || 0,
            date: item.requestedDate,
            time: item.requestedTime,
            customerName: item.customerName,
            customerPhone: item.customerPhone,
            customerEmail: item.customerEmail,
            notes: item.notes || "",
            status: item.status,
            createdAt: item.createdAt,
          }));
        }
      }
    } catch (err) {
      console.warn("Failed to fetch client bookings from API:", err);
    }
    return [];
  },

  /**
   * Cancel client viewing appointment on the backend
   */
  async cancelClientBooking(id: string, email?: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/client/${id}/cancel`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  /**
   * Fetch live website configuration from backend CMS (Hero, Pillars, Contact, Social, SEO)
   */
  async getWebsiteConfig() {
    try {
      const res = await fetch(`${API_BASE_URL}/cms/public/bootstrap`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        return json?.data || json;
      }
    } catch (err) {
      console.warn("Failed to fetch website config from CMS API:", err);
    }
    return null;
  },
};
