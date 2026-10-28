import { useRef, useState } from 'react';
import Section from './Section.jsx';
import FilterPills from './FilterPills.jsx';
import { genderLabel, productFilters, products } from '../data/products.js';
import { asset, scrollBehavior } from '../utils.js';

export function ProductCard({ product, onOpen }) {
  return <article className="product-card" data-product-card={product.id}>
    <div className="product-image"><img src={asset(product.image)} alt={`${product.shortName} KENSCENT perfume`} loading="lazy" /><span className="product-badge">{genderLabel(product.gender)}</span></div>
    <div className="product-content">
      <div className="product-title-row"><h4>{product.shortName}</h4><span className="product-price">{product.price}</span></div>
      <p>{product.category}</p>
      <button className="product-details-btn" type="button" aria-haspopup="dialog" aria-controls="productModal" onClick={(event) => onOpen(product, event.currentTarget.closest('.product-card'))}>View Details</button>
    </div>
  </article>;
}

export function ProductDetails({ product }) {
  const message = encodeURIComponent(`Hi! I am interested in KENSCENT ${product.shortName}. Is it available?`);
  return <div className="product-modal-layout">
    <div className="product-modal-media"><img src={asset(product.poster)} alt={`${product.shortName} product poster`} /></div>
    <div className="product-modal-copy">
      <p className="eyebrow gold">{genderLabel(product.gender)} • KENSCENT</p><h2>{product.name}</h2>
      <div className="product-modal-price">{product.price}</div><p className="product-modal-description">{product.description}</p>
      <div className="note-list">{[['Top Notes', product.topNotes], ['Heart Notes', product.heartNotes], ['Base Notes', product.baseNotes]].map(([label, notes]) => <div key={label}><strong>{label}</strong><span>{notes}</span></div>)}</div>
      <div className="modal-actions">
        <a className="btn btn-gold" href={`https://m.me/kenzo.ozamiz?text=${message}`} target="_blank" rel="noopener noreferrer">Message on Facebook</a>
        <a className="btn btn-secondary" href={`mailto:pioquentokennith@gmail.com?subject=KENSCENT%20Order%20Inquiry&body=${message}`}>Contact to Order</a>
      </div>
    </div>
  </div>;
}

export default function Business({ onOpenProduct }) {
  const [filter, setFilter] = useState('all');
  const [poster, setPoster] = useState('front');
  const gridRef = useRef(null);
  const items = products.filter((product) => filter === 'all' || product.gender === filter);
  const flip = () => setPoster((value) => value === 'front' ? 'back' : 'front');
  return <Section id="business" className="business-section">
    <div className="business-feature card-gold">
      <div className="business-copy" data-morph="content">
        <div className="business-brand-row"><img src={asset('Assets/Logo/LOGO.png')} alt="KENSCENT logo" className="business-logo" loading="lazy" /><div><p className="eyebrow gold">My Business</p><span className="business-name">KENSCENT</span></div></div>
        <h2 id="business-title" tabIndex={-1}>Perfume that <span>defines you.</span></h2>
        <p>Find your signature scent with premium-inspired fragrances made for everyday moments, special occasions, and thoughtful gifts.</p>
        <div className="business-points"><span>60 mL</span><span>Long-lasting</span><span>₱220 each</span></div>
        <button className="btn btn-gold" id="viewAllProducts" type="button" onClick={() => { setFilter('all'); gridRef.current.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }); }}>Browse Collection <span className="btn-arrow">→</span></button>
      </div>
      <div className="business-visual" data-morph="card" style={{ '--morph-delay': '60ms' }}>
        <div className="gold-glow" />
        <div className="business-poster-slides" role="button" tabIndex={0} aria-label={`Show ${poster === 'front' ? 'back' : 'front'} of KENSCENT poster`} onClick={flip} onKeyDown={(event) => {
          if (!['Enter', ' ', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
          event.preventDefault();
          if (event.key === 'ArrowLeft') setPoster('front');
          else if (event.key === 'ArrowRight') setPoster('back');
          else flip();
        }}>
          {['front', 'back'].map((side) => <img key={side} className={poster === side ? 'active' : ''} src={asset(`Assets/Perfume Photo Poster/${side === 'front' ? 'Front' : 'Back'} Design (1).png`)} alt={`${side === 'front' ? 'Front' : 'Back'} of the KENSCENT perfume collection poster`} aria-hidden={poster !== side} loading="lazy" />)}
        </div>
        <div className="poster-indicators" aria-hidden="true">{['front', 'back'].map((side) => <span key={side} className={poster === side ? 'active' : ''} />)}</div>
      </div>
    </div>
    <div className="products-toolbar" data-morph="content">
      <div><p className="eyebrow gold">Signature Scents</p><h3>Explore the collection</h3></div>
      <FilterPills id="productFilters" label="Filter perfume products" options={productFilters} value={filter} onChange={setFilter} controls="productGrid" />
    </div>
    <p className="results-status" id="productResults" role="status" aria-live="polite">{filter === 'all' ? `Showing all ${items.length} scents.` : `Showing ${items.length} scents ${genderLabel(filter).toLowerCase()}.`}</p>
    <div className="product-grid is-entering" id="productGrid" key={filter} ref={gridRef}>{items.map((product) => <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />)}</div>
  </Section>;
}
