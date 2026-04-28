/// Shape of the translation dictionary. English is the source of truth.
/// Every other locale must satisfy the same `Dict` interface so missing
/// keys become a TypeScript error rather than a runtime surprise.
///
/// Grouping is by page: `home.*`, `about.*`, `vs.coldTurkey.*`, etc.
/// Repeating items (FAQ Q&A, comparison rows, feature cards) are arrays
/// so locales can preserve the same indexable order without duplicating
/// scaffolding text.

export interface UseCase { title: string; desc: string }
export interface NumberedItem { num: string; title: string; desc: string }
export interface NamedItem { name: string; desc: string; intensity?: string }
export interface QA { q: string; a: string }
export interface FeatureCard { title: string; desc: string }
export interface VsRow { feature: string; them: string; us: string }
export interface ComparisonCard { tag: string; metric: string; subtitle: string; rows: string[] }

export interface Dict {
  nav: {
    home: string;
    about: string;
    faqs: string;
    contact: string;
    changelog: string;
    download: string;
  };
  footer: {
    tagline: string;
    compare: string;
    guides: string;
    product: string;
    privacy: string;
    terms: string;
    contact: string;
    home: string;
    about: string;
    faqs: string;
    changelog: string;
    vsColdTurkey: string;
    vsFreedom: string;
    vsSelfControl: string;
    freeBlockersRanked: string;
    blockWebsitesGuide: string;
    forStudents: string;
    forAdhd: string;
    gamblingBlocker: string;
    copyright: string; // "© {year} FocusDragon · Made in Dubai for focused humans everywhere."
    versionLine: string; // "v{version} · macOS 13 Ventura or later"
  };
  download: {
    cta: string; // "Download for Mac — It's Free"
    ctaVersion: string; // "Download FocusDragon v{version}"
    requirement: string; // "macOS 13 Ventura or later · Apple Silicon & Intel"
    requirementLong: string;
    sizeNote: string; // "DMG installer · ~6 MB · Auto-updates via Sparkle"
    modalTitle: string; // "Get the most out of FocusDragon"
    modalLead: string; // "Drop your email and you'll get:"
    modalBenefit1: string;
    modalBenefit2: string;
    modalBenefit3: string;
    emailPlaceholder: string;
    emailRequired: string;
    starting: string;
    skip: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    heroTitle1: string; // "You know you'll"
    heroTitle2: string; // "bypass it."
    heroTitle3: string; // "Not this one."
    heroSubtitle: string;
    heroSubtitleHighlight: string;
    whyKicker: string; // "Why this exists"
    whyTitle1: string; // "You're not lazy."
    whyTitle2: string; // "You're fighting a rigged game."
    whyP1: string;
    whyP2: string;
    whyP3: string;
    whyP4: string;
    useCasesTitle1: string; // "Built for people who"
    useCasesTitle2: string; // "need it to work."
    useCasesSubtitle: string;
    useCases: UseCase[]; // 9 entries
    layersTitle1: string; // "6 layers"
    layersTitle2: string; // "between you"
    layersTitle3: string; // "and your distractions."
    layersSubtitle: string;
    layers: NumberedItem[]; // 6 entries
    locksTitle1: string; // "Locks that make you"
    locksTitle2: string; // "mean it."
    locksSubtitle: string;
    locks: NamedItem[]; // 6 entries
    daemonKicker: string;
    daemonTitle: string;
    daemonBody: string;
    daemonItems: string[]; // 8 items
    contrastTitle1: string; // "Other blockers are a"
    contrastTitle2: string; // "suggestion."
    contrastSubtitle: string;
    themLabel: string; // "Browser extensions & most apps"
    themBig: string; // "2 clicks"
    themSub: string;
    themItems: string[]; // 4
    usLabel: string; // "FocusDragon"
    usBig: string; // "5+ steps"
    usSub: string;
    usItems: string[]; // 4
    socialTitle1: string; // "People who"
    socialTitle2: string; // "stopped fighting themselves."
    testimonials: { quote: string; name: string; detail: string }[]; // 3
    freeTitle1: string; // "Free forever."
    freeTitle2: string; // "Here's why."
    freeP1: string;
    freeP2: string;
    freeP3: string;
    statFreeBig: string;
    statFreeTitle: string;
    statFreeBody: string;
    statNativeBig: string;
    statNativeTitle: string;
    statNativeBody: string;
    statLocalBig: string;
    statLocalTitle: string;
    statLocalBody: string;
    privacyTitle: string;
    privacyP1: string;
    privacyP2: string;
    privacyReadMore: string;
    downloadTitle1: string; // "Ready to"
    downloadTitle2: string; // "stop pretending"
    downloadTitle3: string; // "willpower is enough?"
    downloadSubtitle: string;
    quickInstallTitle: string;
    quickInstallSteps: string[]; // 4
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    heroTitle1: string; // "I was the kid who"
    heroTitle2: string; // "couldn't stop gaming."
    heroSubtitle: string;
    badgeStudent: string;
    badgeSolo: string;
    badgeAge: string;
    chapter1Title: string;
    chapter1P1: string;
    chapter1P2: string;
    chapter2Title: string;
    chapter2P1: string;
    chapter2Quote: string;
    chapter3Title: string;
    chapter3P1: string;
    chapter3P2: string;
    chapter4Title: string;
    chapter4P1: string;
    chapter4P2: string;
    closeTitle1: string; // "If this sounds like"
    closeTitle2: string; // "your story,"
    closeTitle3: string; // "this was built for you."
    closeSubtitle: string;
    websiteLink: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorGeneric: string;
    altTitle: string;
    altBody: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lastUpdated: string;
    sections: { title: string; body: string }[];
  };
  upgrade: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    body: string;
  };
  changelog: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    latest: string;
    patch: string;
    initial: string;
    addedLabel: string;
    changedLabel: string;
    fixedLabel: string;
  };
  faqs: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    noResults: string;
    backToFaqs: string;
  };
  forStudents: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
  };
  forAdhd: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
  };
  blockWebsites: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
  };
  freeBlocker: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
  };
  gamblingBlocker: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
  };
  vs: {
    coldTurkey: { metaTitle: string; metaDescription: string; heroTitle: string; heroSubtitle: string; cta: string };
    freedom:    { metaTitle: string; metaDescription: string; heroTitle: string; heroSubtitle: string; cta: string };
    selfControl:{ metaTitle: string; metaDescription: string; heroTitle: string; heroSubtitle: string; cta: string };
  };
  extensionSetup: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
  };
  switcher: {
    label: string;
    switchToEnglish: string;
  };
}
