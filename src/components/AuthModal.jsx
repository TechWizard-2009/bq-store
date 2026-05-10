import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function AuthModal({ onClose }) {
  const { user, login, signup, logout } = useAuth();
  const [tab, setTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "login") {
      login(email, password);
    } else {
      signup(name, email, password);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10,
          padding: 40, width: 400, maxWidth: "90vw",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid var(--border)" }}>
          {["login", "signup"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, background: "none", border: "none",
                padding: "10px 0", cursor: "pointer",
                fontFamily: "'Jost',sans-serif", fontSize: "0.82rem",
                fontWeight: tab === t ? 600 : 400,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: tab === t ? "var(--gold)" : "var(--text-muted)",
                borderBottom: tab === t ? "2px solid var(--gold)" : "2px solid transparent",
                marginBottom: -1, transition: "all 0.2s",
              }}
            >{t === "login" ? "Login" : "Sign Up"}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {tab === "signup" && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
            {tab === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
