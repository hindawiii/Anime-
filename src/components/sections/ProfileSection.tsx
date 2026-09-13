import React, { useState } from 'react';
import { Shield, Sparkles, Award, Maximize2, Share2, QrCode } from 'lucide-react';
import { OtakuSamaLogo } from '../OtakuSamaLogo';
import { Language, AnimeItem } from '../../types';
import { translations } from '../../translations';

// Modular Profile Sub-components
import { ProfileLocation } from '../profile/ProfileLocation';
import { ProfileCover } from '../profile/ProfileCover';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { ProfileStats } from '../profile/ProfileStats';
import { ProfileAnimeShelves } from '../profile/ProfileAnimeShelves';
import { AnimeDetailModal } from '../profile/AnimeDetailModal';
import { ProfileQuotes } from '../profile/ProfileQuotes';
import { ImagePreviewModal } from '../profile/ImagePreviewModal';
import { PassportDetailModal } from '../profile/PassportDetailModal';
import { ScannerModal } from '../profile/ScannerModal';
import { ShareCardModal } from '../profile/ShareCardModal';

interface ProfileSectionProps {
  lang: Language;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const p = t.profileCard;

  // Modals state
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleOpenImagePreview = (url: string, title: string) => {
    setPreviewImage({ url, title });
  };

  return (
    <div
      id="section-profile"
      className="w-full flex flex-col items-center justify-start gap-6 animate-in fade-in duration-300 pb-20"
    >
      {/* 1. Location Bar at the Top (تحديد الموقع بطريقة احترافية عصرية) */}
      <ProfileLocation lang={lang} />

      {/* 2. Modern Profile Cover Banner with Dual-Image 5s Carousel */}
      <ProfileCover lang={lang} onPreview={handleOpenImagePreview} />

      {/* 3. Cyber Avatar with Ordered Info: Name -> Username -> Rank -> Bio (with 3-dots menu) */}
      <ProfileAvatar
        lang={lang}
        onPreview={handleOpenImagePreview}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* 4. Stats Ribbon (شريط المتابعة والأصدقاء والمتابعون والنقاط في صف واحد موحد) */}
      <ProfileStats lang={lang} />

      {/* 5. Official Otaku-Sama Digital Passport Card (جواز سفر محارب أوتاكو ساما) */}
      <div
        id="otaku-passport-card"
        onClick={() => setIsPassportOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsPassportOpen(true)}
        title={p.clickToOpen}
        className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#131428] via-[#0E0F1E] to-[#0A0B14] border border-white/10 hover:border-[#7C5CFF]/60 p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_50px_rgba(124,92,255,0.2)] transition-all duration-300 group mt-2 cursor-pointer text-start"
      >
        {/* Ambient neon backdrop glow */}
        <div className="absolute -top-16 -end-16 w-48 h-48 rounded-full bg-[#FF476E]/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />
        <div className="absolute -bottom-16 -start-16 w-48 h-48 rounded-full bg-[#7C5CFF]/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

        {/* Giant Watermark Seal in the background */}
        <div className="absolute -bottom-6 -start-6 opacity-[0.07] pointer-events-none rotate-12">
          <OtakuSamaLogo size={220} glow={false} />
        </div>

