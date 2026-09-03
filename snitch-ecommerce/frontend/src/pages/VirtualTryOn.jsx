import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Camera, Upload, RefreshCw, ShoppingBag, Download, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../services/api';
import { useCart } from '../context/CartContext';
import defaultAvatar from '../assets/snitch_model_avatar_1788428627792.jpg';

const VirtualTryOn = () => {
  const [searchParams] = useSearchParams();
  const initialProductId = searchParams.get('product');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [userPhoto, setUserPhoto] = useState(defaultAvatar);
  
  const [selectedProduct, setSelectedProduct] = useState(() => {
    return PRODUCTS.find(p => p.id === initialProductId) || PRODUCTS[2];
  });

  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(-30);
  const [scale, setScale] = useState(0.85);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUserPhoto(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefaultAvatar = () => {
    setUserPhoto(defaultAvatar);
  };

  const handleResetFitting = () => {
    setPositionX(0);
    setPositionY(-30);
    setScale(0.85);
    setRotation(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = userPhoto;

    baseImg.onload = () => {
      canvas.width = 500;
      canvas.height = 500;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

      if (selectedProduct && selectedProduct.image) {
        const itemImg = new Image();
        itemImg.crossOrigin = 'anonymous';
        itemImg.src = selectedProduct.image;

        itemImg.onload = () => {
          ctx.save();
          const centerX = canvas.width / 2 + positionX;
          const centerY = canvas.height / 2 + positionY;

          ctx.translate(centerX, centerY);
          ctx.rotate((rotation * Math.PI) / 180);

          const itemWidth = 240 * scale;
          const itemHeight = 240 * scale;

          ctx.drawImage(itemImg, -itemWidth / 2, -itemHeight / 2, itemWidth, itemHeight);
          ctx.restore();
        };
      }
    };
  }, [userPhoto, selectedProduct, positionX, positionY, scale, rotation]);

  const handleAddToCartFitted = () => {
    addToCart(selectedProduct, 'M', 1);
  };

  const handleDownloadLook = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `snitch_look_${selectedProduct.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="page-header-block text-center" style={{ textAlign: 'center' }}>
        <span className="badge-bento" style={{ background: '#ff7a59', color: '#fff', marginBottom: '10px', display: 'inline-block' }}>
          VIRTUAL FITTING ROOM
        </span>
        <h1 className="page-title">Interactive Virtual Face & Outfit Fitting</h1>
        <p className="page-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Upload your photo or use studio presets, select Snitch items, and adjust your fit live on screen!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }} className="tryon-grid">
        
        {/* Left Column: Interactive Canvas */}
        <div className="bento-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ffffff' }}>
          
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            aspectRatio: '1/1',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            background: '#0f172a',
            marginBottom: '24px'
          }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              color: '#0f172a',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} color="#ff7a59" /> Fitting: {selectedProduct.title}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <label className="btn-pill-coral" style={{ cursor: 'pointer', padding: '10px 22px', fontSize: '0.88rem' }}>
              <Upload size={16} /> Upload Your Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>

            <button onClick={resetToDefaultAvatar} className="btn-pill-black" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
              <RefreshCw size={16} /> Studio Preset Model
            </button>
          </div>

        </div>

        {/* Right Column: Fitting Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Sliders */}
          <div className="bento-card" style={{ padding: '24px', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>
                Adjust Fit & Alignment
              </h3>
              <button onClick={handleResetFitting} style={{ color: '#ff7a59', fontSize: '0.78rem', fontWeight: 700 }}>
                Reset Fit
              </button>
            </div>

            {/* Vertical Y */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
                <span>Vertical Position (Y-Axis)</span>
                <span style={{ color: '#0f172a' }}>{positionY}px</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                value={positionY}
                onChange={(e) => setPositionY(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ff7a59' }}
              />
            </div>

            {/* Horizontal X */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
                <span>Horizontal Position (X-Axis)</span>
                <span style={{ color: '#0f172a' }}>{positionX}px</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                value={positionX}
                onChange={(e) => setPositionX(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ff7a59' }}
              />
            </div>

            {/* Scale */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
                <span>Item Scale / Size</span>
                <span style={{ color: '#0f172a' }}>{Math.round(scale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ff7a59' }}
              />
            </div>

            {/* Rotation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
                <span>Rotation Angle</span>
                <span style={{ color: '#0f172a' }}>{rotation}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ff7a59' }}
              />
            </div>

          </div>

          {/* Action Triggers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={handleAddToCartFitted} className="btn-pill-coral" style={{ padding: '12px', width: '100%', justifyContent: 'center' }}>
              <ShoppingBag size={18} /> Add Fitted Look to Cart (₹{selectedProduct.price.toLocaleString('en-IN')})
            </button>
            <button onClick={handleDownloadLook} className="btn-pill-outline" style={{ padding: '10px', width: '100%', justifyContent: 'center' }}>
              <Download size={16} /> Download Snapshot
            </button>
          </div>

          {/* Product Selector */}
          <div className="bento-card" style={{ padding: '20px', background: '#ffffff' }}>
            <h3 style={{ color: '#0f172a', fontSize: '0.95rem', marginBottom: '12px', fontWeight: 800 }}>
              Select Item to Try On:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
              {PRODUCTS.map(product => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    background: selectedProduct.id === product.id ? '#fff0ed' : '#f8f9fa',
                    border: selectedProduct.id === product.id ? '1.5px solid #ff7a59' : '1px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  <img src={product.image} alt={product.title} style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, fontSize: '0.82rem' }}>
                    <div style={{ color: '#0f172a', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                      {product.title}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#ff7a59', fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VirtualTryOn;
