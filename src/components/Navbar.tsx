import React, { useState, useEffect } from 'react';
import { Menu, X, PlayCircle, Globe, Shield, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { DiamondShineLogo } from './DiamondShineLogo';

interface NavbarProps {
  onOpenInquiry: (type?: 'Room Stay' | 'Event Hall / Gathering' | 'Dining & Meals' | 'General Question') => void;
  onReplayIntro: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  onReplayIntro,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { siteData } = useSiteData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.rooms, href: '#rooms' },
    { name: language === 'ne' ? 'खाना मेनु' : 'Food Menu', href: '#menu' },
    { name: t.nav.dining, href: '#dining' },
    { name: t.nav.events, href: '#events' },
    { name: t.nav.attractions, href: '#attractions' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ne' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081528]/95 backdrop-blur-md border-b border-[#1b3a66]/60 py-2.5 shadow-[0_4px_28px_rgba(2,8,20,0.7)]'
          : 'bg-gradient-to-b from-[#060e1b]/95 via-[#081528]/60 to-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* Zone 1: Transparent Hotel Diamond Logo with Diamond-Shine effect */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Hotel Diamond Home"
          >
            <DiamondShineLogo size="md" />

            <div className="hidden xl:flex flex-col border-l border-white/10 pl-3">
              <span className="text-xs font-semibold tracking-wide text-white group-hover:text-[#c5a880] transition-colors">
                {language === 'ne' ? siteData.hotelInfo.nameNepali : siteData.hotelInfo.name}
              </span>
              <span className="text-[10px] text-neutral-400 font-light tracking-wider">
                {language === 'ne' ? siteData.hotelInfo.locationShortNepali : siteData.hotelInfo.locationShort}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="whitespace-nowrap transition-colors duration-200 hover:text-[#c5a880] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c5a880] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Controls, Language Switcher & Call to Action */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white bg-[#0e223f] hover:bg-[#142d52] border border-[#1d3b68] rounded-md transition-all active:scale-95"
              title="Toggle English / नेपाली"
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="tracking-wide">
                {language === 'en' ? 'नेपाली' : 'English'}
              </span>
            </button>

            {/* Intro Replay Trigger */}
            <button
              onClick={onReplayIntro}
              title="Replay cinematic logo reveal"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10 rounded-md transition-all whitespace-nowrap"
            >
              <PlayCircle className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Intro</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenInquiry('Room Stay')}
              className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e52830] hover:to-[#c5171e] rounded-md shadow-[0_2px_12px_rgba(214,31,38,0.4)] transition-all duration-200 whitespace-nowrap active:scale-95"
            >
              <span>{t.nav.inquireStay}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-md bg-[#0e223f] border border-[#1d3b68] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[56px] bg-[#071120]/98 backdrop-blur-2xl border-b border-[#1b3a66] px-6 py-6 shadow-2xl transition-all duration-300 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a880] font-semibold">
                Hotel Diamond Navigation / मेनु
              </span>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-white bg-[#0e223f] rounded border border-white/20"
              >
                <Globe className="w-3 h-3 text-[#c5a880]" />
                <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-neutral-200 hover:text-[#c5a880] py-2 transition-colors flex items-center justify-between border-b border-white/5"
              >
                <span>{link.name}</span>
                <span className="text-xs text-neutral-500">→</span>
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry('Room Stay');
                }}
                className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] rounded-md text-center shadow-md"
              >
                {t.nav.inquireStay}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full py-2 text-xs font-medium text-neutral-300 bg-[#0e223f] border border-white/10 rounded-md text-center flex items-center justify-center gap-1.5 hover:text-white hover:bg-white/5"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Logo Intro</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-neutral-400 mt-2">
                📍 {language === 'ne' ? siteData.hotelInfo.locationNepali : siteData.hotelInfo.locationFull}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
