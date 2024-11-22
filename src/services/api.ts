// src/services/api.ts
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';  
import { baseURL_dev } from '@/config/baseURL';

const api = axios.create({
  baseURL: baseURL_dev,  
});

api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);  
  
    if (!config.headers.Authorization && token.value && typeof token.value === 'string') {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });
export default api;
