import { useState } from 'react';
import { HeartIcon } from './Icons';
import { productImages } from '../imageMap';

export default function ProductCard({ p, onClick, showType = false }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="product-card coll-card" onClick={onClick}>
      <div style={{ position: "relative" }}>
        <div className="product-card-img" style={{ height: 220 }}>
          <img src={productImages[p.id]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {p.badge === "New" && <span className="product-badge">New</span>}
        {p.badge === "exclusive" && <span className="product-badge exclusive" style={{ textTransform: "uppercase", fontSize: "0.6rem" }}>Exclusive</span>}
        {p.badge === "sold-out" && <span className="product-badge sold-out">Sold Out</span>}
        <button className="heart-btn" onClick={e => { e.stopPropagation(); setLiked(!liked); }}>
          <HeartIcon filled={liked} />
        </button>
      </div>
      <div className="coll-card-inner">
        {p.tags && <div className="scent-tag">{p.tags}</div>}
        {showType && <div className="product-type">{p.type}</div>}
        <div className="product-name">{p.name}</div>
        {!p.tags && <div className="product-notes">{p.notes}</div>}
        <div className="product-price">{p.price}</div>
      </div>
    </div>
  );
}
