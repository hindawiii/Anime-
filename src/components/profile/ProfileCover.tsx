import React, { useState, useRef, useEffect } from 'react';
import { Eye, Camera, Sparkles, Upload, X, Layers } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { PRESET_COVERS } from '../../data/profileData';

interface ProfileCoverProps {
  lang: Language;
  onPreview: (imgUrl: string, title: string) => void;
}

export const ProfileCover: React.FC<ProfileCoverProps> = ({ lang, onPreview }) => {
  const t = translations[lang].profileMedia;
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // Two covers saved in localStorage
  const [cover1, setCover1] = useState<string>(() => {
    return localStorage.getItem('otaku_cover_1') || PRESET_COVERS[0];
  });
  const [cover2, setCover2] = useState<string>(() => {
    return localStorage.getItem('otaku_cover_2') || PRESET_COVERS[1] || PRESET_COVERS[0];
  });

  // Active cover index: 0 or 1
  const [activeCoverIdx, setActiveCoverIdx] = useState<0 | 1>(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<1 | 2>(1);

  // Automatic Rotation every 5 seconds (5000ms) with smooth crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCoverIdx((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentCoverUrl = activeCoverIdx === 0 ? cover1 : cover2;

  const handleSelectPreset = (url: string) => {
    if (editingSlot === 1) {
      setCover1(url);
      localStorage.setItem('otaku_cover_1', url);
    } else {
      setCover2(url);
      localStorage.setItem('otaku_cover_2', url);
    }
    setIsPickerOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slot: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (slot === 1) {
            setCover1(reader.result);
            localStorage.setItem('otaku_cover_1', reader.result);
          } else {
            setCover2(reader.result);
            localStorage.setItem('otaku_cover_2', reader.result);
          }
          setIsPickerOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={() => onPreview(currentCoverUrl, `${t.previewCover} (${activeCoverIdx + 1}/2)`)}
      title="اضغط لمعاينة الغلاف بالحجم الكامل"
      className="relative w-full h-44 sm:h-60 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-zoom-in transition-all select-none"
    >
      {/* Background Cover Image 1 */}
      <img
        src={cover1}
        alt="Otaku Profile Cover 1"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
          activeCoverIdx === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Background Cover Image 2 */}
      <img
        src={cover2}
        alt="Otaku Profile Cover 2"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
          activeCoverIdx === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B18] via-black/35 to-black/25 pointer-events-none" />

      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Subtle Tap-to-Preview Icon Hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#7C5CFF] flex items-center justify-center shadow-xl">
          <Eye className="w-5 h-5" />
        </div>
      </div>

      {/* Dual Cover Indicator & Manual Switcher (Bottom-Start corner) */}
      <div
        className="absolute bottom-3 start-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Layers className="w-3 h-3 text-[#4DD8FF]" />
        <button
          onClick={() => setActiveCoverIdx(0)}
          className={`px-1.5 py-0.5 rounded-full font-bold transition-all ${
            activeCoverIdx === 0 ? 'bg-[#7C5CFF] text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
          title="الغلاف الأول | Cover 1"
        >
          1
        </button>
        <button
          onClick={() => setActiveCoverIdx(1)}
          className={`px-1.5 py-0.5 rounded-full font-bold transition-all ${
            activeCoverIdx === 1 ? 'bg-[#FF5C8A] text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
          title="الغلاف الثاني | Cover 2"
        >
          2
        </button>
        <span className="text-[9px] text-slate-400 ms-1 font-mono">5s ↺</span>
      </div>

      {/* Micro-Button Toolbar (Top-End corner) - Only Camera to change cover, download is inside preview modal! */}
      <div
        className="absolute top-3 end-3 flex items-center gap-2 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPickerOpen(!isPickerOpen);
          }}
          title={t.changeCover}
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/75 hover:bg-[#FF5C8A] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef1}
        onChange={(e) => handleFileUpload(e, 1)}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputRef2}
        onChange={(e) => handleFileUpload(e, 2)}
        accept="image/*"
        className="hidden"
      />

      {/* Floating Preset & Upload Picker Modal with Safe Spacing */}
      {isPickerOpen && (
        <div
          className="absolute inset-0 bg-[#0B0B18]/95 backdrop-blur-2xl z-30 p-4 sm:p-5 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with safe spacing from close button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm pe-6">
              <Sparkles className="w-4 h-4 text-[#FF5C8A]" />
              <span>{t.changeCover} (تبديل تلقائي كل 5 ثوانٍ)</span>
            </div>
            <button
              onClick={() => setIsPickerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              title="إغلاق | Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Slot Selector: Choose which cover to modify (Cover 1 or Cover 2) */}
          <div className="flex items-center gap-2 my-1.5">
            <span className="text-xs text-slate-300 font-medium">تعديل أي غلاف:</span>
            <button
              onClick={() => setEditingSlot(1)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                editingSlot === 1
                  ? 'bg-[#7C5CFF] text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              الغلاف 1 (الحالي)
            </button>
            <button
              onClick={() => setEditingSlot(2)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                editingSlot === 2
                  ? 'bg-[#FF5C8A] text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              الغلاف 2 (التلقائي)
            </button>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
            {PRESET_COVERS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset)}
                className={`relative h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all group/preset ${
                  (editingSlot === 1 ? cover1 : cover2) === preset
                    ? 'border-[#FF5C8A] ring-2 ring-[#FF5C8A]/40'
                    : 'border-white/10 hover:border-white/40'
                }`}
              >
                <img
                  src={preset}
                  alt={`Preset ${idx + 1}`}
                  className="w-full h-full object-cover group-hover/preset:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Upload Custom Image Button */}
          <button
            onClick={() => {
              if (editingSlot === 1) fileInputRef1.current?.click();
              else fileInputRef2.current?.click();
            }}
            className="w-full h-9 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#FF5C8A] hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t.uploadCustom} (للغلاف {editingSlot})</span>
          </button>
        </div>
      )}
    </div>
  );
};
