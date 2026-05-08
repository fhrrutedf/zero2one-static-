'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'الرئيسية' },
  { href: '#about', label: 'من نحن' },
  { href: '#services', label: 'خدماتنا' },
  { href: '#portfolio', label: 'أعمالنا' },
  { href: '#pricing', label: 'الباقات' },
  { href: '#testimonials', label: 'آراء العملاء' },
  { href: '#contact', label: 'تواصل معنا' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
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

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center">
              <span
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-dark' : 'text-white'
                }`}
              >
                <span className="text-gold-gradient">Zero</span>
                <span className="mx-1 text-muted-foreground">2</span>
                <span className="text-gold-gradient">One</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`nav-link text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? activeSection === link.href.slice(1)
                      ? 'text-gold'
                      : 'text-dark hover:text-gold'
                    : activeSection === link.href.slice(1)
                    ? 'text-gold-light'
                    : 'text-white/80 hover:text-white'
                } ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-gold text-white hover:bg-gold-dark'
                  : 'bg-gold/20 text-gold-light border border-gold/30 hover:bg-gold hover:text-white'
              }`}
            >
              <Phone size={16} />
              لنتحدث
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? 'text-dark hover:bg-muted'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 w-72 h-full bg-dark shadow-2xl z-50 lg:hidden ${
          isMobileMenuOpen ? 'open' : ''
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold text-white">
              <span className="text-gold-gradient">Zero</span>
              <span className="text-muted-foreground mx-1">2</span>
              <span className="text-gold-gradient">One</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/60 hover:text-white p-1"
              aria-label="إغلاق القائمة"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'bg-gold/10 text-gold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-gold text-white font-semibold hover:bg-gold-dark transition-colors"
            >
              <Phone size={16} />
              لنتحدث
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
