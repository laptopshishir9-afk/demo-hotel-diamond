import { GalleryImage } from '../types';

export interface AttractionItem {
  id: string;
  name: string;
  nameNepali: string;
  image: string;
  descriptionKey: 'rockGardenDesc' | 'supaDeuraliDesc' | 'arghaDurbarDesc';
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

export const HOTEL_INFO = {
  name: 'Hotel Diamond',
  nameNepali: 'होटेल डायमण्ड',
  fullName: 'Hotel Diamond Family Restaurant & Lodge',
  fullNameNepali: 'होटेल डायमण्ड फेमिली रेस्टुरेन्ट एण्ड लज',
  locationShort: 'Sandhikharka, Nepal',
  locationShortNepali: 'सन्धिखर्क, नेपाल',
  locationFull: 'Chutrabesi, Ward No. 2, Indreni Tole, Sandhikharka, Arghakhanchi, Lumbini Province, Nepal',
  locationNepali: 'स.न.पा. - २, ईन्द्रेणी टोल, चुत्राबेसी, अर्घाखाँची',
  // Pixel-perfect transparent logo without background checkerboard
  logoSrc: './assets/aistudio/hotel_diamond_logo_transparent.png',
  heroImage: './assets/aistudio/dimaod_22222_54d23815.jpg',
  aboutImage: './assets/aistudio/diamond_77b7f194.jpg',
  roomImage: './assets/aistudio/dimaond_222_d9383761.jpg',
  interiorImage: './assets/aistudio/diamond_22_49156d11.jpg',
  eventImage: './assets/aistudio/dimaond.._9786ffcc.jpg',
  receptionImage: './assets/aistudio/Interior_3924e649.jpg',
  phonePlaceholder: '+977 77-XXXXXX / +977 98XXXXXXXX',
  emailPlaceholder: 'inquiry@hoteldiamond.com.np',
  coordinates: {
    lat: 27.9944,
    lng: 83.0818,
  },
};

export const NEARBY_ATTRACTIONS: AttractionItem[] = [
  {
    id: 'rock-garden',
    name: 'Arghakhanchi Rock Garden',
    nameNepali: 'अर्घाखाँची रक गार्डेन',
    image: './assets/attractions/rock_garden_photo.jpg',
    descriptionKey: 'rockGardenDesc',
    roadDistance: '~18 km from Hotel Diamond',
    roadDistanceNepali: 'होटेल डायमण्डबाट करिब १८ कि.मि.',
    approxDuration: '45–50 mins via regional scenic route',
    approxDurationNepali: 'करिब ४५-५० मिनेट यात्रा समय',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+Diamond,+Sandhikharka,+Nepal&destination=Arghakhanchi+Rock+Garden,+Nepal',
    lat: 28.0645,
    lng: 83.1250,
    highlightTag: 'Natural Wonder',
    highlightTagNepali: 'प्राकृतिक सौन्दर्य',
  },
  {
    id: 'supa-deurali',
    name: 'Supa Deurali Temple',
    nameNepali: 'सुपा देउराली मन्दिर',
    image: './assets/attractions/BLOG_supadeurali_o_336.jpg',
    descriptionKey: 'supaDeuraliDesc',
    roadDistance: '~22 km from Hotel Diamond',
    roadDistanceNepali: 'होटेल डायमण्डबाट करिब २२ कि.मि.',
    approxDuration: '45–55 mins via Gorusinge-Sandhikharka Highway',
    approxDurationNepali: 'करिब ४५-५५ मिनेट (राजमार्ग भएर)',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+Diamond,+Sandhikharka,+Nepal&destination=Supa+Deurali+Temple,+Arghakhanchi,+Nepal',
    lat: 27.8812,
    lng: 83.0988,
    highlightTag: 'Sacred Pilgrimage',
    highlightTagNepali: 'प्रसिद्ध धार्मिक स्थल',
  },
  {
    id: 'argha-durbar',
    name: 'Argha Durbar',
    nameNepali: 'अर्घौँ दरबार',
    image: './assets/attractions/argha_durbar.jpg',
    descriptionKey: 'arghaDurbarDesc',
    roadDistance: '~6 km from Hotel Diamond',
    roadDistanceNepali: 'होटेल डायमण्डबाट करिब ६ कि.मि.',
    approxDuration: '20–25 mins uphill drive from town',
    approxDurationNepali: 'करिब २०-२५ मिनेट (उकालो यात्रा)',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+Diamond,+Sandhikharka,+Nepal&destination=Argha+Bhagawati+Temple,+Argha+Durbar,+Arghakhanchi,+Nepal',
    lat: 28.0255,
    lng: 83.0722,
    highlightTag: 'Historic Heritage',
    highlightTagNepali: 'ऐतिहासिक सम्पदा',
  },
];

export const VERIFIED_GALLERY: GalleryImage[] = [
  {
    id: 'exterior-facade',
    src: HOTEL_INFO.heroImage,
    title: 'Hotel Diamond Exterior & Building',
    category: 'Exterior',
    caption: 'Front facade and architecture located in Chutrabesi, Sandhikharka.',
    description: 'The exterior of Hotel Diamond featuring guest balconies, street presence, and welcoming hospitality in Arghakhanchi district.',
  },
  {
    id: 'entrance-approach',
    src: HOTEL_INFO.aboutImage,
    title: 'Main Entrance & Street Approach',
    category: 'Exterior',
    caption: 'Ground floor entrance, evergreen pine tree, and guest parking area.',
    description: 'Convenient ground-level arrival with guest parking assistance and direct access to the hotel lobby and family dining area.',
  },
  {
    id: 'guest-bedroom',
    src: HOTEL_INFO.roomImage,
    title: 'Comfortable Guest Rooms',
    category: 'Rooms',
    caption: 'Dedicated guest accommodation with comfortable modern bedding and peaceful ambiance.',
    description: 'Prepared for a quiet, restful night with fresh linens, comfortable furnishings, and attentive front desk service.',
  },
  {
    id: 'hotel-interior',
    src: HOTEL_INFO.interiorImage,
    title: 'Hotel Interior & Guest Lounge',
    category: 'Interior',
    caption: 'Comfortable interior seating area, dressing mirrors, and peaceful lodge corridors.',
    description: 'Interior facilities providing warm hospitality, restful atmosphere, and convenient access to all amenities.',
  },
  {
    id: 'reception-lobby',
    src: HOTEL_INFO.receptionImage,
    title: 'Reception & Front Desk',
    category: 'Reception',
    caption: 'Front desk reception counter with world timepieces and guest check-in area.',
    description: 'Warm personalized greeting upon arrival with continuous front desk support for all your accommodation and local travel queries.',
  },
  {
    id: 'event-hall',
    src: HOTEL_INFO.eventImage,
    title: 'Banquet & Event Function Hall',
    category: 'Events',
    caption: 'Dedicated event hall with formal seating, stage backdrop, and chandeliers.',
    description: 'Versatile indoor space equipped with banquet chair seating, stage podium, and ambient lighting for family ceremonies, meetings, and group gatherings.',
  },
];
