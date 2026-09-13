import { useState } from 'react';
import { Settings, Bell } from 'lucide-react';
import { Language, TabType } from '../types';
import { translations } from '../translations';
import { OtakuSamaLogo } from './OtakuSamaLogo';

interface HeaderProps {
  lang: Language;
  onOpenSettings: () => void;
  activeTab: TabType;
  neonEnabled: boolean;
}

const tabThemeColors: Record<TabType, string> = {
  anime: '#7C5CFF',
  wansa: '#FF5C8A',
  games: '#4DD8FF',
  arena: '#FFC94D',
  profile: '#E2E8F0',
};

export const Header = ({
  lang,
  onOpenSettings,
  activeTab,
  neonEnabled,
}: HeaderProps) => {
  const t = translations[lang];
  const activeColor = tabThemeColors[activeTab];
  const [hasNotif, setHasNotif] = useState(false);

  return (
    <header
      id="app-main-header"
      className="sticky top-0 z-30 w-full bg-[#0B0B18]/85 backdrop-blur-md border-b border-white/10 transition-colors duration-300"
    >
      {/* Forced LTR container to strictly position Settings + Notifications on the far LEFT, and Brand + VIP on the far RIGHT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between [direction:ltr]">
        
        {/* FAR LEFT: Settings Button + Notifications Button side-by-side */}
        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <button
            id="header-settings-btn"
            type="button"
            onClick={onOpenSettings}
            aria-label={t.settings}
            title={t.settings}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all group"
            style={{
              boxShadow: neonEnabled ? `0 0 14px ${activeColor}35` : 'none',
            }}
          >
            <Settings className="w-5 h-5 text-slate-200 group-hover:rotate-45 group-hover:text-white transition-transform duration-300" />
            
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: activeColor }}
              />
              <span
                className="relative inline-flex rounded-full h-3 w-3 border border-[#0B0B18]"
                style={{ backgroundColor: activeColor }}
              />
            </span>
          </button>

          {/* Notifications Button - Directly adjacent to Settings Button */}
          <button
            id="header-notif-btn"
            type="button"
            onClick={() => setHasNotif(!hasNotif)}
            aria-label={t.notifications}
            title={t.notifications}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all text-slate-300 hover:text-white group"
          >
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {hasNotif ? (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#FF5C8A] ring-2 ring-[#0B0B18] animate-pulse" />
            ) : (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#7C5CFF]/60" />
            )}
          </button>
        </div>

        {/* FAR RIGHT: Brand Logo + App Name (No VIP Button) */}
        <div className="flex items-center gap-2.5 sm:gap-3 select-none [direction:rtl]">
          {/* Official Otaku-Sama Brand Logo */}
          <OtakuSamaLogo
            size={40}
            glow={neonEnabled}
            className="hover:scale-105 active:scale-95 transition-transform shrink-0"
          />

          {/* Name & Subtitle */}
          <div className="flex flex-col text-right justify-center">
            <h1 className="text-lg sm:text-2xl font-bold tracking-normal text-white leading-tight font-['A_Banoo_Light','a_banoo_light',sans-serif] drop-shadow-[0_2px_12px_rgba(124,92,255,0.35)] whitespace-nowrap">
              {t.appName}
            </h1>
            <span className="text-[11px] sm:text-[12px] text-slate-300/80 font-normal leading-tight hidden xs:inline-block font-['A_Banoo_Light','a_banoo_light',sans-serif] whitespace-nowrap">
              {t.appSubtitle}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
