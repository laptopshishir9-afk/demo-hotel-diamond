import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { BedDouble, Check, Calendar, Sparkles } from 'lucide-react';
import { TouchZoomImage } from './TouchZoomImage';
import { ScrollReveal } from './ScrollReveal';

interface RoomsProps {
  onInquire: (roomTitle?: string) => void;
  onOpenPhoto: (photoSrc: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ onInquire, onOpenPhoto }) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  const primaryRoom = siteData.rooms[0] || {
    id: 'room-1',
    titleEn: 'Comfortable Twin Bedroom',
    titleNe: 'आरामदायी जुम्ल्याहा कोठा',
    image: siteData.hotelInfo.roomImage,
    rateDisplay: 'Contact Front Desk',
    rateNpr: 1800,
    descriptionEn: 'Tastefully furnished room featuring twin bed setup, warm floral linens, rich wood headboards, dressing vanity, and quiet ambiance.',
    descriptionNe: 'दुईवटा आरामदायक बेड, सफा ओछ्यान, काठको हेडबोर्ड, ड्रेसिङ टेबल र शान्त वातावरण भएको विशेष कोठा।',
    featuresEn: ['Twin comfortable beds', 'High-speed Wi-Fi', 'Attached modern bath', 'Room service & hot water'],
    featuresNe: ['दुईवटा आरामदायक ओछ्यान', 'उच्च गतिको वाइफाइ', 'एट्याच बाथरुम', 'तातो-चिसो पानी र कोठा सेवा'],
    isAvailable: true,
  };

  const rawRoomTitle = language === 'ne' ? primaryRoom.titleNe : primaryRoom.titleEn;
  const roomTitle = rawRoomTitle.replace(/\s*\(diamond\s*222\)/gi, '').trim();
  const roomDesc = language === 'ne' ? primaryRoom.descriptionNe : primaryRoom.descriptionEn;
  const roomFeatures = language === 'ne' ? primaryRoom.featuresNe : primaryRoom.featuresEn;

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-[#070e19] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-18">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
              {t.rooms.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mt-2 text-balance">
              {t.rooms.title} <span className="italic font-normal text-[#c5a880]">{t.rooms.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {t.rooms.subTitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Marquee Room Showcase Feature */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-gradient-to-b from-[#0c1a2f] to-[#081220] rounded-2xl border border-white/15 overflow-hidden shadow-[0_16px_48px_rgba(3,10,24,0.7)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left 7 Cols: Bedroom Photograph */}
              <div className="lg:col-span-7 bg-black min-h-[320px] sm:min-h-[440px] lg:min-h-[500px]">
                <TouchZoomImage
                  src={siteData.hotelInfo.roomImage}
                  alt="Hotel Diamond guest bedroom accommodation"
                  containerClassName="w-full h-full min-h-[320px] sm:min-h-[440px] lg:min-h-[500px] cursor-pointer"
                  className="filter brightness-[0.97]"
                  onOpenLightbox={() => onOpenPhoto(siteData.hotelInfo.roomImage)}
                  showExpandButton
                  expandButtonLabel={t.rooms.clickToEnlarge}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081220]/90 via-transparent to-black/30 pointer-events-none" />

                  {/* Verified Room Badge */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-3 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg text-xs text-neutral-200 pointer-events-auto">
                    <p className="font-semibold text-white">{t.rooms.verifiedBadge}</p>
                    <p className="text-[11px] text-[#c5a880] mt-0.5">Hotel Diamond · Sandhikharka, Nepal</p>
                  </div>
                </TouchZoomImage>
              </div>

            {/* Right 5 Cols: Editorial Description & Room Inquiry Action */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#0e213b] to-[#081220]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#c5a880] font-medium tracking-wider uppercase mb-2">
                  <BedDouble className="w-4 h-4" />
                  <span>{t.rooms.kicker}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {roomTitle}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  {roomDesc}
                </p>

                {/* Attributes */}
                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  {roomFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-[#c5a880] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Action Area */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => onInquire(roomTitle)}
                    className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-md shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.rooms.inquiryButton}</span>
                  </button>

                  <p className="text-[11px] text-center text-neutral-400">
                    {t.rooms.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      </div>
    </section>
  );
};
