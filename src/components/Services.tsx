'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Search,
  Globe,
  Megaphone,
  Palette,
  FileText,
  ArrowLeft,
} from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'تحسين محركات البحث',
    titleEn: 'SEO',
    description:
      'نضمن ظهور موقعك في النتائج الأولى لمحركات البحث من خلال استراتيجيات SEO متقدمة وموثوقة.',
    subServices: [
      'تحليل الكلمات المفتاحية',
      'تحسين المحتوى الداخلي',
      'بناء الروابط الخلفية',
      'تحليل الأداء والتقارير',
    ],
    color: 'from-amber-500/10 to-orange-500/10',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Globe,
    title: 'تصميم وتطوير المواقع',
    titleEn: 'Web Development',
    description:
      'نصمم ونطور مواقع إلكترونية احترافية تعكس هوية علامتك التجارية وتوفر تجربة مستخدم استثنائية.',
    subServices: [
      'تصميم واجهات المستخدم UI/UX',
      'تطوير المتاجر الإلكترونية',
      'مواقع الشركات والخدمات',
      'صفحات الهبوط الاحترافية',
    ],
    color: 'from-violet-500/10 to-purple-500/10',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Megaphone,
    title: 'إدارة الحملات الإعلانية',
    titleEn: 'Ad Campaigns',
    description:
      'نصمم وندير حملات إعلانية فعالة على جميع المنصات الرقمية لتحقيق أقصى عائد على الاستثمار.',
    subServices: [
      'إعلانات جوجل Google Ads',
      'إعلانات السوشيال ميديا',
      'إعلانات العرض والتطبيقات',
      'تحسين العائد على الاستثمار',
    ],
    color: 'from-emerald-500/10 to-green-500/10',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Palette,
    title: 'بناء الهوية التجارية',
    titleEn: 'Brand Identity',
    description:
      'نبني هوية تجارية متكاملة وقوية تميز علامتك عن المنافسين وتترك انطباعاً لا يُنسى.',
    subServices: [
      'تصميم الشعار والهوية البصرية',
      'دليل الهوية التجارية',
      'تصميم المطبوعات',
      'تصميمات السوشيال ميديا',
    ],
    color: 'from-rose-500/10 to-pink-500/10',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: FileText,
    title: 'تسويق المحتوى',
    titleEn: 'Content Marketing',
    description:
      'نصنع محتوى جذاب ومؤثر يخاطب جمهورك المستهدف ويحقق أهدافك التسويقية بفعالية.',
    subServices: [
      'كتابة المحتوى التسويقي',
      'إدارة المدونات',
      'إنتاج الفيديو والمحتوى المرئي',
      'استراتيجية المحتوى',
    ],
    color: 'from-sky-500/10 to-blue-500/10',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
];

export default function Services() {
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
      id="services"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-violet/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            خدماتنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            حلول <span className="text-gold">رقمية</span> متكاملة
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            نقدم مجموعة شاملة من الخدمات الرقمية المصممة خصيصاً لتحقيق نمو مستدام لعلامتك التجارية
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-card-bg rounded-2xl p-6 lg:p-8 card-hover border border-border/30 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Icon */}
              <div
                className={`service-icon ${service.iconBg} mb-6`}
              >
                <service.icon size={32} className={service.iconColor} />
              </div>

              {/* Title */}
              <div className="mb-3">
                <h3 className="text-xl font-bold text-dark mb-1">
                  {service.title}
                </h3>
                <span className="text-xs font-medium text-muted-foreground">
                  {service.titleEn}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Sub-services */}
              <ul className="space-y-2.5 mb-6">
                {service.subServices.map((sub, subIndex) => (
                  <li key={subIndex} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-foreground/80">{sub}</span>
                  </li>
                ))}
              </ul>

              {/* Link */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm group-hover:gap-3 transition-all duration-300"
              >
                اطلب الخدمة
                <ArrowLeft size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
