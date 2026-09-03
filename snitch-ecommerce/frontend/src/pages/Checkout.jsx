import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, CreditCard, Banknote, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: user?.address || '',
    city: user?.city || '',
    state: 'Maharashtra',
    pincode: user?.pincode || ''
  });

  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div className="bento-card" style={{ maxWidth: '480px', margin: '0 auto', padding: '40px', background: '#ffffff' }}>
          <h2 style={{ color: '#0f172a', marginBottom: '12px' }}>No items to checkout</h2>
          <button onClick={() => navigate('/products')} className="btn-pill-coral">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: cart,
      totalAmount: cartTotal,
      shippingAddress: address,
      paymentMethod: paymentMethod,
      paymentDetails: paymentMethod === 'UPI' ? { upiId } : paymentMethod === 'CARD' ? { cardLast4: cardDetails.number.slice(-4) } : { cod: true }
    };

    try {
      const result = await createOrder(orderData);
      setOrderComplete(result);
      clearCart();
    } catch (err) {
      alert("Error placing order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '40px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <div className="bento-card" style={{ padding: '48px 36px', background: '#ffffff' }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: '#dcfce7',
            color: '#16a34a',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <CheckCircle2 size={44} />
          </div>
          <h1 style={{ color: '#0f172a', fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'Syne, sans-serif' }}>
            Order Confirmed! 🎉
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '24px' }}>
            Thank you for shopping at SNITCH! Your order ID is <strong style={{ color: '#ff7a59' }}>{orderComplete.id}</strong>.
          </p>

          <div style={{ background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '20px', textAlign: 'left', marginBottom: '28px', fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Payment Method:</span>
              <strong style={{ color: '#0f172a' }}>{orderComplete.paymentMethod}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Total Paid:</span>
              <strong style={{ color: '#ff7a59' }}>₹{orderComplete.totalAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Estimated Delivery:</span>
              <strong style={{ color: '#16a34a' }}>2-3 Business Days</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/orders')} className="btn-pill-coral">
              View Order Status
            </button>
            <button onClick={() => navigate('/products')} className="btn-pill-outline">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="page-header-block">
        <h1 className="page-title">Checkout & Payment</h1>
        <p className="page-subtitle">Complete your delivery address and pay via UPI or Credit/Debit Card.</p>
      </div>

      <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }} className="checkout-grid">
        
        {/* Left Column: Address & Payment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Address */}
          <div className="bento-card" style={{ padding: '32px', background: '#ffffff' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '20px', fontWeight: 800 }}>
              1. Delivery Address
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Street Address & Flat / House No.</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Pincode</label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="bento-card" style={{ padding: '32px', background: '#ffffff' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '20px', fontWeight: 800 }}>
              2. Select Payment Method
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                style={{
                  padding: '16px 12px',
                  borderRadius: '20px',
                  border: paymentMethod === 'UPI' ? '2px solid #0f172a' : '1px solid #e2e8f0',
                  background: paymentMethod === 'UPI' ? '#0f172a' : '#f8f9fa',
                  color: paymentMethod === 'UPI' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <QrCode size={22} color={paymentMethod === 'UPI' ? '#ff7a59' : '#64748b'} /> UPI / QR
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                style={{
                  padding: '16px 12px',
                  borderRadius: '20px',
                  border: paymentMethod === 'CARD' ? '2px solid #0f172a' : '1px solid #e2e8f0',
                  background: paymentMethod === 'CARD' ? '#0f172a' : '#f8f9fa',
                  color: paymentMethod === 'CARD' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <CreditCard size={22} color={paymentMethod === 'CARD' ? '#ff7a59' : '#64748b'} /> Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                style={{
                  padding: '16px 12px',
                  borderRadius: '20px',
                  border: paymentMethod === 'COD' ? '2px solid #0f172a' : '1px solid #e2e8f0',
                  background: paymentMethod === 'COD' ? '#0f172a' : '#f8f9fa',
                  color: paymentMethod === 'COD' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Banknote size={22} color={paymentMethod === 'COD' ? '#ff7a59' : '#64748b'} /> Cash
              </button>

            </div>

            {paymentMethod === 'UPI' && (
              <div style={{ background: '#f8f9fa', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=snitch@upi&pn=SNITCH%20Clothing"
                      alt="UPI QR Code"
                      style={{ width: '90px', height: '90px' }}
                    />
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#0f172a', fontWeight: 800, marginTop: '4px' }}>
                      SCAN TO PAY
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>
                      Enter UPI ID / VPA (GPay, PhonePe, Paytm)
                    </label>
                    <input
                      type="text"
                      placeholder="mobile@upi or name@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 16px', color: '#0f172a', outline: 'none', marginBottom: '6px', fontWeight: 500 }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      GPay, PhonePe, Paytm, BHIM, Amazon Pay
                    </span>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'CARD' && (
              <div style={{ background: '#f8f9fa', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8910"
                    maxLength={19}
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 16px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 16px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={4}
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 16px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'COD' && (
              <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                Pay cash at doorstep upon delivery. Instant order confirmation.
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Review */}
        <div className="bento-card" style={{
          padding: '28px',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: '#ffffff'
        }}>
          
          <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 800 }}>
            Review Order
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={item.product.image} alt={item.product.title} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1, fontSize: '0.85rem' }}>
                  <div style={{ color: '#0f172a', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>{item.product.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Size: {item.selectedSize} × {item.quantity}</div>
                </div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.9rem' }}>
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f1f3f5', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Syne, sans-serif' }}>
            <span>Total:</span>
            <span style={{ color: '#ff7a59' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-pill-coral"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
          >
            {loading ? 'Processing Order...' : `Pay ₹${cartTotal.toLocaleString('en-IN')} & Confirm`} <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: '#94a3b8' }}>
            <ShieldCheck size={16} color="#ff7a59" /> Encrypted Secure Payment
          </div>

        </div>

      </form>
    </div>
  );
};

export default Checkout;
