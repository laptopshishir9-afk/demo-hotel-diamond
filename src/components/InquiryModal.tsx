import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { InquiryRecord } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'Room Stay' | 'Event Hall / Gathering' | 'Dining & Meals' | 'General Question';
  subTitle?: string;
  onAddInquiry: (inquiry: InquiryRecord) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'Room Stay',
  subTitle,
  onAddInquiry,
}) => {
  const { t, language } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState(defaultType);
  const [roomType, setRoomType] = useState('Comfortable Accommodation (diamond 222)');
  const [guestsCount, setGuestsCount] = useState('1-2 Guests');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setInquiryType(defaultType);
  }, [defaultType, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setSubmitted(false);
      setError('');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError(language === 'ne' ? 'कृपया आफ्नो पूरा नाम लेख्नुहोस्।' : 'Please provide your full name.');
      return;
    }
    if (!phone.trim()) {
      setError(language === 'ne' ? 'कृपया सम्पर्क फोन नम्बर लेख्नुहोस्।' : 'Please enter a valid phone number so reception can reach you.');
      return;
    }

    const newRecord: InquiryRecord = {
      id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      inquiryType,
      roomType,
      checkInDate: checkInDate || undefined,
      checkOutDate: checkOutDate || undefined,
      guestsCount,
      message: message.trim(),
      status: 'pending',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onAddInquiry(newRecord);
    setError('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#14141c] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              {t.contact.successTitle}
            </h3>
            <p className="text-sm text-neutral-300 mt-2 font-light leading-relaxed">
              {t.contact.successMessage}
            </p>
            <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/10 text-xs text-neutral-300 w-full text-left space-y-1">
              <div>
                <span className="text-neutral-500">Guest:</span>{' '}
                <span className="text-white font-medium">{fullName}</span>
              </div>
              <div>
                <span className="text-neutral-500">Phone:</span>{' '}
                <span className="font-mono text-white">{phone}</span>
              </div>
              <div>
                <span className="text-neutral-500">Status:</span>{' '}
                <span className="text-amber-400 font-medium">Pending Front Desk Call</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] rounded-md shadow-md"
            >
              Done / बन्द गर्नुहोस्
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={HOTEL_INFO.logoSrc}
                alt="Hotel Diamond"
                className="h-8 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(214,31,38,0.3)]"
              />
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                  {language === 'ne' ? HOTEL_INFO.nameNepali : HOTEL_INFO.name} Direct Inquiry
                </h3>
                <p className="text-xs text-[#c5a880]">
                  {subTitle || 'Direct reservation & venue planning in Sandhikharka'}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t.contact.nameLabel} <span className="text-[#d61f26]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Thapa"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-black/40 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t.contact.phoneLabel} <span className="text-[#d61f26]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98XXXXXXXX"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-black/40 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t.contact.typeLabel}
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) =>
                      setInquiryType(
                        e.target.value as
                          | 'Room Stay'
                          | 'Event Hall / Gathering'
                          | 'Dining & Meals'
                          | 'General Question'
                      )
                    }
                    className="w-full px-2.5 py-2 text-xs sm:text-sm bg-[#1b1b24] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Room Stay">Room Stay / Lodging</option>
                    <option value="Event Hall / Gathering">Event Hall / Function</option>
                    <option value="Dining & Meals">Dining / Gathering</option>
                    <option value="General Question">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t.contact.guestsLabel}
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs sm:text-sm bg-[#1b1b24] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Twin / Double)</option>
                    <option value="3-4 Guests">3-4 Guests (Family)</option>
                    <option value="Group / Event">Group / Delegations</option>
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t.contact.checkInLabel}
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-black/40 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t.contact.checkOutLabel}
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-black/40 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Special requests or requirements..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-black/40 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-md shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contact.submitButton}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
