import { TabType } from './types';

export const translations = {
  ar: {
    appName: 'أوتاكو ساما',
    appSubtitle: 'عالم الأنمي والمانجا الفاخر',
    otakuBadge: 'VIP',
    guest: 'زائر الأوتاكو',
    
    // Header & Quick Actions
    settings: 'الإعدادات',
    searchPlaceholder: 'ابحث عن أنمي، مانجا، نقاش أو لعبة...',
    notifications: 'الإشعارات',
    loginPrompt: 'تسجيل الدخول',
    guestMode: 'استكشاف كزائر',
    
    // Viewport Toggle
    mobilePreview: 'عرض الهاتف',
    fullPreview: 'عرض كامل',

    // 5 Main Sections
    tabs: {
      anime: 'الأنمي والمانجا',
      wansa: 'الونسة',
      games: 'الألعاب',
      arena: 'ساحة الأوتاكو',
      profile: 'حسابي',
    } as Record<TabType, string>,

    tabSubtitles: {
      anime: 'الحلقات الجديدة، المانجا، والمواسم',
      wansa: 'صالون نقاشات وصوتيات مجتمع الأنمي',
      games: 'تحديات، كويزات، وعجلة الحظ للجوائز',
      arena: 'منشورات، ميمز، واستطلاعات الرأي',
      profile: 'بطاقة المحارب، قوائمي، والرتبة',
    } as Record<TabType, string>,

    // Settings Drawer
    settingsMenu: {
      title: 'إعدادات أوتاكو ساما',
      subtitle: 'التحكم العام بالهوية، الحساب، والأداء',
      profile: 'الملف الشخصي والحساب',
      profileDesc: 'الاسم، الصورة الرمزية، ورتبة الأوتاكو',
      language: 'لغة التطبيق (Language)',
      languageDesc: 'التبديل بين العربية والإنجليزية',
      currentLangName: 'العربية (RTL)',
      about: 'حول التطبيق',
      aboutDesc: 'الإصدار 1.0.0 — فريق أوتاكو ساما العربي',
      aboutModalTitle: 'عن تطبيق أوتاكو ساما',
      aboutModalText: 'أوتاكو ساما هو التطبيق الترفيهي الفاخر المخصص لعشاق الأنمي والمانجا في الوطن العربي، بتصميم داكن نيون وهوية يابانية أصيلة وشريط تنقل الكاتانا المبتكر.',
      privacy: 'الخصوصية وشروط الاستخدام',
      privacyDesc: 'سياسات حماية البيانات وحسابات المستخدمين',
      privacyModalTitle: 'سياسة الخصوصية والأمان',
      privacyModalText: 'نلتزم في أوتاكو ساما بحماية بياناتك الشخصية وحسابك وخصوصية مشاركاتك في الساحة وغرف الونسة وفق أعلى معايير التشفير.',
      clearCache: 'مسح الملفات المؤقتة (Cache)',
      clearCacheDesc: 'تسريع التطبيق وتحرير مساحة الذاكرة',
      clearingCache: 'جارِ فحص ومسح الملفات...',
      cacheCleared: 'تم تفريغ 48.6 ميغابايت من الكاش بنجاح!',
      soundEffects: 'المؤثرات الصوتية وصوت الكاتانا',
      soundEffectsDesc: 'تشغيل نقرات النيون وسحب السيف',
      neonGlow: 'توهج النيون الفاخر (Aura Glow)',
      neonGlowDesc: 'تفعيل إشعاع النيون للكاتانا والبطاقات',
      notificationsToggle: 'إشعارات الحلقات والفعاليات',
      notificationsDesc: 'تنبيهك فور صدور حلقات جديدة وغرف الونسة',
      support: 'المساعدة والدعم الفني',
      supportDesc: 'تواصل مع فريق الدعم والإبلاغ عن الأخطاء',
      logout: 'تسجيل الخروج',
      logoutConfirm: 'هل أنت متأكد من تسجيل الخروج؟',
      close: 'إغلاق',
    },

    // Katana Nav Bar Info
    katanaNav: {
      bladeTitle: 'شريط الكاتانا التفاعلي',
      sheath: 'نصل الكاتانا الياباني الفاخر',
      activeBlade: 'نصل الطاقة مشحون',
      katanaHint: 'شريط التنقل مستوحى من نصل سيف الكاتانا مع لمعان نيون يتلون بحسب القسم النشط.',
    },

    // Auth Modal
    auth: {
      loginTitle: 'بوابة المحارب',
      loginSubtitle: 'سجل دخولك وانضم إلى نقابة أوتاكو ساما',
      tabLogin: 'تسجيل الدخول',
      tabRegister: 'إنشاء حساب جديد',
      emailOrUsername: 'البريد الإلكتروني أو اسم الأوتاكو',
      emailPlaceholder: 'otaku@sama.app أو اسمك',
      phone: 'رقم الهاتف (اختياري)',
      phonePlaceholder: '+966 5X XXX XXXX',
      password: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      confirmPassword: 'تأكيد كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
      submitLogin: 'دخول النقابة',
      submitRegister: 'انضم كمحارب جديد',
      orContinueWith: 'أو الربط السريع عبر',
      google: 'حساب Google',
      apple: 'حساب Apple',
      discord: 'حساب Discord',
      guestBypass: 'المتابعة كضيف لاستعراض الأقسام الفارغة',
      termsNotice: 'بالتسجيل فإنك توافق على شروط أوتاكو ساما وميثاق الشرف.',
      loginSuccess: 'أهلاً بعودتك أيها المحارب!',
    },
  },

  en: {
    appName: 'Otaku Sama',
    appSubtitle: 'Luxury Anime & Manga Realm',
    otakuBadge: 'VIP',
    guest: 'Otaku Guest',

    // Header & Quick Actions
    settings: 'Settings',
    searchPlaceholder: 'Search anime, manga, lounge or game...',
    notifications: 'Notifications',
    loginPrompt: 'Sign In',
    guestMode: 'Explore as Guest',

    // Viewport Toggle
    mobilePreview: 'Mobile View',
    fullPreview: 'Full Screen',

    // 5 Main Sections
    tabs: {
      anime: 'Anime & Manga',
      wansa: 'Lounge (Wansa)',
      games: 'Games & Wheel',
      arena: 'Otaku Arena',
      profile: 'My Profile',
    } as Record<TabType, string>,

    tabSubtitles: {
      anime: 'Latest episodes, manga releases, and seasonal anime',
      wansa: 'Live voice rooms & discussions for the otaku community',
      games: 'Anime trivia, daily lucky wheel, and rewards',
      arena: 'Community posts, memes, battles, and polls',
      profile: 'Warrior card, watchlist, rank, and badges',
    } as Record<TabType, string>,

    // Settings Drawer
    settingsMenu: {
      title: 'Otaku Sama Settings',
      subtitle: 'System, Account & Performance Controls',
      profile: 'Profile & Account',
      profileDesc: 'Name, avatar, and warrior rank',
      language: 'App Language',
      languageDesc: 'Switch between Arabic and English',
      currentLangName: 'English (LTR)',
      about: 'About App',
      aboutDesc: 'Version 1.0.0 — Arab Otaku Sama Guild',
      aboutModalTitle: 'About Otaku Sama',
      aboutModalText: 'Otaku Sama is the premier luxury anime and manga application for the Arab otaku community, styled in deep dark neon Japanese aesthetics with the signature Katana navigation blade.',
      privacy: 'Privacy Policy & Terms',
      privacyDesc: 'User data protection and account safety',
      privacyModalTitle: 'Privacy Policy',
      privacyModalText: 'We prioritize your privacy and account security across all lounge interactions, feeds, and profiles with high-grade encryption.',
      clearCache: 'Clear Cache',
      clearCacheDesc: 'Speed up app and free temporary memory',
      clearingCache: 'Scanning and clearing cache...',
      cacheCleared: 'Successfully cleared 48.6 MB of cache!',
      soundEffects: 'Sound Effects & Katana Slash',
      soundEffectsDesc: 'Play blade unsheathing and neon clicks',
      neonGlow: 'Luxury Neon Aura Glow',
      neonGlowDesc: 'Toggle glowing aura for blade and cards',
      notificationsToggle: 'Episodes & Events Alerts',
      notificationsDesc: 'Get notified for fresh episodes and lounge rooms',
      support: 'Help & Technical Support',
      supportDesc: 'Reach the team and report issues',
      logout: 'Log Out',
      logoutConfirm: 'Are you sure you want to log out?',
      close: 'Close',
    },

    // Katana Nav Bar Info
    katanaNav: {
      bladeTitle: 'Interactive Katana Navigation',
      sheath: 'Luxury Japanese Katana Blade',
      activeBlade: 'Energy Blade Charged',
      katanaHint: 'The bottom navigation bar is styled as a sleek samurai Katana sword with dynamic neon glow matching the active section.',
    },

    // Auth Modal
    auth: {
      loginTitle: 'Warrior Gate',
      loginSubtitle: 'Log in and enter the Otaku Sama Guild',
      tabLogin: 'Sign In',
      tabRegister: 'Create Account',
      emailOrUsername: 'Email or Otaku Tag',
      emailPlaceholder: 'otaku@sama.app or tag',
      phone: 'Phone Number (Optional)',
      phonePlaceholder: '+1 (555) 000-0000',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      submitLogin: 'Enter Guild',
      submitRegister: 'Join as New Warrior',
      orContinueWith: 'Or connect via',
      google: 'Google Account',
      apple: 'Apple Account',
      discord: 'Discord Account',
      guestBypass: 'Continue as guest to view empty sections',
      termsNotice: 'By signing up, you agree to Otaku Sama Terms & Code of Honor.',
      loginSuccess: 'Welcome back, Warrior!',
    },
  },
};
