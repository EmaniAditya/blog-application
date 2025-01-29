import { createContext, useState, useContext, useEffect } from 'react';
import { getToken, setToken, removeToken, isTokenExpired } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: getToken(),
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      setAuthState({
        token,
        isAuthenticated: true,
        user: JSON.parse(atob(token.split('.')[1])), 
      });
    } else {
      setAuthState({
        token: null,
        isAuthenticated: false,
        user: null,
      });
    }
  }, []);

  const login = (token) => {
    setToken(token);
    setAuthState({
      token,
      isAuthenticated: true,
      user: JSON.parse(atob(token.split('.')[1])), 
    });
  };

  const logout = () => {
    removeToken();
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
