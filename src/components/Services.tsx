'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Globe, Search, Megaphone, Palette, Share2, ShoppingCart, MessageCircle } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

const services: {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  { icon: Globe, titleKey: 'service_1_title', descKey: 'service_1_desc' },
  { icon: Search, titleKey: 'service_2_title', descKey: 'service_2_desc' },
  { icon: Megaphone, titleKey: 'service_3_title', descKey: 'service_3_desc' },
  { icon: Palette, titleKey: 'service_4_title', descKey: 'service_4_desc' },
  { icon: Share2, titleKey: 'service_5_title', descKey: 'service_5_desc' },
  { icon: ShoppingCart, titleKey: 'service_6_title', descKey: 'service_6_desc' },
];

export default function Services() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-dark-alt section-gold-accent-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 text-[#bc8934] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('services_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{t('services_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('services_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={service.titleKey} className={`card-hover bg-card-bg rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="service-icon mb-4 sm:mb-5">
                  <Icon size={24} className="text-[#bc8934] sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{t(service.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm">{t(service.descKey)}</p>
                <a href="https://wa.me/966530307054" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] font-semibold text-xs sm:text-sm hover:bg-[#25D366] hover:text-white transition-all duration-300 min-h-[44px]">
                  <MessageCircle size={14} className="sm:w-4 sm:h-4 shrink-0" />
                  <span>{t('services_whatsapp')}</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
