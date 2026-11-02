import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Passphrase SHA-256 hash
const ADMIN_HASH = 'e639fda193672e798f38ad8eb0a5cf6c7285267cedd3e4ed2fb8e0e2e28a517f';
const ADMIN_PLAIN = 'diamondadmin';

// Ensure data directory exists
const dataDir = path.resolve(__dirname, 'data');
const uploadsDir = path.resolve(__dirname, 'public/uploads');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const siteStateFile = path.join(dataDir, 'site_state.json');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

// Initialize default state if not exists
const defaultSiteState = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  hotelInfo: {
    name: 'Hotel Diamond',
    nameNepali: 'होटेल डायमण्ड',
    fullName: 'Hotel Diamond Family Restaurant & Lodge',
    fullNameNepali: 'होटेल डायमण्ड फेमिली रेस्टुरेन्ट एण्ड लज',
    locationShort: 'Sandhikharka, Nepal',
    locationShortNepali: 'सन्धिखर्क, नेपाल',
    locationFull: 'Chutrabesi, Ward No. 2, Indreni Tole, Sandhikharka, Arghakhanchi, Lumbini Province, Nepal',
    locationNepali: 'स.न.पा. - २, ईन्द्रेणी टोल, चुत्राबेसी, अर्घाखाँची',
    logoSrc: '/assets/aistudio/hotel_diamond_logo_transparent.png',
    heroImage: '/assets/aistudio/dimaod_22222_54d23815.jpg',
    aboutImage: '/assets/aistudio/diamond_77b7f194.jpg',
    // Strict requirement: diamond 222 for guest rooms, diamond 22 for hotel interior
    roomImage: '/assets/aistudio/dimaond_222_d9383761.jpg',
    interiorImage: '/assets/aistudio/diamond_22_49156d11.jpg',
    eventImage: '/assets/aistudio/dimaond.._9786ffcc.jpg',
    receptionImage: '/assets/aistudio/Interior_3924e649.jpg',
    phonePrimary: '+977 77-420111 / +977 9857062444',
    email: 'info@hoteldiamond.com.np',
    frontDeskHours: '24/7 Front Desk Support',
    announcementEn: '',
    announcementNe: '',
    aboutDescEn1: 'Nestled in the heart of Chutrabesi, Sandhikharka, Hotel Diamond offers authentic hospitality, comfortable accommodations, and scenic valley views of the Arghakhanchi hills.',
    aboutDescEn2: 'Whether you are arriving for spiritual pilgrimage to sacred Supa Deurali, business travel, family ceremonies, or regional sightseeing, our attentive team guarantees a warm and restful stay.',
    aboutDescNe1: 'चुत्राबेसी, सन्धिखर्कको शान्त वातावरणमा अवस्थित होटेल डायमण्डले तपाईंलाई आत्मीय आतिथ्य, आरामदायी कोठा र मनमोहक पहाडी दृश्यहरूको आनन्द प्रदान गर्दछ।',
    aboutDescNe2: 'पवित्र सुपा देउराली मन्दिर दर्शन, पारिवारिक समारोह, व्यापारिक भ्रमण वा अर्घाखाँचीको प्राकृतिक सौन्दर्य अवलोकनका लागि पाहुनाहरूको पहिलो रोजाइ।',
  },
  attractions: [
    {
      id: 'rock-garden',
      name: 'Arghakhanchi Rock Garden',
      nameNepali: 'अर्घाखाँची रक गार्डेन',
      image: '/assets/attractions/rock_garden_photo.jpg',
      descriptionEn: 'A breathtaking natural geological park featuring magnificent rock formations, panoramic view points, and fresh Himalayan breezes.',
      descriptionNe: 'प्राकृतिक ढुङ्गाका मनमोहक आकृतिहरू, विशाल चट्टानी संरचना र रमणीय पहाडी हावापानीले भरिपूर्ण अर्घाखाँचीको प्रमुख पर्यटकीय गन्तव्य।',
      roadDistance: '~18 km from Hotel Diamond',
      roadDistanceNepali: 'होटेल डायमण्डबाट करिब १८ कि.मि.',
      approxDuration: '45–50 mins via scenic route',
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
      image: '/assets/attractions/BLOG_supadeurali_o_336.jpg',
      descriptionEn: "One of Western Nepal's most revered Hindu pilgrimage shrines perched along dramatic cliffs, visited by thousands of devotees seeking blessings.",
      descriptionNe: 'पश्चिम नेपालकै अत्यन्त प्रख्यात तथा मनोकांक्षा पूरा हुने पवित्र धार्मिक तीर्थस्थल, जहाँ वर्षैभरि हजारौं भक्तजनहरूको घुइँचो लाग्ने गर्दछ।',
      roadDistance: '~22 km from Hotel Diamond',
      roadDistanceNepali: 'होटेल डायमण्डबाट करिब २२ कि.मि.',
      approxDuration: '45–55 mins via Highway',
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
      image: '/assets/attractions/argha_durbar.jpg',
      descriptionEn: 'Historic royal fort and temple complex of the historic Argha kingdom, offering rich cultural heritage and commanding vantage points.',
      descriptionNe: 'ऐतिहासिक अर्घा राज्यको प्राचीन दरबार तथा अर्घा भगवती मन्दिर परिसर, जहाँबाट ऐतिहासिक कला, संस्कृति र टाढा-टाढाका हिमशृङ्खला देखिन्छ।',
      roadDistance: '~6 km from Hotel Diamond',
      roadDistanceNepali: 'होटेल डायमण्डबाट करिब ६ कि.मि.',
      approxDuration: '20–25 mins uphill drive',
      approxDurationNepali: 'करिब २०-२५ मिनेट (उकालो यात्रा)',
      googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+Diamond,+Sandhikharka,+Nepal&destination=Argha+Bhagawati+Temple,+Argha+Durbar,+Arghakhanchi,+Nepal',
      lat: 28.0255,
      lng: 83.0722,
      highlightTag: 'Historic Heritage',
      highlightTagNepali: 'ऐतिहासिक सम्पदा',
    },
  ],
  menuItems: [
    {
      id: 'dish-1',
      nameEn: 'Authentic Nepali Khana Set (Thali)',
      nameNe: 'परम्परागत नेपाली दाल भात थाली सेट',
      category: 'Lunch',
      priceNpr: 380,
      image: '/assets/food/nepali_thali.jpg',
      descriptionEn: 'Steamed aromatic rice served with local hill lentil soup (dal), seasonal organic vegetable curry, mustard greens, homemade pickles, and fresh salad.',
      descriptionNe: 'बास्नादार चामलको भात, कालो दाल, स्थानीय ताजा तरकारी, रायोको साग, मुला र गोलभेंडाको अचार तथा सलाद सहितको तृप्तिकारक थाली।',
      isAvailable: true,
      isPopular: true,
    },
    {
      id: 'dish-2',
      nameEn: 'Himalayan Steamed Momos',
      nameNe: 'स्वादिष्ट पोलेको / उसिनेको मःमः',
      category: 'Snacks',
      priceNpr: 220,
      image: '/assets/food/steamed_momos.jpg',
      descriptionEn: 'Hand-crafted dumplings stuffed with spiced chicken or mountain greens, served with authentic fiery sesame and tomato achar.',
      descriptionNe: 'ताजा मसला र किमा भरिएको तात्तातो मःमः, टिमुर र तिल-गोलभेंडाको विशेष स्वादिलो अचार सहित।',
      isAvailable: true,
      isPopular: true,
    },
    {
      id: 'dish-3',
      nameEn: 'Local Spiced Chicken Sekuwa & Chhoila',
      nameNe: 'कुखुराको स्वादिष्ट सेकुवा र छोइला',
      category: 'Dinner',
      priceNpr: 350,
      image: '/assets/food/chicken_chhoila.jpg',
      descriptionEn: 'Charcoal-grilled tender chicken marinated in mustard oil, mountain garlic, ginger, and roasted spices. Perfect evening delicacy.',
      descriptionNe: 'कोइलामा पोलेको स्वादिलो कुखुराको सेकुवा, तोरीको तेल र हिमाली मसलाले मोलेको परम्परागत छोइला।',
      isAvailable: true,
      isPopular: true,
    },
    {
      id: 'dish-4',
      nameEn: 'Himalayan Masala Tea & Hill Breakfast',
      nameNe: 'मसाला चिया र ताजा नास्ता (ब्रेकफास्ट)',
      category: 'Breakfast',
      priceNpr: 120,
      image: '/assets/food/masala_tea_breakfast.jpg',
      descriptionEn: 'Freshly brewed mountain black tea with ginger, cardamom, and fresh whole milk, served with traditional toasted bread and farm eggs.',
      descriptionNe: 'अदुवा, सुकुमेल र ताजा दूध मिसाएर उमालेको तातो मसाला चिया, पाउरोटी र अण्डाको पौष्टिक नास्ता।',
      isAvailable: true,
      isPopular: false,
    },
  ],
  rooms: [
    {
      id: 'room-1',
      titleEn: 'Comfortable Twin Bedroom (diamond 222)',
      titleNe: 'आरामदायी जुम्ल्याहा कोठा (diamond 222)',
      image: '/assets/aistudio/dimaond_222_d9383761.jpg',
      rateDisplay: 'Contact Front Desk',
      rateNpr: 1800,
      descriptionEn: 'Tastefully furnished room featuring twin bed setup, warm floral linens, rich wood headboards, dressing vanity, and quiet ambiance.',
      descriptionNe: 'दुईवटा आरामदायक बेड, सफा ओछ्यान, काठको हेडबोर्ड, ड्रेसिङ टेबल र शान्त वातावरण भएको विशेष कोठा।',
      featuresEn: ['Twin comfortable beds', 'High-speed Wi-Fi', 'Attached modern bath', 'Room service & hot water'],
      featuresNe: ['दुईवटा आरामदायक ओछ्यान', 'उच्च गतिको वाइफाइ', 'एट्याच बाथरुम', 'तातो-चिसो पानी र कोठा सेवा'],
      isAvailable: true,
    },
    {
      id: 'room-2',
      titleEn: 'Deluxe Valley View Room',
      titleNe: 'डिलक्स भ्याली भ्यु कोठा',
      image: '/assets/aistudio/dimaod_22222_54d23815.jpg',
      rateDisplay: 'Contact Front Desk',
      rateNpr: 2500,
      descriptionEn: 'Spacious guest room with private exterior balcony overlooking the town and surrounding green mountains of Sandhikharka.',
      descriptionNe: 'सन्धिखर्क बजार र वरिपरिका हरियाली पहाडहरू देखिने निजी बाल्कोनी भएको फराकिलो कोठा।',
      featuresEn: ['King-size bed', 'Balcony valley view', 'LED Television', '24h Hot & cold water'],
      featuresNe: ['ठूलो किङ-साइज बेड', 'बाल्कोनी पहाडी दृश्य', 'एलईडी टिभी', '२४ सै घण्टा तातो पानी'],
      isAvailable: true,
    },
  ],
};

