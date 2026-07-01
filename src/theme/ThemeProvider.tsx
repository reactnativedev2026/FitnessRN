import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import { AppTheme, ThemeMode, themes } from './colors';

const THEME_STORAGE_KEY = 'APP_THEME_MODE';

type ThemeContextValue = {
  theme: AppTheme;
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const systemMode = Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
  const [mode, setMode] = useState<ThemeMode>('dark'); // Set default to dark as requested

  useEffect(() => {
    const loadTheme = async () => {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedMode === 'light' || savedMode === 'dark') {
        setMode(savedMode);
      }
    };

    loadTheme();
  }, []);

  const setThemeMode = useCallback(async (nextMode: ThemeMode) => {
    setMode(nextMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
  }, []);

  const toggleTheme = useCallback(async () => {
    await setThemeMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setThemeMode]);

  const value = useMemo(
    () => ({
      theme: themes[mode],
      mode,
      isDark: mode === 'dark',
      setThemeMode,
      toggleTheme,
    }),
    [mode, setThemeMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }

  return context;
};
