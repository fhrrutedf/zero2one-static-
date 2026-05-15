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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand/10 text-brand text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('portfolio_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{t('portfolio_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('portfolio_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {projects.map((project, idx) => (
            <div key={project.titleKey} className={`portfolio-card group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg cursor-pointer ${visible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="portfolio-image aspect-[4/3] relative bg-dark">
                <Image
                  src={project.image}
                  alt={t(project.titleKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
                <span className="text-brand text-xs sm:text-sm font-semibold mb-1">{t(project.catKey)}</span>
                <h3 className="text-white text-base sm:text-lg font-bold mb-2 sm:mb-3">{t(project.titleKey)}</h3>
                <span className="inline-flex items-center gap-1 text-brand-light text-xs sm:text-sm font-medium">
                  {t('portfolio_view')}
                  <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-dark/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-brand/80 text-[10px] sm:text-xs font-medium">{t(project.catKey)}</span>
                <h3 className="text-white text-xs sm:text-sm font-bold">{t(project.titleKey)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
