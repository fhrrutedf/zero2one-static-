'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import type { TranslationKey } from '@/lib/i18n';

const navKeys: { href: string; labelKey: TranslationKey }[] = [
  { href: '#hero', labelKey: 'nav_home' },
  { href: '#about', labelKey: 'nav_about' },
  { href: '#services', labelKey: 'nav_services' },
  { href: '#portfolio', labelKey: 'nav_portfolio' },
  { href: '#blog', labelKey: 'nav_blog' },
  { href: '#contact', labelKey: 'nav_contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, toggleLang, t, isRTL } = useLanguage();

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-2 shrink-0"
          >
            <span className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <span className="text-gold-gradient">شركتك</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`nav-link text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? activeSection === link.href.slice(1) ? 'text-gold' : 'text-foreground hover:text-gold'
                    : activeSection === link.href.slice(1) ? 'text-gold-light' : 'text-white/80 hover:text-white'
                } ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          {/* CTA + Lang + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 border min-w-[40px] justify-center ${
                isScrolled
                  ? 'border-border text-foreground hover:bg-muted'
                  : 'border-white/20 text-white/80 hover:bg-white/10'
              }`}
              aria-label="Toggle Language"
            >
              <Globe size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Desktop CTA */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-gold text-white hover:bg-gold-dark'
                  : 'bg-gold/20 text-gold-light border border-gold/30 hover:bg-gold hover:text-white'
              }`}
            >
              <Phone size={14} />
              <span>{t('cta_contact')}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
              }`}
              aria-label={lang === 'ar' ? 'القائمة' : 'Menu'}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - using inline styles for direction-aware animation */}
      <div
        className="fixed top-0 w-[280px] sm:w-72 h-full bg-dark shadow-2xl z-50 lg:hidden transition-transform duration-300 ease-in-out"
        style={{
          [isRTL ? 'right' : 'left']: 0,
          transform: isMobileMenuOpen ? 'translateX(0)' : (isRTL ? 'translateX(100%)' : 'translateX(-100%)'),
        }}
      >
        <div className="p-5 sm:p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <span className="text-lg sm:text-xl font-bold text-gold-gradient">شركتك</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/60 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
                    ? 'bg-gold/10 text-gold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 space-y-3">
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-gold text-white font-semibold hover:bg-gold-dark transition-colors min-h-[48px]"
            >
              <Phone size={16} />
              {t('cta_contact')}
            </a>
            <button
              onClick={toggleLang}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors min-h-[48px]"
            >
              <Globe size={16} />
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  );
}
