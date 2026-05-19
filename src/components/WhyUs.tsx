'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Handshake, PenTool, Rocket } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

const features: {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  { icon: Handshake, titleKey: 'whyus_1_title', descKey: 'whyus_1_desc' },
  { icon: PenTool, titleKey: 'whyus_2_title', descKey: 'whyus_2_desc' },
  { icon: Rocket, titleKey: 'whyus_3_title', descKey: 'whyus_3_desc' },
];

export default function WhyUs() {
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
    <section id="whyus" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-dark-alt section-gold-accent-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 text-[#bc8934] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('whyus_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{t('whyus_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('whyus_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={feature.titleKey} className={`card-hover text-center p-8 sm:p-10 rounded-xl sm:rounded-2xl bg-card-bg ${visible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-8 rounded-full bg-gradient-to-br from-[#bc8934]/20 to-[#d4a043]/10 flex items-center justify-center">
                  <Icon size={26} className="text-[#bc8934] sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
