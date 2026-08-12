import api from './api';

export const authAPI = {
  register:  (data)  => api.post('/auth/register',        data),
  login:     (data)  => api.post('/auth/login',           data),
  refresh:   ()      => api.post('/auth/refresh'),
  logout:    ()      => api.post('/auth/logout'),
  getMe:     ()      => api.get('/auth/me'),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword:  (data) => api.post('/auth/reset-password',  data),
  changePassword: (data) => api.patch('/auth/change-password', data),
};
