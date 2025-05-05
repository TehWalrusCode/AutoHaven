import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import authentication context

// RegisterPage component handles user registration
const RegisterPage = () => {
  // Local state for form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State for handling errors and loading state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Access register function from AuthContext
  const { register } = useContext(AuthContext);

  // Navigation function to redirect users
  const navigate = useNavigate();

  // Handle input field changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation: check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true); // Show loading spinner

    try {
      // Call register function from context
      const result = await register(formData.name, formData.email, formData.password);

      if (result.success) {
        // On successful registration, redirect to homepage
        navigate('/');
      } else {
        // Show error returned from register function
        setError(result.error);
      }
    } catch (error) {
      // Catch any unexpected errors
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body p-5">
            {/* Form heading */}
            <h2 className="text-center mb-4">Register</h2>

            {/* Show error alert if there is an error */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Registration form */}
            <form onSubmit={handleSubmit}>
              {/* Name input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              {/* Confirm Password input */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              {/* Submit button */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {/* Show spinner when loading */}
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registering...
                    </>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
            </form>

            {/* Link to login page */}
            <div className="text-center mt-3">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; // Export component for use in routes
