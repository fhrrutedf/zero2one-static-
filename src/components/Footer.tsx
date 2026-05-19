'use client';

import { useLanguage } from './LanguageProvider';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import Image from 'next/image';
import type { TranslationKey } from '@/lib/i18n';

const quickLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: '#hero', labelKey: 'nav_home' },
  { href: '#about', labelKey: 'nav_about' },
  { href: '#services', labelKey: 'nav_services' },
  { href: '#portfolio', labelKey: 'nav_portfolio' },
  { href: '#results', labelKey: 'nav_results' },
  { href: '#whyus', labelKey: 'nav_whyus' },
  { href: '#contact', labelKey: 'nav_contact' },
];

const serviceLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: '#services', labelKey: 'service_1_title' },
  { href: '#services', labelKey: 'service_2_title' },
  { href: '#services', labelKey: 'service_3_title' },
  { href: '#services', labelKey: 'service_4_title' },
  { href: '#services', labelKey: 'service_5_title' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/zero2onedm/', label: 'Instagram', icon: 'instagram' },
  { href: 'https://x.com/Zero2OneDM', label: 'X (Twitter)', icon: 'twitter' },
  { href: 'https://www.tiktok.com/@zero2one2030', label: 'TikTok', icon: 'tiktok' },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="section-dark section-gold-accent-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo-white.png"
              alt="ZERO 2 ONE"
              width={140}
              height={44}
              className="h-10 w-auto mb-4"
            />
            <p className="text-[#f5f3f0]/75 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6 font-semibold">{t('footer_desc')}</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="https://www.instagram.com/zero2onedm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <Instagram size={14} className="sm:w-4 sm:h-4" />
              </a>
              <a href="https://x.com/Zero2OneDM" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@zero2one2030" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.86 2.86 0 0 1 .9.15V9.01a6.27 6.27 0 0 0-.9-.07 6.34 6.34 0 0 0 0 12.68 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#bc8934]">{t('footer_links')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-[#f5f3f0]/75 hover:text-[#bc8934] transition-colors duration-300 text-xs sm:text-sm font-semibold min-h-[44px] flex items-center"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#bc8934]">{t('footer_services')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-[#f5f3f0]/75 hover:text-[#bc8934] transition-colors duration-300 text-xs sm:text-sm font-semibold min-h-[44px] flex items-center"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#bc8934]">{t('footer_contact')}</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin size={16} className="text-[#bc8934] mt-0.5 shrink-0 sm:w-[18px] sm:h-[18px]" />
                <span className="text-[#f5f3f0]/75 text-xs sm:text-sm font-semibold">{t('contact_address')}</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone size={16} className="text-[#bc8934] mt-0.5 shrink-0 sm:w-[18px] sm:h-[18px]" />
                <a href="tel:+966530307054" dir="ltr" className="text-[#f5f3f0]/75 hover:text-[#bc8934] transition-colors text-xs sm:text-sm font-semibold">
                  +966 53 030 7054
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail size={16} className="text-[#bc8934] mt-0.5 shrink-0 sm:w-[18px] sm:h-[18px]" />
                <a href="mailto:zero2one012025@gmail.com" dir="ltr" className="text-[#f5f3f0]/75 hover:text-[#bc8934] transition-colors text-xs sm:text-sm font-semibold">
                  zero2one012025@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
          <p className="text-white/75 text-[10px] sm:text-xs font-semibold">
            &copy; {year} ZERO 2 ONE. {t('footer_rights')}
          </p>
          <p className="text-white/75 text-[10px] sm:text-xs font-semibold">
            من الصفر إلى الواحد
          </p>
        </div>
      </div>
    </footer>
  );
}
