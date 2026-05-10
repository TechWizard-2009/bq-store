import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { SortIcon, ChevronLeft, ChevronRight } from '../components/Icons';
import { useStore } from '../StoreContext';

export default function CollectionsPage({ setPage }) {
  const { products } = useStore();
  const [activeFilter, setActiveFilter] = useState("All Scents");
  const [currentPage, setCurrentPage] = useState(1);
  const filters = ["All Scents", "Floral", "Woody", "Oriental", "Fresh", "Citrus"];

  const filtered = activeFilter === "All Scents"
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">The Complete <span>Collection</span></h1>
        <p className="page-sub">Explore our curated library of olfactory experiences. From the deep woods of the Orient to the fresh blossoms of a Mediterranean spring.</p>
      </div>
      <div style={{ padding: "0 80px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="pills">
          {filters.map(f => (
            <button key={f} className={`pill ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SortIcon />
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginRight: 8 }}>Sort by:</span>
          <select className="sort-select">
            <option>Newest First</option>
            <option>Price: Low–High</option>
            <option>Price: High–Low</option>
          </select>
        </div>
      </div>
      <div style={{ padding: "0 80px" }}>
        <div className="coll-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} showType onClick={() => setPage("product")} />
          ))}
        </div>
        <div className="pagination">
          <button className="page-nav"><ChevronLeft /> Previous</button>
          {[1, 2, 3].map(n => (
            <button key={n} className={`page-btn ${currentPage === n ? "active" : ""}`} onClick={() => setCurrentPage(n)}>{n}</button>
          ))}
          <button className="page-nav">Next <ChevronRight /></button>
        </div>
      </div>
      <div style={{ height: 64 }} />
      <Footer setPage={setPage} />
    </div>
  );
}
