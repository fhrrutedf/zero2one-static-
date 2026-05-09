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
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 geometric-pattern opacity-30" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-violet/5 rounded-full blur-3xl animate-float delay-300" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gold/3 rounded-full blur-2xl animate-float delay-500" />
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-gold/30 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-violet/20 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-64 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-light text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles size={16} />
            {t('hero_badge')}
          </div>

          {/* Main Title - Arabic style with elongated text like serajj.sa */}
          {isAr ? (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-200">
              <span className="text-white">نبدع فنؤثر</span>
              <br />
              <span className="text-white">فنحقق </span>
              <span className="text-gold-gradient">نتــــــــــــــــــــــــــــــــــــائج</span>
            </h1>
          ) : (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-200">
              <span className="text-white">We Create</span>
              <br />
              <span className="text-white">We Impact </span>
              <span className="text-gold-gradient">Resuuuuults</span>
            </h1>
          )}

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-400">
            {t('hero_subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-500">
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-white font-semibold text-lg hover:bg-gold-dark transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-gold/40"
            >
              {t('hero_btn_services')}
            </a>
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              {t('hero_btn_portfolio')}
            </a>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 max-w-xl mx-auto animate-fade-in-up delay-700">
            <div className="text-center">
              <Target size={20} className="text-gold mx-auto mb-2" />
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp target={100} suffix="+" />
              </div>
              <div className="text-sm text-white/50 mt-1">{t('about_stats_projects')}</div>
            </div>
            <div className="text-center">
              <TrendingUp size={20} className="text-gold mx-auto mb-2" />
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp target={98} suffix="%" />
              </div>
              <div className="text-sm text-white/50 mt-1">{t('about_stats_clients')}</div>
            </div>
            <div className="text-center">
              <Sparkles size={20} className="text-gold mx-auto mb-2" />
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp target={50} suffix="+" />
              </div>
              <div className="text-sm text-white/50 mt-1">{t('about_stats_experience')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up delay-1000">
        <span className="text-white/40 text-xs">{t('hero_scroll')}</span>
        <ArrowDown size={20} className="text-gold animate-bounce" />
      </div>
    </section>
  );
}
