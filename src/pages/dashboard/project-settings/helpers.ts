export const normalizeHex = (value: string) => {
  const v = value.trim();
  if (!v) return '';
  if (v.startsWith('#')) return v.slice(0, 7);
  return `#${v}`.slice(0, 7);
};

export const isValidHex = (value: string) => /^#([\dA-Fa-f]{6})$/.test(value);
