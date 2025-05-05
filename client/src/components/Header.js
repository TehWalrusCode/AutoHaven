import React, { useContext } from 'react'; // Importing React and useContext hook
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate for navigation
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext for user authentication context

// Header component, which contains the site's navigation bar and user-related features
const Header = () => {
  // Getting currentUser and logout function from AuthContext
  const { currentUser, logout } = useContext(AuthContext);
  // useNavigate hook for programmatically navigating to different routes
  const navigate = useNavigate();

  // handleLogout function to log the user out and navigate to the home page
  const handleLogout = () => {
    logout(); // Calling logout function to remove user info from context and localStorage
    navigate('/'); // Navigating to the homepage after logout
  };

  return (
    <header className="bg-dark text-white">
      {/* Navbar component with dark background and white text */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          {/* Brand link */}
          <Link className="navbar-brand" to="/">
            <span className="fw-bold">AutoHaven</span>
          </Link>
          {/* Button for toggling the navbar in mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* Home, Cars, and Contact links */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars">
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {/* If the user is logged in, display user options */}
              {currentUser ? (
                <>
                  {/* If the user is an admin, display the Admin link */}
                  {currentUser.isAdmin && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        Admin
                      </Link>
                    </li>
                  )}
                  {/* Dropdown menu for the logged-in user */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {currentUser.name} {/* Displaying the user's name */}
                    </a>
                    {/* Dropdown items */}
                    <ul className="dropdown-menu">
                      {/* Profile link */}
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      {/* Logout button */}
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout} // Call handleLogout when clicked
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                // If the user is not logged in, show login and register options
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
