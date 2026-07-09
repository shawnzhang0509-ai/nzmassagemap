import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  HOME_VIEW_MODE_CHANGED_EVENT,
  HomeViewMode,
  loadHomeViewMode,
  saveHomeViewMode,
} from '../utils/homeMapStateStorage';

interface HomeViewModeContextValue {
  homeViewMode: HomeViewMode;
  setHomeViewMode: (mode: HomeViewMode) => void;
}

const HomeViewModeContext = createContext<HomeViewModeContextValue | null>(null);

export const HomeViewModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [homeViewMode, setHomeViewModeState] = useState<HomeViewMode>(
    () => loadHomeViewMode() ?? 'gallery',
  );

  const setHomeViewMode = useCallback((mode: HomeViewMode) => {
    setHomeViewModeState(mode);
    saveHomeViewMode(mode);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(HOME_VIEW_MODE_CHANGED_EVENT, { detail: mode }),
      );
    }
  }, []);

  useEffect(() => {
    const onExternalChange = (event: Event) => {
      const mode = (event as CustomEvent<HomeViewMode>).detail;
      if (mode === 'map' || mode === 'gallery') {
        setHomeViewModeState(mode);
      }
    };

    window.addEventListener(HOME_VIEW_MODE_CHANGED_EVENT, onExternalChange);
    return () => {
      window.removeEventListener(HOME_VIEW_MODE_CHANGED_EVENT, onExternalChange);
    };
  }, []);

  const value = useMemo(
    () => ({ homeViewMode, setHomeViewMode }),
    [homeViewMode, setHomeViewMode],
  );

  return (
    <HomeViewModeContext.Provider value={value}>
      {children}
    </HomeViewModeContext.Provider>
  );
};

export function useHomeViewMode(): HomeViewModeContextValue {
  const context = useContext(HomeViewModeContext);
  if (!context) {
    throw new Error('useHomeViewMode must be used within HomeViewModeProvider');
  }
  return context;
}
