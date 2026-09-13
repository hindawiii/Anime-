import { useState, useEffect } from 'react';
import { TabType, Language } from './types';
import { Header } from './components/Header';
import { KatanaBottomNav } from './components/KatanaBottomNav';
import { SettingsDrawer } from './components/SettingsDrawer';
import { AuthModal } from './components/AuthModal';

// 5 Main Sections (Empty shells ready to be populated later)
import { AnimeMangaSection } from './components/sections/AnimeMangaSection';
import { WansaSection } from './components/sections/WansaSection';
import { GamesSection } from './components/sections/GamesSection';
import { OtakuArenaSection } from './components/sections/OtakuArenaSection';
import { ProfileSection } from './components/sections/ProfileSection';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<TabType>('anime');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [neonEnabled, setNeonEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userName, setUserName] = useState<string>('');

  // Synchronize dynamic dir and lang attributes on document
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Subtle web audio synthesizer for Katana Slash & Button clicks
  const playKatanaSlash = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // AudioContext might be blocked before user gesture; gracefully ignore
    }
  };

  const handleTabChange = (tab: TabType) => {
    playKatanaSlash();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = () => {
    playKatanaSlash();
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen bg-[#0B0B18] text-slate-100 flex flex-col font-sans selection:bg-[#7C5CFF]/30 selection:text-white relative">
      
      {/* Background Ambient Neon Glows matching active section */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 start-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
          style={{
            backgroundColor:
              activeTab === 'anime'
                ? '#7C5CFF'
                : activeTab === 'wansa'
                ? '#FF5C8A'
                : activeTab === 'games'
                ? '#4DD8FF'
                : activeTab === 'arena'
                ? '#FFC94D'
                : '#A855F7',
          }}
        />
        <div className="absolute top-1/3 -start-32 w-80 h-80 rounded-full bg-[#7C5CFF]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 -end-32 w-80 h-80 rounded-full bg-[#FF5C8A]/10 blur-[100px]" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {/* Top Header with prominent Settings Button (top-left) and Otaku Brand */}
        <Header
          lang={lang}
          onOpenSettings={() => setIsSettingsOpen(true)}
          activeTab={activeTab}
          neonEnabled={neonEnabled}
        />

        {/* Active Section Content (Completely Empty Shells) */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-32">
          {activeTab === 'anime' && <AnimeMangaSection />}
          {activeTab === 'wansa' && <WansaSection />}
          {activeTab === 'games' && <GamesSection />}
          {activeTab === 'arena' && <OtakuArenaSection />}
          {activeTab === 'profile' && <ProfileSection />}
        </main>

        {/* Katana Sword Bottom Navigation Bar - Fixed & Docked at Bottom */}
        <KatanaBottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          lang={lang}
          neonEnabled={neonEnabled}
        />
      </div>

      {/* Settings Drawer (with all requested buttons: Profile, About, Privacy, Clear Cache, Logout, etc.) */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
        onToggleLang={handleToggleLang}
        neonEnabled={neonEnabled}
        onToggleNeon={() => setNeonEnabled(!neonEnabled)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Auth / Warrior Gate Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
        onLoginSuccess={(name) => {
          setUserName(name);
          playKatanaSlash();
        }}
      />
    </div>
  );
}
