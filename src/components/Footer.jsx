import { LogoIcon, PhoneIcon, MailIcon } from './Icons';

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand"><LogoIcon /> Luxe Aroma</div>
          <p className="footer-tagline">Crafting sensory masterpieces since 1924. Our commitment to excellence defines every drop of essence we create.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <PhoneIcon />
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>03136747591</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <MailIcon />
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>towork009@gmail.com</span>
          </div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/arh._2009/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://x.com/ArhamAli125607" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" className="footer-social" aria-label="Facebook"><FacebookIcon /></a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Client Care</div>
          {["Shipping & Returns", "FAQ", "Contact Us"].map(l => (
            <span key={l} className="footer-link"
              onClick={() => setPage(l === "FAQ" ? "faq" : l === "Contact Us" ? "contact" : "shipping")}
            >{l}</span>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2024 LUXE AROMA. All rights reserved.</span>
        <div className="footer-legal">
          {["Privacy Policy", "Terms of Service", "Accessibility"].map(l => (
            <span key={l} className="footer-legal-link">{l}</span>
          ))}
          <span className="footer-legal-link" onClick={() => setPage("admin")} style={{ color: "var(--text-dim)", opacity: 0.5 }}>Admin</span>
        </div>
      </div>
    </footer>
  );
}
