import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { showToast } = useAuth();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('snitch_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('snitch_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize = 'M', quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize, quantity }];
      }
    });

    if (showToast) {
      showToast(`Added ${product.title} (${selectedSize}) to cart! 🛒`);
    }
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.product.id === productId && item.selectedSize === selectedSize)
    ));
    if (showToast) {
      showToast("Item removed from cart.");
    }
  };

  const updateQuantity = (productId, selectedSize, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const applyPromoCode = (code) => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'SNITCH20' || formatted === 'FIRST20') {
      setAppliedCoupon(formatted);
      setDiscountPercent(20);
      if (showToast) showToast('Promo code applied: 20% OFF! 🎉');
      return { success: true, message: '20% Discount applied!' };
    } else if (formatted === 'SNITCH10') {
      setAppliedCoupon(formatted);
      setDiscountPercent(10);
      if (showToast) showToast('Promo code applied: 10% OFF! 🎉');
      return { success: true, message: '10% Discount applied!' };
    } else {
      if (showToast) showToast('Invalid promo code. Try SNITCH20');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountPercent(0);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const deliveryFee = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = cartSubtotal - discountAmount + deliveryFee;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromoCode,
      appliedCoupon,
      discountPercent,
      discountAmount,
      cartSubtotal,
      deliveryFee,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
