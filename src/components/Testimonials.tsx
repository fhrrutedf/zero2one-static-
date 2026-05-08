'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'أحمد الشمري',
    company: 'مؤسس متجر الأناقة',
    text: 'تعاملنا مع فريق من الصفر إلى الواحد كان نقطة تحول حقيقية في أعمالنا. زيادة في المبيعات بنسبة 150% خلال 3 أشهر فقط! فريق محترف ومتفاني في العمل.',
    rating: 5,
    initials: 'أش',
  },
  {
    name: 'سارة العتيبي',
    company: 'مديرة التسويق - تقنية بلس',
    text: 'الحملات الإعلانية التي أداها الفريق حققت نتائج تفوق توقعاتنا. عائد الاستثمار تضاعف 3 مرات وعدد العملاء المحتملين ارتفع بشكل ملحوظ. شراكة نعتز بها.',
    rating: 5,
    initials: 'سع',
  },
  {
    name: 'محمد القحطاني',
    company: 'صاحب مطاعم الذواقة',
    text: 'من بناء الهوية التجارية إلى إدارة السوشيال ميديا، كل شيء كان على مستوى عالٍ من الاحترافية. فرعنا الجديد حقق أرباحاً من الأسبوع الأول بفضل التسويق المذهل.',
    rating: 5,
    initials: 'مق',
  },
];

export default function Testimonials() {
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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-light-bg relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet/3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            آراء العملاء
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            ماذا يقول <span className="text-gold">عملاؤنا</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            ثقة عملائنا هي أكبر إنجازاتنا. إليك بعض آرائهم في تجربتهم معنا
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 lg:p-8 shadow-sm card-hover border border-border/30 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote size={32} className="text-gold/30" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-gold"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-bl from-gold to-violet flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
