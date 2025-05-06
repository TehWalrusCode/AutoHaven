import axios from 'axios';

// Create an axios instance with a predefined base URL pointing to your backend API
const API = axios.create({ baseURL: `${process.env.BACKEND_URL}/api` });

// Add a request interceptor to attach the token to every request if the user is logged in
API.interceptors.request.use((req) => {
  // Check if user info is stored in localStorage
  if (localStorage.getItem('userInfo')) {
    // Extract the token from localStorage and set it in the Authorization header
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).token
    }`;
  }
  // Return the modified request object
  return req;
});

// API call to fetch a list of cars with optional filters (e.g., pagination, search, etc.)
export const fetchCars = (filters) => API.get('/cars', { params: filters });

// API call to fetch a single car by its ID
export const fetchCar = (id) => API.get(`/cars/${id}`);

// API call to create a new car (requires authentication)
export const createCar = (newCar) => API.post('/cars', newCar);

// API call to log in a user with email and password
export const login = (formData) => API.post('/users/login', formData);

// API call to register a new user with name, email, password, etc.
export const register = (formData) => API.post('/users/register', formData);
