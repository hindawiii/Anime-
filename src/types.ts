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
