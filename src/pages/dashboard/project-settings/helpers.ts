export type WidgetConfig = {
  background: string;
  foreground: string;
  logoBadgeBackgroundColor: string;
};

export const DEFAULTS: WidgetConfig = {
  background: '#FFFCE8',
  foreground: '#000000',
  logoBadgeBackgroundColor: '#FCE654',
};

export const normalizeHex = (value: string) => {
  const v = value.trim();
  if (!v) return '';
  if (v.startsWith('#')) return v.slice(0, 7);
  return `#${v}`.slice(0, 7);
};

export const isValidHex = (value: string) => /^#([\dA-Fa-f]{6})$/.test(value);
