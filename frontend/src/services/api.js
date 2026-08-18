import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const bookingsAPI = {
  create: (data) => api.post('/bookings', data),
  getAll: (params) => api.get('/bookings', { params }),
  getOne: (id) => api.get(`/bookings/${id}`),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
  getStats: () => api.get('/bookings/stats'),
};

export const contactsAPI = {
  create: (data) => api.post('/contacts', data),
  getAll: (params) => api.get('/contacts', { params }),
  getOne: (id) => api.get(`/contacts/${id}`),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
  getStats: () => api.get('/contacts/stats'),
};

export const servicesAPI = {
  getAll: (params) => api.get('/services', { params }),
  getOne: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  reorder: (items) => api.put('/services/reorder', { items }),
};

export const boothsAPI = {
  getAll: (params) => api.get('/booths', { params }),
  getOne: (id) => api.get(`/booths/${id}`),
  create: (data) => api.post('/booths', data),
  update: (id, data) => api.put(`/booths/${id}`, data),
  delete: (id) => api.delete(`/booths/${id}`),
  reorder: (items) => api.put('/booths/reorder', { items }),
};

export const addonsAPI = {
  getAll: (params) => api.get('/addons', { params }),
  getOne: (id) => api.get(`/addons/${id}`),
  create: (data) => api.post('/addons', data),
  update: (id, data) => api.put(`/addons/${id}`, data),
  delete: (id) => api.delete(`/addons/${id}`),
  reorder: (items) => api.put('/addons/reorder', { items }),
};

export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  getOne: (id) => api.get(`/gallery/${id}`),
  create: (data) => api.post('/gallery', data),
  createMultiple: (data) => api.post('/gallery/multiple', data),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
  reorder: (items) => api.put('/gallery/reorder', { items }),
  getStats: () => api.get('/gallery/stats'),
};

export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getOne: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const faqsAPI = {
  getAll: (params) => api.get('/faqs', { params }),
  getOne: (id) => api.get(`/faqs/${id}`),
  create: (data) => api.post('/faqs', data),
  update: (id, data) => api.put(`/faqs/${id}`, data),
  delete: (id) => api.delete(`/faqs/${id}`),
};

export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
  uploadImage: (data) => api.post('/settings/upload', data),
  getDashboard: () => api.get('/settings/dashboard'),
};

export const uploadsAPI = {
  upload: (data) => api.post('/uploads', data),
  uploadMultiple: (data) => api.post('/uploads/multiple', data),
};

export const createFormData = (fields, fileField = 'image', file = null) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value) || typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });
  if (file) formData.append(fileField, file);
  return formData;
};

export default api;
