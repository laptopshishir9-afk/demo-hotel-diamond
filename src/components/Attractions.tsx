import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { AttractionData } from '../types/siteData';
import { MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';
import { TouchZoomImage } from './TouchZoomImage';
import { ScrollReveal } from './ScrollReveal';

interface AttractionsProps {
  onSelectAttractionOnMap?: (attraction: any) => void;
}

export const Attractions: React.FC<AttractionsProps> = ({ onSelectAttractionOnMap }) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  return (
    <section id="attractions" className="py-20 lg:py-28 bg-[#081220] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
              {t.attractions.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mt-2 text-balance">
              {t.attractions.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed text-balance">
              {t.attractions.subTitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.attractions.map((attraction, index) => {
            const name = language === 'ne' ? attraction.nameNepali : attraction.name;
            const description = language === 'ne' ? attraction.descriptionNe : attraction.descriptionEn;
            const distance = language === 'ne' ? attraction.roadDistanceNepali : attraction.roadDistance;
            const duration = language === 'ne' ? attraction.approxDurationNepali : attraction.approxDuration;
            const tag = language === 'ne' ? attraction.highlightTagNepali : attraction.highlightTag;

            return (
              <ScrollReveal key={attraction.id} direction="up" delay={index * 120} className="h-full">
                <div
                  className="group relative h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c1a2f] to-[#07101c] border border-white/10 hover:border-[#c5a880]/50 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1"
                >
                  {/* Visual Asset Area */}
                  <div>
                    <TouchZoomImage
                      src={attraction.image}
                      alt={name}
                      containerClassName="relative aspect-[4/3] w-full bg-black cursor-pointer"
                      className="filter brightness-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2f] via-black/20 to-transparent pointer-events-none" />

                      {/* Category / Highlight Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-[#c5a880] font-medium pointer-events-auto">
                        {tag}
                      </div>
                    </TouchZoomImage>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#c5a880] transition-colors">
                      {name}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {description}
                    </p>

                    {/* Verified Road Distance Strip */}
                    <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-neutral-300">
                      <div className="flex items-center gap-2 text-[#c5a880]">
                        <Navigation className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-medium">{distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0">
                  <div className="flex items-center gap-3">
                    <a
                      href={attraction.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 text-center"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t.attractions.getDirections}</span>
                      <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
                    </a>

                    {onSelectAttractionOnMap && (
                      <button
                        onClick={() => onSelectAttractionOnMap(attraction)}
                        className="py-2.5 px-3 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                        title="View on Map"
                      >
                        Map 📍
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
