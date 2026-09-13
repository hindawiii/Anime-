import React from 'react';
import { Users, UserPlus, Flame, Heart } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';

interface ProfileStatsProps {
  lang: Language;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ lang }) => {
  const t = translations[lang].profileStats;

  const stats = [
    {
      id: 'following',
      label: t.following,
      value: '142',
      icon: UserPlus,
      color: 'text-[#4DD8FF]',
      bgGlow: 'bg-[#4DD8FF]/10',
      borderColor: 'border-[#4DD8FF]/20',
    },
    {
      id: 'followers',
      label: t.followers,
      value: '12.8K',
      icon: Users,
      color: 'text-[#7C5CFF]',
      bgGlow: 'bg-[#7C5CFF]/10',
      borderColor: 'border-[#7C5CFF]/20',
    },
    {
      id: 'friends',
      label: t.friends,
      value: '84',
      icon: Heart,
      color: 'text-[#FF5C8A]',
      bgGlow: 'bg-[#FF5C8A]/10',
      borderColor: 'border-[#FF5C8A]/20',
    },
    {
      id: 'points',
      label: t.points,
      value: '4,950',
      badge: 'SP',
      icon: Flame,
      color: 'text-[#FFC94D]',
      bgGlow: 'bg-[#FFC94D]/10',
      borderColor: 'border-[#FFC94D]/20',
    },
  ];

  return (
    <div
      id="profile-stats-ribbon"
      className="w-full rounded-2xl bg-[#0E1022]/90 backdrop-blur-md border border-white/10 p-2 sm:p-3 shadow-xl overflow-x-auto scrollbar-none"
    >
      {/* 4 Stats in exactly ONE unified responsive row */}
      <div className="grid grid-cols-4 divide-x divide-x-reverse divide-white/10 min-w-[320px]">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group relative flex flex-col items-center justify-center py-1 sm:py-2 px-1 sm:px-3 text-center transition-all hover:bg-white/[0.03] rounded-xl"
            >
              {/* Stat Value & Optional Badge */}
              <div className="flex items-center justify-center gap-1">
                <span className="text-base sm:text-xl md:text-2xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform">
                  {item.value}
                </span>
                {item.badge && (
                  <span className="hidden sm:inline text-[9px] font-bold px-1 py-0.2 rounded bg-amber-400/20 text-amber-300">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Stat Label & Mini Icon */}
              <div className="flex items-center justify-center gap-1 mt-0.5 sm:mt-1">
                <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${item.color} shrink-0`} />
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate max-w-[70px] sm:max-w-none">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
