import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Camera, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header style={{
        position: 'sticky',
        top: '16px',
        zIndex: 100,
        margin: '0 auto 24px auto',
        maxWidth: '1320px',
        width: '100%'
      }}>
        <div className="bento-card" style={{
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff',
          borderRadius: '9999px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
        }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              fontFamily: 'Syne, sans-serif',
              letterSpacing: '-0.04em',
              color: '#0f172a'
            }}>
              snitch<span style={{ color: '#ff7a59' }}>.</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="/products" style={{
              fontWeight: isActive('/products') ? 700 : 500,
              color: isActive('/products') ? '#0f172a' : '#64748b',
              fontSize: '0.92rem',
              transition: 'color 0.2s'
            }}>
              drops
            </Link>

            <Link to="/products" style={{
              fontWeight: 500,
              color: '#64748b',
              fontSize: '0.92rem',
              transition: 'color 0.2s'
            }}>
              categories
            </Link>

            <Link to="/try-on" style={{
              fontWeight: 700,
              color: '#ff7a59',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s'
            }}>
              <Camera size={16} />
              virtual try-on
            </Link>

            {isAuthenticated && (
              <Link to="/orders" style={{
                fontWeight: isActive('/orders') ? 700 : 500,
                color: isActive('/orders') ? '#0f172a' : '#64748b',
                fontSize: '0.92rem'
              }}>
                orders
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/profile" style={{
                fontWeight: isActive('/profile') ? 700 : 500,
                color: isActive('/profile') ? '#0f172a' : '#64748b',
                fontSize: '0.92rem'
              }}>
                profile
              </Link>
            )}
          </nav>

          {/* Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: '#f1f3f5',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '9999px',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.88rem',
                fontWeight: 500
              }}
            >
              <Search size={16} color="#64748b" />
              <span>search</span>
            </button>

            {/* Cart Button */}
            <Link to="/cart" className="btn-pill-coral" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
              <ShoppingBag size={16} />
              <span>Cart ({cartCount})</span>
            </Link>

            {/* User Profile / Login */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f1f3f5',
                    padding: '4px 10px 4px 4px',
                    borderRadius: '9999px'
                  }}
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '46px',
                    width: '180px',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '20px',
                    padding: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    zIndex: 200
                  }}>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '12px',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.88rem',
                        fontWeight: 600
                      }}
                    >
                      <User size={16} color="#ff7a59" /> Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '12px',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.88rem',
                        fontWeight: 600
                      }}
                    >
                      <ShoppingBag size={16} color="#ff7a59" /> My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        navigate('/');
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '12px',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-pill-black" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
                login
              </Link>
            )}
          </div>
        </div>
      </header>

      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
