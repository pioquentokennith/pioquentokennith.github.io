(() => {
  const root = document.documentElement;
  const STORAGE_KEY = 'kennith-portfolio-theme';

  const readPreference = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    return ['light', 'dark'].includes(savedTheme) ? savedTheme : 'light';
  };

  function applyTheme(choice, persist = false) {
    const safeChoice = ['light', 'dark'].includes(choice) ? choice : 'light';
    root.dataset.theme = safeChoice;
    root.dataset.themePreference = safeChoice;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', safeChoice === 'dark' ? '#0B111B' : '#FFFFFF');
    document.querySelectorAll('[data-theme-choice]').forEach((button) => {
      button.classList.toggle('active', button.dataset.themeChoice === safeChoice);
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === safeChoice));
    });
    if (persist) localStorage.setItem(STORAGE_KEY, safeChoice);
  }

  applyTheme(readPreference());

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(readPreference());
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-theme-choice]');
      if (!button) return;
      applyTheme(button.dataset.themeChoice, true);
    });
  });

  window.portfolioTheme = { applyTheme };
})();
