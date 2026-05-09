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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-28 bg-light-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className={`relative ${visible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 via-violet/10 to-gold/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                    <Award size={48} className="text-gold" />
                  </div>
                  <p className="text-gold font-bold text-xl">شركتك</p>
                  <p className="text-muted-foreground text-sm mt-1">وكالة تسويق رقمي</p>
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Users size={24} className="text-gold" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">+300</div>
                <div className="text-xs text-muted-foreground">{t('about_stats_clients')}</div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`${visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
              {t('about_tag')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t('about_title')}
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-4">{t('about_p1')}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{t('about_p2')}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t('about_p3')}</p>

            {/* Mini Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-2">
                  <Award size={20} className="text-gold" />
                </div>
                <div className="text-2xl font-bold text-foreground">+500</div>
                <div className="text-xs text-muted-foreground">{t('about_stats_projects')}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-2">
                  <Users size={20} className="text-gold" />
                </div>
                <div className="text-2xl font-bold text-foreground">+300</div>
                <div className="text-xs text-muted-foreground">{t('about_stats_clients')}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card-bg">
                <div className="flex items-center justify-center mb-2">
                  <Clock size={20} className="text-gold" />
                </div>
                <div className="text-2xl font-bold text-foreground">+10</div>
                <div className="text-xs text-muted-foreground">{t('about_stats_experience')}</div>
              </div>
            </div>

            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-semibold hover:bg-gold-dark transition-all duration-300"
            >
              {t('about_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
