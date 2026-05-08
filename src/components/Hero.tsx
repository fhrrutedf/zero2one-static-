'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowDown, Sparkles, Target, TrendingUp } from 'lucide-react';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  );
}

export default function Hero() {
  // Hero is always visible on initial load - no need for scroll animation
  const isVisible = true;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 geometric-pattern opacity-30" />
      
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-violet/5 rounded-full blur-3xl animate-float delay-300" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gold/3 rounded-full blur-2xl animate-float delay-500" />

      {/* Gold line decorations */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-gold/30 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-violet/20 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-64 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-light text-sm font-medium mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles size={16} />
            وكالة تسويق رقمي رائدة في السعودية
          </div>

          {/* Main Title */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">نبدأ من</span>{' '}
            <span className="text-gold-gradient">الصفر</span>
            <br />
            <span className="text-white">لنصل معك إلى</span>{' '}
            <span className="text-gold-gradient">القمة</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            نحوّل رؤيتك إلى واقع رقمي مبهر. فريقنا المتخصص يقدم حلولاً تسويقية
            متكاملة تجعل علامتك التجارية تتصدر المشهد الرقمي
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-white font-semibold text-lg hover:bg-gold-dark transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-gold/40"
            >
              اكتشف خدماتنا
            </a>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              شاهد أعمالنا
            </a>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-6 sm:gap-12 max-w-xl mx-auto transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target size={20} className="text-gold ml-2" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp target={100} suffix="+" />
              </div>
              <div className="text-sm text-white/50 mt-1">مشروع منجز</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={20} className="text-gold ml-2" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp target={98} suffix="%" />
              </div>
              <div className="text-sm text-white/50 mt-1">رضا العملاء</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Sparkles size={20} className="text-gold ml-2" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp target={50} suffix="+" />
              </div>
              <div className="text-sm text-white/50 mt-1">عميل نشط</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-white/40 text-xs">اكتشف المزيد</span>
        <ArrowDown size={20} className="text-gold animate-bounce" />
      </div>
    </section>
  );
}
