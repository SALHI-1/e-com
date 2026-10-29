export type Lang = 'fr' | 'eng' | 'esp' | 'en' | 'es';
export type SupportedLang = 'fr' | 'eng' | 'esp';

export interface FooterItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: FooterItem[];
}

export interface SpreadItem {
  num: string;
  claim: string;
  story: string;
  tags: string[];
}

export interface JourneyItem {
  num: string;
  title: string;
  text: string;
}

export interface ValueItem {
  num: string;
  title: string;
  text: string;
}

export interface StatItem {
  figure: string;
  label: string;
}

export interface Dictionary {
  // ── Propriétés legacy plates au premier niveau (rétrocompatibilité avec t.<cle>) ──
  announce: string;
  navHome: string;
  navShop: string;
  navHair: string;
  navAbout: string;
  add: string;
  addCart: string;
  allLabel: string;
  discover: string;
  best: string;
  newTag: string;
  sale: string;
  'hair care': string;
  'face care': string;
  'makeup': string;
  'body & bath': string;
  'perfumes': string;
  marquee: string[];
  promiseKicker: string;
  promiseTitle: string;
  promiseText: string;
  emailPh: string;
  subscribe: string;
  footerTagline: string;
  footerNote: string;
  footer: FooterColumn[];
  login: string;
  register: string;
  profile: string;
  logout: string;
  cartTitle: string;
  cartEmpty: string;
  backShop: string;
  unit: string;
  subtotal: string;
  shipping: string;
  free: string;
  total: string;
  checkout: string;
  waNote: string;
  guestName: string;
  deliveryCity: string;
  deliveryFee: string;
  deliveryFree: string;
  orderTotal: string;
  waPhone: string;
  address: string;
  back: string;
  confirm: string;
  sending: string;
  successTitle: string;
  successMessage: string;
  successContact: string;
  continueShopping: string;
  visualComingSoon: string;

  // ── Espaces thématiques structurés ──
  common: {
    announce: string;
    navHome: string;
    navShop: string;
    navHair: string;
    navAbout: string;
    allLabel: string;
    login: string;
    register: string;
    profile: string;
    logout: string;
    add: string;
    addCart: string;
    discover: string;
    close: string;
    best: string;
    newTag: string;
    sale: string;
    soldOut: string;
    preorder: string;
    marquee: string[];
    promiseKicker: string;
    promiseTitle: string;
    promiseText: string;
    emailPh: string;
    subscribe: string;
    footerTagline: string;
    footerNote: string;
    footer: FooterColumn[];
    categoryLabels: Record<string, string>;
    stockInsufficient: string;
    genericError: string;
    dh: string;
    visualComingSoon: string;
  };

  home: {
    heroKicker: string;
    heroTitle: string;
    heroItalic: string;
    heroSub: string;
    heroCta: string;
    heroLink: string;
    heroPanelCap: string;
    heroPanelTag: string;
    manifestoKicker: string;
    manifestoText: string;
    manifestoSign: string;
    spreadKicker: string;
    spreadTitle: string;
    spreads: SpreadItem[];
    catTitle: string;
    catSub: string;
    bestTitle: string;
    bestSub: string;
    viewAll: string;
    productsWord: string;
    allBrands: string;
    viewAllWithCount: (count: number) => string;
    productsCount: (count: number) => string;
    loadMore: string;
    loading: string;
    darkKicker: string;
    darkTitle: string;
    darkTitleIt: string;
    darkText: string;
    darkCta: string;
    v1t: string;
    v1d: string;
    v2t: string;
    v2d: string;
    v3t: string;
    v3d: string;
    soldOut: string;
    essentialCare: string;
  };

  about: {
    meta: { title: string; description: string };
    hero: { kicker: string; title: string; lead: string };
    manifesto: { kicker: string; quote: string; sign: string };
    journeyEyebrow: string;
    journeyTitle: string;
    journey: JourneyItem[];
    valuesKicker: string;
    valuesTitle: string;
    values: ValueItem[];
    statsEyebrow: string;
    statsTitle: string;
    stats: StatItem[];
    closingTitle: string;
    closingText: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  product: {
    reviewsCount: (n: number) => string;
    defaultDescription: string;
    preorder: string;
    soldOut: string;
    outOfStockNotice: string;
    reviewsTitle: string;
    leaveReview: string;
    alreadyReviewed: string;
    ratingLabel: string;
    submitReview: string;
    loginRequired: string;
    loginBtn: string;
    noReviews: string;
    reviewSuccess: string;
    stockInsufficient: string;
    dateLocale: string;
  };

  cart: {
    title: string;
    empty: string;
    backShop: string;
    unit: string;
    summary: string;
    subtotal: string;
    deliveryFee: string;
    free: string;
    freeShippingNotice: string;
    freeShippingForCity: (city: string) => string;
    deliveryFeeForCity: (fee: number) => string;
    orderTotal: string;
    checkout: string;
    waNote: string;
    guestName: string;
    waPhone: string;
    deliveryCity: string;
    chooseCity: string;
    address: string;
    back: string;
    confirm: string;
    sending: string;
    removeTooltip: string;
    stockInsufficient: string;
    genericError: string;
  };

  success: {
    title: string;
    message: string;
    contact: string;
    continueShopping: string;
  };

  preorder: {
    title: string;
    badge: string;
    quantity: string;
    fullName: string;
    phone: string;
    city: string;
    chooseCity: string;
    address: string;
    confirm: string;
    submitting: string;
  };

  auth: {
    loginTitle: string;
    registerTitle: string;
    forgotPasswordTitle: string;
    forgotPasswordText: string;
    resetPasswordTitle: string;
    confirmPasswordTitle: string;
    confirmPasswordText: string;
    verifyEmailTitle: string;
    verifyEmailText: string;
    verifyEmailSent: string;
    resendVerificationEmail: string;
    logout: string;
    emailLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    nameLabel: string;
    rememberMe: string;
    forgotPasswordLink: string;
    loginBtn: string;
    registerBtn: string;
    noAccount: string;
    alreadyRegistered: string;
    sendResetLink: string;
    resetPasswordBtn: string;
    confirmBtn: string;
    createAccountLink: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    loggingIn: string;
    registering: string;
  };

  profilePage: {
    title: string;
    subtitle: string;
    welcomeBack: (name: string) => string;
    memberSince: string;
    tabOrders: string;
    tabInfo: string;
    tabSecurity: string;
    tabDanger: string;
    orderNumber: string;
    orderDate: string;
    orderTotal: string;
    orderAddress: string;
    downloadTicket: string;
    articlesCount: (count: number) => string;
    noOrders: string;
    shopNow: string;
    statusLabels: Record<string, string>;
    infoTitle: string;
    infoSubtitle: string;
    fullName: string;
    emailAddress: string;
    phoneLabel: string;
    phoneHelp: string;
    saveChanges: string;
    savedSuccess: string;
    emailUnverified: string;
    resendVerification: string;
    verificationSent: string;
    securityTitle: string;
    securitySubtitle: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    updatePassword: string;
    passwordUpdated: string;
    dangerTitle: string;
    dangerSubtitle: string;
    deleteAccountBtn: string;
    confirmModalTitle: string;
    confirmModalText: string;
    cancelBtn: string;
  };
}
