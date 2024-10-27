import { authStore } from '@/app/auth/authStore';
import axios from 'axios';
import { toast } from 'sonner';

const axiosAuthApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  // withXSRFToken: true,
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN'
});

axiosAuthApiInstance.interceptors.request.use(
  (config) => {
    if (authStore?.accessToken) {
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Refresh token implementation
axiosAuthApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/auth/refresh')) {
        authStore.resetAuth();
        toast.warning('Unauthorized Request or Session Expired', {
          description:
            'Your session has expired. Please log in again to continue.',
          position: 'bottom-right',
        });
        // window.location.reload();
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosAuthApiInstance.get('/auth/refresh');
        if (refreshResponse.status === 200) {
          const newToken = refreshResponse.data;

          authStore.setAccessToken(newToken);

          const Authorization = `Bearer ${newToken}`;
          // rome-ignore lint/suspicious/noExplicitAny
          axiosAuthApiInstance.defaults.headers.common['Authorization'] =
            Authorization;
          // rome-ignore lint/suspicious/noExplicitAny
          originalRequest.headers['Authorization'] = Authorization;

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
