import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Business, { ProductDetails } from './components/Business.jsx';
import Services, { ProjectModal } from './components/Services.jsx';
import Activities, { ActivityDetails } from './components/Activities.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import useTheme from './hooks/useTheme.js';
import useScrollState from './hooks/useScrollState.js';
import { scrollBehavior } from './utils.js';

export default function App() {
  const [theme, setTheme] = useTheme();
  const scroll = useScrollState();
  const [activityFilter, setActivityFilter] = useState('all');
  const [highlighted, setHighlighted] = useState(null);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const highlightTimer = useRef(null);
  useEffect(() => () => { clearTimeout(toastTimer.current); clearTimeout(highlightTimer.current); }, []);

  function notify(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(''), 2400);
  }
  function highlightService(id) {
    clearTimeout(highlightTimer.current);
    setHighlighted(id);
    highlightTimer.current = window.setTimeout(() => setHighlighted(null), 1600);
  }
  function openModal(next, trigger) {
    if (!document.startViewTransition || scrollBehavior() === 'auto' || !trigger) {
      setModal(next);
      return;
    }
    const name = next.type === 'product' ? 'product-morph' : 'project-morph';
    trigger.style.viewTransitionName = name;
    let dialog;
    const transition = document.startViewTransition(() => {
      trigger.style.viewTransitionName = '';
      flushSync(() => setModal(next));
      dialog = document.querySelector('.modal.open .modal-dialog');
      if (dialog) dialog.style.viewTransitionName = name;
    });
    const cleanup = () => { trigger.style.viewTransitionName = ''; if (dialog) dialog.style.viewTransitionName = ''; };
    transition.finished.then(cleanup, cleanup);
  }
  const closeModal = () => setModal(null);

  return <>
    <a className="skip-link" href="#mainContent">Skip to content</a>
    <Header theme={theme} setTheme={setTheme} scroll={scroll} onActivityFilter={setActivityFilter} onServiceJump={highlightService} />
    <main id="mainContent" tabIndex={-1}>
      <Hero /><About />
      <Business onOpenProduct={(product, trigger) => openModal({ type: 'product', product }, trigger)} />
      <Services highlighted={highlighted} onOpenProjects={(filter, trigger) => openModal({ type: 'project', filter }, trigger)} />
      <Activities filter={activityFilter} onFilterChange={setActivityFilter} onOpenActivity={(activity) => openModal({ type: 'activity', activity })} />
      <Contact onNotify={notify} />
    </main>
    <Footer />
    {modal?.type === 'product' && <Modal id="productModal" title={`${modal.product.name} details`} className="product-modal-dialog" onClose={closeModal}><ProductDetails product={modal.product} /></Modal>}
    {modal?.type === 'project' && <ProjectModal initialFilter={modal.filter} onClose={closeModal} />}
    {modal?.type === 'activity' && <Modal id="activityModal" title={`${modal.activity.name} details`} onClose={closeModal}><ActivityDetails activity={modal.activity} /></Modal>}
    <button className={`back-to-top${scroll.backToTop ? ' visible' : ''}`} id="backToTop" type="button" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}><span aria-hidden="true">↑</span></button>
    <div className={`toast${toast ? ' show' : ''}`} id="toast" role="status" aria-live="polite">{toast}</div>
  </>;
}
