import axios from 'axios';

export const API_URL = 'http://localhost:8080/api';
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);

      return $api.request(originalRequest);
    } catch (e) {
      console.error('User is not authorized!');
    }
  }
  throw error;
});

export default $api;
