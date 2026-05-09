'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Calendar, ArrowLeft } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

const articles: {
  titleKey: TranslationKey;
  excerptKey: TranslationKey;
  dateKey: TranslationKey;
  gradient: string;
}[] = [
  { titleKey: 'blog_1_title', excerptKey: 'blog_1_excerpt', dateKey: 'blog_1_date', gradient: 'from-gold/30 to-violet/20' },
  { titleKey: 'blog_2_title', excerptKey: 'blog_2_excerpt', dateKey: 'blog_2_date', gradient: 'from-violet/30 to-gold/20' },
  { titleKey: 'blog_3_title', excerptKey: 'blog_3_excerpt', dateKey: 'blog_3_date', gradient: 'from-gold/20 to-violet/30' },
];

export default function Blog() {
  const { t, lang } = useLanguage();
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
    <section id="blog" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gold/10 text-gold text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('blog_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{t('blog_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('blog_subtitle')}</p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {articles.map((article, idx) => (
            <article
              key={article.titleKey}
              className={`card-hover bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm ${
                visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image Placeholder */}
              <div className={`aspect-[16/9] bg-gradient-to-br ${article.gradient} flex items-center justify-center`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar size={16} className="text-white sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <span className="text-gold text-[10px] sm:text-xs font-medium">{t(article.dateKey)}</span>
                <h3 className="text-base sm:text-lg font-bold text-foreground mt-1.5 sm:mt-2 mb-2 sm:mb-3 line-clamp-2">{t(article.titleKey)}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">{t(article.excerptKey)}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-gold font-semibold text-xs sm:text-sm hover:gap-2 transition-all duration-300 min-h-[44px]"
                >
                  {t('blog_read_more')}
                  <ArrowLeft size={12} className={`sm:w-3.5 sm:h-3.5 ${lang === 'en' ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
