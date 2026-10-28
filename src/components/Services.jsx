import { useRef, useState } from 'react';
import Section, { SectionHeading } from './Section.jsx';
import Modal from './Modal.jsx';
import { projects, services } from '../data/projects.js';

export function ProjectCard({ project }) {
  return <article className="project-card">
    <div className="project-visual"><span>{project.icon}</span><h3>{project.name}</h3></div>
    <div className="project-copy"><p>{project.typeLabel}</p><p>{project.description}</p><div className="project-tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-status">{project.status}</div></div>
  </article>;
}

export function ProjectModal({ initialFilter, onClose }) {
  const [filter, setFilter] = useState(initialFilter);
  const tabRefs = useRef([]);
  const labels = { web: 'Web Projects', mobile: 'Mobile Projects', systems: 'Projects & Systems' };
  const tabs = ['web', 'mobile', 'systems'];
  const items = projects.filter((project) => project.type === filter);
  function keyDown(event, index) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowLeft' ? -1 : 1) + 3) % 3;
    setFilter(tabs[next]);
    tabRefs.current[next].focus();
  }
  return <Modal id="projectModal" title={labels[filter]} className="modal-wide" heading onClose={onClose}>
    <div className="project-modal-tabs" role="tablist" aria-label="Project categories">{tabs.map((key, index) => <button key={key} ref={(node) => { tabRefs.current[index] = node; }} id={`project-tab-${key}`} type="button" role="tab" aria-controls="projectModalGrid" aria-selected={key === filter} tabIndex={key === filter ? 0 : -1} onClick={() => setFilter(key)} onKeyDown={(event) => keyDown(event, index)}>{key === 'web' ? 'Web' : key === 'mobile' ? 'Mobile' : 'Systems'}</button>)}</div>
    <div className="modal-project-grid is-entering" id="projectModalGrid" role="tabpanel" aria-labelledby={`project-tab-${filter}`} tabIndex={0} key={filter}>
      {items.length ? items.map((project) => <ProjectCard key={project.id} project={project} />) : <div className="empty-state project-empty"><strong>{labels[filter]} are coming soon.</strong><p>Real project details will be added here when they are ready.</p></div>}
    </div>
  </Modal>;
}

export default function Services({ onOpenProjects, highlighted }) {
  return <Section id="services" className="section-soft">
    <SectionHeading id="services" eyebrow="What I Build" title={<>Turning ideas into <span>powerful solutions.</span></>} description="I create modern, responsive, and user-friendly applications for web and mobile platforms." split />
    <div className="service-grid">{services.map((service, index) => <button key={service.id} className={`service-card card project-trigger${highlighted === service.id ? ' is-focus-flash' : ''}`} id={`service-${service.id}`} type="button" data-morph="card" aria-haspopup="dialog" aria-controls="projectModal" style={{ '--morph-delay': `${(index + 1) * 40}ms` }} onClick={(event) => onOpenProjects(service.id, event.currentTarget)}>
      <div className="service-icon">{service.icon}</div><p className="eyebrow">{service.eyebrow}</p><h3>{service.title}</h3><p>{service.description}</p><span className="text-button">View Projects <span>→</span></span>
    </button>)}</div>
    <div className="tech-stack" data-morph="content" style={{ '--morph-delay': '120ms' }}><span>Tech Stack</span><div className="tech-list">{['HTML', 'CSS', 'JavaScript', 'Flutter', 'Java', 'Git'].map((tech) => <b key={tech}>{tech}</b>)}</div></div>
  </Section>;
}
