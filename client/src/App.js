import React from 'react';
// Importing Router components from React Router v6
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing AuthProvider to wrap the app with authentication context
import { AuthProvider } from './context/AuthContext';

// Layout components
import Header from './components/Header';
import Footer from './components/Footer';

// Page components
import HomePage from './pages/HomePage';
import CarListingPage from './pages/CarListingPage';
import CarDetailPage from './pages/CarDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Route guard component for protected routes
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    // Providing authentication context to the entire app
    <AuthProvider>
      {/* Router wrapper for handling client-side routing */}
      <Router>
        {/* Header is displayed on all pages */}
        <Header />

        {/* Main content area with some padding */}
        <main className="container py-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarListingPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Route for admin, wrapped in PrivateRoute */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboardPage />
                </PrivateRoute>
              } 
            />

            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer is displayed on all pages */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
