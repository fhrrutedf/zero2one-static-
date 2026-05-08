'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Star, Crown, Zap, Globe, Search, Share2 } from 'lucide-react';

const pricingCategories = [
  {
    id: 'comprehensive',
    label: 'باقات شاملة',
    icon: Crown,
    packages: [
      {
        name: 'انطلاق',
        price: '2,950',
        unit: 'SAR',
        period: 'مرة واحدة',
        popular: false,
        features: [
          'تصميم الهوية البصرية الأساسية',
          'تصميم حسابات السوشيال ميديا',
          'إنشاء حسابات على المنصات',
          'خطة تسويقية أولية',
          'تصميم 10 بوستات سوشيال ميديا',
        ],
      },
      {
        name: 'نمو',
        price: '3,850',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: true,
        setupFee: 'رسوم إعداد: 6,950 SAR',
        features: [
          'جميع مزايا باقة انطلاق',
          'إدارة السوشيال ميديا',
          'حملات إعلانية مدفوعة',
          'تقارير شهرية مفصلة',
          'تصميم 20 بوست شهرياً',
          'تحسين محركات البحث الأساسي',
          'دعم فني مستمر',
        ],
      },
      {
        name: 'ريادة',
        price: '15,000',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: false,
        features: [
          'جميع مزايا باقة نمو',
          'استراتيجية تسويقية متقدمة',
          'إدارة حملات شاملة',
          'تحسين SEO متقدم',
          'تسويق المحتوى المتقدم',
          'تصميمات غير محدودة',
          'مدير حساب مخصص',
          'تقارير أسبوعية',
        ],
      },
    ],
  },
  {
    id: 'web',
    label: 'تصميم المواقع',
    icon: Globe,
    packages: [
      {
        name: 'صفحة هبوط',
        price: '1,500',
        unit: 'SAR',
        period: 'مرة واحدة',
        popular: false,
        features: [
          'تصميم صفحة هبوط احترافية',
          'متجاوبة مع جميع الأجهزة',
          'تحسين السرعة والأداء',
          'نموذج تواصل مدمج',
        ],
      },
      {
        name: 'موقع شركة',
        price: '3,500',
        unit: 'SAR',
        period: 'مرة واحدة',
        popular: true,
        features: [
          'تصميم موقع متعدد الصفحات',
          'لوحة تحكم سهلة الاستخدام',
          'تحسين SEO مبدئي',
          'متجاوب مع الجوال',
          'ربط بمنصات التحليل',
          'دعم فني لمدة شهر',
        ],
      },
      {
        name: 'متجر إلكتروني',
        price: '2,500 - 12,000',
        unit: 'SAR',
        period: 'حسب المتطلبات',
        popular: false,
        features: [
          'تصميم متجر احترافي',
          'نظام إدارة المنتجات',
          'بوابات دفع متعددة',
          'نظام تتبع الطلبات',
          'تحسين تجربة المستخدم',
          'دعم فني مستمر',
        ],
      },
    ],
  },
  {
    id: 'seo',
    label: 'تحسين محركات البحث',
    icon: Search,
    packages: [
      {
        name: 'SEO محلي',
        price: '1,800',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: false,
        features: [
          'تحسين الظهور المحلي',
          'تحسين Google My Business',
          'بناء روابط محلية',
          'تقارير شهرية',
        ],
      },
      {
        name: 'SEO شركات',
        price: '3,800',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: true,
        features: [
          'تحليل شامل للموقع',
          'تحسين المحتوى والكلمات',
          'بناء روابط خلفية',
          'تحسين تقني للموقع',
          'تقارير أسبوعية',
          'متابعة المنافسين',
        ],
      },
      {
        name: 'SEO متاجر',
        price: '6,500',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: false,
        features: [
          'تحسين المنتجات والتصنيفات',
          'بناء روابط قوية',
          'تحسين سرعة الموقع',
          'استراتيجية محتوى متقدمة',
          'تحليل المنافسة',
          'تقارير مفصلة أسبوعية',
          'دعم فني مخصص',
        ],
      },
    ],
  },
  {
    id: 'social',
    label: 'السوشيال ميديا',
    icon: Share2,
    packages: [
      {
        name: 'أساسي',
        price: '1,450',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: false,
        features: [
          'إدارة 3 منصات',
          '12 بوست شهرياً',
          'تصميمات بسيطة',
          'تقرير شهري',
        ],
      },
      {
        name: 'احترافي',
        price: '2,900',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: true,
        features: [
          'إدارة 5 منصات',
          '20 بوست شهرياً',
          'تصميمات احترافية',
          'إدارة الحملات الإعلانية',
          'تقارير أسبوعية',
          'الرد على التعليقات والرسائل',
        ],
      },
      {
        name: 'متقدم',
        price: '5,100',
        unit: 'SAR',
        period: '/ شهرياً',
        popular: false,
        features: [
          'إدارة جميع المنصات',
          '30 بوست شهرياً',
          'تصميمات + فيديوهات',
          'استراتيجية محتوى متقدمة',
          'حملات إعلانية شاملة',
          'تقارير مفصلة أسبوعية',
          'مدير حساب مخصص',
        ],
      },
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('comprehensive');

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

  const activeCategory = pricingCategories.find((cat) => cat.id === activeTab);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            الباقات والأسعار
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            باقات <span className="text-gold">مرنة</span> تناسب احتياجاتك
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            اختر الباقة المناسبة لأهدافك وميزانيتك، مع إمكانية التخصيص حسب متطلباتك
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {pricingCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-gold text-white shadow-lg shadow-gold/25'
                  : 'bg-card-bg text-foreground hover:bg-muted'
              }`}
            >
              <category.icon size={18} />
              {category.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activeCategory?.packages.map((pkg, index) => (
            <div
              key={`${activeTab}-${index}`}
              className={`relative rounded-2xl overflow-hidden card-hover transition-all duration-500 ${
                pkg.popular ? 'pricing-popular' : 'bg-card-bg border border-border/30'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-white text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  الأكثر طلباً
                </div>
              )}

              <div className="p-6 lg:p-8">
                {/* Package Name */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap
                      size={20}
                      className={pkg.popular ? 'text-gold' : 'text-gold'}
                    />
                    <h3
                      className={`text-xl font-bold ${
                        pkg.popular ? 'text-white' : 'text-dark'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-bold ${
                        pkg.popular ? 'text-gold-light' : 'text-gold'
                      }`}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        pkg.popular ? 'text-white/60' : 'text-muted-foreground'
                      }`}
                    >
                      {pkg.unit}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      pkg.popular ? 'text-white/40' : 'text-muted-foreground'
                    }`}
                  >
                    {pkg.period}
                  </span>
                  {pkg.setupFee && (
                    <p className="text-xs text-gold mt-1">{pkg.setupFee}</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check
                        size={18}
                        className={`flex-shrink-0 mt-0.5 ${
                          pkg.popular ? 'text-gold' : 'text-gold'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          pkg.popular ? 'text-white/80' : 'text-foreground/80'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gold text-white hover:bg-gold-dark'
                      : 'bg-dark text-white hover:bg-dark-light'
                  }`}
                >
                  اطلب الباقة
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
