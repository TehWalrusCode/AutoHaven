import React, { useContext } from 'react'; // Importing React and the useContext hook
import { Navigate } from 'react-router-dom'; // Importing Navigate component from react-router-dom for navigation
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext to get currentUser and loading state

// PrivateRoute component ensures that only authorized users can access protected routes
const PrivateRoute = ({ children }) => {
  // Getting the currentUser and loading state from AuthContext
  const { currentUser, loading } = useContext(AuthContext);

  // If the user data is still being loaded, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's no user logged in or the user is not an admin (if required), redirect to the login page
  // children.props.requireAdmin checks if the route requires admin privileges
  if (!currentUser || (children.props.requireAdmin && !currentUser.isAdmin)) {
    return <Navigate to="/login" />; // Redirect to login page if the user is not authenticated or not an admin
  }

  // If the user is authenticated and meets any required permissions, render the children (protected content)
  return children;
};

export default PrivateRoute;
