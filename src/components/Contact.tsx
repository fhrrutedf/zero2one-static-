'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { MapPin, Phone, Mail, Clock, Send, Instagram } from 'lucide-react';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand/10 text-brand text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('contact_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{t('contact_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('contact_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div className={`${visible ? (isRTL ? 'animate-fade-in-right' : 'animate-fade-in-left') : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_name')}</label>
                <input type="text" placeholder={t('contact_name_ph')} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-light-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all duration-300" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_email')}</label>
                  <input type="email" placeholder={t('contact_email_ph')} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-light-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all duration-300" required />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_phone')}</label>
                  <input type="tel" placeholder={t('contact_phone_ph')} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-light-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all duration-300" />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_message')}</label>
                <textarea placeholder={t('contact_message_ph')} rows={4} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-light-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all duration-300 resize-none" required />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-brand text-white font-semibold text-base sm:text-lg hover:bg-brand-dark transition-all duration-300 shadow-lg shadow-brand/25 hover:shadow-brand/40 min-h-[48px]">
                <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                {submitted ? '✓' : t('contact_submit')}
              </button>
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className={`${visible ? (isRTL ? 'animate-fade-in-left' : 'animate-fade-in-right') : 'opacity-0'}`}>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463877.0239189283!2d46.54271704999999!3d24.725195199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2KfZhNix2YrYp9i2!5e0!3m2!1sar!2ssa!4v1700000000000!5m2!1sar!2ssa" width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-xs sm:text-sm">{t('contact_address')}</h4>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-xs sm:text-sm">{t('contact_email_addr')}</h4>
                  <a href="mailto:zero2one012025@gmail.com" className="text-muted-foreground text-[10px] sm:text-xs mt-0.5 hover:text-brand transition-colors">zero2one012025@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-brand sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-xs sm:text-sm">{t('contact_working')}</h4>
                  <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5">{t('contact_working_days')}</p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs">{t('contact_working_hours')}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground text-xs sm:text-sm mb-3">{t('contact_social')}</h4>
              <div className="flex items-center gap-2 sm:gap-3">
                <a href="https://www.instagram.com/zero2onedm/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-card-bg text-muted-foreground hover:bg-brand hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                  <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
