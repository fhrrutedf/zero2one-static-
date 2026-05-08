'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';

const projects = [
  {
    title: 'متجر الأناقة',
    category: 'تصميم متجر إلكتروني',
    description: 'متجر إلكتروني متكامل لبيع الملابس الراقية بتصميم عصري',
    gradient: 'from-amber-500 to-orange-600',
    icon: '🛍️',
  },
  {
    title: 'منصة تعليمي',
    category: 'تطوير موقع',
    description: 'منصة تعليمية تفاعلية مع نظام إدارة دورات متكامل',
    gradient: 'from-violet-500 to-purple-600',
    icon: '📚',
  },
  {
    title: 'مطاعم الذواقة',
    category: 'هوية تجارية + تسويق',
    description: 'بناء هوية تجارية شاملة وحملة تسويقية ناجحة لسلسلة مطاعم',
    gradient: 'from-emerald-500 to-teal-600',
    icon: '🍽️',
  },
  {
    title: 'تطبيق صحتي',
    category: 'حملات إعلانية',
    description: 'حملة إعلانية رقمية شاملة لتطبيق صحي مع تحقيق ROI متميز',
    gradient: 'from-rose-500 to-pink-600',
    icon: '💊',
  },
];

export default function Portfolio() {
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
      id="portfolio"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-light-bg relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            أعمالنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            مشاريع <span className="text-gold">نفتخر</span> بها
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            نماذج من أعمالنا التي ساهمت في نمو علامات تجارية وتحقيق أهدافها الرقمية
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`portfolio-card group relative rounded-2xl overflow-hidden card-hover shadow-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Project Image Placeholder */}
              <div
                className={`portfolio-image relative h-64 sm:h-72 lg:h-80 bg-gradient-to-bl ${project.gradient} flex items-center justify-center`}
              >
                <span className="text-6xl sm:text-7xl opacity-50 group-hover:opacity-30 transition-opacity duration-300">
                  {project.icon}
                </span>

                {/* Overlay */}
                <div className="portfolio-overlay absolute inset-0 bg-dark/70 flex items-center justify-center">
                  <div className="flex gap-3">
                    <button
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold transition-colors duration-300"
                      aria-label="عرض المشروع"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold transition-colors duration-300"
                      aria-label="رابط المشروع"
                    >
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-white p-6">
                <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-dark mt-3 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
