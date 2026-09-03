import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { fetchProducts, CATEGORIES } from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(7000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'all';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(selectedCategory, searchQuery);
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter(p => p.price <= maxPrice);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="page-header-block">
        <h1 className="page-title">Catalog Drops</h1>
        <p className="page-subtitle">Filter by category, price, and sizes to discover your ultimate fit.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }} className="catalog-layout">
        
        {/* Sidebar Filters */}
        <div className="bento-card" style={{
          padding: '24px',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: '#ffffff'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={18} color="#ff7a59" /> Filters
            </h3>
            {(selectedCategory !== 'all' || searchQuery || maxPrice < 7000) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setMaxPrice(7000);
                  setSearchParams({});
                }}
                style={{ color: '#ef4444', fontSize: '0.78rem', fontWeight: 700 }}
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search Query */}
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, marginBottom: '6px', letterSpacing: '0.04em' }}>
              SEARCH PRODUCTS
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8f9fa',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '8px 14px'
            }}>
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder="Title, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '0.88rem', outline: 'none', width: '100%', fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '0.04em' }}>
              CATEGORIES
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    textAlign: 'left',
                    fontWeight: selectedCategory === cat.id ? 800 : 500,
                    background: selectedCategory === cat.id ? '#0f172a' : 'transparent',
                    color: selectedCategory === cat.id ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.id && <span style={{ fontSize: '0.75rem', color: '#ff7a59' }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
              <span>MAX PRICE</span>
              <span style={{ color: '#ff7a59', fontWeight: 800 }}>₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="7000"
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#ff7a59', cursor: 'pointer' }}
            />
          </div>

        </div>

        {/* Products Showcase */}
        <div>
          
          {/* Sorting Bar */}
          <div className="bento-card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            marginBottom: '20px',
            background: '#ffffff'
          }}>
            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
              Showing <strong style={{ color: '#0f172a' }}>{sortedProducts.length}</strong> items
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={16} color="#ff7a59" />
              <span style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 600 }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: '#f8f9fa',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="newest">Featured & Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading products...</div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid-products">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bento-card" style={{ textAlign: 'center', padding: '60px', background: '#ffffff' }}>
              <p style={{ color: '#0f172a', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 700 }}>No items match your selected filters.</p>
              <button onClick={() => { setSelectedCategory('all'); setMaxPrice(7000); setSearchQuery(''); }} className="btn-pill-coral">
                Clear Filters
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Products;
