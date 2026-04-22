import axios from 'axios';

// USB Connection with ADB Reverse (Recommended for School/No Internet)
// Run this command once before starting the app:
// adb reverse tcp:8000 tcp:8000
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to requests if available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Login API call
export const loginApi = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response;
  } catch (error) {
    // Log error for debugging
    console.error('Login API Error:', {
      message: error.message,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      response: error.response?.data,
    });
    throw error;
  }
};

// Optional: Test connection to backend
export const testConnection = async () => {
  try {
    // Try to access a public endpoint (you can create a test route in Symfony)
    const response = await api.get('/');
    console.log('✅ Backend connection successful:', response.status);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:');
    console.error('   Make sure:');
    console.error('   1. Symfony server is running: symfony server:start --port=8000 --no-tls --bind=0.0.0.0');
    console.error('   2. ADB reverse is set: adb reverse tcp:8000 tcp:8000');
    console.error('   3. Phone is connected via USB with debugging enabled');
    console.error(`   Error: ${error.message}`);
    return false;
  }
};

export default api;