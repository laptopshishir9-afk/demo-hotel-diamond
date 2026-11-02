import React from 'react';
import { UtensilsCrossed, Clock, Sparkles, MessageSquare, Coffee, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

interface DiningProps {
  onInquire: () => void;
}

export const Dining: React.FC<DiningProps> = ({ onInquire }) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  const previewDishes = siteData.menuItems.slice(0, 3);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="dining" className="py-20 lg:py-28 bg-[#091526] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
            {t.dining.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mt-2 text-balance">
            {t.dining.title} <span className="italic font-normal text-[#c5a880]">{t.dining.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {t.dining.subTitle}
          </p>
        </div>

        {/* Editorial Architectural Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Authentic Dining Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1a2f] to-[#07111f] border border-white/10 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-4">
                <UtensilsCrossed className="w-5 h-5" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white">
                {t.dining.cardTitle}
              </h3>

              <p className="mt-3 text-sm text-neutral-300 font-light leading-relaxed">
                {t.dining.cardDesc}
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-3 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <Coffee className="w-4 h-4 text-[#c5a880]" />
                  <span>{t.dining.bullet1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#c5a880]" />
                  <span>{t.dining.bullet2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#c5a880]" />
                  <span>{t.dining.bullet3}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onInquire}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#c5a880]/50 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#c5a880]" />
                  <span>{t.dining.inquireMeals}</span>
                </button>

                <button
                  onClick={scrollToMenu}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e52830] hover:to-[#c5171e] rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <span>{language === 'ne' ? 'खानाको मेनु हेर्नुहोस्' : 'Explore Menu'}</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Menu Showcase Preview */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1a2f] via-[#081322] to-[#050b14] border border-white/15 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#1b3a66]/20 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-xs font-medium text-[#c5a880]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'ne' ? 'विशेष परिकारहरू' : 'Popular House Specialties'}</span>
                  </div>

                  <button
                    onClick={scrollToMenu}
                    className="text-xs text-[#c5a880] hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ne' ? 'सबै हेर्नुहोस्' : 'View Full Menu'}</span>
                    <span>→</span>
                  </button>
                </div>

                {/* 3 Featured Dishes Preview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
                  {previewDishes.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={scrollToMenu}
                      className="group cursor-pointer rounded-xl overflow-hidden bg-[#070e1a] border border-white/10 hover:border-[#c5a880]/50 transition-all p-2.5 flex flex-col justify-between"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/60 relative mb-2">
                        <img
                          src={dish.image}
                          alt={dish.nameEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white font-bold">
                          Rs. {dish.priceNpr}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#c5a880] transition-colors">
                        {language === 'ne' ? dish.nameNe : dish.nameEn}
                      </h4>
                      <span className="text-[10px] text-neutral-400 capitalize">{dish.category}</span>
                    </div>
                  ))}
                </div>

                {/* Owner Note Box */}
                <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/10 text-left">
                  <p className="text-xs text-[#c5a880] font-semibold uppercase tracking-wider mb-1">
                    {t.dining.ownerNoteTitle}
                  </p>
                  <p className="text-xs text-neutral-300 leading-normal">
                    {t.dining.ownerNoteDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
