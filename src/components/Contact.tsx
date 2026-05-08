'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
    },
    {
      icon: Phone,
      label: 'الهاتف',
      value: '+966 53 030 7054',
      href: 'tel:+966530307054',
    },
    {
      icon: Mail,
      label: 'البريد الإلكتروني',
      value: 'Info@zero2one.sa',
      href: 'mailto:Info@zero2one.sa',
    },
    {
      icon: Clock,
      label: 'ساعات العمل',
      value: 'الأحد - الخميس: 9 ص - 6 م',
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: 'تويتر', href: '#' },
    { icon: Instagram, label: 'انستقرام', href: '#' },
    { icon: Linkedin, label: 'لينكدإن', href: '#' },
    { icon: Youtube, label: 'يوتيوب', href: '#' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet/3 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            تواصل معنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            ابدأ رحلتك <span className="text-gold">الرقمية</span> الآن
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك. فريقنا جاهز لمساعدتك
          </p>
          <div className="section-divider mt-6" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-card-bg rounded-2xl p-6 lg:p-8 border border-border/30">
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                  ✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-dark mb-2"
                    >
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="أدخل اسمك"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-dark mb-2"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-dark mb-2"
                    >
                      رقم الجوال
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="+966 5x xxx xxxx"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold text-dark mb-2"
                    >
                      الخدمة المطلوبة
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-foreground text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    >
                      <option value="">اختر الخدمة</option>
                      <option value="seo">تحسين محركات البحث</option>
                      <option value="web">تصميم وتطوير المواقع</option>
                      <option value="ads">إدارة الحملات الإعلانية</option>
                      <option value="brand">بناء الهوية التجارية</option>
                      <option value="content">تسويق المحتوى</option>
                      <option value="other">خدمة أخرى</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-dark mb-2"
                  >
                    رسالتك
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                    placeholder="أخبرنا عن مشروعك وأهدافك..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold text-white font-semibold hover:bg-gold-dark transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      أرسل رسالتك
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card-bg border border-border/30 card-hover"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-dark hover:text-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-dark">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-bl from-gold/5 to-violet/5 border border-border/30 mb-8">
              <div className="h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-gold mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">
                    الرياض، المملكة العربية السعودية
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    الموقع على الخريطة
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-dark mb-4">تابعنا على</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-card-bg border border-border/30 text-muted-foreground hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
