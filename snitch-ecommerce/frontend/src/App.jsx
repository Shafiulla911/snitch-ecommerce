import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import VirtualTryOn from './pages/VirtualTryOn';

import './App.css';

const AnimatedBackground = () => (
  <div className="bg-animated-mesh" aria-hidden="true">
    <div className="mesh-orb mesh-orb-1" />
    <div className="mesh-orb mesh-orb-2" />
    <div className="mesh-orb mesh-orb-3" />
    <div className="mesh-orb mesh-orb-4" />
    
    <div className="particle-container">
      <div className="floating-particle" />
      <div className="floating-particle" />
      <div className="floating-particle" />
      <div className="floating-particle" />
    </div>
  </div>
);

const ToastContainer = () => {
  const { toastMessage } = useAuth();
  if (!toastMessage) return null;
  return (
    <div className="toast-notification">
      <span>{toastMessage}</span>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <AnimatedBackground />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                
                {/* Protected User Routes */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Virtual Fitting Room */}
                <Route path="/try-on" element={<VirtualTryOn />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
