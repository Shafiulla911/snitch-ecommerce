import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, Camera, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'M');
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  const handleTryOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/try-on?product=${product.id}`);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card"
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '1/1', background: '#f8f9fa' }}>
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {product.isNew && (
            <span className="badge-bento" style={{ background: '#0f172a', color: '#ffffff' }}>
              NEW DROP
            </span>
          )}
          {discountPercent > 0 && (
            <span className="badge-bento" style={{ background: '#ff7a59', color: '#ffffff' }}>
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Virtual Try-On Badge Button */}
        <button
          onClick={handleTryOn}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#0f172a',
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            cursor: 'pointer'
          }}
        >
          <Camera size={14} color="#ff7a59" /> Try On
        </button>
      </Link>

      {/* Details */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ff7a59', fontSize: '0.8rem', fontWeight: 800 }}>
            <Star size={14} fill="#ff7a59" color="#ff7a59" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} style={{
          color: '#0f172a',
          fontWeight: 700,
          fontSize: '0.98rem',
          marginBottom: '10px',
          lineHeight: '1.35',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.title}
        </Link>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSize(size);
                }}
                style={{
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  border: selectedSize === size ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
                  background: selectedSize === size ? '#0f172a' : '#f8fafc',
                  color: selectedSize === size ? '#ffffff' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Actions */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f3f5' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Syne, sans-serif' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={handleAddToCart}
              className="btn-pill-black"
              style={{ padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'center' }}
            >
              <ShoppingBag size={14} /> Add
            </button>
            <button
              onClick={handleBuyNow}
              className="btn-pill-coral"
              style={{ padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'center' }}
            >
              <Zap size={14} /> Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
