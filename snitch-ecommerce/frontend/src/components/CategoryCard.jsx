import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Footprints, Crown, Glasses, Flame, Sparkles } from 'lucide-react';

const iconMap = {
  Shirt,
  Footprints,
  Crown,
  Glasses,
  Flame,
  Sparkles
};

const categoryImages = {
  clothing: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  caps: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
  sunglasses: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  jackets: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
  all: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80'
};

const CategoryCard = ({ category }) => {
  const IconComponent = iconMap[category.icon] || Sparkles;
  const bgImg = categoryImages[category.id] || categoryImages.all;

  return (
    <Link
      to={`/products?category=${category.id}`}
      className="bento-card"
      style={{
        display: 'block',
        position: 'relative',
        height: '190px',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)'
      }}
    >
      <img
        src={bgImg}
        alt={category.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.6) contrast(1.1)',
          transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,23,42,0.85) 100%)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#ffffff',
          color: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <IconComponent size={18} color="#ff7a59" />
        </div>
        <h3 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '2px', fontFamily: 'Syne, sans-serif' }}>
          {category.name}
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#ff7a59', fontWeight: 700 }}>
          {category.count || 'Explore Now'} →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
