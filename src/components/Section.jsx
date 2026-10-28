import useReveal from '../hooks/useReveal.js';

export default function Section({ id, className = '', children }) {
  const [ref, visible] = useReveal();
  return <section ref={ref} id={id} className={`section ${className}${visible ? ' is-morph-visible' : ''}`} aria-labelledby={`${id}-title`} data-morph-section="">
    <div className="container">{children}</div>
  </section>;
}

export function SectionHeading({ id, eyebrow, title, description, split = false, centered = false, accent = false }) {
  return <div className={`section-heading${split ? ' split-heading' : ''}${centered ? ' centered' : ''}`} data-morph="heading">
    {accent && <span className="section-morph-accent" data-morph="accent" aria-hidden="true" />}
    {split ? <div><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`} tabIndex={-1}>{title}</h2></div> : <><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`} tabIndex={-1}>{title}</h2></>}
    <p>{description}</p>
  </div>;
}
