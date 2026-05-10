import { useState } from 'react';
import { useCart } from '../CartContext';
import { useStore } from '../StoreContext';
import Footer from '../components/Footer';
import { productImages } from '../imageMap';

export default function CheckoutPage({ setPage }) {
  const { items, totalPrice, totalItems } = useCart();
  const { placeOrder } = useStore();
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    placeOrder({
      customer: `${data.get('firstName')} ${data.get('lastName')}`,
      email: data.get('email'),
      items: [...items],
      itemCount: totalItems,
      total: totalPrice,
    });
    setPlaced(true);
  };

  if (placed) {
    return (
      <div>
        <div style={{ padding: "120px 80px", textAlign: "center" }}>
          <div style={{ marginBottom: 24 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="page-title" style={{ marginBottom: 12 }}>Order <span>Confirmed</span></h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
            Thank you for your purchase. You'll receive a confirmation email shortly with your order details.
          </p>
          <button className="btn-gold" onClick={() => { setPage("home"); }}>Continue Shopping</button>
        </div>
        <Footer setPage={setPage} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Checkout</h1>
        <p className="page-sub">{totalItems} item(s) · ${totalPrice.toFixed(2)}</p>
      </div>

      <form onSubmit={handlePlaceOrder} style={{ padding: "0 80px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: 24 }}>Shipping Information</h2>

            <div className="form-row form-group">
              <div>
                <label className="form-label">First Name</label>
                <input className="form-input" required name="firstName" placeholder="John" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input className="form-input" required name="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" required type="email" name="email" placeholder="john@example.com" />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" required type="tel" name="phone" placeholder="03136747591" />
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <input className="form-input" required name="address" placeholder="123 Main Street" />
            </div>

            <div className="form-row form-group">
              <div>
                <label className="form-label">City</label>
                <input className="form-input" required name="city" placeholder="Sahiwal" />
              </div>
              <div>
                <label className="form-label">Postal Code</label>
                <input className="form-input" required name="postal" placeholder="57000" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <select className="form-select form-input" required name="country" defaultValue="Pakistan">
                <option>Pakistan</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: 24, marginTop: 40 }}>Payment</h2>

            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input className="form-input" required placeholder="4242 4242 4242 4242" maxLength={19} />
            </div>

            <div className="form-row form-group">
              <div>
                <label className="form-label">Expiry Date</label>
                <input className="form-input" required placeholder="MM/YY" maxLength={5} />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input className="form-input" required placeholder="123" maxLength={4} type="password" />
              </div>
            </div>

            <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "14px 28px", marginTop: 8 }}>
              Place Order — ${totalPrice.toFixed(2)}
            </button>
          </div>

          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, padding: 28, position: "sticky", top: 80 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: 20 }}>Order Summary</h3>

            {items.map(item => {
              return (
                <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
                    <img src={productImages[item.id]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.95rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Qty: {item.qty}</div>
                    <div style={{ color: "var(--gold)", fontSize: "0.82rem", fontWeight: 500, marginTop: 2 }}>
                      ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 10 }}>
              <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 10 }}>
              <span style={{ color: "var(--text-muted)" }}>Shipping</span>
              <span style={{ color: "var(--gold)" }}>Free</span>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 10, paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 600 }}>
              <span>Total</span>
              <span style={{ color: "var(--gold)" }}>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
      <Footer setPage={setPage} />
    </div>
  );
}
