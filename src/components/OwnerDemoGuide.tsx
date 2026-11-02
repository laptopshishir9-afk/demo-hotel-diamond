import React from 'react';
import { X, Sparkles, TrendingUp, ShieldCheck, Smartphone, CheckCircle } from 'lucide-react';

interface OwnerDemoGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerDemoGuide: React.FC<OwnerDemoGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto bg-[#13131a]/95 backdrop-blur-xl border-t border-[#c5a880]/40 shadow-2xl p-6 sm:p-8 animate-slide-up">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Sales Demo Overview — Prepared for Hotel Diamond Management
              </h3>
              <p className="text-xs text-[#c5a880] mt-0.5">
                How this premium website converts visitors into paying hotel and event hall guests in Sandhikharka
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close demo notes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Core Value Pillars for Hotel Owner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center gap-2 text-[#d61f26] text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>100% Direct Bookings</span>
            </div>
            <h4 className="text-sm font-semibold text-white">Keep 100% of Revenue</h4>
            <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
              Online travel agencies charge 15% to 25% commissions. A direct website channels highway travelers and pilgrims straight to your front desk via phone and inquiry form.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Authentic Credibility</span>
            </div>
            <h4 className="text-sm font-semibold text-white">100% Verified Photography</h4>
            <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
              Travelers distrust generic stock photos. By showing the real building, actual bedroom, and function hall, guests trust what they see and book with total confidence.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Smartphone className="w-4 h-4" />
              <span>Mobile-First in Nepal</span>
            </div>
            <h4 className="text-sm font-semibold text-white">Optimized for Mobile Data</h4>
            <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
              Over 85% of bookings in Nepal happen on mobile phones. This website loads rapidly on 4G networks across Arghakhanchi with seamless one-tap inquiries.
            </p>
          </div>
        </div>

        {/* Feature Highlights Checked */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle className="w-4 h-4 text-[#c5a880]" />
              Official Logo Cinematic Reveal
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle className="w-4 h-4 text-[#c5a880]" />
              Interactive Fullscreen Lightbox
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle className="w-4 h-4 text-[#c5a880]" />
              Room & Function Hall Inquiry Handlers
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-md transition-colors"
          >
            Close Notes
          </button>
        </div>
      </div>
    </div>
  );
};
