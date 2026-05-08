'use client';

import { useEffect, useRef, useState } from 'react';
import { Award, Heart, Lightbulb, Users } from 'lucide-react';

function SkillBarAnimated({ percentage, label }: { percentage: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), 200);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-sm font-bold text-gold">{percentage}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-l from-gold to-violet transition-all duration-[1500ms] ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Award,
      title: 'خبرة عميقة',
      description: 'أكثر من 5 سنوات من الخبرة في التسويق الرقمي',
    },
    {
      icon: Heart,
      title: 'شغف بالتميز',
      description: 'نسعى دائماً لتقديم أفضل النتائج لعملائنا',
    },
    {
      icon: Lightbulb,
      title: 'حلول إبداعية',
      description: 'أفكار مبتكرة تخرج عن المألوف',
    },
    {
      icon: Users,
      title: 'فريق متخصص',
      description: 'كفاءات متنوعة تغطي كافة احتياجاتك الرقمية',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-light-bg relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet/3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            من نحن
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            فلسفتنا في <span className="text-gold">العمل</span>
          </h2>
          <div className="section-divider mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Right side - Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-6">
              نؤمن بأن كل علامة تجارية لديها قصة فريدة تستحق أن تُروى
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              في من الصفر إلى الواحد، لا نكتفي بتقديم الخدمات التقليدية. نحن شركاء
              نجاحك الرقمي، نبدأ معك من الفكرة الأولى ونرافقك حتى تتصدر القمة. فريقنا
              يجمع بين الإبداع والخبرة التقنية لتقديم حلول متكاملة تحقق أهدافك
              التسويقية.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              نحن نؤمن بأن النجاح الرقمي يبدأ بفهم عميق لاحتياجات العملاء والسوق، ثم
              بناء استراتيجيات مبنية على البيانات والتحليل الدقيق لتحقيق أفضل النتائج.
            </p>

            {/* Skill Bars */}
            <div className="mb-8">
              <SkillBarAnimated percentage={98} label="رضا العملاء" />
              <SkillBarAnimated percentage={95} label="نسبة نجاح المشاريع" />
              <SkillBarAnimated percentage={92} label="الالتزام بالمواعيد" />
            </div>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-semibold hover:bg-gold-dark transition-colors duration-300"
            >
              اكتشف خدماتنا
            </a>
          </div>

          {/* Left side - Features Grid */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm card-hover border border-border/50"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 text-gold mb-4">
                    <feature.icon size={24} />
                  </div>
                  <h4 className="font-bold text-dark mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Decorative image placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden bg-gradient-to-bl from-gold/10 to-violet/10 p-8 text-center border border-border/30">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-bl from-gold to-violet flex items-center justify-center">
                <span className="text-white text-3xl font-bold">Z2O</span>
              </div>
              <p className="text-lg font-bold text-dark">من الصفر إلى الواحد</p>
              <p className="text-sm text-muted-foreground mt-1">شريكك نحو التميز الرقمي</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
