'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from './LanguageProvider';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { TranslationKey } from '@/lib/i18n';

type ResultCategory = 'all' | 'branding' | 'ads' | 'product';

interface ResultItem {
  titleKey: TranslationKey;
  clientKey: TranslationKey;
  catKey: TranslationKey;
  image: string;
  filter: ResultCategory;
  span: 'normal' | 'wide' | 'tall';
}

const results: ResultItem[] = [
  {
    titleKey: 'results_1_title',
    clientKey: 'results_1_client',
    catKey: 'results_1_cat',
    image: '/images/results/food/burger-stack.jpg',
    filter: 'product',
    span: 'tall',
  },
  {
    titleKey: 'results_2_title',
    clientKey: 'results_2_client',
    catKey: 'results_2_cat',
    image: '/images/results/food/burger-hands.jpg',
    filter: 'product',
    span: 'normal',
  },
  {
    titleKey: 'results_3_title',
    clientKey: 'results_3_client',
    catKey: 'results_3_cat',
    image: '/images/results/travel/damasquino-travel.jpg',
    filter: 'ads',
    span: 'wide',
  },
  {
    titleKey: 'results_4_title',
    clientKey: 'results_4_client',
    catKey: 'results_4_cat',
    image: '/images/results/engineering/engtech-maintenance.jpg',
    filter: 'ads',
    span: 'normal',
  },
  {
    titleKey: 'results_5_title',
    clientKey: 'results_5_client',
    catKey: 'results_5_cat',
    image: '/images/results/watches/quantum-watch.jpg',
    filter: 'product',
    span: 'normal',
  },
  {
    titleKey: 'results_6_title',
    clientKey: 'results_6_client',
    catKey: 'results_6_cat',
    image: '/images/results/watches/quantum-watches-desert.jpg',
    filter: 'ads',
    span: 'wide',
  },
  {
    titleKey: 'results_7_title',
    clientKey: 'results_7_client',
    catKey: 'results_7_cat',
    image: '/images/results/perfume/allure-azzaro.jpg',
    filter: 'branding',
    span: 'normal',
  },
  {
    titleKey: 'results_8_title',
    clientKey: 'results_8_client',
    catKey: 'results_8_cat',
    image: '/images/results/media/milla-media.jpg',
    filter: 'ads',
    span: 'normal',
  },
  {
    titleKey: 'results_9_title',
    clientKey: 'results_9_client',
    catKey: 'results_9_cat',
    image: '/images/results/engineering/engtech-elevator.jpg',
    filter: 'ads',
    span: 'normal',
  },
  {
    titleKey: 'results_10_title',
    clientKey: 'results_10_client',
    catKey: 'results_10_cat',
    image: '/images/results/engineering/engtech-panel.jpg',
    filter: 'branding',
    span: 'normal',
  },
];

const filterKeys: { key: ResultCategory; labelKey: TranslationKey }[] = [
  { key: 'all', labelKey: 'results_filter_all' },
  { key: 'branding', labelKey: 'results_filter_branding' },
  { key: 'ads', labelKey: 'results_filter_ads' },
  { key: 'product', labelKey: 'results_filter_product' },
];

export default function Results() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ResultCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredResults = activeFilter === 'all'
    ? results
    : results.filter((r) => r.filter === activeFilter);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredResults.length);
  }, [lightboxIndex, filteredResults.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredResults.length) % filteredResults.length);
  }, [lightboxIndex, filteredResults.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section id="results" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-dark section-gold-accent-top relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#bc8934]/10 border border-[#bc8934]/20 text-[#d4a043] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('results_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">{t('results_title')}</h2>
          <div className="section-divider mb-4 sm:mb-6" />
          <p className="leading-relaxed text-sm sm:text-base text-white/60">{t('results_subtitle')}</p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
          {filterKeys.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === f.key
                  ? 'bg-[#bc8934] text-white shadow-lg shadow-[#bc8934]/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredResults.map((result, idx) => (
            <div
              key={`${result.titleKey}-${activeFilter}`}
              className={`results-card group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer ${
                result.span === 'wide' ? 'sm:col-span-2' : ''
              } ${result.span === 'tall' ? 'sm:row-span-2' : ''} ${
                visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${idx * 80}ms` }}
              onClick={() => openLightbox(idx)}
            >
              <div className={`relative bg-[#2a1a1b] ${result.span === 'tall' ? 'aspect-[3/4]' : result.span === 'wide' ? 'aspect-[2/1]' : 'aspect-[4/3]'}`}>
                <Image
                  src={result.image}
                  alt={t(result.titleKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={
                    result.span === 'wide'
                      ? '(max-width: 640px) 100vw, 50vw'
                      : result.span === 'tall'
                      ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                  }
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Zoom icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#bc8934]/80 flex items-center justify-center backdrop-blur-sm">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#bc8934]/20 text-[#d4a043] text-[10px] sm:text-xs font-medium mb-2">
                    {t(result.catKey)}
                  </span>
                  <h3 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-1">{t(result.titleKey)}</h3>
                  <p className="text-white/50 text-[10px] sm:text-xs">{t(result.clientKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#bc8934] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Next button */}
          <button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#bc8934] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Image container */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={filteredResults[lightboxIndex].image}
                alt={t(filteredResults[lightboxIndex].titleKey)}
                fill
                className="object-contain"
                sizes="90vw"
                quality={100}
              />
            </div>
            {/* Image info */}
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#bc8934]/20 text-[#d4a043] text-xs font-medium mb-2">
                {t(filteredResults[lightboxIndex].catKey)}
              </span>
              <h3 className="text-white text-lg sm:text-xl font-bold">{t(filteredResults[lightboxIndex].titleKey)}</h3>
              <p className="text-white/50 text-sm mt-1">{t(filteredResults[lightboxIndex].clientKey)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
