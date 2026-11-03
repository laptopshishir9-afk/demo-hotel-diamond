import React, { useState } from 'react';
import { HOTEL_INFO, AttractionItem } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { MapPin, Navigation, ExternalLink, Compass, Car, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface InteractiveMapProps {
  selectedAttractionId?: string | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ selectedAttractionId }) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();
  const [activeLocationId, setActiveLocationId] = useState<string>(selectedAttractionId || 'hotel');

  const locations = [
    {
      id: 'hotel',
      name: siteData.hotelInfo.name || HOTEL_INFO.name,
      nameNepali: siteData.hotelInfo.nameNepali || HOTEL_INFO.nameNepali,
      type: 'Main Base / Hotel & Lodge',
      typeNepali: 'होटेल तथा आवास केन्द्र',
      address: siteData.hotelInfo.locationFull || 'Chutrabesi, Ward No. 2, Sandhikharka',
      addressNepali: siteData.hotelInfo.locationNepali || 'चुत्राबेसी, वडा नं. २, सन्धिखर्क',
      lat: HOTEL_INFO.coordinates.lat,
      lng: HOTEL_INFO.coordinates.lng,
      isMain: true,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=Hotel+Diamond+Chutrabesi+Sandhikharka+Nepal`,
    },
    ...siteData.attractions.map((attraction) => ({
      id: attraction.id,
      name: attraction.name,
      nameNepali: attraction.nameNepali,
      type: attraction.highlightTag,
      typeNepali: attraction.highlightTagNepali,
      address: attraction.roadDistance,
      addressNepali: attraction.roadDistanceNepali,
      lat: attraction.lat,
      lng: attraction.lng,
      isMain: false,
      mapsUrl: attraction.googleMapsUrl,
      duration: attraction.approxDuration,
      durationNepali: attraction.approxDurationNepali,
    })),
  ];

  const currentLocation = locations.find((l) => l.id === activeLocationId) || locations[0];

  return (
    <section id="map" className="py-20 lg:py-28 bg-[#070e1a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
              {t.map.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mt-2 text-balance">
              {t.map.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed text-balance">
              {t.map.subTitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Map Experience Grid */}
        <ScrollReveal direction="up" delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Interactive Location List & Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="text-neutral-400 uppercase tracking-wider font-medium">
                  {t.map.landmarksHeader}
                </span>
                <span className="text-[#c5a880] font-mono text-[11px]">
                  Sandhikharka Hub
                </span>
              </div>

              {locations.map((loc) => {
                const isActive = loc.id === activeLocationId;
                const locName = language === 'ne' ? loc.nameNepali : loc.name;
                const locType = language === 'ne' ? loc.typeNepali : loc.type;

                return (
                  <div
                    key={loc.id}
                    onClick={() => setActiveLocationId(loc.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#181824] border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.15)]'
                        : 'bg-[#121217] border-white/10 hover:border-white/20 hover:bg-[#15151e]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                            loc.isMain
                              ? 'bg-[#d61f26]/20 text-[#ff4d4d]'
                              : 'bg-[#c5a880]/15 text-[#c5a880]'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white">
                              {locName}
                            </h4>
                            {loc.isMain && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#d61f26]/20 text-red-300 font-medium">
                                Base
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">{locType}</p>
                          <p className="text-[11px] text-neutral-300 font-mono mt-1">
                            {language === 'ne' ? loc.addressNepali : loc.address}
                          </p>
                        </div>
                      </div>

                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Open in Google Maps"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Location Action Box */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#1b1b26] to-[#121218] border border-[#c5a880]/30 shadow-lg">
              <div className="flex items-center justify-between text-xs text-[#c5a880] mb-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>Real Coordinates & Route</span>
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  {currentLocation.lat.toFixed(4)}°N, {currentLocation.lng.toFixed(4)}°E
                </span>
              </div>

              <h4 className="text-base font-serif font-bold text-white">
                {language === 'ne' ? currentLocation.nameNepali : currentLocation.name}
              </h4>
              <p className="text-xs text-neutral-300 mt-1">
                {language === 'ne' ? currentLocation.addressNepali : currentLocation.address}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={currentLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.map.viewInGoogleMaps}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Responsive Map & Route Navigator (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-[#121217] relative flex flex-col min-h-[420px] sm:min-h-[500px]">
            {/* Live Interactive Map Frame using verified Sandhikharka / Arghakhanchi center */}
            <div className="relative w-full h-full flex-1">
              <iframe
                title="Hotel Diamond & Arghakhanchi Destinations Map"
                src={`https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=${
                  currentLocation.isMain ? 15 : 12
                }&output=embed`}
                className="w-full h-full min-h-[420px] sm:min-h-[500px] border-0 filter contrast-[1.05]"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Map Status Overlay */}
              <div className="absolute top-4 left-4 z-10 p-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-xs text-neutral-200 shadow-xl max-w-xs">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {language === 'ne' ? currentLocation.nameNepali : currentLocation.name}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  {currentLocation.isMain
                    ? 'Chutrabesi, Sandhikharka, Arghakhanchi'
                    : 'Destination from Hotel Diamond base'}
                </div>
              </div>

              {/* Quick Map Controls in Bottom Right */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${currentLocation.lat},${currentLocation.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-medium text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-md shadow-lg transition-colors flex items-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      </div>
    </section>
  );
};
