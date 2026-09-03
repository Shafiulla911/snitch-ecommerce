import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Zap, Camera, Star, ShieldCheck, Truck, RefreshCw, ChevronRight } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      if (data) {
        setActiveImage(data.image);
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
      }
      setLoading(false);
    };
    loadItem();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#64748b' }}>Loading product details...</div>;
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#ef4444' }}>Product not found.</div>;
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const handleTryOn = () => {
    navigate(`/try-on?product=${product.id}`);
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
        <Link to="/">Home</Link> <ChevronRight size={14} />
        <Link to="/products">Drops</Link> <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 700 }}>{product.title}</span>
      </div>

      <div className="bento-card" style={{ padding: '40px', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '44px' }}>
          
          {/* Left: Gallery */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              aspectRatio: '1/1',
              border: '1px solid rgba(0,0,0,0.06)',
              marginBottom: '16px',
              background: '#f8f9fa'
            }}>
              <img
                src={activeImage}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {discountPercent > 0 && (
                <span className="badge-bento" style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#ff7a59',
                  color: '#ffffff'
                }}>
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.hoverImage && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <img
                  src={product.image}
                  alt="Main view"
                  onClick={() => setActiveImage(product.image)}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '14px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: activeImage === product.image ? '2px solid #0f172a' : '1px solid #e2e8f0'
                  }}
                />
                <img
                  src={product.hoverImage}
                  alt="Alternate view"
                  onClick={() => setActiveImage(product.hoverImage)}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '14px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: activeImage === product.hoverImage ? '2px solid #0f172a' : '1px solid #e2e8f0'
                  }}
                />
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ color: '#ff7a59', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                {product.category}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ff7a59', fontSize: '0.88rem', fontWeight: 800 }}>
                <Star size={16} fill="#ff7a59" color="#ff7a59" />
                <span>{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', lineHeight: '1.25', fontFamily: 'Syne, sans-serif' }}>
              {product.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Syne, sans-serif' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.2rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '24px', fontWeight: 500 }}>
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>
                  <span>Select Size:</span>
                  <span style={{ color: '#ff7a59' }}>Selected: {selectedSize}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        border: selectedSize === size ? '2px solid #0f172a' : '1px solid #e2e8f0',
                        background: selectedSize === size ? '#0f172a' : '#f8f9fa',
                        color: selectedSize === size ? '#ffffff' : '#64748b',
                        cursor: 'pointer'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '28px' }}>
              <span style={{ display: 'block', color: '#0f172a', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>Quantity:</span>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#f8f9fa',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '8px 16px', color: '#0f172a', fontWeight: 800 }}
                >
                  -
                </button>
                <span style={{ padding: '0 16px', color: '#0f172a', fontWeight: 800 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '8px 16px', color: '#0f172a', fontWeight: 800 }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button onClick={handleAddToCart} className="btn-pill-black" style={{ padding: '14px', justifyContent: 'center' }}>
                  <ShoppingBag size={18} /> Add to Cart
                </button>
                <button onClick={handleBuyNow} className="btn-pill-coral" style={{ padding: '14px', justifyContent: 'center' }}>
                  <Zap size={18} /> Buy Now
                </button>
              </div>

              <button
                onClick={handleTryOn}
                className="btn-pill-outline"
                style={{
                  width: '100%',
                  padding: '12px',
                  justifyContent: 'center',
                  color: '#ff7a59',
                  borderColor: '#ff7a59'
                }}
              >
                <Camera size={18} /> Try On Selfie Fitting Studio
              </button>
            </div>

            {/* Value Props */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: '20px',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '12px',
              fontSize: '0.82rem',
              color: '#64748b',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px', fontWeight: 600 }}>
                <Truck size={18} color="#ff7a59" />
                <span>Fast Dispatch</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px', fontWeight: 600 }}>
                <RefreshCw size={18} color="#ff7a59" />
                <span>7 Days Return</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px', fontWeight: 600 }}>
                <ShieldCheck size={18} color="#ff7a59" />
                <span>100% Genuine</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
