import type { Config } from 'tailwindcss';

import tailwindcssAnimate from 'tailwindcss-animate';

import shadcnuiTheme from './src/theme/theme.shadcnui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  plugins: [shadcnuiTheme, tailwindcssAnimate],
} satisfies Config;
