import React, { useEffect } from 'react';
import { X, Download, ZoomIn } from 'lucide-react';

interface ImagePreviewModalProps {
  isOpen?: boolean;
  onClose: () => void;
  imageUrl: string | null | undefined;
  title: string;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen = true,
  onClose,
  imageUrl,
  title,
}) => {
  // ESC key listener to close modal seamlessly
  useEffect(() => {
    if (!isOpen && !imageUrl) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, imageUrl, onClose]);

  // If closed or no image URL provided, return null
  if ((isOpen === false) || !imageUrl) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `otaku-sama-${Date.now()}.jpg`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-zoom-out"
      onClick={onClose}
    >
      {/* Top Floating Control Bar with Safe Spacing between Title and Controls */}
      <div
        className="w-full max-w-5xl flex items-center justify-between pb-3 z-10 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Container with guaranteed safe end padding */}
        <div className="flex items-center gap-2.5 text-white font-bold text-xs sm:text-sm truncate pe-6 max-w-[60%] sm:max-w-[75%]">
          <div className="w-8 h-8 rounded-xl bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30 flex items-center justify-center shrink-0">
            <ZoomIn className="w-4 h-4" />
          </div>
          <span className="truncate font-semibold">{title}</span>
        </div>

        {/* Right Actions: Download & Close with Safe Gap */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleDownload}
            className="h-9 px-3.5 rounded-xl bg-[#7C5CFF] hover:bg-[#6847FA] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-[#7C5CFF]/20 active:scale-95"
            title="تحميل الصورة عالية الدقة | Download Full Resolution"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">تحميل | Download</span>
          </button>
          
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl bg-white/10 hover:bg-red-500 text-white flex items-center justify-center transition-all shadow-md active:scale-95 border border-white/10"
            title="إغلاق | Close (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Image Container with Responsive Fit & Cyber Frame */}
      <div
        className="relative max-w-5xl max-h-[82vh] overflow-hidden rounded-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex items-center justify-center bg-[#070810] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={title}
          className="max-w-full max-h-[82vh] w-auto h-auto object-contain select-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Subtle Bottom Helper Caption */}
      <div
        className="mt-3 text-[11px] text-slate-400 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm cursor-default flex items-center gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        <span>انقر في أي مكان خارج الإطار أو اضغط ESC للإغلاق</span>
      </div>
    </div>
  );
};
