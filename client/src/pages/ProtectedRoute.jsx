/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem("authToken");

  // Function to check if the token is valid and not expired
  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token); // Decode the token without Buffer issues
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
      return decoded.exp > currentTime; // Check if token is still valid
    } catch (error) {
      return false; // Token is invalid or cannot be decoded
    }
  };

  const isAuthenticated = isTokenValid(token);

  // If authenticated, render the component, otherwise navigate to the login page
  return isAuthenticated ? <Component /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
