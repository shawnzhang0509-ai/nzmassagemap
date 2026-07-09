export type HomeViewMode = 'map' | 'gallery';

const HOME_VIEW_MODE_KEY = 'nz_home_view_mode_v1';

export function saveHomeViewMode(mode: HomeViewMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(HOME_VIEW_MODE_KEY, mode);
  } catch {
    // ignore quota / private mode
  }
}

export function loadHomeViewMode(): HomeViewMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(HOME_VIEW_MODE_KEY);
    if (stored === 'gallery' || stored === 'map') return stored;

    const sessionValue = sessionStorage.getItem(HOME_VIEW_MODE_KEY);
    if (sessionValue === 'gallery' || sessionValue === 'map') {
      localStorage.setItem(HOME_VIEW_MODE_KEY, sessionValue);
      sessionStorage.removeItem(HOME_VIEW_MODE_KEY);
      return sessionValue;
    }
    return null;
  } catch {
    return null;
  }
}

export const HOME_VIEW_MODE_CHANGED_EVENT = 'home_view_mode_changed';
