'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { MapPin, Mail, Clock, Send, Instagram, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    from_phone: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ from_name: '', from_email: '', from_phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-light-alt section-gold-accent-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 text-[#bc8934] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('contact_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{t('contact_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-foreground/85 leading-relaxed text-sm sm:text-base font-semibold">{t('contact_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div className={`${visible ? (isRTL ? 'animate-fade-in-right' : 'animate-fade-in-left') : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_name')}</label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder={t('contact_name_ph')}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-card-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-[#bc8934] focus:ring-2 focus:ring-[#bc8934]/15 transition-all duration-300"
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_email')}</label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    placeholder={t('contact_email_ph')}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-card-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-[#bc8934] focus:ring-2 focus:ring-[#bc8934]/15 transition-all duration-300"
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_phone')}</label>
                  <input
                    type="tel"
                    name="from_phone"
                    value={formData.from_phone}
                    onChange={handleChange}
                    placeholder={t('contact_phone_ph')}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-card-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-[#bc8934] focus:ring-2 focus:ring-[#bc8934]/15 transition-all duration-300"
                    disabled={status === 'sending'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">{t('contact_message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact_message_ph')}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-card-bg text-foreground text-sm placeholder:text-muted-foreground focus:border-[#bc8934] focus:ring-2 focus:ring-[#bc8934]/15 transition-all duration-300 resize-none"
                  required
                  disabled={status === 'sending'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 min-h-[48px] ${
                  status === 'success'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                    : status === 'error'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : status === 'sending'
                    ? 'bg-[#bc8934]/70 text-white cursor-wait'
                    : 'bg-[#bc8934] text-white hover:bg-[#9a6e2a] shadow-lg shadow-[#bc8934]/25 hover:shadow-[#bc8934]/40'
                }`}
              >
                {status === 'sending' && <Loader2 size={18} className="animate-spin" />}
                {status === 'success' && <CheckCircle size={18} />}
                {status === 'error' && <AlertCircle size={18} />}
                {status === 'idle' && <Send size={16} className="sm:w-[18px] sm:h-[18px]" />}
                {status === 'sending' ? t('contact_sending') :
                 status === 'success' ? t('contact_success') :
                 status === 'error' ? t('contact_error') :
                 t('contact_submit')}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 rounded-lg border text-sm animate-fade-in-up bg-green-50 border-green-200 text-green-700">
                  <CheckCircle size={16} className="shrink-0" />
                  {t('contact_success')}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-lg border text-sm animate-fade-in-up bg-red-50 border-red-200 text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  {t('contact_error')}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className={`${visible ? (isRTL ? 'animate-fade-in-left' : 'animate-fade-in-right') : 'opacity-0'}`}>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6!2d46.6729!3d24.6877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f035a37629539%3A0x82c76c9df9cf7974!2z2KfZhNix2YrYp9i2IC0g2KfZhNiu2YXYp9it2YrYqSDYp9mE2LnYsdmK2Kc!5e0!3m2!1sar!2ssa!4v1700000000000!5m2!1sar!2ssa" width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#bc8934]/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#bc8934] sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-xs sm:text-sm">{t('contact_address')}</h4>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#bc8934]/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#bc8934] sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-xs sm:text-sm">{t('contact_email_addr')}</h4>
                  <a href="mailto:zero2one012025@gmail.com" dir="ltr" className="text-foreground/70 text-[10px] sm:text-xs mt-0.5 hover:text-[#bc8934] transition-colors font-semibold">zero2one012025@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#bc8934]/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#bc8934] sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-xs sm:text-sm">{t('contact_working')}</h4>
                  <p className="text-foreground/70 text-[10px] sm:text-xs mt-0.5 font-semibold">{t('contact_working_days')}</p>
                  <p className="text-foreground/70 text-[10px] sm:text-xs font-semibold">{t('contact_working_hours')}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground text-xs sm:text-sm mb-3">{t('contact_social')}</h4>
              <div className="flex items-center gap-2 sm:gap-3">
                <a href="https://www.instagram.com/zero2onedm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-card-bg text-muted-foreground hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                  <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a href="https://x.com/Zero2OneDM" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-card-bg text-muted-foreground hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@zero2one2030" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-card-bg text-muted-foreground hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.86 2.86 0 0 1 .9.15V9.01a6.27 6.27 0 0 0-.9-.07 6.34 6.34 0 0 0 0 12.68 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
