import React, { useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { GalleryImage } from '../types';

interface LightboxModalProps {
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  images?: GalleryImage[];
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  images: customImages,
}) => {
  const { siteData } = useSiteData();

  const galleryList: GalleryImage[] = useMemo(() => {
    if (customImages && customImages.length > 0) return customImages;
    return [
      {
        id: 'exterior-facade',
        src: siteData.hotelInfo.heroImage,
        title: 'Hotel Diamond Exterior Facade in Sandhikharka',
        category: 'Exterior',
        caption: 'Hotel Diamond Chutrabesi Exterior - Road view',
        description: 'The distinctive exterior presence of Hotel Diamond welcoming visitors to Sandhikharka.',
      },
      {
        id: 'exterior-day',
        src: siteData.hotelInfo.aboutImage,
        title: 'Hotel Building View & Street Entrance',
        category: 'Exterior',
        caption: 'Exterior Architecture & Guest Entrance',
        description: 'Main street entrance facing the town center with direct road accessibility.',
      },
      {
        id: 'bedroom-twin',
        src: siteData.hotelInfo.roomImage,
        title: siteData.hotelInfo.roomTitle || 'Hotel Diamond Twin Bed Guest Room',
        category: 'Rooms',
        caption: 'Guest Twin Bedroom with Warm Linens and Wooden Headboard',
        description: siteData.hotelInfo.roomDesc || 'Authentic guest bedroom featuring rich dark wood furnishings, dual beds, and private vanity.',
      },
      {
        id: 'interior-hall',
        src: siteData.hotelInfo.interiorImage,
        title: siteData.hotelInfo.interiorTitle || 'Hotel Diamond Interior & Banquet Seating',
        category: 'Interior',
        caption: 'Interior Gathering Space & Stage Hall',
        description: siteData.hotelInfo.interiorDesc || 'Spacious indoor seating hall arranged for ceremonies, celebrations, and dining.',
      },
      {
        id: 'banquet-hall',
        src: siteData.hotelInfo.eventImage,
        title: 'Hotel Diamond Event & Meeting Facility',
        category: 'Events',
        caption: 'Spacious Multi-purpose Hall for Ceremonies & Conferences',
        description: 'Expansive gathering hall suitable for weddings, party celebrations, and community assemblies.',
      },
      {
        id: 'reception-desk',
        src: siteData.hotelInfo.receptionImage,
        title: 'Hotel Diamond Reception & Lobby Area',
        category: 'Reception',
        caption: 'Front Desk & Welcome Area for Arriving Travelers',
        description: 'Warm front desk and hospitality counter for seamless check-in and local travel guidance.',
      },
    ];
  }, [customImages, siteData.hotelInfo]);

  const currentImage = galleryList[currentIndex] || galleryList[0];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + galleryList.length) % galleryList.length);
  }, [currentIndex, galleryList.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % galleryList.length);
  }, [currentIndex, galleryList.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#c5a880] px-2.5 py-1 rounded bg-white/5 border border-white/10">
            {currentImage.category}
          </span>
          <span className="text-xs sm:text-sm text-neutral-400">
            {currentIndex + 1} of {galleryList.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-neutral-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative max-w-5xl max-h-[82vh] w-full flex flex-col items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black flex items-center justify-center max-h-[70vh]">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-h-[70vh] max-w-full w-auto h-auto object-contain select-none"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-xl">
          <p className="text-sm sm:text-base font-medium text-white">
            {currentImage.title}
          </p>
          {currentImage.caption && (
            <p className="text-xs text-neutral-400 mt-1 flex items-center justify-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#d61f26]" />
              <span>{currentImage.caption}</span>
            </p>
          )}
        </div>
      </div>

      {/* Previous Nav Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-[#c5a880] transition-all focus:outline-none"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Next Nav Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-[#c5a880] transition-all focus:outline-none"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};
