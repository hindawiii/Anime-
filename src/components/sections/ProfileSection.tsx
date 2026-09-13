import React from 'react';
import { Shield, Sparkles, Award } from 'lucide-react';
import { OtakuSamaLogo } from '../OtakuSamaLogo';

export const ProfileSection: React.FC = () => {
  return (
    <div id="section-profile" className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-start pt-4 sm:pt-8 animate-in fade-in duration-300">
      
      {/* Official Otaku-Sama Warrior Passport Card */}
      <div className="w-full max-w-md relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#131428] via-[#0E0F1E] to-[#0A0B14] border border-white/10 p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] group">
        
        {/* Ambient neon backdrop glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#FF476E]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#7C5CFF]/15 blur-3xl pointer-events-none" />
        
        {/* Giant Watermark Seal in the background */}
        <div className="absolute -bottom-6 -left-6 opacity-[0.07] pointer-events-none rotate-12">
          <OtakuSamaLogo size={220} glow={false} />
        </div>

        {/* Card Header: Brand Logo & Title */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <OtakuSamaLogo size={44} glow={true} className="shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-white font-['A_Banoo_Light','a_banoo_light',sans-serif] leading-tight">
                أوتاكو ساما
              </h2>
              <span className="text-[11px] text-[#FF688B] tracking-wider uppercase font-semibold">
                Otaku-Sama Warrior Pass
              </span>
            </div>
          </div>

          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#FFC94D]/20 text-[#FFC94D] border border-[#FFC94D]/40 flex items-center gap-1 shadow-[0_0_12px_rgba(255,201,77,0.25)]">
            <Sparkles className="w-3 h-3" />
            <span>VIP MEMBER</span>
          </span>
        </div>

        {/* Card Body: Warrior Rank & Avatar */}
        <div className="py-6 flex items-center gap-4 relative z-10">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF476E] via-[#7C5CFF] to-[#4DD8FF] p-0.5 shrink-0 shadow-lg shadow-[#FF476E]/20">
            <div className="w-full h-full bg-[#0E0F1E] rounded-[14px] flex items-center justify-center overflow-hidden">
              <span className="text-2xl font-bold text-white font-['A_Banoo_Light','a_banoo_light',sans-serif]">
                ساما
              </span>
            </div>
            <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#FF476E] border-2 border-[#0E0F1E] flex items-center justify-center text-[10px] text-white font-bold">
              ★
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white truncate font-['A_Banoo_Light','a_banoo_light',sans-serif]">
              محارب الأوتاكو الأسطوري
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              ID: #SAMA-8942-VIP
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <Shield className="w-3 h-3" /> حساب موثق
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                <Award className="w-3 h-3" /> رتبة الهاشيرا
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Official Security Badge & Auth Date */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
          <span>الإصدار الرسمي: 2026</span>
          <span className="text-[#FF688B] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF476E] animate-ping" />
            الهوية الرقمية نشطة
          </span>
        </div>

      </div>

    </div>
  );
};
