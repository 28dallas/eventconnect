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
    const userData = {
      id: Date.now(),
      email,
      userType,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('eventconnect_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const signup = (email, password, name, userType = 'client') => {
    const userData = {
      id: Date.now(),
      email,
      name,
      userType,
      createdAt: new Date().toISOString()
    };
    
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