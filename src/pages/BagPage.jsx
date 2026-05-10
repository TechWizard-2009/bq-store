import { useCart } from '../CartContext';
import Footer from '../components/Footer';
import { BottleSVG } from '../components/BottleSVG';
import { cardPalettes } from '../data';
import { BagIcon, ChevronLeft } from '../components/Icons';

export default function BagPage({ setPage }) {
  const { items, removeFromCart, updateQty, totalPrice } = useCart();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Your <span>Bag</span></h1>
        <p className="page-sub">{items.length === 0 ? "Your bag is empty." : `${items.reduce((s, i) => s + i.qty, 0)} item(s) in your bag`}</p>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "0 80px 80px", textAlign: "center" }}>
          <div style={{ opacity: 0.3, marginBottom: 32 }}>
            <BottleSVG color="#6b6444" height={200} />
          </div>
          <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: "0.95rem" }}>Your fragrance collection awaits.</p>
          <button className="btn-gold" onClick={() => setPage("collections")}>Browse Collection</button>
        </div>
      ) : (
        <div style={{ padding: "0 80px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, alignItems: "start" }}>
            <div>
              {items.map(item => {
                const pal = cardPalettes[item.palette || 0];
                return (
                  <div key={item.id} style={{ display: "flex", gap: 20, padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ width: 100, height: 100, borderRadius: 6, background: pal.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <BottleSVG color={pal.color} height={80} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: 2 }}>{item.name}</div>
                      {item.type && <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{item.type}</div>}
                      <div style={{ color: "var(--gold)", fontSize: "0.9rem", fontWeight: 500, marginBottom: 12 }}>{item.price}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid var(--border)", borderRadius: 4 }}>
                          <button
                            style={{ background: "none", border: "none", color: "var(--text-muted)", padding: "6px 12px", cursor: "pointer", fontFamily: "'Jost',sans-serif", fontSize: "0.85rem" }}
                            onClick={() => updateQty(item.id, item.qty - 1)}
                          >−</button>
                          <span style={{ padding: "6px 12px", fontSize: "0.85rem", borderInline: "1px solid var(--border)", minWidth: 32, textAlign: "center" }}>{item.qty}</span>
                          <button
                            style={{ background: "none", border: "none", color: "var(--text-muted)", padding: "6px 12px", cursor: "pointer", fontFamily: "'Jost',sans-serif", fontSize: "0.85rem" }}
                            onClick={() => updateQty(item.id, item.qty + 1)}
                          >+</button>
                        </div>
                        <span style={{ color: "var(--text-dim)", fontSize: "0.82rem" }}>
                          ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "0.78rem", alignSelf: "flex-start", padding: 4 }}
                      onClick={() => removeFromCart(item.id)}
                    >Remove</button>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, padding: 28, position: "sticky", top: 80 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: 24 }}>Order Summary</h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: 12 }}>
                <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: 12 }}>
                <span style={{ color: "var(--text-muted)" }}>Shipping</span>
                <span style={{ color: "var(--gold)" }}>Free</span>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", margin: "16px 0", paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 600 }}>
                <span>Total</span>
                <span style={{ color: "var(--gold)" }}>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={() => setPage("checkout")}><BagIcon /> Checkout</button>
              <button className="btn-outline-gold" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
                onClick={() => setPage("collections")}
              >Continue Shopping</button>
            </div>
          </div>
        </div>
      )}
      <Footer setPage={setPage} />
    </div>
  );
}
