import React, { useState } from 'react';
import {
  X,
  QrCode,
  Search,
  CheckCircle2,
  UserPlus,
  ExternalLink,
  Sparkles,
  Camera,
  Shield,
  Award,
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { OtakuSamaLogo } from '../OtakuSamaLogo';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang].profileActions;
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'qr' | 'search'>('qr');
  const [searchQuery, setSearchQuery] = useState('');
  const [friendResult, setFriendResult] = useState<{
    id: string;
    name: string;
    rank: string;
    avatar: string;
    favAnime: string;
  } | null>(null);

  const [isAdded, setIsAdded] = useState(false);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;

    // Simulated Warrior Lookup Result
    setFriendResult({
      id: q.startsWith('#') ? q : `#${q}`,
      name: isAr ? 'رين غوكو | Kyojuro' : 'Rengoku Kyojuro',
      rank: isAr ? 'هاشيرا اللهب الأسطوري' : 'Flame Hashira',
      avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80',
      favAnime: isAr ? 'قاتل الشياطين (Demon Slayer)' : 'Demon Slayer',
    });
    setIsAdded(false);
  };

  const handleSimulateQrScan = () => {
    // Simulating QR detect
    setFriendResult({
      id: '#KAW-7721-WARRIOR',
      name: isAr ? 'ميكاسا أكرمان | Mikasa' : 'Mikasa Ackerman',
      rank: isAr ? 'نخبة فيلق الاستطلاع' : 'Survey Corps Elite',
      avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80',
      favAnime: isAr ? 'هجوم العمالقة (Attack on Titan)' : 'Attack on Titan',
    });
    setIsAdded(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#141630] via-[#0E1022] to-[#0A0B16] border-2 border-[#4DD8FF]/40 p-6 sm:p-7 shadow-[0_25px_65px_rgba(77,216,255,0.25)] overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Glow Ambient */}
        <div className="absolute -top-16 -start-16 w-44 h-44 rounded-full bg-[#4DD8FF]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -end-16 w-44 h-44 rounded-full bg-[#7C5CFF]/20 blur-3xl pointer-events-none" />

        {/* Modal Header with safe gap to close button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3 pe-8">
            <div className="w-10 h-10 rounded-2xl bg-[#4DD8FF]/20 border border-[#4DD8FF]/40 flex items-center justify-center text-[#4DD8FF] shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {t.scannerTitle}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.scannerSubtitle}
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

        {/* Tab Switcher: Smart Camera vs ID Search */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/[0.05] border border-white/10 my-4">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'qr'
                ? 'bg-[#4DD8FF] text-[#0A0B16] shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t.scanQrTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'search'
                ? 'bg-[#7C5CFF] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t.searchIdTab}</span>
          </button>
        </div>

        {/* TAB 1: Smart Cyberpunk HUD QR Scanner */}
        {activeTab === 'qr' && (
          <div className="flex flex-col items-center">
            {/* HUD Viewfinder */}
            <div
              onClick={handleSimulateQrScan}
              className="relative w-60 h-60 rounded-3xl bg-[#090A14] border-2 border-white/10 flex items-center justify-center overflow-hidden my-2 cursor-pointer group shadow-inner"
              title="اضغط لمحاكاة التقاط بطاقة هوية الصديق | Click to scan"
            >
              {/* Radar Scanning Line Animation */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4DD8FF] to-transparent shadow-[0_0_15px_#4DD8FF] animate-[bounce_3s_infinite]" />

              {/* Viewfinder Corner Brackets */}
              <div className="absolute top-3 start-3 w-6 h-6 border-t-2 border-s-2 border-[#4DD8FF]" />
              <div className="absolute top-3 end-3 w-6 h-6 border-t-2 border-e-2 border-[#4DD8FF]" />
              <div className="absolute bottom-3 start-3 w-6 h-6 border-b-2 border-s-2 border-[#4DD8FF]" />
              <div className="absolute bottom-3 end-3 w-6 h-6 border-b-2 border-e-2 border-[#4DD8FF]" />

              <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-white transition-colors text-center px-4">
                <QrCode className="w-12 h-12 text-[#4DD8FF] animate-pulse" />
                <span className="text-[11px] font-semibold">
                  وجّه الكاميرا نحو بطاقة الأوتاكو للصديق
                </span>
                <span className="text-[10px] text-[#4DD8FF] bg-[#4DD8FF]/10 px-2 py-0.5 rounded-md border border-[#4DD8FF]/20">
                  (انقر هنا للمحاكاة الفورية)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Search by Warrior ID */}
        {activeTab === 'search' && (
          <div className="flex flex-col gap-3 my-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={t.enterWarriorId}
                className="flex-1 bg-[#121428] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#7C5CFF]"
              />
              <button
                onClick={handleSearch}
                className="h-10 px-4 rounded-xl bg-[#7C5CFF] hover:bg-[#6847FA] text-white text-xs font-bold transition-all shrink-0 active:scale-95"
              >
                {t.searchBtn}
              </button>
            </div>
          </div>
        )}

        {/* Friend Result Card (Appears on scan or search) */}
        {friendResult && (
          <div className="mt-4 p-4 rounded-2xl bg-[#12142A] border border-emerald-500/30 animate-in fade-in zoom-in-95 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src={friendResult.avatar}
                alt={friendResult.name}
                className="w-12 h-12 rounded-xl object-cover border border-white/20 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {friendResult.name}
                  </h4>
                  <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <span className="text-[11px] text-[#4DD8FF] font-mono block">
                  {friendResult.id}
                </span>
                <span className="text-[10px] text-amber-300 block">
                  {friendResult.rank} • {friendResult.favAnime}
                </span>
              </div>
            </div>

            {/* Friend Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setIsAdded(true)}
                disabled={isAdded}
                className={`flex-1 h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isAdded
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تمت الإضافة بنجاح!</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{t.addFriend}</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="px-3.5 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                {t.viewFriendProfile}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
