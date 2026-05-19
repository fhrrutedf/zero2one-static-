'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Briefcase, Users, Clock, ThumbsUp } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  valueKey: string;
  target: number;
  suffix: string;
  labelKey: 'stats_1_label' | 'stats_2_label' | 'stats_3_label' | 'stats_4_label';
}

const stats: StatItem[] = [
  { icon: Briefcase, valueKey: 'stats_1_value', target: 150, suffix: '+', labelKey: 'stats_1_label' },
  { icon: Users, valueKey: 'stats_2_value', target: 80, suffix: '+', labelKey: 'stats_2_label' },
  { icon: Clock, valueKey: 'stats_3_value', target: 5, suffix: '+', labelKey: 'stats_3_label' },
  { icon: ThumbsUp, valueKey: 'stats_4_value', target: 98, suffix: '%', labelKey: 'stats_4_label' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
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
    const duration = 2500;
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

export default function Stats() {
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
    <section id="stats" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-dark-alt section-gold-accent-top relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 border border-[#bc8934]/20 text-[#d4a043] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('stats_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">{t('stats_title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={stat.labelKey} className={`text-center p-5 sm:p-8 rounded-xl sm:rounded-2xl border bg-white/5 backdrop-blur-sm border-white/10 hover:border-[#bc8934]/30 hover:bg-white/8 transition-all duration-300 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-[#bc8934]/20 flex items-center justify-center">
                  <Icon size={18} className="text-[#bc8934] sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 text-[#bc8934]">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] sm:text-sm font-semibold text-white/85">{t(stat.labelKey)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
