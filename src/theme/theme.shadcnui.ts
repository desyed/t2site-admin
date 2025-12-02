import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default plugin(() => {}, {
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        serif: [...defaultTheme.fontFamily.serif, 'Arial'],
        mono: [...defaultTheme.fontFamily.mono],
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Add Inter as the primary sans font
      },
      screens: {
        xs: '439px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: {
          DEFAULT: 'hsl(var(--input))',
          background: 'hsl(var(--input-background))',
        },
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary-dark))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'card-secondary': {
          DEFAULT: 'hsl(var(--card-secondary))',
          foreground: 'hsl(var(--card-secondary-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        icon: {
          DEFAULT: 'hsl(var(--icon))',
        },
        chat: {
          primary: 'hsl(var(--chat-primary))',
          logoBadgeBackground: 'hsl(var(--chat-logo-badge-background))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        border: {
          to: { '--border-angle': '360deg' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,255,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,255,255,0.5)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        jelly: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(0.95, 1.05)' },
          '50%': { transform: 'scale(1.05, 0.95)' },
          '75%': { transform: 'scale(0.95, 1.05)' },
        },
        'glitch-1': {
          '0%, 100%': { clip: 'rect(44px, 9999px, 56px, 0)' },
          '20%': { clip: 'rect(12px, 9999px, 76px, 0)' },
          '40%': { clip: 'rect(89px, 9999px, 98px, 0)' },
          '60%': { clip: 'rect(23px, 9999px, 45px, 0)' },
          '80%': { clip: 'rect(67px, 9999px, 78px, 0)' },
        },
        'glitch-2': {
          '0%, 100%': { clip: 'rect(12px, 9999px, 34px, 0)' },
          '20%': { clip: 'rect(56px, 9999px, 67px, 0)' },
          '40%': { clip: 'rect(34px, 9999px, 89px, 0)' },
          '60%': { clip: 'rect(78px, 9999px, 90px, 0)' },
          '80%': { clip: 'rect(45px, 9999px, 56px, 0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        border: 'border var(--border-animation-speed) linear infinite',
        fadeOut: 'fadeOut 0.5s ease-out',
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
        jelly: 'jelly 0.5s ease-in-out',
        'glitch-1': 'glitch-1 0.8s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 0.8s infinite linear alternate-reverse',
      },
    },
  },
});
