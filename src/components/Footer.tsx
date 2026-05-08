'use client';

import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
} from 'lucide-react';

const quickLinks = [
  { href: '#hero', label: 'الرئيسية' },
  { href: '#about', label: 'من نحن' },
  { href: '#services', label: 'خدماتنا' },
  { href: '#portfolio', label: 'أعمالنا' },
  { href: '#pricing', label: 'الباقات' },
  { href: '#contact', label: 'تواصل معنا' },
];

const serviceLinks = [
  'تحسين محركات البحث',
  'تصميم وتطوير المواقع',
  'إدارة الحملات الإعلانية',
  'بناء الهوية التجارية',
  'تسويق المحتوى',
];

const socialLinks = [
  { icon: Twitter, label: 'تويتر', href: '#' },
  { icon: Instagram, label: 'انستقرام', href: '#' },
  { icon: Linkedin, label: 'لينكدإن', href: '#' },
  { icon: Youtube, label: 'يوتيوب', href: '#' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white relative">
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-l from-gold via-violet to-gold" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <span className="text-2xl font-bold">
                <span className="text-gold-gradient">Zero</span>
                <span className="text-white/40 mx-1">2</span>
                <span className="text-gold-gradient">One</span>
              </span>
              <p className="text-xs text-white/40 mt-1">من الصفر إلى الواحد</p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              وكالة تسويق رقمي رائدة في المملكة العربية السعودية. نساعدك على بناء
              حضورك الرقمي وتحقيق أهدافك التسويقية بأحدث التقنيات والاستراتيجيات.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-gold hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-white/50 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">خدماتنا</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-white/50 hover:text-gold transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/50">
                  الرياض، المملكة العربية السعودية
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+966530307054"
                  className="text-sm text-white/50 hover:text-gold transition-colors"
                >
                  +966 53 030 7054
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:Info@zero2one.sa"
                  className="text-sm text-white/50 hover:text-gold transition-colors"
                >
                  Info@zero2one.sa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 text-center sm:text-right">
            © {new Date().getFullYear()} من الصفر إلى الواحد. جميع الحقوق محفوظة.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all duration-300"
            aria-label="العودة للأعلى"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
