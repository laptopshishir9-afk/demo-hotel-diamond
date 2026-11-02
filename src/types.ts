export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: 'Exterior' | 'Rooms' | 'Interior' | 'Events' | 'Reception';
  caption: string;
  description: string;
}

export interface InquiryRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: 'Room Stay' | 'Event Hall / Gathering' | 'Dining & Meals' | 'General Question';
  roomType?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestsCount?: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export type InquiryFormData = Omit<InquiryRecord, 'id' | 'status' | 'createdAt'>;
