import axios from 'axios';

const API_URL = 'http://localhost:5050';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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