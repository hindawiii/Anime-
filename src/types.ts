export type TabType = 'anime' | 'wansa' | 'games' | 'arena' | 'profile';

export type Language = 'ar' | 'en';

export type ViewportMode = 'mobile' | 'responsive';

export interface SectionMeta {
  id: TabType;
  titleKey: string;
  subtitleKey: string;
  color: string;
  hex: string;
  glowClass: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  tag: string;
  level: number;
  avatar: string;
  rank: string;
  coins: number;
  gems: number;
}

export interface OfficialSource {
  name: string;
  nameEn: string;
  url: string;
  badge: string;
  iconType: 'crunchyroll' | 'shahid' | 'netflix' | 'mal';
}

export interface AnimeItem {
  id: string;
  title: string;
  titleEn: string;
  poster: string;
  banner: string;
  synopsis: string;
  synopsisEn: string;
  score: number;
  year: number;
  studio: string;
  episodesCount: number;
  watchedEpisodes?: number;
  genres: string[];
  genresEn: string[];
  shelf: 'favorites' | 'plan_to_watch' | 'completed';
  officialSources: OfficialSource[];
}

export interface AnimeQuote {
  id: string;
  quote: string;
  quoteEn: string;
  speaker: string;
  speakerEn: string;
  anime: string;
  animeEn: string;
  contextOrRecipient: string;
  contextOrRecipientEn: string;
  episode: string;
  episodeEn: string;
  avatarUrl: string;
  likes: number;
}
