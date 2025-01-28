import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const blogApi = {
  getAll: () => api.get('/blog'),
  getOne: (id) => api.get(`/blog/${id}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`)
};

export const authApi = {
  login: (credentials) => api.post('/user/login', credentials),
  signup: (userData) => api.post('/user/signup', userData)
};

export default api;