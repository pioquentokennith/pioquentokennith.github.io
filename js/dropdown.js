/* ============================================================
   Navbar Dropdown Menu — Vanilla JavaScript only
   Concepts used: querySelector() / getElementById(),
   addEventListener(), classList.toggle()
   No Bootstrap, jQuery, Tailwind JS, or any framework.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- 1. DOM element selection ---- */
  const servicesButton = document.querySelector('#servicesDropdownBtn');
  const servicesMenu = document.querySelector('#servicesDropdownMenu');
  const activitiesButton = document.getElementById('activitiesDropdownBtn');
  const activitiesMenu = document.getElementById('activitiesDropdownMenu');

  const navPanel = document.getElementById('navPanel');
  const menuToggle = document.getElementById('menuToggle');

  /* Bonus 3 — two independent dropdowns */
  const dropdowns = [
    { button: servicesButton, menu: servicesMenu },
    { button: activitiesButton, menu: activitiesMenu }
  ].filter((dropdown) => dropdown.button && dropdown.menu);

  if (!dropdowns.length) return;

  /* ---- Helpers ---- */
  function setArrow(button, isOpen) {
    const arrow = button.querySelector('[data-dropdown-arrow]');
    if (arrow) arrow.textContent = isOpen ? '\u25B2' : '\u25BC'; /* Bonus 2 — ▼ / ▲ */
  }

  function closeDropdown(dropdown) {
    dropdown.menu.classList.remove('show');
    dropdown.button.classList.remove('is-open');
    dropdown.button.setAttribute('aria-expanded', 'false');
    setArrow(dropdown.button, false);
  }

  function closeAllDropdowns() {
    dropdowns.forEach(closeDropdown);
  }

  function closeMobileMenu() {
    if (!navPanel || !navPanel.classList.contains('open')) return;
    navPanel.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
  }

  /* ---- 2. Click event on each dropdown button ---- */
  dropdowns.forEach((dropdown) => {
    dropdown.button.addEventListener('click', () => {
      /* close the other dropdown first so they never overlap */
      dropdowns.forEach((other) => {
        if (other !== dropdown) closeDropdown(other);
      });

      /* ---- 3. classList.toggle() shows / hides the menu ---- */
      const isOpen = dropdown.menu.classList.toggle('show');

      dropdown.button.classList.toggle('is-open', isOpen);
      dropdown.button.setAttribute('aria-expanded', String(isOpen));
      setArrow(dropdown.button, isOpen);
    });

    /* clicking a dropdown item closes the menu, then does its job */
    dropdown.menu.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      closeDropdown(dropdown);
      closeMobileMenu();

      /* Services items: highlight the matching service card */
      const serviceKey = link.dataset.serviceTarget;
      if (serviceKey) {
        const card = document.getElementById(`service-${serviceKey}`);
        if (card) {
          card.classList.add('is-focus-flash');
          window.setTimeout(() => card.classList.remove('is-focus-flash'), 1600);
        }
      }

      /* Activities items: apply the matching semester filter */
      const activityKey = link.dataset.activityJump;
      if (activityKey) {
        const pill = document.querySelector(`#activityFilters [data-activity-filter="${activityKey}"]`);
        pill?.click();
      }
    });
  });

  /* ---- Bonus 1 — close when clicking outside ---- */
  document.addEventListener('click', (event) => {
    dropdowns.forEach((dropdown) => {
      const clickedInside = dropdown.menu.contains(event.target) || dropdown.button.contains(event.target);
      if (!clickedInside) closeDropdown(dropdown);
    });
  });

  /* close with the Escape key */
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openDropdown = dropdowns.find((dropdown) => dropdown.menu.classList.contains('show'));
    if (!openDropdown) return;
    closeDropdown(openDropdown);
    openDropdown.button.focus();
  });

  /* ---- Bonus 4 — reset state when switching desktop / mobile layout ---- */
  window.addEventListener('resize', closeAllDropdowns);
});
