import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { HeartHandshake, MapPin, ShieldCheck, Building2 } from 'lucide-react';
import { TouchZoomImage } from './TouchZoomImage';
import { ScrollReveal } from './ScrollReveal';

interface AboutProps {
  onInquire: () => void;
  onOpenPhoto: (photoSrc: string) => void;
}

export const About: React.FC<AboutProps> = ({ onInquire, onOpenPhoto }) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#091424] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Entrance Photography (diamond.jpg) */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="up" delay={50}>
              <div className="relative rounded-xl border border-white/15 bg-[#0e1d33] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <TouchZoomImage
                  src={siteData.hotelInfo.aboutImage}
                  alt="Hotel Diamond main entrance and approach in Sandhikharka"
                  containerClassName="w-full h-[360px] sm:h-[440px] rounded-xl cursor-pointer"
                  className="filter brightness-95"
                  onOpenLightbox={() => onOpenPhoto(siteData.hotelInfo.aboutImage)}
                  showExpandButton
                  expandButtonLabel="View Photo"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Verified Location Label */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs pointer-events-auto">
                    <div className="flex items-center gap-2 text-neutral-200">
                      <MapPin className="w-4 h-4 text-[#d61f26] shrink-0" />
                      <span>
                        {language === 'ne'
                          ? siteData.hotelInfo.locationNepali
                          : 'Chutrabesi, Ward 2, Sandhikharka'}
                      </span>
                    </div>
                    <span className="text-[#c5a880] text-[11px] font-medium tracking-wide">
                      Main Entrance
                    </span>
                  </div>
                </TouchZoomImage>
              </div>

              {/* Subtle decorative gold corner frame */}
              <div className="hidden sm:block absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#c5a880]/40 rounded-tl-lg pointer-events-none" />
              <div className="hidden sm:block absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#c5a880]/40 rounded-br-lg pointer-events-none" />
            </ScrollReveal>
          </div>

          {/* Right Column: Believable, Professional Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal direction="up" delay={150}>
              <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-3">
                {t.about.kicker}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
                {t.about.title} <span className="italic font-normal text-[#c5a880]">{t.about.titleHighlight}</span>
              </h2>

              <div className="mt-6 space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  {language === 'ne'
                    ? siteData.hotelInfo.aboutDescNe1 || t.about.p1
                    : siteData.hotelInfo.aboutDescEn1 || t.about.p1}
                </p>
                <p>
                  {language === 'ne'
                    ? siteData.hotelInfo.aboutDescNe2 || t.about.p2
                    : siteData.hotelInfo.aboutDescEn2 || t.about.p2}
                </p>
              </div>

              {/* Genuine Highlight Strips */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{t.about.feature1Title}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{t.about.feature1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{t.about.feature2Title}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{t.about.feature2Desc}</p>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={onInquire}
                  className="px-6 py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e52830] hover:to-[#c5171e] rounded-md shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  {t.about.ctaButton}
                </button>
                <a
                  href="#gallery"
                  className="text-xs sm:text-sm font-medium text-neutral-300 hover:text-[#c5a880] transition-colors"
                >
                  {t.about.galleryLink}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* SECTION 2 REQUIREMENT: Hotel Interior Section using diamond 22 */}
        <div id="interior" className="mt-20 pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal direction="up" delay={50}>
                <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
                  {t.interior.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight mt-2 text-balance">
                  {t.interior.title}{' '}
                  <span className="italic font-normal text-[#c5a880]">{t.interior.titleHighlight}</span>
                </h3>
                <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
                  {t.interior.description}
                </p>
                <div className="mt-6 p-4 rounded-xl bg-[#0c1a2e] border border-white/10 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 text-white font-medium mb-1">
                    <Building2 className="w-4 h-4 text-[#c5a880]" />
                    <span>Verified Hotel Interior</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    {siteData.hotelInfo.interiorDesc || 'Preserved authentic hotel interior space with seating, banquet hall, and welcoming surroundings.'}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal direction="up" delay={150}>
                <div className="relative rounded-xl border border-white/10 bg-[#0e1d33] shadow-xl">
                  <TouchZoomImage
                    src={siteData.hotelInfo.interiorImage}
                    alt={siteData.hotelInfo.interiorTitle || 'Hotel Diamond interior and sitting lounge'}
                    containerClassName="w-full h-[320px] sm:h-[400px] rounded-xl cursor-pointer"
                    className="filter brightness-95"
                    onOpenLightbox={() => onOpenPhoto(siteData.hotelInfo.interiorImage)}
                    showExpandButton
                    expandButtonLabel="View Interior"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs pointer-events-auto">
                      <span className="text-white font-semibold">
                        {siteData.hotelInfo.interiorTitle || 'Hotel Diamond Interior & Lounge'}
                      </span>
                      <span className="text-[11px] text-[#c5a880] font-medium">Verified Interior</span>
                    </div>
                  </TouchZoomImage>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
