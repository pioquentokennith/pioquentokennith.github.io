import { useState } from 'react';
import Section, { SectionHeading } from './Section.jsx';
import FilterPills from './FilterPills.jsx';
import { activities, activityFilters } from '../data/activities.js';

export function ActivityDetails({ activity }) {
  return <div className="activity-modal-content">
    <p className="eyebrow">{activity.number}</p><h2>{activity.name}</h2>
    <div className="activity-modal-meta"><span>{activity.subject}</span><span>{activity.date}</span>{activity.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
    <p>{activity.description}</p><h3>Teacher / Activity Focus</h3><p>{activity.instructions}</p>
  </div>;
}

export default function Activities({ filter, onFilterChange, onOpenActivity }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const items = activities.filter((activity) => (filter === 'all' || activity.category === filter) && `${activity.number} ${activity.name} ${activity.subject} ${activity.description} ${activity.technologies.join(' ')}`.toLowerCase().includes(q));
  const emptyTitle = !activities.length ? 'Soon To Be Announced' : q ? 'No matching activities' : filter === 'all' ? 'No activities are available' : `No ${filter === 'midterm' ? 'midterm' : 'final term'} activities are available`;
  const emptyDescription = !activities.length ? 'Academic activities will appear here when they are available.' : q ? 'Try a different search term or semester filter.' : 'Activities will appear here when they are added.';
  return <Section id="activities">
    <SectionHeading id="activities" eyebrow="Academic Activities" title={<>Learning by <span>building.</span></>} description="Academic exercises and assignments will be shared here once they are provided." split />
    <div className={`activity-panel card${activities.length ? '' : ' is-empty'}`} data-morph="content">
      <div className="activity-controls">
        <FilterPills id="activityFilters" className="activity-filters" label="Filter academic activities" options={activityFilters} value={filter} onChange={onFilterChange} controls="activityList" />
        <label className="search-box"><span aria-hidden="true">⌕</span><input id="activitySearch" type="search" placeholder="Search activities..." autoComplete="off" aria-label="Search activities" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <div className="activity-list is-entering" id="activityList" key={`${filter}:${q}`}>{items.map((activity) => <article key={activity.id} className="activity-item">
        <div className="activity-icon">{activity.icon}</div><div className="activity-main"><div className="activity-title-line"><div><p className="activity-number">{activity.number}</p><h3 className="activity-name">{activity.name}</h3></div><time>{activity.date}</time></div><p className="activity-subject">{activity.subject}</p><p className="activity-description">{activity.description}</p></div>
        <button className="activity-view" type="button" aria-haspopup="dialog" aria-controls="activityModal" onClick={() => onOpenActivity(activity)}>View Activity</button>
      </article>)}</div>
      <div className="activity-empty" id="activityEmpty" role="status" aria-live="polite" hidden={items.length > 0}><strong>{emptyTitle}</strong><p>{emptyDescription}</p></div>
    </div>
  </Section>;
}
