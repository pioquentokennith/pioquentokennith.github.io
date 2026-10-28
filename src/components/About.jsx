import Section, { SectionHeading } from './Section.jsx';
import { asset } from '../utils.js';

const identities = [
  ['🎓', 'Student', 'Learning continuously and developing my technical and creative skills.'],
  ['⌨', 'Developer', 'Creating web, mobile, and software applications that solve practical problems.'],
  ['✦', 'Entrepreneur', 'Building KENSCENT while learning branding, operations, and customer experience.'],
  ['↗', 'Future Goals', 'Use technology to build innovative, useful, and sustainable businesses.'],
];
const skills = [
  ['HTML', 'html1.jpg', '#e44d26'], ['CSS', 'css1.jpg', '#1572b6'], ['JavaScript', 'javascript1.jpg', '#f7df1e'],
  ['Flutter', 'flutter1.jpg', '#54c5f8'], ['Git', 'git1.jpg', '#f05032'], ['GitHub', 'github1.jpg', '#6e5494'], ['Firebase', 'firebase1.jpg', '#ffca28'],
];

export default function About() {
  return <Section id="about" className="section-soft">
    <SectionHeading id="about" eyebrow="About Me" title="Who Am I?" description="I am a 3rd-year BSCS student and entrepreneur with a strong interest in technology, innovation, and business." accent />
    <div className="about-layout">
      <article className="about-profile card" data-morph="content">
        <div className="about-photo"><img src={asset('Assets/profile/profile2.png')} alt="Kennith seated in formal attire" loading="lazy" /></div>
        <div className="about-copy"><h3>Kennith Albo Pioquento</h3><p>I enjoy creating practical digital solutions, improving my technical skills, and exploring opportunities where technology and entrepreneurship can work together.</p><div className="about-meta"><span>BSCS • 3rd Year</span><span>Tangub City Global College</span></div></div>
      </article>
      <div className="identity-grid">{identities.map(([icon, title, description], index) => <article key={title} className="mini-card card" data-morph="card" style={{ '--morph-delay': `${Math.min(index + 1, 3) * 40}ms` }}><div className="mini-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div>
    <div className="skills-block" data-morph="content" style={{ '--morph-delay': '120ms' }}>
      <div className="skills-title-row"><div><p className="eyebrow">Skills &amp; Technologies</p><h3>Tools I work with</h3></div><p>Problem-solving • Communication • Business planning • Leadership</p></div>
      <div className="skill-grid" aria-label="Technology skills">{skills.map(([name, image, color]) => <div key={name} className="skill-chip" style={{ '--skill-color': color }}><img src={asset(`Assets/Logo/${image}`)} alt="" aria-hidden="true" loading="lazy" /><strong>{name}</strong></div>)}</div>
    </div>
  </Section>;
}
