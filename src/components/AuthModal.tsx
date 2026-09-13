import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (name: string) => void;
}

export const AuthModal = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess,
}: AuthModalProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrTag, setEmailOrTag] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onLoginSuccess(emailOrTag.trim() || (isRtl ? 'محارب الأوتاكو' : 'Otaku Warrior'));
      onClose();
    }, 1000);
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="auth-card"
        className="relative w-full max-w-md bg-[#0D0D1E] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-purple-950/40 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon decorative background glow */}
        <div className="absolute -top-24 -start-24 w-48 h-48 rounded-full bg-[#7C5CFF]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -end-24 w-48 h-48 rounded-full bg-[#FF5C8A]/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="auth-close-btn"
          onClick={onClose}
          aria-label={t.settingsMenu.close}
          className="absolute top-4 end-4 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Samurai Warrior Illustration Crest */}
        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
            {/* Golden Crescent Moon Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFC94D]/30 via-transparent to-[#7C5CFF]/30 blur-md animate-pulse" />
            
            {/* Samurai Helmet & Katana Silhouette SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 drop-shadow-[0_0_12px_rgba(255,92,138,0.7)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Golden Crescent Moon Maedate Crest */}
              <path
                d="M 50 12 C 55 18, 55 24, 50 30 C 58 27, 65 18, 50 12 Z"
                fill="#FFC94D"
              />
              <path
                d="M 28 22 C 40 14, 60 14, 72 22 C 60 18, 40 18, 28 22 Z"
                fill="#FFC94D"
              />

              {/* Samurai Kabuto Helmet */}
              <path
                d="M 30 32 Q 50 25, 70 32 Q 74 44, 70 56 Q 50 50, 30 56 Q 26 44, 30 32 Z"
                fill="#161228"
                stroke="#7C5CFF"
                strokeWidth="2"
              />

              {/* Glowing Pink/Violet Warrior Visor / Eyes */}
              <circle cx="43" cy="42" r="3" fill="#FF5C8A" className="animate-ping" />
              <circle cx="43" cy="42" r="2" fill="#FFFFFF" />
              <circle cx="57" cy="42" r="3" fill="#FF5C8A" className="animate-ping" />
              <circle cx="57" cy="42" r="2" fill="#FFFFFF" />

              {/* Menpo Face Mask with Katana blade guard */}
              <path
                d="M 35 52 Q 50 62, 65 52 L 62 66 Q 50 72, 38 66 Z"
                fill="#110E20"
                stroke="#FF5C8A"
                strokeWidth="1.5"
              />
              {/* Crossed mini katanas */}
              <line x1="26" y1="70" x2="74" y2="70" stroke="#FFC94D" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t.auth.loginTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            {t.auth.loginSubtitle}
          </p>
        </div>

        {/* Tab Switcher: Login / Register */}
        <div className="grid grid-cols-2 p-1 bg-white/[0.04] border border-white/10 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-[#7C5CFF] to-[#6039F5] text-white shadow-lg shadow-purple-950/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.auth.tabLogin}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              authMode === 'register'
                ? 'bg-gradient-to-r from-[#FF5C8A] to-[#E6396E] text-white shadow-lg shadow-pink-950/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.auth.tabRegister}
          </button>
        </div>

        {/* Success Alert */}
        {successToast && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.auth.loginSuccess}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email / Tag */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.auth.emailOrUsername}
            </label>
            <div className="relative flex items-center">
              <span className="absolute start-3 text-slate-500">
                {authMode === 'login' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </span>
              <input
                type="text"
                required
                value={emailOrTag}
                onChange={(e) => setEmailOrTag(e.target.value)}
                placeholder={t.auth.emailPlaceholder}
                className="w-full h-11 ps-10 pe-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7C5CFF] focus:ring-2 focus:ring-[#7C5CFF]/30 transition-all"
              />
            </div>
          </div>

          {/* Optional Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.auth.phone}
            </label>
            <div className="relative flex items-center">
              <span className="absolute start-3 text-slate-500">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.auth.phonePlaceholder}
                className="w-full h-11 ps-10 pe-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7C5CFF] focus:ring-2 focus:ring-[#7C5CFF]/30 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.auth.password}
              </label>
              {authMode === 'login' && (
                <button
                  type="button"
                  className="text-[11px] text-[#7C5CFF] hover:underline"
                >
                  {t.auth.forgotPassword}
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="absolute start-3 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.auth.passwordPlaceholder}
                className="w-full h-11 ps-10 pe-10 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7C5CFF] focus:ring-2 focus:ring-[#7C5CFF]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="auth-submit-btn"
            type="submit"
            className="w-full h-11 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg mt-2 cursor-pointer"
            style={{
              background:
                authMode === 'login'
                  ? 'linear-gradient(135deg, #7C5CFF, #FF5C8A)'
                  : 'linear-gradient(135deg, #FF5C8A, #FFC94D)',
              boxShadow: '0 0 20px rgba(124, 92, 255, 0.4)',
            }}
          >
            <span>{authMode === 'login' ? t.auth.submitLogin : t.auth.submitRegister}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </form>

        {/* Social Fast Logins */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <span className="block text-center text-[11px] text-slate-500 mb-3">
            {t.auth.orContinueWith}
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onLoginSuccess(isRtl ? 'أوتاكو Google' : 'Google Warrior');
                onClose();
              }}
              className="h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 text-xs font-medium text-slate-300 transition-colors"
            >
              <span className="font-bold text-[#4DD8FF]">G</span>
              <span className="text-[11px]">Google</span>
            </button>

            <button
              onClick={() => {
                onLoginSuccess(isRtl ? 'أوتاكو Apple' : 'Apple Warrior');
                onClose();
              }}
              className="h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 text-xs font-medium text-slate-300 transition-colors"
            >
              <span className="font-bold text-white"></span>
              <span className="text-[11px]">Apple</span>
            </button>

            <button
              onClick={() => {
                onLoginSuccess(isRtl ? 'أوتاكو Discord' : 'Discord Warrior');
                onClose();
              }}
              className="h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 text-xs font-medium text-slate-300 transition-colors"
            >
              <span className="font-bold text-[#7C5CFF]">✦</span>
              <span className="text-[11px]">Discord</span>
            </button>
          </div>
        </div>

        {/* Guest Bypass button to explore empty sections */}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-[#FFC94D] transition-colors flex items-center justify-center gap-1.5 mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC94D]" />
            <span>{t.auth.guestBypass}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
