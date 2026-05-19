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
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Individual card animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            if (!isNaN(idx)) {
              setVisibleCards((prev) => new Set(prev).add(idx));
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-light-alt section-gold-accent-top overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Portfolio Grid - 2 columns on mobile/tablet, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {projects.map((project, idx) => {
            const isCardVisible = visibleCards.has(idx);

            return (
              <div
                key={project.titleKey}
                ref={(el) => { cardsRef.current[idx] = el; }}
                data-idx={idx}
                className={`portfolio-card group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-700 hover:shadow-2xl hover:shadow-[#bc8934]/10 bg-white ${
                  isCardVisible ? 'animate-scale-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                {/* Image container - object-contain to show FULL image */}
                <div className="portfolio-image aspect-square relative bg-[#f5f3f0]">
                  <Image
                    src={project.image}
                    alt={t(project.titleKey)}
                    fill
                    className="object-contain p-3 sm:p-4"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Title area - ALWAYS visible */}
                <div className="p-3 sm:p-4 border-t border-[#ede9e4]">
                  {/* Category with animation */}
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full bg-[#bc8934]/10 text-[#bc8934] text-[10px] sm:text-xs font-bold mb-1.5 transition-all duration-500 ${
                      isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    style={{ transitionDelay: `${idx * 120 + 200}ms` }}
                  >
                    {t(project.catKey)}
                  </span>
                  <h3 className="text-foreground text-xs sm:text-sm font-bold leading-tight line-clamp-2">
                    {t(project.titleKey)}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[#bc8934] text-[10px] sm:text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t('portfolio_view')}
                    <ExternalLink size={10} className="sm:w-3 sm:h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
