'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Briefcase, Users, DollarSign, Rocket } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  valueKey: string;
  target: number;
  suffix: string;
  labelKey: 'stats_1_label' | 'stats_2_label' | 'stats_3_label' | 'stats_4_label';
}

const stats: StatItem[] = [
  { icon: Briefcase, valueKey: 'stats_1_value', target: 500, suffix: '+', labelKey: 'stats_1_label' },
  { icon: Users, valueKey: 'stats_2_value', target: 300, suffix: '+', labelKey: 'stats_2_label' },
  { icon: DollarSign, valueKey: 'stats_3_value', target: 87, suffix: 'K+', labelKey: 'stats_3_label' },
  { icon: Rocket, valueKey: 'stats_4_value', target: 100, suffix: '+', labelKey: 'stats_4_label' },
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
    <section id="stats" ref={sectionRef} className="py-20 lg:py-28 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 geometric-pattern opacity-20" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold-light text-sm font-semibold mb-4">
            {t('stats_tag')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('stats_title')}</h2>
          <div className="section-divider" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.labelKey}
                className={`text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 ${
                  visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <Icon size={24} className="text-gold" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-white/60 text-sm font-medium">{t(stat.labelKey)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
