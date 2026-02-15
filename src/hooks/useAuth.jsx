import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

const VALID_CREDENTIALS = {
  email: 'intern@demo.com',
  password: 'intern123'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.getUser();
    const rememberMe = storage.getRememberMe();
    
    if (savedUser && rememberMe) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password, rememberMe) => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      const userData = { email };
      setUser(userData);
      storage.setUser(userData);
      storage.setRememberMe(rememberMe);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    storage.removeUser();
    storage.setRememberMe(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
