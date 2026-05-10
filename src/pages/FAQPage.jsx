import { useState } from 'react';
import Footer from '../components/Footer';
import { BottleSVG } from '../components/BottleSVG';
import { ChevronDown, ChevronUp, NoseIcon, BagIcon, UserIcon, TruckIcon } from '../components/Icons';
import { faqData } from '../data';

export default function FAQPage({ setPage }) {
  const tabs = ["Scent Selection", "Orders", "Account", "Shipping"];
  const [activeTab, setActiveTab] = useState("Scent Selection");
  const [openIdx, setOpenIdx] = useState(0);

  const items = faqData[activeTab] || [];

  const tabIcons = {
    "Scent Selection": <NoseIcon />,
    "Orders": <BagIcon />,
    "Account": <UserIcon />,
    "Shipping": <TruckIcon />,
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Concierge Support</h1>
        <p className="page-sub">Elevating your olfactory experience. Explore our guide to finding your signature essence, managing your bespoke orders, and account preferences.</p>
      </div>
      <div style={{ padding: "0 80px 80px" }}>
        <div className="faq-tabs">
          {tabs.map(t => (
            <div key={t} className={`faq-tab ${activeTab === t ? "active" : ""}`} onClick={() => { setActiveTab(t); setOpenIdx(0); }}>
              {tabIcons[t]} {t}
            </div>
          ))}
        </div>
        <div>
          <div className="gold-line" />
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}>{activeTab}</h3>
          {items.map((item, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <span>{item.q}</span>
                {openIdx === i ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openIdx === i && <div className="faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
        <div className="faq-cta">
          <div>
            <div className="faq-cta-title">Still seeking your essence?</div>
            <p className="faq-cta-sub">Our master perfumers are available for private virtual consultations to craft your bespoke fragrance profile.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-outline-gold">Book Consultation</button>
              <button className="btn-gold">Message Concierge</button>
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg,#2a2010,#3a3018)", borderRadius: 8, width: 200, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BottleSVG color="#9b7a2a" height={160} />
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
