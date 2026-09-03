import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    appliedCoupon,
    discountAmount,
    cartSubtotal,
    deliveryFee,
    cartTotal
  } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (couponInput) applyPromoCode(couponInput);
  };

  const handleProceedCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div className="bento-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '48px 36px', background: '#ffffff' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#fff0ed',
            color: '#ff7a59',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <ShoppingBag size={32} />
          </div>
          <h2 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
            Looks like you haven't added any Snitch streetwear items to your cart yet.
          </p>
          <Link to="/products" className="btn-pill-coral">
            Explore Drops & Apparel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="page-header-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">Review your selected fits before checking out.</p>
        </div>
        <button
          onClick={clearCart}
          style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }} className="cart-grid">
        
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map((item, index) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${index}`}
              className="bento-card"
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                background: '#ffffff'
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                style={{ width: '84px', height: '84px', borderRadius: '16px', objectFit: 'cover' }}
              />

              <div style={{ flex: 1 }}>
                <Link to={`/product/${item.product.id}`} style={{ color: '#0f172a', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                  {item.product.title}
                </Link>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '6px', fontWeight: 500 }}>
                  Size: <strong style={{ color: '#ff7a59' }}>{item.selectedSize}</strong> • Category: {item.product.category}
                </div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Syne, sans-serif' }}>
                  ₹{item.product.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f8f9fa',
                  border: '1px solid #e2e8f0',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                    style={{ padding: '6px 12px', color: '#0f172a', fontWeight: 700 }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 8px', color: '#0f172a', fontWeight: 800, fontSize: '0.9rem' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                    style={{ padding: '6px 12px', color: '#0f172a', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                  style={{ color: '#ef4444', padding: '8px', background: '#fef2f2', borderRadius: '50%' }}
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bento-card" style={{
          padding: '28px',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: '#ffffff'
        }}>
          
          <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 800 }}>
            Order Summary
          </h3>

          <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8f9fa',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '8px 16px',
              flex: 1
            }}>
              <Tag size={16} color="#ff7a59" />
              <input
                type="text"
                placeholder="Promo Code (SNITCH20)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '0.85rem', outline: 'none', width: '100%', fontWeight: 500 }}
              />
            </div>
            <button type="submit" className="btn-pill-black" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              Apply
            </button>
          </form>

          {appliedCoupon && (
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '8px 14px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 600 }}>
              Coupon <strong>{appliedCoupon}</strong> Applied! (-₹{discountAmount} OFF)
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: '#64748b', paddingTop: '12px', borderTop: '1px solid #f1f3f5', fontWeight: 500 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Bag Subtotal</span>
              <span style={{ color: '#0f172a', fontWeight: 700 }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Discount</span>
                <span style={{ fontWeight: 700 }}>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Express Delivery</span>
              <span>{deliveryFee === 0 ? <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span> : `₹${deliveryFee}`}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', paddingTop: '12px', borderTop: '1px solid #f1f3f5', fontFamily: 'Syne, sans-serif' }}>
              <span>Total Payable</span>
              <span style={{ color: '#ff7a59' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={handleProceedCheckout}
            className="btn-pill-coral"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div style={{ fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#ff7a59" /> Instant UPI & Card Security
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
