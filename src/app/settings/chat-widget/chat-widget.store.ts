import { create } from 'zustand';

export type WidgetConfig = {
  background: string;
  foreground: string;
  logoBadgeBackgroundColor: string;
  bannerTitle: string;
  bannerSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  promotionalLink: string;
};

type ImagesState = {
  logoPreviewUrl: string | null;
  logoFile: File | null;
  bannerPreviewUrl: string | null;
  bannerFile: File | null;
  promotionalImagePreviewUrl: string | null;
  promotionalImageFile: File | null;
};

type StatusState = {
  saving: boolean;
  error: string | null;
  success: string | null;
};

export type ChatWidgetStore = {
  // config values
  background: string;
  setBackground: (v: string) => void;
  foreground: string;
  setForeground: (v: string) => void;
  logoBadgeBackgroundColor: string;
  setLogoBadgeBackgroundColor: (v: string) => void;

  bannerTitle: string;
  setBannerTitle: (v: string) => void;
  bannerSubtitle: string;
  setBannerSubtitle: (v: string) => void;

  ctaTitle: string;
  setCtaTitle: (v: string) => void;
  ctaSubtitle: string;
  setCtaSubtitle: (v: string) => void;
  ctaDescription: string;
  setCtaDescription: (v: string) => void;
  ctaButtonText: string;
  setCtaButtonText: (v: string) => void;

  promotionalLink: string;
  setPromotionalLink: (v: string) => void;

  // images
  images: ImagesState;
  setLogoFileAndPreview: (file: File | null, preview: string | null) => void;
  setBannerFileAndPreview: (file: File | null, preview: string | null) => void;
  setPromotionalFileAndPreview: (
    file: File | null,
    preview: string | null
  ) => void;
  resetLogo: () => void;
  resetBanner: () => void;
  resetPromotionalImage: () => void;

  // status
  status: StatusState;
  setSaving: (v: boolean) => void;
  setError: (msg: string | null) => void;
  setSuccess: (msg: string | null) => void;

  // derived / helpers
  getConfig: () => WidgetConfig;
  resetAll: () => void;
};

export const useChatWidgetStore = create<ChatWidgetStore>((set, get) => ({
  // config defaults
  background: '#FFFCE8',
  setBackground: (v) => set({ background: v }),
  foreground: '#000000',
  setForeground: (v) => set({ foreground: v }),
  logoBadgeBackgroundColor: '#FCE654',
  setLogoBadgeBackgroundColor: (v) => set({ logoBadgeBackgroundColor: v }),

  bannerTitle: 'Hello Syed Shihab',
  setBannerTitle: (v) => set({ bannerTitle: v }),
  bannerSubtitle: 'How can I help?',
  setBannerSubtitle: (v) => set({ bannerSubtitle: v }),

  ctaTitle: 't2chat App',
  setCtaTitle: (v) => set({ ctaTitle: v }),
  ctaSubtitle: 'Welcome to t2chat app',
  setCtaSubtitle: (v) => set({ ctaSubtitle: v }),
  ctaDescription: 'Feel free to leave a message, we are here to help!',
  setCtaDescription: (v) => set({ ctaDescription: v }),
  ctaButtonText: 'Start a chat',
  setCtaButtonText: (v) => set({ ctaButtonText: v }),

  promotionalLink: 'https://t2devs.com',
  setPromotionalLink: (v) => set({ promotionalLink: v }),

  // images
  images: {
    logoPreviewUrl: null,
    logoFile: null,
    bannerPreviewUrl: null,
    bannerFile: null,
    promotionalImagePreviewUrl: null,
    promotionalImageFile: null,
  },
  setLogoFileAndPreview: (file, preview) =>
    set((s) => ({
      images: { ...s.images, logoFile: file, logoPreviewUrl: preview },
    })),
  setBannerFileAndPreview: (file, preview) =>
    set((s) => ({
      images: { ...s.images, bannerFile: file, bannerPreviewUrl: preview },
    })),
  setPromotionalFileAndPreview: (file, preview) =>
    set((s) => ({
      images: {
        ...s.images,
        promotionalImageFile: file,
        promotionalImagePreviewUrl: preview,
      },
    })),
  resetLogo: () =>
    set((s) => ({
      images: { ...s.images, logoFile: null, logoPreviewUrl: null },
    })),
  resetBanner: () =>
    set((s) => ({
      images: { ...s.images, bannerFile: null, bannerPreviewUrl: null },
    })),
  resetPromotionalImage: () =>
    set((s) => ({
      images: {
        ...s.images,
        promotionalImageFile: null,
        promotionalImagePreviewUrl: null,
      },
    })),

  // status
  status: { saving: false, error: null, success: null },
  setSaving: (v) => set((s) => ({ status: { ...s.status, saving: v } })),
  setError: (msg) => set((s) => ({ status: { ...s.status, error: msg } })),
  setSuccess: (msg) => set((s) => ({ status: { ...s.status, success: msg } })),

  // derived/helpers
  getConfig: () => {
    const s = get();
    return {
      background: s.background,
      foreground: s.foreground,
      logoBadgeBackgroundColor: s.logoBadgeBackgroundColor,
      bannerTitle: s.bannerTitle,
      bannerSubtitle: s.bannerSubtitle,
      ctaTitle: s.ctaTitle,
      ctaSubtitle: s.ctaSubtitle,
      ctaDescription: s.ctaDescription,
      ctaButtonText: s.ctaButtonText,
      promotionalLink: s.promotionalLink,
    };
  },

  resetAll: () =>
    set({
      // reset config to defaults
      background: '#FFFCE8',
      foreground: '#000000',
      logoBadgeBackgroundColor: '#FCE654',
      bannerTitle: 'Hello Syed Shihab',
      bannerSubtitle: 'How can I help?',
      ctaTitle: 't2chat App',
      ctaSubtitle: 'Welcome to t2chat app',
      ctaDescription: 'Feel free to leave a message, we are here to help!',
      ctaButtonText: 'Start a chat',
      promotionalLink: 'https://t2devs.com',
      images: {
        logoPreviewUrl: null,
        logoFile: null,
        bannerPreviewUrl: null,
        bannerFile: null,
        promotionalImagePreviewUrl: null,
        promotionalImageFile: null,
      },
      status: { saving: false, error: null, success: null },
    }),
}));
