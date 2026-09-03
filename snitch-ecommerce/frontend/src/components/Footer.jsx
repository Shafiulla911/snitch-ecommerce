import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RefreshCw, CreditCard, Camera, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '40px',
      marginBottom: '40px'
    }}>
      <div className="bento-card" style={{
        padding: '48px 44px',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)'
      }}>
        
        {/* Value Proposition Banners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          paddingBottom: '40px',
          borderBottom: '1px solid #f1f3f5',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#fff0ed', padding: '12px', borderRadius: '50%', color: '#ff7a59' }}>
              <Truck size={22} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 700 }}>Express Shipping</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Free delivery on orders over ₹999</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#fff0ed', padding: '12px', borderRadius: '50%', color: '#ff7a59' }}>
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 700 }}>Hassle-Free Returns</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>7-day easy exchange & store refund</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#fff0ed', padding: '12px', borderRadius: '50%', color: '#ff7a59' }}>
              <CreditCard size={22} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 700 }}>Instant UPI & Card</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Secure encrypted payments</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#fff0ed', padding: '12px', borderRadius: '50%', color: '#ff7a59' }}>
              <Camera size={22} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 700 }}>Virtual Try-On</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Preview items on your photo live</p>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand */}
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#0f172a', fontSize: '1.6rem', marginBottom: '12px', letterSpacing: '-0.03em' }}>
              snitch<span style={{ color: '#ff7a59' }}>.</span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', marginBottom: '16px' }}>
              Redefining high-streetwear luxury. Engineered for trendsetters who express individuality through sharp fits, premium drops, and futuristic style.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge-bento" style={{ background: '#0f172a', color: '#fff' }}>UPI ACCEPTED</span>
              <span className="badge-bento" style={{ background: '#ff7a59', color: '#fff' }}>INSTANT DISPATCH</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: '#0f172a', fontSize: '1rem', marginBottom: '14px', fontWeight: 800 }}>Shop Drops</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#64748b', fontWeight: 500 }}>
              <li><Link to="/products?category=clothing">Apparel & Tees</Link></li>
              <li><Link to="/products?category=shoes">Luxury Shoes & Sneakers</Link></li>
              <li><Link to="/products?category=caps">Streetwear Caps</Link></li>
              <li><Link to="/products?category=sunglasses">Shades & Optics</Link></li>
              <li><Link to="/products?category=jackets">Jackets & Hoodies</Link></li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 style={{ color: '#0f172a', fontSize: '1rem', marginBottom: '14px', fontWeight: 800 }}>Experience</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#64748b', fontWeight: 500 }}>
              <li><Link to="/try-on" style={{ color: '#ff7a59', fontWeight: 700 }}>Virtual Fitting Room</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
              <li><Link to="/profile">Account Settings</Link></li>
              <li><Link to="/login">Sign In / Sign Up</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#0f172a', fontSize: '1rem', marginBottom: '14px', fontWeight: 800 }}>Join The Crew</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px', color: '#64748b' }}>
              Subscribe to get secret drop codes and 20% off with code <strong>SNITCH20</strong>.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  background: '#f8f9fa',
                  border: '1px solid #e2e8f0',
                  borderRadius: '9999px',
                  padding: '10px 16px',
                  color: '#0f172a',
                  fontSize: '0.88rem',
                  outline: 'none',
                  flex: 1
                }}
              />
              <button className="btn-pill-coral" style={{ padding: '10px 16px' }}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid #f1f3f5',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.82rem',
          color: '#94a3b8'
        }}>
          <div>
            © {new Date().getFullYear()} SNITCH Clothing Co. All rights reserved. Designed for modern fashion lovers.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#0f172a', fontWeight: 700 }}>
            <span>BHIM UPI</span>
            <span>GPay</span>
            <span>PhonePe</span>
            <span>VISA</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
