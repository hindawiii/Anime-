import { motion } from 'motion/react';
import { TabType } from '../types';

interface KatanaSwordGraphicProps {
  activeTab: TabType;
  color: string;
  glowColor: string;
  neonEnabled?: boolean;
  className?: string;
}

export const KatanaSwordGraphic = ({
  activeTab = 'anime',
  color = '#7C5CFF',
  glowColor = 'rgba(124, 92, 255, 0.7)',
  neonEnabled = true,
  className = '',
}: KatanaSwordGraphicProps) => {
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 sm:h-10 transition-all duration-500"
      >
        <defs>
          {/* 1. Tanjiro Sun-Blade Gradient (Matte obsidian black with silver edge) */}
          <linearGradient id="bladeTanjiro" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0B14" />
            <stop offset="25%" stopColor="#1A1829" />
            <stop offset="60%" stopColor="#252438" />
            <stop offset="90%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#0B0B14" />
          </linearGradient>

          {/* 2. Muichiro Mist-Blade Gradient (Emerald / turquoise mist steel) */}
          <linearGradient id="bladeMist" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="30%" stopColor="#0F766E" />
            <stop offset="70%" stopColor="#5EEAD4" />
            <stop offset="90%" stopColor="#CCFBF1" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          {/* 3. Zenitsu Thunder-Blade Gradient (Deep storm charcoal with gold sparks) */}
          <linearGradient id="bladeThunder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="35%" stopColor="#27272A" />
            <stop offset="65%" stopColor="#EAB308" />
            <stop offset="85%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#18181B" />
          </linearGradient>

          {/* 4. Rengoku Flame-Blade Gradient (Volcanic obsidian with burning crimson) */}
          <linearGradient id="bladeFlame" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#450A0A" />
            <stop offset="30%" stopColor="#991B1B" />
            <stop offset="65%" stopColor="#EA580C" />
            <stop offset="85%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>

          {/* 5. Imperial Samurai Damascus Steel Gradient (Mirror silver with violet tint) */}
          <linearGradient id="bladeSamurai" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="25%" stopColor="#4338CA" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          {/* Hamon Neon Slashing Gradients */}
          <linearGradient id="hamonSun" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="hamonMist" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="hamonThunder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FACC15" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FACC15" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="hamonFlame" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFC94D" stopOpacity="1" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="hamonSamurai" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.3" />
          </linearGradient>

          {/* Blade Glow Filter */}
          <filter id="swordGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ==================== 1. TSUKA (HANDLE / GRIP) ==================== */}
        <g id="katana-handle">
          {/* Base Grip Bar */}
          <path
            d="M 12 32 Q 25 30.5, 52 30.5 L 52 35.5 Q 25 35.5, 12 34 Z"
            fill={
              activeTab === 'arena' || activeTab === 'games'
                ? '#F8FAFC' // White Tsuka for Rengoku and Zenitsu
                : '#0F172A' // Dark Tsuka for Tanjiro, Muichiro, and Samurai
            }
            stroke="#475569"
            strokeWidth="0.8"
          />

          {/* Kashira (Handle Butt Cap) */}
          <path
            d="M 10 31.5 Q 12 31.5, 13 32 L 13 34.5 Q 12 35, 10 34.5 Z"
            fill={
              activeTab === 'games' || activeTab === 'wansa' || activeTab === 'profile'
                ? '#F59E0B'
                : '#334155'
            }
            stroke="#1E293B"
            strokeWidth="0.5"
          />

          {/* Dynamic Tsuka-Ito Diamond Braids based on active sword */}
          {activeTab === 'anime' && (
            // Tanjiro: Black wrap over crimson red
            <g opacity="0.9">
              <path d="M 18 31 L 22 35 M 22 31 L 18 35" stroke="#E11D48" strokeWidth="1.2" />
              <path d="M 26 31 L 30 35 M 30 31 L 26 35" stroke="#E11D48" strokeWidth="1.2" />
              <path d="M 34 31 L 38 35 M 38 31 L 34 35" stroke="#E11D48" strokeWidth="1.2" />
              <path d="M 42 31 L 46 35 M 46 31 L 42 35" stroke="#E11D48" strokeWidth="1.2" />
            </g>
          )}

          {activeTab === 'wansa' && (
            // Muichiro: Black wrap over emerald green
            <g opacity="0.9">
              <path d="M 18 31 L 22 35 M 22 31 L 18 35" stroke="#10B981" strokeWidth="1.2" />
              <path d="M 26 31 L 30 35 M 30 31 L 26 35" stroke="#10B981" strokeWidth="1.2" />
              <path d="M 34 31 L 38 35 M 38 31 L 34 35" stroke="#10B981" strokeWidth="1.2" />
              <path d="M 42 31 L 46 35 M 46 31 L 42 35" stroke="#10B981" strokeWidth="1.2" />
            </g>
          )}

          {activeTab === 'games' && (
            // Zenitsu: White wrap over bright thunder yellow
            <g opacity="0.95">
              <path d="M 18 31 L 22 35 M 22 31 L 18 35" stroke="#FACC15" strokeWidth="1.3" />
              <path d="M 26 31 L 30 35 M 30 31 L 26 35" stroke="#FACC15" strokeWidth="1.3" />
              <path d="M 34 31 L 38 35 M 38 31 L 34 35" stroke="#FACC15" strokeWidth="1.3" />
              <path d="M 42 31 L 46 35 M 46 31 L 42 35" stroke="#FACC15" strokeWidth="1.3" />
            </g>
          )}

          {activeTab === 'arena' && (
            // Rengoku: White silk with flaming red diamond under-shadow
            <g opacity="0.95">
              <path d="M 18 31 L 22 35 M 22 31 L 18 35" stroke="#DC2626" strokeWidth="1.3" />
              <path d="M 26 31 L 30 35 M 30 31 L 26 35" stroke="#EA580C" strokeWidth="1.3" />
              <path d="M 34 31 L 38 35 M 38 31 L 34 35" stroke="#DC2626" strokeWidth="1.3" />
              <path d="M 42 31 L 46 35 M 46 31 L 42 35" stroke="#EA580C" strokeWidth="1.3" />
            </g>
          )}

          {activeTab === 'profile' && (
            // Samurai: Regal gold and violet wraps
            <g opacity="0.9">
              <path d="M 18 31 L 22 35 M 22 31 L 18 35" stroke="#A855F7" strokeWidth="1.2" />
              <path d="M 26 31 L 30 35 M 30 31 L 26 35" stroke="#A855F7" strokeWidth="1.2" />
              <path d="M 34 31 L 38 35 M 38 31 L 34 35" stroke="#A855F7" strokeWidth="1.2" />
              <path d="M 42 31 L 46 35 M 46 31 L 42 35" stroke="#A855F7" strokeWidth="1.2" />
            </g>
          )}
        </g>

        {/* ==================== 2. TSUBA (DYNAMIC SWORD GUARD) ==================== */}
        <g id="katana-tsuba" className="transition-all duration-300">
          {/* A. Tanjiro Sun-Wheel Tsuba (Demon Slayer Sun-Breathing Wheel) */}
          {activeTab === 'anime' && (
            <g>
              <ellipse cx="56" cy="33" rx="6.5" ry="14" fill="#181824" stroke="#7C5CFF" strokeWidth="1.6" />
              {/* Radial spokes of the sunburst wheel */}
              <line x1="56" y1="20" x2="56" y2="46" stroke="#94A3B8" strokeWidth="1" />
              <line x1="51" y1="23" x2="61" y2="43" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="51" y1="43" x2="61" y2="23" stroke="#94A3B8" strokeWidth="0.8" />
              <ellipse cx="56" cy="33" rx="2.5" ry="5" fill="#0B0B14" stroke="#CBD5E1" strokeWidth="0.8" />
            </g>
          )}

          {/* B. Muichiro Geometric Mist Tsuba (Interlocking Golden Rectangles) */}
          {activeTab === 'wansa' && (
            <g>
              {/* Outer Golden Rectangular Guard */}
              <rect x="49" y="21" width="14" height="24" rx="2" fill="#2E234B" stroke="#F59E0B" strokeWidth="2.2" />
              {/* 4 Corner Interlocking Geometric Cutouts */}
              <rect x="47" y="19" width="4" height="4" fill="#0B0B18" stroke="#F59E0B" strokeWidth="1.2" />
              <rect x="61" y="19" width="4" height="4" fill="#0B0B18" stroke="#F59E0B" strokeWidth="1.2" />
              <rect x="47" y="43" width="4" height="4" fill="#0B0B18" stroke="#F59E0B" strokeWidth="1.2" />
              <rect x="61" y="43" width="4" height="4" fill="#0B0B18" stroke="#F59E0B" strokeWidth="1.2" />
              <line x1="56" y1="22" x2="56" y2="44" stroke="#10B981" strokeWidth="1.2" />
            </g>
          )}

          {/* C. Zenitsu Clover Lightning Tsuba (Golden 4-Petal Flower Guard) */}
          {activeTab === 'games' && (
            <g>
              {/* 4-Lobed Golden Clover / Trefoil Contour */}
              <path
                d="M 56 19 C 61 19, 64 24, 62 28 C 66 29, 66 37, 62 38 C 64 42, 61 47, 56 47 C 51 47, 48 42, 50 38 C 46 37, 46 29, 50 28 C 48 24, 51 19, 56 19 Z"
                fill="#FEF08A"
                stroke="#CA8A04"
                strokeWidth="2"
              />
              <ellipse cx="56" cy="33" rx="4" ry="8" fill="#18182E" stroke="#EAB308" strokeWidth="1" />
              {/* Silver inner ring rivets */}
              <circle cx="56" cy="23" r="1" fill="#FFFFFF" />
              <circle cx="56" cy="43" r="1" fill="#FFFFFF" />
            </g>
          )}

          {/* D. Rengoku Fiery Flame Tsuba (Flame Hashira Licking Flame Guard) */}
          {activeTab === 'arena' && (
            <g>
              {/* Outer Vibrant Orange Flame Border */}
              <path
                d="M 52 33 C 48 22, 58 18, 65 21 C 67 24, 65 27, 69 25 C 73 23, 73 30, 68 33 C 73 36, 73 43, 69 41 C 65 39, 67 42, 65 45 C 58 48, 48 44, 52 33 Z"
                fill="#EA580C"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              {/* Inner Deep Crimson/Black Flame Core */}
              <path
                d="M 54 33 C 51 25, 58 22, 62 24 C 63 26, 61 28, 64 27 C 67 25, 66 31, 63 33 C 66 35, 67 41, 64 39 C 61 38, 63 40, 62 42 C 58 44, 51 41, 54 33 Z"
                fill="#450A0A"
                stroke="#DC2626"
                strokeWidth="1"
              />
            </g>
          )}

          {/* E. Legendary Imperial Samurai Tsuba */}
          {activeTab === 'profile' && (
            <g>
              <ellipse cx="56" cy="33" rx="6" ry="14" fill="#2A1B4E" stroke="#C084FC" strokeWidth="2" />
              {/* Sakura flower petal insets */}
              <ellipse cx="56" cy="33" rx="3.5" ry="9" fill="#0F0B1E" stroke="#E2E8F0" strokeWidth="0.8" />
              <circle cx="56" cy="24" r="1.2" fill="#FFC94D" />
              <circle cx="56" cy="42" r="1.2" fill="#FFC94D" />
            </g>
          )}

          {/* Habaki (Gold / Silver blade collar) */}
          <rect
            x="64"
            y="30"
            width="10"
            height="6"
            rx="1"
            fill={activeTab === 'anime' ? '#E2E8F0' : '#EAB308'}
            stroke={activeTab === 'anime' ? '#94A3B8' : '#A16207'}
            strokeWidth="0.8"
          />
        </g>

        {/* ==================== 3. KATANA BLADE BODY & SPINE ==================== */}
        <g id="katana-blade">
          {/* Main Curved Blade Spine (Mine) with gentle authentic curvature */}
          <path
            d="M 74 31 Q 400 18, 770 28 L 785 32 Q 400 24, 74 34 Z"
            fill={
              activeTab === 'anime'
                ? 'url(#bladeTanjiro)'
                : activeTab === 'wansa'
                ? 'url(#bladeMist)'
                : activeTab === 'games'
                ? 'url(#bladeThunder)'
                : activeTab === 'arena'
                ? 'url(#bladeFlame)'
                : 'url(#bladeSamurai)'
            }
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />

          {/* Kissaki (Sharp Blade Tip) */}
          <path d="M 770 28 L 785 32 L 770 34 Z" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* ==================== 4. DYNAMIC HAMON (TEMPER CUTTING LINE) ==================== */}
        <g id="katana-hamon">
          {/* A. Tanjiro: Straight Solar Temper Line with High-Frequency Ripples */}
          {activeTab === 'anime' && (
            <path
              d="M 76 33 Q 160 32, 220 33.5 T 380 32 T 540 33 T 690 31.5 T 770 30"
              stroke="url(#hamonSun)"
              strokeWidth="2.8"
              filter={neonEnabled ? 'url(#swordGlow)' : undefined}
              strokeLinecap="round"
            />
          )}

          {/* B. Muichiro: Flowing Turquoise Mist Waves */}
          {activeTab === 'wansa' && (
            <path
              d="M 76 33 Q 130 30.5, 180 33.5 T 290 31 T 400 33.5 T 520 31 T 640 33.5 T 770 30"
              stroke="url(#hamonMist)"
              strokeWidth="2.8"
              filter={neonEnabled ? 'url(#swordGlow)' : undefined}
              strokeLinecap="round"
            />
          )}

          {/* C. Zenitsu: Sharp Jagged Electric Lightning Bolts! */}
          {activeTab === 'games' && (
            <path
              d="M 76 33 L 130 30 L 150 35 L 220 29.5 L 245 35.5 L 320 29.5 L 345 35.5 L 430 29.5 L 455 35.5 L 550 29.5 L 575 35.5 L 670 29.5 L 695 35.5 L 770 30.5"
              stroke="url(#hamonThunder)"
              strokeWidth="2.8"
              filter={neonEnabled ? 'url(#swordGlow)' : undefined}
              strokeLinecap="round"
              strokeLinejoin="miter"
            />
          )}

          {/* D. Rengoku: Licking Volcanic Fire Waves & Flame Crests */}
          {activeTab === 'arena' && (
            <path
              d="M 76 33 Q 110 28, 140 33.5 Q 170 28, 210 33.5 Q 260 27, 300 33.5 Q 360 27, 410 33.5 Q 480 27, 530 33.5 Q 610 27, 660 33.5 Q 720 28, 770 30.5"
              stroke="url(#hamonFlame)"
              strokeWidth="3.2"
              filter={neonEnabled ? 'url(#swordGlow)' : undefined}
              strokeLinecap="round"
            />
          )}

          {/* E. Samurai: Legendary Gunome-Midare Traditional Japanese Waves */}
          {activeTab === 'profile' && (
            <path
              d="M 76 33 Q 140 31.5, 190 33.5 T 320 31.5 T 450 33.5 T 580 31.5 T 710 33 T 770 30"
              stroke="url(#hamonSamurai)"
              strokeWidth="2.8"
              filter={neonEnabled ? 'url(#swordGlow)' : undefined}
              strokeLinecap="round"
            />
          )}

          {/* Active Energy Pulse along the Blade Core */}
          <line
            x1="80"
            y1="32.5"
            x2="760"
            y2="30.5"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray={activeTab === 'games' ? '8 6' : activeTab === 'arena' ? '18 10' : '14 12'}
            className="animate-pulse"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
};