if (!fs.existsSync(siteStateFile)) {
  fs.writeFileSync(siteStateFile, JSON.stringify(defaultSiteState, null, 2), 'utf-8');
}

const defaultInquiries = [
  {
    id: 'sample-inq-1',
    fullName: 'Bishal Sharma',
    phone: '+977 9847000000',
    email: 'bishal.sharma@example.com',
    inquiryType: 'Room Stay',
    roomType: 'Comfortable Accommodation (diamond 222)',
    checkInDate: '2026-11-15',
    checkOutDate: '2026-11-17',
    guestsCount: '2 Guests',
    message: 'Visiting Supa Deurali temple with family, looking for quiet room on higher floor.',
    status: 'pending',
    createdAt: 'Nov 1, 2026, 08:30 PM',
  },
];

if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify(defaultInquiries, null, 2), 'utf-8');
}

// Express Body Parsers (support large image payloads for admin uploads)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads directory
app.use('/uploads', express.static(uploadsDir));
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));

// Token-based Admin Authentication store (in-memory with 24-hour expiration)
const activeAdminTokens = new Map<string, number>();

// Cleanup expired tokens every hour
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of activeAdminTokens.entries()) {
    if (expiry < now) {
      activeAdminTokens.delete(token);
    }
  }
}, 60 * 60 * 1000);

