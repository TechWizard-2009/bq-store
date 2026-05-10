import { createContext, useContext, useState } from 'react';
import { allProducts as initialProducts } from './data';

const StoreContext = createContext();

let nextId = 100;

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lx_products');
    return saved ? JSON.parse(saved) : [...initialProducts];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('lx_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const saveProducts = (p) => {
    setProducts(p);
    localStorage.setItem('lx_products', JSON.stringify(p));
  };

  const saveOrders = (o) => {
    setOrders(o);
    localStorage.setItem('lx_orders', JSON.stringify(o));
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: nextId++ };
    saveProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    saveProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    saveProducts(products.filter(p => p.id !== id));
  };

  const placeOrder = (orderData) => {
    const order = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: 'Confirmed',
      date: new Date().toISOString(),
    };
    saveOrders([order, ...orders]);
    return order;
  };

  return (
    <StoreContext.Provider value={{
      products, orders, addProduct, updateProduct, deleteProduct, placeOrder,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
