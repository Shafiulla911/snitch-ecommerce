import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('snitch_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const login = async (email, password) => {
    // Simulated authentication service with realistic delay
    if (!email || !password) {
      throw new Error("Please enter both email and password.");
    }
    
    // Default demo user profile
    const userData = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].toUpperCase() || "Snitch Member",
      email: email,
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      address: "102 Luxury Heights, Bandra West",
      city: "Mumbai",
      pincode: "400050",
      joinedDate: new Date().toISOString()
    };

    setUser(userData);
    localStorage.setItem('snitch_user', JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name}! 👋`);
    return userData;
  };

  const signup = async (name, email, password, phone) => {
    if (!name || !email || !password) {
      throw new Error("Please complete all required fields.");
    }

    const newUser = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      phone: phone || "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      address: "24 Fashion Avenue",
      city: "New Delhi",
      pincode: "110001",
      joinedDate: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem('snitch_user', JSON.stringify(newUser));
    showToast(`Account created successfully! Welcome to Snitch, ${name} 🔥`);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('snitch_user');
    showToast("You have logged out.");
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem('snitch_user', JSON.stringify(updatedUser));
    showToast("Profile updated successfully!");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateProfile,
      toastMessage,
      showToast
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
