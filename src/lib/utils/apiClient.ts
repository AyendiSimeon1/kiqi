import { store } from '@/redux/store';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://kiqi-8f9k.onrender.com/api/v1/",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor:
// This function runs before each request is sent.
import type { InternalAxiosRequestConfig } from 'axios';

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get the current token from the Redux store
    const token = store.getState().auth.token;

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: any) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;