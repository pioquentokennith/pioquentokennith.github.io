import { useEffect, useRef, useState } from 'react';
import Section, { SectionHeading } from './Section.jsx';
import { copyText } from '../utils.js';

function CopyButton({ value, name, onNotify }) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const timer = useRef(null);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(timer.current); };
  }, []);
  async function copy() {
    clearTimeout(timer.current);
    setBusy(true);
    setStatus('');
    try {
      await copyText(value);
      if (!mounted.current) return;
      setStatus('success');
      onNotify(`${name} copied to clipboard.`);
    } catch {
      if (!mounted.current) return;
      setStatus('error');
      onNotify(`Could not copy ${name.toLowerCase()}. Please try again.`);
    } finally {
      if (mounted.current) {
        setBusy(false);
        timer.current = window.setTimeout(() => setStatus(''), 2400);
      }
    }
  }
  return <button className={`copy-button${status ? ` is-${status}` : ''}`} type="button" disabled={busy} aria-label={`Copy ${name === 'Email' ? 'email address' : 'phone number'}`} onClick={copy}><span>Copy</span><b aria-hidden="true">✓</b></button>;
}

const contacts = [
  { title: 'Gmail', icon: '✉', className: 'mail', text: 'pioquentokennith@gmail.com', href: 'mailto:pioquentokennith@gmail.com', action: 'Email Me', copyName: 'Email' },
  { title: 'Phone', icon: '☎', className: 'phone', text: '0964 133 4715', href: 'tel:+639641334715', action: 'Call Me', copyName: 'Phone number' },
  { title: 'Facebook', icon: 'f', className: 'facebook', text: 'Kennith Albo Pioquento', href: 'https://www.facebook.com/kenzo.ozamiz/', action: 'Visit Profile', external: true },
];

export default function Contact({ onNotify }) {
  return <Section id="contact" className="section-soft contact-section">
    <SectionHeading id="contact" eyebrow="Let's Connect" title="Have something in mind?" description="Whether it's about a project, collaboration, business inquiry, or opportunity, feel free to reach out." centered accent />
    <div className="contact-grid">{contacts.map((contact, index) => {
      const link = <a className="btn btn-small btn-primary" href={contact.href} target={contact.external ? '_blank' : undefined} rel={contact.external ? 'noopener noreferrer' : undefined}>{contact.action}{contact.external && <span className="sr-only"> (opens in a new tab)</span>}</a>;
      return <article key={contact.title} className="contact-card card" data-morph="card" style={{ '--morph-delay': `${(index + 1) * 40}ms` }}>
        <div className={`contact-icon ${contact.className}`} aria-hidden="true">{contact.icon}</div><h3>{contact.title}</h3><p>{contact.text}</p>
        {contact.copyName ? <div className="contact-actions">{link}<CopyButton value={contact.text} name={contact.copyName} onNotify={onNotify} /></div> : link}
      </article>;
    })}</div>
    <div className="contact-note card" data-morph="content" style={{ '--morph-delay': '120ms' }}><div><span className="paper-plane" aria-hidden="true">➤</span></div><p>I'm always open to new opportunities, useful collaborations, and ideas worth building.</p></div>
  </Section>;
}
