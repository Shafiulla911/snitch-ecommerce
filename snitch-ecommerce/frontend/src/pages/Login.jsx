import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    try {
      await login(demoEmail, demoPass);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
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
        maxWidth: '440px',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '28px',
        padding: '40px'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', color: '#0f172a', marginBottom: '8px' }}>
            sign in to snitch<span style={{ color: '#ff7a59' }}>.</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Enter your credentials to manage orders & try outfits.
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Email Input */}
          <div>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
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
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  fontWeight: 500
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
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
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  fontWeight: 500
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: '#94a3b8' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-pill-coral" style={{ width: '100%', padding: '14px', justifyContent: 'center' }}>
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f1f3f5' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            INSTANT DEMO ACCESS
          </span>
          <button
            type="button"
            onClick={() => handleQuickLogin('vip.member@snitch.com', 'snitch123')}
            className="btn-pill-black"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '0.88rem',
              justifyContent: 'center'
            }}
          >
            <UserCheck size={16} /> Quick 1-Click Guest Login
          </button>
        </div>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#ff7a59', fontWeight: 700 }}>
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
