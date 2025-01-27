import { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/auth';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async (token) => {
    try {
      const decoded = parseJwt(token);
      if (!decoded || decoded.exp * 1000 < Date.now()) {
        throw new Error('Token expired');
      }
      const response = await api.get(`/user/${decoded.id}`);
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await verifyToken(token);
        setUser(userData);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    const userData = await verifyToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};