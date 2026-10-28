import { useEffect, useRef, useState } from 'react';
import { asset } from '../utils.js';

export default function Hero() {
  const [hover, setHover] = useState('');
  const [pointer, setPointer] = useState(null);
  const frame = useRef(null);
  const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reset = () => { cancelAnimationFrame(frame.current); setHover(''); setPointer(null); };
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    motion.addEventListener('change', reset);
    fine.addEventListener('change', reset);
    return () => { cancelAnimationFrame(frame.current); motion.removeEventListener('change', reset); fine.removeEventListener('change', reset); };
  }, []);
  const move = (event) => {
    if (!canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPointer({ x, y }));
  };

  return <section className={`hero section${hover ? ` is-${hover}-hovered is-connected` : ''}`} id="home" aria-labelledby="home-title" style={pointer ? { '--orbit-shift-x': `${(pointer.x - .5) * -8}px`, '--orbit-shift-y': `${(pointer.y - .5) * -8}px`, '--orbit-spot-x': `${pointer.x * 100}%`, '--orbit-spot-y': `${pointer.y * 100}%` } : undefined}>
    <div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" />
    <div className="container hero-grid">
      <div className="hero-copy">
        <p className="eyebrow hero-greeting">Hello, I'm</p>
        <h1 id="home-title" tabIndex={-1} onPointerEnter={() => canHover() && setHover('copy')} onPointerLeave={reset}><span className="hero-name-main">KENNITH ALBO</span><span className="hero-name-accent">PIOQUENTO</span></h1>
        <p className="hero-role">Student <i>•</i> Developer <i>•</i> Entrepreneur</p>
        <p className="hero-description">I build digital experiences and transform ideas into meaningful projects.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#services">Explore My Work <span className="btn-arrow">→</span></a>
          <a className="btn btn-secondary" href="#contact">Contact Me <svg className="button-user-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.25" /><path d="M5.75 19c.55-3.3 2.65-5.25 6.25-5.25s5.7 1.95 6.25 5.25" /></svg></a>
        </div>
      </div>
      <div className="hero-visual" id="portraitTilt" onPointerMove={move} onPointerEnter={() => canHover() && setHover('portrait')} onPointerLeave={reset} style={{ transform: pointer ? `perspective(900px) rotateY(${(pointer.x - .5) * 4}deg) rotateX(${(pointer.y - .5) * -4}deg)` : 'perspective(900px) rotateY(0deg) rotateX(0deg)', transition: pointer ? 'none' : 'transform var(--duration-ui) var(--ease-out)' }}>
        <div className="portrait-stage">
          <span className="code-symbol code-left">&lt;/&gt;</span><span className="code-symbol code-right">{'{ }'}</span>
          <span className="code-symbol code-dot dot-a">+</span><span className="code-symbol code-dot dot-b">•</span><span className="code-symbol code-dot dot-c">+</span>
          <span className="binary binary-a">01<br />10<br />01</span>
          <div className="portrait-ring ring-outer" /><div className="portrait-ring ring-inner" />
          <div className="portrait-wrap"><img src={asset('Assets/profile/Profile Picture.png')} alt="Portrait of Kennith Albo Pioquento" /></div>
        </div>
      </div>
    </div>
    <a className="scroll-cue" href="#about" aria-label="Scroll to About"><span>Scroll to explore</span><b>⌄</b></a>
  </section>;
}
