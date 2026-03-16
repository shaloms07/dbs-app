import axios from 'axios';
import { getToken, removeToken } from '@utils/auth';
import { getErrorMessage } from '@utils/errorMessages';
import { analyticsEvents } from '@utils/analytics';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.trafficrewards.in/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor — handle errors and 401
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const message = getErrorMessage(error);

    // Log analytics for errors
    analyticsEvents.apiError(error.config?.url || 'unknown', status || 0, message);

    // Handle 401 — clear auth and redirect to login
    if (status === 401) {
      removeToken();
      window.location.href = '/login';
    }

    // Return error with clean message
    const cleanError = new Error(message);
    cleanError.status = status;
    cleanError.data = error.response?.data;

    return Promise.reject(cleanError);
  }
);

export default api;
