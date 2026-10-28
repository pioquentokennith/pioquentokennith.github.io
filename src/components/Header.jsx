import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { activityFilters } from '../data/activities.js';

const serviceLinks = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'systems', label: 'Projects & Systems' },
];

function NavDropdown({ name, label, active, open, onToggle, children }) {
  return <li className="dropdown">
    <button className={`nav-link dropdown-toggle${active ? ' active' : ''}${open ? ' is-open' : ''}`} id={`${name}DropdownBtn`} type="button" data-nav-target={`#${name}`} aria-current={active ? 'location' : undefined} aria-haspopup="true" aria-expanded={open} aria-controls={`${name}DropdownMenu`} onClick={onToggle}>
      {label} <span className="dropdown-arrow" aria-hidden="true">{open ? '▲' : '▼'}</span>
    </button>
    <ul className={`dropdown-menu${open ? ' show' : ''}`} id={`${name}DropdownMenu`} aria-labelledby={`${name}DropdownBtn`}>{children}</ul>
  </li>;
}

export default function Header({ theme, setTheme, scroll, onActivityFilter, onServiceJump }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const trackRef = useRef(null);
  const focusFrame = useRef(null);
  const [indicator, setIndicator] = useState({});

  useEffect(() => () => cancelAnimationFrame(focusFrame.current), []);

  const close = () => { setMenuOpen(false); setDropdown(null); };
  useEffect(() => {
    const clickOutside = (event) => {
      if (!navRef.current.contains(event.target)) close();
      else if (!event.target.closest('.dropdown')) setDropdown(null);
    };
    const escape = (event) => {
      if (event.key !== 'Escape' || document.body.classList.contains('modal-open')) return;
      if (dropdown) document.getElementById(`${dropdown}DropdownBtn`)?.focus();
      else if (menuOpen) toggleRef.current.focus();
      close();
    };
    const resize = () => close();
    document.addEventListener('click', clickOutside);
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('click', clickOutside);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('resize', resize);
    };
  }, [dropdown, menuOpen]);

  useLayoutEffect(() => {
    const update = () => {
      const link = trackRef.current.querySelector('.nav-link.active');
      const track = trackRef.current.getBoundingClientRect();
      const rect = link?.getBoundingClientRect();
      if (rect?.width) setIndicator({ width: `${Math.max(rect.width - 20, 12)}px`, transform: `translateX(${rect.left - track.left + 10}px)` });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [scroll.activeSection]);

  function navigate(id) {
    close();
    cancelAnimationFrame(focusFrame.current);
    // Focus after the browser has followed the section anchor.
    focusFrame.current = requestAnimationFrame(() => {
      document.querySelector(`#${id} h1, #${id} h2`)?.focus({ preventScroll: true });
    });
  }
  const link = (id, label) => <li key={id}><a className={`nav-link${scroll.activeSection === id ? ' active' : ''}`} href={`#${id}`} aria-current={scroll.activeSection === id ? 'location' : undefined} onClick={() => navigate(id)}>{label}</a></li>;

  return <header className={`site-header${scroll.scrolled ? ' scrolled' : ''}`} id="siteHeader">
    <nav ref={navRef} className="navbar container" aria-label="Primary navigation">
      <a className="brand" href="#home" aria-label="Kennith home" onClick={close}>KENNITH<span>.</span></a>
      <button ref={toggleRef} className="menu-toggle" id="menuToggle" type="button" aria-expanded={menuOpen} aria-controls="navPanel" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => { setMenuOpen(!menuOpen); setDropdown(null); }}><span /><span /><span /></button>
      <div className={`nav-panel${menuOpen ? ' open' : ''}`} id="navPanel">
        <div className="nav-links-wrap" ref={trackRef}>
          <ul className="nav-links" id="navLinks">
            {link('home', 'Home')}{link('about', 'About')}{link('business', 'Business')}
            <NavDropdown name="services" label="Services" active={scroll.activeSection === 'services'} open={dropdown === 'services'} onToggle={() => setDropdown(dropdown === 'services' ? null : 'services')}>
              {serviceLinks.map(({ value, label }) => <li key={value}><a href={`#service-${value}`} onClick={() => { close(); onServiceJump(value); }}>{label}</a></li>)}
            </NavDropdown>
            <NavDropdown name="activities" label="Activities" active={scroll.activeSection === 'activities'} open={dropdown === 'activities'} onToggle={() => setDropdown(dropdown === 'activities' ? null : 'activities')}>
              {activityFilters.map(({ value, label }) => <li key={value}><a href="#activities" onClick={() => { close(); onActivityFilter(value); }}>{value === 'all' ? 'All Activities' : label}</a></li>)}
            </NavDropdown>
            {link('contact', 'Contact')}
          </ul>
          <span className="nav-indicator" id="navIndicator" aria-hidden="true" style={indicator} />
        </div>
        <div className="theme-control" aria-label="Appearance">
          <span className="theme-label">Theme</span>
          <div className="theme-options" role="group" aria-label="Choose appearance">
            {['light', 'dark'].map((choice) => <button key={choice} className={`theme-option${theme === choice ? ' active' : ''}`} type="button" aria-label={`${choice === 'light' ? 'Light' : 'Dark'} theme`} aria-pressed={theme === choice} title={choice === 'light' ? 'Light' : 'Dark'} onClick={() => setTheme(choice)}><span aria-hidden="true">{choice === 'light' ? '☀' : '☾'}</span><b>{choice === 'light' ? 'Light' : 'Dark'}</b></button>)}
          </div>
        </div>
      </div>
    </nav>
    <div className="scroll-progress" aria-hidden="true"><span id="scrollProgressBar" style={{ transform: `scaleX(${scroll.progress})` }} /></div>
  </header>;
}
