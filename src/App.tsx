import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { LogoIntro } from './components/LogoIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Rooms } from './components/Rooms';
import { Dining } from './components/Dining';
import { FoodMenu } from './components/FoodMenu';
import { Events } from './components/Events';
import { Attractions } from './components/Attractions';
import { InteractiveMap } from './components/InteractiveMap';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { LightboxModal } from './components/LightboxModal';
import { AdminDashboard } from './components/AdminDashboard';
import { VERIFIED_GALLERY, AttractionItem } from './data/hotelData';
import { InquiryRecord } from './types';
import { MenuItemData } from './types/siteData';

function MainAppContent() {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedMapAttractionId, setSelectedMapAttractionId] = useState<string | null>(null);

  // Persistent Booking Inquiries Store for Admin Dashboard
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('hotel_diamond_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
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
  });

  // Fetch inquiries from server
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('/api/inquiries');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setInquiries(data);
          }
        }
      } catch {
        // use local storage
      }
    };
    fetchInquiries();
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel_diamond_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Private Admin Route Detection (/diamond-control or #/diamond-control)
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash.includes('diamond-control') ||
        pathname.includes('diamond-control') ||
        search.includes('diamond-control')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  // Inquiry Modal State
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    defaultType: 'Room Stay' | 'Event Hall / Gathering' | 'Dining & Meals' | 'General Question';
    subTitle?: string;
  }>({
    isOpen: false,
    defaultType: 'Room Stay',
  });

  // Lightbox Modal State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    currentIndex: number;
  }>({
    isOpen: false,
    currentIndex: 0,
  });

  const handleAddInquiry = async (newInquiry: InquiryRecord) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });
    } catch {
      // offline fallback
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {
      // offline fallback
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
      });
    } catch {
      // offline fallback
    }
  };

  const handleOpenInquiry = (
    type: 'Room Stay' | 'Event Hall / Gathering' | 'Dining & Meals' | 'General Question' = 'Room Stay',
    subTitle?: string
  ) => {
    setInquiryModal({
      isOpen: true,
      defaultType: type,
      subTitle,
    });
  };

  const handleOrderDish = (dish: MenuItemData) => {
    const dishName = language === 'ne' ? dish.nameNe : dish.nameEn;
    handleOpenInquiry(
      'Dining & Meals',
      `Order / Inquiry: ${dishName} (Rs. ${dish.priceNpr})`
    );
  };

  const handleCloseInquiry = () => {
    setInquiryModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenLightbox = (index: number) => {
    setLightbox({
      isOpen: true,
      currentIndex: index,
    });
  };

  const handleOpenPhotoBySrc = (photoSrc: string) => {
    const foundIndex = VERIFIED_GALLERY.findIndex((img) => img.src === photoSrc);
    setLightbox({
      isOpen: true,
      currentIndex: foundIndex >= 0 ? foundIndex : 0,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNavigateLightbox = (newIndex: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: newIndex }));
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0 });
    setShowIntro(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAttractionOnMap = (attraction: AttractionItem) => {
    setSelectedMapAttractionId(attraction.id);
    scrollToSection('map');
  };

  return (
    <div className="min-h-screen bg-[#08101d] text-[#e5e9f0] selection:bg-[#c5a880]/30 selection:text-white relative">
      {/* Cinematic Logo Reveal Animation */}
      <AnimatePresence>
        {showIntro && <LogoIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Main Website Experience */}
      <div className={`transition-opacity duration-700 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation Bar */}
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          onReplayIntro={handleReplayIntro}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 1. Hero Section */}
        <Hero
          onExploreRooms={() => scrollToSection('rooms')}
          onContactUs={() => scrollToSection('contact')}
        />

        {/* 2. About Hotel & Interior Section (featuring entrance & diamond 22) */}
        <About
          onInquire={() => handleOpenInquiry('Room Stay', 'Welcome to Hotel Diamond, Sandhikharka')}
          onOpenPhoto={handleOpenPhotoBySrc}
        />

        {/* 3. Rooms & Accommodation Section (featuring diamond 222) */}
        <Rooms
          onInquire={(title) =>
            handleOpenInquiry('Room Stay', title ? `Inquiry for ${title}` : undefined)
          }
          onOpenPhoto={handleOpenPhotoBySrc}
        />

        {/* 4. Dining & Refreshments Welcome Overview */}
        <Dining onInquire={() => handleOpenInquiry('Dining & Meals', 'Group meals and family dining inquiry')} />

        {/* 5. Food & Restaurant Menu Section (Requirement 5) */}
        <FoodMenu onOrderDish={handleOrderDish} />

        {/* 6. Events & Celebrations Section */}
        <Events
          onInquire={(type) =>
            handleOpenInquiry('Event Hall / Gathering', 'Private ceremony & function venue inquiry')
          }
          onOpenPhoto={handleOpenPhotoBySrc}
        />

        {/* 7. Nearby Tourist Attractions Section (Rock Garden, Supa Deurali, Argha Durbar) */}
        <Attractions onSelectAttractionOnMap={handleSelectAttractionOnMap} />

        {/* 8. Interactive Map Section */}
        <InteractiveMap selectedAttractionId={selectedMapAttractionId} />

        {/* 9. Verified Photography Gallery with Lightbox */}
        <Gallery onOpenLightbox={handleOpenLightbox} />

        {/* 10. Contact Section with Real-Time Booking Sync */}
        <Contact onAddInquiry={handleAddInquiry} />

        {/* 11. Footer with DiamondShineLogo and Quiet Staff Portal Link */}
        <Footer
          onReplayIntro={handleReplayIntro}
          onOpenInquiry={() => handleOpenInquiry('Room Stay')}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Lightbox Modal */}
        <LightboxModal
          isOpen={lightbox.isOpen}
          currentIndex={lightbox.currentIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />

        {/* Inquiry Modal */}
        <InquiryModal
          isOpen={inquiryModal.isOpen}
          defaultType={inquiryModal.defaultType}
          subTitle={inquiryModal.subTitle}
          onClose={handleCloseInquiry}
          onAddInquiry={handleAddInquiry}
        />

        {/* Private Administration Dashboard Modal / Route */}
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.hash.includes('diamond-control')) {
              window.location.hash = '';
            }
          }}
          inquiries={inquiries}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onDeleteInquiry={handleDeleteInquiry}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SiteDataProvider>
        <MainAppContent />
      </SiteDataProvider>
    </LanguageProvider>
  );
}
