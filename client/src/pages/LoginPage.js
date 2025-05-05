import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importing authentication context

const LoginPage = () => {
  // Local state for form data, error messages, and loading state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Access login function from AuthContext
  const { login } = useContext(AuthContext);

  // Hook to programmatically navigate after successful login
  const navigate = useNavigate();

  // Handles changes in the form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in formData
    setFormData({ ...formData, [name]: value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError('');        // Reset any existing error messages
    setLoading(true);    // Indicate loading state during async call

    try {
      // Call the login function from context with email and password
      const result = await login(formData.email, formData.password);

      // If login is successful, redirect to home page
      if (result.success) {
        navigate('/');
      } else {
        // Show returned error message from backend
        setError(result.error);
      }
    } catch (error) {
      // Catch any unexpected issues (e.g., network errors)
      setError('An unexpected error occurred. Please try again.');
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body p-5">
            {/* Page title */}
            <h2 className="text-center mb-4">Login</h2>

            {/* Error message display (if any) */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Login form */}
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit button with loading spinner */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>

            {/* Link to registration page */}
            <div className="text-center mt-3">
              <p>
                Don't have an account?{' '}
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
