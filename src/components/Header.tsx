'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';
import type { TranslationKey } from '@/lib/i18n';

const navKeys: { href: string; labelKey: TranslationKey }[] = [
  { href: '#hero', labelKey: 'nav_home' },
  { href: '#about', labelKey: 'nav_about' },
  { href: '#services', labelKey: 'nav_services' },
  { href: '#results', labelKey: 'nav_results' },
  { href: '#whyus', labelKey: 'nav_whyus' },
  { href: '#contact', labelKey: 'nav_contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, toggleLang, t, isRTL } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navKeys.map((link) => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Theme-aware header background
  const headerBg = isScrolled
    ? isDark
      ? 'bg-[#1a1517]/95 backdrop-blur-md shadow-lg shadow-black/30'
      : 'bg-[#1a1517]/95 backdrop-blur-md shadow-lg shadow-black/30'
    : 'bg-transparent';

  // Theme-aware text colors - gold accent for active, light text on dark header
  const navTextActive = 'text-[#bc8934]';
  const navTextDefault = isDark ? 'text-white/80 hover:text-white' : 'text-white/80 hover:text-white';
  const mobileMenuBg = 'bg-[#1a1517]';
  const mobileMenuMuted = 'text-white/70 hover:bg-white/5 hover:text-white';
  const borderMuted = 'border-white/20';
  const hoverBg = 'hover:bg-white/10';
  const overlayBg = 'bg-black/50';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo + Company Name */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-2 shrink-0"
          >
            <Image
              src="/logo-hq.png"
              alt={t('company_name') || 'ZERO TO ONE'}
              width={52}
              height={52}
              className="h-9 sm:h-12 w-auto"
              priority
            />
            <span className="text-white font-bold text-base sm:text-lg tracking-wide">{t('company_name')}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`nav-link text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.href.slice(1) ? navTextActive : navTextDefault
                } ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          {/* CTA + Theme + Lang + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 border ${borderMuted} ${hoverBg}`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun size={14} className="text-[#bc8934] sm:w-4 sm:h-4" />
              ) : (
                <Moon size={14} className="text-[#bc8934] sm:w-4 sm:h-4" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 border min-w-[40px] justify-center ${borderMuted} text-white/80 hover:bg-white/10`}
              aria-label="Toggle Language"
            >
              <Globe size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Desktop CTA */}
            <a
              href="https://wa.me/966530307054"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 bg-[#bc8934] text-white hover:bg-[#9a6e2a]"
            >
              <Phone size={14} />
              <span>{t('cta_contact')}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:bg-white/10"
              aria-label={lang === 'ar' ? 'القائمة' : 'Menu'}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 w-[280px] sm:w-72 h-full ${mobileMenuBg} shadow-2xl z-50 lg:hidden transition-transform duration-300 ease-in-out`}
        style={{
          [isRTL ? 'right' : 'left']: 0,
          transform: isMobileMenuOpen ? 'translateX(0)' : (isRTL ? 'translateX(100%)' : 'translateX(-100%)'),
        }}
      >
        <div className="p-5 sm:p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-hq.png"
                alt={t('company_name') || 'ZERO TO ONE'}
                width={44}
                height={44}
                className="h-9 sm:h-10 w-auto"
              />
              <span className="text-white font-bold text-sm sm:text-base tracking-wide">{t('company_name')}</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white"
              aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {navKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[48px] flex items-center ${
                  activeSection === link.href.slice(1)
                    ? 'bg-[#bc8934]/10 text-[#bc8934]'
                    : mobileMenuMuted
                }`}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 space-y-3">
            <a
              href="https://wa.me/966530307054"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#bc8934] text-white font-semibold hover:bg-[#9a6e2a] transition-colors min-h-[48px]"
            >
              <Phone size={16} />
              {t('cta_contact')}
            </a>

            {/* Theme Toggle in Mobile Menu */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border font-semibold transition-colors min-h-[48px] border-white/20 text-white hover:bg-white/10"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? (lang === 'ar' ? 'الوضع الفاتح' : 'Light Mode') : (lang === 'ar' ? 'الوضع الداكن' : 'Dark Mode')}
            </button>

            <button
              onClick={toggleLang}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border font-semibold transition-colors min-h-[48px] border-white/20 text-white hover:bg-white/10"
            >
              <Globe size={16} />
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 ${overlayBg} z-40 lg:hidden`} onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  );
}
