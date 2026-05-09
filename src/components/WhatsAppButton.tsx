'use client';

import { MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/966500000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label={t('whatsapp_tooltip')}
    >
      {/* Tooltip */}
      <span className="absolute bottom-full left-0 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {t('whatsapp_tooltip')}
      </span>
      {/* Button */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300 animate-pulse-gold-green">
        <MessageCircle size={28} fill="white" />
      </div>
    </a>
  );
}
