export interface AttractionData {
  id: string;
  name: string;
  nameNepali: string;
  image: string;
  descriptionEn: string;
  descriptionNe: string;
  roadDistance: string;
  roadDistanceNepali: string;
  approxDuration: string;
  approxDurationNepali: string;
  googleMapsUrl: string;
  lat: number;
  lng: number;
  highlightTag: string;
  highlightTagNepali: string;
}

export interface MenuItemData {
  id: string;
  nameEn: string;
  nameNe: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Drinks';
  priceNpr: number;
  image: string;
  descriptionEn: string;
  descriptionNe: string;
  isAvailable: boolean;
  isPopular?: boolean;
}

export interface RoomItemData {
  id: string;
  titleEn: string;
  titleNe: string;
  image: string;
  rateDisplay: string;
  rateNpr: number;
  descriptionEn: string;
  descriptionNe: string;
  featuresEn: string[];
  featuresNe: string[];
  isAvailable: boolean;
}

export interface HotelInfoData {
  name: string;
  nameNepali: string;
  fullName: string;
  fullNameNepali: string;
  locationShort: string;
  locationShortNepali: string;
  locationFull: string;
  locationNepali: string;
  logoSrc: string;
  heroImage: string;
  aboutImage: string;
  interiorImage: string; // diamond 22
  roomImage: string; // diamond 222
  eventImage: string;
  receptionImage: string;
  phonePrimary: string;
  email: string;
  frontDeskHours: string;
  announcementEn: string;
  announcementNe: string;
  aboutDescEn1: string;
  aboutDescEn2: string;
  aboutDescNe1: string;
  aboutDescNe2: string;
}

export interface SiteDataState {
  version: number;
  lastUpdated: string;
  hotelInfo: HotelInfoData;
  attractions: AttractionData[];
  menuItems: MenuItemData[];
  rooms: RoomItemData[];
}
