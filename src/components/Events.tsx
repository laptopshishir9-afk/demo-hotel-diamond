import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { Users, Calendar, Sparkles } from 'lucide-react';
import { TouchZoomImage } from './TouchZoomImage';
import { ScrollReveal } from './ScrollReveal';

interface EventsProps {
  onInquire: (type?: string) => void;
  onOpenPhoto: (photoSrc: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onInquire, onOpenPhoto }) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  return (
    <section id="events" className="py-20 lg:py-28 bg-[#091526] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Real Description, Event Inquiry Button */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-3">
                {t.events.kicker}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
                {t.events.title} <span className="italic font-normal text-[#c5a880]">{t.events.titleHighlight}</span>
              </h2>

              <p className="mt-6 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {t.events.subTitle}
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{t.events.hallTitle}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {t.events.hallDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{t.events.supportTitle}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {t.events.supportDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="mt-8 pt-2">
                <button
                  onClick={() => onInquire('Event Hall / Gathering')}
                  className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-md shadow-[0_4px_20px_rgba(214,31,38,0.35)] transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.events.inquireButton}</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Verified Event Hall Photograph */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ScrollReveal direction="up" delay={150}>
              <div className="relative rounded-2xl border border-white/15 bg-[#0e1d33] shadow-[0_16px_48px_rgba(3,10,24,0.7)]">
                <TouchZoomImage
                  src={siteData.hotelInfo.eventImage}
                  alt="Hotel Diamond event hall and function space"
                  containerClassName="w-full h-[360px] sm:h-[460px] lg:h-[500px] rounded-2xl cursor-pointer"
                  className="filter brightness-95"
                  onOpenLightbox={() => onOpenPhoto(siteData.hotelInfo.eventImage)}
                  showExpandButton
                  expandButtonLabel={t.rooms.clickToEnlarge}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Verified Venue Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs pointer-events-auto">
                    <div>
                      <span className="font-semibold text-white block">
                        {t.events.badgeTitle}
                      </span>
                      <span className="text-[11px] text-[#c5a880] mt-0.5 block">
                        {language === 'ne' ? siteData.hotelInfo.locationNepali : t.events.badgeLocation}
                      </span>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded bg-[#d61f26]/20 border border-[#d61f26]/40 text-red-200">
                      {t.events.verifiedTag}
                    </span>
                  </div>
                </TouchZoomImage>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
