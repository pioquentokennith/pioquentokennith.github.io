import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { scrollBehavior } from '../utils.js';

export default function Modal({ id, title, className = '', onClose, children, heading = false }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  const timer = useRef(null);
  const [closing, setClosing] = useState(false);
  closeRef.current = onClose;

  function close() {
    if (timer.current !== null) return;
    if (scrollBehavior() === 'auto') { closeRef.current(); return; }
    setClosing(true);
    timer.current = window.setTimeout(() => closeRef.current(), 160);
  }
  const requestClose = useRef(close);
  requestClose.current = close;

  useEffect(() => {
    const trigger = document.activeElement;
    const root = document.getElementById('root');
    const previousInert = root.inert;
    ref.current.querySelector('.modal-close').focus({ preventScroll: true });
    root.inert = true;
    document.body.classList.add('modal-open');
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose.current();
      }
      if (event.key !== 'Tab') return;
      const items = [...ref.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((el) => el.getClientRects().length > 0);
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer.current);
      timer.current = null;
      document.removeEventListener('keydown', onKey);
      root.inert = previousInert;
      document.body.classList.remove('modal-open');
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(<div ref={ref} id={id} className={`modal open${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby={`${id}Title`}>
    <div className="modal-backdrop" onClick={close} />
    <div className={`modal-dialog ${className}`} role="document">
      <button className="modal-close" type="button" aria-label={`Close ${heading ? 'projects' : 'details'}`} onClick={close}>×</button>
      {heading ? <div className="modal-heading"><p className="eyebrow">Selected Work</p><h2 id={`${id}Title`}>{title}</h2></div> : <h2 className="sr-only" id={`${id}Title`}>{title}</h2>}
      {children}
    </div>
  </div>, document.body);
}
