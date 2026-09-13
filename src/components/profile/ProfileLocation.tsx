import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Edit2, Check, X, Loader2, Compass } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';

interface ProfileLocationProps {
  lang: Language;
}

export const ProfileLocation: React.FC<ProfileLocationProps> = ({ lang }) => {
  const t = translations[lang].profileLocation;
  const [location, setLocation] = useState<string>(() => {
    return localStorage.getItem('otaku_user_location') || t.defaultLocation;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(location);
  const [isLoadingGps, setIsLoadingGps] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Update default text when language toggles if it's still default
  useEffect(() => {
    const saved = localStorage.getItem('otaku_user_location');
    if (!saved) {
      setLocation(t.defaultLocation);
      setInputValue(t.defaultLocation);
    }
  }, [lang, t.defaultLocation]);

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setLocation(trimmed);
      localStorage.setItem('otaku_user_location', trimmed);
    }
    setIsEditing(false);
  };

  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setStatusMessage(t.gpsError);
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    setIsLoadingGps(true);
    setStatusMessage(t.detecting);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${lang}`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.state ||
              data.address?.country ||
              `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`;
            const country = data.address?.country || '';
            const fullLoc = country && city !== country ? `${city}، ${country}` : city;

            setLocation(fullLoc);
            setInputValue(fullLoc);
            localStorage.setItem('otaku_user_location', fullLoc);
            setStatusMessage(t.gpsSuccess);
          } else {
            const coordStr = `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E (GPS)`;
            setLocation(coordStr);
            setInputValue(coordStr);
            localStorage.setItem('otaku_user_location', coordStr);
            setStatusMessage(t.gpsSuccess);
          }
        } catch {
          const coordStr = `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`;
          setLocation(coordStr);
          setInputValue(coordStr);
          localStorage.setItem('otaku_user_location', coordStr);
          setStatusMessage(t.gpsSuccess);
        } finally {
          setIsLoadingGps(false);
          setTimeout(() => setStatusMessage(null), 2500);
        }
      },
      () => {
        setIsLoadingGps(false);
        setStatusMessage(t.gpsError);
        setTimeout(() => setStatusMessage(null), 3000);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div
        id="profile-location-bar"
        className="w-full bg-gradient-to-r from-[#12142B]/90 via-[#0F1124]/90 to-[#12142B]/90 border border-white/10 hover:border-[#7C5CFF]/40 rounded-2xl px-4 py-2.5 backdrop-blur-xl transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.4)] flex items-center justify-between gap-3 group"
      >
        {/* Left Side: Cyber Neon GPS Pin & Safe-Spaced Location Details */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C5CFF]/25 to-[#4DD8FF]/15 text-[#4DD8FF] border border-[#7C5CFF]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(124,92,255,0.2)]">
            <Compass className="w-4 h-4 animate-[spin_12s_linear_infinite]" />
            <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B0B18] animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase text-[#7C5CFF] tracking-wider block font-sans">
                {t.label}
              </span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">GPS Active</span>
            </div>

            {isEditing ? (
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder={t.enterCity}
                  className="w-full bg-[#171A38] border border-[#7C5CFF]/60 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#7C5CFF]"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="w-8 h-8 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
                  title={t.save}
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setInputValue(location);
                    setIsEditing(false);
                  }}
                  className="w-8 h-8 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
                  title={t.cancel}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF5C8A] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-sm">
                  {location}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors opacity-70 group-hover:opacity-100 ms-1"
                  title={t.manualEdit}
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Quick GPS Auto-Detect Button with Safe Spacing */}
        {!isEditing && (
          <button
            onClick={handleDetectGps}
            disabled={isLoadingGps}
            title={t.detectGps}
            className="h-9 px-3 rounded-xl bg-white/[0.05] hover:bg-[#7C5CFF]/20 text-slate-200 hover:text-white border border-white/15 hover:border-[#7C5CFF]/50 text-xs font-semibold flex items-center gap-2 shrink-0 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
          >
            {isLoadingGps ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4DD8FF]" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-[#4DD8FF]" />
            )}
            <span className="hidden sm:inline text-xs">{t.detectGps}</span>
          </button>
        )}
      </div>

      {/* Ephemeral Notification Toast */}
      {statusMessage && (
        <span className="text-[11px] text-amber-300 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/25 animate-in fade-in shadow-md">
          {statusMessage}
        </span>
      )}
    </div>
  );
};
