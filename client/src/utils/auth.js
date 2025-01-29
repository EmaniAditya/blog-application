export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  
  export const isTokenExpired = (token) => {
    const decoded = parseJwt(token);
    if (!decoded) return true;
    return decoded.exp * 1000 < Date.now();
  };