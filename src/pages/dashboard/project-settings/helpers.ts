export const normalizeHex = (value: string) => {
  const v = value.trim();
  if (!v) return '';
  if (v.startsWith('#')) return v.slice(0, 7);
  return `#${v}`.slice(0, 7);
};

export const isValidHex = (value: string) => /^#([\dA-Fa-f]{6})$/.test(value);

export function hexToHsl(hex: string): string {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number = 0,
    s: number = 0;
  const l: number = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = h * 60;
  }

  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function hslStringToHex(hsl: string): string {
  // Expected formats: "210 50% 90%" or "210, 50%, 90%"
  const parts = hsl.replace(/,/g, ' ').split(/\s+/).filter(Boolean) as string[];

  if (parts.length < 3) {
    throw new Error(`Invalid HSL string: "${hsl}"`);
  }

  const h = parseFloat(parts[0]!);
  const s = parseFloat(parts[1]!.replace('%', '')) / 100;
  const l = parseFloat(parts[2]!.replace('%', '')) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (value: number) => {
    const hex = Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, '0');
    return hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
