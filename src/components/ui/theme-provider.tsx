import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const root = window.document.documentElement;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const newResolvedTheme = theme === 'system' ? systemTheme : theme;
      
      root.classList.remove('light', 'dark');
      root.classList.add(newResolvedTheme);
      setResolvedTheme(newResolvedTheme);
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function ThemeToggle() {
  const { theme, toggleTheme, resolvedTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'system') return <Monitor className="w-4 h-4" />;
    if (theme === 'light') return <Sun className="w-4 h-4" />;
    return <Moon className="w-4 h-4" />;
  };

  const getLabel = () => {
    if (theme === 'system') return 'Système';
    if (theme === 'light') return 'Clair';
    return 'Sombre';
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-full justify-start"
    >
      {getIcon()}
      <span className="ml-2">Thème: {getLabel()}</span>
    </Button>
  );
}

export function ThemeToggleCompact() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'system') return <Monitor className="w-4 h-4" />;
    if (theme === 'light') return <Sun className="w-4 h-4" />;
    return <Moon className="w-4 h-4" />;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
    >
      {getIcon()}
    </Button>
  );
}

// Hook for theme-aware styles
export function useThemeAware() {
  const { resolvedTheme } = useTheme();
  
  const getColor = (light: string, dark: string) => {
    return resolvedTheme === 'dark' ? dark : light;
  };

  const getBgColor = (light: string, dark: string) => {
    return resolvedTheme === 'dark' ? dark : light;
  };

  const getTextColor = (light: string, dark: string) => {
    return resolvedTheme === 'dark' ? dark : light;
  };

  return {
    resolvedTheme,
    getColor,
    getBgColor,
    getTextColor,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light'
  };
}
