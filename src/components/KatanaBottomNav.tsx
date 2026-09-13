import { motion } from 'motion/react';
import { Clapperboard, Headphones, Dices, Swords, Crown } from 'lucide-react';
import { TabType, Language } from '../types';
import { translations } from '../translations';
import { KatanaSwordGraphic } from './KatanaSwordGraphic';

interface KatanaBottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  lang: Language;
  neonEnabled: boolean;
}

const tabConfigs: {
  id: TabType;
  icon: typeof Clapperboard;
  color: string;
  kanji: string;
  glowClass: string;
}[] = [
  { id: 'anime', icon: Clapperboard, color: '#7C5CFF', kanji: 'ア', glowClass: 'katana-glow-violet' },
  { id: 'wansa', icon: Headphones, color: '#FF5C8A', kanji: '話', glowClass: 'katana-glow-sakura' },
  { id: 'games', icon: Dices, color: '#4DD8FF', kanji: '遊', glowClass: 'katana-glow-sky' },
  { id: 'arena', icon: Swords, color: '#FFC94D', kanji: '闘', glowClass: 'katana-glow-gold' },
  { id: 'profile', icon: Crown, color: '#E2E8F0', kanji: '侍', glowClass: 'katana-glow-violet' },
];

export const KatanaBottomNav = ({
  activeTab,
  onTabChange,
  lang,
  neonEnabled,
}: KatanaBottomNavProps) => {
  const t = translations[lang];
  const activeConfig = tabConfigs.find((c) => c.id === activeTab) || tabConfigs[0];
  const activeIndex = tabConfigs.findIndex((c) => c.id === activeTab);

  return (
    <div
      id="katana-bottom-nav-dock"
      className="fixed bottom-0 inset-x-0 z-50 w-full bg-[#0B0B18]/95 backdrop-blur-2xl border-t border-white/15 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
      }}
    >
      {/* Centered Constrained Container for Wide & Mobile Screens */}
      <div className="w-full max-w-4xl mx-auto relative px-2 sm:px-4 pt-1">
        
        {/* Top Katana Sword Spine with Dynamic Morphing Blade & Tsuba */}
        <div className="pt-0.5 px-2">
          <KatanaSwordGraphic
            activeTab={activeTab}
            color={activeConfig.color}
            glowColor={activeConfig.color}
            neonEnabled={neonEnabled}
          />
        </div>

        {/* Dynamic Sword Slash Light Beam moving with active tab */}
        <div className="relative w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
          <motion.div
            layoutId="katanaEnergySlash"
            className="absolute h-full rounded-full"
            style={{
              backgroundColor: activeConfig.color,
              boxShadow: neonEnabled ? `0 0 12px ${activeConfig.color}, 0 0 24px ${activeConfig.color}` : 'none',
              width: `${100 / tabConfigs.length}%`,
              left: `${activeIndex * (100 / tabConfigs.length)}%`,
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        </div>

        {/* 5 Section Tabs */}
        <nav
          className="grid grid-cols-5 items-center px-1 sm:px-2 py-1.5"
          aria-label={t.katanaNav.bladeTitle}
        >
          {tabConfigs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            const title = t.tabs[tab.id];

            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`group relative flex flex-col items-center justify-center min-h-[50px] sm:min-h-[56px] px-1 rounded-xl transition-all duration-300 ${
                  isActive ? 'scale-105' : 'hover:bg-white/[0.04] opacity-70 hover:opacity-100'
                }`}
              >
                {/* Active Neon Aura Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${tab.color}25 0%, transparent 80%)`,
                      border: `1px solid ${tab.color}40`,
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}

                {/* Tab Icon with Kanji Tag */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-white/10' : 'bg-transparent'
                    }`}
                    style={{
                      color: isActive ? tab.color : '#94A3B8',
                      filter: isActive && neonEnabled ? `drop-shadow(0 0 8px ${tab.color})` : 'none',
                    }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Japanese Katana Crest Kanji floating badge */}
                  <span
                    className={`absolute -top-1 -end-1 text-[9px] font-bold px-1 rounded-full border transition-all ${
                      isActive
                        ? 'border-white/30 text-white bg-black/60 shadow'
                        : 'border-transparent text-slate-500 opacity-0 group-hover:opacity-60'
                    }`}
                    style={{ color: isActive ? tab.color : undefined }}
                  >
                    {tab.kanji}
                  </span>
                </div>

                {/* Tab Label */}
                <span
                  className={`text-[11px] sm:text-xs font-semibold tracking-tight mt-0.5 truncate max-w-full transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                  style={{
                    color: isActive ? tab.color : undefined,
                  }}
                >
                  {title}
                </span>

                {/* Tiny glowing dot under active tab */}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicatorDot"
                    className="w-1.5 h-1.5 rounded-full mt-0.5"
                    style={{
                      backgroundColor: tab.color,
                      boxShadow: neonEnabled ? `0 0 6px ${tab.color}` : 'none',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
