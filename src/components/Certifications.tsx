'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import Image from 'next/image';
import { ShieldCheck, ExternalLink, BadgeCheck, Award } from 'lucide-react';
import { metaEvents } from '@/lib/meta-pixel';

/**
 * Certifications section.
 *
 * Sits between Contact and Footer. The aim is a *quiet, trust-building*
 * strip — not a marketing section. Design constraints:
 *
 *   - Light, neutral background (does not visually compete with Hero or Contact).
 *   - Single certificate card so the section stays compact.
 *   - "Verify on Maroof" CTA goes to the official Saudi Maroof listing so
 *     visitors can independently confirm the certificate.
 *   - Hover lifts the card subtly; no aggressive animations.
 *
 * When the section scrolls into view we also fire a Meta Pixel
 * `ViewContent` event so the client can retarget visitors who showed
 * interest in the company's credibility.
 */
export default function Certifications() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          metaEvents.viewContent('Certifications Section');
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleVerifyClick = () => {
    metaEvents.contact('maroof_verify_link');
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-24 section-light-alt section-gold-accent-top"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 ${
            visible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 text-[#bc8934] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            <ShieldCheck size={14} className="sm:w-4 sm:h-4" />
            {t('cert_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {t('cert_title')}
          </h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="text-foreground/75 leading-relaxed text-sm sm:text-base">
            {t('cert_subtitle')}
          </p>
        </div>

        {/* Certificate card */}
        <div
          className={`max-w-4xl mx-auto ${
            visible ? (isRTL ? 'animate-fade-in-right' : 'animate-fade-in-left') : 'opacity-0'
          }`}
        >
          <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 sm:gap-8 items-center bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] border border-[#bc8934]/15 hover:shadow-[0_12px_50px_-12px_rgba(188,137,52,0.25)] transition-all duration-500 hover:-translate-y-1">
            {/* Decorative gold corner accents */}
            <span className="absolute top-3 end-3 w-6 h-6 border-t-2 border-e-2 border-[#bc8934]/40 rounded-tr-lg" />
            <span className="absolute bottom-3 start-3 w-6 h-6 border-b-2 border-s-2 border-[#bc8934]/40 rounded-bl-lg" />

            {/* Certificate image with frame */}
            <div className="relative mx-auto md:mx-0 shrink-0">
              <div className="relative w-[180px] sm:w-[200px] md:w-[220px] aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-[#f9f6f0] to-[#ede9e4] p-3 shadow-inner border border-[#bc8934]/20">
                <Image
                  src="/images/certificates/maroof-certificate.png"
                  alt="شهادة معروف - ZERO TO ONE"
                  fill
                  sizes="(max-width: 768px) 180px, 220px"
                  className="object-contain p-2"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              {/* Verified badge — floating */}
              <div className="absolute -bottom-2 -end-2 sm:-end-3 bg-gradient-to-br from-[#bc8934] to-[#9a6e2a] text-white rounded-full p-1.5 sm:p-2 shadow-lg shadow-[#bc8934]/30 border-2 border-white">
                <BadgeCheck size={18} className="sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Certificate details */}
            <div className="text-center md:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a7d5c]/10 text-[#0a7d5c] text-xs font-bold mb-3">
                <Award size={12} />
                {t('cert_badge_trust')}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {t('cert_maroof_label')}
              </h3>

              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 max-w-md mx-auto md:mx-0">
                {t('cert_maroof_desc')}
              </p>

              {/* Certificate number */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f5f3f0] border border-[#bc8934]/20 mb-5">
                <span className="text-xs sm:text-sm font-semibold text-foreground/60">
                  {t('cert_maroof_number')}:
                </span>
                <span
                  className="text-base sm:text-lg font-bold text-[#bc8934] tracking-wider"
                  dir="ltr"
                >
                  {t('cert_maroof_number_value')}
                </span>
              </div>

              {/* Verify CTA */}
              <div className="flex justify-center md:justify-start">
                <a
                  href="https://maroof.sa/373430"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleVerifyClick}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#bc8934] text-white font-semibold text-sm sm:text-base hover:bg-[#9a6e2a] transition-all duration-300 shadow-md shadow-[#bc8934]/25 hover:shadow-lg hover:shadow-[#bc8934]/40 hover:-translate-y-0.5 min-h-[44px]"
                >
                  <ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>{t('cert_verify_link')}</span>
                  <ExternalLink size={14} className="opacity-70 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Trust strip below the card */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-foreground/55 font-semibold">
            <div className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a7d5c]" />
              {isRTL ? 'منشأة سعودية مسجلة' : 'Registered Saudi establishment'}
            </div>
            <div className="hidden sm:block w-px h-4 bg-foreground/15" />
            <div className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bc8934]" />
              {isRTL ? 'موثقة رسمياً' : 'Officially verified'}
            </div>
            <div className="hidden sm:block w-px h-4 bg-foreground/15" />
            <div className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              {isRTL ? 'قابلة للتحقق الحكومي' : 'Government-verifiable'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
