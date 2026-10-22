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
  price: number;
  category?: PropertyCategory | string;
  type: PropertyType;
  purpose: PropertyPurpose;
  city: string;
  district: string;
  area: number; // in sq meters
  bedrooms: number;
  bathrooms: number;
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
}
