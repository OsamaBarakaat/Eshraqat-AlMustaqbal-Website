export type PropertyCategory = "RESIDENTIAL" | "COMMERCIAL" | "AGRICULTURAL";

export type PropertyType =
  | "VILLA"
  | "APARTMENT"
  | "PENTHOUSE"
  | "PALACE"
  | "LAND"
  | "COMMERCIAL";

export type PropertyPurpose = "SALE" | "RENT" | "INVESTMENT";

export type PropertyStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export interface Property {
  id: string;
  code: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  fullDescription?: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  currency?: string;
  category?: PropertyCategory | string;
  type: PropertyType;
  purpose: PropertyPurpose;
  country?: string;
  city: string;
  district: string;
  streetAddress?: string;
  locationDescription?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  area: number;
  areaUnit?: string;
  bedrooms?: number;
  bathrooms?: number;
  livingRooms?: number;
  yearBuilt?: number;
  featured?: boolean;
  status: PropertyStatus;
  images: string[];
  amenities: string[];
  virtualTourUrl?: string;
  mortgageEligible?: boolean;
  hasElectronicDeed?: boolean;
  finishingType?: string;
  parkingSpaces?: number;
  landClassification?: string;
  waterAvailability?: boolean;
  commercialCategory?: string;
  commercialSuitableActivity?: string;
}
