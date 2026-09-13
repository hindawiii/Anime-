import React from 'react';
import {
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
} from 'lucide-react';
import { AnimeItem, Language } from '../../types';
import { translations } from '../../translations';
import { INITIAL_ANIME_DATA } from '../../data/profileData';

interface ProfileAnimeShelvesProps {
  lang: Language;
  onSelectAnime: (anime: AnimeItem) => void;
  onPreviewImage: (imgUrl: string, title: string) => void;
}

export const ProfileAnimeShelves: React.FC<ProfileAnimeShelvesProps> = ({
  lang,
  onSelectAnime,
  onPreviewImage,
}) => {
  const t = translations[lang].animeShelves;
  const isAr = lang === 'ar';

  const favorites = INITIAL_ANIME_DATA.filter((a) => a.shelf === 'favorites');
  const planToWatch = INITIAL_ANIME_DATA.filter((a) => a.shelf === 'plan_to_watch');
  const completed = INITIAL_ANIME_DATA.filter((a) => a.shelf === 'completed');

  const renderHorizontalShelf = (
    shelfId: string,
    title: string,
    desc: string,
    icon: React.ReactNode,
    items: AnimeItem[],
    accentColor: string,
    badgeText: string
  ) => (
    <div id={`shelf-container-${shelfId}`} className="w-full flex flex-col gap-3">
      {/* Shelf Header with Title & Badge (Cleaned: no arrow buttons, pure smooth drag & swipe) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-white leading-none">
                {title}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${accentColor} border`}
              >
                {items.length} {badgeText}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">{desc}</p>
          </div>
        </div>
      </div>

      {/* Horizontal Smooth Sliding Track (مستطيل أفقي متجاوب وموفر للمساحة بسحب ناعم بدون أزرار) */}
      <div
        className="w-full flex items-stretch gap-3.5 overflow-x-auto scrollbar-none scroll-smooth pb-2 pt-1 px-0.5 select-none"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((anime) => {
          const animeTitle = isAr ? anime.title : anime.titleEn;
          const genres = isAr ? anime.genres : anime.genresEn;
          const watched = anime.watchedEpisodes ?? 0;
          const progressPercent = Math.round((watched / anime.episodesCount) * 100);

          return (
            <div
              key={anime.id}
              id={`anime-card-${anime.id}`}
              onClick={() => onSelectAnime(anime)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectAnime(anime)}
              style={{ scrollSnapAlign: 'start' }}
              className="w-[285px] sm:w-[325px] md:w-[340px] shrink-0 group relative overflow-hidden rounded-2xl bg-[#0F1124]/90 hover:bg-[#151833] border border-white/10 hover:border-[#7C5CFF]/60 p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#7C5CFF]/15 hover:-translate-y-1 flex gap-3 cursor-pointer text-start"
            >
              {/* Rectangular Poster: Click directly on the image to preview it! */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewImage(anime.poster, animeTitle);
                }}
                title="اضغط لمعاينة البوستر بالحجم الكامل"
                className="relative w-24 sm:w-28 h-32 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md cursor-zoom-in group/poster"
              >
                <img
                  src={anime.poster}
                  alt={animeTitle}
                  className="w-full h-full object-cover group-hover/poster:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Direct Image Zoom Icon Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#7C5CFF] text-white flex items-center justify-center shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Score Badge */}
                <div className="absolute top-1.5 start-1.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[#FFC94D] text-[10px] font-bold flex items-center gap-0.5 z-10 pointer-events-none">
                  <Star className="w-2.5 h-2.5 fill-[#FFC94D]" />
                  <span>{anime.score}</span>
                </div>
              </div>

              {/* Anime Metadata Column */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#4DD8FF] transition-colors leading-snug">
                    {animeTitle}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 mt-1">
                    <span>{anime.year}</span>
                    <span>•</span>
                    <span className="truncate">{anime.studio}</span>
                  </div>

                  {/* Genre Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {genres.slice(0, 2).map((g, i) => (
                      <span
                        key={i}
                        className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 truncate max-w-[100px]"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress / Episode Status Bar */}
                <div className="mt-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 mb-1">
                    <span>
                      {watched}/{anime.episodesCount} {t.episodes}
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#FF5C8A] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div id="profile-anime-shelves" className="w-full flex flex-col gap-7 pt-4">
      {/* Shelf 1: Favorites */}
      {renderHorizontalShelf(
        'favorites',
        t.favoritesTitle,
        t.favoritesDesc,
        <Sparkles className="w-4 h-4 text-[#FFC94D]" />,
        favorites,
        'bg-[#FFC94D]/15 text-[#FFC94D] border-[#FFC94D]/30',
        t.favoritesTitle
      )}

      {/* Shelf 2: Plan to Watch (لم يشاهدها بعد) */}
      {renderHorizontalShelf(
        'plan-to-watch',
        t.planToWatchTitle,
        t.planToWatchDesc,
        <Clock className="w-4 h-4 text-[#4DD8FF]" />,
        planToWatch,
        'bg-[#4DD8FF]/15 text-[#4DD8FF] border-[#4DD8FF]/30',
        t.planToWatchTitle
      )}

      {/* Shelf 3: Completed (أنميات شاهدها) */}
      {renderHorizontalShelf(
        'completed',
        t.completedTitle,
        t.completedDesc,
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
        completed,
        'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        t.completedTitle
      )}
    </div>
  );
};
