import { useState } from 'react';

function getAdminPassword() {
  return localStorage.getItem('lx_admin_pass') || 'admin123';
}

function getAdminName() {
  return localStorage.getItem('lx_admin_name') || 'Admin';
}

export default function AdminLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedName = getAdminName();
    if (savedName && name !== savedName) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    if (password === getAdminPassword()) {
      sessionStorage.setItem('lx_admin_auth', 'true');
      sessionStorage.setItem('lx_admin_name', name);
      window.location.href = '/admin';
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 20,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10,
        padding: '48px 40px', width: 380, maxWidth: '100%',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <svg width="40" height="40" viewBox="0 0 28 28" fill="none" style={{ margin: '0 auto 16px' }}>
            <circle cx="14" cy="14" r="13" stroke="#c9a84c" strokeWidth="1.5"/>
            <circle cx="14" cy="14" r="5" fill="#c9a84c" opacity="0.6"/>
            <path d="M14 2 Q18 8 14 14 Q10 8 14 2" fill="#c9a84c" opacity="0.8"/>
          </svg>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: 4 }}>Admin Login</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Enter your name and password</p>
        </div>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            className="form-input"
            type="text"
            required
            autoFocus
            value={name}
            onChange={e => { setName(e.target.value); setError(false); }}
              placeholder="Admin"
            style={{ borderColor: error ? '#8b0000' : undefined }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              className="form-input"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
              style={{
                borderColor: error ? '#8b0000' : undefined,
                transition: 'border-color 0.2s',
                paddingRight: 40,
              }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)',
                padding: 4, display: 'flex',
              }}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
          {error && (
            <p style={{ color: '#8b0000', fontSize: '0.78rem', marginTop: 6 }}>Incorrect name or password</p>
          )}
        </div>

        <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
          Login
        </button>

        <a href="/" style={{
          display: 'block', textAlign: 'center', marginTop: 20,
          fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none',
          fontFamily: "'Jost',sans-serif",
        }}>← Back to Store</a>
      </form>
    </div>
  );
}
