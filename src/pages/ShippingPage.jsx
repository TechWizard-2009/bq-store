import { useState } from 'react';
import Footer from '../components/Footer';
import { BottleSVG } from '../components/BottleSVG';
import { TruckIcon, GlobeIcon, CheckIcon, MailIcon, PhoneIcon, MessageIcon } from '../components/Icons';

export default function ShippingPage({ setPage }) {
  const [activeTab, setActiveTab] = useState("Shipping");

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Shipping & Returns</h1>
        <p className="page-sub">Refined logistics for a seamless experience. Everything you need to know about our global delivery and concierge return process.</p>
      </div>
      <div style={{ padding: "0 80px 80px" }}>
        <div className="ship-tabs">
          {["Shipping", "Returns", "Tracking"].map(t => (
            <div key={t} className={`ship-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</div>
          ))}
        </div>

        <div className="ship-grid">
          <div className="ship-card">
            <div className="ship-card-title"><TruckIcon /> Domestic Delivery</div>
            {[
              { name: "Complimentary Standard", sub: "3–5 Business Days", price: "Free" },
              { name: "Priority Express", sub: "1–2 Business Days", price: "$25.00" },
              { name: "Next Day Concierge", sub: "Order by 12pm EST", price: "$45.00" },
            ].map((r, i) => (
              <div key={i} className="ship-row">
                <div>
                  <div className="ship-row-name">{r.name}</div>
                  <div className="ship-row-sub">{r.sub}</div>
                </div>
                <div className="ship-row-price">{r.price}</div>
              </div>
            ))}
          </div>
          <div className="ship-card">
            <div className="ship-card-title"><GlobeIcon /> Global Presence</div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.7 }}>We provide white-glove delivery to over 50 countries. All international shipments are fully insured and tracked.</p>
            {[
              { name: "Europe & UK", price: "$35.00" },
              { name: "Rest of World", price: "$50.00" },
            ].map((r, i) => (
              <div key={i} className="ship-row">
                <div className="ship-row-name">{r.name}</div>
                <div className="ship-row-price">{r.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="returns-card">
          <div className="returns-img-placeholder">
            <BottleSVG color="#3a5a3a" accent="#5a9a5a" height={160} />
          </div>
          <div>
            <h3 className="returns-title">Exquisite Returns</h3>
            <p className="returns-sub">Your satisfaction is our signature. We offer a 30-day complimentary return window for all unused items in their original packaging. Returns are inspected within 48 hours of receipt at our atelier.</p>
            <div className="returns-tags">
              <span className="returns-tag"><CheckIcon /> Free Prepaid Labels</span>
              <span className="returns-tag"><CheckIcon /> Immediate Exchange</span>
            </div>
            <button className="btn-outline-gold">Start a Return</button>
          </div>
        </div>

        <div className="track-card">
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 600, marginBottom: 8 }}>Locate Your LUXE</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Enter your tracking number or order ID to see the status of your journey.</p>
          </div>
          <div className="track-row">
            <input className="track-input" placeholder="LX-8829471" style={{ width: 220 }} />
            <button className="btn-gold">Track Order</button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}>Have additional questions?</p>
        </div>
        <div className="contact-row">
          <div className="contact-item">
            <MailIcon />
            <a href="mailto:towork009@gmail.com">towork009@gmail.com</a>
          </div>
          <div className="contact-item">
            <PhoneIcon />
            <a href="tel:03136747591">03136747591</a>
          </div>
          <div className="contact-item">
            <MessageIcon />
            <span style={{ color: "var(--gold)" }}>Live Atelier Chat</span>
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
