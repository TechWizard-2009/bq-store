import { BottleSVG } from '../components/BottleSVG';
import ProductCard from '../components/ProductCard';
import { useStore } from '../StoreContext';

export default function HomePage({ setPage }) {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4).map((p, i) =>
    i === 0 ? { ...p, badge: "New" } : p
  );

  return (
    <div>
      <section className="hero">
        <div style={{ animationFillMode: "forwards" }}>
          <div className="hero-eyebrow fade-up fade-up-1">The Art of Scent</div>
          <h1 className="hero-title fade-up fade-up-2">The<br />Essence<br />of<br />Elegance</h1>
          <p className="hero-sub fade-up fade-up-3">Discover our curated collection of rare and exquisite fragrances crafted for the discerning individual who values timeless luxury.</p>
          <div className="hero-btns fade-up fade-up-4">
            <button className="btn-gold" onClick={() => setPage("collections")}>Shop Collection</button>
            <button className="btn-outline">View Lookbook</button>
          </div>
        </div>
        <div className="hero-img-wrap">
          <div className="hero-img-placeholder">
            <div style={{ textAlign: "center" }}>
              <BottleSVG color="#7a6040" accent="#c9a84c" height={360} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head-row section-header">
          <div>
            <h2 className="section-title">Featured Masterpieces</h2>
            <p className="section-sub">Our current most-coveted seasonal aromas.</p>
          </div>
          <span className="section-explore" onClick={() => setPage("collections")}>Explore all →</span>
        </div>
        <div className="products-grid">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} p={p} onClick={() => setPage("product")} />
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2 className="newsletter-title">Join the Inner Circle</h2>
        <p className="newsletter-sub">Receive exclusive early access to limited edition launches and private atelier invitations.</p>
        <div className="newsletter-form">
          <input className="newsletter-input" placeholder="Your email address" />
          <button className="newsletter-btn">Subscribe</button>
        </div>
      </section>
    </div>
  );
}
