'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Brain, Users, TrendingUp, Handshake, PenTool } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

const features: {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  { icon: Brain, titleKey: 'whyus_1_title', descKey: 'whyus_1_desc' },
  { icon: Users, titleKey: 'whyus_2_title', descKey: 'whyus_2_desc' },
  { icon: TrendingUp, titleKey: 'whyus_3_title', descKey: 'whyus_3_desc' },
  { icon: Handshake, titleKey: 'whyus_4_title', descKey: 'whyus_4_desc' },
  { icon: PenTool, titleKey: 'whyus_5_title', descKey: 'whyus_5_desc' },
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
    <section id="whyus" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand/10 text-brand text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('whyus_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{t('whyus_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('whyus_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={feature.titleKey} className={`card-hover text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card-bg ${visible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-brand/20 to-brand-light/10 flex items-center justify-center">
                  <Icon size={22} className="text-brand sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
