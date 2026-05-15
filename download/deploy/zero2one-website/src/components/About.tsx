'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Award, Users, Clock } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const { t, isRTL } = useLanguage();
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
    <section id="about" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Side */}
          <div className={`relative ${visible ? (isRTL ? 'animate-fade-in-right' : 'animate-fade-in-left') : 'opacity-0'}`}>
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/thumb-one.png"
                  alt="ZERO 2 ONE - بيئة العمل"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className={`hidden lg:flex absolute -bottom-4 ${isRTL ? '-left-6' : '-right-6'} bg-white rounded-xl shadow-xl p-4 items-center gap-3`}>
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Users size={24} className="text-brand" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">+80</div>
                <div className="text-xs text-muted-foreground">{t('about_stats_clients')}</div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`${visible ? (isRTL ? 'animate-fade-in-left' : 'animate-fade-in-right') : 'opacity-0'}`}>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand/10 text-brand text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              {t('about_tag')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              {t('about_title')}
            </h2>
            <div className="section-divider mb-6 sm:mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{t('about_p1')}</p>
            <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{t('about_p2')}</p>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{t('about_p3')}</p>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Award size={16} className="text-brand sm:w-5 sm:h-5" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground">+150</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{t('about_stats_projects')}</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Users size={16} className="text-brand sm:w-5 sm:h-5" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground">+80</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{t('about_stats_clients')}</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Clock size={16} className="text-brand sm:w-5 sm:h-5" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground">+5</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{t('about_stats_experience')}</div>
              </div>
            </div>

            <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand text-white font-semibold text-sm sm:text-base hover:bg-brand-dark transition-all duration-300">
              {t('about_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
