'use client';

import { useLanguage } from './LanguageProvider';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import Image from 'next/image';
import type { TranslationKey } from '@/lib/i18n';

const quickLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: '#hero', labelKey: 'nav_home' },
  { href: '#about', labelKey: 'nav_about' },
  { href: '#services', labelKey: 'nav_services' },
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
  { href: 'https://www.youtube.com/@zero2one2030', label: 'YouTube', icon: 'youtube' },
  { href: 'https://www.linkedin.com/company/zero2onedm', label: 'LinkedIn', icon: 'linkedin' },
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
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo-hq.png"
                alt={t('company_name') || 'ZERO TO ONE'}
                width={48}
                height={48}
                className="h-10 sm:h-12 w-auto"
              />
              <span className="text-white font-bold text-base sm:text-lg tracking-wide">{t('company_name')}</span>
            </div>
            <p className="text-[#f5f3f0]/75 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6 font-semibold">{t('footer_desc')}</p>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <a href="https://www.instagram.com/zero2onedm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <Instagram size={14} className="sm:w-4 sm:h-4" />
              </a>
              <a href="https://x.com/Zero2OneDM" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@zero2one2030" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.86 2.86 0 0 1 .9.15V9.01a6.27 6.27 0 0 0-.9-.07 6.34 6.34 0 0 0 0 12.68 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg>
              </a>
              <a href="https://www.youtube.com/@zero2one2030" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/zero2onedm" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#bc8934] hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
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
                <a href="mailto:info@zero2one.sa" dir="ltr" className="text-[#f5f3f0]/75 hover:text-[#bc8934] transition-colors text-xs sm:text-sm font-semibold">
                  info@zero2one.sa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-center">
          <p className="text-white/75 text-[10px] sm:text-xs font-semibold">
            &copy; {year} {t('company_name')}. {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
