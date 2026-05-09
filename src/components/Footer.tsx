'use client';

import { useLanguage } from './LanguageProvider';
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

const quickLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: '#hero', labelKey: 'nav_home' },
  { href: '#about', labelKey: 'nav_about' },
  { href: '#services', labelKey: 'nav_services' },
  { href: '#portfolio', labelKey: 'nav_portfolio' },
  { href: '#blog', labelKey: 'nav_blog' },
  { href: '#contact', labelKey: 'nav_contact' },
];

const serviceLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: '#services', labelKey: 'service_1_title' },
  { href: '#services', labelKey: 'service_2_title' },
  { href: '#services', labelKey: 'service_4_title' },
  { href: '#services', labelKey: 'service_5_title' },
  { href: '#services', labelKey: 'service_6_title' },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-gold-gradient">شركتك</h3>
            <p className="text-white/60 leading-relaxed text-sm mb-6">{t('footer_desc')}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-gold hover:text-white transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-gold hover:text-white transition-all duration-300">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-gold hover:text-white transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-gold hover:text-white transition-all duration-300">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">{t('footer_links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">{t('footer_services')}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">{t('footer_contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">{t('contact_address')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-gold mt-0.5 shrink-0" />
                <a href="tel:+966500000000" className="text-white/60 hover:text-gold transition-colors text-sm">
                  {t('contact_phone_num')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gold mt-0.5 shrink-0" />
                <a href="mailto:info@shirkatak.com" className="text-white/60 hover:text-gold transition-colors text-sm">
                  {t('contact_email_addr')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            &copy; {year} شركتك. {t('footer_rights')}
          </p>
          <p className="text-white/40 text-xs">
            تصميم وتطوير وكالة تسويق رقمي
          </p>
        </div>
      </div>
    </footer>
  );
}
