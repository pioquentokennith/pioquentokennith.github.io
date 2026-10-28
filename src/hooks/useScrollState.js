import { useEffect, useState } from 'react';

export default function useScrollState() {
  const [state, setState] = useState({ activeSection: 'home', scrolled: false, progress: 0, backToTop: false });

  useEffect(() => {
    let frame;
    const sections = [...document.querySelectorAll('main section[id]')];
    const header = document.getElementById('siteHeader');
    const business = document.getElementById('business');
    const sync = () => {
      frame = null;
      const marker = (header?.offsetHeight || 0) + window.innerHeight * .34;
      let activeSection = 'home';
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) activeSection = section.id;
      });
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height > 0 && window.scrollY >= height - 2) activeSection = sections.at(-1).id;
      setState({ activeSection, scrolled: window.scrollY > 10, progress: height > 0 ? Math.min(Math.max(window.scrollY / height, 0), 1) : 0, backToTop: window.scrollY > 600 });
      const rect = business?.getBoundingClientRect();
      document.body.classList.toggle('business-active', Boolean(rect && rect.top <= window.innerHeight * .55 && rect.bottom >= window.innerHeight * .45));
    };
    const schedule = () => { if (frame == null) frame = requestAnimationFrame(sync); };
    sync();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    observer?.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.body.classList.remove('business-active');
    };
  }, []);

  return state;
}
