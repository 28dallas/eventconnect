import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('eventconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, userType = 'client') => {
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('eventconnect_users') || '[]');
    
    // Find user by email and password
    const existingUser = storedUsers.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('eventconnect_user', JSON.stringify(existingUser));
      return { success: true, user: existingUser };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const signup = (email, password, name, userType = 'client') => {
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('eventconnect_users') || '[]');
    
    // Check if user already exists
    const existingUser = storedUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'User already exists with this email' };
    }
    
    // Create new user
    const userData = {
      id: Date.now(),
      email,
      password, // Store password for login
      name,
      userType,
      createdAt: new Date().toISOString()
    };
    
    // Add to users array and save
    storedUsers.push(userData);
    localStorage.setItem('eventconnect_users', JSON.stringify(storedUsers));
    
    // Set current user
    setUser(userData);
    localStorage.setItem('eventconnect_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventconnect_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};