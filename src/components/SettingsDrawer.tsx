import { useState } from 'react';
import {
  X,
  User,
  Info,
  ShieldCheck,
  Trash2,
  LogOut,
  Globe,
  Bell,
  Sparkles,
  Volume2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { OtakuSamaLogo } from './OtakuSamaLogo';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: () => void;
  neonEnabled: boolean;
  onToggleNeon: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAuth: () => void;
}

export const SettingsDrawer = ({
  isOpen,
  onClose,
  lang,
  onToggleLang,
  neonEnabled,
  onToggleNeon,
  soundEnabled,
  onToggleSound,
  onOpenAuth,
}: SettingsDrawerProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'logout' | null>(null);
  const [clearingCache, setClearingCache] = useState(false);
  const [cacheClearedSuccess, setCacheClearedSuccess] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);

  if (!isOpen) return null;

  const handleClearCache = () => {
    setClearingCache(true);
    setCacheClearedSuccess(false);
    setTimeout(() => {
      setClearingCache(false);
      setCacheClearedSuccess(true);
      setTimeout(() => {
        setCacheClearedSuccess(false);
      }, 3500);
    }, 1200);
  };

  return (
    <div
      id="settings-drawer-backdrop"
      className="fixed inset-0 z-50 flex justify-start bg-black/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Drawer Container */}
      <div
        id="settings-drawer-panel"
        className="relative w-full max-w-md h-full bg-[#0E0E1F] border-e border-white/10 shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <OtakuSamaLogo size={38} />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {t.settingsMenu.title}
              </h2>
              <p className="text-xs text-slate-400">{t.settingsMenu.subtitle}</p>
            </div>
          </div>

          <button
            id="settings-close-btn"
            onClick={onClose}
            aria-label={t.settingsMenu.close}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cache Cleared Notification Toast */}
        {cacheClearedSuccess && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 text-xs font-medium animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.settingsMenu.cacheCleared}</span>
          </div>
        )}

        {/* Drawer Content - Grouped Modern List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Section 1: User & Account Profile */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 block mb-2">
              {isRtl ? 'الحساب والهوية' : 'Account & Identity'}
            </span>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
              
              {/* Profile button */}
              <button
                id="setting-btn-profile"
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.04] transition-colors text-start group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#7C5CFF]/15 text-[#7C5CFF] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block group-hover:text-[#7C5CFF] transition-colors">
                      {t.settingsMenu.profile}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.profileDesc}</span>
                  </div>
                </div>
                <ChevronIcon className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              </button>

              {/* Language Switcher */}
              <button
                id="setting-btn-language"
                onClick={onToggleLang}
                className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.04] transition-colors text-start group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4DD8FF]/15 text-[#4DD8FF] flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      {t.settingsMenu.language}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.languageDesc}</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30">
                  {t.settingsMenu.currentLangName}
                </span>
              </button>
            </div>
          </div>

          {/* Section 2: Preferences & Katana FX */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 block mb-2">
              {isRtl ? 'المظهر والتأثيرات' : 'Display & Effects'}
            </span>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
              
              {/* Neon Glow Toggle */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5C8A]/15 text-[#FF5C8A] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      {t.settingsMenu.neonGlow}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.neonGlowDesc}</span>
                  </div>
                </div>
                <button
                  id="setting-toggle-neon"
                  onClick={onToggleNeon}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    neonEnabled ? 'bg-[#7C5CFF]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 start-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      neonEnabled ? (isRtl ? '-translate-x-6' : 'translate-x-6') : ''
                    }`}
                  />
                </button>
              </div>

              {/* Sound FX Toggle */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFC94D]/15 text-[#FFC94D] flex items-center justify-center">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      {t.settingsMenu.soundEffects}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.soundEffectsDesc}</span>
                  </div>
                </div>
                <button
                  id="setting-toggle-sound"
                  onClick={onToggleSound}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    soundEnabled ? 'bg-[#7C5CFF]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 start-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      soundEnabled ? (isRtl ? '-translate-x-6' : 'translate-x-6') : ''
                    }`}
                  />
                </button>
              </div>

              {/* Notifications Toggle */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      {t.settingsMenu.notificationsToggle}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.notificationsDesc}</span>
                  </div>
                </div>
                <button
                  id="setting-toggle-notifications"
                  onClick={() => setNotificationsOn(!notificationsOn)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationsOn ? 'bg-[#7C5CFF]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 start-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      notificationsOn ? (isRtl ? '-translate-x-6' : 'translate-x-6') : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Performance, Privacy & App Info */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 block mb-2">
              {isRtl ? 'الأداء والنظام' : 'System & Information'}
            </span>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
              
              {/* Clear Cache Button */}
              <button
                id="setting-btn-clear-cache"
                onClick={handleClearCache}
                disabled={clearingCache}
                className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.04] transition-colors text-start group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <Trash2 className={`w-4 h-4 ${clearingCache ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block group-hover:text-amber-400 transition-colors">
                      {clearingCache ? t.settingsMenu.clearingCache : t.settingsMenu.clearCache}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.clearCacheDesc}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300">
                  48.6 MB
                </span>
              </button>

              {/* About App */}
              <button
                id="setting-btn-about"
                onClick={() => setActiveModal('about')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.04] transition-colors text-start group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block group-hover:text-blue-400 transition-colors">
                      {t.settingsMenu.about}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.aboutDesc}</span>
                  </div>
                </div>
                <ChevronIcon className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              </button>

              {/* Privacy Policy */}
              <button
                id="setting-btn-privacy"
                onClick={() => setActiveModal('privacy')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.04] transition-colors text-start group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block group-hover:text-emerald-400 transition-colors">
                      {t.settingsMenu.privacy}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.privacyDesc}</span>
                  </div>
                </div>
                <ChevronIcon className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              </button>

              {/* Help / Support */}
              <div className="p-3.5 flex items-center justify-between hover:bg-white/[0.04] transition-colors text-start group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      {t.settingsMenu.support}
                    </span>
                    <span className="text-xs text-slate-400">{t.settingsMenu.supportDesc}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500">v1.0.0</span>
              </div>
            </div>
          </div>

          {/* Section 4: Logout */}
          <div className="pt-2">
            <button
              id="setting-btn-logout"
              onClick={() => setActiveModal('logout')}
              className="w-full p-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-rose-300 hover:text-rose-200 flex items-center justify-center gap-2 font-semibold text-sm transition-all active:scale-[0.98]"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.settingsMenu.logout}</span>
            </button>

            {/* Official Brand Seal */}
            <div className="pt-4 pb-1 flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity select-none">
              <OtakuSamaLogo size={32} glow={false} />
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Otaku-Sama • {isRtl ? 'العلامة الرسمية' : 'Official Mark'}
              </span>
            </div>
          </div>
        </div>

        {/* Sub-Dialog Modals (About, Privacy, Logout) */}
        {activeModal && (
          <div
            className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm p-5 flex items-center justify-center animate-in fade-in"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="w-full max-w-sm bg-[#14142B] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {activeModal === 'about' && (
                <>
                  <div className="flex flex-col items-center justify-center py-2 text-center">
                    <OtakuSamaLogo size={100} variant="full" className="mb-2" />
                    <h3 className="text-lg font-bold text-white font-['A_Banoo_Light','a_banoo_light',sans-serif]">أوتاكو ساما</h3>
                    <p className="text-xs text-slate-400">v1.0.0 (Official Brand Edition)</p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed text-center">
                    {t.settingsMenu.aboutModalText}
                  </p>
                  <div className="p-2.5 rounded-xl bg-white/5 text-[11px] text-slate-400 border border-white/5 space-y-1">
                    <div className="flex justify-between">
                      <span>{isRtl ? 'المطور' : 'Engine'}:</span>
                      <span className="text-[#FFC94D] font-mono">Otaku Sama Arab Studio</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRtl ? 'شريط التنقل' : 'Nav Architecture'}:</span>
                      <span className="text-[#7C5CFF] font-mono">Katana Blade System</span>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{t.settingsMenu.privacyModalTitle}</h3>
                      <p className="text-xs text-slate-400">{isRtl ? 'حماية مشفرة' : 'Encrypted & Secure'}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.settingsMenu.privacyModalText}
                  </p>
                </>
              )}

              {activeModal === 'logout' && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{t.settingsMenu.logout}</h3>
                      <p className="text-xs text-slate-400">{t.settingsMenu.logoutConfirm}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        onClose();
                        onOpenAuth();
                      }}
                      className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                    >
                      {isRtl ? 'تأكيد الخروج' : 'Confirm'}
                    </button>
                  </div>
                </>
              )}

              {activeModal !== 'logout' && (
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  {t.settingsMenu.close}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
