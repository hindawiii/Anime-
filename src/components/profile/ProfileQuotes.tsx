import React, { useState } from 'react';
import { Quote, Heart, Copy, Check, Tv, MapPin, Sparkles, Maximize2 } from 'lucide-react';
import { AnimeQuote, Language } from '../../types';
import { translations } from '../../translations';
import { INITIAL_QUOTES } from '../../data/profileData';
import { QuoteDetailModal } from './QuoteDetailModal';

interface ProfileQuotesProps {
  lang: Language;
  onPreviewImage?: (url: string, title: string) => void;
}

export const ProfileQuotes: React.FC<ProfileQuotesProps> = ({ lang, onPreviewImage }) => {
  const t = translations[lang].profileQuotes;
  const isAr = lang === 'ar';

  const [quotes, setQuotes] = useState<AnimeQuote[]>(INITIAL_QUOTES);
  const [likedMap, setLikedMap] = useState<{ [id: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<AnimeQuote | null>(null);

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMap((prev) => {
      const isLiked = !prev[id];
      setQuotes((currentQuotes) =>
        currentQuotes.map((q) =>
          q.id === id ? { ...q, likes: q.likes + (isLiked ? 1 : -1) } : q
        )
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const handleCopyQuote = (quoteText: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(quoteText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div id="profile-quotes-hub" className="w-full flex flex-col gap-5 pt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5C8A] to-[#7C5CFF] text-white flex items-center justify-center shadow-lg shadow-[#FF5C8A]/20">
            <Quote className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{t.title}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FFC94D]" />
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Quotes Cards Grid (Click to open full modal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotes.map((q) => {
          const quoteText = isAr ? q.quote : q.quoteEn;
          const speakerName = isAr ? q.speaker : q.speakerEn;
          const animeTitle = isAr ? q.anime : q.animeEn;
          const contextDesc = isAr ? q.contextOrRecipient : q.contextOrRecipientEn;
          const episodeText = isAr ? q.episode : q.episodeEn;
          const isLiked = !!likedMap[q.id];
          const isCopied = copiedId === q.id;

          return (
            <div
              key={q.id}
              onClick={() => setSelectedQuote(q)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedQuote(q)}
              title={isAr ? 'اضغط لعرض المقولة بحجم كامل' : 'Click to preview quote in full view'}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#13152C] to-[#0D0F21] border border-white/10 hover:border-[#FF5C8A]/60 p-5 sm:p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FF5C8A]/15 hover:-translate-y-1 flex flex-col justify-between gap-4 group cursor-pointer text-start"
            >
              {/* Background Ambient Glow & Giant Watermark Quote */}
              <div className="absolute -top-6 -end-6 w-24 h-24 rounded-full bg-[#FF5C8A]/10 blur-2xl pointer-events-none" />
              <Quote className="absolute top-4 end-4 w-16 h-16 text-white/[0.03] pointer-events-none rotate-12" />

              {/* Floating Expand Hint Icon */}
              <div className="absolute top-3.5 end-3.5 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#FF5C8A]/30 transition-all opacity-0 group-hover:opacity-100">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* 1. Quote Text */}
              <div className="relative z-10">
                <p className="text-sm sm:text-base font-semibold text-white/95 leading-relaxed italic font-['A_Banoo_Light','a_banoo_light',sans-serif]">
                  "{quoteText}"
                </p>
              </div>

              {/* 2. Quote Context Details (من القائل، الأنمي، لمن قيل، رقم الحلقة) */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col gap-2.5">
                
                {/* Speaker & Anime */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreviewImage?.(q.avatarUrl, speakerName);
                    }}
                    title="اضغط لمعاينة صورة الشخصية"
                    className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#FF5C8A]/40 shadow-md cursor-zoom-in group/speaker"
                  >
                    <img
                      src={q.avatarUrl}
                      alt={speakerName}
                      className="w-full h-full object-cover group-hover/speaker:scale-115 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate group-hover:text-[#FF5C8A] transition-colors">
                      {speakerName}
                    </span>
                    <span className="text-[11px] text-[#4DD8FF] font-medium block truncate">
                      {animeTitle}
                    </span>
                  </div>
                </div>

                {/* Recipient & Context Details */}
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 flex flex-col gap-1.5 text-[11px]">
                  {/* Context / Recipient */}
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5C8A] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      <strong className="text-white">{t.contextLabel}</strong> {contextDesc}
                    </span>
                  </div>

                  {/* Episode Number */}
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Tv className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      <strong className="text-white">{t.episodeLabel}</strong> {episodeText}
                    </span>
                  </div>
                </div>

                {/* Interactive Actions Footer (Like & Copy) */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={(e) => handleToggleLike(q.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                      isLiked
                        ? 'bg-[#FF476E]/20 text-[#FF476E] border border-[#FF476E]/40 font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#FF476E]' : ''}`}
                    />
                    <span>{q.likes}</span>
                  </button>

                  <button
                    onClick={(e) => handleCopyQuote(quoteText, q.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">
                          {t.copySuccess}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyBtn}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Immersive Full View Modal for the Quote */}
      <QuoteDetailModal
        quote={selectedQuote}
        isOpen={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        lang={lang}
        onPreviewImage={onPreviewImage}
      />
    </div>
  );
};
