import { useState } from 'react';
import { LogoIcon, BagIcon, UserIcon } from './Icons';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';

export default function Navbar({ page, setPage, onAuthClick }) {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const links = ["Home", "Collections", "Contact"];
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("home")}>
        <LogoIcon />
        <span className="nav-brand">Luxe Aroma</span>
      </div>
      <div className="nav-links">
        {links.map(l => (
          <span
            key={l}
            className={`nav-link ${page === l.toLowerCase() ? "active" : ""}`}
            onClick={() => setPage(l.toLowerCase())}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="nav-right">
        <button className="nav-icon-btn" style={{ position: "relative" }} onClick={() => setPage("bag")}>
          <BagIcon />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
        {user ? (
          <div style={{ position: "relative" }}>
            <button
              className="nav-icon-btn"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
            {showDropdown && (
              <div
                style={{
                  position: "absolute", top: "100%", right: 0, marginTop: 8,
                  background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 6,
                  padding: 8, minWidth: 150, zIndex: 50,
                }}
              >
                <div style={{ padding: "8px 12px", fontSize: "0.78rem", color: "var(--text-muted)", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>
                  {user.email}
                </div>
                <button
                  onClick={() => { logout(); setShowDropdown(false); }}
                  style={{
                    width: "100%", background: "none", border: "none",
                    padding: "8px 12px", cursor: "pointer",
                    fontFamily: "'Jost',sans-serif", fontSize: "0.82rem",
                    color: "var(--text-muted)", textAlign: "left", borderRadius: 4,
                  }}
                  onMouseEnter={e => e.target.style.background = "var(--bg3)"}
                  onMouseLeave={e => e.target.style.background = "none"}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="nav-icon-btn" onClick={onAuthClick}>
            <UserIcon />
          </button>
        )}
      </div>
    </nav>
  );
}
