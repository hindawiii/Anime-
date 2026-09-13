import React from 'react';
import { X, Star, Calendar, Tv, ExternalLink, ShieldCheck, PlayCircle, Film, Award } from 'lucide-react';
import { AnimeItem, Language } from '../../types';
import { translations } from '../../translations';

interface AnimeDetailModalProps {
  anime: AnimeItem | null;
  onClose: () => void;
  lang: Language;
  onPreviewImage?: (url: string, title: string) => void;
}

export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({
  anime,
  onClose,
  lang,
  onPreviewImage,
}) => {
  if (!anime) return null;

  const t = translations[lang].animeModal;
  const isAr = lang === 'ar';
  const title = isAr ? anime.title : anime.titleEn;
  const synopsis = isAr ? anime.synopsis : anime.synopsisEn;
  const genres = isAr ? anime.genres : anime.genresEn;

  return (
    <div
      id="anime-full-screen-modal"
      className="fixed inset-0 z-50 bg-[#070810] text-slate-100 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Giant Hero Banner with Backdrop Gradient (Click to preview banner) */}
      <div
        onClick={() => onPreviewImage?.(anime.banner, `${title} - Banner`)}
        title="اضغط لمعاينة البانر بالحجم الكامل"
        className="relative w-full h-64 sm:h-96 overflow-hidden cursor-zoom-in group/banner"
      >
        <img
          src={anime.banner}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-75 scale-105 group-hover/banner:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070810] via-[#070810]/70 to-black/40 pointer-events-none" />

        {/* Floating Close Button (Top-End corner) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="fixed top-4 end-4 sm:top-6 sm:end-6 z-50 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/70 hover:bg-[#FF476E] text-white backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all shadow-2xl active:scale-95 group"
          title={t.close}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Watermark Crest */}
        <div className="absolute top-6 start-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
          <Award className="w-4 h-4 text-[#FFC94D]" />
          <span className="text-xs font-bold text-white tracking-wider">
            OTAKU SAMA OFFICIAL ARCHIVE
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-24 sm:-mt-36 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
          
          {/* Anime Poster Card (Click to preview poster) */}
          <div
            onClick={() => onPreviewImage?.(anime.poster, `${title} - Poster`)}
            title="اضغط لمعاينة البوستر بالحجم الكامل"
            className="w-44 sm:w-56 md:w-64 shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_15px_45px_rgba(0,0,0,0.8)] relative group cursor-zoom-in"
          >
            <img
              src={anime.poster}
              alt={title}
              className="w-full h-auto object-cover aspect-[2/3] group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-bold border border-white/20">
                معاينة الصورة
              </div>
            </div>
            <div className="absolute top-3 start-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[#FFC94D] border border-white/20 font-mono text-xs font-bold flex items-center gap-1 shadow-lg pointer-events-none">
              <Star className="w-3.5 h-3.5 fill-[#FFC94D]" />
              <span>{anime.score}</span>
            </div>
          </div>

          {/* Anime Metadata & Description */}
          <div className="flex-1 w-full text-start">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {genres.map((g, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#7C5CFF]/15 text-[#9E86FF] border border-[#7C5CFF]/30"
                >
                  {g}
                </span>
              ))}
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {t.verifiedNotice ? 'مرخص قانونياً' : 'Licensed'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight font-['A_Banoo_Light','a_banoo_light',sans-serif]">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              {isAr ? anime.titleEn : anime.title}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#4DD8FF]" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.year}</span>
                  <span className="text-xs font-bold text-white">{anime.year}</span>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                <Film className="w-4 h-4 text-[#FF5C8A]" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.studio}</span>
                  <span className="text-xs font-bold text-white">{anime.studio}</span>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Tv className="w-4 h-4 text-[#FFC94D]" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.episodes}</span>
                  <span className="text-xs font-bold text-white">
                    {anime.watchedEpisodes !== undefined ? `${anime.watchedEpisodes} / ` : ''}
                    {anime.episodesCount} حلقة
                  </span>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mt-4">
              <h2 className="text-sm font-bold text-[#FF5C8A] uppercase tracking-wider mb-2">
                {t.synopsis}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                {synopsis}
              </p>
            </div>
          </div>
        </div>

        {/* Official & Trusted Streaming Platforms Section */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF476E] to-[#7C5CFF] text-white flex items-center justify-center shadow-lg">
              <PlayCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {t.officialSources}
              </h2>
              <p className="text-xs text-slate-400">
                {t.verifiedNotice}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-4">
            {anime.officialSources.map((src, index) => (
              <a
                key={index}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-[#121429] hover:bg-[#181A38] border border-white/10 hover:border-[#7C5CFF]/60 p-4 transition-all duration-300 flex items-center justify-between gap-3 shadow-lg hover:shadow-[#7C5CFF]/20 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#7C5CFF] group-hover:text-white group-hover:bg-[#7C5CFF] flex items-center justify-center shrink-0 transition-colors">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-white block truncate group-hover:text-[#4DD8FF] transition-colors">
                      {isAr ? src.name : src.nameEn}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
                      {src.badge}
                    </span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
