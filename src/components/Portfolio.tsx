'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { TranslationKey } from '@/lib/i18n';

const projects: {
  titleKey: TranslationKey;
  catKey: TranslationKey;
  image: string;
  descKey?: TranslationKey;
}[] = [
  { titleKey: 'portfolio_1_title', catKey: 'portfolio_1_cat', image: '/images/projects/doctor/poster-1.png' },
  { titleKey: 'portfolio_2_title', catKey: 'portfolio_2_cat', image: '/images/projects/Logistics-Delivery-App/3.png' },
  { titleKey: 'portfolio_3_title', catKey: 'portfolio_3_cat', image: '/images/projects/branding-coffee/poster.png' },
  { titleKey: 'portfolio_4_title', catKey: 'portfolio_4_cat', image: '/images/projects/osool/d-three.png' },
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
    <section id="portfolio" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-light-alt section-gold-accent-top overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Animates from top */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span
            className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 text-[#bc8934] text-xs sm:text-sm font-semibold mb-3 sm:mb-4 transition-all duration-700 ${
              visible ? 'animate-slide-from-top' : 'opacity-0 -translate-y-10'
            }`}
          >
            {t('portfolio_tag')}
          </span>

          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-700 ${
              visible ? 'animate-slide-from-bottom' : 'opacity-0 translate-y-16'
            }`}
            style={{ animationDelay: '150ms' }}
          >
            {t('portfolio_title')}
          </h2>

          <div
            className={`section-divider mb-4 sm:mb-6 transition-all duration-700 ${
              visible ? 'animate-expand-line' : 'w-0 opacity-0'
            }`}
            style={{ animationDelay: '350ms' }}
          />

          <p
            className={`text-foreground/85 leading-relaxed text-sm sm:text-base font-semibold transition-all duration-700 ${
              visible ? 'animate-slide-from-bottom' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: '450ms' }}
          >
            {t('portfolio_subtitle')}
          </p>
        </div>

        {/* Portfolio Grid - 2x2 layout with larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {projects.map((project, idx) => {
            const animClass = idx === 0
              ? 'animate-slide-from-left'
              : idx === 1
              ? 'animate-slide-from-right'
              : idx === 2
              ? 'animate-slide-from-right'
              : 'animate-slide-from-left';

            return (
              <div
                key={project.titleKey}
                className={`portfolio-card group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-700 hover:shadow-2xl hover:shadow-[#bc8934]/10 ${
                  visible ? animClass : 'opacity-0'
                }`}
                style={{ animationDelay: `${500 + idx * 150}ms` }}
              >
                <div className="portfolio-image aspect-[4/3] relative bg-[#1a1517]">
                  <Image
                    src={project.image}
                    alt={t(project.titleKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {/* Hover overlay - only appears on hover */}
                <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-[#1a1517]/95 via-[#1a1517]/70 to-[#1a1517]/30 flex flex-col justify-end p-5 sm:p-6">
                  <span className="text-[#bc8934] text-xs sm:text-sm font-semibold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{t(project.catKey)}</span>
                  <h3 className="text-white text-base sm:text-lg font-bold mb-2 sm:mb-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">{t(project.titleKey)}</h3>
                  <span className="inline-flex items-center gap-1 text-[#d4a043] text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    {t('portfolio_view')}
                    <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
                {/* Default state - subtle label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-[#1a1517]/70 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-[#bc8934]/90 text-[10px] sm:text-xs font-semibold">{t(project.catKey)}</span>
                  <h3 className="text-white text-xs sm:text-sm font-bold">{t(project.titleKey)}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
