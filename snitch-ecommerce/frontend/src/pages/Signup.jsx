import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(name, email, password, phone);
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px'
    }}>
      <div className="bento-card" style={{
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '28px',
        padding: '40px'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', color: '#0f172a', marginBottom: '8px' }}>
            join snitch club<span style={{ color: '#ff7a59' }}>.</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Create an account to unlock secret drop discounts & fast checkout.
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            color: '#ef4444',
            padding: '12px 16px',
            borderRadius: '16px',
            marginBottom: '20px',
            fontSize: '0.88rem',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Full Name
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#f8f9fa',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '12px 20px'
            }}>
              <User size={18} color="#94a3b8" />
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '0.95rem', outline: 'none', width: '100%', fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#f8f9fa',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '12px 20px'
            }}>
              <Mail size={18} color="#94a3b8" />
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '0.95rem', outline: 'none', width: '100%', fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Phone Number
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#f8f9fa',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '12px 20px'
            }}>
              <Phone size={18} color="#94a3b8" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '0.95rem', outline: 'none', width: '100%', fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Password
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#f8f9fa',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '12px 20px'
            }}>
              <Lock size={18} color="#94a3b8" />
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '0.95rem', outline: 'none', width: '100%', fontWeight: 500 }}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-pill-coral" style={{ width: '100%', padding: '14px', marginTop: '10px', justifyContent: 'center' }}>
            {loading ? 'Creating Account...' : 'Create Account & Claim Code'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ff7a59', fontWeight: 700 }}>
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
