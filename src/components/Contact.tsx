import React, { useState } from 'react';
import { InquiryRecord } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { DiamondShineLogo } from './DiamondShineLogo';
import { ScrollReveal } from './ScrollReveal';

interface ContactProps {
  initialInquiryType?: 'Room Stay' | 'Event Hall / Gathering' | 'Dining & Meals' | 'General Question';
  onAddInquiry: (inquiry: InquiryRecord) => void;
}

export const Contact: React.FC<ContactProps> = ({
  initialInquiryType = 'Room Stay',
  onAddInquiry,
}) => {
  const { t, language } = useLanguage();
  const { siteData } = useSiteData();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    inquiryType: initialInquiryType,
    roomType: 'Comfortable Guest Accommodation',
    checkInDate: '',
    checkOutDate: '',
    guestsCount: '1-2 Guests',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg(language === 'ne' ? 'कृपया आफ्नो पूरा नाम लेख्नुहोस्।' : 'Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg(language === 'ne' ? 'कृपया सम्पर्क फोन नम्बर लेख्नुहोस्।' : 'Please enter your contact phone number.');
      return;
    }

    const newRecord: InquiryRecord = {
      id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      inquiryType: formData.inquiryType,
      roomType: formData.roomType,
      checkInDate: formData.checkInDate || undefined,
      checkOutDate: formData.checkOutDate || undefined,
      guestsCount: formData.guestsCount,
      message: formData.message.trim(),
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
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      inquiryType: initialInquiryType,
      roomType: 'Comfortable Guest Accommodation',
      checkInDate: '',
      checkOutDate: '',
      guestsCount: '1-2 Guests',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#081220] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
              {t.contact.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mt-2 text-balance">
              {t.contact.title} <span className="italic font-normal text-[#c5a880]">{t.contact.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {t.contact.subTitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Authentic Hotel Details & Information */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <ScrollReveal direction="up" delay={50} className="space-y-8">
              <div className="space-y-6">
                {/* Hotel Branding Card with DiamondShineLogo */}
                <div className="p-6 rounded-2xl bg-[#0c1a2f] border border-[#1b3a66] shadow-xl">
                  <div className="mb-3">
                    <DiamondShineLogo size="md" />
                  </div>
                <h3 className="text-lg font-serif font-semibold text-white mt-2">
                  {language === 'ne' ? siteData.hotelInfo.fullNameNepali : siteData.hotelInfo.fullName}
                </h3>
                <p className="text-xs text-[#c5a880] mt-1 font-medium">
                  {language === 'ne' ? siteData.hotelInfo.locationNepali : siteData.hotelInfo.locationFull}
                </p>
              </div>

              {/* Verified Location Box */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0c1a2f] border border-[#1b3a66]">
                <div className="p-2.5 rounded-lg bg-[#c5a880]/15 text-[#c5a880] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.contact.locationHeading}</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                    {language === 'ne' ? siteData.hotelInfo.locationNepali : siteData.hotelInfo.locationFull}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    (Directly accessible along Chutrabesi roadway, Sandhikharka)
                  </p>
                </div>
              </div>

              {/* Direct Phone Inquiries */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0c1a2f] border border-[#1b3a66]">
                <div className="p-2.5 rounded-lg bg-[#d61f26]/20 text-[#d61f26] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.contact.phoneHeading}</h4>
                  <a
                    href={`tel:${siteData.hotelInfo.phonePrimary}`}
                    className="text-xs sm:text-sm text-white hover:text-[#c5a880] mt-1 font-mono block"
                  >
                    {siteData.hotelInfo.phonePrimary}
                  </a>
                  <span className="text-[11px] text-emerald-400 mt-0.5 block">
                    ✓ 24/7 Front desk assistance available
                  </span>
                </div>
              </div>

              {/* Front Desk Hours & Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0c1a2f] border border-[#1b3a66]">
                <div className="p-2.5 rounded-lg bg-white/5 text-[#c5a880] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.contact.hoursHeading}</h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    {siteData.hotelInfo.frontDeskHours}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                    Email: {siteData.hotelInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Note for Direct Booking */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-[#142c50] to-transparent border-l-2 border-[#c5a880] text-xs text-neutral-300">
              <span className="font-semibold text-white">Direct Guest Connection:</span>
              <p className="mt-0.5">
                Inquiries connect you directly with the front desk for personalized room allocation.
              </p>
            </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact & Booking Inquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={150}>
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1a2f] border border-[#1b3a66] shadow-2xl relative">
              {submitted ? (
                /* Success Confirmation State */
                <div className="py-10 px-4 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-neutral-300 mt-2 max-w-md font-light leading-relaxed">
                    {t.contact.successMessage}
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-left w-full max-w-sm space-y-2 text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Guest Name:</span>
                      <span className="font-semibold text-white">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{t.contact.successContact}</span>
                      <span className="font-mono text-white">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Inquiry Type:</span>
                      <span className="text-[#c5a880]">{formData.inquiryType}</span>
                    </div>
                    {formData.checkInDate && (
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Dates:</span>
                        <span>
                          {formData.checkInDate}
                          {formData.checkOutDate ? ` to ${formData.checkOutDate}` : ''}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 border-t border-white/10">
                      <span className="text-neutral-400">Current Status:</span>
                      <span className="text-amber-400 font-medium">Pending Front Desk Call</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 mt-3 max-w-xs">
                    (Note: This is an inquiry request. Final room confirmation is provided by reception call.)
                  </p>

                  <button
                    onClick={handleReset}
                    className="mt-6 px-6 py-2.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-3 mb-1">
                    <h3 className="text-xl font-serif font-semibold text-white">
                      {t.contact.formTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {t.contact.formSubtitle}
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        {t.contact.nameLabel} <span className="text-[#d61f26]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Thapa"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        {t.contact.phoneLabel} <span className="text-[#d61f26]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        {t.contact.typeLabel}
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inquiryType: e.target.value as InquiryRecord['inquiryType'],
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#081324] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                      >
                        <option value="Room Stay">Room Stay / Lodging</option>
                        <option value="Event Hall / Gathering">Event Hall / Function</option>
                        <option value="Dining & Meals">Dining & Family Meals</option>
                        <option value="General Question">General Travel Inquiry</option>
                      </select>
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        {t.contact.guestsLabel}
                      </label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#081324] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests (Twin / Double)</option>
                        <option value="3-4 Guests">3-4 Guests (Family)</option>
                        <option value="Group / Event">Group / Delegations</option>
                      </select>
                    </div>
                  </div>

                  {/* Booking Dates: Check-In & Check-Out */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        {t.contact.checkInLabel}
                      </label>
                      <input
                        type="date"
                        value={formData.checkInDate}
                        onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        {t.contact.checkOutLabel}
                      </label>
                      <input
                        type="date"
                        value={formData.checkOutDate}
                        onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message / Special Requests */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Special arrival requests, meal preferences, or transport inquiries..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-md shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.contact.submitButton}</span>
                    </button>
                    <p className="text-[11px] text-center text-neutral-400 mt-2">
                      {t.contact.privacyNote}
                    </p>
                  </div>
                </form>
              )}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
