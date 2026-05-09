'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Award, Users, Clock } from 'lucide-react';

export default function About() {
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
    <section id="about" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Side */}
          <div className={`relative ${visible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 via-violet/10 to-gold/5 flex items-center justify-center">
                <div className="text-center p-6 sm:p-8">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                    <Award size={32} className="text-gold sm:w-12 sm:h-12" />
                  </div>
                  <p className="text-gold font-bold text-lg sm:text-xl">شركتك</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">وكالة تسويق رقمي</p>
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-white rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Users size={20} className="text-gold sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-foreground">+300</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{t('about_stats_clients')}</div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`${visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gold/10 text-gold text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              {t('about_tag')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              {t('about_title')}
            </h2>
            <div className="section-divider mb-6 sm:mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{t('about_p1')}</p>
            <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{t('about_p2')}</p>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{t('about_p3')}</p>

            {/* Mini Stats Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Award size={16} className="text-gold sm:w-5 sm:h-5" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground">+500</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{t('about_stats_projects')}</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Users size={16} className="text-gold sm:w-5 sm:h-5" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground">+300</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{t('about_stats_clients')}</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Clock size={16} className="text-gold sm:w-5 sm:h-5" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground">+10</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{t('about_stats_experience')}</div>
              </div>
            </div>

            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gold text-white font-semibold text-sm sm:text-base hover:bg-gold-dark transition-all duration-300"
            >
              {t('about_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
