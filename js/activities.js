window.activities = [];

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('activityList');
  const filters = document.getElementById('activityFilters');
  const search = document.getElementById('activitySearch');
  const empty = document.getElementById('activityEmpty');
  const emptyTitle = document.getElementById('activityEmptyTitle');
  const emptyDescription = document.getElementById('activityEmptyDescription');
  const controls = document.querySelector('.activity-controls');
  const panel = document.querySelector('.activity-panel');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!list || !filters || !search || !empty || !emptyTitle || !emptyDescription) return;

  let activeFilter = 'all';
  let query = '';

  function render() {
    const q = query.trim().toLowerCase();
    const items = window.activities.filter((activity) => {
      const inCategory = activeFilter === 'all' || activity.category === activeFilter;
      const haystack = `${activity.number} ${activity.name} ${activity.subject} ${activity.description} ${activity.technologies.join(' ')}`.toLowerCase();
      return inCategory && (!q || haystack.includes(q));
    });

    list.innerHTML = items.map((activity) => `
      <article class="activity-item">
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-main">
          <div class="activity-title-line"><div><p class="activity-number">${activity.number}</p><h3 class="activity-name">${activity.name}</h3></div><time>${activity.date}</time></div>
          <p class="activity-subject">${activity.subject}</p>
          <p class="activity-description">${activity.description}</p>
        </div>
        <button class="activity-view" type="button" data-activity-id="${activity.id}">View Activity</button>
      </article>
    `).join('');

    const hasActivities = window.activities.length > 0;
    if (controls) controls.hidden = false;
    panel?.classList.toggle('is-empty', !hasActivities);
    if (!window.activities.length) {
      emptyTitle.textContent = 'Soon To Be Announced';
      emptyDescription.textContent = 'Academic activities will appear here when they are available.';
    } else if (q) {
      emptyTitle.textContent = 'No matching activities';
      emptyDescription.textContent = 'Try a different search term or semester filter.';
    } else {
      const term = activeFilter === 'midterm' ? 'midterm' : 'final term';
      emptyTitle.textContent = activeFilter === 'all' ? 'No activities are available' : `No ${term} activities are available`;
      emptyDescription.textContent = 'Activities will appear here when they are added.';
    }
    empty.hidden = items.length > 0;
    if (items.length && !reducedMotion.matches) {
      list.classList.remove('is-entering');
      void list.offsetWidth;
      list.classList.add('is-entering');
      window.setTimeout(() => list.classList.remove('is-entering'), 160);
    }
  }

  function openActivity(activity) {
    const modal = document.getElementById('activityModal');
    const content = document.getElementById('activityModalContent');
    const title = document.getElementById('activityModalTitle');
    if (!modal || !content) return;
    if (title) title.textContent = `${activity.name} details`;
    content.innerHTML = `
      <div class="activity-modal-content">
        <p class="eyebrow">${activity.number}</p>
        <h2>${activity.name}</h2>
        <div class="activity-modal-meta">
          <span>${activity.subject}</span><span>${activity.date}</span>${activity.technologies.map((tech) => `<span>${tech}</span>`).join('')}
        </div>
        <p>${activity.description}</p>
        <h3>Teacher / Activity Focus</h3>
        <p>${activity.instructions}</p>
      </div>`;
    window.openPortfolioModal?.(modal, document.activeElement);
  }

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-activity-filter]');
    if (!button) return;
    activeFilter = button.dataset.activityFilter;
    filters.querySelectorAll('[data-activity-filter]').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    render();
  });

  search.addEventListener('input', () => {
    query = search.value;
    render();
  });

  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-activity-id]');
    if (!button) return;
    const activity = window.activities.find((item) => item.id === Number(button.dataset.activityId));
    if (activity) openActivity(activity);
  });

  render();
});