// Admin Authorization Middleware
const requireAdminAuth = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Administrative authentication required.' });
    return;
  }
  const token = authHeader.substring(7);
  const expiresAt = activeAdminTokens.get(token);
  if (!expiresAt || expiresAt < Date.now()) {
    if (expiresAt) activeAdminTokens.delete(token);
    res.status(401).json({ error: 'Unauthorized: Session expired or invalid. Please sign in again.' });
    return;
  }
  next();
};

const readSiteState = () => {
  if (fs.existsSync(siteStateFile)) {
    try {
      return JSON.parse(fs.readFileSync(siteStateFile, 'utf-8'));
    } catch {
      return defaultSiteState;
    }
  }
  return defaultSiteState;
};

const saveSiteState = (data: any) => {
  data.lastUpdated = new Date().toISOString();
  data.version = (data.version || 1) + 1;
  fs.writeFileSync(siteStateFile, JSON.stringify(data, null, 2), 'utf-8');
  return data;
};

// API Routes
// 1. Admin Authentication Check
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).json({ error: 'Password required' });
    return;
  }

  const adminSecret = process.env.ADMIN_PASSWORD || ADMIN_PLAIN;
  const targetHash = crypto.createHash('sha256').update(adminSecret).digest('hex');
  const inputHash = crypto.createHash('sha256').update(password).digest('hex');

  if (inputHash === targetHash || password === adminSecret || inputHash === ADMIN_HASH) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    activeAdminTokens.set(token, expiresAt);
    res.json({ success: true, token, expiresAt });
  } else {
    res.status(401).json({ error: 'Invalid administrative password' });
  }
});

