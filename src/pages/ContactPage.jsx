import Footer from '../components/Footer';
import { MapPinIcon, PhoneIcon, MailIcon } from '../components/Icons';
import { heroImages } from '../imageMap';

export default function ContactPage({ setPage }) {
  return (
    <div>
      <div className="contact-hero">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1208,#2a1a08,#1a0a08)", opacity: 0.85, zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.3 }}>
          <img src={heroImages.contact} alt="Contact" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="contact-hero-text" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="contact-hero-title">Contact <span>Us</span></h1>
          <p className="contact-hero-sub">Our fragrance experts are available to assist you with personalized recommendations and exclusive concierge services.</p>
        </div>
      </div>

      <div className="contact-layout">
        <div>
          <h2 className="contact-section-title">Send an Inquiry</h2>
          <div className="form-row form-group">
            <div>
              <label className="form-label">First Name</label>
              <input className="form-input" placeholder="Jean" />
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <input className="form-input" placeholder="Dupont" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" placeholder="jean.dupont@heritage.com" type="email" />
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-select form-input">
              <option>Bespoke Fragrance Inquiry</option>
              <option>Order Support</option>
              <option>Gift Consultation</option>
              <option>Press & Media</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Your Message</label>
            <textarea className="form-textarea" placeholder="How may we assist you?" />
          </div>
          <button className="btn-gold" style={{ width: "100%", justifyContent: "center", letterSpacing: "0.18em", fontSize: "0.78rem" }}>SEND MESSAGE</button>
        </div>

        <div>
          <h2 className="contact-section-title">Our Location</h2>
          <div className="contact-info-item">
            <MapPinIcon />
            <div>
              <div className="contact-info-label">Sahiwal Boutique</div>
              <div className="contact-info-val">Sahiwal, Punjab, Pakistan</div>
            </div>
          </div>
          <div className="contact-info-item">
            <PhoneIcon />
            <div>
              <div className="contact-info-label">Phone</div>
              <div className="contact-info-val">03136747591</div>
            </div>
          </div>
          <div className="contact-info-item">
            <MailIcon />
            <div>
              <div className="contact-info-label">Email</div>
              <div className="contact-info-val">towork009@gmail.com</div>
            </div>
          </div>

          <div className="contact-map">
            <div style={{ textAlign: "center" }}>
              <MapPinIcon />
              <div style={{ marginTop: 8 }}>Sahiwal, Punjab</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: 4 }}>Pakistan</div>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, marginTop: 28, marginBottom: 8 }}>Connect With Us</div>
            <div className="social-icons">
              <a href="https://www.instagram.com/arh._2009/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://x.com/ArhamAli125607" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
