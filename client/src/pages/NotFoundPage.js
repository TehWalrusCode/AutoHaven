import React from 'react';
import { Link } from 'react-router-dom'; // Link component for navigation

// NotFoundPage component to handle 404 - Page Not Found scenarios
const NotFoundPage = () => {
  return (
    // Centered content with vertical padding
    <div className="text-center py-5">
      
      {/* Large 404 heading to indicate error code */}
      <h1 className="display-1">404</h1>

      {/* Subheading to describe the error */}
      <h2 className="mb-4">Page Not Found</h2>

      {/* Message to inform the user about the missing page */}
      <p className="lead mb-4">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      {/* Button to redirect user back to the homepage */}
      <Link to="/" className="btn btn-primary">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage; // Export the component
