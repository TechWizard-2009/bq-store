import { useState } from 'react';
import { useStore } from '../StoreContext';
import { useCart } from '../CartContext';
import { BottleSVG } from '../components/BottleSVG';
import { cardPalettes } from '../data';

const tabs = ["Dashboard", "Products", "Orders", "Settings"];

const inputStyle = {
  width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
  borderRadius: 4, padding: "10px 14px", fontFamily: "'Jost',sans-serif",
  fontSize: "0.82rem", color: "var(--text)", outline: "none", boxSizing: "border-box",
};

export default function AdminPage({ setPage }) {
  const { products, orders, addProduct, updateProduct, deleteProduct } = useStore();
  const { totalItems, totalPrice, items } = useCart();
  const [tab, setTab] = useState("Dashboard");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", type: "", price: "", category: "", tags: "", notes: "" });
  const [showForm, setShowForm] = useState(false);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  const handleEdit = (p) => {
    setForm({
      name: p.name, type: p.type || "", price: p.price,
      category: p.category || "", tags: p.tags || "", notes: p.notes || "",
    });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) deleteProduct(id);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const cleanPrice = parseFloat(form.price.replace('$', '')) || 0;
    const product = {
      name: form.name, type: form.type, price: `$${cleanPrice.toFixed(2)}`,
      category: form.category, tags: form.tags ? form.tags.toUpperCase() : '', notes: form.notes,
      palette: Math.floor(Math.random() * 8),
    };
    if (editing) {
      updateProduct(editing, product);
    } else {
      addProduct(product);
    }
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", type: "", price: "", category: "", tags: "", notes: "" });
  };

  const Dashboard = () => (
    <div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16, marginBottom: 32,
      }}>
        {[
          { label: "Total Products", value: products.length, color: "var(--gold)" },
          { label: "Total Orders", value: orders.length, color: "#5a9ab0" },
          { label: "Revenue", value: `$${totalRevenue.toFixed(2)}`, color: "#5a9a5a" },
          { label: "Items in Cart", value: totalItems, color: "#c084fc" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "var(--bg2)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "24px 20px",
          }}>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 600, color: s.color, fontFamily: "'Cormorant Garamond',serif" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, padding: 24 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: 16 }}>Recent Orders</h3>
        {orders.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No orders yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
              <thead>
                <tr style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Order</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Customer</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Items</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Total</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 8px", color: "var(--gold)" }}>{o.id}</td>
                    <td style={{ padding: "10px 8px" }}>{o.customer}</td>
                    <td style={{ padding: "10px 8px", color: "var(--text-muted)" }}>{o.itemCount}</td>
                    <td style={{ padding: "10px 8px" }}>${o.total.toFixed(2)}</td>
                    <td style={{ padding: "10px 8px" }}><span style={{ color: "#5a9a5a" }}>● Confirmed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const ProductsPanel = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{products.length} products total</p>
        <button className="btn-gold" onClick={() => { setEditing(null); setForm({ name: "", type: "", price: "", category: "", tags: "", notes: "" }); setShowForm(!showForm); }}>
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} style={{
          background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8,
          padding: 24, marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}>
          <div>
            <label className="form-label">Name</label>
            <input style={inputStyle} required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Type</label>
            <input style={inputStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} placeholder="Eau de Parfum" />
          </div>
          <div>
            <label className="form-label">Price ($)</label>
            <input style={inputStyle} required type="text" value={form.price.replace('$', '')} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="245.00" />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="">Select…</option>
              <option>Floral</option>
              <option>Woody</option>
              <option>Oriental</option>
              <option>Citrus</option>
              <option>Fresh</option>
            </select>
          </div>
          <div>
            <label className="form-label">Tags</label>
            <input style={inputStyle} value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="FLORAL • MUSK" />
          </div>
          <div>
            <label className="form-label">Notes</label>
            <input style={inputStyle} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Fresh, Light, Elegant" />
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12 }}>
            <button type="submit" className="btn-gold">
              {editing ? "Update Product" : "Add Product"}
            </button>
            <button type="button" className="btn-outline-gold" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead>
            <tr style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Product</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Type</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Category</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Price</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const pal = cardPalettes[p.palette || 0];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 8px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 4, background: pal.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <BottleSVG color={pal.color} height={28} />
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600 }}>{p.name}</span>
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--text-muted)" }}>{p.type || "—"}</td>
                  <td style={{ padding: "10px 8px", color: "var(--text-muted)" }}>{p.category || "—"}</td>
                  <td style={{ padding: "10px 8px", color: "var(--gold)", fontWeight: 500 }}>{p.price}</td>
                  <td style={{ padding: "10px 8px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-outline-gold" style={{ padding: "4px 12px", fontSize: "0.72rem" }} onClick={() => handleEdit(p)}>Edit</button>
                      <button style={{
                        background: "none", border: "1px solid #8b0000", color: "#8b0000",
                        padding: "4px 12px", fontSize: "0.72rem", borderRadius: 3, cursor: "pointer",
                        fontFamily: "'Jost',sans-serif",
                      }} onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const OrdersPanel = () => (
    <div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 20 }}>{orders.length} orders total</p>
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: 48, color: "var(--text-muted)" }}>
          <p>No orders have been placed yet.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Order ID</th>
                <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Customer</th>
                <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Email</th>
                <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Items</th>
                <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Total</th>
                <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Date</th>
                <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 8px", color: "var(--gold)", fontFamily: "monospace", fontSize: "0.78rem" }}>{o.id}</td>
                  <td style={{ padding: "10px 8px" }}>{o.customer}</td>
                  <td style={{ padding: "10px 8px", color: "var(--text-muted)" }}>{o.email}</td>
                  <td style={{ padding: "10px 8px" }}>{o.itemCount}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 500 }}>${o.total.toFixed(2)}</td>
                  <td style={{ padding: "10px 8px", color: "var(--text-muted)", fontSize: "0.78rem" }}>{new Date(o.date).toLocaleDateString()}</td>
                  <td style={{ padding: "10px 8px" }}><span style={{ color: "#5a9a5a" }}>● {o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const SettingsPanel = () => {
    const [newName, setNewName] = useState(sessionStorage.getItem('lx_admin_name') || 'Admin');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [saved, setSaved] = useState(false);
    const [err, setErr] = useState('');

    const handleSave = (e) => {
      e.preventDefault();
      if (!newName.trim()) { setErr('Name is required'); return; }
      if (newPass && newPass.length < 4) { setErr('Password must be at least 4 characters'); return; }
      if (newPass && newPass !== confirmPass) { setErr('Passwords do not match'); return; }
      localStorage.setItem('lx_admin_name', newName.trim());
      sessionStorage.setItem('lx_admin_name', newName.trim());
      if (newPass) {
        localStorage.setItem('lx_admin_pass', newPass);
      }
      setErr('');
      setSaved(true);
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setSaved(false), 2500);
    };

    return (
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 24 }}>Manage your admin account credentials.</p>
        <form onSubmit={handleSave} style={{ maxWidth: 400 }}>
          <div className="form-group">
            <label className="form-label">Admin Name</label>
            <input className="form-input" required type="text"
              value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="Your name" />
          </div>
          <div className="form-group" style={{ marginTop: 24 }}>
            <label className="form-label">New Password <span style={{ color: 'var(--text-dim)', fontWeight: 300, fontSize: '0.75rem' }}>(leave blank to keep current)</span></label>
            <input className="form-input" type="password" minLength={4}
              value={newPass} onChange={e => setNewPass(e.target.value)}
              placeholder="Min 4 characters" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password"
              value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
              placeholder="Re-enter new password" />
          </div>
          {err && <p style={{ color: '#8b0000', fontSize: '0.8rem', marginBottom: 12 }}>{err}</p>}
          {saved && <p style={{ color: '#5a9a5a', fontSize: '0.8rem', marginBottom: 12 }}>Settings saved successfully.</p>}
          <button type="submit" className="btn-gold">Save Settings</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <div style={{
        background: "var(--bg2)", borderBottom: "1px solid var(--border)",
        padding: "12px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#c9a84c" strokeWidth="1.5"/>
            <circle cx="14" cy="14" r="5" fill="#c9a84c" opacity="0.6"/>
            <path d="M14 2 Q18 8 14 14 Q10 8 14 2" fill="#c9a84c" opacity="0.8"/>
          </svg>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.15em", color: "var(--text)", textTransform: "uppercase" }}>
            Admin Panel {sessionStorage.getItem('lx_admin_name') ? <span style={{ color: 'var(--gold)', fontWeight: 400 }}>— {sessionStorage.getItem('lx_admin_name')}</span> : ''}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/" style={{ fontSize: "0.8rem", color: "var(--gold)", textDecoration: "none", fontFamily: "'Jost',sans-serif" }}>← Back to Store</a>
          <button onClick={() => { sessionStorage.removeItem('lx_admin_auth'); window.location.href = '/'; }}
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: 4, padding: "6px 14px", cursor: "pointer", color: "var(--text-muted)", fontFamily: "'Jost',sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >Logout</button>
        </div>
      </div>

      <div style={{ padding: "0 80px 40px" }}>
        <div className="page-header">
          <h1 className="page-title">Admin <span>Panel</span></h1>
          <p className="page-sub">Manage products, view orders, and monitor your store.</p>
        </div>

        <div className="faq-tabs" style={{ marginTop: -16 }}>
          {tabs.map(t => (
            <div key={t} className={`faq-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>

        {tab === "Dashboard" && <Dashboard />}
        {tab === "Products" && <ProductsPanel />}
        {tab === "Orders" && <OrdersPanel />}
        {tab === "Settings" && <SettingsPanel />}
      </div>
    </div>
  );
}