app.get('/api/admin/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const expiresAt = activeAdminTokens.get(token);
    if (expiresAt && expiresAt > Date.now()) {
      res.json({ authenticated: true });
      return;
    }
  }
  res.status(401).json({ authenticated: false });
});

app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    activeAdminTokens.delete(token);
  }
  res.json({ success: true });
});

// 2. Site Data Endpoints
app.get('/api/site-data', (_req: Request, res: Response) => {
  try {
    const state = readSiteState();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read site data' });
  }
});

app.put('/api/site-data', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    if (!updatedData || typeof updatedData !== 'object') {
      res.status(400).json({ error: 'Invalid payload' });
      return;
    }
    const state = saveSiteState(updatedData);
    res.json({ success: true, state });
  } catch (err) {
    res.status(500).json({ error: 'Failed to persist site data' });
  }
});

// Atomic Destination Update (Rock Garden, Argha Durbar, Supa Deurali, etc.)
app.put('/api/attractions/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const state = readSiteState();
    const index = state.attractions.findIndex((a: any) => a.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Attraction not found' });
      return;
    }
    state.attractions[index] = { ...state.attractions[index], ...updates };
    const saved = saveSiteState(state);
    res.json({ success: true, attraction: state.attractions[index], state: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update attraction photo and details' });
  }
});

