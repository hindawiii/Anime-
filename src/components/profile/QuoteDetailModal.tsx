import React, { useEffect, useState } from 'react';
import { X, Quote, Heart, Copy, Check, Share2, Sparkles, Tv, MapPin, ZoomIn } from 'lucide-react';
import { AnimeQuote, Language } from '../../types';
import { translations } from '../../translations';

interface QuoteDetailModalProps {
  quote: AnimeQuote | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onPreviewImage?: (url: string, title: string) => void;
}

export const QuoteDetailModal: React.FC<QuoteDetailModalProps> = ({
  quote,
  isOpen,
  onClose,
  lang,
  onPreviewImage,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (quote) {
      setLikesCount(quote.likes);
      setLiked(false);
      setCopied(false);
    }
  }, [quote]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !quote) return null;

  const t = translations[lang].quoteModal;
  const isAr = lang === 'ar';

  const quoteText = isAr ? quote.quote : quote.quoteEn;
  const speakerName = isAr ? quote.speaker : quote.speakerEn;
  const animeTitle = isAr ? quote.anime : quote.animeEn;
  const contextDesc = isAr ? quote.context : quote.contextEn;
  const episodeText = isAr ? quote.episode : quote.episodeEn;

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quoteText}" - ${speakerName} (${animeTitle})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#161938] via-[#0F1126] to-[#090A15] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Neon Backdrops */}
        <div className="absolute -top-24 -end-24 w-60 h-60 rounded-full bg-[#FF5C8A]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-60 h-60 rounded-full bg-[#7C5CFF]/20 blur-3xl pointer-events-none" />
        
        {/* Giant Watermark Background Quote */}
        <Quote className="absolute top-6 end-6 w-36 h-36 text-white/[0.03] pointer-events-none rotate-12" />

        {/* Top Header Bar with Safe Gap to Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5 text-white font-bold text-sm sm:text-base pe-8">
            <div className="w-8 h-8 rounded-xl bg-[#FF5C8A]/20 text-[#FF5C8A] border border-[#FF5C8A]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="truncate">{t.title}</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/80 text-white flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Speaker Card & Anime Badge */}
        <div className="flex items-center gap-4 py-5 relative z-10">
          <div
            onClick={() => onPreviewImage?.(quote.avatarUrl, speakerName)}
            title="معاينة صورة القائل"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[#FF5C8A]/60 shadow-[0_8px_25px_rgba(255,92,138,0.3)] cursor-zoom-in group/speaker"
          >
            <img
              src={quote.avatarUrl}
              alt={speakerName}
              className="w-full h-full object-cover group-hover/speaker:scale-110 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/speaker:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <ZoomIn className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-[#FF5C8A] tracking-wider uppercase">
              {t.spokenBy}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white truncate mt-0.5 font-['A_Banoo_Light','a_banoo_light',sans-serif]">
              {speakerName}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#4DD8FF]/10 text-[#4DD8FF] border border-[#4DD8FF]/20 text-xs font-semibold mt-1">
              <span>{animeTitle}</span>
            </div>
          </div>
        </div>

        {/* Immersive Giant Quote Display */}
        <div className="relative z-10 my-3 p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner">
          <Quote className="w-6 h-6 text-[#FFC94D] mb-2" />
          <p className="text-base sm:text-xl font-bold text-white leading-relaxed italic font-['A_Banoo_Light','a_banoo_light',sans-serif]">
            "{quoteText}"
          </p>
        </div>

        {/* Deep Context & Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 relative z-10 text-xs">
          {/* Context */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#FF5C8A] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-400 block">{t.context}</span>
              <p className="text-slate-200 mt-0.5 leading-snug">{contextDesc}</p>
            </div>
          </div>

          {/* Episode */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
            <Tv className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-400 block">{t.episode}</span>
              <p className="text-amber-300 font-semibold mt-0.5">{episodeText}</p>
            </div>
          </div>
        </div>

        {/* Action Controls Footer (Copy, Like, Close) */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all font-semibold text-xs ${
                liked
                  ? 'bg-[#FF476E]/20 text-[#FF476E] border border-[#FF476E]/40 shadow-lg shadow-[#FF476E]/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-[#FF476E]' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all font-semibold text-xs ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copySuccess : (isAr ? 'نسخ المقولة' : 'Copy Quote')}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#7C5CFF] hover:bg-[#6847FA] text-white text-xs font-bold transition-all shadow-lg active:scale-95"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