        {/* Floating Quick Action Buttons on Top Corner */}
        <div className="absolute top-4 end-4 flex items-center gap-1.5 z-20">
          {/* Quick Scanner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsScannerOpen(true);
            }}
            title="مسح بطاقة هوية صديق"
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#4DD8FF]/20 text-slate-300 hover:text-[#4DD8FF] border border-white/10 flex items-center justify-center transition-all shadow-md"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Quick Share */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsShareOpen(true);
            }}
            title="مشاركة رابط الهوية والدعوة"
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF476E]/20 text-slate-300 hover:text-[#FF476E] border border-white/10 flex items-center justify-center transition-all shadow-md"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Expand Full Passport */}
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#7C5CFF]/30 transition-all opacity-80 group-hover:opacity-100 shadow-md">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Card Header: Brand Logo & Title */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 relative z-10 pe-24">
          <div className="flex items-center gap-3">
            <OtakuSamaLogo size={44} glow={true} className="shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-white font-['Roboto','Cairo',sans-serif] leading-tight">
                {p.cardTitle}
              </h2>
              <span className="text-[11px] text-[#FF688B] tracking-wider uppercase font-semibold">
                {p.cardSubtitle}
              </span>
            </div>
          </div>

          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#FFC94D]/20 text-[#FFC94D] border border-[#FFC94D]/40 flex items-center gap-1 shadow-[0_0_12px_rgba(255,201,77,0.25)]">
            <Sparkles className="w-3 h-3" />
            <span>{p.vipBadge}</span>
          </span>
        </div>

        {/* Card Body: Warrior Rank & Avatar */}
        <div className="py-6 flex items-center gap-4 relative z-10">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF476E] via-[#7C5CFF] to-[#4DD8FF] p-0.5 shrink-0 shadow-lg shadow-[#FF476E]/20">
            <div className="w-full h-full bg-[#0E0F1E] rounded-[14px] flex items-center justify-center overflow-hidden">
              <span className="text-xl sm:text-2xl font-bold text-white font-['Roboto','Cairo',sans-serif]">
                {p.avatarInitial}
              </span>
            </div>
            <span className="absolute -bottom-1.5 -end-1.5 w-6 h-6 rounded-full bg-[#FF476E] border-2 border-[#0E0F1E] flex items-center justify-center text-[10px] text-white font-bold">
              ★
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white truncate font-['Roboto','Cairo',sans-serif] group-hover:text-[#4DD8FF] transition-colors">
              {p.warriorTitle}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {p.idLabel} #SAMA-8942-VIP
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <Shield className="w-3 h-3" /> {p.verifiedAccount}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                <Award className="w-3 h-3" /> {p.rankHashira}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Official Security Badge & Auth Date */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
          <span>{p.officialRelease}</span>
          <span className="text-[#FF688B] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF476E] animate-ping" />
            {p.activeDigitalId}
          </span>
        </div>
      </div>

      {/* 6. Horizontal Sliding Anime Shelves: Favorites, Plan to Watch, Completed */}
      <ProfileAnimeShelves
        lang={lang}
        onSelectAnime={(anime) => setSelectedAnime(anime)}
        onPreviewImage={handleOpenImagePreview}
      />

      {/* 7. Legendary Anime Quotes Hub */}
      <ProfileQuotes
        lang={lang}
        onPreviewImage={handleOpenImagePreview}
      />

      {/* ================================================================= */}
      {/* 8. Professional Application Logo Footer (وضع لوجو التطبيق اسفل قسم حسابي) */}
      {/* ================================================================= */}
      <div className="w-full mt-10 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center relative">
        {/* Glow behind the footer logo */}
        <div className="absolute w-40 h-20 bg-gradient-to-r from-[#7C5CFF]/20 via-[#FF476E]/20 to-[#4DD8FF]/20 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10 mb-2">
          <OtakuSamaLogo size={42} glow={true} />
          <div className="text-start">
            <h3 className="text-base sm:text-lg font-black tracking-wider text-white font-['Roboto','Cairo',sans-serif]">
              OTAKU SAMA
            </h3>
            <span className="text-[10px] text-[#4DD8FF] font-semibold tracking-widest uppercase block">
              {lang === 'ar' ? 'النقابة الرسمية لمحاربي الأنمي' : 'OFFICIAL ANIME GUILD'}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed relative z-10 font-sans mt-1">
          {lang === 'ar'
            ? 'منصة أوتاكو ساما الرسمية • تجربة التوثيق الرقمي والأنمي الفاخرة'
            : 'Otaku Sama Guild • The Ultimate Cyber Anime Hub & Identity'}
        </p>

        <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400 font-mono relative z-10">
          <span>v2.5.0-PRO</span>
          <span>•</span>
          <span>BUILD 2026</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Full-Screen Anime Detail Modal with Official Streaming Sources */}
      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          lang={lang}
          onPreviewImage={handleOpenImagePreview}
        />
      )}

      {/* Full-Screen Digital ID Passport Modal */}
      <PassportDetailModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        lang={lang}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Scanner Modal for Otaku ID QR Code & Warrior Search */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        lang={lang}
      />

      {/* Share Card Modal for Inviting Friends via Social Apps */}
      <ShareCardModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        lang={lang}
      />

      {/* High-Resolution Standalone Image Preview Modal */}
      {previewImage && (
        <ImagePreviewModal
          imageUrl={previewImage.url}
          title={previewImage.title}
          onClose={() => setPreviewImage(null)}
          lang={lang}
        />
      )}
    </div>
  );
};
