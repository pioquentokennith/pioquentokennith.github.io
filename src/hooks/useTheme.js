import { useEffect, useState } from 'react';

const storageKey = 'kennith-portfolio-theme';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0B111B' : '#FFFFFF');
    try { localStorage.setItem(storageKey, theme); }
    catch { /* The theme still works when browser storage is unavailable. */ }
  }, [theme]);

  return [theme, setTheme];
}
