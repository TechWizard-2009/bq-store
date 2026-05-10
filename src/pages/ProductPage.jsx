import { useState } from 'react';
import { useCart } from '../CartContext';
import Footer from '../components/Footer';
import { BottleSVG } from '../components/BottleSVG';
import { BagIcon, NoseIcon, FlowerIcon, TreeIcon } from '../components/Icons';
import { midnightJasmine } from './ProductData';

const thumbColors = [
  { color: "#7a6040", accent: "#c9a84c" },
  { color: "#8b5a2a", accent: "#d4a843" },
  { color: "#2a4a5a", accent: "#5a9ab0" },
];

export default function ProductPage({ setPage }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(midnightJasmine);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <div className="pd-layout">
        <div>
          <div style={{ background: "#1a1208", borderRadius: 8, height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BottleSVG color={thumbColors[activeThumb].color} accent={thumbColors[activeThumb].accent} height={300} />
          </div>
          <div className="pd-thumbs">
            {thumbColors.map((c, i) => (
              <div
                key={i}
                className={`pd-thumb-placeholder ${activeThumb === i ? "active" : ""}`}
                style={{ background: "#1a1208", borderColor: activeThumb === i ? "var(--gold)" : "var(--border)" }}
                onClick={() => setActiveThumb(i)}
              >
                <BottleSVG color={c.color} accent={c.accent} height={60} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="pd-eyebrow">Limited Edition</div>
          <h1 className="pd-title">Midnight<br />Jasmine</h1>
          <div className="pd-subtitle">Eau de Parfum</div>
          <p className="pd-desc">A celestial journey through the gardens of Grasse at twilight. This limited edition fragrance captures the elusive scent of night-blooming jasmine under the silver moon.</p>
          <div className="pd-price-row">
            <span className="pd-price">$245.00</span>
            <button className="btn-gold" onClick={handleAdd}>
              {added ? "✓ Added" : <><BagIcon /> Add to Bag</>}
            </button>
          </div>
          <div className="pd-volume">100ml / 3.4 fl.oz</div>
          <div className="pd-pyramid-label">Olfactory Pyramid</div>
          <div className="pd-pyramid">
            {[
              { icon: <NoseIcon />, label: "TOP", name: "Bergamot,\nNeroli" },
              { icon: <FlowerIcon />, label: "HEART", name: "Night Jasmine" },
              { icon: <TreeIcon />, label: "BASE", name: "Sandalwood,\nMusk" },
            ].map((note, i) => (
              <div key={i} className="pd-note-card">
                {note.icon}
                <div className="pd-note-label">{note.label}</div>
                <div className="pd-note-name" style={{ whiteSpace: "pre-line" }}>{note.name}</div>
              </div>
            ))}
          </div>
          <div className="pd-perfumer">
            <div className="pd-pfm-avatar-placeholder">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="pd-pfm-role">Master Perfumer</div>
              <div className="pd-pfm-name">Elena Rossi</div>
              <p className="pd-pfm-quote">"I wanted to create a scent that felt like a secret. Midnight Jasmine isn't just a floral; it's the feeling of a warm Mediterranean breeze carrying the whispers of flowers that only reveal their true soul after the sun disappears."</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 600, textAlign: "center", marginBottom: 32 }}>The Core Essence</h2>
      </div>
      <div className="core-grid">
        {[
          { name: "Calabrian Bergamot", sub: "Radiant & Zesty", bg: "linear-gradient(135deg,#1a3a1a,#3a5a1a)" },
          { name: "Grandiflorum Jasmine", sub: "Intoxicating & Floral", bg: "linear-gradient(135deg,#1a2a1a,#2a4a2a)" },
          { name: "Mysore Sandalwood", sub: "Creamy & Wooded", bg: "linear-gradient(135deg,#3a2a1a,#5a4a2a)" },
        ].map((c, i) => (
          <div key={i} className="core-card-placeholder" style={{ background: c.bg }}>
            <div className="core-card-overlay" />
            <div className="core-card-text">
              <div className="core-card-name">{c.name}</div>
              <div className="core-card-sub">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
