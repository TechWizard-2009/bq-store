# LUXE AROMA – The Art of Scent

A luxury fragrance e-commerce store built with React + Vite + Tailwind CSS v4. Features a full storefront and a password-protected admin panel for managing products and orders.

## Features

### Storefront
- Product catalog with category filtering
- Product detail page with olfactory pyramid notes
- Shopping bag with quantity controls
- Checkout flow with order placement
- Contact form and FAQ accordion
- User login/signup modal

### Admin Panel (`/admin`)
- Dashboard with revenue and order stats
- Product CRUD (add, edit, delete)
- Order history viewer
- Settings (change admin name & password)
- Login required to access (`/admin`)

## Tech Stack

- **React 19** + **Vite 8** — fast dev server and builds
- **Tailwind CSS v4** — utility-first CSS (via `@tailwindcss/vite`)
- **React Context** — state management for cart, auth, and store data
- **localStorage / sessionStorage** — data persistence
- **Google Fonts** — Cormorant Garamond + Jost

## Project Structure

```
src/
├── main.jsx                        # Entry point
├── App.jsx                         # Root component with URL-based routing
├── index.css                       # All styles (CSS custom properties + Tailwind)
├── CartContext.jsx                  # Cart state (add/remove/update items)
├── AuthContext.jsx                  # User auth (login/signup/logout)
├── StoreContext.jsx                 # Products & orders CRUD (persisted to localStorage)
├── data.js                         # Static data (palettes, FAQ, initial products)
│
├── components/
│   ├── Navbar.jsx                  # Sticky nav with cart badge & user dropdown
│   ├── Footer.jsx                  # Footer with links & contact info
│   ├── ProductCard.jsx             # Reusable product card with like button
│   ├── BottleSVG.jsx               # SVG perfume bottle illustration
│   ├── Icons.jsx                   # All SVG icon components
│   └── AuthModal.jsx               # Login/signup modal overlay
│
└── pages/
    ├── HomePage.jsx                # Hero + featured products + newsletter
    ├── CollectionsPage.jsx         # Filterable product grid with pagination
    ├── ProductPage.jsx             # Product detail (thumbs, pyramid, perfumer)
    ├── BagPage.jsx                 # Shopping cart with quantity & summary
    ├── CheckoutPage.jsx            # Checkout form + order placement
    ├── FAQPage.jsx                 # Tabbed FAQ accordion
    ├── ShippingPage.jsx            # Shipping rates, returns, tracking
    ├── ContactPage.jsx             # Contact form + info + map
    ├── AdminPage.jsx               # Admin dashboard/products/orders/settings
    ├── AdminLogin.jsx              # Admin login form (name + password)
    └── ProductData.jsx             # Midnight Jasmine product definition
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Admin Panel

Visit `/admin` on the running site.

**Default credentials:**
- Name: `Admin`
- Password: `admin123`

Change both in the Settings tab after logging in.

## Build for Production

```bash
npm run build
npm run preview
```

## License

MIT
