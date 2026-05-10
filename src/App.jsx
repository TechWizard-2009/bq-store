import { useState, useEffect, useCallback } from 'react';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import { StoreProvider } from './StoreContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductPage from './pages/ProductPage';
import BagPage from './pages/BagPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import FAQPage from './pages/FAQPage';
import ShippingPage from './pages/ShippingPage';
import ContactPage from './pages/ContactPage';

function getPageFromPath() {
  const path = window.location.pathname.replace(/^\//, '') || 'home';
  return path;
}

export default function App() {
  const [page, setPageState] = useState(getPageFromPath);
  const [showAuth, setShowAuth] = useState(false);

  const setPage = useCallback((p) => {
    const path = p === 'home' ? '/' : `/${p}`;
    window.history.pushState({ page: p }, '', path);
    setPageState(p);
  }, []);

  useEffect(() => {
    const handlePop = () => setPageState(getPageFromPath());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} />;
      case "collections":
      case "fragrances":
        return <CollectionsPage setPage={setPage} />;
      case "product":
        return <ProductPage setPage={setPage} />;
      case "bag":
        return <BagPage setPage={setPage} />;
      case "checkout":
        return <CheckoutPage setPage={setPage} />;
      case "admin":
        return <AdminPage setPage={setPage} />;
      case "faq":
        return <FAQPage setPage={setPage} />;
      case "shipping":
        return <ShippingPage setPage={setPage} />;
      case "contact":
        return <ContactPage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  if (page === "admin") {
    const isAdminAuth = sessionStorage.getItem('lx_admin_auth') === 'true';
    if (!isAdminAuth) {
      return (
        <StoreProvider>
          <CartProvider>
            <AdminLogin onLogin={() => setPageState('admin')} />
          </CartProvider>
        </StoreProvider>
      );
    }
    return (
      <StoreProvider>
        <CartProvider>
          <AdminPage setPage={setPage} />
        </CartProvider>
      </StoreProvider>
    );
  }

  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <div>
            <Navbar page={page} setPage={setPage} onAuthClick={() => setShowAuth(true)} />
            {renderPage()}
            {page === "home" && <Footer setPage={setPage} />}
            {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
          </div>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
