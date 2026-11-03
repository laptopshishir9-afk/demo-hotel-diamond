import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { MenuItemData } from '../types/siteData';
import { Utensils, Sparkles, CheckCircle2, XCircle, ShoppingBag, PhoneCall } from 'lucide-react';
import { TouchZoomImage } from './TouchZoomImage';
import { ScrollReveal } from './ScrollReveal';

interface FoodMenuProps {
  onOrderDish: (dish: MenuItemData) => void;
}

export const FoodMenu: React.FC<FoodMenuProps> = ({ onOrderDish }) => {
  const { language } = useLanguage();
  const { siteData } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks'] as const;

  const categoryLabelsNe: Record<string, string> = {
    All: 'सबै परिकार',
    Breakfast: 'बिहानी नास्ता',
    Lunch: 'दिउँसोको खाना',
    Dinner: 'साँझको खाना',
    Snacks: 'खाजा परिकार',
    Drinks: 'तातो-चिसो पेय',
  };

  const filteredItems = siteData.menuItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#070e1a] relative border-t border-white/10">
      {/* Subtle luxury ambient navy/gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-radial from-[#152e54]/25 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-xs font-medium text-[#c5a880] mb-3">
              <Utensils className="w-3.5 h-3.5" />
              <span>
                {language === 'ne' ? 'डायमण्ड फेमिली रेस्टुरेन्ट' : 'Diamond Family Restaurant & Kitchen'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mt-1">
              {language === 'ne' ? (
                <>
                  ताजा र स्वादिष्ट <span className="italic font-normal text-[#c5a880]">खानाका परिकारहरू</span>
                </>
              ) : (
                <>
                  Culinary Delights & <span className="italic font-normal text-[#c5a880]">Authentic Dining</span>
                </>
              )}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {language === 'ne'
                ? 'स्थानीय ताजा मसला, पारिवारिक स्वाद र स्वास्थ्यवर्धक सामग्रीबाट तयार गरिएका विशेष परिकारहरू। सुपा देउराली दर्शनार्थी तथा यात्रुहरूका लागि विशेष पारिवारिक वातावरण।'
                : 'Taste the warmth of Sandhikharka with freshly prepared authentic Nepali cuisine, local mountain spices, hearty thali sets, and refreshing beverages for all guests and traveling families.'}
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const label = language === 'ne' ? categoryLabelsNe[cat] : cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#d61f26] to-[#b3141a] text-white border-transparent shadow-[0_4px_16px_rgba(214,31,38,0.35)] scale-105'
                        : 'bg-[#0f223f]/60 hover:bg-[#16335f] text-neutral-300 hover:text-white border-white/10'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredItems.map((item, index) => {
            const name = language === 'ne' ? item.nameNe : item.nameEn;
            const description = language === 'ne' ? item.descriptionNe : item.descriptionEn;

            return (
              <ScrollReveal key={item.id} direction="up" delay={(index % 4) * 80} className="h-full">
                <div
                  className="group h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c1a2f] to-[#070e1a] border border-white/10 hover:border-[#c5a880]/50 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1"
                >
                  {/* Image and Badges */}
                  <div>
                    <TouchZoomImage
                      src={item.image}
                      alt={name}
                      containerClassName="relative aspect-[4/3] w-full bg-black/50 cursor-pointer"
                      className="filter brightness-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2f] via-transparent to-transparent pointer-events-none" />

                      {/* Popular Pill */}
                      {item.isPopular && (
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#d61f26] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md pointer-events-auto">
                          <Sparkles className="w-3 h-3" />
                          <span>{language === 'ne' ? 'विशेष' : 'Chef Special'}</span>
                        </div>
                      )}

                      {/* Category Pill */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[10px] text-neutral-300 font-medium pointer-events-auto">
                        {item.category}
                      </div>

                      {/* Price Tag in Bottom Corner */}
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-[#c5a880]/40 text-white font-mono font-bold text-sm flex items-baseline gap-1 shadow-lg pointer-events-auto">
                        <span className="text-[#c5a880] text-xs">NPR</span>
                        <span>Rs. {item.priceNpr}</span>
                      </div>
                    </TouchZoomImage>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-[#c5a880] transition-colors leading-snug">
                        {name}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                      {description}
                    </p>

                    {/* Status Pill */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      {item.isAvailable ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'ne' ? 'ताजा उपलब्ध' : 'Available Fresh'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-medium">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{language === 'ne' ? 'अहिले उपलब्ध छैन' : 'Temporarily Unavailable'}</span>
                        </div>
                      )}

                      <span className="text-[11px] text-neutral-400 font-light">
                        {language === 'ne' ? 'होटेल रेस्टुरेन्ट' : 'Dine-In & Room'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOrderDish(item)}
                    disabled={!item.isAvailable}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      item.isAvailable
                        ? 'bg-[#152e54] hover:bg-[#1f4277] text-white border border-[#3563a6]/50 hover:border-[#c5a880] shadow-md active:scale-95'
                        : 'bg-white/5 text-neutral-500 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>{language === 'ne' ? 'परिकार मगाउनुहोस् / सोधपुछ' : 'Order / Inquire Dish'}</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Bottom Banner: Family Dining & Quick Phone Orders */}
      <ScrollReveal direction="up" delay={150}>
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0d1d36] via-[#102544] to-[#0a1629] border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                {language === 'ne'
                  ? 'सामूहिक खाना तथा अर्डरका लागि सिधा सम्पर्क गर्नुहोस्'
                  : 'Group Meals, Special Orders & Room Dining'}
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                {language === 'ne'
                  ? 'सुपा देउराली दर्शनार्थी तथा ठूला समूहका लागि अग्रिम खाना तयारी व्यवस्था उपलब्ध छ।'
                  : 'Pre-ordered meals available for pilgrimage groups and families traveling together.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${siteData.hotelInfo.phonePrimary}`}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e52830] hover:to-[#c5171e] rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{siteData.hotelInfo.phonePrimary.split('/')[0].trim()}</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  );
};
