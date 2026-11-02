import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { GalleryImage } from '../types';
import { Expand, Eye } from 'lucide-react';

interface GalleryProps {
  onOpenLightbox: (index: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const { t } = useLanguage();
  const { siteData } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const galleryItems: GalleryImage[] = useMemo(() => [
    {
      id: 'exterior-facade',
      src: siteData.hotelInfo.heroImage,
      title: 'Hotel Diamond Exterior Facade',
      category: 'Exterior',
      caption: 'Hotel Diamond Chutrabesi Exterior - Road view',
      description: 'The distinctive exterior presence of Hotel Diamond welcoming visitors to Sandhikharka.',
    },
    {
      id: 'exterior-day',
      src: siteData.hotelInfo.aboutImage,
      title: 'Hotel Building & Street Entrance',
      category: 'Exterior',
      caption: 'Exterior Architecture & Guest Entrance',
      description: 'Main street entrance facing the town center with direct road accessibility.',
    },
    {
      id: 'bedroom-twin',
      src: siteData.hotelInfo.roomImage,
      title: 'Comfortable Twin Bedroom (diamond 222)',
      category: 'Rooms',
      caption: 'Guest Twin Bedroom with Warm Linens and Wooden Headboard',
      description: 'Authentic guest bedroom featuring rich dark wood furnishings, dual beds, and private vanity.',
    },
    {
      id: 'interior-hall',
      src: siteData.hotelInfo.interiorImage,
      title: 'Interior Gathering Space (diamond 22)',
      category: 'Interior',
      caption: 'Interior Gathering Space & Stage Hall',
      description: 'Spacious indoor seating hall arranged for ceremonies, celebrations, and dining.',
    },
    {
      id: 'banquet-hall',
      src: siteData.hotelInfo.eventImage,
      title: 'Multi-purpose Event Hall',
      category: 'Events',
      caption: 'Spacious Multi-purpose Hall for Ceremonies & Conferences',
      description: 'Expansive gathering hall suitable for weddings, party celebrations, and community assemblies.',
    },
    {
      id: 'reception-desk',
      src: siteData.hotelInfo.receptionImage,
      title: 'Lobby & Reception Desk',
      category: 'Reception',
      caption: 'Front Desk & Welcome Area for Arriving Travelers',
      description: 'Warm front desk and hospitality counter for seamless check-in and local travel guidance.',
    },
  ], [siteData.hotelInfo]);

  const categories = [
    { key: 'All', label: t.gallery.all, count: galleryItems.length },
    { key: 'Exterior', label: t.gallery.exterior, count: galleryItems.filter((i) => i.category === 'Exterior').length },
    { key: 'Rooms', label: t.gallery.rooms, count: galleryItems.filter((i) => i.category === 'Rooms').length },
    { key: 'Interior', label: t.gallery.interior, count: galleryItems.filter((i) => i.category === 'Interior').length },
    { key: 'Events', label: t.gallery.events, count: galleryItems.filter((i) => i.category === 'Events').length },
    { key: 'Reception', label: t.gallery.reception, count: galleryItems.filter((i) => i.category === 'Reception').length },
  ];

  const filteredImages =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#091424] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
              {t.gallery.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mt-2">
              {t.gallery.title} <span className="italic font-normal text-[#c5a880]">{t.gallery.titleHighlight}</span>
            </h2>
            <p className="mt-3 text-sm text-neutral-400 font-light max-w-xl">
              {t.gallery.subTitle}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#181822] border border-white/10 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-[#c5a880] text-black shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => {
            const originalIndex = galleryItems.findIndex((img) => img.id === image.id);
            return (
              <div
                key={image.id}
                onClick={() => onOpenLightbox(originalIndex)}
                className="group relative rounded-xl overflow-hidden bg-[#171720] border border-white/10 shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/50"
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-108 group-hover:brightness-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Expand icon on hover */}
                  <div className="absolute top-3 right-3 p-2 rounded-md bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Expand className="w-4 h-4 text-[#c5a880]" />
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-medium text-[#c5a880] border border-white/10">
                    {image.category}
                  </div>
                </div>

                {/* Caption Footer */}
                <div className="p-4 bg-[#14141c]">
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors truncate">
                    {image.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 font-light">
                    {image.caption}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#c5a880] font-medium pt-2 border-t border-white/5">
                    <span>{t.gallery.viewFull}</span>
                    <Eye className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
