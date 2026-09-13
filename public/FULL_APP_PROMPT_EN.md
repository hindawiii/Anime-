# Full Updated App Prompt (English - Production Ready)

Build a complete, luxurious, production-grade web application named **"Otaku-Sama | أوتاكو ساما"** designed for Arab and international anime/manga fans, featuring a dark cyberpunk anime aesthetic (`#0B0B18`) and an innovative bottom navigation bar sculpted like a Japanese Katana sword blade.

---

## 1. Architectural Guidelines & Technical Stack
- **Framework & Core:** React 18+ with TypeScript and Vite.
- **Styling:** Tailwind CSS with fluid utility classes and custom neon ambient gradients.
- **Iconography:** Lucide React icons exclusively.
- **Interactive Audio Synth:** Built-in Web Audio API synthesizer that produces a crisp, authentic Katana sword unsheathing/slash sound effect on tab transitions without external audio files.
- **Dynamic Bilingual System (i18n):**
  - Native runtime switching between Arabic (`ar`, RTL) and English (`en`, LTR).
  - Dynamic `dir` attribute updates on `document.documentElement`.
  - **Strict adherence to CSS logical properties:** Use `ms-`, `me-`, `ps-`, `pe-`, `start-`, and `end-`. Absolutely no physical directions (`left`, `right`, `ml`, `mr`).

---

## 2. Official Brand Identity & Vector Crest (Otaku-Sama Logo)
- **Official Brand Mark:**
  - **Outer Frame:** A glowing coral-pink circular neon ring (`#FF4B72`) containing an inner rounded-corner hexagon shield.
  - **Left Section:** Three stylized Japanese Sakura cherry blossom petals glowing in gradient pink (`#FF7A9C` to `#E62855`), with the characteristic notch/cleft at each petal tip.
  - **Center & Right Section:** A vertical spine stroke intersecting the Kanji **「様」 (Sama)**, intricately blended with 5 cybernetic printed circuit board (PCB) traces ending in small hollow hexagonal nodes (`⬡`).
  - **Typography (Full Variant):** Clean, rounded modern wordmark "Otaku-Sama" positioned beneath the crest.
  - **Dual-Asset Engine:** A high-precision SVG vector implementation with 100% crisp geometry that never distorts or blurs on retina displays, coupled with an automatic file-loader that directly renders `/otaku_sama_brand_mark.png` or `/logo.png` if present in the `public/` directory.

---

## 3. Top Header Design (Clean, No VIP Badge)
- Sticky top navigation (`sticky top-0`) with `backdrop-blur-xl` and subtle border divider (`border-white/10`).
- **Left Cluster (Actions):**
  - Settings Button: Standardized `h-10 w-10` touch target that opens the sliding drawer with a 45-degree hover rotation.
  - Notifications Button: Features an animated glowing neon pulse badge indicating live activity.
- **Right Cluster (Brand):**
  - 40px official Otaku-Sama vector logo with subtle scale transitions on hover/press.
  - App title "أوتاكو ساما" in Arabic display typography with `whitespace-nowrap` to strictly prevent line wrapping on mobile devices.
  - Subtle secondary tagline visible on medium screens.
  - **Explicit Negative Constraint:** No VIP button in the header to preserve clean visual hierarchy.

---

## 4. Docked Katana Sword Bottom Navigation
- Fixed bottom dock engineered around a Japanese Katana sword graphic:
  - Intricate hilt wrap (`Ito`), handguard (`Tsuba`), and a polished steel curved blade with dynamic reflections.
  - **Five Navigation Tabs:**
    1. **Anime & Manga (`anime`):** Color: Royal Violet `#7C5CFF`.
    2. **Wansa Lounge (`wansa`):** Color: Neon Sakura `#FF5C8A`.
    3. **Games & Arcade (`games`):** Color: Cyber Cyan `#4DD8FF`.
    4. **Otaku Arena (`arena`):** Color: Radiant Gold `#FFC94D`.
    5. **Warrior Profile (`profile`):** Color: Cosmic Purple `#A855F7`.
  - **Interactive Slash Animation & Sound:** Active indicator glides along the katana blade edge accompanied by an organic frequency-modulated synthesized slash chime.

---

## 5. Main Application Sections
- **Anime & Manga Section (`AnimeMangaSection`):** High-density shell for seasonal episode releases, manga readers, and genre taxonomy.
- **Wansa Lounge (`WansaSection`):** Audio discussion rooms, spoiler debate hubs, and real-time community engagement.
- **Games Section (`GamesSection`):** Anime trivia challenges, character silhouette guessers, and prize wheel minigames.
- **Otaku Arena (`OtakuArenaSection`):** Community feed, memes, poll battles, and verified posts.
- **Warrior Profile Section (`ProfileSection`):**
  - Premium Otaku Warrior Passport Card.
  - Hashira / Legendary Sama rank verification badges.
  - Translucent oversized Otaku-Sama watermark seal embedded in the card background.
  - Unique verified warrior ID (`#SAMA-8942-VIP`).

---

## 6. Pro Settings Drawer
- Slide-over drawer organized using modern grouped lists:
  - **Account & Identity:** Profile edit trigger, instant Arabic/English language toggle.
  - **Display & FX:** Toggle switch for ambient neon glow, toggle switch for Katana sound effects.
  - **Maintenance & Legal:** Real cache-clearing simulation with 48.6MB reduction toast, About App modal featuring the full brand logo, Privacy Policy modal, and Support links.
  - **Security:** Safe Logout action with confirmation dialog.
  - **Footer:** Subdued official Otaku-Sama brand watermark.

---

## 7. Authentication Modal (`AuthModal`)
- Modal dialog with tabbed Login and Account Registration forms.
- Minimum 44px input fields with high-visibility focus rings.
- Social authentication triggers and a prominent "Explore as Guest" option.
