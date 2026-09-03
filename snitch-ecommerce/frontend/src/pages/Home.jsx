import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Flame, Quote, Sparkles, Star, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProducts, CATEGORIES } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const HERO_CLOTHES_SLIDES = [
  {
    title: 'Noir Biker Leather Jacket',
    tag: '🧥 LEATHER DROP 2026',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    price: '₹3,999',
    accent: 'rgba(255, 122, 89, 0.4)'
  },
  {
    title: 'Aureus Streetwear Luxury Kicks',
    tag: '👟 LUXURY FOOTWEAR',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    price: '₹4,499',
    accent: 'rgba(99, 102, 241, 0.4)'
  },
  {
    title: 'Apex Heavyweight Metallic Puffer',
    tag: '🔥 THERMAL INSULATED',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
    price: '₹4,999',
    accent: 'rgba(245, 158, 11, 0.4)'
  },
  {
    title: 'Tactical Multi-Pocket Cargo Pants',
    tag: '👖 RIPSTOP BOTTOMS',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
    price: '₹2,699',
    accent: 'rgba(16, 185, 129, 0.4)'
  },
  {
    title: 'Vintage Acid Wash Oversized Tee',
    tag: '👕 240 GSM HEAVY COTTON',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    price: '₹1,299',
    accent: 'rgba(236, 72, 153, 0.4)'
  },
  {
    title: 'Cyber-Viper Futuristic Shades',
    tag: '🕶️ UV400 POLARIZED',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    price: '₹1,899',
    accent: 'rgba(139, 92, 246, 0.4)'
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [clothIndex, setClothIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic Clothes Image Switcher Timer with Pause-on-Hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setClothIndex((prev) => (prev + 1) % HERO_CLOTHES_SLIDES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts(activeTab);
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, [activeTab]);

  const activeSlide = HERO_CLOTHES_SLIDES[clothIndex];

  const handleNext = () => setClothIndex((prev) => (prev + 1) % HERO_CLOTHES_SLIDES.length);
  const handlePrev = () => setClothIndex((prev) => (prev - 1 + HERO_CLOTHES_SLIDES.length) % HERO_CLOTHES_SLIDES.length);

  return (
    <div className="home-bento-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 4-BLOCK BENTO HERO GRID WITH FULL-WIDTH HERO BLOCK 1 & ENHANCED DETAILED CLOTHES SLIDESHOW */}
      <section className="bento-hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px'
      }}>

        {/* FULL-WIDTH STRETCHED HERO CARD 1 (Grid Column Span 12) WITH INNER CLOTHES DYNAMIC CHANGING SLIDESHOW */}
        <div className="bento-card stagger-1" style={{
          gridColumn: 'span 12',
          padding: '44px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          minHeight: '430px',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Left Hero Text & Call-to-Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fff0ed',
              border: '1px solid rgba(255,122,89,0.3)',
              padding: '6px 16px',
              borderRadius: '9999px',
              marginBottom: '20px',
              width: 'fit-content'
            }}>
              <Flame size={16} color="#ff7a59" />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ff7a59', letterSpacing: '0.06em' }}>
                NEW DROP 2026 • URBAN LUXURY COLLECTION
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#0f172a',
              letterSpacing: '-0.04em',
              marginBottom: '20px',
              fontFamily: 'Syne, sans-serif'
            }}>
              Wear <br />
              something <br />
              <span style={{ color: '#ff7a59' }}>legendary.</span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#64748b',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '520px',
              fontWeight: 500
            }}>
              High-streetwear engineered for the modern trendsetter. Explore statement leather jackets, luxury kicks, oversized tees, and futuristic optics.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn-pill-coral">
                <ShoppingBag size={18} />
                <span>Let's shop</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/try-on" className="btn-pill-black">
                <Camera size={18} />
                <span>Virtual Try-On</span>
              </Link>
            </div>

            {/* Live Stats Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginTop: '36px',
              paddingTop: '20px',
              borderTop: '1px solid #f1f3f5'
            }}>
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'block', fontFamily: 'Syne, sans-serif' }}>50K+</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Active Shoppers</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ff7a59', display: 'block', fontFamily: 'Syne, sans-serif' }}>4.9★</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Verified Rating</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'block', fontFamily: 'Syne, sans-serif' }}>UPI / Card</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Instant Checkout</span>
              </div>
            </div>

          </div>

          {/* Right Hero DETAILED DYNAMIC CLOTHES SLIDESHOW & AMBIENT ELEVATION SHADOW */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              position: 'relative',
              height: '100%',
              minHeight: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}
          >
            
            {/* Ambient Pulsing Glow Aura behind Frame */}
            <div
              className="hero-aura-glow"
              style={{
                position: 'absolute',
                width: '380px',
                height: '370px',
                borderRadius: '32px',
                background: `radial-gradient(circle, ${activeSlide.accent} 0%, transparent 70%)`,
                transition: 'background 0.8s ease',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Clothes Image Frame with Multi-layered Ambient Shadow & Ken Burns Zoom */}
            <div style={{
              width: '100%',
              maxWidth: '360px',
              height: '350px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: `0 24px 60px rgba(0,0,0,0.18), 0 8px 32px ${activeSlide.accent}`,
              border: '2.5px solid rgba(255,255,255,0.9)',
              background: '#0f172a',
              transition: 'box-shadow 0.8s ease',
              zIndex: 2
            }}>
              
              {/* Dynamic Ken Burns Zoom & Cross-Dissolve Images */}
              {HERO_CLOTHES_SLIDES.map((slide, index) => (
                <img
                  key={slide.title}
                  src={slide.image}
                  alt={slide.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: index === clothIndex ? 1 : 0,
                    transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 3.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: index === clothIndex ? 'scale(1.08) translate3d(-3px, -2px, 0)' : 'scale(1.18)'
                  }}
                />
              ))}

              {/* Top Animated Progress Timer Bar */}
              {!isPaused && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'rgba(255,255,255,0.2)',
                  zIndex: 10
                }}>
                  <div
                    key={clothIndex}
                    style={{
                      height: '100%',
                      background: '#ff7a59',
                      width: '100%',
                      animation: 'progressFill 2.8s linear'
                    }}
                  />
                </div>
              )}

              {/* Floating Active Tag Badge with Spring Pop Animation */}
              <div
                key={activeSlide.tag}
                className="badge-pop-anim"
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(15,23,42,0.9)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <Flame size={14} color="#ff7a59" /> {activeSlide.tag}
              </div>

              {/* Manual Left / Right Navigation Buttons */}
              <button
                onClick={handlePrev}
                aria-label="Previous Outfit"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 12,
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Outfit"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 12,
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Slide Navigation Indicator Dots */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                gap: '6px',
                zIndex: 10
              }}>
                {HERO_CLOTHES_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setClothIndex(i)}
                    style={{
                      width: i === clothIndex ? '22px' : '6px',
                      height: '6px',
                      borderRadius: '9999px',
                      background: i === clothIndex ? '#ff7a59' : 'rgba(255,255,255,0.6)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Monogram Sticker Letters Floating on Top Right with Bobbing Physics */}
            <div style={{ position: 'absolute', top: '-10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 10 }}>
              <div className="sticker-circle">s</div>
              <div className="sticker-circle">n</div>
              <div className="sticker-circle">i</div>
              <div className="sticker-circle">t</div>
              <div className="sticker-circle">c</div>
              <div className="sticker-circle">h</div>
            </div>

            {/* Floating Product Callout Badges with Dynamic Active Item Updating */}
            <div className="hero-floating-card hero-floating-card-1" style={{
              position: 'absolute',
              top: '20px',
              left: '-20px',
              background: '#ffffff',
              padding: '10px 16px',
              borderRadius: '16px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 5
            }}>
              <Sparkles size={18} color="#ff7a59" />
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {activeSlide.title}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#ff7a59', fontWeight: 700 }}>{activeSlide.price}</span>
              </div>
            </div>

            <div className="hero-floating-card hero-floating-card-2" style={{
              position: 'absolute',
              bottom: '30px',
              right: '-10px',
              background: '#ffffff',
              padding: '10px 16px',
              borderRadius: '16px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 5
            }}>
              <Star size={18} fill="#ff7a59" color="#ff7a59" />
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>CYBER SHADES</span>
                <span style={{ fontSize: '0.72rem', color: '#ff7a59', fontWeight: 700 }}>₹1,899</span>
              </div>
            </div>

          </div>

        </div>

        {/* BLOCK 2: Quote / Brand Philosophy Card (Cols 1-4) */}
        <div className="bento-card stagger-2" style={{
          gridColumn: 'span 4',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px',
          background: '#ffffff'
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: '#475569',
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            This drop is engineered for the bold ones who wear their attitude with pride and redefine street fashion.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Quote size={28} color="#94a3b8" />
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>snitch.co/streetwear</span>
          </div>
        </div>

        {/* BLOCK 3: Community & Stylists Stack Card (Cols 5-8) */}
        <div className="bento-card stagger-3" style={{
          gridColumn: 'span 4',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px',
          background: '#ffffff'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', lineHeight: 1.25 }}>
              We help fashion lovers shine on all platforms.
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', marginLeft: '6px' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Stylist 1"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', marginLeft: '-6px' }}
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Stylist 2"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', marginLeft: '-6px' }}
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Stylist 3"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', marginLeft: '-6px' }}
              />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', display: 'block', letterSpacing: '0.04em' }}>
                MEET OUR STYLISTS
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>50K+ Active Shoppers</span>
            </div>
          </div>
        </div>

        {/* BLOCK 4: Pastel Mesh Gradient Try-On Promo Card (Cols 9-12) */}
        <div className="bento-card mesh-gradient-card stagger-4" style={{
          gridColumn: 'span 4',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.75)',
              padding: '4px 10px',
              borderRadius: '9999px',
              marginBottom: '12px'
            }}>
              <Camera size={14} color="#0f172a" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>VIRTUAL FIT ROOM</span>
            </div>
            
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
              Try sunglasses & caps on your photo.
            </h3>
          </div>

          <Link to="/try-on" className="btn-pill-black" style={{ padding: '8px 18px', fontSize: '0.82rem', alignSelf: 'flex-start' }}>
            Open Studio
          </Link>
        </div>

      </section>

      {/* BENTO CATEGORIES SHOWCASE BLOCK */}
      <section className="bento-card stagger-3" style={{ padding: '36px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <span className="badge-bento">CURATED DROPS</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>Explore Categories</h2>
          </div>
          <Link to="/products" className="btn-pill-outline">
            View All Drops <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid-categories">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE BLOCK */}
      <section className="bento-card stagger-4" style={{ padding: '36px 40px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge-bento">TRENDING NOW</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '6px', color: '#0f172a' }}>Featured Streetwear</h2>

          {/* Category Pill Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '20px',
            background: '#f1f3f5',
            padding: '6px',
            borderRadius: '9999px'
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  background: activeTab === cat.id ? '#0f172a' : 'transparent',
                  color: activeTab === cat.id ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading Snitch items...</div>
        ) : (
          <div className="grid-products">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;
