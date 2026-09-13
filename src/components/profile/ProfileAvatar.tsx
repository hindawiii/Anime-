import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
  MoreVertical,
  Copy,
  Edit3,
  Check,
  UserCheck,
  Share2,
  QrCode,
  Award,
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { PRESET_AVATARS } from '../../data/profileData';

interface ProfileAvatarProps {
  lang: Language;
  onPreview: (imgUrl: string, title: string) => void;
  onOpenScanner?: () => void;
  onOpenShare?: () => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  lang,
  onPreview,
  onOpenScanner,
  onOpenShare,
}) => {
  const t = translations[lang].profileMedia;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Avatar URL state stored locally
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem('otaku_profile_avatar') || PRESET_AVATARS[0];
  });

  // Bio state with local persistence
  const [bioText, setBioText] = useState<string>(() => {
    return localStorage.getItem('otaku_user_bio') || t.bio;
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(bioText);
  const [copiedBio, setCopiedBio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Three-dots dropdown state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isPreviewAsFriend, setIsPreviewAsFriend] = useState(false);

  // Synchronize bio default text when language changes if not custom
  useEffect(() => {
    const saved = localStorage.getItem('otaku_user_bio');
    if (!saved) {
      setBioText(t.bio);
      setBioInput(t.bio);
    }
  }, [lang, t.bio]);

  const handleSelectPreset = (url: string) => {
    setAvatarUrl(url);
    localStorage.setItem('otaku_profile_avatar', url);
    setIsPickerOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
          localStorage.setItem('otaku_profile_avatar', reader.result);
          setIsPickerOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBio = () => {
    const trimmed = bioInput.trim();
    if (trimmed) {
      setBioText(trimmed);
      localStorage.setItem('otaku_user_bio', trimmed);
    }
    setIsEditingBio(false);
  };

  const handleCopyBio = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(bioText);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  const handleCopyProfileLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#profile-otaku-sama`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setIsMenuOpen(false);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full relative px-1 sm:px-3 -mt-12 sm:-mt-16 z-20 flex flex-col items-center justify-start">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Main Responsive Identity Wrapper */}
      <div className="w-full flex flex-col items-center text-center">
        {/* ============================================================== */}
        {/* 1. Avatar Frame with Move Camera Button to Bottom-Right Rim */}
        {/* ============================================================== */}
        <div className="relative group">
          {/* Cyber Halo Glow Effect */}
          <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-tr from-[#FF476E] via-[#7C5CFF] to-[#4DD8FF] opacity-75 blur-md group-hover:opacity-100 transition-opacity" />

          {/* Avatar Click to Preview Image with Clean Boundary */}
          <div
            onClick={() => onPreview(avatarUrl, t.previewAvatar)}
            title="اضغط لمعاينة الصورة بالحجم الكامل | Click to preview full size"
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-[28px] p-1 bg-[#0B0B18] shadow-[0_12px_36px_rgba(0,0,0,0.8)] overflow-hidden border-2 border-white/20 cursor-zoom-in group/avatar"
          >
            <img
              src={avatarUrl}
              alt="Otaku Sama Avatar"
              className="w-full h-full object-cover rounded-[22px] transition-transform duration-500 group-hover/avatar:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Moved: Change Avatar Camera Button to the Bottom-Right Rim of the frame */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPickerOpen(true);
            }}
            title={t.changeAvatar}
            className="absolute bottom-0 right-0 translate-x-1.5 translate-y-1.5 w-9 h-9 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-[#FF476E] text-white flex items-center justify-center shadow-lg border-2 border-[#0B0B18] hover:scale-110 active:scale-95 transition-all z-20"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Verified Official Seal on Top-Right/Start */}
          <div
            title="حساب موثق رسمي | Verified Guild Warrior"
            className="absolute -top-1.5 -end-1.5 w-7 h-7 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#7C5CFF] border-2 border-[#0B0B18] flex items-center justify-center text-white shadow-lg z-10"
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. Three Dots Menu Button (Float on side with safe margin)     */}
        {/* ============================================================== */}
        <div className="w-full max-w-xl flex items-center justify-end px-2 -mt-4 relative z-30">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title={t.actionsMenu}
              className="w-9 h-9 rounded-2xl bg-white/[0.06] hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="absolute end-0 top-11 w-56 bg-[#12142B]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.8)] py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150 text-start"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. Edit Profile */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsPickerOpen(true);
                  }}
                  className="w-full px-3.5 py-2.5 text-xs text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                >
                  <Camera className="w-4 h-4 text-[#7C5CFF]" />
                  <span>{t.editProfile}</span>
                </button>

                {/* 2. Preview as Friend */}
                <button
                  onClick={() => {
                    setIsPreviewAsFriend(!isPreviewAsFriend);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2.5 text-xs text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors border-t border-white/5"
                >
                  <UserCheck className="w-4 h-4 text-[#4DD8FF]" />
                  <span>
                    {isPreviewAsFriend ? 'العودة للوضع العادي' : t.previewAsFriend}
                  </span>
                </button>

                {/* 3. Copy Profile Link */}
                <button
                  onClick={handleCopyProfileLink}
                  className="w-full px-3.5 py-2.5 text-xs text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors border-t border-white/5"
                >
                  <Copy className="w-4 h-4 text-emerald-400" />
                  <span>{t.copyProfileLink}</span>
                </button>

                {/* 4. Scan Friend ID */}
                {onOpenScanner && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenScanner();
                    }}
                    className="w-full px-3.5 py-2.5 text-xs text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors border-t border-white/5"
                  >
                    <QrCode className="w-4 h-4 text-[#FFC94D]" />
                    <span>{t.scanId}</span>
                  </button>
                )}

                {/* 5. Share Card */}
                {onOpenShare && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenShare();
                    }}
                    className="w-full px-3.5 py-2.5 text-xs text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors border-t border-white/5"
                  >
                    <Share2 className="w-4 h-4 text-[#FF5C8A]" />
                    <span>{t.shareId}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Guest/Friend Preview Banner if toggled */}
        {isPreviewAsFriend && (
          <div className="w-full max-w-md bg-[#4DD8FF]/15 border border-[#4DD8FF]/30 text-[#4DD8FF] text-xs font-semibold px-4 py-1.5 rounded-full my-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> أنت الآن تستعرض الملف الشخصي بوضع الزائر الصديق
            </span>
            <button
              onClick={() => setIsPreviewAsFriend(false)}
              className="text-white hover:underline text-[11px]"
            >
              إلغاء
            </button>
          </div>
        )}

        {/* Copy Link Ephemeral Notification Toast */}
        {copiedLink && (
          <div className="text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 rounded-full my-2 animate-in fade-in flex items-center gap-1.5 shadow-lg">
            <Check className="w-3.5 h-3.5" />
            <span>{t.linkCopied}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. Strictly Ordered User Information with Safe Spacing:         */}
        {/*    1. User Display Name                                        */}
        {/*    2. Username (@handle)                                       */}
        {/*    3. Rank Badge                                               */}
        {/*    4. Bio Field in a Glass Container with Copy & Edit          */}
        {/* ============================================================== */}
        <div className="w-full max-w-xl flex flex-col items-center mt-3">
          {/* 1. Display Name (Heading: Roboto / Cairo bold) */}
          <div className="flex items-center gap-2 justify-center mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide font-['Roboto','Cairo',sans-serif]">
              {lang === 'ar' ? 'أوتاكو ساما' : 'Otaku Sama'}
            </h1>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-300 border border-amber-400/40 font-bold flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> VIP
            </span>
          </div>

          {/* 2. Username (@handle) with safe bottom space */}
          <div className="mb-2">
            <span className="font-mono text-sm sm:text-base font-semibold text-[#4DD8FF] tracking-wider">
              {t.handle}
            </span>
          </div>

          {/* 3. Rank Badge with safe space */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/35 text-[#7C5CFF] text-xs font-bold shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#FFC94D]" />
              <span>{t.rankBadge}</span>
            </div>
          </div>

          {/* 4. Bio in a Modern Glass Container with Inline Copy & Edit */}
          <div className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition-all shadow-[0_8px_30px_rgba(0,0,0,0.35)] relative text-start group/bio">
            {/* Bio Header Bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                {t.bioTitle}
              </span>

              {/* Bio Actions: Copy & Edit Buttons */}
              <div className="flex items-center gap-1.5">
                {/* Copy Bio Button */}
                <button
                  onClick={handleCopyBio}
                  title={t.copyBio}
                  className="h-7 px-2.5 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 text-[11px] font-medium flex items-center gap-1 transition-all"
                >
                  {copiedBio ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>

                {/* Edit Bio Button */}
                {!isEditingBio && (
                  <button
                    onClick={() => {
                      setBioInput(bioText);
                      setIsEditingBio(true);
                    }}
                    title={t.editBio}
                    className="h-7 px-2.5 rounded-lg bg-white/5 hover:bg-[#7C5CFF]/30 text-slate-300 hover:text-[#4DD8FF] text-[11px] font-medium flex items-center gap-1 transition-all"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>تعديل</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bio Content or Inline Editor */}
            {isEditingBio ? (
              <div className="flex flex-col gap-2.5 animate-in fade-in">
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows={3}
                  className="w-full bg-[#12142A] border border-[#7C5CFF]/60 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#7C5CFF] resize-none leading-relaxed"
                  placeholder="اكتب سيرتك الذاتية هنا..."
                  autoFocus
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSaveBio}
                    className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-[#7C5CFF] to-[#FF476E] hover:brightness-110 text-white text-xs font-bold shadow-md"
                  >
                    {t.saveBio}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans select-text">
                {bioText}
              </p>
            )}

            {/* Member Joined Tag */}
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>{t.joined}</span>
              <span className="text-[#4DD8FF]/80 font-mono text-[10px]">#VIP-FOUNDER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Avatar Preset & Custom Upload Picker Modal */}
      {isPickerOpen && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-xl z-50 flex items-center justify-center p-4 cursor-default"
          onClick={() => setIsPickerOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-[#121428] border border-white/15 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Safe Spacing between Title and Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm pe-6">
                <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
                <span>{t.choosePreset}</span>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="إغلاق | Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-4 gap-2.5 my-4">
              {PRESET_AVATARS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(preset)}
                  className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all group/preset ${
                    avatarUrl === preset
                      ? 'border-[#7C5CFF] ring-2 ring-[#7C5CFF]/50 scale-105'
                      : 'border-white/10 hover:border-white/40'
                  }`}
                >
                  <img
                    src={preset}
                    alt={`Avatar preset ${idx + 1}`}
                    className="w-full h-full object-cover group-hover/preset:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Upload Custom Image Button */}
            <button
              onClick={() => {
                setIsPickerOpen(false);
                fileInputRef.current?.click();
              }}
              className="w-full h-10 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#4DD8FF] hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>{t.uploadCustom}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
