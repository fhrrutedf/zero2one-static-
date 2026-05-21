'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowDown, Sparkles, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-dark overflow-hidden">
      <div className="absolute inset-0 geometric-pattern opacity-30" />
      <div className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-[#bc8934]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-36 h-36 sm:w-48 sm:h-48 bg-[#d4a043]/5 rounded-full blur-3xl animate-float delay-300" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-[#bc8934]/3 rounded-full blur-2xl animate-float delay-500" />
      <div className="absolute top-0 left-1/4 w-px h-20 sm:h-32 bg-gradient-to-b from-[#bc8934]/30 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-24 sm:h-48 bg-gradient-to-b from-[#d4a043]/20 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-40 sm:w-64 h-px bg-gradient-to-r from-transparent via-[#bc8934]/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-0">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#bc8934]/10 border border-[#bc8934]/20 text-[#d4a043] text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-fade-in-up">
            <Sparkles size={14} className="sm:w-4 sm:h-4 shrink-0" />
            <span>{t('hero_badge')}</span>
          </div>

          {isAr ? (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up delay-200">
              <span className="text-[#f5f3f0]">{t('hero_title_1')}</span>
              <br />
              <span className="text-[#f5f3f0]">{t('hero_title_2')} </span>
              <span className="text-brand-gradient">{t('hero_title_highlight')}</span>
            </h1>
          ) : (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up delay-200">
              <span className="text-[#f5f3f0]">{t('hero_title_1')}</span>
              <br />
              <span className="text-[#f5f3f0]">{t('hero_title_2')} </span>
              <span className="text-brand-gradient">{t('hero_title_highlight')}</span>
            </h1>
          )}

          <p className="text-base sm:text-lg lg:text-xl max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 animate-fade-in-up delay-400 text-white/90 font-semibold">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 animate-fade-in-up delay-500">
            <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#bc8934] text-white font-semibold text-base sm:text-lg hover:bg-[#9a6e2a] transition-all duration-300 shadow-lg shadow-[#bc8934]/25 hover:shadow-[#bc8934]/40 text-center">
              {t('hero_btn_services')}
            </a>
            <a href="#results" onClick={(e) => { e.preventDefault(); document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#bc8934]/30 text-[#bc8934] font-semibold text-base sm:text-lg hover:bg-[#bc8934]/10 transition-all duration-300 text-center">
              {t('hero_btn_portfolio')}
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-12 max-w-md sm:max-w-xl mx-auto animate-fade-in-up delay-700">
            <div className="text-center">
              <Target size={16} className="text-[#bc8934] mx-auto mb-1.5 sm:mb-2 sm:w-5 sm:h-5" />
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"><CountUp target={150} suffix="+" /></div>
              <div className="text-xs sm:text-sm mt-0.5 sm:mt-1 text-white/80 font-semibold">{t('about_stats_projects')}</div>
            </div>
            <div className="text-center">
              <TrendingUp size={16} className="text-[#bc8934] mx-auto mb-1.5 sm:mb-2 sm:w-5 sm:h-5" />
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"><CountUp target={80} suffix="+" /></div>
              <div className="text-xs sm:text-sm mt-0.5 sm:mt-1 text-white/80 font-semibold">{t('about_stats_clients')}</div>
            </div>
            <div className="text-center">
              <Sparkles size={16} className="text-[#bc8934] mx-auto mb-1.5 sm:mb-2 sm:w-5 sm:h-5" />
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"><CountUp target={5} suffix="+" /></div>
              <div className="text-xs sm:text-sm mt-0.5 sm:mt-1 text-white/80 font-semibold">{t('about_stats_experience')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 animate-fade-in-up delay-1000">
        <span className="text-[10px] sm:text-xs text-white/40">{t('hero_scroll')}</span>
        <ArrowDown size={16} className="text-[#bc8934] animate-bounce sm:w-5 sm:h-5" />
      </div>
    </section>
  );
}
