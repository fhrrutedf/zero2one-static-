'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from './LanguageProvider';
import { X, ZoomIn, ChevronLeft, ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { TranslationKey } from '@/lib/i18n';
import { metaEvents } from '@/lib/meta-pixel';

type WorkCategory = 'all' | 'branding' | 'ads' | 'product' | 'development';

interface WorkItem {
  titleKey: TranslationKey;
  clientKey?: TranslationKey;
  catKey: TranslationKey;
  image: string;
  filter: WorkCategory;
}

const works: WorkItem[] = [
  // Portfolio items (development/branding/ads)
  {
    titleKey: 'portfolio_1_title',
    clientKey: 'portfolio_1_client',
    catKey: 'portfolio_1_cat',
    image: '/images/projects/doctor/poster-1.png',
    filter: 'development',
  },
  {
    titleKey: 'portfolio_2_title',
    clientKey: 'portfolio_2_client',
    catKey: 'portfolio_2_cat',
    image: '/images/projects/Logistics-Delivery-App/3.png',
    filter: 'development',
  },
  {
    titleKey: 'portfolio_3_title',
    clientKey: 'portfolio_3_client',
    catKey: 'portfolio_3_cat',
    image: '/images/projects/branding-coffee/poster.png',
    filter: 'branding',
  },
  {
    titleKey: 'portfolio_4_title',
    clientKey: 'portfolio_4_client',
    catKey: 'portfolio_4_cat',
    image: '/images/projects/osool/d-three.png',
    filter: 'ads',
  },
  // Results items (product/ads/branding)
  {
    titleKey: 'results_1_title',
    clientKey: 'results_1_client',
    catKey: 'results_1_cat',
    image: '/images/results/food/burger-stack.jpg',
    filter: 'product',
  },
  {
    titleKey: 'results_2_title',
    clientKey: 'results_2_client',
    catKey: 'results_2_cat',
    image: '/images/results/food/burger-hands.jpg',
    filter: 'product',
  },
  {
    titleKey: 'results_3_title',
    clientKey: 'results_3_client',
    catKey: 'results_3_cat',
    image: '/images/results/travel/damasquino-travel.jpg',
    filter: 'ads',
  },
  {
    titleKey: 'results_4_title',
    clientKey: 'results_4_client',
    catKey: 'results_4_cat',
    image: '/images/results/engineering/engtech-maintenance.jpg',
    filter: 'ads',
  },
  {
    titleKey: 'results_5_title',
    clientKey: 'results_5_client',
    catKey: 'results_5_cat',
    image: '/images/results/watches/quantum-watch.jpg',
    filter: 'product',
  },
  {
    titleKey: 'results_6_title',
    clientKey: 'results_6_client',
    catKey: 'results_6_cat',
    image: '/images/results/watches/quantum-watches-desert.jpg',
    filter: 'ads',
  },
  {
    titleKey: 'results_7_title',
    clientKey: 'results_7_client',
    catKey: 'results_7_cat',
    image: '/images/results/perfume/allure-azzaro.jpg',
    filter: 'branding',
  },
  {
    titleKey: 'results_8_title',
    clientKey: 'results_8_client',
    catKey: 'results_8_cat',
    image: '/images/results/media/milla-media.jpg',
    filter: 'ads',
  },
  {
    titleKey: 'results_9_title',
    clientKey: 'results_9_client',
    catKey: 'results_9_cat',
    image: '/images/results/engineering/engtech-elevator.jpg',
    filter: 'ads',
  },
  {
    titleKey: 'results_10_title',
    clientKey: 'results_10_client',
    catKey: 'results_10_cat',
    image: '/images/results/engineering/engtech-panel.jpg',
    filter: 'branding',
  },
];

const filterKeys: { key: WorkCategory; labelKey: TranslationKey }[] = [
  { key: 'all', labelKey: 'results_filter_all' },
  { key: 'development', labelKey: 'results_filter_dev' },
  { key: 'branding', labelKey: 'results_filter_branding' },
  { key: 'ads', labelKey: 'results_filter_ads' },
  { key: 'product', labelKey: 'results_filter_product' },
];

const PORTFOLIO_EXTERNAL_URL = 'https://online.fliphtml5.com/Moayaduae/jhac/';

export default function Results() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<WorkCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Fire Meta Pixel "ViewContent" event once when the Results
          // section scrolls into view — useful for retargeting visitors
          // who explored our portfolio.
          metaEvents.viewContent('Our Results Section');
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            if (!isNaN(idx)) {
              setVisibleCards((prev) => new Set(prev).add(idx));
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeFilter]);

  const filteredWorks = activeFilter === 'all'
    ? works
    : works.filter((w) => w.filter === activeFilter);

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
    setLightboxIndex((lightboxIndex + 1) % filteredWorks.length);
  }, [lightboxIndex, filteredWorks.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredWorks.length) % filteredWorks.length);
  }, [lightboxIndex, filteredWorks.length]);

  const openPortfolioViewer = useCallback(() => {
    setShowPortfolio(true);
    document.body.style.overflow = 'hidden';
    // Try opening directly in new tab as fallback for browsers with iframe issues
    try {
      const testIframe = document.createElement('iframe');
      testIframe.style.display = 'none';
      // If the browser restricts iframes heavily, open in new tab instead
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.open(PORTFOLIO_EXTERNAL_URL, '_blank', 'noopener,noreferrer');
        setShowPortfolio(false);
        document.body.style.overflow = '';
        return;
      }
    } catch {
      // fallback - open in new tab
      window.open(PORTFOLIO_EXTERNAL_URL, '_blank', 'noopener,noreferrer');
      setShowPortfolio(false);
      document.body.style.overflow = '';
      return;
    }
  }, []);

  const closePortfolioViewer = useCallback(() => {
    setShowPortfolio(false);
    document.body.style.overflow = '';
  }, []);

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

  useEffect(() => {
    if (!showPortfolio) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePortfolioViewer();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showPortfolio, closePortfolioViewer]);

  return (
    <section id="results" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 section-dark section-gold-accent-top relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - unified title */}
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-[#bc8934]/10 border border-[#bc8934]/20 text-[#d4a043] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('results_tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">{t('portfolio_title')}</h2>
          <div className="section-divider" />
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
          {filterKeys.map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setVisibleCards(new Set()); }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === f.key
                  ? 'bg-[#bc8934] text-white shadow-lg shadow-[#bc8934]/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {/* Works Grid - 2 cols mobile, 3 tablet, 5 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {filteredWorks.map((work, idx) => {
            const isCardVisible = visibleCards.has(idx);

            return (
              <div
                key={`${work.titleKey}-${activeFilter}`}
                ref={(el) => { cardsRef.current[idx] = el; }}
                data-idx={idx}
                className={`results-card group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-[#2a1a1b] border border-white/5 transition-all duration-500 hover:border-[#bc8934]/30 ${
                  isCardVisible ? 'animate-scale-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
                onClick={() => openLightbox(idx)}
              >
                {/* Image container */}
                <div className="relative aspect-square bg-[#1a1517]">
                  <Image
                    src={work.image}
                    alt={t(work.titleKey)}
                    fill
                    className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  {/* Zoom icon on hover */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#bc8934]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={14} className="text-white sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Title area - ALWAYS visible */}
                <div className="p-2.5 sm:p-3.5 border-t border-white/5">
                  {/* Category badge with animation */}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md bg-[#bc8934]/20 text-[#d4a043] text-[9px] sm:text-[10px] font-bold mb-1.5 transition-all duration-500 ${
                      isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    style={{ transitionDelay: `${idx * 60 + 200}ms` }}
                  >
                    {t(work.catKey)}
                  </span>
                  <h3 className="text-white text-[11px] sm:text-sm font-bold leading-tight mb-0.5 line-clamp-2">
                    {t(work.titleKey)}
                  </h3>
                  {work.clientKey && (
                    <p className="text-white/50 text-[9px] sm:text-xs font-semibold">
                      {t(work.clientKey)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* "باقي أعمالنا" Card - EXACT same style as other work cards */}
          {activeFilter === 'all' && (
            <div
              className={`results-card group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-[#2a1a1b] border border-white/5 transition-all duration-500 hover:border-[#bc8934]/30 ${
                visible ? 'animate-scale-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${filteredWorks.length * 60}ms` }}
              onClick={openPortfolioViewer}
            >
              {/* Image container - same bg as other cards */}
              <div className="relative aspect-square bg-[#1a1517]">
                {/* Placeholder image that looks like other project images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ExternalLink size={28} className="text-[#bc8934] mx-auto sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                {/* Zoom icon on hover - same as other cards */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#bc8934]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={14} className="text-white sm:w-4 sm:h-4" />
                </div>
              </div>

              {/* Title area - same as other cards */}
              <div className="p-2.5 sm:p-3.5 border-t border-white/5">
                <span className="inline-block px-2 py-0.5 rounded-md bg-[#bc8934]/20 text-[#d4a043] text-[9px] sm:text-[10px] font-bold mb-1.5">
                  {t('more_works_badge')}
                </span>
                <h3 className="text-white text-[11px] sm:text-sm font-bold leading-tight mb-0.5 line-clamp-2">
                  {t('more_works_title')}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#bc8934] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          <button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#bc8934] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[85vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={filteredWorks[lightboxIndex].image}
                alt={t(filteredWorks[lightboxIndex].titleKey)}
                fill
                className="object-contain"
                sizes="90vw"
                quality={100}
              />
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-md bg-[#bc8934]/20 text-[#d4a043] text-xs font-semibold mb-2">
                {t(filteredWorks[lightboxIndex].catKey)}
              </span>
              <h3 className="text-white text-lg sm:text-xl font-bold">{t(filteredWorks[lightboxIndex].titleKey)}</h3>
              {filteredWorks[lightboxIndex].clientKey && (
                <p className="text-white/60 text-sm mt-1 font-semibold">{t(filteredWorks[lightboxIndex].clientKey)}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Portfolio Viewer (iframe) - looks native, not like external site */}
      {showPortfolio && (
        <div className="fixed inset-0 z-50 bg-[#1a1517] flex flex-col">
          {/* Top bar with close button */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#1a1517] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-hq.png"
                alt={t('company_name') || 'ZERO TO ONE'}
                width={32}
                height={32}
                className="h-7 w-auto"
              />
              <span className="text-white font-bold text-sm">{t('more_works_title')}</span>
            </div>
            <button
              onClick={closePortfolioViewer}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors text-sm font-semibold"
            >
              <X size={16} />
              <span>{isRTL ? 'رجوع' : 'Back'}</span>
            </button>
          </div>

          {/* iframe - fills remaining space */}
          <div className="flex-1 relative">
            <iframe
              src={PORTFOLIO_EXTERNAL_URL}
              className="absolute inset-0 w-full h-full border-0"
              title={t('more_works_title')}
              allow="clipboard-write; fullscreen; autoplay"
              referrerPolicy="no-referrer-when-downgrade"
              loading="eager"
            />
            {/* Fallback button if iframe fails to load */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <a
                href={PORTFOLIO_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bc8934] text-white text-sm font-bold shadow-lg hover:bg-[#9a6e2a] transition-colors"
              >
                <ExternalLink size={16} />
                {isRTL ? 'فتح في نافذة جديدة' : 'Open in new tab'}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
