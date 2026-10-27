import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Products from './Products.tsx'
import LipBalmProduct from './LipBalmProduct.tsx'
import Cart from './Cart.tsx'
import Success from './Success.tsx'
import { CartProvider } from './CartContext.tsx'
import { LanguageProvider } from './LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/vegan-lip-balm" element={<LipBalmProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
