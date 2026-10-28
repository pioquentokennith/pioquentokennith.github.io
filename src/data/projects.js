export const projects = [
  {
    id: 1, name: 'Regex Learning Game', type: 'web', typeLabel: 'Web Application', icon: '.*',
    description: 'An interactive browser game for practicing regular expressions through easy, medium, and hard challenges.',
    technologies: ['HTML', 'CSS', 'JavaScript'], status: 'Frontend-only academic project',
  },
  {
    id: 2, name: 'KENSCENT Business POS', type: 'systems', typeLabel: 'Business System', icon: 'POS',
    description: 'A practical point-of-sale concept created to help manage perfume products and day-to-day business transactions.',
    technologies: ['Application Design', 'Business Logic', 'Digital Tools'], status: 'Personal business project',
  },
  {
    id: 3, name: 'Portfolio Website', type: 'web', typeLabel: 'Responsive Website', icon: '</>',
    description: 'A responsive single-page personal portfolio with themes, filters, modals, and data-driven frontend content.',
    technologies: ['React', 'Vite', 'CSS', 'JavaScript'], status: 'Current project',
  },
];

export const services = [
  { id: 'web', icon: '◎', eyebrow: 'Web Applications', title: 'Responsive web experiences', description: 'Websites and browser-based systems designed to work smoothly across desktop and mobile screens.' },
  { id: 'mobile', icon: '▯', eyebrow: 'Mobile Applications', title: 'Usable mobile interfaces', description: 'Mobile-first application concepts focused on clear interactions, responsive layouts, and practical workflows.' },
  { id: 'systems', icon: '▱', eyebrow: 'Projects & Systems', title: 'Academic and business solutions', description: 'Personal, school, and entrepreneurial systems created to solve problems and strengthen my development skills.' },
];
