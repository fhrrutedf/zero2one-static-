'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { ExternalLink } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

const projects: {
  titleKey: TranslationKey;
  catKey: TranslationKey;
  gradient: string;
}[] = [
  { titleKey: 'portfolio_1_title', catKey: 'portfolio_1_cat', gradient: 'from-gold/30 to-violet/20' },
  { titleKey: 'portfolio_2_title', catKey: 'portfolio_2_cat', gradient: 'from-violet/30 to-gold/20' },
  { titleKey: 'portfolio_3_title', catKey: 'portfolio_3_cat', gradient: 'from-gold/20 to-violet/30' },
  { titleKey: 'portfolio_4_title', catKey: 'portfolio_4_cat', gradient: 'from-violet/20 to-gold/30' },
  { titleKey: 'portfolio_5_title', catKey: 'portfolio_5_cat', gradient: 'from-gold/30 to-violet/10' },
  { titleKey: 'portfolio_6_title', catKey: 'portfolio_6_cat', gradient: 'from-violet/30 to-gold/10' },
];

export default function Portfolio() {
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
    <section id="portfolio" ref={sectionRef} className="py-20 lg:py-28 bg-light-bg">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            {t('portfolio_tag')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t('portfolio_title')}</h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground leading-relaxed">{t('portfolio_subtitle')}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.titleKey}
              className={`portfolio-card group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer ${
                visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image Placeholder */}
              <div className={`portfolio-image aspect-[4/3] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                    <ExternalLink size={24} className="text-white" />
                  </div>
                  <p className="text-white/80 text-sm font-medium">{t(project.catKey)}</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent flex flex-col justify-end p-6">
                <span className="text-gold text-sm font-semibold mb-1">{t(project.catKey)}</span>
                <h3 className="text-white text-lg font-bold mb-3">{t(project.titleKey)}</h3>
                <span className="inline-flex items-center gap-1 text-gold-light text-sm font-medium">
                  {t('portfolio_view')}
                  <ExternalLink size={14} />
                </span>
              </div>

              {/* Bottom Info (visible without hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-gold/80 text-xs font-medium">{t(project.catKey)}</span>
                <h3 className="text-white text-sm font-bold">{t(project.titleKey)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
