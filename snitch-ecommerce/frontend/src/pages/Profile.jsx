import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit3, Award, LogOut, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    pincode: user?.pincode || ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="page-header-block">
        <h1 className="page-title">Profile & Account</h1>
        <p className="page-subtitle">Manage your personal information, address book, and Snitch rewards.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }} className="profile-grid">
        
        {/* Left Column: Avatar Card */}
        <div className="bento-card" style={{
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: '#ffffff'
        }}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
            alt={user?.name}
            style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff7a59', marginBottom: '16px' }}
          />

          <h2 style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: 800, marginBottom: '4px', fontFamily: 'Syne, sans-serif' }}>
            {user?.name}
          </h2>
          <span style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '16px', fontWeight: 500 }}>
            {user?.email}
          </span>

          <span className="badge-bento" style={{ background: '#ff7a59', color: '#fff', padding: '6px 14px', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Award size={14} /> VIP GOLD TIER
          </span>

          <div style={{
            width: '100%',
            background: '#f8f9fa',
            borderRadius: '20px',
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '24px'
          }}>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'block', fontFamily: 'Syne, sans-serif' }}>1,250</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Points</span>
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ff7a59', display: 'block', fontFamily: 'Syne, sans-serif' }}>SNITCH20</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Coupon</span>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              width: '100%',
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#ef4444',
              padding: '10px',
              borderRadius: '9999px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Right Column: Profile Details */}
        <div className="bento-card" style={{ padding: '36px', background: '#ffffff' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.3rem', fontWeight: 800 }}>
              Personal Details & Shipping Address
            </h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-pill-outline"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                <Edit3 size={15} color="#ff7a59" /> Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>Default Delivery Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '10px 18px', color: '#0f172a', outline: 'none', fontWeight: 500 }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-pill-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-pill-coral">
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <User size={14} color="#ff7a59" /> Full Name
                </div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>{user?.name}</div>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <Mail size={14} color="#ff7a59" /> Email Address
                </div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>{user?.email}</div>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <Phone size={14} color="#ff7a59" /> Mobile Number
                </div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>{user?.phone || 'Not provided'}</div>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <MapPin size={14} color="#ff7a59" /> Default Address
                </div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>
                  {user?.address ? `${user.address}, ${user.city} - ${user.pincode}` : 'No address saved'}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;
