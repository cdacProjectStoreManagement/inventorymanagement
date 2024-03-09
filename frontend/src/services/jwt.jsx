// Axios instance with JWT token
import axios from 'axios';

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use((config) => {
  // Retrieve token from local storage or secure storage
  const token = localStorage.getItem('token');

  if (token) {
    // Add token to request headers
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosWithAuth;
