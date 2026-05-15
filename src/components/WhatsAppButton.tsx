'use client';

import { MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/966530307054"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-6 end-4 sm:end-6 z-50 group"
      aria-label={t('whatsapp_tooltip')}
    >
      <span className="absolute bottom-full start-0 mb-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white bg-brand rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {t('whatsapp_tooltip')}
      </span>
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300 animate-pulse-green min-w-[48px] min-h-[48px]">
        <MessageCircle size={24} className="sm:w-7 sm:h-7" fill="white" />
      </div>
    </a>
  );
}
