import { authStore } from '@/app/auth/authStore';
import axios from 'axios';
import { toast } from 'sonner';

const axiosAuthApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosAuthApiInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${authStore.getAccessToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuthApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/auth/refresh')) {
        authStore.resetAuth();
        toast.warning('Unauthorized Request or Session Expired', {
          description:
            'Your session has expired. Please log in again to continue.',
          position: 'bottom-right',
        });
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosAuthApiInstance.get('/auth/refresh');
        if (refreshResponse.status === 200) {
          authStore.setAccessToken(refreshResponse.data);
          return axiosAuthApiInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const api = axiosAuthApiInstance;
