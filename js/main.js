document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const main = document.getElementById('mainContent');
  const footer = document.querySelector('.site-footer');
  const menuToggle = document.getElementById('menuToggle');
  const navPanel = document.getElementById('navPanel');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const navIndicator = document.getElementById('navIndicator');
  const sections = [...document.querySelectorAll('main section[id]')];
  const toast = document.getElementById('toast');
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTop = document.getElementById('backToTop');
  const businessSection = document.getElementById('business');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mobileNav = window.matchMedia('(max-width: 900px)');
  const pageRegions = [header, main, footer, backToTop].filter(Boolean);
  let activeModal = null;
  let scrollFrame = null;

  function setActiveNav(sectionId) {
    const activeLink = navLinks.find((link) => link.getAttribute('href') === `#${sectionId}`) || navLinks[0];
    navLinks.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    if (!navIndicator || mobileNav.matches || !activeLink) return;
    navIndicator.style.width = `${Math.max(activeLink.offsetWidth - 20, 12)}px`;
    navIndicator.style.transform = `translateX(${activeLink.offsetLeft + 10}px)`;
  }

  function currentSectionId() {
    const marker = (header?.offsetHeight || 0) + window.innerHeight * .34;
    let current = sections[0]?.id || 'home';
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) current = section.id;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.at(-1)?.id || current;
    }
    return current;
  }

  function syncScrollEffects() {
    header?.classList.toggle('scrolled', window.scrollY > 10);
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
    backToTop?.classList.toggle('visible', window.scrollY > 600);
    setActiveNav(currentSectionId());

    if (businessSection) {
      const rect = businessSection.getBoundingClientRect();
      document.body.classList.toggle('business-active', rect.top <= window.innerHeight * .55 && rect.bottom >= window.innerHeight * .45);
    }
    scrollFrame = null;
  }

  function requestScrollSync() {
    if (scrollFrame !== null) return;
    scrollFrame = requestAnimationFrame(syncScrollEffects);
  }

  function closeMenu({ restoreFocus = false } = {}) {
    navPanel?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
    if (restoreFocus && mobileNav.matches) menuToggle?.focus();
  }

  syncScrollEffects();
  window.addEventListener('scroll', requestScrollSync, { passive: true });
  window.addEventListener('resize', requestScrollSync, { passive: true });
  mobileNav.addEventListener?.('change', () => {
    closeMenu();
    requestAnimationFrame(() => setActiveNav(currentSectionId()));
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });

  menuToggle?.addEventListener('click', () => {
    const open = navPanel?.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.forEach((link) => link.addEventListener('click', () => {
    const section = document.querySelector(link.getAttribute('href'));
    closeMenu();
    requestAnimationFrame(() => {
      const heading = section?.querySelector('h1, h2');
      if (!heading) return;
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
    });
  }));

  document.addEventListener('click', (event) => {
    if (!navPanel?.classList.contains('open')) return;
    if (navPanel.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeMenu();
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  const morphSections = document.querySelectorAll('[data-morph-section]');
  if ('IntersectionObserver' in window) {
    const morphObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-morph-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    morphSections.forEach((section) => morphObserver.observe(section));
  } else {
    morphSections.forEach((section) => section.classList.add('is-morph-visible'));
  }

  const hero = document.getElementById('home');
  const heroTitle = document.getElementById('home-title');
  const tilt = document.getElementById('portraitTilt');
  let tiltFrame = null;
  let tiltX = 0;
  let tiltY = 0;
  let portraitHovered = false;
  let copyHovered = false;

  function syncHeroHover() {
    if (!hero) return;
    hero.classList.toggle('is-portrait-hovered', portraitHovered);
    hero.classList.toggle('is-copy-hovered', copyHovered);
    hero.classList.toggle('is-connected', portraitHovered || copyHovered);
  }

  function renderTilt() {
    if (!tilt) return;
    tilt.style.transform = `perspective(900px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
    tiltFrame = null;
  }

  function resetTilt() {
    if (!tilt) return;
    tiltX = 0;
    tiltY = 0;
    hero?.style.setProperty('--orbit-shift-x', '0px');
    hero?.style.setProperty('--orbit-shift-y', '0px');
    hero?.style.setProperty('--orbit-spot-x', '50%');
    hero?.style.setProperty('--orbit-spot-y', '50%');
    tilt.style.transition = `transform var(--duration-ui) var(--ease-out)`;
    if (tiltFrame === null) tiltFrame = requestAnimationFrame(renderTilt);
  }

  function resetHeroInteraction() {
    portraitHovered = false;
    copyHovered = false;
    syncHeroHover();
    resetTilt();
  }

  tilt?.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || reducedMotion.matches) return;
    const rect = tilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    tiltX = (x - .5) * 4;
    tiltY = (y - .5) * -4;
    hero?.style.setProperty('--orbit-shift-x', `${(x - .5) * -8}px`);
    hero?.style.setProperty('--orbit-shift-y', `${(y - .5) * -8}px`);
    hero?.style.setProperty('--orbit-spot-x', `${x * 100}%`);
    hero?.style.setProperty('--orbit-spot-y', `${y * 100}%`);
    tilt.style.transition = 'none';
    if (tiltFrame === null) tiltFrame = requestAnimationFrame(renderTilt);
  });
  tilt?.addEventListener('pointerenter', () => {
    if (!finePointer.matches) return;
    portraitHovered = true;
    syncHeroHover();
  });
  tilt?.addEventListener('pointerleave', () => {
    portraitHovered = false;
    syncHeroHover();
    resetTilt();
  });
  heroTitle?.addEventListener('pointerenter', () => {
    if (!finePointer.matches) return;
    copyHovered = true;
    syncHeroHover();
  });
  heroTitle?.addEventListener('pointerleave', () => {
    copyHovered = false;
    syncHeroHover();
  });
  reducedMotion.addEventListener?.('change', resetHeroInteraction);
  finePointer.addEventListener?.('change', resetHeroInteraction);

  function setPageInert(inert) {
    pageRegions.forEach((region) => {
      region.inert = inert;
      if (inert) region.setAttribute('aria-hidden', 'true');
      else region.removeAttribute('aria-hidden');
    });
  }

  function focusableElements(modal) {
    return [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hidden && element.getClientRects().length > 0);
  }

  function openModal(modal, trigger = document.activeElement) {
    if (!modal) return;
    if (activeModal && activeModal !== modal) closeModal(activeModal, { immediate: true });
    activeModal = modal;
    modal._trigger = trigger;
    modal.classList.remove('is-closing');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const closeButton = modal.querySelector('.modal-close');
    closeButton?.focus({ preventScroll: true });
    setPageInert(true);
    requestAnimationFrame(() => closeButton?.focus({ preventScroll: true }));
  }

  function finishClose(modal) {
    modal.classList.remove('open', 'is-closing');
    modal.setAttribute('aria-hidden', 'true');
    if (activeModal === modal) activeModal = null;
    if (!document.querySelector('.modal.open')) {
      document.body.classList.remove('modal-open');
      setPageInert(false);
    }
    if (modal._trigger?.isConnected) modal._trigger.focus();
  }

  function closeModal(modal, { immediate = reducedMotion.matches } = {}) {
    if (!modal?.classList.contains('open') || modal.classList.contains('is-closing')) return;
    if (immediate) {
      finishClose(modal);
      return;
    }
    modal.classList.add('is-closing');
    window.setTimeout(() => finishClose(modal), 160);
  }

  window.openPortfolioModal = openModal;
  window.closePortfolioModal = closeModal;

  document.addEventListener('click', (event) => {
    const close = event.target.closest('[data-close-modal]');
    if (close) closeModal(document.getElementById(close.dataset.closeModal));
  });

  document.addEventListener('keydown', (event) => {
    if (activeModal) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal(activeModal);
        return;
      }
      if (event.key === 'Tab') {
        const focusable = focusableElements(activeModal);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }
    if (event.key === 'Escape' && navPanel?.classList.contains('open')) closeMenu({ restoreFocus: true });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  async function copyText(value) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(value);
      return;
    } catch (clipboardError) {
      const input = document.createElement('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      let copied = false;
      try {
        copied = document.execCommand('copy');
      } finally {
        input.remove();
      }
      if (!copied) throw clipboardError;
    }
  }

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    clearTimeout(button.resetTimer);
    button.disabled = true;
    button.classList.remove('is-success', 'is-error');
    try {
      await copyText(button.dataset.copy);
      button.classList.add('is-success');
      showToast(`${button.dataset.copyName || 'Value'} copied to clipboard.`);
    } catch {
      button.classList.add('is-error');
      showToast(`Could not copy ${button.dataset.copyName?.toLowerCase() || 'the value'}. Please try again.`);
    }
    button.disabled = false;
    button.resetTimer = setTimeout(() => button.classList.remove('is-success', 'is-error'), 2400);
  });
});
