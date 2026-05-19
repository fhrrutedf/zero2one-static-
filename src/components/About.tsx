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
    <section id="about" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-dark section-gold-accent-top relative overflow-hidden">
      {/* Let Saudi landmarks background show through */}
      <div className="absolute inset-0 geometric-pattern opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-3xl mx-auto ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 text-[#bc8934] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('about_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {t('about_title')}
          </h2>
          <div className="section-divider mb-6 sm:mb-8" />
          <p className="text-white/85 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg font-semibold">{t('about_p1')}</p>
          <p className="text-white/85 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg font-semibold">{t('about_p2')}</p>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-10 max-w-lg mx-auto">
            <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Award size={20} className="text-[#bc8934] sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-3xl font-bold text-white">+150</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-semibold mt-1">{t('about_stats_projects')}</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Users size={20} className="text-[#bc8934] sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-3xl font-bold text-white">+80</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-semibold mt-1">{t('about_stats_clients')}</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Clock size={20} className="text-[#bc8934] sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-3xl font-bold text-white">+5</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-semibold mt-1">{t('about_stats_experience')}</div>
            </div>
          </div>

          <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#bc8934] text-white font-bold text-sm sm:text-base hover:bg-[#9a6e2a] transition-all duration-300 shadow-lg shadow-[#bc8934]/25">
            {t('about_btn')}
          </a>
        </div>
      </div>
    </section>
  );
}
