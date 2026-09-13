import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { OtakuSamaLogo } from '../OtakuSamaLogo';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang].profileActions;
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);

  // Guild Invite Link with warrior id parameter
  const warriorId = '#SAMA-8942-VIP';
  const inviteUrl = `${window.location.origin}${window.location.pathname}?invite=SAMA-8942-VIP`;
  
  const shareMessage = isAr
    ? `⚔️ بطاقة هوية محارب الأوتاكو الأسطوري (${warriorId}) تدعوك للانضمام إلى نقابة أوتاكو ساما! تفقد حسابي والأنميات المفضلة عبر الرابط:`
    : `⚔️ Legendary Otaku Warrior ID (${warriorId}) invites you to join the Otaku-Sama guild! Check my profile & favorite anime:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareMessage}\n${inviteUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp Direct Share
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${shareMessage}\n${inviteUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Telegram Direct Share
  const handleShareTelegram = () => {
    const url = encodeURIComponent(inviteUrl);
    const text = encodeURIComponent(shareMessage);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  // Facebook Direct Share
  const handleShareFacebook = () => {
    const url = encodeURIComponent(inviteUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  // Generic Native Web Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Otaku-Sama Digital ID Passport',
          text: shareMessage,
          url: inviteUrl,
        });
      } catch {
        // User cancelled or fallback
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#141630] via-[#0E1022] to-[#0A0B16] border-2 border-[#7C5CFF]/50 p-6 sm:p-7 shadow-[0_25px_65px_rgba(124,92,255,0.3)] overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Glow Ambient */}
        <div className="absolute -top-16 -end-16 w-44 h-44 rounded-full bg-[#FF476E]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -start-16 w-44 h-44 rounded-full bg-[#4DD8FF]/20 blur-3xl pointer-events-none" />

        {/* Modal Header with safe gap to close button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3 pe-8">
            <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/20 border border-[#7C5CFF]/40 flex items-center justify-center text-[#7C5CFF] shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {t.shareCardTitle}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.shareCardSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-red-500 text-white flex items-center justify-center transition-all shrink-0"
            title="إغلاق | Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invite Card Preview Box */}
        <div className="my-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3.5 relative overflow-hidden">
          <div className="w-14 h-14 rounded-xl bg-[#0F1020] border border-white/20 flex items-center justify-center p-1 shrink-0">
            <OtakuSamaLogo size={42} glow={false} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">بطاقة محارب أوتاكو ساما</span>
              <Sparkles className="w-3 h-3 text-[#FFC94D]" />
            </div>
            <span className="text-[11px] text-[#4DD8FF] font-mono block mt-0.5">
              {warriorId}
            </span>
            <span className="text-[10px] text-slate-400 truncate block mt-0.5">
              {inviteUrl}
            </span>
          </div>
        </div>

        {/* Social App Sharing Buttons Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          {/* WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            className="h-11 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
            <span>{t.whatsapp}</span>
          </button>

          {/* Telegram */}
          <button
            onClick={handleShareTelegram}
            className="h-11 px-3 rounded-xl bg-[#0088cc]/15 hover:bg-[#0088cc]/25 border border-[#0088cc]/40 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0088cc]" />
            <span>{t.telegram}</span>
          </button>

          {/* Facebook */}
          <button
            onClick={handleShareFacebook}
            className="h-11 px-3 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/40 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2]" />
            <span>{t.facebook}</span>
          </button>

          {/* Native Web Share for Instagram / Twitter / Other apps */}
          <button
            onClick={handleNativeShare}
            className="h-11 px-3 rounded-xl bg-[#E1306C]/15 hover:bg-[#E1306C]/25 border border-[#E1306C]/40 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>{t.moreApps}</span>
          </button>
        </div>

        {/* Copy Direct Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#FF476E] hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{t.invitationCopied}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{t.copyLink}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
