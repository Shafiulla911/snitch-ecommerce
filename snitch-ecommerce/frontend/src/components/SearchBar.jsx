import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../services/api';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesQuery = !query || (
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    return matchesCategory && matchesQuery;
  });

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <div 
      onClick={onClose}
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        padding: '80px 24px 24px 24px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '80vh',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '28px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header Search Input */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #f1f3f5',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <Search size={22} color="#ff7a59" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search streetwear, shoes, caps, sunglasses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#0f172a',
              fontSize: '1.1rem',
              fontWeight: 600,
              outline: 'none'
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: '#94a3b8' }}>
              <X size={18} />
            </button>
          )}
          <button 
            onClick={onClose} 
            style={{ 
              background: '#f1f3f5', 
              padding: '6px 14px', 
              borderRadius: '9999px',
              color: '#64748b',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            Esc
          </button>
        </div>

        {/* Category Pills */}
        <div style={{
          padding: '12px 24px',
          background: '#f8f9fa',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          borderBottom: '1px solid #f1f3f5'
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: activeCategory === cat.id ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
                background: activeCategory === cat.id ? '#0f172a' : '#ffffff',
                color: activeCategory === cat.id ? '#ffffff' : '#64748b',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {filteredProducts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: '#f8f9fa',
                    border: '1px solid rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fff0ed'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 700 }}>{product.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                      {product.category}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem', fontFamily: 'Syne, sans-serif' }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#ff7a59', justifyContent: 'flex-end', fontWeight: 700 }}>
                      <Star size={12} fill="#ff7a59" color="#ff7a59" />
                      {product.rating}
                    </div>
                  </div>
                  <ArrowRight size={18} color="#94a3b8" />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontSize: '1rem', marginBottom: '8px', fontWeight: 600 }}>No items match your search "{query}"</p>
              <p style={{ fontSize: '0.85rem' }}>Try searching for "Leather", "Sneakers", "Shades", or "Caps".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
