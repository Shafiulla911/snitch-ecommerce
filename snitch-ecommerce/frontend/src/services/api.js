// Snitch Product Data Catalog & API Service

import cargoPantsImg from '../assets/snitch_cargo_pants_1788431808976.jpg';
import pufferJacketImg from '../assets/snitch_puffer_jacket_1788431947121.jpg';
import luxuryShoesImg from '../assets/snitch_shoes_category_1788428605325.jpg';

export const CATEGORIES = [
  { id: 'all', name: 'All Drops', icon: 'Sparkles' },
  { id: 'clothing', name: 'Clothes & Tees', icon: 'Shirt', count: '120+ Items' },
  { id: 'shoes', name: 'Luxury Shoes', icon: 'Footprints', count: '45+ Pairs' },
  { id: 'caps', name: 'Streetwear Caps', icon: 'Crown', count: '30+ Designs' },
  { id: 'sunglasses', name: 'Shades & Optics', icon: 'Glasses', count: '25+ Styles' },
  { id: 'jackets', name: 'Jackets & Hoodies', icon: 'Flame', count: '60+ Outfits' },
];

export const PRODUCTS = [
  {
    id: 'snitch-001',
    title: 'Snitch Noir Gold Streetwear Leather Jacket',
    category: 'jackets',
    subCategory: 'jackets',
    price: 3999,
    originalPrice: 5999,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&auto=format&fit=crop&q=80',
    description: 'Statement oversized leather biker jacket engineered with gold Snitch crest hardware, premium grain faux-leather, and plush satin lining.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Jet Black', 'Amber Gold'],
    isNew: true,
    isBestSeller: true,
    tryOnCategory: 'jackets'
  },
  {
    id: 'snitch-002',
    title: 'Aureus Noir Streetwear Luxury Sneakers',
    category: 'shoes',
    subCategory: 'sneakers',
    price: 4499,
    originalPrice: 6499,
    rating: 4.95,
    reviewsCount: 88,
    image: luxuryShoesImg,
    hoverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    description: 'Hand-assembled streetwear sneakers featuring high-density air cushion soles, metallic gold accents, and genuine suede paneling.',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: ['Gold Noir', 'Triple Black'],
    isNew: true,
    isBestSeller: true,
    tryOnCategory: 'shoes'
  },
  {
    id: 'snitch-003',
    title: 'Cyber-Viper Futuristic Gold Tint Shades',
    category: 'sunglasses',
    subCategory: 'shades',
    price: 1899,
    originalPrice: 2799,
    rating: 4.85,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
    description: 'UV400 polarized futuristic wrap-around shades crafted with titanium light frame and gold mirror coating.',
    sizes: ['Free Size'],
    colors: ['Gold Mirror', 'Obsidian Black'],
    isNew: false,
    isBestSeller: true,
    tryOnCategory: 'sunglasses'
  },
  {
    id: 'snitch-004',
    title: 'Snitch Executive Embroidery Trucker Cap',
    category: 'caps',
    subCategory: 'caps',
    price: 999,
    originalPrice: 1499,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80',
    description: 'Structured 6-panel cap featuring high-density 3D Snitch monogram embroidery and adjustable metallic strap clasp.',
    sizes: ['Adjustable'],
    colors: ['Matte Black', 'Gold Crest'],
    isNew: true,
    isBestSeller: false,
    tryOnCategory: 'caps'
  },
  {
    id: 'snitch-005',
    title: 'Apex Heavyweight Metallic Puffer Jacket',
    category: 'jackets',
    subCategory: 'jackets',
    price: 4999,
    originalPrice: 7499,
    rating: 4.98,
    reviewsCount: 175,
    image: pufferJacketImg,
    hoverImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-warm thermal insulated metallic black puffer jacket with gold custom zippers and storm hood.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Metallic Black', 'Deep Gold'],
    isNew: true,
    isBestSeller: true,
    tryOnCategory: 'jackets'
  },
  {
    id: 'snitch-006',
    title: 'Aethel Tactical Multi-Pocket Cargo Pants',
    category: 'clothing',
    subCategory: 'bottoms',
    price: 2699,
    originalPrice: 3899,
    rating: 4.9,
    reviewsCount: 112,
    image: cargoPantsImg,
    hoverImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
    description: 'High-density ripstop tactical cargo pants with gold hardware, metal buckled belt, and 8 utility storage pockets.',
    sizes: ['30', '32', '34', '36'],
    colors: ['Onyx Black', 'Tactical Olive'],
    isNew: true,
    isBestSeller: true,
    tryOnCategory: 'bottoms'
  },
  {
    id: 'snitch-007',
    title: 'Relentless Oversized Vintage Acid Wash Tee',
    category: 'clothing',
    subCategory: 'tees',
    price: 1299,
    originalPrice: 1999,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    description: '240 GSM heavy cotton oversized t-shirt with custom acid wash finish and vintage typography back print.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Washed Black', 'Charcoal'],
    isNew: false,
    isBestSeller: true,
    tryOnCategory: 'tees'
  },
  {
    id: 'snitch-008',
    title: 'Phantom Heavyweight Fleece Pullover Hoodie',
    category: 'jackets',
    subCategory: 'jackets',
    price: 2799,
    originalPrice: 3999,
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80',
    description: '400 GSM French Terry plush fleece hoodie with double-layered hood and minimalist metallic chest emblem.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Onyx Black', 'Cream White'],
    isNew: false,
    isBestSeller: true,
    tryOnCategory: 'jackets'
  },
  {
    id: 'snitch-009',
    title: 'Matrix Gold Hexagon Frameless Aviators',
    category: 'sunglasses',
    subCategory: 'shades',
    price: 2199,
    originalPrice: 3299,
    rating: 4.88,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    description: 'Geometric hexagon gold titanium shades with anti-glare mirror UV protection lenses.',
    sizes: ['Free Size'],
    colors: ['Gold Frame', 'Black Tint'],
    isNew: true,
    isBestSeller: false,
    tryOnCategory: 'sunglasses'
  },
  {
    id: 'snitch-010',
    title: 'Monolith High-Top Urban Street Sneakers',
    category: 'shoes',
    subCategory: 'sneakers',
    price: 3299,
    originalPrice: 4799,
    rating: 4.65,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
    description: 'Vulcanized high-top sneakers with reinforced rubber toe cap and chunky tread outsole for urban terrain.',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: ['Off White', 'Monochrome Black'],
    isNew: true,
    isBestSeller: false,
    tryOnCategory: 'shoes'
  }
];

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const fetchProducts = async (category = 'all', search = '') => {
  try {
    const res = await fetch(`${API_BASE}/products?category=${category}&search=${search}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fallback to local mock data
  }

  let filtered = [...PRODUCTS];
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }
  return filtered;
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fallback to local mock data
  }
  return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
};

export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Mock successful order return
  }

  const mockOrder = {
    id: "SNITCH-ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    status: 'Placed',
    paymentMethod: orderData.paymentMethod || 'UPI',
    items: orderData.items,
    totalAmount: orderData.totalAmount,
    shippingAddress: orderData.shippingAddress
  };

  const existing = JSON.parse(localStorage.getItem('snitch_orders') || '[]');
  existing.unshift(mockOrder);
  localStorage.setItem('snitch_orders', JSON.stringify(existing));
  return mockOrder;
};

export const fetchUserOrders = async () => {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fallback to local storage
  }
  return JSON.parse(localStorage.getItem('snitch_orders') || '[]');
};
