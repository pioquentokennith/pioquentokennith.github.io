window.projects = [
  {
    id: 1,
    name: 'Regex Learning Game',
    type: 'web',
    typeLabel: 'Web Application',
    icon: '.*',
    description: 'An interactive browser game for practicing regular expressions through easy, medium, and hard challenges.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Frontend-only academic project'
  },
  {
    id: 2,
    name: 'KENSCENT Business POS',
    type: 'systems',
    typeLabel: 'Business System',
    icon: 'POS',
    description: 'A practical point-of-sale concept created to help manage perfume products and day-to-day business transactions.',
    technologies: ['Application Design', 'Business Logic', 'Digital Tools'],
    status: 'Personal business project'
  },
  {
    id: 3,
    name: 'Portfolio Website',
    type: 'web',
    typeLabel: 'Responsive Website',
    icon: '</>',
    description: 'A responsive single-page personal portfolio with themes, filters, modals, and data-driven frontend content.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Current project'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projectModalGrid');
  const modal = document.getElementById('projectModal');
  const dialog = modal?.querySelector('.modal-dialog');
  const title = document.getElementById('projectModalTitle');
  const tabs = [...document.querySelectorAll('[data-project-tab]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeFilter = 'web';

  function renderProjects(filter, animate = true) {
    const labels = { web: 'Web Projects', mobile: 'Mobile Projects', systems: 'Projects & Systems' };
    const items = window.projects.filter((project) => project.type === filter);
    activeFilter = filter;
    if (title) title.textContent = labels[filter] || 'Projects';
    if (!grid) return;
    tabs.forEach((tab) => {
      const selected = tab.dataset.projectTab === filter;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    grid.innerHTML = items.length ? items.map((project) => `
      <article class="project-card">
        <div class="project-visual">
          <span>${project.icon}</span>
          <h3>${project.name}</h3>
        </div>
        <div class="project-copy">
          <p>${project.typeLabel}</p>
          <p>${project.description}</p>
          <div class="project-tags">${project.technologies.map((tech) => `<span>${tech}</span>`).join('')}</div>
          <div class="project-status">${project.status}</div>
        </div>
      </article>
    `).join('') : `<div class="empty-state project-empty"><strong>${labels[filter] || 'Projects'} are coming soon.</strong><p>Real project details will be added here when they are ready.</p></div>`;
    if (animate && !reducedMotion.matches) {
      grid.classList.remove('is-entering');
      void grid.offsetWidth;
      grid.classList.add('is-entering');
      window.setTimeout(() => grid.classList.remove('is-entering'), 160);
    }
  }

  function openProjects(trigger) {
    const filter = trigger.dataset.projectFilter;
    const canMorph = document.startViewTransition && !reducedMotion.matches && dialog;
    if (!canMorph) {
      renderProjects(filter, false);
      window.openPortfolioModal?.(modal, trigger);
      return;
    }

    trigger.style.viewTransitionName = 'project-morph';
    const transition = document.startViewTransition(() => {
      trigger.style.viewTransitionName = '';
      dialog.style.viewTransitionName = 'project-morph';
      renderProjects(filter, false);
      window.openPortfolioModal?.(modal, trigger);
    });
    transition.finished.finally(() => {
      trigger.style.viewTransitionName = '';
      dialog.style.viewTransitionName = '';
    });
  }

  document.querySelectorAll('.project-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => openProjects(trigger));
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => renderProjects(tab.dataset.projectTab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = tabs.findIndex((item) => item.dataset.projectTab === activeFilter);
      let nextIndex = currentIndex;
      if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      renderProjects(tabs[nextIndex].dataset.projectTab);
    });
  });
});
