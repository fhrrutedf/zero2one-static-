'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { MessageCircle, Share2, Camera, Search, Globe, Megaphone } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

const services: {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  { icon: Share2, titleKey: 'service_1_title', descKey: 'service_1_desc' },
  { icon: Megaphone, titleKey: 'service_2_title', descKey: 'service_2_desc' },
  { icon: Camera, titleKey: 'service_3_title', descKey: 'service_3_desc' },
  { icon: Search, titleKey: 'service_4_title', descKey: 'service_4_desc' },
  { icon: Globe, titleKey: 'service_5_title', descKey: 'service_5_desc' },
  { icon: Megaphone, titleKey: 'service_6_title', descKey: 'service_6_desc' },
];

export default function Services() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            {t('services_tag')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t('services_title')}</h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground leading-relaxed">{t('services_subtitle')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.titleKey}
                className={`card-hover bg-card-bg rounded-2xl p-6 lg:p-8 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="service-icon mb-5">
                  <Icon size={32} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t(service.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{t(service.descKey)}</p>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] font-semibold text-sm hover:bg-[#25D366] hover:text-white transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  {t('services_whatsapp')}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
