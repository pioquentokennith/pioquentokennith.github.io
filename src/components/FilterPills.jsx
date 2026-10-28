export default function FilterPills({ id, label, options, value, onChange, controls, className = '' }) {
  return <div className={`filter-pills ${className}`} id={id} role="group" aria-label={label}>
    {options.map(({ value: key, label: text }) => <button key={key} className={`filter-pill${key === value ? ' active' : ''}`} type="button" aria-pressed={key === value} aria-controls={controls} onClick={() => onChange(key)}>{text}</button>)}
  </div>;
}
