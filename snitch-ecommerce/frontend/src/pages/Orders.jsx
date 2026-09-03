import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Download, RefreshCw } from 'lucide-react';
import { fetchUserOrders } from '../services/api';
import { useCart } from '../context/CartContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const data = await fetchUserOrders();
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  const handleReorder = (items) => {
    items.forEach(item => {
      addToCart(item.product, item.selectedSize, item.quantity);
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#64748b' }}>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div className="bento-card" style={{ maxWidth: '480px', margin: '0 auto', padding: '48px 36px', background: '#ffffff' }}>
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
            <Package size={32} />
          </div>
          <h2 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>
            No Orders Placed Yet
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
            Once you place an order on Snitch, you can track delivery status right here.
          </p>
          <Link to="/products" className="btn-pill-coral">
            Browse Streetwear Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="page-header-block">
        <h1 className="page-title">Orders & Tracking</h1>
        <p className="page-subtitle">Track your delivery status in real-time or download past invoices.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {orders.map((order) => (
          <div key={order.id} className="bento-card" style={{ padding: '32px', background: '#ffffff' }}>
            
            {/* Header Info */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderBottom: '1px solid #f1f3f5',
              paddingBottom: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 700, letterSpacing: '0.04em' }}>ORDER NUMBER</span>
                <span style={{ color: '#ff7a59', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Syne, sans-serif' }}>
                  {order.id}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 700, letterSpacing: '0.04em' }}>DATE PLACED</span>
                <span style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.95rem' }}>{order.date}</span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 700, letterSpacing: '0.04em' }}>PAYMENT METHOD</span>
                <span style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.95rem' }}>{order.paymentMethod}</span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 700, letterSpacing: '0.04em' }}>TOTAL AMOUNT</span>
                <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.15rem', fontFamily: 'Syne, sans-serif' }}>
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Status Progress Bar */}
            <div style={{ marginBottom: '24px', background: '#f8f9fa', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ff7a59', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                    1
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 700 }}>Order Placed</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                    2
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 700 }}>Processing</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                    3
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Out for Delivery</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                    4
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Delivered</span>
                </div>

              </div>
            </div>

            {/* Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={item.product.image} alt={item.product.title} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 700 }}>{item.product.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Size: {item.selectedSize} • Qty: {item.quantity}</span>
                  </div>
                  <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.95rem', fontFamily: 'Syne, sans-serif' }}>
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #f1f3f5' }}>
              <button
                onClick={() => alert(`Invoice downloaded for Order ${order.id}`)}
                className="btn-pill-outline"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                <Download size={16} /> Tax Invoice
              </button>
              <button
                onClick={() => handleReorder(order.items)}
                className="btn-pill-black"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                <RefreshCw size={16} /> Buy Again
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
