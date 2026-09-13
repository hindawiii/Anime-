import React, { useState } from 'react';

interface OtakuSamaLogoProps {
  size?: number | string;
  variant?: 'mark-only' | 'full';
  glow?: boolean;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export const OtakuSamaLogo: React.FC<OtakuSamaLogoProps> = ({
  size = 40,
  variant = 'mark-only',
  glow = true,
  className = '',
  id,
  onClick,
}) => {
  const isFull = variant === 'full';
  const [imgSrcIndex, setImgSrcIndex] = useState(0);

  // Candidate image paths if the user adds their raw image file into public/
  const candidateImages = ['/otaku_sama_brand_mark.png', '/logo.png', '/otaku-logo.png'];

  const handleImageError = () => {
    setImgSrcIndex((prev) => prev + 1);
  };

  const currentImgSrc = imgSrcIndex < candidateImages.length ? candidateImages[imgSrcIndex] : null;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        filter: glow ? 'drop-shadow(0 0 6px rgba(255, 75, 110, 0.45))' : 'none',
      }}
    >
      {currentImgSrc ? (
        <img
          src={currentImgSrc}
          alt="Otaku-Sama Official Brand"
          onError={handleImageError}
          className="w-full h-full object-contain"
        />
      ) : (
        /* High-Precision Symmetrical Vector SVG matching otaku_sama_brand_mark.png */
        <svg
          viewBox={isFull ? '0 0 400 420' : '30 20 340 340'}
          className="w-full h-full object-contain overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sakuraFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A9C" />
              <stop offset="60%" stopColor="#FF4B72" />
              <stop offset="100%" stopColor="#E62855" />
            </linearGradient>

            <linearGradient id="neonPinkStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6085" />
              <stop offset="100%" stopColor="#FF3864" />
            </linearGradient>
          </defs>

          <g transform="translate(0, 0)">
            {/* 1. Outer Neon Ring */}
            <circle
              cx="200"
              cy="190"
              r="145"
              fill="none"
              stroke="#FF4B72"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Subtle soft outer halo */}
            <circle
              cx="200"
              cy="190"
              r="145"
              fill="none"
              stroke="#FFA8BE"
              strokeWidth="1.2"
              opacity="0.8"
            />

            {/* 2. Inner Rounded Hexagon Shield */}
            <path
              d="M 200,60
                 C 205,60 275,100 286,108
                 C 297,116 300,125 300,138
                 L 300,242
                 C 300,255 295,264 284,272
                 C 273,280 205,320 200,320
                 C 195,320 127,280 116,272
                 C 105,264 100,255 100,242
                 L 100,138
                 C 100,125 103,116 114,108
                 C 125,100 195,60 200,60 Z"
              fill="none"
              stroke="#FF4B72"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />

            {/* 3. Three Sakura Cherry Blossom Petals on Left */}
            {/* Upper Petal (tilted up-left ~45 deg with cleft at tip) */}
            <path
              d="M 195,145
                 C 178,125 158,110 142,122
                 C 134,128 132,135 138,137
                 C 133,141 133,148 142,154
                 C 158,165 178,158 195,145 Z"
              fill="url(#sakuraFill)"
              opacity="0.95"
            />

            {/* Middle Petal (horizontal left with notch) */}
            <path
              d="M 195,190
                 C 170,178 140,165 125,178
                 C 118,184 118,190 126,192
                 C 119,195 119,203 128,208
                 C 145,216 172,204 195,190 Z"
              fill="url(#sakuraFill)"
              opacity="0.95"
            />

            {/* Lower Petal (tilted down-left ~45 deg with cleft) */}
            <path
              d="M 195,230
                 C 178,245 158,260 142,248
                 C 134,242 132,235 138,233
                 C 133,229 133,222 142,216
                 C 158,205 178,215 195,230 Z"
              fill="url(#sakuraFill)"
              opacity="0.95"
            />

            {/* 4. Center Vertical Dividing Stroke */}
            <line
              x1="195"
              y1="95"
              x2="195"
              y2="285"
              stroke="#FF4B72"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* 5. Japanese Kanji 様 (Right Radical: 羊 + 氺) */}
            <g
              stroke="#FF4B72"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              {/* Upper slants of 羊 */}
              <path d="M 218,126 L 227,135" />
              <path d="M 258,126 L 249,135" />

              {/* 3 Horizontal Bars of 羊 */}
              <path d="M 214,142 L 262,142" />
              <path d="M 218,158 L 258,158" />
              <path d="M 202,182 L 274,182" />

              {/* Central Vertical Spine */}
              <path d="M 238,136 L 238,252" strokeWidth="5" />

              {/* Lower Sweeps & Dots */}
              <path d="M 236,192 L 218,222" />
              <path d="M 240,192 L 264,220" />
              <path d="M 214,236 L 224,246" />
              <path d="M 264,236 L 254,246" />
            </g>

            {/* 6. Cybernetic Circuit Traces & Hexagonal Nodes */}
            <g
              stroke="#FF4B72"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              {/* Circuit 1: Top Right Node */}
              <path d="M 238,110 L 238,92 L 250,84" />
              <polygon
                points="254,78 260,81 260,87 254,90 248,87 248,81"
                fill="#0E1018"
                stroke="#FF4B72"
                strokeWidth="2.4"
              />

              {/* Circuit 2: Mid-Upper Right Node */}
              <path d="M 262,142 L 274,130 L 274,122" />
              <polygon
                points="274,116 279,119 279,125 274,128 269,125 269,119"
                fill="#0E1018"
                stroke="#FF4B72"
                strokeWidth="2.4"
              />

              {/* Circuit 3: Mid-Right Horizontal Node */}
              <path d="M 274,182 L 288,182" />
              <polygon
                points="294,177 299,180 299,185 294,188 289,185 289,180"
                fill="#0E1018"
                stroke="#FF4B72"
                strokeWidth="2.4"
              />

              {/* Circuit 4: Lower Right Branching Node */}
              <path d="M 252,248 L 264,258 L 274,258" />
              <polygon
                points="280,253 285,256 285,261 280,264 275,261 275,256"
                fill="#0E1018"
                stroke="#FF4B72"
                strokeWidth="2.4"
              />

              {/* Circuit 5: Lower Vertical Node */}
              <path d="M 195,285 L 195,302 L 190,306" />
              <polygon
                points="190,301 195,304 195,309 190,312 185,309 185,304"
                fill="#0E1018"
                stroke="#FF4B72"
                strokeWidth="2.4"
              />
            </g>

            {/* 7. Wordmark for 'full' variant */}
            {isFull && (
              <text
                x="200"
                y="382"
                textAnchor="middle"
                fontFamily="system-ui, -apple-system, 'Comfortaa', 'Quicksand', 'Outfit', sans-serif"
                fontSize="42"
                fontWeight="600"
                letterSpacing="1"
                fill="#FF688B"
              >
                Otaku-Sama
              </text>
            )}
          </g>
        </svg>
      )}
    </div>
  );
};
