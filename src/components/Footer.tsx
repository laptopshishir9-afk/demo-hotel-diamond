import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { DiamondShineLogo } from './DiamondShineLogo';
import { MapPin, Phone, Mail, ArrowUp, PlayCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onReplayIntro: () => void;
  onOpenInquiry: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onReplayIntro,
  onOpenInquiry,
  onOpenAdmin,
}) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.rooms, href: '#rooms' },
    { name: language === 'ne' ? 'खाना मेनु' : 'Food Menu', href: '#menu' },
    { name: t.nav.interior, href: '#interior' },
    { name: t.nav.dining, href: '#dining' },
    { name: t.nav.events, href: '#events' },
    { name: t.nav.attractions, href: '#attractions' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-[#050b14] border-t border-[#142c50] pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Identity (Zone 1 - 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <DiamondShineLogo size="md" />
            </div>
            <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#c5a880] bg-[#0c1a2f] hover:bg-[#152e54] border border-[#c5a880]/30 rounded-md transition-all shadow-sm"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>{t.footer.replayIntro}</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation (Zone 2 - 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact (Zone 3 - 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold mb-4">
              {t.footer.locationInquiries}
            </h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
              <MapPin className="w-4 h-4 text-[#d61f26] shrink-0 mt-0.5" />
              <span>{language === 'ne' ? siteData.hotelInfo.locationNepali : siteData.hotelInfo.locationFull}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
              <Phone className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <a href={`tel:${siteData.hotelInfo.phonePrimary}`} className="font-mono hover:text-[#c5a880]">
                {siteData.hotelInfo.phonePrimary}
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
              <Mail className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <a href={`mailto:${siteData.hotelInfo.email}`} className="font-mono hover:text-[#c5a880]">
                {siteData.hotelInfo.email}
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e52830] hover:to-[#c5171e] rounded-md shadow-md transition-all active:scale-95"
              >
                {t.nav.inquireStay}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Quiet Staff Portal, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Hotel Diamond, Sandhikharka. {t.footer.rightsReserved}
          </div>

          <div className="flex items-center gap-5">
            {/* Quiet Staff Portal Access Link */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-[#c5a880] transition-colors"
              title="Hotel Diamond Staff Management"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Staff Portal</span>
            </button>

            <span className="text-[11px] text-neutral-400">
              Sandhikharka, Arghakhanchi, Nepal
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-1.5 rounded-md hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
