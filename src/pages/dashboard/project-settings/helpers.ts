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
  promotionalTitle: string;
  promotionalLink: string;
};

export const DEFAULTS: WidgetConfig = {
  background: '#FFFCE8',
  foreground: '#000000',
  logoBadgeBackgroundColor: '#FCE654',
  bannerTitle: 'Hello Syed Shihab',
  bannerSubtitle: 'How can I help?',
  ctaTitle: 't2chat App',
  ctaSubtitle: 'Welcome to t2chat app',
  ctaDescription: 'Feel free to leave a message, we are here to help!',
  ctaButtonText: 'Start a chat',
  promotionalTitle: 't2devs.com',
  promotionalLink: 'https://t2devs.com',
};

export const normalizeHex = (value: string) => {
  const v = value.trim();
  if (!v) return '';
  if (v.startsWith('#')) return v.slice(0, 7);
  return `#${v}`.slice(0, 7);
};

export const isValidHex = (value: string) => /^#([\dA-Fa-f]{6})$/.test(value);
