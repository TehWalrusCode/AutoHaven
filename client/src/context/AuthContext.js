import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a Context for Authentication
export const AuthContext = createContext();

// AuthProvider component provides authentication-related functions and state to its children
export const AuthProvider = ({ children }) => {
  // State to store the current user information
  const [currentUser, setCurrentUser] = useState(null);

  // State to manage loading state during authentication checks
  const [loading, setLoading] = useState(true);

  // useEffect hook to check for the user info in localStorage on component mount
  useEffect(() => {
    // Get the user info from localStorage (if available)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // If user info exists, set it as the current user
    if (userInfo) {
      setCurrentUser(userInfo);
    }
    
    // Set loading to false after checking for user info
    setLoading(false);
  }, []);

  // Login function handles user login
  const login = async (email, password) => {
    try {
      // Make API call to login endpoint with user credentials
      const { data } = await axios.post('/api/users/login', { email, password });

      // If login is successful, store user info in localStorage and update state
      if (data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.data)); // Store user info in localStorage
        setCurrentUser(data.data); // Update state with user data
        return { success: true };
      }
    } catch (error) {
      // Return error if login fails
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to login',
      };
    }
  };

  // Register function handles user registration
  const register = async (name, email, password) => {
    try {
      // Make API call to register endpoint with user registration details
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });

      // If registration is successful, store user info in localStorage and update state
      if (data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.data)); // Store user info in localStorage
        setCurrentUser(data.data); // Update state with user data
        return { success: true };
      }
    } catch (error) {
      // Return error if registration fails
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to register',
      };
    }
  };

  // Logout function removes user info from localStorage and resets the current user state
  const logout = () => {
    localStorage.removeItem('userInfo'); // Remove user info from localStorage
    setCurrentUser(null); // Clear the current user state
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser, // Provides the current logged-in user
        login, // Provides the login function
        register, // Provides the register function
        logout, // Provides the logout function
        loading, // Provides the loading state for auth-related operations
      }}
    >
      {children} {/* Render children components that need access to AuthContext */}
    </AuthContext.Provider>
  );
};
