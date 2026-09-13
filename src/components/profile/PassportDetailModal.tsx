import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  Shield,
  Award,
  Sparkles,
  Calendar,
  Flame,
  Quote,
  CheckCircle,
  Hash,
  Crown,
  User,
  Share2,
  Camera,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { OtakuSamaLogo } from '../OtakuSamaLogo';

interface PassportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenShare?: () => void;
}

export const PassportDetailModal: React.FC<PassportDetailModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenShare,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom passport avatar or profile avatar toggle
  const [useCustomAvatar, setUseCustomAvatar] = useState<boolean>(() => {
    return localStorage.getItem('otaku_passport_use_custom') === 'true';
  });

  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>(() => {
    return (
      localStorage.getItem('otaku_passport_custom_avatar') ||
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80'
    );
  });

  const profileAvatar =
    localStorage.getItem('otaku_profile_avatar') ||
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80';

  const displayedAvatar = useCustomAvatar ? customAvatarUrl : profileAvatar;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = translations[lang].profileCard;
  const a = translations[lang].profileActions;
  const isAr = lang === 'ar';

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomAvatarUrl(reader.result);
          setUseCustomAvatar(true);
          localStorage.setItem('otaku_passport_custom_avatar', reader.result);
          localStorage.setItem('otaku_passport_use_custom', 'true');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleAvatarSource = () => {
    const nextVal = !useCustomAvatar;
    setUseCustomAvatar(nextVal);
    localStorage.setItem('otaku_passport_use_custom', nextVal.toString());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      {/* Hidden File input for passport-only avatar */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCustomUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Modal Card with Cyber Passport Aesthetic */}
      <div
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#151733] via-[#0E1024] to-[#080914] border-2 border-[#7C5CFF]/40 p-5 sm:p-7 shadow-[0_25px_70px_rgba(124,92,255,0.25)] overflow-hidden text-start my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Holographic Watermarks & Neon Ambient */}
        <div className="absolute -top-20 -end-20 w-52 h-52 rounded-full bg-[#FF476E]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -start-20 w-52 h-52 rounded-full bg-[#4DD8FF]/20 blur-3xl pointer-events-none" />

        {/* Background Emblem Logo Watermark */}
        <div className="absolute -bottom-8 -end-8 opacity-[0.06] pointer-events-none rotate-12">
          <OtakuSamaLogo size={260} glow={false} />
        </div>

        {/* Top Control Bar with Guaranteed Safe Gap to Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5 pe-8">
            <OtakuSamaLogo size={36} glow={true} className="shrink-0" />
            <div>
              <span className="text-[10px] text-[#FF688B] tracking-wider uppercase font-bold block">
                OTAKU-SAMA PASSPORT ARCHIVE
              </span>
              <h2 className="text-base font-bold text-white leading-tight">
                {t.modalTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-red-500/80 text-white flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0"
            title={t.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar Source Switcher Bar (Use Profile Avatar vs Custom Avatar for Passport) */}
        <div className="mt-3 p-2 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-2 relative z-10">
          <span className="text-[11px] text-slate-300 font-semibold ps-1">
            {a.identityAvatarOption}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleAvatarSource}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                !useCustomAvatar
                  ? 'bg-[#7C5CFF] text-white shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>{a.useProfileAvatar}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                useCustomAvatar
                  ? 'bg-[#FF476E] text-white shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
              title="رفع صورة مخصصة لبطاقة الهوية فقط"
            >
              <Camera className="w-3 h-3" />
              <span>صورة خاصة</span>
            </button>
          </div>
        </div>

        {/* Structured Digital ID Passport Body (Strict User Specified Hierarchy) */}
        <div className="pt-4 flex flex-col gap-3.5 relative z-10">
          {/* 1. الاسم أولاً وعلامة التوثيق وعلامة الرتبة */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF476E] via-[#7C5CFF] to-[#4DD8FF] p-0.5 shrink-0 shadow-md">
                <img
                  src={displayedAvatar}
                  alt="Passport Warrior Avatar"
                  className="w-full h-full object-cover rounded-[14px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -end-1 w-5 h-5 rounded-full bg-[#FF476E] flex items-center justify-center text-white text-[10px] font-bold">
                  ★
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-black text-white leading-tight font-['Roboto','Cairo',sans-serif]">
                    {t.cardTitle}
                  </h3>
                  {/* علامة التوثيق */}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <Shield className="w-3 h-3 fill-emerald-400/20" />
                    <span>{t.verifiedAccount}</span>
                  </span>
                </div>

                {/* علامة الرتبة */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    <Crown className="w-3 h-3 text-amber-400" />
                    <span>{t.rankHashira}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7C5CFF]/20 text-[#4DD8FF] border border-[#7C5CFF]/30">
                    {t.vipBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. أسفله: رقم معرّف المحارب */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#7C5CFF]/15 to-[#FF5C8A]/10 border border-[#7C5CFF]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#4DD8FF]" />
              <span className="text-xs font-semibold text-slate-300">
                {t.warriorIdLabel}
              </span>
            </div>
            <span className="text-sm sm:text-base font-mono font-black text-[#FFC94D] tracking-wider bg-black/40 px-3 py-1 rounded-lg border border-white/10">
              {t.warriorIdValue}
            </span>
          </div>

          {/* 3. أسفله: الجنس والرمز الجنسي */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5C8A]" />
              <span className="text-xs font-semibold text-slate-300">
                {t.genderLabel}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              {t.genderValue}
            </span>
          </div>

          {/* 4. أسفله: الأنمي المفضل */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4DD8FF]" />
              <span className="text-xs font-semibold text-slate-300">
                {t.favAnimeLabel}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#4DD8FF] bg-[#4DD8FF]/10 px-2.5 py-1 rounded-lg border border-[#4DD8FF]/20 truncate max-w-[200px]">
              {t.favAnimeValue}
            </span>
          </div>

          {/* 5. أسفله: الشخصية المفضلة */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-semibold text-slate-300">
                {t.favCharacterLabel}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-orange-300 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
              {t.favCharacterValue}
            </span>
          </div>

          {/* 6. أسفله: المقولة المفضلة */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Quote className="w-4 h-4 text-[#FFC94D]" />
              <span className="text-xs font-semibold text-slate-300">
                {t.favQuoteLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-white italic bg-black/30 p-2.5 rounded-xl border border-white/5 font-sans leading-relaxed">
              "{t.favQuoteValue}"
            </p>
          </div>

          {/* 7. أسفله: تاريخ الانضمام */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">
                {t.joinedDateLabel}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              {t.joinedDateValue}
            </span>
          </div>
        </div>

        {/* Footer & Actions with Guild Verification Seal */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{t.passportStamp}</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenShare && (
              <button
                onClick={() => {
                  onClose();
                  onOpenShare();
                }}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#7C5CFF]/30 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 border border-white/10"
              >
                <Share2 className="w-3.5 h-3.5 text-[#FF476E]" />
                <span>مشاركة الهوية</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#FF5C8A] hover:opacity-90 text-white font-bold text-xs shadow-lg transition-all active:scale-95"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
