import React from 'react';
import { ArrowRight, MapPin, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  onExploreRooms: () => void;
  onContactUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRooms, onContactUs }) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#070e19]">
      {/* Actual Hotel Exterior Background with Measured Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteData.hotelInfo.heroImage}
          alt="Hotel Diamond exterior in Chutrabesi, Sandhikharka"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] transition-transform duration-1000 scale-[1.02]"
        />
        {/* Measured cinematic navy-charcoal gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08101d] via-[#0b1a2f]/60 to-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08101d_92%)] pointer-events-none opacity-85" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <ScrollReveal direction="up" delay={50} className="flex flex-col items-center">
          {/* Authentic Location Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b1a2f]/80 backdrop-blur-md border border-[#1b3a66] text-xs text-[#c5a880] mb-6 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-[#d61f26]" />
          <span className="tracking-wide">
            {language === 'ne' ? siteData.hotelInfo.locationNepali : siteData.hotelInfo.locationFull}
          </span>
        </div>

        {/* Large Elegant Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] max-w-4xl text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          {t.hero.titleMain} <span className="italic font-normal text-[#c5a880]">{t.hero.titleItalic}</span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-balance">
          {t.hero.subTitle}
        </p>


        {/* Authentic Facility Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-neutral-300">
          <span className="text-[#c5a880] font-medium">{t.hero.badge1}</span>
          <span className="text-neutral-500">·</span>
          <span>{t.hero.badge2}</span>
          <span className="text-neutral-500">·</span>
          <span>{t.hero.badge3}</span>
          <span className="text-neutral-500">·</span>
          <span>{t.hero.badge4}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA */}
          <button
            onClick={onExploreRooms}
            className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-md shadow-[0_4px_24px_rgba(214,31,38,0.45)] transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>{t.hero.exploreRooms}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onContactUs}
            className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-medium text-neutral-200 hover:text-white bg-[#0e223f]/80 hover:bg-[#153159] backdrop-blur-md border border-[#1b3a66] hover:border-[#c5a880]/50 rounded-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <PhoneCall className="w-4 h-4 text-[#c5a880]" />
            <span>{t.hero.contactUs}</span>
          </button>
        </div>

          {/* Genuine Arrival Indicator */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-[11px] sm:text-xs text-neutral-400 tracking-wider uppercase">
              {t.hero.welcomingText}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
