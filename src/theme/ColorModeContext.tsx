'use client';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'color-mode';

type Mode = 'light' | 'dark';

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light' as Mode,
});

export const useColorMode = () => useContext(ColorModeContext);

export default function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Mode | null;
    const systemPrefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialMode = stored || (systemPrefersDark ? 'dark' : 'light');
    setMode(initialMode);
  }, []);

  useEffect(() => {
    if (!mode) return;
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && (event.newValue === 'dark' || event.newValue === 'light')) {
        setMode(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleColorMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const safeMode = mode ?? 'light';

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: safeMode,
      },
    });
  }, [mode]);

  if (!mode) return null;

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode: safeMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
