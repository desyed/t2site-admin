import { createContext, use, useEffect, useMemo, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorMode: {
    name: string;
    isDark: boolean;
    isLight: boolean;
  };
};

export function getSystemThemeMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  colorMode: {
    isDark: getSystemThemeMode() === 'dark',
    isLight: getSystemThemeMode() === 'light',
    name: getSystemThemeMode(),
  },
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Disable transitions before theme change
    root.classList.add('no-transitions');

    // Force a reflow to ensure the no-transitions class takes effect immediately
    // This is crucial - without it, the browser might batch the changes
    window.getComputedStyle(root).getPropertyValue('opacity');

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = getSystemThemeMode();
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Re-enable transitions after a short delay
    const timeoutId = setTimeout(() => {
      root.classList.remove('no-transitions');
    }, 150); // Increasing timeout slightly for reliability

    // Clean up timeout if component unmounts
    return () => clearTimeout(timeoutId);
  }, [theme]);

  const colorMode = useMemo(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      return {
        name: systemTheme,
        isDark: systemTheme === 'dark',
        isLight: systemTheme === 'light',
      };
    }
    return {
      name: theme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
    };
  }, [theme]);

  const value = {
    theme,
    colorMode,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = use(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