// Atomic Hotel Info & Facilities Update (Hero, Room, Interior, Event, Reception images)
app.put('/api/hotel-info', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const state = readSiteState();
    state.hotelInfo = { ...state.hotelInfo, ...updates };
    const saved = saveSiteState(state);
    res.json({ success: true, hotelInfo: state.hotelInfo, state: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hotel info' });
  }
});

// Atomic Menu Item Update / Create / Delete
app.put('/api/menu-items/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const state = readSiteState();
    const index = state.menuItems.findIndex((m: any) => m.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Menu dish not found' });
      return;
    }
    state.menuItems[index] = { ...state.menuItems[index], ...updates };
    const saved = saveSiteState(state);
    res.json({ success: true, menuItem: state.menuItems[index], state: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update menu dish' });
  }
});

app.post('/api/menu-items', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const item = req.body;
    const state = readSiteState();
    state.menuItems.push(item);
    const saved = saveSiteState(state);
    res.status(201).json({ success: true, menuItem: item, state: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add menu dish' });
  }
});

app.delete('/api/menu-items/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const state = readSiteState();
    state.menuItems = state.menuItems.filter((m: any) => m.id !== id);
    const saved = saveSiteState(state);
    res.json({ success: true, state: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete menu dish' });
  }
});

// Atomic Room Update
app.put('/api/rooms/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const state = readSiteState();
    const index = state.rooms.findIndex((r: any) => r.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }
    state.rooms[index] = { ...state.rooms[index], ...updates };
    const saved = saveSiteState(state);
    res.json({ success: true, room: state.rooms[index], state: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update room' });
  }
});

// 3. Image Upload (Supports Base64 data URLs - Protected by requireAdminAuth)
app.post('/api/upload', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { base64Data, filename } = req.body;
    if (!base64Data) {
      res.status(400).json({ error: 'No image data provided' });
      return;
    }

    // Strip header if present e.g. "data:image/jpeg;base64,"
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = '.jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = '.png';
      else if (mime.includes('webp')) ext = '.webp';
      else if (mime.includes('gif')) ext = '.gif';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(base64Data, 'base64');
    }

    const safeName = (filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : 'upload') + '_' + Date.now() + ext;
    const destPath = path.join(uploadsDir, safeName);
    fs.writeFileSync(destPath, buffer);

    res.json({
      success: true,
      url: `/uploads/${safeName}`,
    });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// 4. Inquiries Endpoints
app.get('/api/inquiries', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(inquiriesFile)) {
      const data = fs.readFileSync(inquiriesFile, 'utf-8');
      res.json(JSON.parse(data));
    } else {
      res.json(defaultInquiries);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to read inquiries' });
  }
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const newInquiry = req.body;
    if (!newInquiry.fullName || !newInquiry.phone) {
      res.status(400).json({ error: 'Full name and phone are required' });
      return;
    }

    let list: any[] = [];
    if (fs.existsSync(inquiriesFile)) {
      list = JSON.parse(fs.readFileSync(inquiriesFile, 'utf-8'));
    }
    list.unshift(newInquiry);
    fs.writeFileSync(inquiriesFile, JSON.stringify(list, null, 2), 'utf-8');

    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record inquiry' });
  }
});

app.put('/api/inquiries/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let list: any[] = [];
    if (fs.existsSync(inquiriesFile)) {
      list = JSON.parse(fs.readFileSync(inquiriesFile, 'utf-8'));
    }

    list = list.map((item) => (item.id === id ? { ...item, status } : item));
    fs.writeFileSync(inquiriesFile, JSON.stringify(list, null, 2), 'utf-8');

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

app.delete('/api/inquiries/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let list: any[] = [];
    if (fs.existsSync(inquiriesFile)) {
      list = JSON.parse(fs.readFileSync(inquiriesFile, 'utf-8'));
    }

    list = list.filter((item) => item.id !== id);
    fs.writeFileSync(inquiriesFile, JSON.stringify(list, null, 2), 'utf-8');

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// Vite Integration
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Hotel Diamond server running on port ${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
