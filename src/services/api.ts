import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          console.log('Unauthorized, redirecting to login');
          // You could add redirect logic here
          localStorage.removeItem('token');
          break;
        case 403:
          // Forbidden
          console.log('Forbidden access');
          break;
        case 404:
          // Not found
          console.log('Resource not found');
          break;
        case 500:
          // Server error
          console.log('Server error');
          break;
        default:
          console.log('An error occurred');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received from server');
    } else {
      // Something happened in setting up the request
      console.log('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// API service functions
const apiService = {
  // Auth endpoints
  login: (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  
  logout: () => {
    return api.post('/auth/logout');
  },
  
  // User endpoints
  getUsers: () => {
    return api.get('/users');
  },
  
  getUserById: (id: string) => {
    return api.get(`/users/${id}`);
  },
  
  createUser: (userData: any) => {
    return api.post('/users', userData);
  },
  
  updateUser: (id: string, userData: any) => {
    return api.put(`/users/${id}`, userData);
  },
  
  deleteUser: (id: string) => {
    return api.delete(`/users/${id}`);
  },
  
  // Dashboard data
  getDashboardStats: () => {
    return api.get('/dashboard/stats');
  },
  
  getRecentActivities: () => {
    return api.get('/dashboard/activities');
  },
};

export default apiService;
